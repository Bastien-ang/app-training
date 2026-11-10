/* ===================== MOTEUR : état, dates, progression, volume, charge ===================== */
const LS_KEY='hyrox_v2', LS_CHAT='hyrox_v2_chat', LS_APIKEY='hyrox_api_key';
const EPOCH='2026-08-24';
const pad=n=>String(n).padStart(2,'0');
const fmtDate=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const parseDate=s=>{const a=s.split('-').map(Number);return new Date(a[0],a[1]-1,a[2]);};
const addDays=(s,n)=>{const d=parseDate(s);d.setDate(d.getDate()+n);return fmtDate(d);};
const today=()=>fmtDate(new Date());
const dowOf=s=>parseDate(s).getDay();
const dayId=s=>DAYIDS[dowOf(s)];
const mondayOf=s=>{const d=parseDate(s);d.setDate(d.getDate()-((d.getDay()+6)%7));return fmtDate(d);};
const daysBetween=(a,b)=>Math.round((parseDate(b)-parseDate(a))/864e5);
const weeksBetween=(a,b)=>Math.floor(daysBetween(a,b)/7);
const num=v=>{const n=parseFloat(String(v).replace(',','.'));return isNaN(n)?0:n;};
const rnd=w=>Math.round(w*2)/2;
const fmtW=w=>(Math.round(w*10)/10).toString().replace('.',',');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mmss=s=>{s=Math.round(s);if(!isFinite(s)||s<0)s=0;return Math.floor(s/60)+':'+pad(s%60);};
const hms=s=>{s=Math.round(s);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h+'h'+pad(m)+'\''+pad(s%60);};
const parseT=v=>{v=String(v||'').trim().replace(',','.');if(!v)return 0;if(v.indexOf(':')>-1){const p=v.split(':').map(Number);return p.length===3?p[0]*3600+p[1]*60+p[2]:(p[0]||0)*60+(p[1]||0);}return parseFloat(v)||0;};
const longDate=s=>{const d=parseDate(s);return ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'][d.getDay()]+' '+d.getDate()+' '+MONTHS[d.getMonth()].toLowerCase();};
const shortDate=s=>{const d=parseDate(s);return d.getDate()+'/'+pad(d.getMonth()+1);};

/* ---- état ---- */
function defState(){return{v:2,logs:{},ready:{},weights:[],nutri:{},acts:{},subs:{},skip:{},
 set:{race:'',height:183,wTarget:80,paceF:1,kcal:3400,kcalRest:3100,prot:160,water:3000,sup:SUP_DEFAULT.slice(),autoTimer:true,adapt:true}};}
let S=defState(), H=null, saveOK=true;
function load(){try{const r=localStorage.getItem(LS_KEY);if(r){const o=JSON.parse(r);const d=defState();S=Object.assign(d,o);S.set=Object.assign(d.set,o.set||{});}}catch(e){saveOK=false;}}
function save(){H=null;try{localStorage.setItem(LS_KEY,JSON.stringify(S));localStorage.setItem('hyrox_lastedit',String(Date.now()));if(typeof scheduleSync==='function')scheduleSync();saveOK=true;const el=document.getElementById('sv');if(el){const n=new Date();el.textContent='✓ Enregistré '+pad(n.getHours())+':'+pad(n.getMinutes());el.className='ok';}}catch(e){saveOK=false;const el=document.getElementById('sv');if(el){el.textContent='⚠ Non enregistré';el.className='';}}}

/* ---- cycle / phases ---- */
const weekIdx=s=>Math.floor(daysBetween(EPOCH,mondayOf(s))/7);
const cycOf=s=>s>=V2?(((weeksBetween(V2,mondayOf(s)))%6)+6)%6:((weekIdx(s)%6)+6)%6;
function daysToRace(s){const r=S.set.race;if(!r)return null;return daysBetween(s||today(),r);}
const isTaper=s=>false;
const isDeload=s=>false;
function phaseOf(s){
 const n=daysToRace(s);
 if(n!==null&&n>=0){const w=n/7;if(w>16)return{n:'Bloc physique',c:'#4DA3E8',d:'Hypertrophie d\'abord : tu construis le physique, le cardio reste en entretien actif.'};if(n<=7)return{n:'Affûtage',c:'#5C8253',d:'Volume réduit, intensité maintenue — arrive frais.'};if(w<=3)return{n:'Spécifique Hyrox',c:'#B23A34',d:'Allures et enchaînements de course.'};if(w<=8)return{n:'Construction',c:'#FF5A1F',d:'Charge de travail maximale du bloc.'};return{n:'Base',c:'#4DA3E8',d:'Volume et technique, base aérobie.'};}
 const c=cycOf(s);if(s>=V2)return[{n:'Accumulation',c:'#4DA3E8',d:'Volume en hausse, on construit.'},{n:'Accumulation',c:'#4DA3E8',d:'Volume en hausse, on construit.'},{n:'Intensification',c:'#FF5A1F',d:'Charges plus lourdes, séries proches de l\'échec.'},{n:'Intensification',c:'#FF5A1F',d:'Charges plus lourdes, séries proches de l\'échec.'},{n:'Pic de volume',c:'#B23A34',d:'Semaine la plus chargée, simulation Hyrox.'},{n:'Décharge',c:'#5C8253',d:'Semaine allégée (−1 série, −10 % de charge) pour grossir en récupérant.'}][c];return[{n:'Accumulation',c:'#4DA3E8',d:'Volume en hausse, intensité modérée.'},{n:'Accumulation',c:'#4DA3E8',d:'Volume en hausse, intensité modérée.'},{n:'Intensification',c:'#FF5A1F',d:'Charges et allures plus exigeantes.'},{n:'Intensification',c:'#FF5A1F',d:'Charges et allures plus exigeantes.'},{n:'Spécifique',c:'#B23A34',d:'Séances proches du format Hyrox.'},{n:'Décharge',c:'#5C8253',d:'Semaine allégée (−1 série, −10 % de charge) pour consolider.'}][c];
}
const bodyKg=()=>S.weights.length?S.weights[S.weights.length-1].kg:76;

/* ---- exercices (variantes) ---- */
function resolve(id,variant){
 const b=EX[id];const it=Object.assign({},b);const v=variant||S.subs[id];
 if(v&&v!==b.name&&ALT[id]){const a=ALT[id].find(x=>x[0]===v);
  if(a){it.name=a[0];it.unit=a[2];if(a[3])it.cat=a[3];if(a[4])Object.assign(it,a[4]);
   if(b.kind==='station'){if(a[2]==='s'){it.tb=a[1];it.base=undefined;}else{it.base=a[1];}}
   else if(b.kind==='time'||b.kind==='check'){}
   else it.base=a[1];
   if(b.kind==='lift'||b.kind==='carry')it.inc=incFor(it.cat,it.unit);
   if(/assistance/.test(a[2]))it.assist=true;}}
 it.key=(b.lg||id)+'::'+it.name;it.id=id;return it;}
function altNames(id){return[EX[id].name].concat((ALT[id]||[]).map(a=>a[0]));}

/* ---- historique ---- */
const isDone=e=>!!e&&(e.sets?e.sets.some(s=>s.d):!!e.d);
function hist(){if(H)return H;H={};Object.keys(S.logs).sort().forEach(d=>{const L=S.logs[d];const add=(k,e)=>{(H[k]=H[k]||[]).push({date:d,e:e});};
 Object.keys(L.ex||{}).forEach(i=>{const e=L.ex[i];if(e.k)add(e.k,e);});if(L.run&&L.run.k)add(L.run.k,L.run);});return H;}
function lastEntry(key,D,skipDeload){const h=hist()[key]||[];for(let i=h.length-1;i>=0;i--){const x=h[i];if(x.date>=D)continue;if(skipDeload!==false&&isDeload(x.date))continue;if(isDone(x.e))return x;}return null;}
const getEx=(d,id)=>S.logs[d]&&S.logs[d].ex&&S.logs[d].ex[id];
function ensureEx(d,it){const L=S.logs[d]=S.logs[d]||{};L.ex=L.ex||{};let e=L.ex[it.id];if(!e){e=L.ex[it.id]={k:it.key,sets:[]};}return e;}

/* ---- cibles progressives ---- */
function liftTarget(it,D){
 const dir=it.assist?-1:1,r0=it.reps||[8,10],lo=r0[0],hi=r0[1];
 let w=it.base||0,r=lo,src='base';const le=lastEntry(it.key,D);
 if(le){const ds=(le.e.sets||[]).filter(s=>s.d&&num(s.r)>0);
  if(ds.length){const ws=ds.map(s=>num(s.w));const top=dir>0?Math.max.apply(null,ws):Math.min.apply(null,ws);
   const at=ds.filter(s=>num(s.w)===top);const mr=Math.min.apply(null,at.map(s=>num(s.r)));
   w=top;if(mr>=hi){w=top+dir*it.inc;r=lo;}else if(mr>=lo){r=Math.min(hi,mr+1);}
   src='last';const wa=Math.max(0,weeksBetween(le.date,D)-1);w+=dir*Math.floor(wa/2)*it.inc;}}
 else{const wa=Math.max(0,weeksBetween(today(),D));w=(it.base||0)+dir*Math.floor(wa/3)*it.inc;}
 if(isDeload(D)&&dir>0)w*=0.9;
 return{w:Math.max(0,rnd(w)),r:r,src:src,le:le};}
function timeTarget(it,D){const le=lastEntry(it.key,D);let t=it.base||30;if(le){const v=(le.e.sets||[]).filter(s=>s.d).map(s=>num(s.w));if(v.length)t=Math.max.apply(null,v)+5;}else{t+=5*Math.max(0,Math.floor(weeksBetween(today(),D)/2));}return{t:t,le:le};}
function loadTarget(it,D){const le=lastEntry(it.key,D);let w=it.base||0,t=it.tb||0;
 if(le){if(it.base!==undefined&&le.e.v!==undefined&&le.e.v!=='')w=num(le.e.v)+(le.e.d?it.inc||0:0);if(le.e.t)t=Math.max(10,parseT(le.e.t)-3);}
 else if(it.base!==undefined){w=it.base+(it.inc||0)*Math.max(0,Math.floor(weeksBetween(today(),D)/3));}
 return{w:rnd(w),t:t,le:le};}
function runItem(kind,D){if(kind==='wed')return wedPlan(D).run;const c=cycOf(D);const r=RUNC[kind][c];return Object.assign({id:'run-'+kind,key:'run::'+r.name,cyc:c,kind:kind},r);}
function runTarget(r,D){const le=lastEntry(r.key,D);let t=r.base*(S.set.paceF||1);
 if(le&&le.e.v){const l=parseT(le.e.v);if(l>0){const cy=Math.max(1,Math.floor(weeksBetween(le.date,D)/6));t=l-3*cy;}}
 else{t=t-3*Math.max(0,Math.floor(weeksBetween(EPOCH,D)/6));}
 return{t:Math.max(r.seg===1000?200:30,t),le:le};}

/* ---- adaptation (readiness) ---- */
function readyScore(d){const r=S.ready[d];if(!r||!r.sl)return null;const v=[r.sl,r.mu,r.en,r.me].filter(Boolean);return v.length===4?v.reduce((a,b)=>a+b,0)/4:null;}
function isLight(d){const s=readyScore(d);return S.set.adapt&&s!==null&&s<=2.5&&!(S.ready[d]&&S.ready[d].off);}
function setsFor(it,D){let n=it.sets||3;if(isDeload(D))n-=1;if(isLight(D))n-=1;if(isTaper(D))n=Math.round(n*.6);return Math.max(2,n);}

/* ---- records ---- */
const loadOf=(it,s)=>{const m=/haltère/.test(it.unit||'')?2:1;return num(s.w)*m+(it.bw?it.bw*bodyKg():0);};
const e1rm=(it,s)=>{const r=num(s.r);return r>0?loadOf(it,s)*(1+Math.min(r,12)/30):0;};
function prBest(it,beforeDate){let b=0;(hist()[it.key]||[]).forEach(x=>{if(beforeDate&&x.date>=beforeDate)return;(x.e.sets||[]).forEach(s=>{if(s.d)b=Math.max(b,e1rm(it,s));});});return b;}

/* ---- volume ---- */
const MUSCLE_TGT={Pecs:[10,18],Dos:[10,20],'Épaules':[8,18],Biceps:[6,14],Triceps:[6,14],Jambes:[10,20],Core:[6,12]};
function emptyVol(){const o={};MUSCLES.forEach(m=>o[m]=0);return o;}
function weekVolume(mon){
 const sets=emptyVol(),ton=emptyVol();let tonT=0,nSets=0;
 for(let i=0;i<7;i++){const d=addDays(mon,i),L=S.logs[d];
  if(L&&L.ex)Object.keys(L.ex).forEach(id=>{const meta=EX[id],e=L.ex[id];if(!meta||!meta.m||!e.sets)return;const vs=e.k?e.k.split('::')[1]:meta.name;const it=resolve(id,vs);
   const ms=[].concat(meta.m);e.sets.forEach(s=>{if(!s.d)return;nSets++;ms.forEach(m=>{sets[m]+=1;});(meta.s||[]).forEach(m=>{sets[m]+=.5;});
    if(it.kind==='lift'&&num(s.r)>0){const t=loadOf(it,s)*num(s.r);tonT+=t;ms.forEach(m=>{ton[m]+=t/ms.length;});}});});
  (S.acts[d]||[]).forEach(a=>{(a.ex||[]).forEach(x=>{if(!MUSCLES.includes(x.m))return;const n=num(x.sets)||1;sets[x.m]+=n;nSets+=n;const t=num(x.w)*num(x.reps)*n;ton[x.m]+=t;tonT+=t;});});}
 return{sets:sets,ton:ton,tonT:tonT,nSets:nSets};}
function plannedVolume(mon){const sets=emptyVol();
 ['lun','mar','mer','jeu','ven'].forEach((id,i)=>{const d=addDays(mon,i);if(S.skip[d])return;const P=progOf(d,id),SO=soirOf(P,d);if(!P||!SO)return;
  SO.blocks.forEach(b=>b.ex.forEach(x=>{const it=resolve(x);if(!it.m)return;const n=setsFor(it,d);[].concat(it.m).forEach(m=>{sets[m]+=n;});(it.s||[]).forEach(m=>{sets[m]+=n*.5;});}));});
 return sets;}

/* ---- charge d'entraînement (sRPE) ---- */
function dayLoad(d){let t=0;const L=S.logs[d]||{};if(L.fin)t+=num(L.fin.rpe)*num(L.fin.min);if(L.run&&L.run.fin)t+=num(L.run.rpe)*num(L.run.min);(S.acts[d]||[]).forEach(a=>{t+=num(a.rpe)*num(a.min);});return t;}
const weekLoad=mon=>{let t=0;for(let i=0;i<7;i++)t+=dayLoad(addDays(mon,i));return t;};
function acwr(){const t=today();let a=0,c=0,days=0;for(let i=0;i<28;i++){const l=dayLoad(addDays(t,-i));if(l>0)days++;c+=l;if(i<7)a+=l;}const chronic=c/4;if(days<8||chronic<=0)return null;return{r:a/chronic,a:a,c:chronic};}

/* ---- séances comptées ---- */
function weekCounts(mon){let done=0,planned=0,extra=0;
 ['lun','mar','mer','jeu','ven'].forEach((id,i)=>{const d=addDays(mon,i),L=S.logs[d]||{};const PP=progOf(d,id);if(PP.soir&&!S.skip[d])planned++;if(L.fin)done++;if(PP.run&&PP.run!=='wed'){planned++;if(L.run&&L.run.fin)done++;}});
 for(let i=0;i<7;i++)extra+=(S.acts[addDays(mon,i)]||[]).length;return{done:done,planned:planned,extra:extra};}
function totalLogged(){let n=0;Object.keys(S.logs).forEach(d=>{const L=S.logs[d];if(L.fin)n++;if(L.run&&L.run.fin)n++;});Object.keys(S.acts).forEach(d=>n+=S.acts[d].length);return n;}
function dayDone(d){const L=S.logs[d]||{};return !!(L.fin||(L.run&&L.run.fin)||(S.acts[d]&&S.acts[d].length));}

/* ---- poids / nutrition ---- */
function weightTrend(){const w=S.weights;if(!w.length)return null;const t=today();
 const avg=(a,b)=>{const x=w.filter(p=>p.d>=addDays(t,-b)&&p.d<=addDays(t,-a));return x.length?x.reduce((s,p)=>s+p.kg,0)/x.length:null;};
 const a1=avg(0,6),a0=avg(7,13);return{last:w[w.length-1],a1:a1,a0:a0,rate:(a1!==null&&a0!==null)?a1-a0:null};}
const nutriDay=d=>S.nutri[d]||(S.nutri[d]={kcal:0,p:0,c:0,f:0,water:0,sup:[]});
function nutriTargets(d){const rest=dayId(d)==='dim';const k=rest?S.set.kcalRest:S.set.kcal;return{kcal:k,p:S.set.prot,c:Math.round((k*.5)/4/5)*5,f:Math.round((k*.24)/9/5)*5,water:S.set.water};}

/* ---- estimation Hyrox ---- */
function hyroxEstimate(){const ids=['mer-skierg','mer-sledpush','mer-sledpull','mer-burpee','mer-row','mer-farmer','mer-lunges','mer-wb'];let tot=0,known=0;const rows=[];
 ids.forEach(id=>{const it=resolve(id);let t=it.tb||0,src='réf.';const h=(hist()[it.key]||[]).filter(x=>x.e.t);if(h.length){t=parseT(h[h.length-1].e.t);src='réel';known++;}else{const hb=hist();Object.keys(hb).filter(k=>k.indexOf(id+'::')===0).forEach(k=>{const l=hb[k].filter(x=>x.e.t);if(l.length){t=parseT(l[l.length-1].e.t);src='réel';known++;}});}
  rows.push({id:id,name:it.name,t:t,src:src});tot+=t;});
 let pace=330,psrc='défaut';let hl=[];Object.keys(hist()).filter(k=>k.indexOf('allure Hyrox')>-1).forEach(k=>{hist()[k].forEach(x=>{if(x.e.v)hl.push(x);});});hl.sort((a,b)=>a.date<b.date?-1:1);if(hl.length){pace=parseT(hl[hl.length-1].e.v);psrc='réel';}
 const run=pace*8,trans=150;return{rows:rows,sta:tot,run:run,pace:pace,psrc:psrc,total:tot+run+trans,known:known};}

/* ---- insights / initiatives ---- */
function insights(){const out=[];const t=today(),mon=mondayOf(t),id=((S.logs[t]&&S.logs[t].swap)||dayId(t));
 if(t>=V2){const v=variantOf(t),w=((Math.floor(weeksBetween(V2,mondayOf(t)))%4)+4)%4+1;out.push({k:'info',i:'dumbbell',x:'Programme <b>variante '+v+'</b>, semaine '+w+'/4 — il change d\'exercices toutes les 4 semaines.'});}
 if(id==='jeu')out.push({k:'info',i:'bolt',x:'Épaules jeudi : pas d\'échec (bras, tractions et dips en rappel léger), pour rouler vendredi après-midi avec des avant-bras frais.'});
 if(id==='mar')out.push({k:'info',i:'bolt',x:'Jambes mardi : charge à fond, tu as 3 jours de récupération avant la moto.'});
 if(id==='lun'||id==='mar'||id==='mer')out.push({k:'info',i:'timer',x:'Cardio du jour : <b>'+EX[cardioAt(t,{lun:0,mar:1,mer:2}[id])].name+'</b>, allure facile, après la muscu.'});
 const vol=weekVolume(mon).sets,pl=plannedVolume(mon);const dn=daysBetween(mon,t);
 if(dn>=3)MUSCLES.forEach(m=>{const lo=MUSCLE_TGT[m][0];if(vol[m]<lo*.5&&pl[m]>0)out.push({k:'info',i:'chart',x:'Volume '+m+' faible cette semaine ('+vol[m].toFixed(1)+' séries). Objectif '+MUSCLE_TGT[m][0]+'–'+MUSCLE_TGT[m][1]+'.'});});
 let pr=0;Object.keys(hist()).forEach(k=>{const idx=k.split('::')[0];if(!EX[idx]||EX[idx].kind!=='lift')return;const it=resolve(idx,k.split('::')[1]);const h=hist()[k];const last=h[h.length-1];if(last&&daysBetween(last.date,t)<=7&&h.length>1&&isDone(last.e)){const b=prBest(it,last.date);const m=Math.max.apply(null,(last.e.sets||[]).filter(s=>s.d).map(s=>e1rm(it,s)).concat([0]));if(m>b)pr++;}});
 if(pr)out.push({k:'good',i:'trophy',x:pr+' record'+(pr>1?'s':'')+' battu'+(pr>1?'s':'')+' cette semaine — beau boulot.'});
 return out;}
