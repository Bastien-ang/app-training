'use strict';
/* ===================== DONNÉES : programme, exercices, cycles ===================== */
const PHOTO='https://images.unsplash.com/photo-1666682990104-0e0b418c78ae?auto=format&fit=crop&w=1600&q=75';
const DAYIDS=['dim','lun','mar','mer','jeu','ven','sam'];
const MONTHS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DIFF={bleue:{c:'#4DA3E8',l:'MODÉRÉ'},noire:{c:'#E5484D',l:'INTENSE'},verte:{c:'#4CAF6A',l:'LÉGER'},moto:{c:'#FF5A1F',l:'TERRAIN'},fermee:{c:'#46525a',l:'REPOS'}};
const MUSCLES=['Pecs','Dos','Épaules','Biceps','Triceps','Jambes','Core'];
const CATS={muscu:{l:'Muscu',c:'#4DA3E8'},run:{l:'Course',c:'#FF5A1F'},hyrox:{l:'Hyrox',c:'#E0A93B'},vtt:{l:'VTT',c:'#5C8253'},moto:{c:'#B23A34',l:'Moto'},autre:{l:'Autre',c:'#8FA0A8'}};
const ACT={
  moto:{l:'Motocross',cat:'moto',ic:'flag',extra:[{k:'runs',l:'Manches / sessions',ph:'4'}]},
  vtt:{l:'VTT',cat:'vtt',ic:'bike',extra:[{k:'dist',l:'Distance (km)',ph:'25'},{k:'elev',l:'Dénivelé + (m)',ph:'600'}],assist:true},
  muscu:{l:'Muscu',cat:'muscu',ic:'dumbbell',extra:[]},
  running:{l:'Running',cat:'run',ic:'timer',extra:[{k:'dist',l:'Distance (km)',ph:'8'}]},
  rando:{l:'Rando',cat:'autre',ic:'mountain',extra:[{k:'dist',l:'Distance (km)',ph:'12'},{k:'elev',l:'Dénivelé + (m)',ph:'800'}]},
  piscine:{l:'Piscine',cat:'autre',ic:'waves',extra:[{k:'dist',l:'Distance (m)',ph:'1500'}]},
  autre:{l:'Autre',cat:'autre',ic:'plus',extra:[]}
};
const ASSIST=['Sans assistance','Eco','Tour','eMTB / Sport','Boost'];
const SUP_DEFAULT=['Créatine (5 g)','Whey','Oméga-3','Vitamine D3','Magnésium','Électrolytes','Collagène'];

