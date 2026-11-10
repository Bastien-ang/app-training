/* ===================== PROGRAMME V2 (à partir du 2 nov 2026) : physique d'abord ===================== */
const V2='2026-11-02';
const PROG_V1=PROG;
function _x(id,o){def(id,o);}
// Lundi : jambes
_x('leg-squat',{name:'Squat',sets:4,reps:[6,8],cat:'compound',base:70,inc:2.5,m:'Jambes',s:['Core'],rest:150,lg:'ven-squat'});
_x('leg-rdl',{name:'Soulevé de terre roumain',sets:3,reps:[8,10],cat:'compound',base:70,inc:2.5,m:'Jambes',rest:120});
_x('leg-press',{name:'Presse à cuisses inclinée',sets:3,reps:[10,12],cat:'compound',base:140,inc:5,m:'Jambes',rest:120});
_x('leg-curl',{name:'Leg curl assis',sets:3,reps:[10,12],base:40,inc:2.5,m:'Jambes',rest:75});
_x('leg-ext',{name:'Leg extension (machine)',sets:3,reps:[12,15],base:45,inc:2.5,m:'Jambes',rest:75});
_x('leg-calf',{name:'Mollets debout (machine)',sets:3,reps:[12,15],base:60,inc:2.5,m:'Jambes',rest:60});
_x('leg-bike',{name:'Assault bike — intervalles',txt:'8 × 20 s sprint / 40 s récup',kind:'cardio',ph:'calories'});
// Mardi : push
_x('push-bench',{name:'Développé couché barre',sets:4,reps:[6,8],cat:'compound',base:60,inc:2.5,m:'Pecs',s:['Triceps','Épaules'],rest:150,lg:'lun-bench'});
_x('push-incline',{name:'Développé incliné haltères',sets:4,reps:[8,12],cat:'compound',unit:'kg/haltère',base:22,inc:2,m:'Pecs',s:['Épaules','Triceps'],rest:120,lg:'lun-incline'});
_x('push-ohp',{name:'Développé militaire barre',sets:3,reps:[8,10],cat:'compound',base:40,inc:2.5,m:'Épaules',s:['Triceps'],rest:120,lg:'jeu-military'});
_x('push-lateral',{name:'Élévations latérales machine (plate loaded)',sets:4,reps:[12,15],unit:'kg/côté (disques)',base:10,inc:2.5,m:'Épaules',rest:60,lg:'jeu-lateral'});
_x('push-dips',{name:'Dips lestés',sets:3,reps:[8,12],cat:'compound',unit:'kg lesté',base:10,inc:2.5,m:'Pecs',s:['Triceps','Épaules'],bw:0.8,rest:120,lg:'lun-dips'});
_x('jr-pullup',{name:'Tractions / tirage vertical',sets:3,reps:[6,10],cat:'compound',unit:'kg lesté (0 = poids de corps)',base:0,inc:2.5,m:'Dos',s:['Biceps'],bw:1,rest:90,lg:'mar-pullup'});
_x('jr-dips',{name:'Dips lestés',sets:3,reps:[8,12],cat:'compound',unit:'kg lesté',base:10,inc:2.5,m:'Pecs',s:['Triceps','Épaules'],bw:0.8,rest:90,lg:'lun-dips'});
_x('push-fly',{name:'Écarté poulie vis-à-vis',sets:3,reps:[12,15],base:12,inc:1,m:'Pecs',rest:75,lg:'lun-flye'});
_x('push-tri',{name:'Extension triceps poulie haute',sets:3,reps:[10,12],base:25,inc:2.5,m:'Triceps',rest:75,lg:'lun-triceps'});
_x('push-ski',{name:'SkiErg — 6 × 1 min',txt:'6 × 1 min fort / 1 min facile',kind:'cardio',ph:'distance (m)'});
_x('push-sled',{name:'Sled push',txt:'4×20 m',kind:'carry',cat:'hyrox-load',base:40,inc:2.5,rest:90,lg:'lun-sledpush'});
// Jeudi : pull
_x('pull-pullup',{name:'Tractions / tirage vertical',sets:4,reps:[6,10],cat:'compound',unit:'kg lesté (0 = poids de corps)',base:0,inc:2.5,m:'Dos',s:['Biceps'],bw:1,rest:120,lg:'mar-pullup'});
_x('pull-rowbar',{name:'Rowing barre',sets:4,reps:[8,10],cat:'compound',base:50,inc:2.5,m:'Dos',s:['Biceps'],rest:120,lg:'mar-rowbar'});
_x('pull-rowcable',{name:'Tirage horizontal poulie',sets:3,reps:[10,12],base:45,inc:2.5,m:'Dos',s:['Biceps'],rest:90,lg:'mar-rowcable'});
_x('pull-pulldown',{name:'Tirage vertical prise neutre',sets:3,reps:[10,12],base:50,inc:2.5,m:'Dos',s:['Biceps'],rest:90});
_x('pull-face',{name:'Face pull (poulie)',sets:3,reps:[12,15],base:20,inc:2.5,m:'Épaules',s:['Dos'],rest:60});
_x('pull-curlbar',{name:'Curl barre',sets:3,reps:[8,10],base:30,inc:2.5,m:'Biceps',rest:75,lg:'mar-curlbar'});
_x('pull-curlinc',{name:'Curl incliné haltères',sets:3,reps:[10,12],unit:'kg/haltère',base:10,inc:1,m:'Biceps',rest:60});
_x('pull-crunch',{name:'Crunch à la poulie',sets:3,reps:[12,15],base:30,inc:2.5,m:'Core',rest:60});
_x('pull-plank',{name:'Planche',sets:3,kind:'time',unit:'s',base:45,m:'Core',rest:45,lg:'jeu-plank'});
_x('pull-erg',{name:'Rowing erg',txt:'4×500 m',kind:'pace',unit:'/500m',base:110,lg:'mar-erg'});
_x('pull-farmer',{name:'Farmer carry',txt:'4×40 m',kind:'carry',cat:'hyrox-load',unit:'kg/main',base:24,inc:2,rest:75,lg:'mar-farmer'});
// Vendredi : pump léger (matin)
_x('fri-chest',{name:'Presse à pec machine',sets:3,reps:[12,15],base:40,inc:2.5,m:'Pecs',s:['Triceps'],rest:75});
_x('fri-lateral',{name:'Élévations latérales machine',sets:3,reps:[15,20],base:15,inc:2.5,m:'Épaules',rest:60});
_x('fri-pull',{name:'Tirage vertical (léger)',sets:3,reps:[12,15],base:45,inc:2.5,m:'Dos',s:['Biceps'],rest:75});
_x('fri-tri',{name:'Extension triceps corde',sets:2,reps:[12,15],base:20,inc:2.5,m:'Triceps',rest:60});
_x('fri-curl',{name:'Curl poulie basse',sets:2,reps:[12,15],base:20,inc:2.5,m:'Biceps',rest:60});
_x('fri-bike',{name:'Vélo zone 2 — 15 min',txt:'15 min facile, jambes détendues',kind:'cardio',ph:'km ou durée'});

