/* ===================== PRISE DE MASSE : salle en priorité, 1–2 courses, cardio plus long en fin de séance, week-end souple + plan alimentaire ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 /* ---------- 1. cardio de fin de séance : 40 min, allure facile ---------- */
 const cz=(id,name,txt,ph)=>{def(id,{name:name,txt:txt,kind:'cardio',ph:ph||'km ou calories'});};
 cz('cz-bike40','Vélo — cardio facile 40 min','40 min allure facile, tu parles sans t\'essouffler (≈ 65 % FC max). Pas de sprint : on garde les calories pour la prise de masse.');
 cz('cz-incline40','Marche en pente — 40 min','40 min, pente 8–12 %, 5–6 km/h, sans te tenir. Fréquence cardiaque basse, respiration calme.','km');
 cz('cz-elliptic40','Elliptique — 40 min','40 min allure facile, résistance modérée.');
 cz('cz-row30','Rameur facile — 30 min','30 min cadence 20 coups/min, allure facile (le rameur sollicite aussi le dos : reste souple).','mètres');
 ALT['cz-bike40']=[['Vélo semi-allongé — 40 min',0,'km'],['Assault bike facile — 30 min',0,'cal']];
 ALT['cz-incline40']=[['Tapis — marche rapide 40 min',0,'km']];
 ALT['cz-elliptic40']=[['Stepper / escalier — 30 min',0,'km']];
 ALT['cz-row30']=[['SkiErg facile — 25 min',0,'m']];
 CZ.splice(0,4,'cz-bike40','cz-incline40','cz-elliptic40','cz-row30');
 ['lun','mar','mer'].forEach(k=>{const s=PROG2[k].soir;
  ['A','B'].forEach(v=>{(s[v]||[]).forEach(b=>{if(/^Cardio facile/.test(b.n))b.n='Cardio facile · 40 min';});});
  s.min+=10;s.dur=Math.floor(s.min/60)+'h'+String(s.min%60).padStart(2,'0');
  s.note=s.note.replace(/Cardio après la muscu, allure où tu peux parler\./,'Cardio de 40 min après la muscu, allure où tu peux parler : on brûle un peu de gras sans freiner la prise de masse.');});
 /* ---------- 2. course : 1 sortie facile le jeudi midi (la 2e = option week-end) ---------- */
 PROG2.jeu.run='jeu';
 PROG2.jeu.soir.title='Épaules + rappel bras / tractions / dips (+ course midi)';
 RUNC.jeu[3]={name:'Tempo court',seg:1000,base:300,est:40,det:'10 min facile + 15 min allure soutenue (tu ne dis que quelques mots) + 10 min facile — pas plus : on garde de l\'énergie pour la salle'};
 RUNC.jeu[4]={name:'Course facile + 6 lignes droites',seg:1000,base:320,est:45,det:'35–40 min facile, dont 6 lignes droites de 20 s foulée rapide mais détendue (récup 1 min trot) — fluidité, sans fatigue'};
 /* ---------- 3. week-end : ski / moto, ou salle bonus ---------- */
 PROG2.ven.title='Libre — moto à partir de l\'après-midi (ou salle le matin)';
 PROG2.ven.note='Si tu as envie de salle le matin : « Changer de séance » → Week-end / bonus → haut du corps. Pas de jambes avant la moto.';
 PROG2.sam.note='Moto, ski ou VTT : logue ta sortie ci-dessous. Si tu restes en ville : « Changer de séance » → Week-end / bonus (course facile ou full body).';
 PROG2.dim.note='Repos, marche, mobilité. Envie de salle ? Full body rapide ou course facile dans « Changer de séance ».';
 def('wk-run',{name:'Course facile — 45 min',txt:'45 min allure facile (zone 2, tu peux parler), terrain plat ou vallonné léger. Termine par 5 min de marche.',kind:'cardio',ph:'km parcourus'});PAT_DEFAULT['wk-run']='run';
 const mk=(t,s,min,diff,note,b)=>({soir:{title:t,short:s,dur:min+' min',min:min,A:b.map(x=>({n:x[0],ex:x[1]})),note:note},short:s,diff:diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 const T={
  'gx-wk-up':mk('Haut du corps — bras, épaules, abdos','Haut du corps',60,'bleue','Vendredi matin avant la moto : aucun exercice de jambes. Bras en superset, épaules à 1–2 reps de la fin, pas d\'échec pour garder du grip.',[['Échauffement · 8 min',['gx-wu']],['Bras · 20 min (superset)',['pull-curlbar','pec-skull','back-curlham','pec-rope']],['Épaules · 15 min',['push-lateral','sh-birds','pull-face']],['Abdos · 10 min',['pull-crunch','th-hanging']],CDX()]),
  'gx-wk-full':mk('Full body rapide','Full body',60,'bleue','Week-end sans sortie : une séance complète mais courte, charges modérées, 1–2 reps en réserve. Idéal quand tu as raté une séance de la semaine.',[['Échauffement · 8 min',['gx-wu']],['Force · 40 min',['leg-press','pec-dbpress','pull-pulldown','sh-dbpress','pull-curlbar','push-tri']],['Cardio facile · 10 min',['cz-bike40']],CDX()]),
  'gx-wk-run':mk('Course facile + gainage','Course + gainage',55,'verte','2e course de la semaine (optionnelle) : allure où tu peux parler, 45 min. Idéal si tu ne roules pas ce week-end. Évite si les jambes sont encore lourdes.',[['Course · 45 min',['wk-run']],['Gainage · 10 min',['pull-plank','th-hanging']]])
 };
 function CDX(){return['Retour au calme',['gx-cd']];}
 Object.keys(T).forEach(k=>{window.hxTplExt[k]=()=>T[k];});
 window.hxSwExt.unshift({sec:'Week-end / bonus (priorité salle)',items:[{k:'gx-wk-up',t:'Haut du corps — bras, épaules, abdos',sub:'60 min · sans jambes'},{k:'gx-wk-full',t:'Full body rapide',sub:'60 min'},{k:'gx-wk-run',t:'Course facile + gainage',sub:'55 min'}]});

 /* ---------- 4. plan alimentaire : 5 repas ---------- */
 const PLAN={"A": {"meals": [{"n": "Petit-déjeuner", "h": "7 h 30", "it": ["90 g flocons d'avoine", "300 ml de lait demi-écrémé", "1 banane", "20 g beurre de cacahuète", "10 g miel"], "k": 731, "p": 28, "c": 103, "f": 21, "note": "Mixe ou mélange avec le lait chaud/froid. Un café ou un thé si tu veux."}, {"n": "Collation du matin", "h": "10 h 30", "it": ["150 g skyr nature", "50 g muesli", "20 g amandes", "1 pomme"], "k": 478, "p": 26, "c": 58, "f": 14, "note": "Se prépare la veille dans une boîte."}, {"n": "Déjeuner", "h": "13 h", "it": ["120 g riz basmati (cru)", "140 g blanc de poulet (cru)", "250 g légumes (haricots verts, brocolis, poêlée…)", "12 g d'huile d'olive", "1 gros kiwi"], "k": 817, "p": 48, "c": 115, "f": 17, "note": "Remplace le poulet par dinde, thon ou œufs (3) quand tu veux varier."}, {"n": "Collation pré-training", "h": "17 h 45", "it": ["2 tranches de pain complet (80 g)", "30 g confiture", "1 banane", "25 g whey"], "k": 483, "p": 29, "c": 80, "f": 4, "note": "À prendre 60 à 90 min avant la séance : glucides faciles, peu de gras et de fibres. Shake de whey dans l'eau."}, {"n": "Dîner (après la séance)", "h": "21 h 15", "it": ["125 g pâtes (crues)", "150 g bœuf haché 5 % (cru)", "150 g sauce tomate nature", "200 g légumes (haricots verts, brocolis, poêlée…)", "10 g d'huile d'olive", "20 g fromage râpé"], "k": 916, "p": 58, "c": 107, "f": 27, "note": "Alternatives : saumon, dinde, œufs ; pâtes → riz ou pommes de terre (350 g)."}], "tot": [3425, 189, 463, 83]}, "B": {"meals": [{"n": "Petit-déjeuner", "h": "", "it": ["80 g flocons d'avoine", "300 ml de lait demi-écrémé", "1 banane", "20 g beurre de cacahuète", "10 g miel"], "k": 694, "p": 27, "c": 97, "f": 21, "note": ""}, {"n": "Collation du matin", "h": "", "it": ["150 g skyr nature", "40 g muesli", "20 g amandes", "1 pomme"], "k": 440, "p": 25, "c": 52, "f": 14, "note": ""}, {"n": "Déjeuner", "h": "", "it": ["100 g riz basmati (cru)", "140 g blanc de poulet (cru)", "250 g légumes (haricots verts, brocolis, poêlée…)", "10 g d'huile d'olive", "1 gros kiwi"], "k": 729, "p": 46, "c": 100, "f": 14, "note": ""}, {"n": "Collation de l'après-midi", "h": "", "it": ["60 g de pain complet (≈ 2 tranches)", "20 g confiture", "150 g fromage blanc 3 %"], "k": 312, "p": 17, "c": 45, "f": 6, "note": "Remplace la collation pré-training."}, {"n": "Dîner", "h": "", "it": ["110 g pâtes (crues)", "140 g pavé de saumon (cru)", "100 g sauce tomate nature", "200 g légumes (haricots verts, brocolis, poêlée…)", "8 g d'huile d'olive", "15 g fromage râpé"], "k": 900, "p": 51, "c": 93, "f": 33, "note": ""}], "tot": [3075, 166, 387, 88]}};
 PLAN.C={tot:null,meals:PLAN.A.meals.map((m,i)=>i===3?{n:'Pendant la sortie',h:'toutes les 60–90 min',it:['2 bananes','500 ml de boisson à ≈ 6 % de glucides (ou eau + 30 g de sirop ou miel)','4 dattes'],k:450,p:4,c:110,f:1,note:'Vise 40–60 g de glucides par heure de roulage ou de ski. Bois régulièrement.'}:m).concat([{n:'Supplément du retour',h:'',it:['100 g de riz (cru) en plus, ou 2 tranches de pain + miel'],k:350,p:8,c:77,f:1,note:'Les jours de sortie longue, on ajoute un peu de glucides au repas du soir.'}])};
 PLAN.C.tot=PLAN.C.meals.reduce((a,m)=>[a[0]+m.k,a[1]+m.p,a[2]+m.c,a[3]+m.f],[0,0,0,0]);
 const NAME={A:'Jour de salle (séance 19 h)',B:'Jour léger / repos',C:'Jour de sortie (ski, moto…)'};
 let planT=null;
 const defT=d=>{const i=dayId(d);return i==='sam'||i==='dim'?'B':'A';};
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
  return h.replace('<div class="card"><h3 class="d">Compléments</h3>',c+'<div class="card"><h3 class="d">Compléments</h3>');};
 Object.assign(A,{planSel:d=>{planT=d.t;render(true);},
  planAdd:d=>{const P=PLAN[d.t],n=nutriDay(R.nd);(d.i==='all'?P.meals:[P.meals[+d.i]]).forEach(m=>{n.kcal+=m.k;n.p+=m.p;n.c+=m.c;n.f+=m.f;});save();render(true);}});
 window.hxPlanAlim=PLAN;
})();
