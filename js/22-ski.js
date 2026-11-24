/* ===================== HYBRIDE SKI FREERIDE : explosivité, contrôle d'atterrissage, gainage anti-rotation ===================== */
(function(){
 /* ---------- exercices ---------- */
 def('ski-box',{name:'Box jump',sets:4,reps:[3,5],unit:'cm',base:50,inc:5,cat:'compound',m:'Jambes',s:['Core'],rest:120});
 def('ski-skater',{name:'Bonds latéraux (skater)',sets:3,reps:[6,8],unit:'kg lesté',base:0,inc:2,m:'Jambes',s:['Core'],rest:90});
 def('ski-drop',{name:'Réception de box (atterrissage)',sets:3,reps:[5,5],unit:'cm',base:40,inc:5,m:'Jambes',s:['Core'],rest:90});
 def('ski-step',{name:'Step-down lent (contrôle excentrique)',sets:3,reps:[8,10],unit:'kg/haltère',base:8,inc:2,m:'Jambes',s:['Jambes'],rest:75});
 def('ski-split',{name:'Fente bulgare lestée',sets:3,reps:[8,10],unit:'kg/haltère',base:16,inc:2,cat:'compound',m:'Jambes',s:['Jambes'],rest:90});
 def('ski-wall',{name:'Chaise isométrique (wall sit)',sets:3,kind:'time',unit:'s',base:45,inc:5,m:'Jambes',rest:60});
 def('ski-pallof',{name:'Pallof press (anti-rotation)',sets:3,reps:[10,12],unit:'kg',base:15,inc:2.5,m:'Core',s:['Épaules'],rest:60});
 def('ski-copen',{name:'Copenhagen (adducteurs)',sets:3,kind:'time',unit:'s',base:20,inc:5,m:'Core',s:['Jambes'],rest:45});
 def('ski-carry',{name:'Farmer walk',sets:3,kind:'time',unit:'s',base:40,inc:5,m:'Core',s:['Dos'],rest:75});

 ALT['ski-box']=[['Saut horizontal (broad jump)',0,'cm'],['Saut vertical (contre-mouvement)',0,'cm'],['Montée de box explosive (unilatéral)',0,'cm']];
 ALT['ski-skater']=[['Bonds latéraux par-dessus une ligne',0,'kg lesté'],['Saut latéral sur une jambe (stick landing)',0,'kg lesté']];
 ALT['ski-drop']=[['Réception sur une jambe',0,'cm'],['Saut en contrebas puis rebond (depth jump)',0,'cm']];
 ALT['ski-step']=[['Step-down sur marche de box',8,'kg/haltère'],['Squat bulgare excentrique 4 s',16,'kg/haltère']];
 ALT['ski-wall']=[['Chaise isométrique une jambe',0,'s'],['Squat isométrique à 90° à la barre',0,'s']];
 ALT['ski-pallof']=[['Pallof press à genoux',12,'kg'],['Rotation anti-rotation debout (half-kneeling)',12,'kg'],['Planche dynamique avec tirage (renegade row)',10,'kg']];
 ALT['ski-copen']=[['Gainage latéral classique',0,'s'],['Adducteurs machine',40,'kg']];
 ALT['ski-carry']=[['Farmer walk avec haltères',30,'s'],['Suitcase carry (un seul côté)',30,'s'],['Marche lestée en pente (tapis)',0,'s']];

 Object.assign(PAT_DEFAULT,{'ski-box':'squat','ski-drop':'squat','ski-wall':'squat','ski-skater':'lunge','ski-step':'lunge','ski-split':'lunge','ski-pallof':'facepull','ski-copen':'plank','ski-carry':'carry'});

 TIPS.unshift(
  [/box jump/i,['Règle de base : on saute pour la qualité, pas pour la fatigue. 4 séries de 3 à 5 sauts, 2 min de repos, et tu arrêtes dès que la réception devient bruyante ou molle.',
   'Descends de la box en marchant, ne redescends jamais en sautant : c\'est la réception depuis la hauteur qui casse les genoux, pas la montée.',
   'Réception en position de ski : genoux dans l\'axe, hanches en arrière, poitrine haute, pieds silencieux. Tu dois pouvoir tenir l\'atterrissage 1 s sans bouger.',
   'Note la hauteur de la box en cm dans l\'appli : c\'est ta progression. Monte de 5 cm quand 5 sauts sortent nets.']],
  [/bonds latéraux|skater/i,['Le ski freeride, c\'est du latéral : ce bond reproduit le transfert d\'un appui à l\'autre.',
   'Pousse fort sur la jambe extérieure, atterris sur l\'autre jambe seule, stabilise 1 s avant de repartir. Genou dans l\'axe du pied.',
   '6 à 8 bonds par côté, 3 séries. Si tu tangues à la réception, réduis la distance avant d\'en rajouter.']],
  [/réception de box|atterrissage|drop landing/i,['Tu descends de la box (tu ne sautes pas vers le haut) et tu absorbes la réception : c\'est exactement ce que tu encaisses en réception de saut à ski.',
   'Atterris sur l\'avant du pied puis déroule, genoux fléchis à 60–90°, hanches en arrière. Objectif : aucun bruit.',
   'Commence à 40 cm. Monte seulement quand tu atterris en silence et que le genou ne rentre pas vers l\'intérieur.',
   'Pas plus de 15 réceptions par séance : c\'est du travail nerveux, pas du cardio.']],
  [/step-down/i,['Debout sur une box de 30–40 cm, tu descends lentement (3 s) sur une jambe en effleurant le sol du talon, puis tu remontes.',
   'C\'est le meilleur exercice pour le contrôle du genou en ski : tout le travail est dans la descente.',
   'Haltère léger dans chaque main, et surtout genou aligné avec le 2e orteil.']],
  [/chaise isométrique|wall sit/i,['Dos plaqué au mur, cuisses à l\'horizontale, 45 à 60 s. C\'est la brûlure que tu ressens en bas d\'une longue descente.',
   'Progresse en temps ou avec un disque sur les cuisses. 3 séries suffisent.',
   'En fin de préparation, passe à une jambe pendant 20–30 s.']],
  [/pallof/i,['Poulie à hauteur de poitrine, de profil : tu pousses les mains devant toi et tu résistes à la rotation. Rien ne doit bouger sauf les bras.',
   'C\'est le gainage utile en ski : il t\'apprend à garder le buste face à la pente quand les jambes travaillent en dessous.',
   '10 à 12 répétitions par côté, souffle bloqué court sur la poussée.']],
  [/copenhagen|adducteurs/i,['Appui sur le coude, pied du dessus posé sur un banc, tu soulèves le bassin. Ça renforce les adducteurs, qui lâchent souvent les premiers en ski.',
   'Commence en version courte (genou posé sur le banc) à 20 s par côté, puis allonge la jambe.']],
  [/farmer walk/i,['Un haltère lourd dans chaque main, épaules basses, buste droit, 40 s de marche. Ça construit le gainage et la poigne.',
   'Version une seule main (suitcase carry) : encore plus efficace contre la rotation du tronc.']]);

 /* ---------- intégration dans les séances ---------- */
 const S=(k,fn)=>{const s=PROG2[k].soir;fn(s);s.dur=Math.floor(s.min/60)+'h'+String(s.min%60).padStart(2,'0');};
 /* mardi : explosivité en début de séance, quand le système nerveux est frais */
 S('mar',s=>{s.title='Jambes A — quadriceps';s.short='Jambes A';s.min=72;
  /* les ischios sont déjà servis le dimanche : on libère de la place pour les sauts */
  [s.A,s.B].forEach(V=>V.forEach(b=>{b.ex=b.ex.filter(x=>x!=='leg-curl');}));

  s.note='Jour des quadriceps, muscu pure : profondeur complète au squat, 2 séries de montée en charge avant la première série lourde, repos 3 min. Les sauts et l\'explosivité sont regroupés dans la séance Hyrox du vendredi, pour garder cette séance-là 100 % hypertrophie.';});
 /* dimanche : contrôle de l'atterrissage et gainage anti-rotation */
 S('dim',s=>{s.title='Jambes B — ischios / fessiers';s.short='Jambes B';s.min=80;
  s.A.push({n:'Contrôle unilatéral · 10 min',ex:['ski-step']});
  s.B.push({n:'Contrôle unilatéral · 10 min',ex:['ski-step']});
  s.A.push({n:'Gainage ski · 10 min',ex:['ski-pallof','ski-copen']});
  s.B.push({n:'Gainage ski · 10 min',ex:['ski-pallof','ski-carry']});
  s.note='Deuxième séance de jambes : arrière des cuisses et fessiers, puis des step-downs lents (aucun impact, que du contrôle excentrique) et le gainage anti-rotation. Pas de sauts ici : tout l\'explosif est le vendredi. Si tu as skié ou roulé toute la journée, enlève le contrôle unilatéral et garde le reste.';});

 /* ---------- séance dédiée, en bonus le week-end ---------- */
 const mk=(t,s2,min,diff,note,b)=>({soir:{title:t,short:s2,dur:min+' min',min:min,A:b.map(x=>({n:x[0],ex:x[1]})),note:note},short:s2,diff:diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 const T={'gx-wk-ski':mk('Prépa ski freeride','Prépa ski',50,'bleue',
  'Séance courte et spécifique, à faire le vendredi matin ou un jour sans neige. Tout est en qualité : si la technique se dégrade, tu arrêtes la série. À supprimer dès que tu skies 2 jours par week-end — la montagne fait déjà le travail.',
  [['Échauffement · 8 min',['gx-wu']],
   ['Explosivité · 14 min',['ski-box','ski-skater']],
   ['Contrôle unilatéral · 14 min',['ski-step','ski-split']],
   ['Endurance de cuisses · 8 min',['ski-wall']],
   ['Gainage et poigne · 10 min',['ski-pallof','ski-copen','ski-carry']],
   ['Retour au calme',['gx-cd']]])};
 window.hxTplExt=window.hxTplExt||{};Object.keys(T).forEach(k=>{window.hxTplExt[k]=()=>T[k];});
 window.hxSwExt=window.hxSwExt||[];
 const sec=window.hxSwExt.filter(x=>/Week-end/.test(x.sec))[0];
 const item={k:'gx-wk-ski',t:'Prépa ski freeride',sub:'50 min · sauts, contrôle, gainage'};
 if(sec){if(!sec.items.some(i=>i.k==='gx-wk-ski'))sec.items.unshift(item);}
 else window.hxSwExt.unshift({sec:'Week-end / bonus',items:[item]});
})();
