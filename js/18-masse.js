/* ===================== PRISE DE MASSE : salle en priorité, 1–2 courses, cardio plus long en fin de séance, week-end souple + plan alimentaire ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 /* ---------- 1. programme prise de masse : 5 séances, chaque muscle 2× par semaine, sans cardio de fin de séance ---------- */
 const S5=(title,short,min,A,B,note)=>({title:title,short:short,dur:Math.floor(min/60)+'h'+String(min%60).padStart(2,'0'),min:min,A:A,B:B,note:note});
 PROG2.lun.soir=S5('Pecs / Épaules / Triceps — lourd','Push lourd',88,
  [{n:'Pecs · 30 min',ex:['push-bench','push-incline','push-fly']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Épaules · 20 min',ex:['push-ohp','push-lateral']},{n:'Triceps · 16 min',ex:['pec-skull','push-tri']}],
  [{n:'Pecs · 30 min',ex:['pec-dbpress','pec-incbar','pec-deck']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Épaules · 20 min',ex:['sh-dbpress','sh-latcable']},{n:'Triceps · 16 min',ex:['pec-skull','pec-rope']}],
  'Séance lourde : 1ère série de chaque exo près de l\'échec (1 rep en réserve), repos 2–3 min sur les mouvements de base. Les dips lestés viennent après les presses : buste penché en avant pour les pecs, buste droit pour les triceps. Dès que tu sors 12 reps propres, ajoute 2,5 kg à la ceinture. Pas de cardio après.');
 PROG2.mar.soir=S5('Jambes A — quadriceps','Jambes A',75,
  [{n:'Jambes · 60 min',ex:['leg-squat','leg-press','leg-ext','leg-curl','leg-calf']},{n:'Abdos · 10 min',ex:['th-hanging']}],
  [{n:'Jambes · 60 min',ex:['leg-press','ven-lunges','leg-ext','leg-curl','th-calfseat']},{n:'Abdos · 10 min',ex:['th-hanging']}],
  'Jour des quadriceps : profondeur complète au squat, repos 3 min. 2 séries de montée en charge avant la première série lourde. Bois et mange bien avant, c\'est la séance la plus coûteuse de la semaine.');
 PROG2.mer.soir=S5('Dos / Biceps — lourd','Pull lourd',82,
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 32 min',ex:['pull-rowbar','pull-rowcable','pull-pulldown']},{n:'Arrière d\'épaule · 8 min',ex:['sh-birds']},{n:'Biceps · 18 min',ex:['pull-curlbar','pull-curlinc']}],
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 32 min',ex:['back-tbar','back-dbrow','back-pullover']},{n:'Arrière d\'épaule · 8 min',ex:['pull-face']},{n:'Biceps · 18 min',ex:['back-curlham','back-curlcable']}],
  'Tractions en premier, à froid mais après échauffement : c\'est là que tu es le plus fort pour les charger. 0 kg = poids de corps ; dès que tu tiens 10 reps, mets 2,5 puis 5 kg à la ceinture (ou un haltère entre les pieds). Ensuite tire avec les coudes, omoplates serrées, descente lente. Biceps en fin de séance, sans élan.');
 PROG2.jeu.soir=S5('Épaules / Bras + poids du corps lesté','Épaules + bras',82,
  [{n:'Épaules · 25 min',ex:['sh-dbpress','sh-latcable','pull-face']},{n:'Poids du corps lesté · 20 min',ex:['jr-pullup','jr-dips']},{n:'Bras · 25 min (biset conseillé)',ex:['pull-curlbar','push-tri','back-curlham','pec-rope']}],
  [{n:'Épaules · 25 min',ex:['sh-arnold','push-lateral','sh-birds']},{n:'Poids du corps lesté · 20 min',ex:['jr-pullup','jr-dips']},{n:'Bras · 25 min (biset conseillé)',ex:['back-curlcable','pec-skull','pull-curlinc','push-tri']}],
  'Séance de volume : séries propres, 1–2 reps en réserve, repos 90 s. Tractions et dips en alternance (une série de chaque, 2 min de repos entre les tours) : c\'est le 2e passage de la semaine sur le dos, les pecs et les triceps, avec moins de charge que lundi et mercredi. Les bras en biset : bouton « Enchaîner avec le suivant ».');
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
  'gx-wk-up':mk('Haut du corps — bras, épaules, abdos','Haut du corps',60,'bleue','Vendredi matin avant la moto : aucun exercice de jambes. Bras en superset, épaules à 1–2 reps de la fin, pas d\'échec pour garder du grip.',[['Échauffement · 8 min',['gx-wu']],['Poids du corps lesté · 15 min',['jr-pullup','jr-dips']],['Bras · 18 min (superset)',['pull-curlbar','pec-skull','back-curlham']],['Épaules · 12 min',['push-lateral','sh-birds']],['Abdos · 8 min',['th-hanging','pull-plank']],CDX()]),
  'gx-wk-full':mk('Full body rapide','Full body',60,'bleue','Pour rattraper une séance manquée : une séance complète mais courte, charges modérées, 1–2 reps en réserve.',[['Échauffement · 8 min',['gx-wu']],['Force · 45 min',['leg-press','pec-dbpress','pull-pulldown','sh-dbpress','pull-curlbar','push-tri']],CDX()]),
  'gx-wk-run':mk('Course facile + gainage','Course + gainage',55,'verte','2e course de la semaine (optionnelle) : allure où tu peux parler, 45 min. À éviter la veille d\'une séance de jambes.',[['Course · 45 min',['wk-run']],['Gainage · 10 min',['pull-plank','th-hanging']]])
 };
 Object.keys(T).forEach(k=>{window.hxTplExt[k]=()=>T[k];});
 window.hxSwExt.unshift({sec:'Week-end / bonus',items:[{k:'gx-wk-up',t:'Haut du corps — bras, épaules, abdos',sub:'60 min · sans jambes'},{k:'gx-wk-full',t:'Full body rapide',sub:'60 min'},{k:'gx-wk-run',t:'Course facile + gainage',sub:'55 min'}]});
 /* objectifs caloriques : jour avec séance = jour d'entraînement */
 const _nt=nutriTargets;
 nutriTargets=function(d){const r=_nt(d);if(d<V2)return r;const P=progOf(d);const tr=!!(P&&(P.soir||P.run));const k=tr?S.set.kcal:S.set.kcalRest;return Object.assign({},r,{kcal:k,c:Math.round((k*.5)/4/5)*5,f:Math.round((k*.24)/9/5)*5});};

})();
