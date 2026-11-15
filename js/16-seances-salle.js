/* ===================== SÉANCES PRÉCHARGÉES : cardio + Hyrox + CrossFit en salle, solo et binôme (variées : un exo = un poste) ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 const cx=(id,name,txt,ph,pat)=>{def(id,{name:name,txt:txt,kind:'cardio',ph:ph||'fait ✓'});PAT_DEFAULT[id]=pat||'run';return id;};
 cx('gx-wu','Échauffement — 8 min','4 min de vélo ou tapis facile, puis 4 min de mobilité : cercles de hanches, rotations du buste, 10 squats poids de corps, 10 tirages élastique ou poulie légère.','fait ✓','bike');
 cx('gx-cd','Retour au calme — 5 min','5 min de marche ou vélo très facile, puis étirements hanches, mollets, dos.','fait ✓','bike');
 cx('gx-doubles-note','Doubles — rappel du format','Course 1 km ensemble, puis on se répartit chaque station 50/50 : vous pouvez alterner à volonté tant que la distance ou les reps totales sont faites.','','run');
 /* un item = id existant (string) ou [nom, consigne, champ de résultat, figure] -> un poste = une fiche */
 const mkS=(key,o)=>{let n=0;const ids=l=>l.map(x=>typeof x==='string'?x:cx(key+'-'+(++n),x[0],x[1],x[2],x[3]));
  return Object.assign({},o,{k:key,b:o.b.map(bl=>[bl[0],ids(bl[1])])});};
 const WU=['Échauffement · 8 min',['gx-wu']],CD=['Retour au calme',['gx-cd']];
 const SEANCES=[
  /* ================= SOLO ================= */
  mkS('gx-s-emom',{g:'solo',t:'EMOM Hyrox + muscu courte',s:'EMOM Hyrox',min:60,diff:'noire',n:'Deux EMOM de 12 min avec des postes différents, puis 3 exos de dos et pecs. Chaque minute = un poste. Séance dure : pas la veille d\'une grosse séance de jambes.',b:[WU,
   ['EMOM A · 12 min (3 tours de 4 min)',[['Min 1 — Rameur 14 cal','Une minute, une série. Si tu finis avant la fin de la minute, tu récupères le reste.','tours faits','rower'],['Min 2 — Wall balls × 12','Balle 6 kg (4 kg si besoin), cible à 3 m.','','wallball'],['Min 3 — Burpees × 10','Poitrine au sol, saut léger en fin de mouvement.','','burpee'],['Min 4 — Farmer carry 40 m','Haltères ou kettlebells lourds, dos neutre.','kg / main','carry']]],
   ['EMOM B · 12 min (3 tours de 4 min)',[['Min 1 — SkiErg 12 cal','Tirage long, jambes et dos ensemble.','tours faits','skierg'],['Min 2 — Swings kettlebell × 15','Hanches qui claquent, bras relâchés.','kg','hinge'],['Min 3 — Fentes marchées × 16 pas','Avec sac ou haltères légers.','','lunge'],['Min 4 — Pompes × 12','Corps gainé, poitrine au sol.','','plank']]],
   ['Muscu courte · 15 min',['pull-rowcable','push-incline','pull-plank']],CD]}),
  mkS('gx-s-ladder',{g:'solo',t:'Échelle Hyrox + épaules',s:'Échelle Hyrox',min:60,diff:'noire',n:'Échelle descendante : 10 · 8 · 6 · 4 · 2 répétitions à chaque palier, avec 400 m de tapis entre les paliers. Puis épaules et dos.',b:[WU,
   ['Échelle · 5 paliers (10 · 8 · 6 · 4 · 2)',[['Palier — Wall balls','n répétitions au palier n, balle 6 kg.','palier atteint','wallball'],['Palier — Burpees broad jump','n répétitions, saut en avant à chaque burpee.','','burpee'],['Palier — Fentes avec sac','n pas par jambe, sac sur les épaules ou haltères.','','lunge'],['Entre les paliers — Tapis 400 m','400 m à allure de course (ou 4 min de vélo vite).','temps moyen','run']]],
   ['Épaules + dos · 15 min',['sh-dbpress','back-pulldown','pull-face']],CD]}),
  mkS('gx-s-engine',{g:'solo',t:'Moteur machines + haut du corps',s:'Moteur + haut',min:65,diff:'bleue',n:'Trois machines différentes pour le souffle, puis une vraie séance de haut du corps.',b:[WU,
   ['Moteur · 24 min',[['Rameur — 4 × 3 min','Allure soutenue (tu peux dire 3 mots, pas une phrase), 1 min de repos.','distance totale (m)','rower'],['SkiErg — 3 × 2 min','Cadence haute, tirage complet, 1 min de repos.','distance totale (m)','skierg'],['Vélo — 5 × 1 min','1 min vite / 1 min très facile.','calories','bike']]],
   ['Haut du corps · 25 min',['pec-dbpress','pull-pulldown','sh-dbpress','push-tri']],CD]}),
  mkS('gx-s-legrun',{g:'solo',t:'Tapis varié + jambes légères',s:'Tapis + jambes',min:70,diff:'noire',n:'Trois formats de tapis (seuil, côtes, fartlek) puis jambes en charge modérée. Place-la loin d\'une séance de jambes lourde.',b:[WU,
   ['Tapis · 30 min',[['Seuil — 3 × 5 min','Allure soutenue mais tenable, pente 1 %, 2 min de trot entre chaque.','allure moyenne /km','run'],['Côtes — 6 × 1 min','Pente 8 %, marche rapide ou course lente, 1 min de repos.','','run'],['Fartlek — 6 × (30 s vite / 30 s facile)','Pour finir en s\'amusant.','','run']]],
   ['Jambes légères · 20 min',['leg-press','leg-curl','leg-calf']],CD]}),
  mkS('gx-s-hybrid',{g:'solo',t:'Force + moteur Hyrox',s:'Force + moteur',min:65,diff:'noire',n:'D\'abord de la force frais (squat + tractions), puis 5 tours avec trois postes différents. Réduis le squat si tu enchaînes les séances dures.',b:[WU,
   ['Force · 20 min',['leg-squat','pull-pullup']],
   ['Moteur · 5 tours (repos 1 min entre les tours)',[['Poste 1 — Rameur 250 m','Garde le même rythme du premier au dernier tour.','temps','rower'],['Poste 2 — Wall balls × 10','Balle 6 kg.','','wallball'],['Poste 3 — Tapis 200 m','Allure de course, sans t\'arrêter.','','run']]],CD]}),
  mkS('gx-s-mix',{g:'solo',t:'Cardio salle sans course',s:'Cardio mixte',min:45,diff:'verte',n:'Vélo, rameur et marche en pente : beaucoup de cardio, peu de stress sur les articulations. Se fait jambes lourdes ou pour récupérer.',b:[
   ['Cardio mixte · 45 min',[['Vélo — 15 min','Allure où tu peux parler.','km ou calories','bike'],['Rameur — 15 min','Cadence 20 coups/min, allure facile.','distance (m)','rower'],['Marche en pente — 15 min','Pente 8–12 %, 5–6 km/h, sans te tenir.','km','run']]]]}),
  mkS('gx-s-interv',{g:'solo',t:'Intervalles machines',s:'Intervalles',min:45,diff:'noire',n:'Courte et intense sur trois machines, avec un finish de gainage. Bon moteur sans impact.',b:[WU,
   ['Intervalles · 24 min',[['SkiErg — 8 × 1 min','1 min très fort / 1 min facile.','distance totale (m)','skierg'],['Assault bike — 6 × 30 s','30 s à fond / 90 s facile.','calories','bike'],['Rameur — 4 × 500 m','Allure 5 km, 2 min de repos.','temps moyen','rower']]],
   ['Gainage · 6 min',['pull-plank','th-hanging']],CD]}),
  /* ================= BINÔME ================= */
  mkS('gx-d-ygig',{g:'duo',t:'Binôme « tu pars, je pars » + muscu',s:'Binôme YGIG',min:65,diff:'noire',n:'Un travaille, l\'autre court 400 m (ou 1 min de vélo vite), puis on échange. Deux tours avec des postes différents, puis un peu de muscu.',b:[WU,
   ['Tour 1 — chacun fait la station, l\'autre court',[['Poste 1 — Wall balls × 20 chacun','Balle 6 kg.','','wallball'],['Poste 2 — Sled push 40 m chacun','Charge qui te force à pousser fort.','kg','sledpush'],['Poste 3 — Burpees × 20 chacun','Rythme régulier.','','burpee'],['Poste 4 — Farmer carry 100 m chacun','Charge lourde, dos neutre.','kg / main','carry']]],
   ['Tour 2 — autres postes',[['Poste 5 — Rameur 500 m chacun','Un 500 m à allure 2 km.','temps','rower'],['Poste 6 — Fentes avec sac × 20 pas chacun','Sac sur les épaules ou haltères.','','lunge'],['Poste 7 — SkiErg 300 m chacun','Cadence haute.','temps','skierg'],['Poste 8 — Swings kettlebell × 20 chacun','Charge modérée.','kg','hinge']]],
   ['Muscu à deux · 12 min',['back-dbrow','pec-dbpress']],CD]}),
  mkS('gx-d-relay',{g:'duo',t:'Relais binôme 4 × 4 min',s:'Relais binôme',min:55,diff:'bleue',n:'4 relais où l\'un fait de la machine pendant que l\'autre fait un circuit, puis on échange. Quatre combinaisons différentes.',b:[WU,
   ['Relais 1',[['Rameur 4 min  /  circuit squats-pompes','A : rameur soutenu. B : 12 goblet squats + 10 pompes en boucle. Puis on échange.','calories cumulées','rower']]],
   ['Relais 2',[['SkiErg 4 min  /  circuit swings-fentes','A : SkiErg soutenu. B : 15 swings + 16 pas de fentes en boucle.','calories cumulées','skierg']]],
   ['Relais 3',[['Vélo 4 min  /  circuit burpees-tractions','A : assault bike soutenu. B : 8 burpees + 6 tractions ou tirages en boucle.','calories cumulées','bike']]],
   ['Relais 4',[['Tapis 4 min  /  circuit wall balls-gainage','A : tapis allure 10 km. B : 12 wall balls + 30 s de planche en boucle.','distance cumulée','run']]],CD]}),
  mkS('gx-d-doubles',{g:'duo',t:'Hyrox Doubles — simulation complète en salle',s:'Doubles Hyrox',min:90,diff:'noire',n:'8 × (1 km ensemble + station partagée 50/50). Le format le plus proche d\'un Hyrox Doubles. Séance très dure : au maximum une fois par mois.',
   b:[['Rappel du format',['gx-doubles-note']]].concat([['SkiErg 1000 m','mer-skierg'],['Sled push','mer-sledpush'],['Sled pull','mer-sledpull'],['Burpees broad jump','mer-burpee'],['Rowing 1000 m','mer-row'],['Farmer carry','mer-farmer'],['Sandbag lunges','mer-lunges'],['Wall balls','mer-wb']].map((x,i)=>[(i+1)+'. 1 km ensemble + '+x[0]+' (à deux)',['hx-run1k~'+(i+1)+'d',x[1]]]))}),
  mkS('gx-d-hxhalf',{g:'duo',t:'Hyrox Doubles — demi-simulation (4 stations)',s:'Demi-simu binôme',min:65,diff:'noire',n:'La moitié d\'un Hyrox Doubles : 4 × (1 km ensemble + une station partagée 50/50). SkiErg, sled push, burpees broad jump et wall balls. Allure régulière, on se répartit les stations comme en course.',
   b:[WU].concat([['SkiErg 1000 m','mer-skierg'],['Sled push','mer-sledpush'],['Burpees broad jump','mer-burpee'],['Wall balls','mer-wb']].map((x,i)=>[(i+1)+'. 1 km ensemble + '+x[0]+' (à deux)',['hx-run1k~'+(i+1)+'h',x[1]]])).concat([CD])}),
  mkS('gx-d-partner',{g:'duo',t:'Muscu à deux + finisher Hyrox',s:'Muscu + finisher',min:70,diff:'bleue',n:'On alterne les séries pendant que l\'autre se repose, puis trois postes en AMRAP de 10 min.',b:[WU,
   ['Muscu en alternance · 30 min',['leg-press','back-dbrow','pec-dbpress','sh-dbpress']],
   ['Finisher · AMRAP 10 min en relais',[['Rameur 10 cal','Un seul travaille à la fois, on change à chaque poste.','tours complets','rower'],['Wall balls × 10','Balle 6 kg.','','wallball'],['Burpees × 10','Un tour = les 3 postes.','','burpee']]],CD]}),
  mkS('gx-d-wod',{g:'duo',t:'CrossFit à deux — Partner AMRAP',s:'Partner AMRAP',min:60,diff:'noire',n:'Un peu de force, puis 20 min de WOD en relais sur quatre mouvements. Charges légères : la qualité du mouvement avant la vitesse.',b:[WU,
   ['Force à deux · 12 min',['push-ohp','pull-pullup']],
   ['AMRAP · 20 min (1 tour = les 4 postes)',[['Thrusters × 12','Barre légère ou haltères : squat puis développé en un seul mouvement.','tours faits','overhead'],['Step-ups ou box jumps × 12','Hauteur adaptée, pas de saut si genoux fragiles.','','lunge'],['Rameur 12 cal','Cadence haute.','','rower'],['Burpees × 10','Un seul travaille à la fois, on se répartit les reps librement.','','burpee']]],
   ['Gainage · 8 min',['pull-plank','th-hanging']],CD]}),
  mkS('gx-d-chipper',{g:'duo',t:'Chipper à deux — 100 reps',s:'Chipper à deux',min:55,diff:'noire',n:'Une liste de six mouvements à finir ensemble, dans l\'ordre, cap à 30 min. Répartition libre entre vous deux.',b:[WU,
   ['Chipper · cap 30 min (dans l\'ordre)',[['1. Wall balls × 100','Un seul travaille, l\'autre marche pour garder le rythme.','temps total','wallball'],['2. Swings kettlebell × 80','Hanches, pas les bras.','','hinge'],['3. Rameur 60 cal','Cadence haute.','','rower'],['4. Burpees × 40','Régulier.','','burpee'],['5. Pompes × 30','Gainé, poitrine au sol.','','plank'],['6. Relevés de genoux suspendus × 20','Sans élan.','','hanging']]],CD]}),
  mkS('gx-d-emom',{g:'duo',t:'EMOM binôme — CrossFit × Hyrox',s:'EMOM binôme',min:50,diff:'bleue',n:'30 minutes où chacun travaille une minute sur deux (A les minutes impaires, B les paires), en deux blocs de 15 min avec des postes différents.',b:[WU,
   ['EMOM 1 · 15 min (rotation de 3 postes)',[['Poste 1 — Rameur 12 cal','5 rotations sur 15 min.','rotations faites','rower'],['Poste 2 — Wall balls × 12','Balle 6 kg.','','wallball'],['Poste 3 — Burpees broad jump × 8','Rythme régulier.','','burpee']]],
   ['EMOM 2 · 15 min (rotation de 3 postes)',[['Poste 1 — SkiErg 12 cal','5 rotations sur 15 min.','rotations faites','skierg'],['Poste 2 — Swings kettlebell × 15','Charge modérée.','','hinge'],['Poste 3 — Fentes avec sac × 16 pas','Sac ou haltères.','','lunge']]],CD]}),
  mkS('gx-d-metcon',{g:'duo',t:'Force + metcon à deux',s:'Force + metcon',min:60,diff:'bleue',n:'On alterne les séries lourdes pendant que l\'autre se repose, puis un metcon en relais sur quatre postes.',b:[WU,
   ['Force alternée · 20 min',['leg-squat','pull-pullup','push-ohp']],
   ['Metcon · 15 min (1 tour = les 4 postes)',[['Goblet squats × 10','Haltère ou kettlebell tenu au torse.','tours faits','squat'],['Rowing haltère × 10 par bras','Dos plat, coude proche du corps.','','rowbent'],['Pompes × 10','Gainé.','','plank'],['Tapis 200 m (ou 40 cal vélo)','Allure soutenue. Un seul travaille à la fois.','','run']]],CD]}),
  mkS('gx-d-pyr',{g:'duo',t:'Pyramide à deux — Hyrox × CrossFit',s:'Pyramide à deux',min:55,diff:'noire',n:'Pyramide de 1 à 10 puis retour sur trois mouvements : à chaque palier n, n répétitions de chacun. Très dur : garde de la marge sur les derniers paliers.',b:[WU,
   ['Pyramide · cap 35 min (1→10→1)',[['Wall balls — n par palier','100 répétitions au total. Un seul travaille, on change à chaque mouvement.','temps total','wallball'],['Rameur — n calories par palier','100 calories au total.','','rower'],['Burpees — n par palier','100 répétitions au total.','','burpee']]],
   ['Gainage · 6 min',['pull-plank','th-hanging']],CD]})
 ];
 const mk=o=>({soir:{title:o.t,short:o.s,dur:o.min+' min',min:o.min,A:o.b.map(x=>({n:x[0],ex:x[1]})),note:o.n},short:o.s,diff:o.diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 SEANCES.forEach(o=>{window.hxTplExt[o.k]=()=>mk(o);});
 window.hxSwExt.push({sec:'Cardio / Hyrox / CrossFit en salle — solo',items:SEANCES.filter(x=>x.g==='solo').map(x=>({k:x.k,t:x.t,sub:x.min+' min'}))});
 window.hxSwExt.push({sec:'Cardio / Hyrox / CrossFit en salle — en binôme 👥',items:SEANCES.filter(x=>x.g==='duo').map(x=>({k:x.k,t:'👥 '+x.t,sub:x.min+' min'}))});
 window.hxGx=SEANCES;
})();
