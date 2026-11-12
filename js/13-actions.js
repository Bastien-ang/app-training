/* ===================== ACTIONS, MINUTEUR, COACH, DÉMARRAGE ===================== */
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.className='on';clearTimeout(toast.h);toast.h=setTimeout(()=>t.className='',2600);}
const NAV=[['home','Accueil','home'],['day','Séance','dumbbell'],['cal','Calendrier','cal'],['stats','Suivi','chart'],['set','Réglages','gear']];
function renderNav(){document.getElementById('nav').innerHTML='<div class="brand">'+ic('dumbbell',18)+'TRAINING</div>'+NAV.map(n=>'<button class="nb'+(R.v===n[0]?' on':'')+'" data-a="'+(n[0]==='day'?'openDay':'nav')+'" data-v="'+n[0]+'" data-d="'+today()+'">'+ic(n[2],22)+'<span>'+n[1]+'</span></button>').join('');}
function render(keep){const y=window.scrollY;const v=document.getElementById('view');try{v.innerHTML=VIEWS[R.v]();}catch(e){v.innerHTML='<div class="fatal">Erreur d\'affichage : '+esc(e.message)+'</div>';console.error(e);}renderNav();window.scrollTo(0,keep?y:0);startFigs();}
function go(v,o){R.v=v;Object.assign(R,o||{});render(false);}
function itFor(d,id){const e=getEx(d,id);return resolve(id,e&&e.k?e.k.split('::')[1]:undefined);}
function dense(arr,n){while(arr.length<=n)arr.push({});return arr;}

/* ---- minuteur ---- */
const T={end:0,iv:null};
function tStart(sec){T.end=Date.now()+sec*1000;const el=document.getElementById('timer');el.classList.add('on');clearInterval(T.iv);T.iv=setInterval(tick,250);tick();}
function tick(){const r=Math.max(0,Math.round((T.end-Date.now())/1000));document.querySelector('#timer .tt').textContent=mmss(r);if(r<=0){clearInterval(T.iv);try{navigator.vibrate&&navigator.vibrate([250,120,250]);}catch(e){}toast('Repos terminé — prochaine série !');setTimeout(()=>document.getElementById('timer').classList.remove('on'),2500);}}

