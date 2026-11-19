/* ===================== COQUILLE : barre du bas à 4 onglets + bouton central, en-tête de séance, accueil, gestes ===================== */
(function(){
 /* ---------- barre du bas : 4 onglets + bouton d'actions ---------- */
 const TABS=[['home','Accueil','home'],['day','Séance','dumbbell'],null,['repas','Repas','apple'],['stats','Suivi','chart']];
 renderNav=function(){const n=document.getElementById('nav');if(!n)return;
  n.innerHTML='<div class="brand">'+ic('dumbbell',18)+'TRAINING</div>'
   +TABS.map(t=>t?'<button class="nb'+(R.v===t[0]?' on':'')+'" data-a="'+(t[0]==='day'?'openDay':'nav')+'" data-v="'+t[0]+'">'+ic(t[2],22)+'<span>'+t[1]+'</span></button>'
     :'<button class="nplus'+(R.sheet?' on':'')+'" data-a="sheet" aria-label="Actions">'+ic('plus',26)+'<span>Actions</span></button>').join('');}

 /* ---------- feuille d'actions ---------- */
 const SHEET=[
  ['Séance du jour','dumbbell','openDay',{}],
  ['Mes repas','apple','nav',{v:'repas'}],
  ['Calendrier','cal','nav',{v:'cal'}],
  ['Bilan du jour','chart','nav',{v:'nutri'}],
  ['Activité libre','bike','actQuick',{}],
  ['Coach IA','chat','chat',{}],
  ['Minuteur 2 min','timer','tQuick',{}],
  ['Réglages','gear','nav',{v:'set'}]];
 function sheetHTML(){return '<div class="sheet-bd" data-a="sheetClose"></div><div class="sheet"><div class="sheet-g"></div>'
  +'<div class="sheet-t">Que veux-tu faire ?</div><div class="sheet-grid">'
  +SHEET.map((s,i)=>'<button class="sact" data-a="sheetGo" data-i="'+i+'"><span class="sact-i">'+ic(s[1],22)+'</span><span>'+s[0]+'</span></button>').join('')
  +'</div></div>';}
 function openSheet(){R.sheet=true;const h=document.getElementById('dlg');h.innerHTML=sheetHTML();h.classList.add('on');h.classList.add('sheetmode');renderNav();}
 function closeSheet(){R.sheet=false;const h=document.getElementById('dlg');h.classList.remove('on');h.classList.remove('sheetmode');h.innerHTML='';renderNav();}
 Object.assign(A,{
  sheet:()=>R.sheet?closeSheet():openSheet(),
  sheetClose:closeSheet,
  sheetGo:d=>{const s=SHEET[+d.i];closeSheet();const f=A[s[2]];if(f)f(Object.assign({},s[3]));},
  actQuick:()=>{R.addOpen=true;R.d=today();go('day');setTimeout(()=>{const e=document.querySelector('[data-a="toggleAdd"]');e&&e.scrollIntoView({block:'center',behavior:'smooth'});},120);},
  tQuick:()=>tStart(120)
 });

 /* ---------- anneau de progression ---------- */
 function ring(p,size,label,sub){const r=(size-8)/2,c=2*Math.PI*r,o=c*(1-Math.max(0,Math.min(1,p)));
  return '<div class="ring" style="width:'+size+'px;height:'+size+'px">'
   +'<svg viewBox="0 0 '+size+' '+size+'"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" class="rbg"/>'
   +'<circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" class="rfg" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+o.toFixed(1)+'"/></svg>'
   +'<div class="ring-c"><b>'+label+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</div></div>';}

 /* ---------- accueil : bandeau du jour ---------- */
 const _home=VIEWS.home;
 VIEWS.home=function(){const d=today(),P=progOf(d),SO=soirOf(P,d);
  const pr=SO?sessProg(d,SO):[0,0],pc=pr[1]?pr[0]/pr[1]:0;
  const mon=mondayOf(d);
  const strip=[0,1,2,3,4,5,6].map(i=>{const dd=addDays(mon,i),Pi=progOf(dd),Si=soirOf(Pi,dd),p=Si?sessProg(dd,Si):[0,0];
   const st=!Si?'rest':(p[1]&&p[0]>=p[1]?'done':(dd===d?'now':(dd<d?(p[0]?'part':'past'):'next')));
   return '<button class="wd '+st+'" data-a="goDay" data-d="'+dd+'"><span>'+['L','M','M','J','V','S','D'][i]+'</span><i></i></button>';}).join('');
  const hero='<section class="hero2">'
   +'<div class="h2-top"><span class="tag">'+(d===today()?'Aujourd\'hui':longDate(d))+'</span><span class="tag ghost">Séance '+(P.bib||'')+'</span><span class="h2-hi">Salut '+esc(window.hxName?window.hxName():'Bastien')+'</span></div>'
   +'<div class="h2-main"><div class="grow"><h2>'+esc(SO?SO.title:(P.title||'Repos'))+'</h2>'
   +'<div class="h2-sub">'+(SO?SO.dur+' · '+SO.blocks.length+' blocs':'Journée libre — moto, ski ou repos')+'</div></div>'
   +(SO?ring(pc,86,pr[0]+'/'+pr[1],'séries'):ic('heart',34))+'</div>'
   +'<div class="h2-act">'+(SO?'<button class="btn big" data-a="openDay">'+(pr[0]?'Reprendre la séance':'Commencer la séance')+'</button>':'<button class="btn ghost big" data-a="openDay">Voir la journée</button>')
   +'<button class="btn ghost big sq" data-a="nav" data-v="repas" aria-label="Repas">'+ic('apple',20)+'</button></div>'
   +'<div class="wkstrip">'+strip+'</div></section>';
  let h=_home();
  /* le bandeau remplace l'ancien bonjour + l'ancien bouton « séance du jour » */
  const cut=h.indexOf('<div class="g4">');if(cut>0)h=h.slice(cut);
  return hero+h;};
 Object.assign(A,{goDay:d=>{R.d=d.d;go('day');}});

 /* ---------- séance : en-tête collant avec anneau ---------- */
 const _day=VIEWS.day;
 VIEWS.day=function(){const h=_day(),d=R.d||today(),P=progOf(d),SO=soirOf(P,d);
  if(!SO)return h;const pr=sessProg(d,SO),pc=pr[1]?pr[0]/pr[1]:0;
  const bar='<div class="dayhead"><button class="dh-b" data-a="shiftDay" data-n="-1">'+ic('left',18)+'</button>'
   +'<div class="dh-c"><div class="dh-t">'+esc(SO.short||SO.title)+'</div><div class="dh-s">'+(d===today()?'Aujourd\'hui':shortDate(d))+' · '+SO.dur+'</div></div>'
   +ring(pc,44,pr[0]+'/'+pr[1],'')
   +'<button class="dh-b" data-a="shiftDay" data-n="1">'+ic('right',18)+'</button></div>';
  const pre=window.hxPreCard?hxPreCard(d):'';
  const k=h.indexOf('<div class="wk">');if(k<0)return bar+pre+h;
  const e=h.indexOf('</div>',k)+6;
  return bar+h.slice(k,e)+pre+h.slice(e);};

 /* ---------- gestes : balayer pour changer de jour ---------- */
 let sx=0,sy=0,sw=false;
 document.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;sw=(R.v==='day'||R.v==='repas');},{passive:true});
 document.addEventListener('touchend',e=>{if(!sw||!e.changedTouches.length)return;sw=false;
  const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
  if(Math.abs(dx)<70||Math.abs(dy)>50)return;
  if(R.v==='day'){A.shiftDay({n:dx<0?1:-1});}
 },{passive:true});
})();