/* ---- exercices ---- */
const EX={};
function def(id,o){EX[id]=Object.assign({id:id,kind:'lift',cat:'isolation',unit:'kg',s:[],rest:90,inc:2.5,bw:0},o);}
// Lundi
def('lun-bench',{name:'Développé couché barre',sets:4,reps:[8,10],cat:'compound',base:60,inc:2.5,m:'Pecs',s:['Triceps','Épaules'],rest:150});
def('lun-incline',{name:'Développé incliné haltères',sets:4,reps:[10,12],cat:'compound',unit:'kg/haltère',base:22,inc:2,m:'Pecs',s:['Épaules','Triceps'],rest:120});
def('lun-flye',{name:'Écarté poulie vis-à-vis',sets:4,reps:[12,15],base:12,inc:1,m:'Pecs',rest:75});
def('lun-dips',{name:'Dips lestés',sets:4,reps:[8,12],cat:'compound',unit:'kg lesté',base:10,inc:2.5,m:'Pecs',s:['Triceps','Épaules'],bw:0.8,rest:120});
def('lun-triceps',{name:'Extension triceps poulie haute',sets:4,reps:[12,15],base:25,inc:2.5,m:'Triceps',rest:75});
def('lun-skull',{name:'Barre au front',sets:3,reps:[10,12],base:30,inc:2.5,m:'Triceps',rest:90});
def('lun-sledpush',{name:'Sled push',txt:'4×20 m',kind:'carry',cat:'hyrox-load',base:40,inc:2.5,rest:90});
def('lun-sledpull',{name:'Sled pull',txt:'4×20 m',kind:'carry',cat:'hyrox-load',base:30,inc:2.5,rest:90});
def('lun-wb',{name:'Wall balls (9 kg)',txt:'3×20',kind:'check'});
// Mardi
def('mar-pullup',{name:'Tractions / tirage vertical',sets:4,reps:[8,10],cat:'compound',unit:'kg lesté (0 = poids de corps)',base:0,inc:2.5,m:'Dos',s:['Biceps'],bw:1,rest:120});
def('mar-rowbar',{name:'Rowing barre',sets:4,reps:[8,10],cat:'compound',base:50,inc:2.5,m:'Dos',s:['Biceps'],rest:120});
def('mar-rowcable',{name:'Tirage horizontal poulie',sets:4,reps:[10,12],base:45,inc:2.5,m:'Dos',s:['Biceps'],rest:90});
def('mar-rowdb',{name:'Rowing unilatéral haltère',sets:4,reps:[10,12],unit:'kg/haltère',base:24,inc:2,m:'Dos',s:['Biceps'],rest:90});
def('mar-curlbar',{name:'Curl barre',sets:4,reps:[8,10],base:30,inc:2.5,m:'Biceps',rest:75});
def('mar-curlham',{name:'Curl marteau',sets:3,reps:[10,12],unit:'kg/haltère',base:14,inc:2,m:'Biceps',rest:60});
def('mar-erg',{name:'Rowing erg',txt:'4×500 m',kind:'pace',unit:'/500m',base:110});
def('mar-farmer',{name:'Farmer carry',txt:'4×40 m',kind:'carry',cat:'hyrox-load',unit:'kg/main',base:24,inc:2,rest:75});
// Mercredi (simulation)
def('mer-skierg',{name:'SkiErg 1000 m',kind:'station',tb:255});
def('mer-sledpush',{name:'Sled push 25 m',kind:'station',base:45,inc:5,tb:35});
def('mer-sledpull',{name:'Sled pull 25 m',kind:'station',base:35,inc:5,tb:40});
def('mer-burpee',{name:'Burpees broad jump ×20',kind:'station',tb:100});
def('mer-row',{name:'Rowing 1000 m',kind:'station',tb:240});
def('mer-farmer',{name:'Farmer carry 200 m',kind:'station',unit:'kg/main',base:28,inc:2,tb:100});
def('mer-lunges',{name:'Sandbag lunges 50 m',kind:'station',unit:'kg sac',base:20,inc:2.5,tb:80});
def('mer-wb',{name:'Wall balls ×75',kind:'station',base:9,inc:0,tb:200});
// Jeudi
def('jeu-military',{name:'Développé militaire barre',sets:4,reps:[6,8],cat:'compound',base:40,inc:2.5,m:'Épaules',s:['Triceps'],rest:120});
def('jeu-lateral',{name:'Élévations latérales',sets:4,reps:[12,15],unit:'kg/haltère',base:8,inc:1,m:'Épaules',rest:60});
def('jeu-front',{name:'Élévations frontales',sets:3,reps:[10,12],unit:'kg/haltère',base:8,inc:1,m:'Épaules',rest:60});
def('jeu-upright',{name:'Rowing menton',sets:4,reps:[10,12],base:20,inc:2.5,m:'Épaules',s:['Dos'],rest:75});
def('jeu-superset',{name:'Superset curl / extension',sets:4,reps:[10,12],base:12,inc:1,m:['Biceps','Triceps'],rest:75});
def('jeu-plank',{name:'Planche',sets:3,kind:'time',unit:'s',base:45,m:'Core',rest:45});
def('jeu-side',{name:'Gainage latéral (par côté)',sets:3,kind:'time',unit:'s',base:30,m:'Core',rest:45});
def('jeu-hollow',{name:'Hollow hold',sets:3,kind:'time',unit:'s',base:30,m:'Core',rest:45});
// Vendredi
def('ven-squat',{name:'Squat',sets:4,reps:[6,8],cat:'compound',base:70,inc:2.5,m:'Jambes',s:['Core'],rest:150});
def('ven-lunges',{name:'Fentes marchées',sets:4,reps:[10,12],unit:'kg/haltère',base:16,inc:2,m:'Jambes',rest:90});
def('ven-rdl',{name:'SDT roumain / leg press',sets:4,reps:[8,10],cat:'compound',base:60,inc:2.5,m:'Jambes',rest:120});
def('ven-calves',{name:'Mollets',sets:4,reps:[12,15],base:40,inc:2.5,m:'Jambes',rest:60});
def('ven-wb',{name:'Wall balls',txt:'3×15',kind:'check'});
def('ven-burpee',{name:'Burpees',txt:'3×10',kind:'check'});