const A={
 nav:(d)=>go(d.v),
 openDay:(d)=>go('day',{d:d.d||today()}),
 shiftDay:(d)=>{R.d=addDays(R.d,+d.n);render(false);},
 calMonth:(d)=>{let m=R.m.mo+(+d.n),y=R.m.y;if(m<0){m=11;y--;}if(m>11){m=0;y++;}R.m={y:y,mo:m};render(true);},
 statWeek:(d)=>{R.sw=addDays(R.sw,7*(+d.n));render(true);},
 nDay:(d)=>{R.nd=addDays(R.nd,+d.n);render(true);},
 openAdd:()=>{R.addOpen=true;go('day',{d:today()});setTimeout(()=>window.scrollTo(0,document.body.scrollHeight),50);},
 sslink:(d)=>{const L=S.logs[d.d]=S.logs[d.d]||{};L.ss=L.ss||[];const i=L.ss.indexOf(d.id);if(i>=0)L.ss.splice(i,1);else L.ss.push(d.id);save();render(true);},
 sssuggest:(d)=>{const P=progOf(d.d),SO=soirOf(P,d.d);if(!SO)return;const L=S.logs[d.d]=S.logs[d.d]||{};L.ss=ssSuggest(d.d,SO);save();render(true);toast(L.ss.length?'Bisets proposés — modifie-les comme tu veux':'Aucun biset évident dans cette séance');},
 ssclear:(d)=>{const L=S.logs[d.d];if(L){L.ss=[];save();render(true);}},
 stp:(d)=>{const it=itFor(d.d,d.id),e=ensureEx(d.d,it),n=+d.n;dense(e.sets,n);const s=e.sets[n],isT=it.kind==='time',tg=isT?timeTarget(it,d.d):liftTarget(it,d.d),dir=+d.dir;
  if(d.f==='w'){const cur=(s.w!==undefined&&s.w!=='')?num(s.w):(isT?tg.t:tg.w);const st=isT?5:(it.inc||2.5);s.w=String(Math.max(0,Math.round((cur+dir*st)*100)/100));}
  else{const cur=(s.r!==undefined&&s.r!=='')?num(s.r):tg.r;s.r=String(Math.max(0,cur+dir));}
  save();render(true);},
 exall:(d)=>{fillEx(d.d,d.id);save();render(true);toast('Exercice validé ✓');},
 excol:(d)=>{R.col=R.col||{};const k=d.d+d.id,cur=R.col[k]!==undefined?R.col[k]:!exAllDone(d.d,d.id);R.col[k]=!cur;render(true);},
 vall:(d)=>{const SO=soirOf(progOf(d.d),d.d);if(!SO)return;SO.blocks.forEach(bl=>bl.ex.forEach(id=>fillEx(d.d,id)));const L=S.logs[d.d]=S.logs[d.d]||{};L.fin={min:SO.min,rpe:7};save();toast('Séance validée ✓');render(true);},
 rdy:(d)=>{const r=S.ready[d.d]=S.ready[d.d]||{};r[d.f]=+d.n;save();render(true);},
 rdoff:(d,el,ev)=>{ev.preventDefault();const r=S.ready[d.d];r.off=!r.off;save();render(true);},
 setchk:(d)=>{const it=itFor(d.d,d.id),e=ensureEx(d.d,it),n=+d.n;dense(e.sets,n);const s=e.sets[n];
  if(!s.d){const isT=it.kind==='time';const tg=isT?timeTarget(it,d.d):liftTarget(it,d.d);
   if(s.w===undefined||s.w==='')s.w=isT?String(Math.round(tg.t)):String(tg.w);if(!isT&&(s.r===undefined||s.r===''))s.r=String(tg.r);
   s.d=true;if(!isT){const b=prBest(it,d.d);if(b>0&&e1rm(it,s)>b)toast('★ Record personnel sur '+it.name+' !');}
   if(S.set.autoTimer)ssTimer(d.d,d.id,it);}
  else s.d=false;save();render(true);},
 dchk:(d)=>{const it=itFor(d.d,d.id),e=ensureEx(d.d,it);if(!e.d){const tg=it.kind==='carry'||it.kind==='station'?loadTarget(it,d.d):null;if(it.kind==='carry'&&(e.v===undefined||e.v===''))e.v=String(tg.w);if(it.kind==='station'){if(it.base!==undefined&&(e.v===undefined||e.v===''))e.v=String(tg.w);}e.d=true;}else e.d=false;save();render(true);},
 addset:(d)=>{const it=itFor(d.d,d.id),e=ensureEx(d.d,it);e.extra=(e.extra||0)+1;save();render(true);},
 fin:(d)=>{const L=S.logs[d.d]=S.logs[d.d]||{};const SO=soirOf(progOf(d.d),d.d);L.fin={min:SO?SO.min:60,rpe:7};save();toast('Séance enregistrée ✓');render(true);},
 finedit:(d)=>{delete S.logs[d.d].fin;save();render(true);},
 runfin:(d)=>{const r=runItem(progOf(d.d).run,d.d);const L=S.logs[d.d]=S.logs[d.d]||{};const v=document.getElementById('runv').value.trim();L.run={k:r.key,v:v||mmss(runTarget(r,d.d).t),d:true,fin:true,min:num(document.getElementById('runm').value)||r.est,rpe:Math.min(10,num(document.getElementById('runr').value)||7)};save();toast('Course enregistrée ✓');render(true);},
 runedit:(d,el,ev)=>{ev.preventDefault();delete S.logs[d.d].run;save();render(true);},
 skip:(d)=>{S.skip[d.d]=!S.skip[d.d];if(!S.skip[d.d])delete S.skip[d.d];save();render(true);},
 toggleAdd:()=>{R.addOpen=!R.addOpen;render(true);},
 actType:(d)=>{R.act=d.t;render(true);},
 saveAct:(d)=>{const T=ACT[R.act],dr=R.draft;const a={t:R.act,min:num(dr.min),rpe:Math.min(10,num(dr.rpe)),note:(dr.note||'').trim()};
  T.extra.forEach(x=>{if(dr[x.k])a[x.k]=num(dr[x.k]);});if(T.assist&&dr.assist)a.assist=dr.assist;
  if(R.act==='muscu'){a.ex=(dr.ex||[]).filter(x=>x&&x.n&&x.m).map(x=>({n:x.n,m:x.m,sets:num(x.sets)||1,reps:num(x.reps),w:num(x.w)}));}
  if(!a.min&&!a.note&&!(a.ex&&a.ex.length)){toast('Ajoute au moins une durée ou une note.');return;}
  (S.acts[d.d]=S.acts[d.d]||[]).push(a);R.draft={};R.addOpen=false;save();toast(T.l+' enregistré ✓');render(true);},
 delAct:(d)=>askConfirm('Supprimer cette activité ?',()=>{S.acts[d.d].splice(+d.n,1);if(!S.acts[d.d].length)delete S.acts[d.d];save();render(true);}),
 nAdd:()=>{const n=nutriDay(R.nd),g=id=>num(document.getElementById(id).value);n.kcal+=g('nk');n.p+=g('np');n.c+=g('nc');n.f+=g('nf');save();render(true);},
 nQuick:(d)=>{const n=nutriDay(R.nd);n.kcal+=+d.k;n.p+=+d.p;n.c+=+d.c;n.f+=+d.f;save();render(true);},
 nWater:(d)=>{nutriDay(R.nd).water+=+d.n;save();render(true);},
 nReset:()=>askConfirm('Remettre ce jour à zéro ?',()=>{S.nutri[R.nd]={kcal:0,p:0,c:0,f:0,water:0,sup:[]};save();render(true);}),
 nSup:(d)=>{const n=nutriDay(R.nd),i=n.sup.indexOf(d.s);if(i>-1)n.sup.splice(i,1);else n.sup.push(d.s);save();render(true);},
 wSave:()=>{const kg=num(document.getElementById('wk').value);if(kg<30||kg>250){toast('Poids invalide');return;}S.weights=S.weights.filter(x=>x.d!==R.nd);S.weights.push({d:R.nd,kg:kg});S.weights.sort((a,b)=>a.d<b.d?-1:1);save();toast('Poids enregistré ✓');render(true);},
 tgl:(d)=>{S.set[d.k]=!S.set[d.k];save();render(true);},
 unsub:(d)=>{delete S.subs[d.id];save();render(true);},
 saveKey:()=>{const v=document.getElementById('apik').value.trim();if(v&&v.indexOf('•')<0){localStorage.setItem(LS_APIKEY,v);toast('Clé enregistrée sur cet appareil');render(true);}},
 delKey:()=>{localStorage.removeItem(LS_APIKEY);render(true);},
 exp:()=>{if(DL){DL.save({filename:'programme-entrainement-'+today()+'.json',data:JSON.stringify(S,null,1)}).then(()=>toast('Sauvegarde générée'),()=>toast('Téléchargement annulé'));return;}const b=new Blob([JSON.stringify(S,null,1)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download='programme-entrainement-'+today()+'.json';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove();},500);toast('Sauvegarde générée');},
 expCopy:()=>{const j=JSON.stringify(S);if(navigator.clipboard)navigator.clipboard.writeText(j).then(()=>toast('Sauvegarde copiée — colle-la dans Notes'),()=>toast('Copie impossible'));else toast('Copie impossible');},
 impBtn:()=>{document.getElementById('impf').click();document.getElementById('impta').classList.remove('hide');document.getElementById('impok').classList.remove('hide');},
 impGo:()=>{try{const o=JSON.parse(document.getElementById('impta').value);if(!o||typeof o!=='object'||!o.logs)throw 0;askConfirm('Remplacer les données actuelles ?',()=>{S=Object.assign(defState(),o);S.set=Object.assign(defState().set,o.set||{});save();toast('Données importées ✓');render(false);});}catch(e){toast('Sauvegarde invalide');}},
 reset:()=>askConfirm('Effacer TOUTES tes données ? Fais une sauvegarde avant, cette action est définitive.',()=>{S=defState();save();render(false);}),
 chat:()=>{document.getElementById('chat').classList.add('on');renderChat();},
 chatClose:()=>document.getElementById('chat').classList.remove('on'),
 chatSend:()=>sendChat(),
 exmodal:(d)=>openModal(d.id,d.d),
 modalClose:()=>{document.getElementById('modal').classList.remove('on');},
 pickvar:(d)=>{swapTo(d.d,d.id,altNames(d.id)[+d.i]);A.modalClose();},
 dlgYes:()=>{document.getElementById('dlg').classList.remove('on');const f=askConfirm.y;askConfirm.y=null;f&&f();},
 dlgNo:()=>{document.getElementById('dlg').classList.remove('on');const f=askConfirm.n;askConfirm.n=null;f&&f();},
 tAdd:()=>{T.end+=15000;tick();},tStop:()=>{clearInterval(T.iv);document.getElementById('timer').classList.remove('on');}
};
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const f=A[t.dataset.a];if(f){if(t.tagName==='A')e.preventDefault();try{f(t.dataset,t,e);}catch(err){console.error(err);toast('Erreur : '+err.message);}}});

