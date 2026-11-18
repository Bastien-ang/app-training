/* ===================== REPAS : options par repas (souple), paliers caloriques, liste de courses ===================== */
(function(){
 const SLOTS=[{"id": "pdj", "n": "Petit-déjeuner", "h": "7 h 15 – 7 h 45", "d": ["salle", "libre"], "o": [{"t": "Œufs brouillés & fromage blanc", "l": ["4 œufs brouillés (ketchup zéro si tu veux)", "1 grand bol de fromage blanc 0 % (250 g)", "2 poignées de riz soufflé (30 g)", "1 c. à s. de miel"], "k": 582, "p": 47, "note": "Ton petit-déj actuel. Le plus rapide des trois."}, {"t": "Avoine & fromage blanc", "l": ["1 bol de flocons d'avoine (70 g)", "1 grand bol de fromage blanc (250 g)", "1 banane", "1 c. à s. de miel"], "k": 544, "p": 30, "note": "Se prépare la veille, se mange froid."}, {"t": "Omelette & pain", "l": ["Omelette de 3 œufs", "2 tranches de pain de mie ou de pain aux céréales", "1 banane", "1 part de comté (30 g)"], "k": 633, "p": 35, "note": "Quand tu veux du salé sans laitage."}]}, {"id": "col", "n": "Collation du matin", "h": "10 h – 10 h 30", "d": ["salle", "libre"], "o": [{"t": "Skyr, banane, cajou", "l": ["2 pots de skyr", "1 banane", "1 poignée de noix de cajou (30 g)"], "k": 468, "p": 40, "note": "Zéro préparation : tu achètes, tu emportes."}, {"t": "Yaourt grec & raisin", "l": ["2 yaourts grecs", "1 grappe de raisin (150 g)", "1 poignée de cajou (25 g)"], "k": 538, "p": 21, "note": ""}, {"t": "Wrap jambon-comté", "l": ["1 wrap", "3 tranches de jambon (80 g)", "1 part de comté (30 g)", "1 banane"], "k": 526, "p": 31, "note": "Roulé en 1 min le matin, la version salée."}]}, {"id": "dej", "n": "Déjeuner", "h": "12 h 30 – 13 h", "d": ["salle", "libre"], "o": [{"t": "Riz & poulet", "l": ["1 bol de riz cru (120 g)", "1 paume et demie de poulet (180 g)", "Légumes à volonté (250 g)", "1 c. à s. d'huile d'olive"], "k": 796, "p": 56, "note": "La base. Prépare 3 portions d'un coup."}, {"t": "Pâtes & steak haché", "l": ["1 bol de pâtes crues (120 g)", "1 steak haché 5 % (180 g)", "Sauce tomate + légumes", "1 poignée de râpé (25 g)"], "k": 857, "p": 64, "note": ""}, {"t": "Semoule & dinde", "l": ["1 bol de semoule crue (110 g)", "1 escalope de dinde (180 g)", "1 poêlée de légumes surgelés", "1 c. à s. d'huile"], "k": 786, "p": 61, "note": "Semoule : 5 min d'eau bouillante, le plus rapide."}, {"t": "Patate douce & thon", "l": ["2 patates douces au four (300 g)", "1 boîte de thon (140 g)", "Crudités ou légumes", "1 c. à s. d'huile"], "k": 584, "p": 44, "note": "Quand il n'y a plus rien de décongelé."}]}, {"id": "pre", "n": "Avant la séance", "h": "17 h 30 – 18 h", "d": ["salle"], "o": [{"t": "Fromage blanc, banane, riz soufflé", "l": ["1 grand bol de fromage blanc (250 g)", "1 banane", "2 poignées de riz soufflé (30 g)", "1 c. à c. de miel"], "k": 384, "p": 23, "note": "Ton pré-training actuel : léger sur l'estomac."}, {"t": "Clear whey & sucres rapides", "l": ["1 dose de clear whey à l'eau", "1 banane", "4 dattes"], "k": 331, "p": 28, "note": "Si tu es juste en temps ou que ça pèse."}, {"t": "Tartines au miel", "l": ["3 tranches de pain de mie", "2 c. à s. de miel", "1 dose de clear whey"], "k": 479, "p": 35, "note": "Plus de carburant quand la séance est longue."}]}, {"id": "post", "n": "En sortant de la salle", "h": "20 h 30 – 21 h", "d": ["salle"], "o": [{"t": "Shaker & banane", "l": ["1 dose de clear whey", "1 banane", "2 poignées de riz soufflé (25 g)"], "k": 315, "p": 29, "note": "Dans le sac de sport. Le dîner arrive 30 min après."}, {"t": "Rien, je rentre manger", "l": ["Rien si tu dînes dans l'heure"], "k": 0, "p": 0, "note": "Si tu manges dans la foulée, le shaker ne sert à rien."}]}, {"id": "din", "n": "Dîner", "h": "21 h – 21 h 30", "d": ["salle", "libre"], "o": [{"t": "Pâtes carbonara", "l": ["1 bol de pâtes crues (120 g)", "Lardons (60 g)", "2 œufs + comté hors du feu", "Une poêlée de légumes à côté"], "k": 890, "p": 47, "note": "Vraie carbonara : œufs et comté hors du feu."}, {"t": "Riz poulet curry", "l": ["1 bol de riz cru (120 g)", "1 paume et demie de poulet (190 g)", "Crème légère + curry", "Légumes"], "k": 764, "p": 59, "note": ""}, {"t": "Wok asiatique", "l": ["Nouilles (120 g crues)", "Poulet ou dinde (180 g)", "Légumes croquants", "Sauce soja + cajou"], "k": 840, "p": 66, "note": ""}, {"t": "Gratin de pâtes", "l": ["Pâtes (120 g crues)", "Steak haché (150 g)", "Sauce tomate", "Mozzarella + râpé"], "k": 935, "p": 67, "note": "Au four pendant que tu ranges tes affaires."}, {"t": "Steak, pommes de terre", "l": ["Pommes de terre à l'air fryer (350 g)", "Bavette ou steak (180 g)", "Légumes ou salade", "1 c. à s. d'huile"], "k": 772, "p": 59, "note": ""}, {"t": "Saumon & patate douce", "l": ["1 pavé de saumon (180 g)", "Patate douce au four (300 g)", "Légumes", "1 c. à s. d'huile"], "k": 790, "p": 45, "note": "Le poisson de la semaine."}, {"t": "Tacos ou burritos maison", "l": ["2 wraps", "Viande hachée (180 g)", "Riz (60 g cru) + légumes", "Râpé + sauce"], "k": 1022, "p": 66, "note": ""}]}, {"id": "gouter", "n": "Goûter", "h": "16 h – 17 h", "d": ["libre", "sortie"], "o": [{"t": "Wrap & banane", "l": ["1 wrap jambon-fromage", "1 banane", "1 poignée de cajou"], "k": 632, "p": 32, "note": "Se mange froid, sans couverts."}, {"t": "Cajou & dattes", "l": ["1 grosse poignée de cajou (40 g)", "5 dattes", "1 banane"], "k": 477, "p": 10, "note": "Dans le sac, pour le terrain ou les remontées."}]}, {"id": "plaisir", "n": "Dîner plaisir", "h": "21 h", "d": ["libre", "sortie"], "o": [{"t": "Pizza", "l": ["1 pizza", "Une salade ou des crudités à côté"], "k": 995, "p": 46, "note": "Repas plaisir : il est prévu, il ne casse rien."}, {"t": "Kebab ou resto", "l": ["Kebab, burger ou resto", "Prends une portion de frites, pas deux"], "k": 925, "p": 48, "note": ""}, {"t": "Burger maison", "l": ["2 steaks hachés", "Pain à burger + cheddar", "Frites au four (200 g)"], "k": 1008, "p": 76, "note": ""}]}], COURSES=[["Frais", [["Œufs", "2 boîtes de 12"], ["Fromage blanc 0 %", "2 gros pots (2 kg)"], ["Skyr / yaourts grecs", "10 pots"], ["Poulet ou dinde", "1,2 kg"], ["Steak haché 5 %", "800 g"], ["Jambon blanc", "1 paquet"], ["Lardons", "1 barquette"], ["Comté", "200 g"], ["Fromage râpé", "200 g"], ["Mozzarella", "1 boule"], ["Saumon ou cabillaud", "2 pavés"], ["Crème légère", "1 brique"]]], ["Fruits & légumes", [["Bananes", "12 à 14"], ["Raisin", "1 kg"], ["Kiwis", "6"], ["Légumes (frais ou surgelés)", "3 kg"], ["Pommes de terre", "2 kg"], ["Patates douces", "1 kg"], ["Tomates / crudités", "au feeling"]]], ["Épicerie", [["Riz basmati", "1 kg"], ["Pâtes", "1 kg"], ["Semoule", "500 g"], ["Nouilles asiatiques", "500 g"], ["Flocons d'avoine", "1 kg"], ["Riz soufflé", "1 paquet"], ["Miel", "1 pot"], ["Noix de cajou", "500 g"], ["Dattes", "250 g"], ["Wraps", "1 paquet"], ["Pain de mie ou pain aux céréales", "1 paquet"], ["Thon en boîte", "4 boîtes"], ["Sauce tomate", "3 boîtes"], ["Huile d'olive", "1 bouteille"], ["Sauce soja", "1 flacon"], ["Curry et épices", "au besoin"]]], ["Compléments", [["Clear whey", "1 pot (dure ~1 mois)"], ["Créatine", "5 g/jour"], ["Magnésium", "le soir"], ["Collagène", "le soir"]]], ["Plaisir", [["Pizza", "1"], ["Kebab, resto ou burger", "1 à 2"]]]], WEEKSUG=[["Lundi", "Pecs / Épaules / Triceps", "salle", ["Œufs brouillés & fromage blanc", "Skyr, banane, cajou", "Riz & poulet", "Fromage blanc, banane, riz soufflé", "Shaker & banane", "Pâtes carbonara"]], ["Mardi", "Jambes A", "salle", ["Avoine & fromage blanc", "Yaourt grec & raisin", "Pâtes & steak haché", "Tartines au miel", "Shaker & banane", "Riz poulet curry"]], ["Mercredi", "Dos / Biceps", "salle", ["Œufs brouillés & fromage blanc", "Wrap jambon-comté", "Semoule & dinde", "Clear whey & sucres rapides", "Shaker & banane", "Wok asiatique"]], ["Jeudi", "Épaules / Bras + course", "salle", ["Omelette & pain", "Skyr, banane, cajou", "Riz & poulet", "Fromage blanc, banane, riz soufflé", "Shaker & banane", "Gratin de pâtes"]], ["Vendredi", "Moto l'après-midi", "libre", ["Œufs brouillés & fromage blanc", "Skyr, banane, cajou", "Pâtes & steak haché", "Wrap & banane", "Pizza"]], ["Samedi", "Sortie moto ou ski", "sortie", ["Omelette & pain", "Wrap & banane", "Cajou & dattes", "Kebab ou resto"]], ["Dimanche", "Jambes B le soir", "salle", ["Avoine & fromage blanc", "Skyr, banane, cajou", "Patate douce & thon", "Fromage blanc, banane, riz soufflé", "Shaker & banane", "Saumon & patate douce"]]];
 const PASTEP=[0,3200,3350,3500,3650];
 const pal=()=>Math.max(1,Math.min(4,S.set.pal||1));
 const dayType=d=>{const P=progOf(d);if(P&&P.soir)return 'salle';const id=DAYIDS[dowOf(d)];return id==='sam'?'sortie':'libre';};
 const slotsFor=ty=>SLOTS.filter(s=>s.d.indexOf(ty)>-1);
 const pick=d=>{S.repas=S.repas||{};return S.repas[d]||(S.repas[d]={});};
 const chosen=(d,s)=>{const p=pick(d)[s.id];return (p===undefined?0:p);};
 function dayTotals(d){const ty=dayType(d);let k=0,p=0;slotsFor(ty).forEach(s=>{const o=s.o[chosen(d,s)];if(o){k+=o.k;p+=o.p;}});return [k,p];}
 window.hxRepas={SLOTS:SLOTS,pal:pal};

 if(typeof NAV!=='undefined'&&!NAV.some(n=>n[0]==='repas'))NAV.splice(2,0,['repas','Repas','apple']);

 /* objectif du jour = palier (un peu moins les jours sans séance) */
 const _nt=nutriTargets;
 nutriTargets=function(d){const r=_nt(d),ty=dayType(d),k=PASTEP[pal()]-(ty==='salle'?0:150);
  return Object.assign({},r,{kcal:k,p:Math.round(78*2.2),c:Math.round(k*.47/4/5)*5,f:Math.round(k*.27/9/5)*5});};

 VIEWS.repas=function(){
  const mode=R.rmode||'jour';
  let h='<div class="seg">'+[['jour','Aujourd\'hui'],['sem','Semaine'],['courses','Courses']].map(x=>'<button class="sgb'+(mode===x[0]?' on':'')+'" data-a="rmode" data-m="'+x[0]+'">'+x[1]+'</button>').join('')+'</div>';
  if(mode==='courses')return h+coursesHTML();
  if(mode==='sem')return h+semHTML();
  return h+jourHTML();};

 function palCard(tot,tgt){const p=pal(),wt=(typeof weightTrend==='function')?weightTrend():null;
  let c='Pèse-toi le matin : si la moyenne sur 7 jours ne bouge pas pendant 2 semaines, monte d\'un palier.';
  if(wt&&wt.rate!==null){const r=wt.rate;
   c = r<0.1 ? 'Ton poids stagne ('+(r>=0?'+':'')+r.toFixed(2)+' kg/sem) : monte d\'un palier.'
     : r>0.6 ? 'Tu prends vite (+'+r.toFixed(2)+' kg/sem) : redescends d\'un palier.'
     : 'Tu prends '+(r>=0?'+':'')+r.toFixed(2)+' kg/sem, c\'est le bon rythme.';}
  return '<div class="card"><div class="rowb"><div><b>Palier '+p+'</b> <span class="sub">objectif '+tgt+' kcal</span></div>'
   +'<div class="row" style="gap:6px"><button class="btn ghost sm" data-a="palSet" data-n="-1"'+(p<=1?' disabled':'')+'>−</button><button class="btn ghost sm" data-a="palSet" data-n="1"'+(p>=4?' disabled':'')+'>+</button></div></div>'
   +'<div class="palbar">'+[1,2,3,4].map(i=>'<i class="'+(i<=p?'on':'')+'"></i>').join('')+'</div>'
   +'<div class="rowb" style="margin-top:10px"><span class="m">'+tot[0]+' kcal</span><span class="m sub">'+tot[1]+' g de protéines</span></div>'
   +'<div class="bar" style="margin-top:6px"><i style="width:'+Math.min(100,tot[0]/tgt*100)+'%;--c:'+(Math.abs(tot[0]-tgt)<250?'var(--moss)':'var(--sun)')+'"></i></div>'
   +'<div class="sub" style="margin-top:8px">'+(tot[0]<tgt-250?'Il te manque environ '+(tgt-tot[0])+' kcal : prends une option plus grosse, ou rajoute une banane et une poignée de cajou.':tot[0]>tgt+250?'Tu es au-dessus de '+(tot[0]-tgt)+' kcal : pas grave un jour, mais choisis plus léger demain.':'Tu es dans la cible.')+'</div>'
   +'<div class="sub" style="margin-top:6px">'+c+'</div></div>';}

 function jourHTML(){const d=today(),ty=dayType(d),ls=slotsFor(ty),tgt=PASTEP[pal()]-(ty==='salle'?0:150);
  const n=nutriDay(d),tot=dayTotals(d);
  let h='<div class="card"><div class="rowb"><div><h3 class="d" style="margin:0">'+longDate(d)+'</h3>'
   +'<div class="sub">'+(ty==='salle'?'Jour de séance':ty==='sortie'?'Journée de sortie (moto, ski)':'Jour sans séance')+' — choisis une option par repas, change-en quand tu veux.</div></div></div></div>';
  h+=palCard(tot,tgt);
  ls.forEach(s=>{const ci=chosen(d,s),o=s.o[ci];
   h+='<div class="card"><div class="rowb" style="margin-bottom:8px"><div class="grow"><b>'+esc(s.n)+'</b> <span class="sub">'+esc(s.h)+'</span></div><span class="m sub">'+o.k+' kcal · P '+o.p+'</span></div>'
    +'<div class="opts">'+s.o.map((x,i)=>'<button class="opt'+(i===ci?' on':'')+'" data-a="rpick" data-s="'+s.id+'" data-i="'+i+'">'+esc(x.t)+'</button>').join('')+'</div>'
    +'<ul class="ing">'+o.l.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'
    +(o.note?'<div class="sub">'+esc(o.note)+'</div>':'')
    +'<div style="margin-top:8px"><button class="btn ghost sm" data-a="rAdd" data-s="'+s.id+'">+ Ajouter au bilan</button></div></div>';});
  h+='<div class="card"><div class="sub">Déjà compté aujourd\'hui dans ton bilan : <b>'+Math.round(n.kcal)+' kcal</b> et '+Math.round(n.p)+' g de protéines. Les repères maison : 1 bol de féculent cru ≈ 120 g, 1 paume de viande ≈ 120 g, 1 poignée de cajou ≈ 30 g, 1 c. à s. d\'huile ≈ 10 g.</div></div>';
  return h;}

 function semHTML(){let h='<div class="card"><div class="sub">Une rotation qui marche, à prendre comme un exemple : tu peux remplacer n\'importe quel repas par une autre option du même créneau.</div></div>';
  WEEKSUG.forEach(w=>{h+='<div class="card"><div class="rowb" style="margin-bottom:6px"><div><b>'+esc(w[0])+'</b> <span class="sub">'+esc(w[1])+'</span></div>'
   +'<span class="m sub">'+w[3].reduce((a,t)=>{const o=findOpt(t);return a+(o?o.k:0);},0)+' kcal</span></div>'
   +w[3].map(t=>{const o=findOpt(t);return '<div class="ls"><div class="grow">'+esc(t)+'</div><span class="m sub">'+(o?o.k:'')+'</span></div>';}).join('')+'</div>';});
  return h;}
 function findOpt(t){for(const s of SLOTS){for(const o of s.o)if(o.t===t)return o;}return null;}

 function coursesHTML(){S.courses=S.courses||{};
  let h='<div class="card"><div class="sub">Panier type pour une semaine, pas une liste au gramme près. Prends ce qui manque, adapte aux promos — tant que tu as des œufs, du fromage blanc, de la viande, du riz ou des pâtes, des légumes et des bananes, le plan tient.</div></div>';
  COURSES.forEach(r=>{h+='<div class="card"><h3 class="d" style="margin:0 0 8px">'+esc(r[0])+'</h3>'
   +r[1].map(x=>{const on=!!S.courses[x[0]];return '<button class="crs'+(on?' on':'')+'" data-a="crsTog" data-n="'+esc(x[0])+'"><span class="bx">'+(on?'✓':'')+'</span><span class="grow">'+esc(x[0])+'</span><span class="m sub">'+esc(x[1])+'</span></button>';}).join('')+'</div>';});
  h+='<div class="row wrap"><button class="btn ghost sm" data-a="crsReset">Tout décocher</button><button class="btn ghost sm" data-a="crsCopy">Copier la liste</button></div>';
  return h;}

 Object.assign(A,{
  rmode:d=>{R.rmode=d.m;render(true);},
  palSet:d=>{S.set.pal=Math.max(1,Math.min(4,pal()+(+d.n)));save();render(true);},
  rpick:d=>{const p=pick(today());p[d.s]=+d.i;save();render(true);},
  rAdd:d=>{const t=today(),s=SLOTS.filter(x=>x.id===d.s)[0];if(!s)return;const o=s.o[chosen(t,s)];const n=nutriDay(t);
   n.kcal+=o.k;n.p+=o.p;n.c+=Math.round(o.k*.45/4);n.f+=Math.round(o.k*.28/9);save();render(true);},
  crsTog:d=>{S.courses=S.courses||{};if(S.courses[d.n])delete S.courses[d.n];else S.courses[d.n]=1;save();render(true);},
  crsReset:()=>{S.courses={};save();render(true);},
  crsCopy:()=>{let t='Liste de courses — semaine\n';COURSES.forEach(r=>{t+='\n'+r[0]+'\n'+r[1].map(x=>'- '+x[0]+' : '+x[1]).join('\n')+'\n';});
   try{navigator.clipboard.writeText(t);}catch(e){}}
 });

 /* ---- accueil & séance ---- */
 const _vh=VIEWS.home;
 VIEWS.home=function(){const h=_vh(),d=today(),ty=dayType(d),tot=dayTotals(d),tgt=PASTEP[pal()]-(ty==='salle'?0:150),n=nutriDay(d);
  const card='<div class="sec"><h2 class="d">Repas du jour</h2><button class="btn ghost sm" data-a="nav" data-v="repas" style="margin-left:auto">Choisir</button></div>'
   +'<div class="card"><div class="rowb"><span class="m">'+Math.round(n.kcal)+' / '+tgt+' kcal</span><span class="sub">palier '+pal()+'</span></div>'
   +'<div class="bar" style="margin:8px 0 10px"><i style="width:'+Math.min(100,n.kcal/tgt*100)+'%;--c:var(--moss)"></i></div>'
   +slotsFor(ty).map(s=>{const o=s.o[chosen(d,s)];return '<div class="ls"><div class="grow"><b>'+esc(s.n)+'</b> <span class="sub">'+esc(o.t)+'</span></div><span class="m sub">'+o.k+'</span></div>';}).join('')
   +'<div class="row wrap" style="margin-top:10px"><button class="btn sm" data-a="nav" data-v="repas">Voir les options</button><button class="btn ghost sm" data-a="nav" data-v="nutri">Mon bilan</button></div></div>';
  const k='<div class="sec"><h2 class="d">Cette semaine</h2></div>';
  return h.indexOf(k)>-1?h.replace(k,card+k):h+card;};
 const _vd=VIEWS.day;
 VIEWS.day=function(){const h=_vd(),d=R.d||today(),P=progOf(d);
  if(!P||!P.soir||d!==today())return h;
  const s=SLOTS.filter(x=>x.id==='pre')[0],o=s.o[chosen(d,s)];
  return '<div class="card acc" style="--acc:var(--moss)"><div class="rowb"><b>Avant la séance</b><span class="m sub">'+o.k+' kcal · P '+o.p+'</span></div>'
   +'<div class="sub" style="margin:6px 0"><b>'+esc(o.t)+'</b> — '+esc(o.l.join(' · '))+'</div>'
   +'<div class="row wrap"><button class="btn ghost sm" data-a="nav" data-v="repas">Changer d\'option</button></div></div>'+h;};
 const _vn=VIEWS.nutri;
 VIEWS.nutri=function(){return _vn()+'<div class="card"><h3 class="d">Mes repas</h3><div class="sub" style="margin-bottom:8px">Choisis tes options du jour et ajoute-les en un geste.</div><button class="btn sm" data-a="nav" data-v="repas">Ouvrir les repas et la liste de courses</button></div>';};
})();