ALT['leg-squat']=[['Squat Smith machine',60,'kg'],['Hack squat (machine)',60,'kg'],['Squat gobelet haltère',24,'kg'],['Squat bulgare',16,'kg/haltère']];
ALT['leg-rdl']=[['SDT jambes tendues',70,'kg'],['SDT roumain haltères',24,'kg/haltère'],['Good morning',30,'kg'],['Hip thrust (barre/machine)',60,'kg'],['Back extension 45° lestée',10,'kg']];
ALT['leg-press']=[['Presse à cuisses horizontale',120,'kg'],['Hack squat (machine)',60,'kg'],['Fentes marchées',16,'kg/haltère'],['Step-ups lestés',14,'kg/haltère']];
ALT['leg-curl']=[['Leg curl allongé (machine)',35,'kg'],['Leg curl debout unilatéral',15,'kg'],['Nordic curl assisté',0,'kg']];
ALT['leg-ext']=[['Leg extension unilatérale',25,'kg'],['Sissy squat',0,'kg lesté']];
ALT['leg-calf']=[['Mollets assis (machine)',40,'kg'],['Mollets à la presse à cuisses',80,'kg'],['Mollets unilatéral haltère',16,'kg/haltère']];
ALT['leg-bike']=[['SkiErg — intervalles 8×20 s',0,'cal'],['Rameur — intervalles 8×20 s',0,'cal']];
ALT['push-bench']=ALT['lun-bench'];ALT['push-incline']=ALT['lun-incline'];ALT['push-ohp']=ALT['jeu-military'];ALT['push-lateral']=ALT['jeu-lateral'];
ALT['push-dips']=ALT['lun-dips'];ALT['push-fly']=ALT['lun-flye'];ALT['push-tri']=ALT['lun-triceps'];ALT['push-sled']=ALT['lun-sledpush'];
ALT['push-ski']=[['Rameur — 6 × 1 min',0,'m'],['Assault bike — 6 × 1 min',0,'cal']];
ALT['pull-pullup']=ALT['mar-pullup'];ALT['jr-pullup']=ALT['mar-pullup'];ALT['jr-dips']=ALT['lun-dips'];ALT['pull-rowbar']=ALT['mar-rowbar'];ALT['pull-rowcable']=ALT['mar-rowcable'];ALT['pull-curlbar']=ALT['mar-curlbar'];
ALT['pull-erg']=ALT['mar-erg'];ALT['pull-farmer']=ALT['mar-farmer'];
ALT['pull-pulldown']=[['Tirage vertical prise large',45,'kg'],['Pull-over poulie (bras tendus)',25,'kg'],['Tirage vertical unilatéral',25,'kg']];
ALT['pull-face']=[['Oiseau machine (pec deck inversé)',25,'kg'],['Oiseau haltères buste penché',6,'kg/haltère'],['Rowing menton',20,'kg']];
ALT['pull-curlinc']=[['Curl pupitre',20,'kg'],['Curl poulie basse',25,'kg'],['Curl marteau',14,'kg/haltère'],['Curl concentré',10,'kg/haltère']];
ALT['pull-crunch']=[['Crunch machine',30,'kg'],['Relevé de jambes suspendu',0,'kg lesté'],['Crunch au sol lesté',5,'kg']];
ALT['pull-plank']=[['Gainage latéral (par côté)',30,'s'],['Hollow hold',30,'s'],['Roue abdominale',20,'s']];
ALT['fri-chest']=[['Pec deck',30,'kg'],['Développé incliné haltères léger',16,'kg/haltère'],['Écarté poulie',10,'kg']];
ALT['fri-lateral']=[['Élévations latérales poulie',7,'kg'],['Élévations latérales haltères',8,'kg/haltère']];
ALT['fri-pull']=[['Tirage horizontal machine',40,'kg'],['Pull-over poulie',20,'kg']];
ALT['fri-tri']=[['Extension triceps poulie haute',22,'kg'],['Kickback',8,'kg/haltère']];
ALT['fri-curl']=[['Curl EZ',20,'kg'],['Curl haltères alterné',10,'kg/haltère']];
ALT['fri-bike']=[['Marche en pente — 15 min',0,'km'],['Elliptique — 15 min',0,'km'],['Rameur facile — 15 min',0,'m']];

let progOf=(d,id)=>(d<V2?PROG_V1:PROG2)[id||dayId(d)];