function swapTo(date,id,name){const e0=getEx(date,id);const go=()=>{if(e0)delete S.logs[date].ex[id];S.subs[id]=name;save();toast('Exercice changé : '+name);render(true);};
 if(e0&&isDone(e0))askConfirm('Cet exercice a déjà des séries saisies ce jour : elles seront effacées. Continuer ?',go,()=>render(true));else go();}
function askConfirm(msg,yes,no){const d=document.getElementById('dlg');d.innerHTML='<div class="dbox"><p>'+esc(msg)+'</p><div class="row" style="justify-content:flex-end"><button class="btn ghost" data-a="dlgNo">Annuler</button><button class="btn" data-a="dlgYes">Confirmer</button></div></div>';d.classList.add('on');askConfirm.y=yes;askConfirm.n=no;}
function openModal(id,d){const cur=itFor(d,id).name,m=document.getElementById('modal');
 m.innerHTML='<div class="mi"><div class="rowb" style="margin-bottom:12px"><div><div class="mono-s">Variantes équivalentes</div><div class="d" style="font-size:1.2rem">'+esc(EX[id].name)+'</div></div><button class="btn ghost sm" data-a="modalClose">Fermer</button></div>'
  +altNames(id).map((n,i)=>{const a=i?ALT[id][i-1]:null,base=a?a[1]:EX[id].base,unit=a?a[2]:EX[id].unit;return'<div class="vr'+(n===cur?' cur':'')+'">'+figFor(id,n)+'<div><div style="font-weight:600;margin-bottom:4px">'+esc(n)+'</div><div class="phs">'+phCap(patFor(id,n))+'</div><div class="sub" style="margin-bottom:8px">'+(base?'Départ conseillé : '+fmtW(base)+' '+esc(unit||'kg'):'Poids de corps / au feeling')+'</div>'+(n===cur?'<span class="badge" style="--c:var(--rust)">ACTUEL</span>':'<button class="btn sm" data-a="pickvar" data-id="'+id+'" data-d="'+d+'" data-i="'+i+'">Choisir</button>')+descHTML(patFor(id,n))+tipHTML(n)+'</div></div>';}).join('')+'<div class="sub">Chaque variante garde son propre historique de charges.</div></div>';
 m.classList.add('on');m.scrollTop=0;startFigs();}