function incFor(cat,unit){if(cat==='compound')return /haltère/.test(unit)?2:2.5;if(cat==='hyrox-load')return 2.5;return /haltère/.test(unit)?1:2.5;}

/* alternatives : [nom, base, unité, cat?, extra?]  (équipement type Fitness Park) */
const ALT={
'lun-bench':[['Développé couché haltères',24,'kg/haltère'],['Développé couché smith machine',55,'kg'],['Développé couché Hammer Iso-Lateral (machine)',50,'kg/côté'],['Développé couché prise serrée',50,'kg'],['Presse à pec convergente',50,'kg']],
'lun-incline':[['Développé incliné barre',50,'kg'],['Développé incliné machine convergente',40,'kg'],['Développé incliné machine guidée (Hammer)',40,'kg'],['Développé incliné smith machine',45,'kg']],
'lun-flye':[['Écarté haltères banc plat',10,'kg/haltère'],['Pec deck / butterfly (machine)',30,'kg'],['Écarté incliné haltères',8,'kg/haltère']],
'lun-dips':[['Développé couché prise serrée',50,'kg','compound',{bw:0}],['Extension triceps au sol (JM press)',30,'kg','isolation',{bw:0}],['Dips assistés (machine)',20,'kg d\'assistance','compound',{bw:0}]],
'lun-triceps':[['Extension triceps à la corde',22,'kg'],['Kickback haltère',8,'kg/haltère'],['Extension triceps poulie unilatérale',12,'kg'],['Extension triceps katana (poulie, au-dessus de la tête)',20,'kg']],
'lun-skull':[['Extension triceps haltère nuque',16,'kg'],['Extension triceps poulie basse',20,'kg'],['Pompes prise serrée lestées',0,'kg gilet',null,{bw:0.6}]],
'lun-sledpush':[['Prowler push',40,'kg'],['Presse à cuisses poussée dynamique',90,'kg'],['Marche lestée tapis en pente',15,'kg gilet/sac']],
'lun-sledpull':[['Rope sled pull (corde)',30,'kg'],['Tirage poulie basse buste penché',55,'kg'],['Rowing machine convergente lourd',55,'kg']],
'mar-pullup':[['Tirage poulie haute prise large',45,'kg','compound',{bw:0}],['Lat pulldown machine',50,'kg','compound',{bw:0}],['Tractions assistées (machine)',20,'kg d\'assistance','compound',{bw:0}]],
'mar-rowbar':[['Rowing T-bar (machine)',40,'kg'],['Rowing Yates (supination)',45,'kg'],['Rowing Pendlay',45,'kg']],
'mar-rowcable':[['Rowing machine convergente',55,'kg'],['Rowing câble prise neutre',40,'kg']],
'mar-rowdb':[['Rowing unilatéral poulie basse',20,'kg'],['Rowing Kroc',26,'kg/haltère'],['Rowing sur banc incliné',20,'kg/haltère']],
'mar-curlbar':[['Curl EZ bar',25,'kg'],['Curl poulie basse',25,'kg'],['Curl pupitre (Larry Scott)',20,'kg']],
'mar-curlham':[['Curl marteau à la corde (poulie)',20,'kg'],['Curl marteau alterné',14,'kg/haltère'],['Curl Zottman',12,'kg/haltère']],
'mar-erg':[['SkiErg 4×500 m',130,'/500m'],['Bike erg 4×500 m',100,'/500m']],
'mar-farmer':[['Suitcase carry (unilatéral)',20,'kg/main'],['Trap bar carry',60,'kg total'],['Rack carry (poulies)',18,'kg/main']],
'mer-skierg':[['Rowing erg 1000 m',240,'s'],['Assault bike (équiv. 1000 m)',260,'s']],
'mer-sledpush':[['Prowler push',45,'kg'],['Presse à cuisses poussée dynamique',100,'kg'],['Marche lestée tapis en pente',18,'kg gilet/sac']],
'mer-sledpull':[['Rope sled pull (corde)',35,'kg'],['Tirage poulie basse buste penché',60,'kg']],
'mer-row':[['SkiErg 1000 m',255,'s'],['Bike erg (équiv. 1000 m)',240,'s']],
'mer-farmer':[['Suitcase carry (unilatéral)',22,'kg/main'],['Trap bar carry',65,'kg total'],['Rack carry (poulies)',20,'kg/main']],
'mer-lunges':[['Fentes marchées haltères',14,'kg/haltère'],['Fentes bulgares',12,'kg/haltère'],['Step-ups lestés (banc)',14,'kg/haltère']],
'jeu-military':[['Développé militaire haltères',16,'kg/haltère'],['Développé Arnold',14,'kg/haltère'],['Press machine épaules',35,'kg']],
'jeu-lateral':[['Élévations latérales poulie',7,'kg'],['Élévations latérales machine',15,'kg'],['Y-raise',6,'kg/haltère']],
'jeu-front':[['Élévation frontale barre',15,'kg'],['Élévation frontale poulie',7,'kg'],['Élévation frontale disque',10,'kg']],
'jeu-upright':[['Face pull (poulie)',20,'kg'],['Élévation latérale poulie basse',7,'kg'],['Rowing menton câble large',25,'kg']],
'jeu-superset':[['Curl concentré / extension poulie',10,'kg'],['Curl pupitre / extension corde',12,'kg']],
'ven-squat':[['Squat gobelet (kettlebell/haltère)',24,'kg'],['Presse à cuisses',120,'kg'],['Squat bulgare',16,'kg/haltère'],['Hack squat (machine)',60,'kg']],
'ven-lunges':[['Fentes bulgares',14,'kg/haltère'],['Step-ups lestés (banc)',14,'kg/haltère'],['Sandbag lunges',18,'kg sac']],
'ven-rdl':[['Hip thrust (barre)',60,'kg'],['Leg curl allongé (machine)',35,'kg'],['Good morning',30,'kg'],['Soulevé de terre roumain',60,'kg'],['Leg press',120,'kg']],
'ven-calves':[['Mollets assis (machine)',30,'kg'],['Mollets à la presse à cuisses',80,'kg'],['Mollets unilatéral haltère',16,'kg/haltère']]
};

