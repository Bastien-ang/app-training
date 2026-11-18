/* ===================== PRISE DE MASSE : salle en priorité, 1–2 courses, cardio plus long en fin de séance, week-end souple + plan alimentaire ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 /* ---------- 1. programme prise de masse : 5 séances, chaque muscle 2× par semaine, sans cardio de fin de séance ---------- */
 const S5=(title,short,min,A,B,note)=>({title:title,short:short,dur:Math.floor(min/60)+'h'+String(min%60).padStart(2,'0'),min:min,A:A,B:B,note:note});
 PROG2.lun.soir=S5('Pecs / Épaules / Triceps — lourd','Push lourd',80,
  [{n:'Pecs · 35 min',ex:['push-bench','push-incline','push-fly']},{n:'Épaules · 20 min',ex:['push-ohp','push-lateral']},{n:'Triceps · 18 min',ex:['pec-skull','push-tri']}],
  [{n:'Pecs · 35 min',ex:['pec-dbpress','pec-incbar','pec-deck']},{n:'Épaules · 20 min',ex:['sh-dbpress','sh-latcable']},{n:'Triceps · 18 min',ex:['pec-skull','pec-rope']}],
  'Séance lourde : 1ère série de chaque exo près de l\'échec (1 rep en réserve), repos 2–3 min sur les mouvements de base. Descente contrôlée 2–3 s, étirement complet en bas. Pas de cardio après : on garde l\'énergie pour manger et récupérer.');
 PROG2.mar.soir=S5('Jambes A — quadriceps','Jambes A',75,
  [{n:'Jambes · 60 min',ex:['leg-squat','leg-press','leg-ext','leg-curl','leg-calf']},{n:'Abdos · 10 min',ex:['th-hanging']}],
  [{n:'Jambes · 60 min',ex:['leg-press','ven-lunges','leg-ext','leg-curl','th-calfseat']},{n:'Abdos · 10 min',ex:['th-hanging']}],
  'Jour des quadriceps : profondeur complète au squat, repos 3 min. 2 séries de montée en charge avant la première série lourde. Bois et mange bien avant, c\'est la séance la plus coûteuse de la semaine.');
 PROG2.mer.soir=S5('Dos / Biceps — lourd','Pull lourd',80,
  [{n:'Dos · 45 min',ex:['pull-pullup','pull-rowbar','pull-rowcable','pull-pulldown']},{n:'Arrière d\'épaule · 8 min',ex:['sh-birds']},{n:'Biceps · 18 min',ex:['pull-curlbar','pull-curlinc']}],
  [{n:'Dos · 45 min',ex:['back-pulldown','back-tbar','back-dbrow','back-pullover']},{n:'Arrière d\'épaule · 8 min',ex:['pull-face']},{n:'Biceps · 18 min',ex:['back-curlham','back-curlcable']}],
  'Tire avec les coudes, serre les omoplates en fin de mouvement, descente lente. Biceps en fin de séance, sans élan.');
 PROG2.jeu.soir=S5('Épaules / Bras + rappel pecs & dos','Épaules + bras',75,
  [{n:'Épaules · 25 min',ex:['sh-dbpress','sh-latcable','pull-face']},{n:'Rappel pecs / dos · 18 min',ex:['pec-incbar','back-pulldown']},{n:'Bras · 25 min (biset conseillé)',ex:['pull-curlbar','push-tri','back-curlham','pec-rope']}],
  [{n:'Épaules · 25 min',ex:['sh-arnold','push-lateral','sh-birds']},{n:'Rappel pecs / dos · 18 min',ex:['pec-deck','pull-rowcable']},{n:'Bras · 25 min (biset conseillé)',ex:['back-curlcable','pec-skull','pull-curlinc','push-tri']}],
  'Séance de volume : séries propres, 1–2 reps en réserve, repos 90 s. Les bras en biset (curl puis triceps sans pause) : bouton « Enchaîner avec le suivant ». 2e passage de la semaine pour pecs, dos et épaules.');
 PROG2.jeu.title=undefined;
 PROG2.lun.short='Pecs + épaules';PROG2.mar.short='Jambes A';PROG2.mer.short='Dos + biceps';PROG2.jeu.short='Épaules + bras';

 PROG2.dim=Object.assign({},PROG2.dim,{diff:'bleue',rest:false,short:'Jambes B',title:undefined,note:undefined,
  soir:S5('Jambes B — ischios / fessiers / mollets + abdos','Jambes B',70,
  [{n:'Ischios / fessiers · 45 min',ex:['leg-rdl','th-hipthrust','leg-curl']},{n:'Mollets · 10 min',ex:['th-calfseat']},{n:'Abdos · 12 min',ex:['th-hanging','pull-plank']}],
  [{n:'Ischios / fessiers · 45 min',ex:['th-hipthrust','leg-rdl','leg-curl']},{n:'Mollets · 10 min',ex:['leg-calf']},{n:'Abdos · 12 min',ex:['th-hanging','jeu-side']}],
  'Dimanche soir, après ta sortie : 2e séance de jambes de la semaine, centrée sur l\'arrière des cuisses et les fessiers (la veille de la reprise, mardi, tu as 48 h de récup). Si tu as roulé très fort ou skié toute la journée, descends de 1 série par exo, ou bascule sur Repos.')});
 /* ---------- 2. course : 1 sortie facile le jeudi midi (la 2e = option week-end) ---------- */
 PROG2.jeu.run='jeu';
 RUNC.jeu[3]={name:'Tempo court',seg:1000,base:300,est:40,det:'10 min facile + 15 min allure soutenue (tu ne dis que quelques mots) + 10 min facile — pas plus : on garde de l\'énergie pour la salle'};
 RUNC.jeu[4]={name:'Course facile + 6 lignes droites',seg:1000,base:320,est:45,det:'35–40 min facile, dont 6 lignes droites de 20 s foulée rapide mais détendue (récup 1 min trot) — fluidité, sans fatigue'};
 /* ---------- 3. week-end : ski / moto, ou salle bonus ---------- */
 PROG2.ven.title='Libre — moto à partir de l\'après-midi';
 PROG2.ven.note='Pas de jambes : moto cet après-midi. Si tu veux de la salle le matin : « Changer de séance » → Week-end / bonus → haut du corps.';
 PROG2.sam.note='Moto, ski ou VTT : logue ta sortie ci-dessous. Dimanche soir : jambes B (ischios / fessiers).';
 def('wk-run',{name:'Course facile — 45 min',txt:'45 min allure facile (zone 2, tu peux parler), terrain plat ou vallonné léger. Termine par 5 min de marche.',kind:'cardio',ph:'km parcourus'});PAT_DEFAULT['wk-run']='run';
 const mk=(t,s,min,diff,note,b)=>({soir:{title:t,short:s,dur:min+' min',min:min,A:b.map(x=>({n:x[0],ex:x[1]})),note:note},short:s,diff:diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 function CDX(){return['Retour au calme',['gx-cd']];}
 const T={
  'gx-wk-up':mk('Haut du corps — bras, épaules, abdos','Haut du corps',60,'bleue','Vendredi matin avant la moto : aucun exercice de jambes. Bras en superset, épaules à 1–2 reps de la fin, pas d\'échec pour garder du grip.',[['Échauffement · 8 min',['gx-wu']],['Bras · 20 min (superset)',['pull-curlbar','pec-skull','back-curlham','pec-rope']],['Épaules · 15 min',['push-lateral','sh-birds','pull-face']],['Abdos · 10 min',['th-hanging','pull-plank']],CDX()]),
  'gx-wk-full':mk('Full body rapide','Full body',60,'bleue','Pour rattraper une séance manquée : une séance complète mais courte, charges modérées, 1–2 reps en réserve.',[['Échauffement · 8 min',['gx-wu']],['Force · 45 min',['leg-press','pec-dbpress','pull-pulldown','sh-dbpress','pull-curlbar','push-tri']],CDX()]),
  'gx-wk-run':mk('Course facile + gainage','Course + gainage',55,'verte','2e course de la semaine (optionnelle) : allure où tu peux parler, 45 min. À éviter la veille d\'une séance de jambes.',[['Course · 45 min',['wk-run']],['Gainage · 10 min',['pull-plank','th-hanging']]])
 };
 Object.keys(T).forEach(k=>{window.hxTplExt[k]=()=>T[k];});
 window.hxSwExt.unshift({sec:'Week-end / bonus',items:[{k:'gx-wk-up',t:'Haut du corps — bras, épaules, abdos',sub:'60 min · sans jambes'},{k:'gx-wk-full',t:'Full body rapide',sub:'60 min'},{k:'gx-wk-run',t:'Course facile + gainage',sub:'55 min'}]});
 /* objectifs caloriques : jour avec séance = jour d'entraînement */
 const _nt=nutriTargets;
 nutriTargets=function(d){const r=_nt(d);if(d<V2)return r;const P=progOf(d);const tr=!!(P&&(P.soir||P.run));const k=tr?S.set.kcal:S.set.kcalRest;return Object.assign({},r,{kcal:k,c:Math.round((k*.5)/4/5)*5,f:Math.round((k*.24)/9/5)*5});};

 /* ---------- 4. plan alimentaire : 5 repas ---------- */
 const PLAN={"A": {"meals": [{"n": "Petit-déjeuner", "h": "7 h 30", "it": ["90 g flocons d'avoine", "300 ml de lait demi-écrémé", "1 banane", "20 g beurre de cacahuète", "10 g miel"], "k": 731, "p": 28, "c": 103, "f": 21, "note": "Mixe ou mélange avec le lait chaud/froid. Un café ou un thé si tu veux."}, {"n": "Collation du matin", "h": "10 h 30", "it": ["150 g skyr nature", "50 g muesli", "20 g amandes", "1 pomme"], "k": 478, "p": 26, "c": 58, "f": 14, "note": "Se prépare la veille dans une boîte."}, {"n": "Déjeuner", "h": "13 h", "it": ["120 g riz basmati (cru)", "140 g blanc de poulet (cru)", "250 g légumes (haricots verts, brocolis, poêlée…)", "12 g d'huile d'olive", "1 gros kiwi"], "k": 817, "p": 48, "c": 115, "f": 17, "note": "Remplace le poulet par dinde, thon ou œufs (3) quand tu veux varier."}, {"n": "Collation pré-training", "h": "17 h 45", "it": ["2 tranches de pain complet (80 g)", "30 g confiture", "1 banane", "25 g whey"], "k": 483, "p": 29, "c": 80, "f": 4, "note": "À prendre 60 à 90 min avant la séance : glucides faciles, peu de gras et de fibres. Shake de whey dans l'eau."}, {"n": "Dîner (après la séance)", "h": "21 h 15", "it": ["125 g pâtes (crues)", "150 g bœuf haché 5 % (cru)", "150 g sauce tomate nature", "200 g légumes (haricots verts, brocolis, poêlée…)", "10 g d'huile d'olive", "20 g fromage râpé"], "k": 916, "p": 58, "c": 107, "f": 27, "note": "Alternatives : saumon, dinde, œufs ; pâtes → riz ou pommes de terre (350 g)."}], "tot": [3425, 189, 463, 83]}, "B": {"meals": [{"n": "Petit-déjeuner", "h": "", "it": ["80 g flocons d'avoine", "300 ml de lait demi-écrémé", "1 banane", "20 g beurre de cacahuète", "10 g miel"], "k": 694, "p": 27, "c": 97, "f": 21, "note": ""}, {"n": "Collation du matin", "h": "", "it": ["150 g skyr nature", "40 g muesli", "20 g amandes", "1 pomme"], "k": 440, "p": 25, "c": 52, "f": 14, "note": ""}, {"n": "Déjeuner", "h": "", "it": ["100 g riz basmati (cru)", "140 g blanc de poulet (cru)", "250 g légumes (haricots verts, brocolis, poêlée…)", "10 g d'huile d'olive", "1 gros kiwi"], "k": 729, "p": 46, "c": 100, "f": 14, "note": ""}, {"n": "Collation de l'après-midi", "h": "", "it": ["60 g de pain complet (≈ 2 tranches)", "20 g confiture", "150 g fromage blanc 3 %"], "k": 312, "p": 17, "c": 45, "f": 6, "note": "Remplace la collation pré-training."}, {"n": "Dîner", "h": "", "it": ["110 g pâtes (crues)", "140 g pavé de saumon (cru)", "100 g sauce tomate nature", "200 g légumes (haricots verts, brocolis, poêlée…)", "8 g d'huile d'olive", "15 g fromage râpé"], "k": 900, "p": 51, "c": 93, "f": 33, "note": ""}], "tot": [3075, 166, 387, 88]}};
 PLAN.C={tot:null,meals:PLAN.A.meals.map((m,i)=>i===3?{n:'Pendant la sortie',h:'toutes les 60–90 min',it:['2 bananes','500 ml de boisson à ≈ 6 % de glucides (ou eau + 30 g de sirop ou miel)','4 dattes'],k:450,p:4,c:110,f:1,note:'Vise 40–60 g de glucides par heure de roulage ou de ski. Bois régulièrement.'}:m).concat([{n:'Supplément du retour',h:'',it:['100 g de riz (cru) en plus, ou 2 tranches de pain + miel'],k:350,p:8,c:77,f:1,note:'Les jours de sortie longue, on ajoute un peu de glucides au repas du soir.'}])};
 PLAN.C.tot=PLAN.C.meals.reduce((a,m)=>[a[0]+m.k,a[1]+m.p,a[2]+m.c,a[3]+m.f],[0,0,0,0]);
 const NAME={A:'Jour de salle (séance 19 h)',B:'Jour léger / repos',C:'Jour de sortie (ski, moto…)'};
 let planT=null;
 const defT=d=>{const P=progOf(d);return P&&P.soir?'A':'B';};
 const _vn=VIEWS.nutri;
 VIEWS.nutri=function(){
  const h=_vn(),d=R.nd,t=planT||defT(d),P=PLAN[t];
  let c='<div class="card"><h3 class="d">Plan alimentaire — 5 repas</h3><div class="row wrap" style="margin-bottom:10px">'+['A','B','C'].map(k=>'<button class="chip'+(k===t?' on':'')+'" data-a="planSel" data-t="'+k+'">'+NAME[k]+'</button>').join('')+'</div>'
   +'<div class="sub" style="margin-bottom:10px"><b>'+P.tot[0]+' kcal</b> · protéines '+P.tot[1]+' g · glucides '+P.tot[2]+' g · lipides '+P.tot[3]+' g (valeurs approximatives, ±10 %)</div>';
  P.meals.forEach((m,i)=>{c+='<div style="border-top:1px solid var(--line,#2a2d33);padding:10px 0"><div class="rowb"><span style="font-weight:700">'+esc(m.n)+(m.h?' <span class="sub">· '+esc(m.h)+'</span>':'')+'</span><span class="m sub">'+m.k+' kcal · P '+m.p+'</span></div>'
   +'<ul style="margin:6px 0 4px 18px;padding:0;font-size:13px;line-height:1.5">'+m.it.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+(m.note?'<div class="sub">'+esc(m.note)+'</div>':'')
   +'<div style="margin-top:6px"><button class="btn ghost sm" data-a="planAdd" data-t="'+t+'" data-i="'+i+'">+ Ajouter au bilan</button></div></div>';});
  c+='<div class="row wrap" style="margin-top:6px"><button class="btn sm" data-a="planAdd" data-t="'+t+'" data-i="all">Ajouter toute la journée au bilan</button></div>'
   +'<div class="sub" style="margin-top:10px">Eau : 3 L par jour. Créatine : 5 g chaque jour. Pas de balance dans les assiettes ? Une paume de viande ≈ 130–150 g cru, un poing de féculents cuits ≈ 100 g de riz cru.</div></div>';
  const P0=progOf(d);let h2=h;if(P0&&P0.soir)h2=h2.replace('Objectif jour repos','Objectif jour entraînement');return h2.replace('<div class="card"><h3 class="d">Compléments</h3>',c+'<div class="card"><h3 class="d">Compléments</h3>');};
 Object.assign(A,{planSel:d=>{planT=d.t;render(true);},
  planAdd:d=>{const P=PLAN[d.t],n=nutriDay(R.nd);(d.i==='all'?P.meals:[P.meals[+d.i]]).forEach(m=>{n.kcal+=m.k;n.p+=m.p;n.c+=m.c;n.f+=m.f;});save();render(true);}});

 /* ---------- 5. le plan alimentaire visible partout : accueil + séance ---------- */
 const sumOf=P=>P.tot;
 function planFor(d){return PLAN[defT(d)];}
 function miniPlan(d,compact){const P=planFor(d),n=nutriDay(d),t=sumOf(P);
  let h='<div class="card acc" style="--acc:var(--moss)"><div class="rowb"><h3 class="d" style="margin:0">Repas du jour</h3><span class="m sub">'+Math.round(n.kcal)+' / '+t[0]+' kcal</span></div>'
   +'<div class="bar" style="margin:8px 0 10px"><i style="width:'+Math.min(100,n.kcal/t[0]*100)+'%;--c:var(--moss)"></i></div>';
  P.meals.forEach((m,i)=>{h+='<div class="ls"><div class="grow"><b>'+esc(m.n)+'</b>'+(m.h?' <span class="sub">'+esc(m.h)+'</span>':'')+'<div class="sub">'+esc(m.it.slice(0,compact?3:9).join(' · '))+(compact&&m.it.length>3?'…':'')+'</div></div><span class="m sub" style="white-space:nowrap">'+m.k+' kcal</span></div>';});
  h+='<div class="sub" style="margin:8px 0">Total : <b>'+t[0]+' kcal</b> · P '+t[1]+' g · G '+t[2]+' g · L '+t[3]+' g · eau 3 L · créatine 5 g</div>'
   +'<div class="row wrap"><button class="btn sm" data-a="planAdd" data-t="'+defT(d)+'" data-i="all">Tout ajouter au bilan</button><button class="btn ghost sm" data-a="nav" data-v="nutri">Détail et autres jours</button></div></div>';
  return h;}
 const _vh=VIEWS.home;
 VIEWS.home=function(){const h=_vh(),t=today();
  const k='<div class="sec"><h2 class="d">Cette semaine</h2></div>';
  return h.indexOf(k)>-1?h.replace(k,'<div class="sec"><h2 class="d">Nutrition</h2><button class="btn ghost sm" data-a="nav" data-v="nutri" style="margin-left:auto">Bilan</button></div>'+miniPlan(t,true)+k):h+miniPlan(t,true);};
 const _vd=VIEWS.day;
 VIEWS.day=function(){const h=_vd(),d=R.d||today(),P=progOf(d);
  if(!P||!P.soir)return h;
  const M=planFor(d).meals,pre=M[3],tot=sumOf(planFor(d));
  const c='<div class="card acc" style="--acc:var(--moss)"><div class="rowb"><h3 class="d" style="margin:0">Avant la séance</h3><span class="m sub">'+pre.k+' kcal · P '+pre.p+'</span></div>'
   +'<div class="sub" style="margin:6px 0"><b>'+esc(pre.n)+(pre.h?' · '+esc(pre.h):'')+'</b> — '+esc(pre.it.join(' · '))+'</div>'
   +'<div class="sub">Objectif du jour : '+tot[0]+' kcal, '+tot[1]+' g de protéines. Après la séance, le dîner est le plus gros repas.</div>'
   +'<div class="row wrap" style="margin-top:8px"><button class="btn sm" data-a="planAdd" data-t="'+defT(d)+'" data-i="3">Collation prise ✓</button><button class="btn ghost sm" data-a="nav" data-v="nutri">Plan complet</button></div></div>';
  return c+h;};
 /* bandeau "à savoir" : on remplace le rappel cardio par un rappel nutrition */
 const _in=insights;
 insights=function(){const o=_in().filter(x=>!/Cardio du jour/.test(x.x));const t=today(),P=progOf(t);
  if(P&&P.soir)o.unshift({k:'info',i:'timer',x:'Prise de masse : <b>'+sumOf(planFor(t))[0]+' kcal</b> aujourd\'hui, collation 60–90 min avant la séance, pas de cardio après.'});
  return o;};
 window.hxPlanAlim=PLAN;
})();