const INP={
 tech:(el)=>{const d=el.dataset,it=itFor(d.d,d.id),e=ensureEx(d.d,it);e.tech=el.value;save();render(true);},
 set:(el)=>{const d=el.dataset,it=itFor(d.d,d.id),e=ensureEx(d.d,it);dense(e.sets,+d.n);e.sets[+d.n][d.f]=el.value;save();},
 one:(el)=>{const d=el.dataset,it=itFor(d.d,d.id),e=ensureEx(d.d,it);e[d.f]=el.value;save();},
 draft:(el)=>{R.draft[el.dataset.f]=el.value;},
 dex:(el)=>{const d=el.dataset;R.draft.ex=R.draft.ex||[];R.draft.ex[+d.n]=R.draft.ex[+d.n]||{};R.draft.ex[+d.n][d.f]=el.value;},
 cfg:(el)=>{const f=el.dataset.f,k=S.set;if(f==='race')k.race=el.value;else k[f]=num(el.value)||k[f];save();},
};
document.addEventListener('input',e=>{const el=e.target;if(el.dataset&&el.dataset.i&&INP[el.dataset.i]&&el.dataset.i!=='swap'&&el.tagName!=='SELECT')INP[el.dataset.i](el);});
document.addEventListener('change',e=>{const el=e.target;if(!el.dataset||!el.dataset.i)return;
 if(el.dataset.i==='swap'){swapTo(el.dataset.d,el.dataset.id,el.value);}
 else if(el.tagName==='SELECT'&&INP[el.dataset.i]){INP[el.dataset.i](el);}
 else if(el.dataset.i==='cfg'){INP.cfg(el);if(el.dataset.f==='race')render(true);}});
