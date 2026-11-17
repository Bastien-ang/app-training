/* ===================== POULIES : hauteur de poulie (haute / milieu / basse) pour chaque exo à câble ===================== */
(function(){
 /* écarté poulie vis-à-vis : 3 positions (la poulie est réglée en hauteur sur chaque colonne) */
 const tw=py=>'<path class="dc" d="M8 4V88M92 4V88"/><circle class="dc" cx="8" cy="'+py+'" r="3"/><circle class="dc" cx="92" cy="'+py+'" r="3"/>';
 Object.assign(PATS,{
  cflyhi:{dur:2.8,fv:true,eq:'cross',az:44,hug:100,ph:'hi',phl:'Poulies hautes',py:10,deco2:tw(10),poses:[{u:128,f:138,h:0},{u:34,f:22,h:1}]},
  cflymid:{dur:2.8,fv:true,eq:'cross',az:44,hug:98,ph:'mid',phl:'Poulies à hauteur d\'épaule',py:36,deco2:tw(36),poses:[{u:92,f:96,h:0},{u:90,f:92,h:1}]},
  cflylo:{dur:2.8,fv:true,eq:'cross',az:44,hug:100,ph:'lo',phl:'Poulies basses',py:80,deco2:tw(80),poses:[{u:36,f:30,h:0},{u:104,f:112,h:1}]},
  latcab:{dur:2.6,fv:true,az:44,eq:'cross',ph:'lo',phl:'Poulies basses',py:80,deco2:tw(80),poses:[{u:6,f:6},{u:84,f:78}]},
  curlcab:{dur:2.4,root:{k:'F',x:42},eq:'cable',at:'W',anchor:[90,84],ph:'lo',phl:'Poulie basse',poses:[{ua:178,fa:178},{ua:172,fa:25}]}
 });
 /* hauteur de poulie des patterns à câble existants */
 Object.assign(PATS.pushdown,{ph:'hi',phl:'Poulie haute'});
 Object.assign(PATS.facepull,{ph:'mid',phl:'Poulie à hauteur du visage'});
 Object.assign(PATS.rowseated,{ph:'lo',phl:'Poulie basse',anchor:[92,76]});
 Object.assign(MU,{cflyhi:'chest',cflymid:'chest',cflylo:'chest',latcab:'delt',curlcab:'bi'});
 Object.assign(PHC,{cflyhi:['Bras ouverts, mains hautes','Descends en arc, mains jointes devant le sternum'],cflymid:['Bras en croix à hauteur d\'épaule','Rapproche les mains devant la poitrine'],cflylo:['Mains basses, bras le long du corps','Monte en arc jusqu\'au menton'],latcab:['Mains devant les cuisses','Monte jusqu\'à l\'horizontale'],curlcab:['Bras tendus vers la poulie basse','Fléchis les coudes, coudes fixes']});
 /* noms de variantes -> pattern */
 PAT_RULES.unshift(
  [/écarté poulie.*(haute|vers le bas)/i,'cflyhi'],[/écarté poulie.*(milieu|horizontal)/i,'cflymid'],[/écarté poulie.*(basse|vers le haut)/i,'cflylo'],
  [/^écarté poulie( vis-à-vis)?$/i,'cflyhi'],[/élévations? latérales? poulie/i,'latcab'],[/^curl poulie basse$/i,'curlcab']);
 Object.assign(PAT_DEFAULT,{'push-fly':'cflyhi','fri-lateral':'latcab','sh-latcable':'latcab','fri-curl':'curlcab','back-curlcable':'curlcab'});
 /* variantes proposées dans la liste déroulante */
 const V3=[['Écarté poulie vis-à-vis — poulies hautes (vers le bas)',10,'kg'],['Écarté poulie vis-à-vis — poulies milieu (horizontal)',10,'kg'],['Écarté poulie vis-à-vis — poulies basses (vers le haut)',8,'kg']];
 ['push-fly','pec-deck','fri-chest'].forEach(id=>{const a=ALT[id];if(!a)return;V3.forEach(v=>{if(!a.some(x=>x[0]===v[0]))a.push(v.slice());});});
 /* fiches de réglage */
 TIPS.unshift(
  [/écarté poulie.*(basse|vers le haut)/i,['Réglage : poulies tout en bas de la colonne (les deux à la même hauteur), poignées simples. Si ta machine a des crans, note le cran utilisé.','Départ : bras le long du corps, légèrement écartés, mains basses de chaque côté des hanches.','Monte les mains en arc jusqu\'au niveau du menton, coudes à peine fléchis : travaille le haut des pecs et l\'avant d\'épaule.','Épaules basses, pas d\'élan : charge légère à modérée, 12–15 reps.']],
  [/écarté poulie.*(milieu|horizontal)/i,['Réglage : poulies à hauteur d\'épaule (environ le milieu de la colonne), poignées simples, un pied devant l\'autre.','Bras ouverts en croix, coudes fléchis d\'environ 150°, buste droit.','Rapproche les mains devant le milieu de la poitrine en gardant les omoplates serrées : c\'est la version la plus « isolante » du milieu des pecs.','Ne laisse pas la charge te tirer les épaules vers l\'arrière en fin de retour.']],
  [/écarté poulie.*(haute|vers le bas)|^écarté poulie( vis-à-vis)?$/i,['Réglage : poulies tout en haut de la colonne (au-dessus de la tête), les deux à la même hauteur, poignées simples. C\'est la position « crossover » classique.','Un pied devant l\'autre, buste penché d\'environ 20°, bras ouverts un peu plus bas que l\'horizontale.','Amène les mains en arc vers le bas jusqu\'à les croiser devant le sternum ou le nombril : travaille le bas des pecs.','Pause 1 s mains jointes, retour lent sans laisser les épaules partir en arrière. Charge légère : 12–15 reps.']],
  [/curl poulie basse/i,['Réglage : poulie tout en bas de la colonne, barre droite ou EZ ou corde. Place-toi face à la machine, à 30–40 cm.','Coudes collés au corps et fixes, les poignets alignés avec l\'avant-bras.','Monte jusqu\'à la contraction maximale, redescends en 2–3 s sans lâcher la tension : la poulie garde le muscle chargé en bas du mouvement.']],
  [/élévations? latérales? poulie/i,['Réglage : poulies tout en bas de la colonne, poignées simples. Le câble passe devant le corps : utilise la poignée opposée, ou travaille un bras à la fois.','Bras presque tendus, légère inclinaison du buste, monte les coudes jusqu\'à l\'horizontale, pas plus haut.','Descends lentement : la poulie garde la tension en bas du mouvement, ce que les haltères ne font pas.']]
 );
})();
