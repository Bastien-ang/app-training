/* ===================== HYBRIDE : moteur en semaine + séance Hyrox courte, cap 80 kg sec ===================== */
(function(){
 /* ---------- bloc moteur du mercredi (jambes épargnées) ---------- */
 def('eng-ski',{name:'SkiErg — 6 × 250 m',kind:'cardio',ph:'temps moyen /250 m',
  txt:'6 × 250 m à allure soutenue, 45 s de récupération entre chaque. Tire avec le dos et les abdos, pas seulement avec les bras. Objectif : les 6 temps dans la même seconde, pas un premier à fond puis l\'effondrement.'});
 ALT['eng-ski']=[['Rameur — 5 × 300 m',0,'temps moyen'],['Assault bike — 8 × 20 s',0,'calories'],['Corde à sauter — 6 × 1 min',0,'fait ✓'],['Sled push — 6 × 20 m',0,'kg']];
 Object.assign(PAT_DEFAULT,{'eng-ski':'skierg'});

 /* ---------- séance Hyrox courte du vendredi ---------- */
 def('hx-erg',{name:'Moteur — 4 tours rameur 250 m + SkiErg 250 m',kind:'cardio',ph:'temps total',
  txt:'4 tours : 250 m rameur puis 250 m SkiErg, 1 min de récupération entre les tours. C\'est le cœur du Hyrox : deux ergomètres enchaînés, cadence régulière, respiration contrôlée.'});
 def('hx-carry',{name:'Farmer carry — 4 × 50 m',kind:'cardio',ph:'kg / main',
  txt:'4 allers-retours de 50 m avec un haltère lourd dans chaque main. Épaules basses, buste droit, pas rapides. Si la poigne lâche avant les jambes, c\'est normal : c\'est aussi ça qu\'on travaille.'});
 def('hx-wall',{name:'Wall balls — 4 × 15',kind:'cardio',ph:'kg du ballon',
  txt:'4 séries de 15 lancers, 1 min de repos. Squat complet, le ballon part des hanches, réception bras tendus. 6 à 9 kg suffisent.'});
 def('hx-burp',{name:'Burpees broad jump — 4 × 8',kind:'cardio',ph:'fait ✓',
  txt:'4 séries de 8 : burpee, puis saut horizontal le plus loin possible. Réception souple, genoux dans l\'axe.'});
 def('hx-sled',{name:'Sled push / pull — 4 × 20 m',kind:'cardio',ph:'kg sur le traîneau',
  txt:'4 allers en poussée, 4 en traction si le traîneau est libre. Buste bas, bras tendus, petits pas rapides. À sauter si tu roules en moto l\'après-midi.'});
 ALT['hx-erg']=[['Moteur — 20 min rameur continu',0,'mètres'],['Moteur — 4 × (vélo 1 min + SkiErg 250 m)',0,'temps total']];
 ALT['hx-carry']=[['Suitcase carry — 4 × 40 m par côté',0,'kg'],['Sandbag carry — 4 × 40 m',0,'kg']];
 ALT['hx-wall']=[['Thrusters haltères — 4 × 12',0,'kg/haltère'],['Goblet squat rapide — 4 × 15',0,'kg']];
 ALT['hx-erg'].push(['SkiErg — 6 × 250 m',0,'temps moyen']);
 Object.assign(PAT_DEFAULT,{'hx-erg':'rower','hx-carry':'carry','hx-wall':'wallball','hx-burp':'burpee','hx-sled':'sledpush'});

 TIPS.unshift(
  [/skierg|moteur —|rameur 250/i,['Sur ergomètre, la régularité bat la vitesse : vise des temps identiques sur chaque intervalle, pas un record sur le premier.',
   'Rameur : jambes, puis buste, puis bras. Retour dans l\'ordre inverse, deux fois plus lent que la tirée.',
   'SkiErg : le mouvement part des abdos et du dos, tu finis les bras le long du corps. Si tu ne sens que les triceps, tu tires trop haut.']],
  [/farmer carry|suitcase/i,['Prends lourd : 30 à 40 kg par main. Si tu peux marcher 2 min, ce n\'est pas assez lourd.',
   'Épaules basses et en arrière, abdos serrés, regard loin. Ne laisse pas les haltères te tirer vers l\'avant.']],
  [/wall balls/i,['Squat complet à chaque répétition, le ballon monte avec les jambes, pas avec les bras.',
   'Garde un rythme que tu peux tenir sur les 15 : en Hyrox, c\'est l\'enchaînement qui compte, pas la série héroïque.']],
  [/sled/i,['Poussée : bras tendus, buste bas, petits pas rapides. Traction : recule en gardant les hanches basses.',
   'Charge modérée et déplacement continu : le sled est là pour l\'endurance de jambes, pas pour un record de force.']]);

 /* ---------- mercredi : 10 min de moteur en fin de séance ---------- */
 {const s=PROG2.mer.soir;
  [s.A,s.B].forEach(V=>V.forEach(b=>{if(/^Biceps/.test(b.n))b.n='Biceps · 14 min';}));
  s.min=78;s.dur='1h18';}

 /* ---------- vendredi : séance Hyrox courte, deux versions ---------- */
 {const min=52;
  PROG2.ven.soir={title:'Hyrox court — optionnel',short:'Hyrox court',dur:'0h52',min:52,
   A:[{n:'Échauffement · 6 min',ex:['gx-wu']},{n:'Moteur · 20 min',ex:['hx-erg']},{n:'Port de charge · 12 min',ex:['hx-carry','ski-pallof']},{n:'Retour au calme',ex:['gx-cd']}],
   B:[{n:'Échauffement · 6 min',ex:['gx-wu']},{n:'Explosivité · 10 min',ex:['ski-box','ski-skater']},{n:'Moteur · 16 min',ex:['hx-erg']},{n:'Stations · 18 min',ex:['hx-sled','hx-wall','hx-carry']},{n:'Retour au calme',ex:['gx-cd']}],
   note:'Séance optionnelle du vendredi matin : c\'est maintenant le seul endroit où tu fais du cardio dur et des sauts, le reste de la semaine est de la muscu pure. Variante A (ergomètres et port de charge, sans sauts) si tu roules en moto l\'après-midi. Variante B (box jumps, sled, wall balls) les vendredis sans moto. Si tu es fatigué de la semaine, fais juste les 20 min de moteur et rentre.'};
  PROG2.ven.diff='bleue';PROG2.ven.short='Hyrox court';
  PROG2.ven.title=undefined;
  PROG2.ven.note='Séance courte et optionnelle le matin. Moto l\'après-midi : prends la variante A, sans sled ni fentes.';}

 /* ---------- cap : 80 kg sec ---------- */
 window.hxGoalKg=80;
})();