document.addEventListener('change',e=>{if(e.target.id==='impf'&&e.target.files[0]){const r=new FileReader();r.onload=()=>{document.getElementById('impta').value=r.result;A.impGo();};r.readAsText(e.target.files[0]);}});

/* ---- coach IA ---- */
let chatMsgs=[];try{chatMsgs=JSON.parse(localStorage.getItem(LS_CHAT)||'[]');}catch(e){}
let SMP=null,DL=null;
async function initCaps(){try{if(window.claude&&claude.use){SMP=await claude.use('sample');DL=await claude.use('downloads');}}catch(e){}}
function renderChat(){const b=document.querySelector('#chat .cb');const key=localStorage.getItem(LS_APIKEY);
 let h='';if(!key&&!SMP)h+='<div class="msg a">Pour activer le coach, ajoute ta clé API Anthropic dans <b>Réglages → Coach IA</b>. Elle reste uniquement sur ton téléphone.</div>';
 else if(!chatMsgs.length)h+='<div class="msg a">Salut Bastien ! Je connais ton programme, ton volume et ta charge de la semaine. Demande-moi d\'adapter une séance, de changer un exercice, de caler ta date Hyrox ou de l\'analyser. 💪</div>';
 chatMsgs.forEach(m=>{h+='<div class="msg '+(m.r==='user'?'u':'a')+'">'+esc(m.c)+'</div>';});b.innerHTML=h;b.scrollTop=b.scrollHeight;}