/* ---- cycles de course : 6 semaines, semaine 6 = décharge ---- */
const RUNC={
lun:[
 {name:'Fractionné 8×400 m',seg:400,reps:8,base:95,est:40,det:'10 min d\'échauffement + 8×400 m allure rapide (proche 5 km), récup 90 s–2 min trot léger + 5–10 min retour au calme'},
 {name:'Fractionné 6×600 m',seg:600,reps:6,base:145,est:40,det:'6×600 m allure 5–10 km, récup 2 min trot léger — capacité aérobie'},
 {name:'Fractionné 10×300 m',seg:300,reps:10,base:70,est:40,det:'10×300 m rapide (≈ allure 3 km), récup 60–90 s — vitesse et économie de course'},
 {name:'Seuil 5×800 m',seg:800,reps:5,base:200,est:40,det:'5×800 m allure seuil (10–15 km), récup 90 s — vitesse soutenable sur la durée d\'un Hyrox'},
 {name:'Côte 8×200 m',seg:200,reps:8,base:55,est:35,det:'8×200 m en côte modérée, retour en footing — puissance des jambes pour le sled et les fentes'},
 {name:'Décharge : 6×200 m souples',seg:200,reps:6,base:50,est:30,det:'Semaine de décharge : 6×200 m relâchés (allure 3 km mais sans forcer), récup complète'}],
jeu:[
 {name:'Course continue zone 2',seg:1000,base:330,est:45,det:'40–50 min allure modérée zone 2 (tu dois pouvoir parler) — travail de fond'},
 {name:'Sortie longue progressive',seg:1000,base:330,est:55,det:'50–60 min, les 15 dernières minutes progressivement plus rapides — simule la fatigue de fin de course'},
 {name:'Fartlek libre',seg:1000,base:320,est:40,det:'40 min avec accélérations spontanées de 1–3 min au feeling'},
 {name:'Tempo allure seuil',seg:1000,base:290,est:45,det:'20–30 min continues à allure seuil (10 km), échauffement et retour au calme inclus'},
 {name:'8×1 km allure Hyrox',seg:1000,reps:8,base:300,est:55,det:'8×1 km à l\'allure Hyrox visée, récup 90 s trot — simulation directe des segments de course du Hyrox'},
 {name:'Décharge : footing récupération',seg:1000,base:360,est:35,det:'Semaine de décharge : 35–40 min très facile, récupération active'}]
};

