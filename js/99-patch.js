/* ===================== REMPLACER UNE SÉANCE / COURSE ===================== */
(function(){
 const RN=[
  ['rn-easy30','Course facile — 30 min','30 min à allure facile (tu peux parler). 5 min de marche avant et après.','km parcourus','- 30m Z2'],
  ['rn-easy45','Course facile — 45 min','45 min à allure facile, régulier. Hydrate-toi.','km parcourus','- 45m Z2'],
  ['rn-long','Sortie longue — 60 min','60 min en endurance, allure très facile. Ne cherche pas la vitesse.','km parcourus','- 60m Z2'],
  ['rn-tempo','Tempo — 20 min seuil','10 min d\'échauffement facile, 20 min à allure soutenue mais tenable, 5–10 min de retour au calme.','allure moyenne /km','- 10m Z2\n- 20m Z4\n- 5m Z1'],
  ['rn-fart','Fartlek — 30 min','10 min facile, puis 6 × (1 min vite / 2 min facile), 5 min de retour au calme.','km parcourus','- 10m Z2\n\n6x\n- 1m Z4\n- 2m Z2\n\n- 5m Z1']];
 window.RN_STEPS={'cd-run':'- 5m Z2\n\n8x\n- 400m Z5\n- 90s Z1\n\n- 5m Z1'};
 RN.forEach(r=>{def(r[0],{name:r[1],txt:r[2],kind:'cardio',ph:r[3]});PAT_DEFAULT[r[0]]='run';window.RN_STEPS[r[0]]=r[4];});
 const RT=[
  {k:'rn-easy30',t:'Course facile 30 min',s:'Course 30',min:35,diff:'verte',n:'Allure où tu peux parler. Idéal pour récupérer.'},
  {k:'rn-easy45',t:'Course facile 45 min',s:'Course 45',min:50,diff:'verte',n:'Endurance de base, régulier.'},
  {k:'rn-long',t:'Sortie longue 60 min',s:'Sortie longue',min:65,diff:'bleue',n:'Très facile, on vise la durée.'},
  {k:'rn-tempo',t:'Tempo 20 min',s:'Tempo',min:45,diff:'noire',n:'Séance exigeante : à éviter la veille de ta sortie moto.'},
  {k:'cd-run',t:'Fractionné 8 × 400 m',s:'Fractionné',min:40,diff:'noire',n:'Séance exigeante : à éviter la veille de ta sortie moto.'},
  {k:'rn-fart',t:'Fartlek 30 min',s:'Fartlek',min:40,diff:'bleue',n:'Variations d\'allure ludiques.'}];
 def('hx-run1k',{name:'Course 1 km',kind:'station',tb:300});PAT_DEFAULT['hx-run1k']='run';
 const HX=[
  {k:'hx-sim',t:'Hyrox — Simulation complète',s:'Hyrox complet',min:100,diff:'noire',n:'8 × (1 km de course + 1 station), dans l\'ordre de la course. Séance très dure : au maximum une fois par mois, jamais la veille de la moto.',
   b:[['SkiErg 1000 m','mer-skierg'],['Sled push','mer-sledpush'],['Sled pull','mer-sledpull'],['Burpees broad jump','mer-burpee'],['Rameur 1000 m','mer-row'],['Farmer carry','mer-farmer'],['Sandbag lunges','mer-lunges'],['Wall balls','mer-wb']].map((x,i)=>({n:(i+1)+'. Course 1 km + '+x[0],ex:['hx-run1k~'+(i+1),x[1]]}))},
  {k:'hx-half',t:'Hyrox — Demi-simulation (4 stations)',s:'Hyrox demi',min:60,diff:'noire',n:'4 × (1 km + station), allure de course. Bon test sans exploser les jambes.',
   b:[['SkiErg 1000 m','mer-skierg'],['Sled push','mer-sledpush'],['Burpees broad jump','mer-burpee'],['Wall balls','mer-wb']].map((x,i)=>({n:(i+1)+'. Course 1 km + '+x[0],ex:['hx-run1k~'+(i+1),x[1]]}))},
  {k:'hx-comp',t:'Hyrox — Course sous fatigue',s:'Course fatigue',min:55,diff:'noire',n:'Station puis 1 km sans repos : apprend à courir jambes lourdes. Garde une allure régulière.',
   b:[['Burpees broad jump','mer-burpee'],['Wall balls','mer-wb'],['Sandbag lunges','mer-lunges'],['Sled push','mer-sledpush']].map((x,i)=>({n:(i+1)+'. '+x[0]+' puis 1 km',ex:[x[1],'hx-run1k~'+(i+1)]}))},
  {k:'hx-circ',t:'Hyrox — Circuit stations',s:'Circuit Hyrox',min:45,diff:'bleue',n:'3 tours enchaînés : sled push, farmer carry, wall balls, burpees. Repos 2 min entre les tours.',b:[{n:'Circuit · 3 tours',ex:['cd-circuit']}]},
  {k:'hx-force',t:'Hyrox — Force spécifique',s:'Force Hyrox',min:55,diff:'bleue',n:'Charges lourdes, séries courtes, repos complet entre les stations.',b:[{n:'Stations lourdes',ex:['mer-sledpush','mer-sledpull','mer-farmer','mer-lunges','mer-wb']}]},
  {k:'hx-erg',t:'Hyrox — Machines cardio',s:'SkiErg + rameur',min:40,diff:'bleue',n:'Cardio machines pour le moteur : SkiErg et rameur, sans pause.',b:[{n:'Machines · 5 tours',ex:['cd-erg']},{n:'Stations seules',ex:['mer-skierg','mer-row']}]}];
 const DAYS=['lun','mar','mer','jeu','ven','sam','dim'];
 function tpl(k){
  const P2=PROG2[k];
  if(P2)return{soir:P2.soir,short:P2.short,diff:P2.diff,title:P2.title,note:P2.note,rest:P2.rest,suggest:P2.suggest,optional:P2.optional,run:P2.run,load:P2.load};
  const hx=HX.find(x=>x.k===k);
  if(hx)return{soir:{title:hx.t,short:hx.s,dur:hx.min+' min',min:hx.min,A:hx.b,note:hx.n},short:hx.s,diff:hx.diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined};
  const r=RT.find(x=>x.k===k);
  if(r)return{soir:{title:r.t,short:r.s,dur:r.min+' min',min:r.min,A:[{n:r.t,ex:[r.k]}],note:r.n},short:r.s,diff:r.diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined};
  return null;}
 const _pf=progOf;
 progOf=function(d,id){const P=_pf.apply(this,arguments);if(id||!P||d<V2)return P;const L=S.logs&&S.logs[d];const k=L&&L.swap;if(!k)return P;const T=tpl(k);return T?Object.assign({},P,T):P;};
 const effKey=d=>(S.logs[d]&&S.logs[d].swap)||dayId(d);
 const reset=L=>{L.ss=[];L.add=[];};
 function setSwap(d,k){const L=S.logs[d]=S.logs[d]||{};if(k===dayId(d))delete L.swap;else L.swap=k;reset(L);}
 function closeSw(){const o=document.getElementById('swov');if(o)o.remove();}
 function openSw(d){closeSw();const o=document.createElement('div');o.id='swov';o.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center';
  const btn=(k,t,sub)=>'<button class="btn ghost" style="text-align:left;justify-content:flex-start;flex-direction:column;align-items:flex-start;gap:2px" data-sw="'+k+'"><span>'+esc(t)+'</span>'+(sub?'<span class="sub">'+esc(sub)+'</span>':'')+'</button>';
  const sec=t=>'<div class="mono-s" style="margin:8px 0 2px">'+t+'</div>';
  let h='<div style="background:var(--panel);width:100%;max-width:560px;max-height:88vh;border-radius:18px 18px 0 0;padding:16px;display:flex;flex-direction:column;gap:6px;overflow:auto"><div class="row" style="justify-content:space-between;align-items:center"><b style="font-size:16px">Changer la séance du '+longDate(d)+'</b><button class="btn ghost sm" id="swx">Fermer</button></div>';
  if(S.logs[d]&&S.logs[d].swap)h+=btn('__reset','↩ Remettre la séance prévue','');
  h+=sec('Musculation (ton programme)');
  ['lun','mar','mer','jeu'].forEach(k=>{const P2=PROG2[k];if(P2&&P2.soir)h+=btn(k,P2.soir.title,P2.label);});
  h+=sec('Course');RT.forEach(r=>h+=btn(r.k,r.t,r.min+' min'));
  h+=sec('Hyrox');HX.forEach(r=>h+=btn(r.k,r.t,r.min+' min'));
  h+=sec('Autre');h+=btn('dim','Repos complet','');h+=btn('sam','Motocross / sortie libre','');h+=btn('ven','Jour libre (VTT, moto…)','');
  h+=sec('Échanger avec un autre jour de la semaine');
  for(let i=0;i<7;i++){const x=addDays(mondayOf(d),i);if(x===d)continue;const Px=progOf(x);h+=btn('__x'+x,'↔ '+Px.label+' : '+(Px.soir?Px.soir.title:(Px.title||Px.short)),'');}
  h+='</div>';o.innerHTML=h;document.body.appendChild(o);
  o.addEventListener('click',e=>{if(e.target===o||e.target.id==='swx'){closeSw();return;}const b=e.target.closest('[data-sw]');if(!b)return;const k=b.dataset.sw;
   if(k==='__reset')setSwap(d,dayId(d));
   else if(k.indexOf('__x')===0){const x=k.slice(3),kd=effKey(d),kx=effKey(x);setSwap(d,kx);setSwap(x,kd);}
   else setSwap(d,k);
   save();closeSw();render(true);toast('Séance modifiée ✓');});}
 Object.assign(A,{swapday:d=>openSw(d.d)});
 const _vd=VIEWS.day;
 VIEWS.day=function(){let h=_vd();const d=R.d;const sw=S.logs[d]&&S.logs[d].swap;
  const bar='<div class="row wrap" style="gap:6px;margin:8px 0 0"><button class="btn ghost sm" data-a="swapday" data-d="'+d+'">🔁 Changer la séance</button><button class="btn ghost sm" data-a="icuDay" data-d="'+d+'">⌚ Envoyer sur ma montre</button><button class="btn ghost sm" data-a="icuRm" data-d="'+d+'">✕ Retirer</button>'+(sw?'<span class="sub">séance remplacée</span>':'')+'</div>';
  const mk='<div class="row wrap" style="margin:12px 0"><span class="badge"';const i=h.indexOf(mk);return i<0?h+bar:h.slice(0,i)+bar+h.slice(i);};
 /* Intervals : séance de course = type Run avec étapes */
 const _ie=window.__icuEventsHook;
})();

boot();
if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}