function coachContext(){const t=today(),mon=mondayOf(t),v=weekVolume(mon);
 const week=['lun','mar','mer','jeu','ven','sam','dim'].map((id,i)=>{const dd=addDays(mon,i),P=progOf(dd,id),SO=soirOf(P,dd);return id+': '+(SO?SO.short:P.title);}).join(' | ');
 const ids=Object.keys(EX).map(k=>k+'='+EX[k].name).join('; ');
 const sess=[0,1,2,3,4,5,6].map(i=>{const dd=addDays(mon,i);let SO=null;try{SO=soirOf(progOf(dd),dd);}catch(e){}return SO&&SO.blocks?dd+' ('+SO.title+') : '+SO.blocks.flatMap(b=>b.ex).map(x=>x+'='+itFor(dd,x).name).join(', '):null;}).filter(Boolean).join('\n');
 return 'Tu es le coach de Bastien (22 ans, 1m83), qui veut prendre du muscle (physique) avec un peu de cardio, fait VTT (e-bike) et motocross du vendredi après-midi au week-end, salle Fitness Park. Réponds en français, de façon concise et concrète.\nAujourd\'hui : '+longDate(t)+'. Variante '+variantOf(t)+'.\nSemaine : '+week+'\nVolume (séries effectives) cette semaine : '+MUSCLES.map(m=>m+' '+v.sets[m].toFixed(1)).join(', ')+'. Tonnage '+Math.round(v.tonT)+' kg.'+'\nTu peux appliquer des changements en ajoutant EN FIN de réponse des balises exactes : [[SWAP id|Nom exact de la variante]] pour changer un exercice (ids : '+ids+' ; variantes = noms de la liste déroulante), [[SKIP AAAA-MM-JJ]] pour sauter la séance d\'un jour. Autres balises : [[ADD AAAA-MM-JJ|id_après|id_exo|1]] pour ajouter l\'exo id_exo juste après id_après dans la séance du jour (1 = en superset avec l\'exo du dessus, 0 sinon), [[DEL AAAA-MM-JJ|id]] pour retirer un exo de la séance, [[SESSION AAAA-MM-JJ|clé]] pour remplacer la séance du jour (clés : '+(window.hxKeys?window.hxKeys():'')+'), [[SEND AAAA-MM-JJ]] pour envoyer la séance sur la montre. Séances de la semaine (jour : id=nom) :\n'+sess+'\nN\'utilise une balise que si Bastien le demande ou valide.';}
function applyTags(txt){const done=[];txt=txt.replace(/\[\[(SWAP|RACE|SKIP|ADD|DEL|SESSION|SEND)\s+([^\]]+)\]\]/g,(m,k,v)=>{try{const q=v.split('|').map(x=>x.trim());
 if(k==='ADD'&&window.hxAdd&&/^\d{4}-\d\d-\d\d$/.test(q[0])){if(window.hxAdd(q[0],q[1],q[2],q[3]==='1'))done.push('Exo ajouté : '+(EX[q[2]]?EX[q[2]].name:q[2]));}
 else if(k==='DEL'&&window.hxDel&&/^\d{4}-\d\d-\d\d$/.test(q[0])){if(window.hxDel(q[0],q[1]))done.push('Exo retiré : '+(EX[q[1]]?EX[q[1]].name:q[1]));}
 else if(k==='SESSION'&&window.hxSwap&&/^\d{4}-\d\d-\d\d$/.test(q[0])){if(window.hxSwap(q[0],q[1]))done.push('Séance du '+q[0]+' remplacée');}
 else if(k==='SEND'&&A.icuDay&&/^\d{4}-\d\d-\d\d$/.test(q[0])){A.icuDay({d:q[0]});done.push('Séance envoyée sur la montre');}
 else if(k==='SWAP'){const p=v.split('|'),id=p[0].trim(),n=(p[1]||'').trim();if(EX[id]&&altNames(id).indexOf(n)>-1){S.subs[id]=n;done.push('Exercice changé : '+n);}}
 else if(k==='RACE'&&/^\d{4}-\d\d-\d\d$/.test(v.trim())){S.set.race=v.trim();done.push('Date Hyrox : '+v.trim());}
 else if(k==='SKIP'&&/^\d{4}-\d\d-\d\d$/.test(v.trim())){S.skip[v.trim()]=true;done.push('Séance du '+v.trim()+' sautée');}}catch(e){}return'';}).trim();
 if(done.length){save();txt+='\n\n✓ Appliqué : '+done.join(' · ');render(true);}return txt;}