/* ---- semaine type ---- */
const PROG={
lun:{label:'Lundi',short:'LUN',bib:'01',diff:'bleue',load:68,run:'lun',soir:{title:'Pec / Triceps — Hypertrophie + finisher Hyrox',short:'Pec/Triceps',dur:'1h30',min:90,
  blocks:[{n:'Musculation · 60–75 min',ex:['lun-bench','lun-incline','lun-flye','lun-dips','lun-triceps','lun-skull']},{n:'Finisher Hyrox · 20–25 min',ex:['lun-sledpush','lun-sledpull','lun-wb']}],
  note:'Objectif volume : contrôle de la charge et temps sous tension plutôt que charge max. VTT/moto du week-end couvrent déjà le cardio, cette séance reste centrée hypertrophie.'}},
mar:{label:'Mardi',short:'MAR',bib:'02',diff:'bleue',load:62,soir:{title:'Dos / Biceps — Hypertrophie + finisher Hyrox',short:'Dos/Biceps',dur:'1h30',min:90,
  blocks:[{n:'Musculation · 60–75 min',ex:['mar-pullup','mar-rowbar','mar-rowcable','mar-rowdb','mar-curlbar','mar-curlham']},{n:'Finisher Hyrox · 20–25 min',ex:['mar-erg','mar-farmer']}],
  note:'Le tirage renforce aussi le grip et le dos utiles au VTT et à la moto (traction guidon, encaissement).'}},
mer:{label:'Mercredi',short:'MER',bib:'03',diff:'noire',load:90,soir:{title:'Séance Hyrox spécifique — mini-simulation',short:'Simulation Hyrox',dur:'1h–1h15',min:70,sim:true,
  blocks:[{n:'Circuit — 2 min de tapis (~14–15 km/h) entre chaque station',ex:['mer-skierg','mer-sledpush','mer-sledpull','mer-burpee','mer-row','mer-farmer','mer-lunges','mer-wb']}],
  note:'Si tapis pris : 2 min de corde à sauter ou 300 m vélo/rameur. Débutant : une seule boucle allégée, monte en volume à l\'approche de la course. C\'est ta séance cardio/engine la plus spécifique de la semaine — note les temps par station pour suivre ta progression.'}},
jeu:{label:'Jeudi',short:'JEU',bib:'04',diff:'bleue',load:62,run:'jeu',soir:{title:'Épaule / Bras — Hypertrophie + gainage',short:'Épaule/Bras',dur:'1h–1h15',min:70,
  blocks:[{n:'Musculation · 50–60 min',ex:['jeu-military','jeu-lateral','jeu-front','jeu-upright','jeu-superset']},{n:'Gainage / core · 15–20 min',ex:['jeu-plank','jeu-side','jeu-hollow']}],
  note:'Épaules stabilisées + gainage protègent le dos en position moto/VTT (buste penché, chocs répétés).'}},
ven:{label:'Vendredi',short:'VEN',bib:'05',diff:'verte',load:32,optional:true,soir:{title:'Jambes — Hypertrophie + finisher léger (optionnel)',short:'Jambes',dur:'1h–1h15',min:65,
  blocks:[{n:'Musculation · 45–50 min',ex:['ven-squat','ven-lunges','ven-rdl','ven-calves']},{n:'Finisher léger · 15–20 min',ex:['ven-wb','ven-burpee']}],
  note:'Une semaine sur deux, ou si tu te sens frais. Sinon repos ou mobilité/gainage léger. Première séance à sauter si la charge globale (moto + VTT + semaine) est trop lourde — les jambes travaillent déjà via la course et les stations Hyrox.'}},
sam:{label:'Samedi',short:'SAM',bib:'06',diff:'moto',load:58,suggest:'moto',title:'Motocross',note:'Séance à part entière — gainage, cardio, réflexes. Renseigne la séance ci-dessous : la charge s\'ajoute à ta semaine.'},
dim:{label:'Dimanche',short:'DIM',bib:'07',diff:'fermee',load:5,rest:true,title:'Repos complet',note:'Mobilité 10–15 min, marche légère, sommeil. C\'est là que le volume de la semaine se transforme en muscle.'}
};
