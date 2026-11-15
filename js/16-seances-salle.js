/* ===================== SÉANCES PRÉCHARGÉES : cardio + Hyrox en salle, solo et binôme (avec un peu de muscu) ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 const cx=(id,name,txt,ph,pat)=>{def(id,{name:name,txt:txt,kind:'cardio',ph:ph||'temps total'});PAT_DEFAULT[id]=pat||'run';};
 /* ---- briques communes ---- */
 cx('gx-wu','Échauffement — 8 min','4 min de vélo ou tapis facile, puis 4 min de mobilité : cercles de hanches, rotations du buste, 10 squats poids de corps, 10 tirages élastique ou poulie légère.','fait ✓','bike');
 cx('gx-cd','Retour au calme — 5 min','5 min de marche ou vélo très facile, puis étirements hanches, mollets, dos.','fait ✓','bike');
 /* ---- solo ---- */
 cx('gx-emom','EMOM Hyrox — 24 min','Toutes les minutes pendant 24 min (6 tours de 4 postes) : min 1 → 14 cal rameur (ou SkiErg) · min 2 → 12 wall balls · min 3 → 10 burpees · min 4 → 40 m farmer carry. Tu finis avant la minute : tu récupères le reste. Tu n\'y arrives pas : baisse la charge ou les reps, jamais la technique.','tours complétés','wallball');
 cx('gx-ladder','Échelle Hyrox — 10·8·6·4·2','5 paliers : 10, 8, 6, 4 puis 2 répétitions de [wall balls + burpees + fentes sac], et 400 m de tapis (ou 4 min de vélo) entre chaque palier. Allure soutenue mais régulière.','temps total','wallball');
 cx('gx-engine','Moteur machines — 4 tours','4 tours : 4 min de rameur allure soutenue (tu peux dire 3 mots, pas une phrase) puis 2 min de SkiErg ou vélo facile. Note ta distance au rameur à chaque tour.','distance totale (m)','rower');
 cx('gx-legrun','Intervalles tapis — 5 × 4 min','5 × 4 min à allure seuil (essoufflé mais tenable) pente 1 %, avec 2 min de trot facile entre chaque. Recule d\'un cran si tu ne finis pas le 5e.','allure moyenne /km','run');
 cx('gx-hy','Moteur Hyrox — 5 tours','5 tours : 250 m rameur + 10 wall balls + 200 m tapis. Repos 1 min entre les tours. Garde le même rythme du 1er au dernier tour.','temps total','rower');
 cx('gx-mix','Cardio mixte facile — 45 min','15 min de vélo, 15 min de rameur, 15 min de marche en pente (8–12 %). Allure où tu peux parler, sans pause entre les machines.','km ou calories','bike');
 cx('gx-int','Intervalles machines — 30 min','Échauffement 5 min. 8 × (1 min SkiErg ou rameur très fort / 1 min vélo facile), 3 min de récup, puis 6 × (30 s assault bike à fond / 90 s facile).','calories totales','skierg');
 /* ---- binôme ---- */
 cx('gx-ygig','Binôme « tu pars, je pars » — 2 tours','Un poste après l\'autre : A fait la station pendant que B court 400 m de tapis (ou 1 min de vélo vite), puis on échange. Postes : 20 wall balls chacun · 40 m de sled push chacun · 20 burpees chacun · 100 m de farmer carry chacun. Refaire un 2e tour en changeant qui commence.','temps total à deux','wallball');
 cx('gx-relay','Relais binôme — 4 × 4 min','Pendant que A fait 4 min de machine (rameur, SkiErg ou vélo, effort soutenu), B enchaîne 4 min de circuit : 12 goblet squats + 10 pompes + 15 swings kettlebell + 20 m de marche chargée, en boucle. Puis on échange. 4 relais chacun.','calories ou distance cumulée à deux','rower');
 cx('gx-finish','Finisher à deux — AMRAP 10 min','10 min à deux : 10 cal rameur + 10 wall balls + 10 burpees, en relais (un seul travaille, l\'autre récupère, on change à chaque poste). Note le nombre de tours complets.','tours complets','burpee');
 cx('gx-doubles-note','Doubles — rappel','Course 1 km ensemble, puis on se répartit chaque station 50/50 : les deux peuvent la faire en alternant à volonté, tant que la distance totale est faite.','','run');
 /* ---- séances ---- */
 const SEANCES=[
  /* solo */
  {k:'gx-s-emom',g:'solo',t:'EMOM Hyrox + muscu courte',s:'EMOM Hyrox',min:60,diff:'noire',n:'24 min d\'EMOM sur les stations Hyrox, puis 3 exos de muscu de dos et pecs. Séance dure : pas la veille d\'une grosse séance de jambes.',
   b:[['Échauffement · 8 min',['gx-wu']],['EMOM · 24 min',['gx-emom']],['Muscu courte · 15 min',['pull-rowcable','push-incline','pull-plank']],['Retour au calme',['gx-cd']]]},
  {k:'gx-s-ladder',g:'solo',t:'Échelle Hyrox + épaules',s:'Échelle Hyrox',min:60,diff:'noire',n:'Échelle descendante sur wall balls, burpees et fentes, avec 400 m de tapis entre chaque palier, puis un peu d\'épaules et de dos.',
   b:[['Échauffement · 8 min',['gx-wu']],['Échelle · 25 min',['gx-ladder']],['Muscu courte · 15 min',['sh-dbpress','back-pulldown','pull-face']],['Retour au calme',['gx-cd']]]},
  {k:'gx-s-engine',g:'solo',t:'Moteur machines + haut du corps',s:'Moteur + haut',min:65,diff:'bleue',n:'Du cardio machine pour le souffle, puis une vraie séance de haut du corps. Idéal pour garder la masse en bossant l\'endurance.',
   b:[['Échauffement · 8 min',['gx-wu']],['Moteur · 24 min',['gx-engine']],['Haut du corps · 25 min',['pec-dbpress','pull-pulldown','sh-dbpress','push-tri']],['Retour au calme',['gx-cd']]]},
  {k:'gx-s-legrun',g:'solo',t:'Intervalles tapis + jambes légères',s:'Tapis + jambes',min:70,diff:'noire',n:'5 × 4 min au seuil sur tapis puis jambes en charge modérée. Place-la loin d\'une séance de jambes lourde.',
   b:[['Échauffement · 8 min',['gx-wu']],['Tapis · 30 min',['gx-legrun']],['Jambes légères · 20 min',['leg-press','leg-curl','leg-calf']],['Retour au calme',['gx-cd']]]},
  {k:'gx-s-hybrid',g:'solo',t:'Force + moteur Hyrox',s:'Force + moteur',min:65,diff:'noire',n:'D\'abord de la force frais (squat + tractions), puis 5 tours rameur / wall balls / tapis. Réduis le squat si tu enchaînes les séances dures.',
   b:[['Échauffement · 8 min',['gx-wu']],['Force · 20 min',['leg-squat','pull-pullup']],['Moteur · 25 min',['gx-hy']],['Retour au calme',['gx-cd']]]},
  {k:'gx-s-mix',g:'solo',t:'Cardio salle sans course',s:'Cardio mixte',min:45,diff:'verte',n:'Vélo, rameur et marche en pente : beaucoup de cardio, peu de stress sur les articulations. Se fait jambes lourdes ou pour récupérer.',
   b:[['Cardio mixte · 45 min',['gx-mix']]]},
  {k:'gx-s-interv',g:'solo',t:'Intervalles machines',s:'Intervalles',min:40,diff:'noire',n:'Courte et intense : SkiErg/rameur puis assault bike. Bon moteur sans impact.',
   b:[['Intervalles · 30 min',['gx-int']],['Retour au calme',['gx-cd']]]},
  /* binôme */
  {k:'gx-d-ygig',g:'duo',t:'Binôme « tu pars, je pars » + muscu',s:'Binôme YGIG',min:65,diff:'noire',n:'Un travaille, l\'autre court : effort réel sans se bousculer. Les charges se règlent pour que chacun finisse avec le même rythme.',
   b:[['Échauffement · 8 min',['gx-wu']],['Binôme · 30 min',['gx-ygig']],['Muscu à deux · 15 min',['back-dbrow','pec-dbpress']],['Retour au calme',['gx-cd']]]},
  {k:'gx-d-relay',g:'duo',t:'Relais binôme 4 × 4 min',s:'Relais binôme',min:50,diff:'bleue',n:'Machine contre circuit en relais : un seul fait de l\'effort à la fois, l\'autre souffle un peu. Bien pour deux niveaux différents.',
   b:[['Échauffement · 8 min',['gx-wu']],['Relais · 32 min',['gx-relay']],['Retour au calme',['gx-cd']]]},
  {k:'gx-d-doubles',g:'duo',t:'Hyrox Doubles — simulation en salle',s:'Doubles Hyrox',min:90,diff:'noire',n:'8 × (1 km ensemble + station partagée 50/50). Le format le plus proche d\'un Hyrox Doubles. Séance très dure : au maximum une fois par mois.',
   b:[['Rappel du format',['gx-doubles-note']]].concat([['SkiErg 1000 m','mer-skierg'],['Sled push','mer-sledpush'],['Sled pull','mer-sledpull'],['Burpees broad jump','mer-burpee'],['Rowing 1000 m','mer-row'],['Farmer carry','mer-farmer'],['Sandbag lunges','mer-lunges'],['Wall balls','mer-wb']].map((x,i)=>[(i+1)+'. 1 km ensemble + '+x[0]+' (à deux)',['hx-run1k~'+(i+1)+'d',x[1]]]))},
  {k:'gx-d-partner',g:'duo',t:'Muscu à deux + finisher Hyrox',s:'Muscu + finisher',min:70,diff:'bleue',n:'On alterne les séries pendant que l\'autre se repose, puis un AMRAP en binôme à la fin. Idéal quand on veut surtout de la muscu mais avec un bout de cardio.',
   b:[['Échauffement · 8 min',['gx-wu']],['Muscu en alternance · 30 min',['leg-press','back-dbrow','pec-dbpress','sh-dbpress']],['Finisher · 10 min',['gx-finish']],['Retour au calme',['gx-cd']]]}
 ];
 const mk=o=>({soir:{title:o.t,short:o.s,dur:o.min+' min',min:o.min,A:o.b.map(x=>({n:x[0],ex:x[1]})),note:o.n},short:o.s,diff:o.diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 SEANCES.forEach(o=>{window.hxTplExt[o.k]=()=>mk(o);});
 window.hxSwExt.push({sec:'Cardio / Hyrox en salle — solo',items:SEANCES.filter(x=>x.g==='solo').map(x=>({k:x.k,t:x.t,sub:x.min+' min'}))});
 window.hxSwExt.push({sec:'Cardio / Hyrox en salle — en binôme 👥',items:SEANCES.filter(x=>x.g==='duo').map(x=>({k:x.k,t:'👥 '+x.t,sub:x.min+' min'}))});
 window.hxGx=SEANCES;
})();
