/* ===================== SEMAINE : pecs-triceps / jambes / dos-biceps / épaules-bras + course ===================== */
(function(){
 const S5=(title,short,min,A,B,note)=>({title:title,short:short,dur:Math.floor(min/60)+'h'+String(min%60).padStart(2,'0'),min:min,A:A,B:B,note:note});

 /* lundi — pecs et triceps */
 PROG2.lun.short='Pecs + triceps';PROG2.lun.diff='noire';delete PROG2.lun.run;
 PROG2.lun.soir=S5('Pecs / Triceps','Pecs + triceps',72,
  [{n:'Pecs · 34 min',ex:['push-bench','push-incline','push-fly']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Triceps · 18 min',ex:['pec-skull','push-tri']},{n:'Abdos · 6 min',ex:['th-hanging']}],
  [{n:'Pecs · 34 min',ex:['pec-dbpress','pec-incbar','pec-deck']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Triceps · 18 min',ex:['pec-skull','pec-rope']},{n:'Abdos · 6 min',ex:['pull-plank']}],
  'Séance lourde : première série de chaque exo à 1 rep de l\'échec, repos 2–3 min sur les presses, descente contrôlée 2–3 s avec étirement complet en bas. Dips lestés après les presses, buste penché en avant pour charger les pecs. +2,5 kg à la ceinture dès que tu sors 12 reps propres.');

 /* mardi — jambes */
 PROG2.mar={label:'Mardi',short:'Jambes',bib:'02',diff:'noire',
  soir:S5('Jambes','Jambes',72,
   [{n:'Jambes · 58 min',ex:['leg-squat','leg-press','leg-ext','leg-curl','leg-calf']},{n:'Abdos · 10 min',ex:['th-hanging','jeu-side']}],
   [{n:'Jambes · 58 min',ex:['leg-press','ven-lunges','leg-rdl','leg-ext','th-calfseat']},{n:'Abdos · 10 min',ex:['pull-plank','jeu-side']}],
   'Seule séance de jambes de la semaine, donc on ne la saute pas : squat en premier, profondeur complète, 2 séries de montée en charge avant la première série lourde, repos 3 min. Le mardi laisse 3 jours de récupération avant la moto du vendredi.')};

 /* mercredi — dos et biceps */
 PROG2.mer.short='Dos + biceps';PROG2.mer.diff='bleue';
 PROG2.mer.soir=S5('Dos / Biceps','Dos + biceps',70,
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 32 min',ex:['pull-rowbar','pull-rowcable','pull-pulldown']},{n:'Biceps · 16 min',ex:['pull-curlbar','pull-curlinc']},{n:'Arrière d\'épaule · 7 min',ex:['sh-birds']}],
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 32 min',ex:['back-tbar','back-dbrow','back-pullover']},{n:'Biceps · 16 min',ex:['back-curlham','back-curlcable']},{n:'Arrière d\'épaule · 7 min',ex:['pull-face']}],
  'Tractions en ouverture, c\'est là que tu es le plus fort pour les charger : 0 kg = poids de corps, puis 2,5 et 5 kg dès que tu tiens 10 reps. Ensuite tire avec les coudes, omoplates serrées en fin de mouvement, et pas d\'élan sur les curls.');

 /* jeudi — épaules et bras, avec la course du midi */
 PROG2.jeu.short='Épaules + bras';PROG2.jeu.diff='bleue';PROG2.jeu.run='jeu';
 PROG2.jeu.soir=S5('Épaules / Bras','Épaules + bras',70,
  [{n:'Épaules · 30 min',ex:['push-ohp','sh-latcable','pull-face']},{n:'Bras · 28 min (biset conseillé)',ex:['pull-curlbar','push-tri','back-curlham','pec-rope']},{n:'Abdos · 8 min',ex:['jeu-side','th-hanging']}],
  [{n:'Épaules · 30 min',ex:['sh-dbpress','push-lateral','sh-arnold']},{n:'Bras · 28 min (biset conseillé)',ex:['back-curlcable','pec-skull','pull-curlinc','push-tri']},{n:'Abdos · 8 min',ex:['pull-plank','th-hanging']}],
  'Tu cours le midi, donc le soir c\'est du volume, pas de la force : séries propres avec 1–2 reps en réserve, repos 90 s. Les bras en biset, curl puis triceps sans pause — bouton « Enchaîner avec le suivant ».');

 /* vendredi, samedi — libres */
 PROG2.ven={label:'Vendredi',short:'Libre',bib:'05',diff:'verte',
  title:'Libre — moto à partir de l\'après-midi',
  note:'Repos de salle, les jambes sont fraîches depuis mardi. Envie de bouger le matin ? « Changer de séance » → Week-end / bonus.'};
 PROG2.sam.note='Moto, ski ou VTT : logue ta sortie ci-dessous. Si tu restes en ville, les séances bonus sont dans « Changer de séance ».';

 /* dimanche — course facile optionnelle */
 PROG2.dim.short='Course facile';PROG2.dim.diff='verte';PROG2.dim.rest=false;PROG2.dim.title=undefined;PROG2.dim.note=undefined;
 PROG2.dim.soir=S5('Course facile + gainage','Course facile',50,
  [{n:'Course · 40 min',ex:['wk-run']},{n:'Gainage · 10 min',ex:['pull-plank','jeu-side']}],
  [{n:'Course · 40 min',ex:['wk-run']},{n:'Gainage · 10 min',ex:['th-hanging','jeu-side']}],
  'Deuxième course de la semaine, allure facile : tu dois pouvoir parler. Optionnelle — si tu as roulé ou skié tout le week-end, saute-la.');
})();
