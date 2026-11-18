/* ===================== PRISES : accessoires de poulie, recommandations par exercice, schéma agrandi ===================== */
(function(){
 const G={
  rope:{n:'Corde',s:'corde à triceps',d:'Deux brins libres : tu peux écarter les mains en fin de mouvement, donc aller chercher la contraction complète. Moins lourd qu\'une barre, plus confortable pour les coudes et les poignets.'},
  str:{n:'Barre droite',s:'barre droite courte',d:'La plus stable, celle qui permet de charger le plus lourd. En contrepartie, les poignets sont bloqués en pronation : si ça tire, passe à l\'EZ ou à la corde.'},
  ez:{n:'Barre EZ',s:'barre ondulée',d:'Les ondulations mettent les poignets en semi-supination : même charge qu\'une barre droite, beaucoup moins de tension dans les avant-bras.'},
  vb:{n:'Barre V (triangle)',s:'poignée triangle',d:'Prise neutre, mains serrées, paumes face à face. C\'est la prise la plus solide pour tirer : dos épais, biceps bien placés.'},
  lat:{n:'Barre de tirage large',s:'barre longue coudée',d:'Les extrémités coudées permettent une prise large en pronation : c\'est ce qui ouvre le dos (grand dorsal) au tirage vertical.'},
  dh:{n:'Poignée simple',s:'poignée D',d:'Une poignée par main : chaque bras travaille seul, l\'amplitude est libre et tu corriges les déséquilibres droite/gauche. Indispensable pour les écartés et les élévations.'},
  ank:{n:'Sangle de cheville',s:'sangle velcro',d:'Se fixe au-dessus de la cheville pour travailler fessiers et ischios à la poulie basse.'}
 };
 /* prise conseillée par mouvement + alternatives, avec ce que ça change */
 const REC={
  pushdown:['rope','Tu finis en écartant les deux brins vers l\'extérieur : le triceps se contracte à fond, et les coudes ne souffrent pas.',[['str','Plus lourd, plus stable — mais poignets bloqués et amplitude plus courte.'],['vb','Compromis : prise neutre, charge correcte.']]],
  overhead:['rope','Au-dessus de la tête, la corde laisse les coudes dans l\'axe et étire la longue portion du triceps.',[['ez','Si tu veux charger plus, mais surveille les coudes.']]],
  skull:['ez','Les poignets en semi-supination encaissent beaucoup mieux la barre au front.',[['str','Possible, mais plus dur pour les poignets.'],['rope','À la poulie, version douce pour les coudes.']]],
  curlcab:['ez','Même logique qu\'au curl barre : moins de tension dans les poignets pour la même charge.',[['str','Un peu plus de travail du brachial, poignets plus contraints.'],['rope','Prise neutre : cible le brachial et l\'avant-bras.']]],
  curl:['ez','Avec une barre, l\'EZ épargne les poignets. Avec des haltères, tourne la main vers l\'extérieur en montant.',[['str','Barre droite : plus de sollicitation du biceps, poignets plus tendus.']]],
  rowseated:['vb','Prise neutre, mains serrées : c\'est la position la plus forte pour tirer, et tu sens le milieu du dos.',[['lat','Prise large en pronation : plus de dos large et d\'arrière d\'épaule, moins lourd.'],['rope','Tire vers le visage pour les trapèzes moyens.']]],
  pulldown:['lat','Prise large en pronation, mains un peu plus larges que les épaules : c\'est ce qui ouvre le grand dorsal.',[['vb','Prise neutre serrée : plus de charge, plus de bas du dorsal.'],['dh','Une main à la fois pour corriger un déséquilibre.']]],
  facepull:['rope','Seule prise qui marche : tu tires la corde vers le front en écartant les mains, paumes vers toi.',[]],
  cflyhi:['dh','Une poignée par main, pas d\'accessoire double : l\'amplitude est libre et tu peux croiser devant toi.',[]],
  cflymid:['dh','Poignées simples, un pied devant l\'autre.',[]],
  cflylo:['dh','Poignées simples, bras le long du corps au départ.',[]],
  latcab:['dh','Une poignée simple, câble devant le corps : la tension reste présente en bas du mouvement.',[]],
  kickback:['ank','À la poulie, la sangle de cheville laisse la jambe libre.',[['dh','Avec un haltère, garde le coude collé au corps.']]],
  highrow:['vb','Prise neutre pour tirer lourd sans tendre les poignets.',[['lat','Prise large pour viser le haut du dos.']]],
  machrow:['vb','Prise neutre : la plus solide pour le rowing.',[['lat','Prise large, plus de trapèzes et d\'arrière d\'épaule.']]],
  hipthrust:['str','Barre droite avec un coussin épais sur les hanches.',[]]
 };
 const byName=n=>{n=(n||'').toLowerCase();
  if(/sangle|cheville/.test(n))return 'ank';
  if(/corde|katana/.test(n))return 'rope';
  if(/barre ez|\bez\b|ondul/.test(n))return 'ez';
  if(/triangle|v-?bar|barre v\b|prise serrée|serrée neutre/.test(n))return 'vb';
  if(/prise large|barre large|barre de tirage/.test(n))return 'lat';
  if(/poignée|unilat|un bras|vis-à-vis/.test(n))return 'dh';
  if(/barre droite|barre courte/.test(n))return 'str';
  return '';};
 function gripId(pat,name){const b=byName(name);if(b)return b;const r=REC[pat];if(r)return r[0];
  const pd=(typeof PATS!=='undefined')&&PATS[pat];if(!pd)return '';
  if(pd.eq==='cross')return 'dh';if(pd.eq==='hbar')return 'lat';if(pd.eq==='cable')return 'str';return '';}
 window.hxGripId=gripId;
 window.hxGrips=G;

 function gripHTML(pat,name){const id=gripId(pat,name);if(!id||!G[id])return '';
  const r=REC[pat],why=(r&&byName(name)===''?r[1]:'');
  const alts=(r&&r[2])||[];
  let h='<div class="grip"><div class="grip-h"><span class="grip-ic">'+gripSVG(id)+'</span><div><b>Prise conseillée : '+G[id].n+'</b><div class="sub">'+esc(why||G[id].d)+'</div></div></div>';
  if(alts.length)h+='<div class="sub" style="margin-top:8px"><b>Autres prises possibles</b></div>'
   +alts.map(a=>'<div class="ls"><span class="grip-ic sm">'+gripSVG(a[0])+'</span><div class="grow"><b>'+G[a[0]].n+'</b><div class="sub">'+esc(a[1])+'</div></div></div>').join('');
  return h+'</div>';}

 /* petits pictos des accessoires */
 function gripSVG(id){const w='<svg viewBox="0 0 40 40" width="100%" height="100%" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">';
  const P={
   rope:'<path d="M20 5v8"/><path d="M20 13l-6 16M20 13l6 16"/><path d="M13 27v5M27 27v5"/>',
   str:'<path d="M20 5v9"/><path d="M8 18h24"/><path d="M12 15v6M28 15v6"/>',
   ez:'<path d="M20 5v8"/><path d="M8 20l5-4 7 6 7-6 5 4"/>',
   vb:'<path d="M20 5v6"/><path d="M20 11l-9 16M20 11l9 16"/><path d="M9 27h6M25 27h6"/>',
   lat:'<path d="M20 6v7"/><path d="M6 24L12 17h16l6 7"/><path d="M14 17v4M26 17v4"/>',
   dh:'<path d="M20 5v10"/><path d="M14 20h12v8a6 6 0 0 1-12 0z"/>',
   ank:'<path d="M12 10h16v7a8 8 0 0 1-16 0z"/><path d="M20 25v8"/>'};
  return w+(P[id]||P.str)+'</svg>';}

 /* bloc infos : prise + bouton d'agrandissement */
 const _d=descHTML;
 descHTML=function(pat,name){const h=_d.apply(this,arguments);
  return h+gripHTML(pat,name||'')
   +'<button class="btn ghost sm" style="margin-top:10px" data-a="figzoom" data-pat="'+pat+'" data-nm="'+esc(name||'')+'">Agrandir le schéma · tourner et zoomer</button>';};
 Object.assign(A,{figzoom:d=>{if(window.FIG3D&&FIG3D.ok)FIG3D.open({pat:d.pat,nm:d.nm,title:d.nm||(window.hxTitleOf?hxTitleOf(d.pat):''),sub:gripSub(d.pat,d.nm)});}});
 function gripSub(pat,nm){const id=gripId(pat,nm);const pd=PATS[pat];const a=[];
  if(id&&G[id])a.push('Prise : '+G[id].n);
  if(pd&&pd.phl)a.push(pd.phl);
  return a.join(' · ');}
})();
