/* ===================== PROGRAMME SIMPLE : Pecs / Épaules+cardio / Dos / Jambes moto-friendly ===================== */
// Variante A / B : alterne toutes les 4 semaines. Cardio du mardi : tourne chaque semaine.
_x('fin-bike',{name:'Assault bike — petit cardio',txt:'6 × 30 s vite / 60 s facile (8 min)',kind:'cardio',ph:'calories'});
_x('cd-run',{name:'Course fractionnée 8 × 400 m',txt:'Échauffement 5 min, puis 8 × 400 m rapide (récup 90 s trot), retour au calme 5 min',kind:'cardio',ph:'allure moyenne /400 m'});
_x('cd-erg',{name:'SkiErg + rameur — 5 tours',txt:'5 tours : 500 m SkiErg puis 500 m rameur, sans pause',kind:'cardio',ph:'temps total'});
_x('cd-circuit',{name:'Circuit Hyrox — 3 tours',txt:'3 tours : sled push 20 m, farmer carry 40 m, 15 wall balls, 10 burpees',kind:'cardio',ph:'temps total'});
_x('cd-z2',{name:'Course continue facile',txt:'25 min à allure facile (tu peux parler)',kind:'cardio',ph:'km parcourus'});
// Cardio facile, long (prise de masse)
_x('cz-bike',{name:'Vélo — cardio facile 30 min',txt:'30 min allure facile, tu peux parler (≈ 65 % FC max)',kind:'cardio',ph:'km ou calories'});
_x('cz-incline',{name:'Marche en pente — 30 min',txt:'30 min, pente 8–12 %, 5–6 km/h, sans te tenir',kind:'cardio',ph:'km'});
_x('cz-elliptic',{name:'Elliptique — 30 min',txt:'30 min allure facile, résistance modérée',kind:'cardio',ph:'km ou calories'});
_x('cz-row',{name:'Rameur facile — 25 min',txt:'25 min cadence 20 coups/min, allure facile',kind:'cardio',ph:'mètres'});
ALT['cz-bike']=[['Vélo semi-allongé — 30 min',0,'km'],['Assault bike facile — 25 min',0,'cal']];
ALT['cz-incline']=[['Tapis — marche rapide 30 min',0,'km']];
ALT['cz-elliptic']=[['Stepper / escalier — 25 min',0,'km']];
ALT['cz-row']=[['SkiErg facile — 20 min',0,'m']];
// Pecs B
_x('pec-dbpress',{name:'Développé couché haltères',sets:4,reps:[8,12],cat:'compound',unit:'kg/haltère',base:24,inc:2,m:'Pecs',s:['Triceps','Épaules'],rest:120,lg:'lun-bench'});
_x('pec-incbar',{name:'Développé incliné barre',sets:4,reps:[6,10],cat:'compound',base:50,inc:2.5,m:'Pecs',s:['Épaules','Triceps'],rest:120,lg:'lun-incline'});
_x('pec-deck',{name:'Pec deck / butterfly (machine)',sets:3,reps:[12,15],base:30,inc:2.5,m:'Pecs',rest:75,lg:'lun-flye'});
_x('pec-skull',{name:'Barre au front',sets:3,reps:[10,12],base:30,inc:2.5,m:'Triceps',rest:90,lg:'lun-skull'});
_x('pec-rope',{name:'Extension triceps à la corde',sets:3,reps:[12,15],base:22,inc:2.5,m:'Triceps',rest:60});
// Épaules
_x('sh-arnold',{name:'Développé Arnold',sets:3,reps:[10,12],cat:'compound',unit:'kg/haltère',base:14,inc:2,m:'Épaules',s:['Triceps'],rest:90});
_x('sh-dbpress',{name:'Développé militaire haltères',sets:4,reps:[8,12],cat:'compound',unit:'kg/haltère',base:16,inc:2,m:'Épaules',s:['Triceps'],rest:105,lg:'jeu-military'});
_x('sh-latcable',{name:'Élévations latérales machine (plate loaded)',sets:4,reps:[12,15],unit:'kg/côté (disques)',base:10,inc:2.5,m:'Épaules',rest:60,lg:'jeu-lateral'});
_x('sh-birds',{name:'Oiseau machine (pec deck inversé)',sets:3,reps:[12,15],base:25,inc:2.5,m:'Épaules',s:['Dos'],rest:60});
_x('sh-front',{name:'Élévations frontales barre',sets:3,reps:[10,12],unit:'kg',base:20,inc:2.5,m:'Épaules',rest:60,lg:'jeu-front'});
// Dos B
_x('back-pulldown',{name:'Tirage vertical prise large',sets:4,reps:[8,12],cat:'compound',base:45,inc:2.5,m:'Dos',s:['Biceps'],rest:105});
_x('back-tbar',{name:'Rowing T-bar (machine)',sets:4,reps:[8,10],cat:'compound',base:40,inc:2.5,m:'Dos',s:['Biceps'],rest:105,lg:'mar-rowbar'});
_x('back-dbrow',{name:'Rowing unilatéral haltère',sets:3,reps:[10,12],unit:'kg/haltère',base:24,inc:2,m:'Dos',s:['Biceps'],rest:90,lg:'mar-rowdb'});
_x('back-pullover',{name:'Pull-over poulie (bras tendus)',sets:3,reps:[12,15],base:25,inc:2.5,m:'Dos',rest:60});
_x('back-curlham',{name:'Curl marteau',sets:3,reps:[10,12],unit:'kg/haltère',base:14,inc:2,m:'Biceps',rest:60,lg:'mar-curlham'});
_x('back-curlcable',{name:'Curl poulie basse',sets:3,reps:[10,12],base:25,inc:2.5,m:'Biceps',rest:60});
// Jeudi : jambes sans casser le week-end
_x('th-hipthrust',{name:'Hip thrust (barre/machine)',sets:4,reps:[8,12],cat:'compound',base:60,inc:5,m:'Jambes',rest:105});
_x('th-hanging',{name:'Relevé de jambes suspendu',sets:3,reps:[10,15],unit:'kg lesté',base:0,inc:1,m:'Core',rest:60});
_x('th-calfseat',{name:'Mollets assis (machine)',sets:3,reps:[12,15],base:40,inc:2.5,m:'Jambes',rest:60});
ALT['th-hipthrust']=[['Hip thrust Smith machine',60,'kg'],['Pont fessier (glute bridge) lesté',40,'kg'],['SDT jambes tendues',60,'kg']];
ALT['pec-dbpress']=ALT['lun-bench'];ALT['pec-incbar']=ALT['lun-incline'];ALT['pec-deck']=[['Écarté poulie vis-à-vis',12,'kg'],['Écarté haltères banc plat',10,'kg/haltère']];ALT['pec-skull']=ALT['lun-skull'];
ALT['pec-rope']=[['Extension triceps poulie haute',25,'kg'],['Extension triceps katana (poulie, au-dessus de la tête)',20,'kg'],['Kickback haltère',8,'kg/haltère']];
ALT['sh-arnold']=[['Développé militaire haltères',16,'kg/haltère'],['Press machine épaules',35,'kg']];ALT['sh-dbpress']=ALT['jeu-military'];ALT['sh-latcable']=[['Élévations latérales machine',15,'kg'],['Élévations latérales haltères',8,'kg/haltère']];
ALT['sh-birds']=[['Oiseau haltères buste penché',6,'kg/haltère'],['Face pull (poulie)',20,'kg']];ALT['sh-front']=[['Élévation frontale poulie',7,'kg'],['Élévation frontale disque',10,'kg']];
ALT['back-pulldown']=[['Tirage vertical prise neutre',50,'kg'],['Tractions assistées (machine)',20,'kg d\'assistance','compound',{bw:0}]];ALT['back-tbar']=ALT['mar-rowbar'];ALT['back-dbrow']=ALT['mar-rowdb'];
ALT['back-pullover']=[['Tirage vertical unilatéral',25,'kg']];ALT['back-curlham']=[['Curl marteau à la corde (poulie)',20,'kg'],['Curl Zottman',12,'kg/haltère']];ALT['back-curlcable']=[['Curl EZ',20,'kg'],['Curl pupitre',20,'kg']];
ALT['th-calfseat']=[['Mollets debout (machine)',60,'kg'],['Mollets à la presse à cuisses',80,'kg']];ALT['th-hanging']=[['Crunch à la poulie',30,'kg'],['Gainage lesté',0,'kg']];
ALT['fin-bike']=[['SkiErg — 6 × 30 s',0,'cal'],['Rameur — 6 × 30 s',0,'cal']];
ALT['cd-run']=[['Course fractionnée 6 × 600 m',0,'']];ALT['cd-z2']=[['Vélo elliptique — 25 min',0,'km'],['VTT / vélo — 30 min',0,'km']];