async function sendChat(){const inp=document.getElementById('chatin'),txt=inp.value.trim();const key=localStorage.getItem(LS_APIKEY);if(!txt)return;if(!key&&!SMP){toast('Ajoute ta clé API dans Réglages');return;}
 inp.value='';chatMsgs.push({r:'user',c:txt});chatMsgs.push({r:'assistant',c:'…'});renderChat();
 try{if(SMP){const hist=chatMsgs.slice(0,-1).slice(-14).map(m=>({role:m.r,content:m.c}));hist[0]={role:'user',content:coachContext()+'\n\n---\nMessage de Bastien :\n'+hist[0].content};const rs=await SMP(hist,{cache:false});chatMsgs[chatMsgs.length-1].c=applyTags(rs.text||'(réponse vide)');}else{const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-5-5',max_tokens:1400,system:coachContext(),messages:chatMsgs.slice(0,-1).slice(-14).map(m=>({role:m.r,content:m.c}))})});
  const j=await res.json();if(!res.ok)throw new Error((j.error&&j.error.message)||('HTTP '+res.status));
  chatMsgs[chatMsgs.length-1].c=applyTags((j.content||[]).map(c=>c.text||'').join('')||'(réponse vide)');}}
 catch(e){chatMsgs[chatMsgs.length-1].c='Erreur : '+e.message+'\n(Vérifie ta clé API et ta connexion.)';}
 try{localStorage.setItem(LS_CHAT,JSON.stringify(chatMsgs.slice(-30)));}catch(e){}renderChat();}

/* ---- icône écran d'accueil + fond ---- */
function makeIcon(){try{if(document.querySelector('link[rel="apple-touch-icon"]'))return;const c=document.createElement('canvas');c.width=c.height=180;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,0,180);g.addColorStop(0,'#101012');g.addColorStop(1,'#09090B');x.fillStyle=g;x.fillRect(0,0,180,180);
 const rg=x.createRadialGradient(150,10,0,150,10,110);rg.addColorStop(0,'rgba(255,90,31,.45)');rg.addColorStop(1,'rgba(255,90,31,0)');x.fillStyle=rg;x.fillRect(0,0,180,180);
 x.save();x.translate(90,90);x.rotate(-35*Math.PI/180);const rr=(a,b,w,h,r,col)=>{x.fillStyle=col;x.beginPath();x.roundRect?x.roundRect(a,b,w,h,r):x.rect(a,b,w,h);x.fill();};
 rr(-52,-5,104,10,5,'#D2D2D7');[-1,1].forEach(s=>{rr(s>0?52:-70,-30,18,60,7,'#FF5A1F');rr(s>0?72:-86,-20,14,40,6,'#FF5A1F');});x.restore();
 const l=document.createElement('link');l.rel='apple-touch-icon';l.href=c.toDataURL('image/png');document.head.appendChild(l);const f=document.createElement('link');f.rel='icon';f.href=l.href;document.head.appendChild(f);}catch(e){}}
function loadPhoto(){const i=new Image();i.onload=()=>document.documentElement.style.setProperty('--photo','url("'+PHOTO+'")');i.src=PHOTO;}

/* ---- boot ---- */
window.addEventListener('error',e=>{const v=document.getElementById('view');if(v&&!v.innerHTML)v.innerHTML='<div class="fatal">Erreur : '+esc(e.message)+'</div>';});
function boot(){load();initCaps().then(()=>{if(typeof initSync==='function')initSync();});makeIcon();loadPhoto();try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist();}catch(e){}
 document.getElementById('top').querySelector('h1').addEventListener('click',()=>go('home'));
 document.getElementById('chatin').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();sendChat();}});
 if(!saveOK)document.getElementById('sv').textContent='⚠ Stockage indisponible';else document.getElementById('sv').textContent='Données locales';
 render(false);setInterval(()=>{const n=today();if(R._t&&R._t!==n){R._t=n;if(R.v==='home')render(true);}R._t=n;},60000);}
