/* ===================== PROGRAMME HAUT DU CORPS + RUNNING (remplace la semaine précédente) ===================== */
(function(){
 const S5=(title,short,min,A,B,note)=>({title:title,short:short,dur:Math.floor(min/60)+'h'+String(min%60).padStart(2,'0'),min:min,A:A,B:B,note:note});

 /* lundi — poussée lourde */
 PROG2.lun.short='Pecs + épaules';PROG2.lun.diff='noire';
 PROG2.lun.soir=S5('Pecs / Triceps / Épaules — lourd','Push lourd',80,
  [{n:'Pecs · 34 min',ex:['push-bench','push-incline','push-fly']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Épaules · 18 min',ex:['push-ohp','push-lateral']},{n:'Triceps · 14 min',ex:['pec-skull','push-tri']}],
  [{n:'Pecs · 34 min',ex:['pec-dbpress','pec-incbar','pec-deck']},{n:'Dips lestés · 14 min',ex:['push-dips']},{n:'Épaules · 18 min',ex:['sh-dbpress','sh-latcable']},{n:'Triceps · 14 min',ex:['pec-skull','pec-rope']}],
  'La séance lourde de la semaine. Première série de chaque exo à 1 rep de l\'échec, repos 2–3 min sur les presses, descente contrôlée 2–3 s. Dips lestés après les presses : buste penché pour les pecs, buste droit pour les triceps, +2,5 kg dès que tu sors 12 reps propres.');

 /* mardi — course, pas de muscu */
 PROG2.mar={label:'Mardi',short:'Course',bib:'02',diff:'verte',run:'jeu',
  title:'Course — la séance qualité de la semaine',
  note:'Jour sans salle : la course est la séance du jour, le midi ou le soir. Si les épaules tirent encore de lundi, c\'est normal — ça n\'empêche pas de courir.'};

 /* mercredi — dos et biceps */
 PROG2.mer.short='Dos + biceps';PROG2.mer.diff='bleue';
 PROG2.mer.soir=S5('Dos / Biceps','Dos + biceps',66,
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 30 min',ex:['pull-rowbar','pull-rowcable','pull-pulldown']},{n:'Biceps · 15 min',ex:['pull-curlbar','pull-curlinc']},{n:'Arrière d\'épaule · 6 min',ex:['sh-birds']}],
  [{n:'Tractions lestées · 15 min',ex:['pull-pullup']},{n:'Dos · 30 min',ex:['back-tbar','back-dbrow','back-pullover']},{n:'Biceps · 15 min',ex:['back-curlham','back-curlcable']},{n:'Arrière d\'épaule · 6 min',ex:['pull-face']}],
  'Tractions en ouverture, c\'est là que tu es le plus fort pour les charger : 0 kg = poids de corps, puis 2,5 et 5 kg à la ceinture dès que tu tiens 10 reps. Ensuite tire avec les coudes, omoplates serrées, et pas d\'élan sur les curls.');

 /* jeudi — épaules, bras, rappel pecs */
 PROG2.jeu.short='Épaules + bras';PROG2.jeu.diff='bleue';delete PROG2.jeu.run;
 PROG2.jeu.soir=S5('Épaules / Bras + rappel pecs','Épaules + bras',75,
  [{n:'Épaules · 24 min',ex:['sh-dbpress','sh-latcable','pull-face']},{n:'Rappel pecs & dips · 18 min',ex:['pec-incbar','jr-dips']},{n:'Bras · 24 min (biset conseillé)',ex:['pull-curlbar','push-tri','back-curlham','pec-rope']},{n:'Abdos · 9 min',ex:['th-hanging','jeu-side']}],
  [{n:'Épaules · 24 min',ex:['sh-arnold','push-lateral','sh-birds']},{n:'Rappel pecs & tractions · 18 min',ex:['pec-deck','jr-pullup']},{n:'Bras · 24 min (biset conseillé)',ex:['back-curlcable','pec-skull','pull-curlinc','push-tri']},{n:'Abdos · 9 min',ex:['pull-plank','th-hanging']}],
  'Séance de volume, pas de force : séries propres avec 1–2 reps en réserve, repos 90 s. Les bras en biset, curl puis triceps sans pause — bouton « Enchaîner avec le suivant ». C\'est le deuxième passage de la semaine sur les épaules, les pecs et les bras.');

 /* vendredi et samedi — libres */
 PROG2.ven={label:'Vendredi',short:'Libre',bib:'05',diff:'verte',
  title:'Libre — moto à partir de l\'après-midi',
  note:'Repos de salle. Si tu veux bouger le matin : « Changer de séance » → Week-end / bonus (haut du corps, full body ou course facile).'};
 PROG2.sam.note='Moto, ski ou VTT : logue ta sortie ci-dessous. Si tu restes en ville, les séances bonus sont dans « Changer de séance ».';

 /* dimanche — course facile, optionnelle */
 PROG2.dim.short='Course facile';PROG2.dim.diff='verte';PROG2.dim.rest=false;PROG2.dim.title=undefined;PROG2.dim.note=undefined;
 PROG2.dim.soir=S5('Course facile + gainage','Course facile',50,
  [{n:'Course · 40 min',ex:['wk-run']},{n:'Gainage · 10 min',ex:['pull-plank','jeu-side']}],
  [{n:'Course · 40 min',ex:['wk-run']},{n:'Gainage · 10 min',ex:['th-hanging','jeu-side']}],
  'Deuxième course de la semaine, allure facile : tu dois pouvoir parler. Optionnelle — si tu as roulé ou skié tout le week-end, saute-la, tes jambes ont déjà eu leur dose.');
})();