const variantOf=d=>((Math.floor(weeksBetween(V2,mondayOf(d))/4)%2)+2)%2?'B':'A';
const CZ=['cz-bike','cz-incline','cz-elliptic','cz-row'];
const cardioAt=(d,k)=>CZ[(((weeksBetween(V2,mondayOf(d))+k)%4)+4)%4];
function soirOf(P,d){if(!P||!P.soir)return null;const s=P.soir;if(!s.A)return s;const v=variantOf(d);const bl=(v==='B'&&s.B)?s.B:s.A;
 return{title:s.title,short:s.short,dur:s.dur,min:s.min,note:s.note,variant:v,blocks:bl.map(b=>({n:b.n,ex:b.ex.map(x=>/^@cz:/.test(x)?cardioAt(d,+x.slice(4)):x)}))};}

const PROG2={
lun:{label:'Lundi',short:'LUN',bib:'01',diff:'bleue',soir:{title:'Pecs / Triceps + cardio facile',short:'Pecs + cardio',dur:'1h30',min:90,
  A:[{n:'Musculation · 58 min',ex:['push-bench','push-incline','push-fly','push-dips','pec-skull','push-tri']},{n:'Cardio facile · 30 min',ex:['@cz:0']}],
  B:[{n:'Musculation · 50 min',ex:['pec-dbpress','pec-incbar','pec-deck','push-dips','pec-skull','pec-rope']},{n:'Cardio facile · 30 min',ex:['@cz:0']}],
  note:'Descente contrôlée (2–3 s), étirement complet en bas. Cardio après la muscu, allure où tu peux parler.'}},
mar:{label:'Mardi',short:'Jambes + cardio',bib:'02',diff:'bleue',soir:{title:'Jambes + cardio facile',short:'Jambes + cardio',dur:'1h35',min:95,
  A:[{n:'Jambes · 60 min',ex:['leg-squat','leg-rdl','leg-press','leg-curl','leg-calf']},{n:'Cardio facile · 30 min',ex:['@cz:1']}],
  B:[{n:'Jambes · 60 min',ex:['leg-press','leg-rdl','leg-ext','leg-curl','th-calfseat']},{n:'Cardio facile · 30 min',ex:['@cz:1']}],
  note:'Vraie séance jambes : 3 jours de récup avant la moto du vendredi. Cardio sans course : jambes déjà chargées.'}},
mer:{label:'Mercredi',short:'Dos + cardio',bib:'03',diff:'bleue',soir:{title:'Dos / Biceps + cardio facile',short:'Dos + cardio',dur:'1h35',min:95,
  A:[{n:'Musculation · 60 min',ex:['pull-pullup','pull-rowbar','pull-rowcable','pull-pulldown','pull-curlbar','pull-curlinc']},{n:'Cardio facile · 30 min',ex:['@cz:2']}],
  B:[{n:'Musculation · 60 min',ex:['back-pulldown','back-tbar','back-dbrow','back-pullover','back-curlham','back-curlcable']},{n:'Cardio facile · 30 min',ex:['@cz:2']}],
  note:'Tire avec les coudes, serre les omoplates. Pas de biceps au failli : garde du grip pour la moto.'}},
jeu:{label:'Jeudi',short:'Épaules',bib:'04',diff:'bleue',soir:{title:'Épaules + rappel bras / tractions / dips',short:'Épaules',dur:'1h15',min:75,
  A:[{n:'Épaules · 40 min',ex:['push-ohp','push-lateral','sh-front','sh-birds','pull-face']},{n:'Rappel bras · 12 min (superset)',ex:['pull-curlbar','push-tri']},{n:'Rappel tractions / dips · 10 min',ex:['jr-pullup','jr-dips']}],
  B:[{n:'Épaules · 40 min',ex:['sh-dbpress','sh-latcable','sh-front','sh-birds','pull-face']},{n:'Rappel bras · 12 min (superset)',ex:['back-curlham','pec-rope']},{n:'Rappel tractions / dips · 10 min',ex:['jr-pullup','jr-dips']}],
  note:'Épaules : 1–2 reps en réserve, pas d\'échec, pour rouler vendredi avec des avant-bras frais. Rappel bras en superset, tractions/dips : 3 séries propres sans aller au bout, c\'est juste un rappel de fréquence.'}},
ven:{label:'Vendredi',short:'VEN',bib:'05',diff:'moto',title:'Libre — moto à partir de l\'après-midi',note:'Pas de salle. Logue ta moto, ton VTT ou ta course dans les activités.'},
sam:{label:'Samedi',short:'SAM',bib:'06',diff:'moto',suggest:'moto',title:'Motocross',note:'Renseigne ta séance ci-dessous.'},
dim:{label:'Dimanche',short:'DIM',bib:'07',diff:'fermee',rest:true,title:'Repos / moto libre',note:'Mobilité, marche, sommeil. Si tu roules encore, logue-le dans les activités.'}
};

{const HR=['Rowing haut Hammer Iso-Lateral High Row (machine à disques)',30,'kg/côté'],SR=['Seal row — banc de rowing à plat (barre)',40,'kg'];
ALT['mar-rowbar'].push(SR,HR);ALT['mar-rowcable'].push(HR);ALT['pull-pulldown'].push(HR);ALT['back-pulldown'].push(HR);}
