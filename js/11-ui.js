/* ===================== UI : icônes, graphiques, vues ===================== */
const IC={
home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',dumbbell:'<path d="M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12"/>',
cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',chart:'<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
apple:'<path d="M12 7c-2-2-7-1-7 5 0 4 3 8 5 8 1 0 1-.5 2-.5s1 .5 2 .5c2 0 5-4 5-8 0-6-5-7-7-5z"/><path d="M12 7c0-2 1-4 3-4"/>',
gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
chat:'<path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.5A8 8 0 1121 12z"/>',check:'<path d="M4 12l5 5L20 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',play:'<path d="M7 4l13 8-13 8z"/>',timer:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6"/>',
bike:'<circle cx="6" cy="16" r="4"/><circle cx="18" cy="16" r="4"/><path d="M6 16l4-8h5l3 8M10 8L9 5H7"/>',flag:'<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>',
mountain:'<path d="M2 20l7-13 4 7 3-4 6 10z"/>',waves:'<path d="M2 8c3 3 5-3 8 0s5-3 8 0 3 2 4 1M2 14c3 3 5-3 8 0s5-3 8 0 3 2 4 1"/>',
trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',left:'<path d="M15 5l-7 7 7 7"/>',right:'<path d="M9 5l7 7-7 7"/>',
alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
trophy:'<path d="M7 4h10v5a5 5 0 01-10 0zM7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3M12 14v4M8 21h8"/>',
heart:'<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z"/>',bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',up:'<path d="M12 19V5M6 11l6-6 6 6"/>'};
const ic=(n,s)=>'<svg width="'+(s||18)+'" height="'+(s||18)+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+(IC[n]||'')+'</svg>';
const KCOL={good:'var(--moss)',warn:'var(--sun)',bad:'var(--ember)',info:'var(--glacier)'};

/* ---- graphiques SVG ---- */
function barsSVG(vals,labels,color,fmt){const W=320,H=120,n=vals.length,mx=Math.max.apply(null,vals.concat([1])),bw=W/n;let s='<svg viewBox="0 0 '+W+' '+(H+18)+'" width="100%">';
 vals.forEach((v,i)=>{const h=Math.round(v/mx*(H-16));const x=i*bw+bw*.15;s+='<rect x="'+x+'" y="'+(H-h)+'" width="'+(bw*.7)+'" height="'+h+'" rx="3" fill="'+(color)+'" opacity="'+(i===n-1?1:.65)+'"/>';
  if(v>0)s+='<text x="'+(x+bw*.35)+'" y="'+(H-h-3)+'" font-size="8.5" text-anchor="middle" fill="#8FA0A8">'+(fmt?fmt(v):Math.round(v))+'</text>';
  s+='<text x="'+(x+bw*.35)+'" y="'+(H+12)+'" font-size="8.5" text-anchor="middle" fill="#8FA0A8">'+labels[i]+'</text>';});
 return s+'</svg>';}
function lineSVG(pts,target){if(pts.length<2)return'<div class="sub">Ajoute au moins 2 pesées pour voir la courbe.</div>';const W=320,H=130;
 const ys=pts.map(p=>p.y).concat(target?[target]:[]);let mn=Math.min.apply(null,ys)-1,mx=Math.max.apply(null,ys)+1;const x0=pts[0].x,x1=pts[pts.length-1].x||1;
 const X=x=>16+(x-x0)/((x1-x0)||1)*(W-32),Y=y=>H-14-(y-mn)/(mx-mn)*(H-30);
 let s='<svg viewBox="0 0 '+W+' '+(H+8)+'" width="100%">';
 if(target)s+='<line x1="16" x2="'+(W-16)+'" y1="'+Y(target)+'" y2="'+Y(target)+'" stroke="#5C8253" stroke-dasharray="4 4"/><text x="'+(W-16)+'" y="'+(Y(target)-3)+'" text-anchor="end" font-size="8.5" fill="#5C8253">objectif '+target+' kg</text>';
 s+='<polyline fill="none" stroke="#FF5A1F" stroke-width="2.5" points="'+pts.map(p=>X(p.x)+','+Y(p.y)).join(' ')+'"/>';
 pts.forEach((p,i)=>{s+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3" fill="#FF5A1F"/>';if(i===0||i===pts.length-1)s+='<text x="'+X(p.x)+'" y="'+(Y(p.y)-7)+'" text-anchor="middle" font-size="9" fill="#EEF1F0">'+p.y+'</text>';});
 return s+'</svg>';}
function mbar(label,val,tgt,pl,col){const mx=Math.max(tgt[1]*1.25,val,pl||0,1);const p=v=>Math.min(100,v/mx*100);
 const ok=val>=tgt[0]&&val<=tgt[1]*1.1;const c=val<tgt[0]?'var(--glacier)':(val>tgt[1]*1.15?'var(--ember)':'var(--moss)');
 return'<div style="margin-bottom:10px"><div class="rowb" style="margin-bottom:4px"><span style="font-size:13px;font-weight:600">'+label+'</span><span class="m sub">'+(Math.round(val*10)/10)+(pl?' / '+Math.round(pl*10)/10+' prévu':'')+' · cible '+tgt[0]+'–'+tgt[1]+'</span></div><div class="bar"><b style="left:'+p(tgt[0])+'%;width:'+(p(tgt[1])-p(tgt[0]))+'%"></b><i style="width:'+p(val)+'%;--c:'+c+'"></i></div></div>';}

/* ---- navigation & routage ---- */
const R={v:'home',d:today(),m:null,sw:mondayOf(today()),nd:today(),act:'moto',draft:{},addOpen:false,key:'',cmsgs:[]};
R.m={y:new Date().getFullYear(),mo:new Date().getMonth()};
const VIEWS={};

function dayStrip(d){const mon=mondayOf(d);let s='<div class="wk">';for(let i=0;i<7;i++){const x=addDays(mon,i),P=progOf(x);s+='<button data-a="openDay" data-d="'+x+'" class="'+(x===today()?'today ':'')+(x===d?'sel':'')+'">'+P.short+'<i style="background:'+DIFF[P.diff].c+(dayDone(x)?'':';opacity:.45')+'"></i><span>'+parseDate(x).getDate()+'</span></button>';}return s+'</div>';}

function readyCard(d){const r=S.ready[d]||{};const rows=[['sl','Sommeil'],['mu','Fraîcheur'],['en','Énergie'],['me','Mental']];
 let h='<div class="card"><div class="rowb" style="margin-bottom:8px"><h3 class="d" style="margin:0">Check-in forme</h3><span class="sub">1 = bas · 5 = top</span></div>';
 rows.forEach(x=>{h+='<div class="rd"><span class="lb">'+x[1]+'</span><div class="opts">'+[1,2,3,4,5].map(n=>'<button data-a="rdy" data-d="'+d+'" data-f="'+x[0]+'" data-n="'+n+'" class="'+(r[x[0]]===n?'on':'')+'">'+n+'</button>').join('')+'</div></div>';});
 const sc=readyScore(d);
 if(sc!==null){h+='<div class="ins" style="border:0;padding-bottom:0">'+ic(isLight(d)?'alert':'check',18).replace('<svg','<svg style="color:'+(isLight(d)?'var(--sun)':'var(--moss)')+'"')+'<span>Score <b>'+sc.toFixed(1)+'/5</b> — '+(isLight(d)?'séance <b>allégée</b> automatiquement (−1 série par exercice). ':(sc>=4?'en pleine forme, pousse tes séries.':'forme correcte, séance normale.'))+(S.set.adapt&&sc<=2.5?' <a href="#" data-a="rdoff" data-d="'+d+'" style="color:var(--glacier)">'+(r.off?'Réactiver l\'adaptation':'Ne pas adapter')+'</a>':'')+'</span></div>';}
 return h+'</div>';}

/* ---- ligne d'exercice ---- */
function exCard(id,d){
 const e0=getEx(d,id);const it=resolve(id,e0&&e0.k?e0.k.split('::')[1]:undefined);const e=e0||{sets:[]};
 const alts=altNames(id);
 const sel=alts.length>1?'<select class="sel s" data-i="swap" data-id="'+id+'" data-d="'+d+'">'+alts.map(n=>'<option'+(n===it.name?' selected':'')+'>'+esc(n)+'</option>').join('')+'</select>':'';
 let body='',info='';
 if(it.kind==='lift'||it.kind==='time'){
  const isT=it.kind==='time',tg=isT?timeTarget(it,d):liftTarget(it,d);const n=Math.max(setsFor(it,d),e.sets.length,(e.extra?setsFor(it,d)+e.extra:0));
  const le=tg.le;
  info='<div class="sub" style="margin-bottom:8px">'+(isT?'Cible : <b class="rust">'+Math.round(tg.t)+' s</b> × '+setsFor(it,d)+' séries':'Cible : <b class="rust">'+setsFor(it,d)+' × '+it.reps[0]+(it.reps[1]!==it.reps[0]?'–'+it.reps[1]:'')+' @ '+fmtW(tg.w)+' '+esc(it.unit)+'</b>'+(tg.r>it.reps[0]?' (vise '+tg.r+' reps)':''))+(le?'<br>Dernière fois ('+shortDate(le.date)+') : '+(le.e.sets||[]).filter(s=>s.d).map(s=>fmtW(num(s.w))+(isT?' s':'×'+num(s.r))).join(' · '):'<br>Première fois sur cette variante — charge de départ conseillée.')+'</div>';
  let rows='<div class="set t0" style="margin-bottom:2px"><span></span><span class="mono-s" style="text-align:center">'+(isT?'secondes':esc(it.unit&&/haltère/.test(it.unit)?'kg / haltère':(it.unit&&/côté/.test(it.unit)?'kg / côté':'kg')))+'</span><span class="mono-s" style="text-align:center">'+(isT?'':'reps')+'</span><span></span></div>';
  if(isT)rows='';
  const best=isT?0:prBest(it,d);
  for(let i=0;i<n;i++){const s=e.sets[i]||{};
   if(isT)rows+='<div class="set t'+(s.d?' on':'')+'"><span class="sn">'+(i+1)+'</span>'+stpIn('w',id,d,i,Math.round(tg.t),s.w,'numeric')+'<button class="chk" data-a="setchk" data-id="'+id+'" data-d="'+d+'" data-n="'+i+'">'+ic('check',18)+'</button></div>';
   else{const pr=s.d&&e1rm(it,s)>best&&best>0;rows+='<div class="set'+(s.d?' on':'')+'"><span class="sn">'+(i+1)+(pr?'<span class="pr">★</span>':'')+'</span>'+stpIn('w',id,d,i,fmtW(tg.w),s.w,'decimal')+stpIn('r',id,d,i,tg.r,s.r,'numeric')+'<button class="chk" data-a="setchk" data-id="'+id+'" data-d="'+d+'" data-n="'+i+'">'+ic('check',18)+'</button></div>';}}
  body=rows+'<div class="xr"><button class="btn mo sm" data-a="exall" data-id="'+id+'" data-d="'+d+'">'+ic('check',14)+'Tout valider comme prévu</button><button class="btn ghost sm" data-a="addset" data-id="'+id+'" data-d="'+d+'">+ série</button></div>';
 }else{
  const chk='<button class="chk" style="width:44px" data-a="dchk" data-id="'+id+'" data-d="'+d+'">'+ic('check',18)+'</button>';
  if(it.kind==='check'){info='<div class="sub">'+esc(it.txt)+'</div>';body='<div class="single'+(e.d?' on':'')+'"><span class="sub">Fait ?</span><div class="fs">'+chk+'</div></div>';}
  else if(it.kind==='carry'){const tg=loadTarget(it,d);info='<div class="sub">'+esc(it.txt)+' · cible <b class="rust">'+fmtW(tg.w)+' '+esc(it.unit)+'</b>'+(tg.le?' · dernière fois '+fmtW(num(tg.le.e.v))+' ('+shortDate(tg.le.date)+')':'')+'</div>';
   body='<div class="single'+(e.d?' on':'')+'"><span class="sub">Charge utilisée</span><div class="fs"><input class="inp" inputmode="decimal" placeholder="'+fmtW(tg.w)+'" value="'+(e.v!==undefined?esc(e.v):'')+'" data-i="one" data-f="v" data-id="'+id+'" data-d="'+d+'">'+chk+'</div></div>';}
  else if(it.kind==='pace'){const t=it.base;const le=lastEntry(it.key,d);const tg=le&&le.e.v?Math.max(60,parseT(le.e.v)-1):t;info='<div class="sub">'+esc(it.txt)+' · cible <b class="rust">'+mmss(tg)+' /500 m</b>'+(le?' · dernière fois '+esc(le.e.v):'')+'</div>';
   body='<div class="single'+(e.d?' on':'')+'"><span class="sub">Split moyen /500 m</span><div class="fs"><input class="inp" placeholder="'+mmss(tg)+'" value="'+(e.v!==undefined?esc(e.v):'')+'" data-i="one" data-f="v" data-id="'+id+'" data-d="'+d+'">'+chk+'</div></div>';}
  else if(it.kind==='cardio'){const le=lastEntry(it.key,d);info='<div class="sub">'+esc(it.txt)+(le&&le.e.v?' · dernière fois '+esc(le.e.v)+' ('+shortDate(le.date)+')':'')+'</div>';
   body='<div class="single'+(e.d?' on':'')+'"><span class="sub">Résultat ('+esc(it.ph||'')+')</span><div class="fs"><input class="inp" placeholder="—" value="'+(e.v!==undefined?esc(e.v):'')+'" data-i="one" data-f="v" data-id="'+id+'" data-d="'+d+'">'+chk+'</div></div>';}
  else if(it.kind==='station'){const tg=loadTarget(it,d);info='<div class="sub">Temps cible <b class="rust">'+mmss(tg.t)+'</b>'+(it.base!==undefined?' · charge <b class="rust">'+fmtW(tg.w)+' '+esc(it.unit||'kg')+'</b>':'')+(tg.le?' · dernière fois '+(tg.le.e.t?esc(tg.le.e.t):'—')+' ('+shortDate(tg.le.date)+')':'')+'</div>';
   body='<div class="single'+(e.d?' on':'')+'"><span class="sub">'+(it.base!==undefined?'Charge · temps':'Temps (m:ss)')+'</span><div class="fs">'+(it.base!==undefined?'<input class="inp" inputmode="decimal" placeholder="'+fmtW(tg.w)+'" value="'+(e.v!==undefined?esc(e.v):'')+'" data-i="one" data-f="v" data-id="'+id+'" data-d="'+d+'">':'')+'<input class="inp" placeholder="'+mmss(tg.t)+'" value="'+(e.t!==undefined?esc(e.t):'')+'" data-i="one" data-f="t" data-id="'+id+'" data-d="'+d+'">'+chk+'</div></div>';}}
 const pg=exProg(d,id),allD=exAllDone(d,id);R.col=R.col||{};const open=R.col[d+id]!==undefined?R.col[d+id]:!allD;
 const summ=allD?'<span class="mo">✓ Terminé</span>':(pg[0]?pg[0]+'/'+pg[1]+' séries':(it.kind==='lift'?setsFor(it,d)+' × '+it.reps[0]+(it.reps[1]!==it.reps[0]?'–'+it.reps[1]:''):(it.kind==='time'?setsFor(it,d)+' séries':'à faire')));
 const infoBlk='<details class="tip info"><summary>Infos · technique · réglages</summary>'+descHTML(patFor(id,it.name))+techHTML(id,d,e0)+tipHTML(it.name)+'</details>';
 return'<div class="ex'+(allD?' dn':'')+(open?'':' col')+'"><div class="ex-h" style="align-items:center;gap:12px"><button class="exfig" data-a="exmodal" data-id="'+id+'" data-d="'+d+'" aria-label="Voir les variantes">'+figFor(id,it.name)+'</button><button class="exhd grow" data-a="excol" data-id="'+id+'" data-d="'+d+'"><div class="ex-n">'+esc(it.name)+'</div><div class="sub">'+summ+'</div></button><span class="chev">'+(open?'▾':'▸')+'</span></div><div class="exbody">'+(sel?'<div style="margin:0 0 8px">'+sel+'</div>':'')+infoBlk+info+body+'</div></div>';}

/* ---- panneau activités libres ---- */
function actPanel(d){const list=S.acts[d]||[];let h='<div class="card"><div class="rowb" style="margin-bottom:6px"><h3 class="d" style="margin:0">Activités enregistrées</h3><button class="btn sm '+(R.addOpen?'ghost':'')+'" data-a="toggleAdd">'+ic(R.addOpen?'x':'plus',14)+(R.addOpen?'Fermer':'Ajouter')+'</button></div>';
 if(!list.length)h+='<div class="sub" style="padding:6px 0">Moto, VTT, salle, running, rando, piscine… ajoute ce que tu as fait ce jour-là.</div>';
 list.forEach((a,i)=>{const T=ACT[a.t]||ACT.autre;const ex=[];if(a.min)ex.push(a.min+' min');if(a.rpe)ex.push('RPE '+a.rpe);if(a.dist)ex.push(a.dist+(a.t==='piscine'?' m':' km'));if(a.elev)ex.push('D+ '+a.elev+' m');if(a.runs)ex.push(a.runs+' manches');if(a.assist&&a.assist!==ASSIST[0])ex.push(a.assist);
  h+='<div class="ls"><span style="color:'+CATS[T.cat].c+'">'+ic(T.ic,18)+'</span><div class="grow"><b>'+T.l+'</b> <span class="sub">'+ex.join(' · ')+(a.min&&a.rpe?' · charge '+a.min*a.rpe+' UA':'')+'</span>'+(a.note?'<div class="sub">'+esc(a.note)+'</div>':'')+((a.ex||[]).length?'<div class="sub">'+a.ex.map(x=>esc(x.n)+' '+x.sets+'×'+x.reps+(x.w?' @'+x.w:'')).join(' · ')+'</div>':'')+'</div><button class="x" data-a="delAct" data-d="'+d+'" data-n="'+i+'">'+ic('trash',16)+'</button></div>';});
 if(R.addOpen){const T=ACT[R.act];const dr=R.draft;
  h+='<div style="margin-top:10px;border-top:1px solid var(--gb);padding-top:10px"><div class="row wrap" style="margin-bottom:10px">'+Object.keys(ACT).map(k=>'<button class="chip'+(R.act===k?' on':'')+'" style="--c:'+CATS[ACT[k].cat].c+'" data-a="actType" data-t="'+k+'">'+ACT[k].l+'</button>').join('')+'</div>';
  h+='<div class="g3"><div><label class="lab">Durée (min)</label><input class="inp" inputmode="numeric" placeholder="60" value="'+esc(dr.min||'')+'" data-i="draft" data-f="min"></div><div><label class="lab">RPE (1–10)</label><input class="inp" inputmode="numeric" placeholder="7" value="'+esc(dr.rpe||'')+'" data-i="draft" data-f="rpe"></div>'+(T.extra[0]?'<div><label class="lab">'+T.extra[0].l+'</label><input class="inp" inputmode="decimal" placeholder="'+T.extra[0].ph+'" value="'+esc(dr[T.extra[0].k]||'')+'" data-i="draft" data-f="'+T.extra[0].k+'"></div>':'<div></div>')+'</div>';
  if(T.extra[1])h+='<div style="margin-top:8px"><label class="lab">'+T.extra[1].l+'</label><input class="inp" inputmode="decimal" placeholder="'+T.extra[1].ph+'" value="'+esc(dr[T.extra[1].k]||'')+'" data-i="draft" data-f="'+T.extra[1].k+'"></div>';
  if(T.assist)h+='<div style="margin-top:8px"><label class="lab">Assistance e-bike</label><select class="sel" data-i="draft" data-f="assist">'+ASSIST.map(a=>'<option'+(dr.assist===a?' selected':'')+'>'+a+'</option>').join('')+'</select></div>';
  if(R.act==='muscu'){h+='<div style="margin-top:10px"><label class="lab">Exercices (optionnel — alimente le volume)</label>';for(let i=0;i<4;i++){const x=(dr.ex||[])[i]||{};h+='<div style="display:grid;grid-template-columns:1.6fr 1fr .6fr .6fr .7fr;gap:4px;margin-bottom:4px"><input class="inp" style="padding:7px 6px;font-size:14px;text-align:left" placeholder="Exo" value="'+esc(x.n||'')+'" data-i="dex" data-n="'+i+'" data-f="n"><select class="sel" style="padding:7px 4px;font-size:13px" data-i="dex" data-n="'+i+'" data-f="m"><option value="">Muscle</option>'+MUSCLES.map(m=>'<option'+(x.m===m?' selected':'')+'>'+m+'</option>').join('')+'</select><input class="inp" style="padding:7px 2px;font-size:14px" inputmode="numeric" placeholder="séries" value="'+esc(x.sets||'')+'" data-i="dex" data-n="'+i+'" data-f="sets"><input class="inp" style="padding:7px 2px;font-size:14px" inputmode="numeric" placeholder="reps" value="'+esc(x.reps||'')+'" data-i="dex" data-n="'+i+'" data-f="reps"><input class="inp" style="padding:7px 2px;font-size:14px" inputmode="decimal" placeholder="kg" value="'+esc(x.w||'')+'" data-i="dex" data-n="'+i+'" data-f="w"></div>';}h+='</div>';}
  h+='<div style="margin-top:8px"><label class="lab">Note</label><input class="inp" placeholder="Ressenti, circuit, spot…" value="'+esc(dr.note||'')+'" data-i="draft" data-f="note"></div><button class="btn full" style="margin-top:12px" data-a="saveAct" data-d="'+d+'">Enregistrer l\'activité</button></div>';}
 return h+'</div>';}

/* ---- vue JOUR ---- */
VIEWS.day=function(){
 const d=R.d,id=dayId(d),P=progOf(d),SO=soirOf(P,d),L=S.logs[d]||{};
 let h='<div class="rowb" style="margin-bottom:10px"><button class="btn ghost sm" data-a="shiftDay" data-n="-1">'+ic('left',16)+'</button><div style="text-align:center"><div class="mono-s">'+(d===today()?'Aujourd\'hui · ':'')+'séance '+P.bib+'</div><div class="d" style="font-size:1.25rem">'+longDate(d)+'</div></div><button class="btn ghost sm" data-a="shiftDay" data-n="1">'+ic('right',16)+'</button></div>'+dayStrip(d);
 h+='<div class="row wrap" style="margin:12px 0"><span class="badge" style="--c:'+DIFF[P.diff].c+'">'+DIFF[P.diff].l+'</span>'+(SO&&SO.variant?'<span class="badge o" style="--c:var(--glacier)">VARIANTE '+SO.variant+'</span>':'')+'</div>';
 // midi : run
 if(P.run){const r=runItem(P.run,d),tg=runTarget(r,d),rl=L.run||{};
  const perKm=r.seg<1000?tg.t/r.seg*1000:tg.t;
  h+='<div class="card acc" style="--acc:var(--rust)"><div class="rowb"><span class="mono-s">'+(P.run==='wed'?'Bloc course':'Midi · Course')+'</span><span class="sub">'+r.est+' min</span></div><h3 class="d" style="font-size:1.1rem;margin-top:4px">'+esc(r.name)+'</h3><div class="sub" style="margin:6px 0 10px">'+esc(r.det)+'</div>'
   +'<div class="tile" style="text-align:left;padding:10px"><div class="mono-s">Allure cible</div><div class="d rust" style="font-size:1.5rem">'+(r.reps?r.reps+'×'+r.seg+' m en '+mmss(tg.t):mmss(tg.t)+' /km')+'</div>'+((r.reps&&r.seg<1000)||0?'<div class="sub">soit '+mmss(perKm)+' /km</div>':(r.reps?'<div class="sub">soit '+mmss(perKm)+' /km</div>':''))+(tg.le?'<div class="sub">Dernière fois ('+shortDate(tg.le.date)+') : '+esc(tg.le.e.v)+' → cible −3 s</div>':'<div class="sub">Première fois — allure de départ conseillée.</div>')+'</div>';
  if(rl.fin)h+='<div class="ins" style="margin-top:8px">'+ic('check',18).replace('<svg','<svg style="color:var(--moss)"')+'<span>Course terminée : <b>'+esc(rl.v)+'</b>'+(r.seg<1000?' / '+r.seg+' m':' /km')+' · '+rl.min+' min · RPE '+rl.rpe+' · charge '+rl.min*rl.rpe+' UA <a href="#" data-a="runedit" data-d="'+d+'" style="color:var(--glacier)">modifier</a></span></div>';
  else h+='<div class="g3" style="margin-top:10px"><div><label class="lab">Allure moy. '+(r.seg<1000?'/'+r.seg+' m':'/km')+'</label><input class="inp" id="runv" placeholder="'+mmss(tg.t)+'"></div><div><label class="lab">Durée (min)</label><input class="inp" id="runm" inputmode="numeric" value="'+r.est+'"></div><div><label class="lab">RPE</label><input class="inp" id="runr" inputmode="numeric" value="'+(r.cyc===5?5:(r.reps?8:6))+'"></div></div><button class="btn full" style="margin-top:10px" data-a="runfin" data-d="'+d+'">Terminer la course</button>';
  h+='</div>';}
 // soir
 if(SO){const sk=S.skip[d];
  h+='<div class="sec"><h2 class="d">'+esc(SO.title)+'</h2></div><div class="sub" style="margin:-4px 2px 10px">'+SO.dur+(P.optional?' · optionnel':'')+'</div>';
  if(sk)h+='<div class="card"><b>Séance sautée.</b> <div class="sub">Récupération prioritaire. Le volume des jambes de la semaine sera plus bas.</div><button class="btn ghost sm" style="margin-top:8px" data-a="skip" data-d="'+d+'">Restaurer la séance</button></div>';
  else{
   {const sp=sessProg(d,SO),pc=sp[1]?Math.round(sp[0]/sp[1]*100):0;h+='<div class="pgs"><div class="pgb"><i style="width:'+pc+'%"></i></div><span>'+sp[0]+'/'+sp[1]+' séries</span></div>';}h+=ssBar(d,SO);SO.blocks.forEach(b=>{h+='<div class="card"><div class="mono-s" style="margin-bottom:4px">'+esc(b.n)+'</div>'+ssBlock(b.ex,d)+'</div>';});
   h+='<div class="card"><div class="sub">'+esc(SO.note)+'</div></div>';
   if(L.fin)h+='<div class="card acc" style="--acc:var(--moss)"><div class="ins" style="border:0;padding:0">'+ic('check',20).replace('<svg','<svg style="color:var(--moss)"')+'<span>Séance terminée · <b>'+L.fin.min+' min</b></span></div><button class="btn ghost sm" style="margin-top:8px" data-a="finedit" data-d="'+d+'">Modifier</button></div>';
   else h+='<div class="card"><button class="btn mo full big" data-a="vall" data-d="'+d+'">'+ic('check',18)+'Valider toute la séance</button><div class="sub" style="margin:8px 2px 0">Remplit chaque série avec la charge et les reps prévues. Tu pourras corriger après.</div><button class="btn ghost full" style="margin-top:10px" data-a="fin" data-d="'+d+'">Terminer avec ce que j\'ai saisi</button><button class="btn ghost full" style="margin-top:8px" data-a="skip" data-d="'+d+'">Sauter cette séance</button></div>';}
 }else{
  h+='<div class="card acc" style="--acc:'+DIFF[P.diff].c+'"><h3 class="d" style="font-size:1.2rem">'+esc(P.title)+'</h3><div class="sub" style="margin-top:6px">'+esc(P.note)+'</div></div>';}
 h+=actPanel(d);
 return h;};

/* ---- ACCUEIL ---- */
VIEWS.home=function(){
 const t=today(),id=dayId(t),P=progOf(t),SO0=soirOf(P,t),mon=mondayOf(t),wc=weekCounts(mon);
 const title=SO0?SO0.title:P.title;const sub=[];if(SO0)sub.push(SO0.dur+(SO0.variant?' · variante '+SO0.variant:''));
 let h='<div class="card"><div class="mono-s">'+longDate(t)+'</div><div class="d" style="font-size:1.5rem;margin:2px 0 0">Salut Bastien</div></div>';
 h+='<button class="hero" style="--acc:'+DIFF[P.diff].c+'" data-a="openDay" data-d="'+t+'"><span class="ic">'+ic(P.rest?'heart':(id==='sam'?'flag':'play'),22)+'</span><span class="grow"><span class="mono-s" style="display:block">Séance du jour'+(dayDone(t)?' · ✓ faite':'')+'</span><span class="t">'+esc(title)+'</span><span class="sub" style="display:block;margin-top:2px">'+esc(sub.join(' · '))+'</span></span>'+ic('right',20)+'</button>';
 h+='<div class="g4"><div class="tile"><div class="v">'+wc.done+'<small>/'+wc.planned+'</small></div><div class="l">Séances cette sem.</div></div><div class="tile"><div class="v">'+totalLogged()+'</div><div class="l">Séances loguées</div></div><div class="tile"><div class="v">'+(weekVolume(mon).tonT/1000).toFixed(1)+'<small>t</small></div><div class="l">Tonnage sem.</div></div><div class="tile"><div class="v">'+Math.round(weekVolume(mon).nSets)+'</div><div class="l">Séries cette sem.</div></div></div>';
 h+='<div class="sec"><h2 class="d">Cette semaine</h2></div><div class="card">'+dayStrip(t)+'<div class="sub" style="margin-top:8px">+ '+wc.extra+' activité'+(wc.extra>1?'s':'')+' libre'+(wc.extra>1?'s':'')+'</div></div>';
 const ins=insights();h+='<div class="sec"><h2 class="d">À savoir</h2></div><div class="card">'+ins.map(x=>'<div class="ins"><span style="color:'+KCOL[x.k]+'">'+ic(x.i,18)+'</span><span>'+x.x+'</span></div>').join('')+'</div>';
 const v=weekVolume(mon),pl=plannedVolume(mon);h+='<div class="sec"><h2 class="d">Volume de la semaine</h2><button class="btn ghost sm" data-a="nav" data-v="stats" style="margin-left:auto">Détails</button></div><div class="card">'+MUSCLES.map(m=>mbar(m,v.sets[m],MUSCLE_TGT[m],pl[m])).join('')+'<div class="sub">Séries effectives (principal = 1, secondaire = 0,5). Tonnage : <b>'+Math.round(v.tonT).toLocaleString('fr-FR')+' kg</b></div></div>';
 return h;};

/* ---- CALENDRIER ---- */
VIEWS.cal=function(){
 const y=R.m.y,mo=R.m.mo,first=new Date(y,mo,1),start=(first.getDay()+6)%7,dim=new Date(y,mo+1,0).getDate(),t=today();
 let h='<div class="rowb" style="margin-bottom:10px"><button class="btn ghost sm" data-a="calMonth" data-n="-1">'+ic('left',16)+'</button><div class="d" style="font-size:1.3rem">'+MONTHS[mo]+' '+y+'</div><button class="btn ghost sm" data-a="calMonth" data-n="1">'+ic('right',16)+'</button></div><div class="card"><div class="cal">'+['L','M','M','J','V','S','D'].map(x=>'<div class="dw">'+x+'</div>').join('');
 for(let i=0;i<start;i++)h+='<div></div>';
 for(let dd=1;dd<=dim;dd++){const s=y+'-'+pad(mo+1)+'-'+pad(dd),P=progOf(s),acts=S.acts[s]||[];
  h+='<button class="cd'+(s===t?' today':'')+(s<t&&!dayDone(s)&&P.soir?' miss':'')+'" data-a="openDay" data-d="'+s+'"><span>'+dd+'</span><span class="pd" style="background:'+DIFF[P.diff].c+'"></span>'+(acts.length?'<span class="ms">'+acts.slice(0,3).map(a=>'<i style="background:'+CATS[(ACT[a.t]||ACT.autre).cat].c+'"></i>').join('')+'</span>':'')+(dayDone(s)?'<span class="ck">'+ic('check',11)+'</span>':'')+'</button>';}
 h+='</div><div class="leg">'+['bleue','noire','verte','moto','fermee'].map(k=>'<span><i style="background:'+DIFF[k].c+'"></i>'+({bleue:'Muscu',noire:'Cardio / Hyrox',verte:'Léger / optionnel',moto:'Moto',fermee:'Repos'})[k]+'</span>').join('')+'</div></div>';
 h+='<button class="btn full" data-a="openAdd">'+ic('plus',16)+'Ajouter une séance perso (aujourd\'hui)</button>';

 h+='<div class="card"><div class="sub">Le programme alterne entre <b>variante A</b> et <b>variante B</b> toutes les 4 semaines (autres exercices, mêmes muscles). Le cardio facile (vélo, marche en pente, elliptique, rameur) tourne chaque semaine.</div></div>';
 return h;};

/* ---- SUIVI / STATS ---- */
VIEWS.stats=function(){
 const mon=R.sw,t=today(),v=weekVolume(mon),pl=plannedVolume(mon);
 let h='<div class="rowb" style="margin-bottom:10px"><button class="btn ghost sm" data-a="statWeek" data-n="-1">'+ic('left',16)+'</button><div style="text-align:center"><div class="d" style="font-size:1.2rem">Semaine du '+shortDate(mon)+'</div><div class="sub">Variante '+variantOf(mon)+'</div></div><button class="btn ghost sm" data-a="statWeek" data-n="1">'+ic('right',16)+'</button></div>';
 h+='<div class="g3" style="margin-bottom:12px"><div class="tile"><div class="v">'+Math.round(v.nSets)+'</div><div class="l">Séries</div></div><div class="tile"><div class="v">'+(v.tonT>=1000?(v.tonT/1000).toFixed(1)+'<small>t</small>':Math.round(v.tonT)+'<small>kg</small>')+'</div><div class="l">Tonnage</div></div><div class="tile"><div class="v">'+Object.keys(S.logs).filter(d=>d>=mon&&d<addDays(mon,7)&&S.logs[d].fin).length+'</div><div class="l">Séances</div></div></div>';
 h+='<div class="card"><h3 class="d">Volume par groupe musculaire</h3>'+MUSCLES.map(m=>mbar(m,v.sets[m],MUSCLE_TGT[m],pl[m])).join('')+'<div class="sub">Zone verte = fourchette hypertrophie (séries/semaine). Tonnage par muscle : '+MUSCLES.filter(m=>v.ton[m]>0).map(m=>m+' '+Math.round(v.ton[m]).toLocaleString('fr-FR')+' kg').join(' · ')+'</div></div>';
 const lb=[],tn=[];for(let i=7;i>=0;i--){const m=addDays(mondayOf(t),-7*i);const vv=weekVolume(m);tn.push(vv.tonT/1000);lb.push(shortDate(m));}
 h+='<div class="card"><h3 class="d">Tonnage (tonnes) — 8 semaines</h3>'+barsSVG(tn,lb,'#4DA3E8',x=>x.toFixed(1))+'</div>';
 // PR
 const prs=[];Object.keys(hist()).forEach(k=>{const idn=k.split('::')[0];if(!EX[idn]||EX[idn].kind!=='lift')return;const it=resolve(idn,k.split('::')[1]);let b=0,bs=null,bd='';hist()[k].forEach(x=>(x.e.sets||[]).forEach(s=>{if(s.d){const e=e1rm(it,s);if(e>b){b=e;bs=s;bd=x.date;}}}));if(bs)prs.push({n:it.name,e:b,s:bs,d:bd});});
 prs.sort((a,b)=>b.e-a.e);h+='<div class="card"><h3 class="d">Records (1RM estimé)</h3>'+(prs.length?prs.slice(0,12).map(p=>'<div class="ls"><span class="sun">'+ic('trophy',16)+'</span><div class="grow">'+esc(p.n)+'<div class="sub">'+fmtW(num(p.s.w))+' × '+num(p.s.r)+' · '+shortDate(p.d)+'</div></div><b class="m">'+Math.round(p.e)+' kg</b></div>').join(''):'<div class="sub">Tes records apparaîtront dès que tu loggues des séries.</div>')+'</div>';
 return h;};

/* ---- NUTRITION ---- */
VIEWS.nutri=function(){
 const d=R.nd,n=nutriDay(d),tg=nutriTargets(d);const w=S.weights.find(x=>x.d===d);const wt=weightTrend();
 const row=(l,v,t,u,c)=>'<div style="margin-bottom:10px"><div class="rowb" style="margin-bottom:4px"><span style="font-weight:600;font-size:13px">'+l+'</span><span class="m sub">'+Math.round(v)+' / '+t+' '+u+'</span></div><div class="bar"><i style="width:'+Math.min(100,v/t*100)+'%;--c:'+c+'"></i></div></div>';
 let h='<div class="rowb" style="margin-bottom:10px"><button class="btn ghost sm" data-a="nDay" data-n="-1">'+ic('left',16)+'</button><div style="text-align:center"><div class="d" style="font-size:1.2rem">'+longDate(d)+'</div><div class="sub">Objectif jour '+(dayId(d)==='dim'?'repos':'entraînement')+'</div></div><button class="btn ghost sm" data-a="nDay" data-n="1">'+ic('right',16)+'</button></div>';
 h+='<div class="card"><h3 class="d">Bilan du jour</h3>'+row('Calories',n.kcal,tg.kcal,'kcal','var(--rust)')+row('Protéines',n.p,tg.p,'g','var(--glacier)')+row('Glucides',n.c,tg.c,'g','var(--sun)')+row('Lipides',n.f,tg.f,'g','var(--moss)')+row('Eau',n.water,tg.water,'ml','#4DA3E8')
  +'<label class="lab" style="margin-top:12px">Ajouter un repas / collation</label><div class="g4" style="grid-template-columns:repeat(4,1fr);gap:6px"><input class="inp" id="nk" inputmode="numeric" placeholder="kcal"><input class="inp" id="np" inputmode="numeric" placeholder="prot g"><input class="inp" id="nc" inputmode="numeric" placeholder="gluc g"><input class="inp" id="nf" inputmode="numeric" placeholder="lip g"></div><div class="row wrap" style="margin-top:8px"><button class="btn sm" data-a="nAdd">Ajouter</button><button class="btn ghost sm" data-a="nQuick" data-k="150" data-p="25" data-c="5" data-f="3">+ Whey</button><button class="btn ghost sm" data-a="nQuick" data-k="600" data-p="40" data-c="70" data-f="15">+ Repas std</button><button class="btn ghost sm" data-a="nWater" data-n="250">+250 ml</button><button class="btn ghost sm" data-a="nWater" data-n="500">+500 ml</button><button class="btn ghost sm" data-a="nReset">Remettre à 0</button></div></div>';
 h+='<div class="card"><h3 class="d">Compléments</h3><div class="row wrap">'+S.set.sup.map(s=>'<button class="chip'+(n.sup.indexOf(s)>-1?' on':'')+'" data-a="nSup" data-s="'+esc(s)+'">'+esc(s)+'</button>').join('')+'</div></div>';
 h+='<div class="card"><h3 class="d">Poids du jour</h3><div class="row"><input class="inp" id="wk" inputmode="decimal" placeholder="76,0" value="'+(w?w.kg:'')+'" style="max-width:140px"><span class="sub">kg</span><button class="btn sm" data-a="wSave">Enregistrer</button></div>'+(wt&&wt.rate!==null?'<div class="sub" style="margin-top:8px">Tendance : <b>'+(wt.rate>=0?'+':'')+wt.rate.toFixed(2)+' kg/sem</b> (moyenne 7 j). Idéal en prise de masse : +0,25 à +0,5 kg/sem.</div>':'<div class="sub" style="margin-top:8px">Pèse-toi chaque matin : la tendance se calcule sur 7 jours.</div>')+'</div>';
 h+='<div class="card"><div class="sub">Repères pour toi (1,83 m, '+fmtW(bodyKg())+' kg) : ~'+S.set.kcal+' kcal les jours d\'entraînement, ~'+S.set.kcalRest+' au repos, protéines 1,9–2,2 g/kg, glucides 4,5–5,5 g/kg les jours de course/Hyrox, créatine 5 g/jour. Ajustable dans Réglages.</div></div>';
 return h;};

/* ---- RÉGLAGES ---- */
VIEWS.set=function(){
 const s=S.set;const ap=localStorage.getItem(LS_APIKEY);
 const f=(l,k,t,ph)=>'<div><label class="lab">'+l+'</label><input class="inp" '+(t||'inputmode="decimal"')+' value="'+esc(s[k])+'" placeholder="'+(ph||'')+'" data-i="cfg" data-f="'+k+'"></div>';
 let h='<div class="card"><h3 class="d">Séances</h3><div class="row"><button class="chip'+(s.autoTimer?' on':'')+'" data-a="tgl" data-k="autoTimer">Minuteur de repos auto</button></div></div>';
 const sw=Object.keys(S.subs).filter(k=>S.subs[k]!==EX[k].name);
 h+='<div class="card"><h3 class="d">Mes exercices modifiés</h3>'+(sw.length?sw.map(k=>'<div class="ls"><div class="grow">'+esc(EX[k].name)+' → <b>'+esc(S.subs[k])+'</b></div><button class="btn ghost sm" data-a="unsub" data-id="'+k+'">Rétablir</button></div>').join(''):'<div class="sub">Aucun. Change un exercice depuis le menu déroulant de chaque séance (équivalents machines Fitness Park inclus) — chaque variante garde son propre historique de charges.</div>')+'</div>';
 h+='<div class="card"><h3 class="d">Coach IA</h3><div class="sub" style="margin-bottom:8px">Dans Claude, le coach fonctionne sans clé. Hors Claude, ajoute une clé API Anthropic (stockée uniquement sur cet appareil, jamais dans le fichier).</div><div class="row"><input class="inp" type="password" id="apik" placeholder="sk-ant-…" value="'+(ap?'••••••••••':'')+'"><button class="btn sm" data-a="saveKey">OK</button>'+(ap?'<button class="btn ghost sm" data-a="delKey">Effacer</button>':'')+'</div></div>';
 h+='<div class="card"><h3 class="d">Sauvegarde</h3><div class="sub" style="margin-bottom:8px">'+(saveOK?'Tes données sont enregistrées à chaque modification sur cet appareil.':'<b class="em">Stockage indisponible (navigation privée ?)</b>')+' Fais une sauvegarde de temps en temps.</div><div class="row wrap"><button class="btn sm" data-a="exp">Télécharger</button><button class="btn ghost sm" data-a="expCopy">Copier</button><button class="btn ghost sm" data-a="impBtn">Importer</button><button class="btn ghost sm" style="color:var(--ember)" data-a="reset">Tout effacer</button></div><textarea id="impta" class="inp hide" rows="5" style="margin-top:8px;font-size:12px" placeholder="Colle ici le contenu de ta sauvegarde puis valide"></textarea><button class="btn sm hide" id="impok" style="margin-top:8px" data-a="impGo">Importer ces données</button></div>';
 h+='<div class="card"><h3 class="d">Icône sur iPhone</h3><div class="sub">Safari → bouton Partager → <b>Sur l\'écran d\'accueil</b>. Ouvre ensuite l\'app <b>depuis l\'icône</b> et garde toujours ce même mode d\'ouverture : les données d\'une icône et de Safari sont stockées séparément — fais une sauvegarde (ci-dessus) avant de changer.</div></div>';
 return h;};
