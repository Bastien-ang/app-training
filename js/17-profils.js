/* ===================== PROFILS : contraintes -> semaine type, exos adaptés, lien de partage pour les amis ===================== */
(function(){
 window.hxTplExt=window.hxTplExt||{};window.hxSwExt=window.hxSwExt||[];
 const DO=['lun','mar','mer','jeu','ven','sam','dim'],DN={lun:'Lun',mar:'Mar',mer:'Mer',jeu:'Jeu',ven:'Ven',sam:'Sam',dim:'Dim'};
 const GOALS=[['muscle','Prise de muscle'],['perte','Perte de poids'],['endu','Endurance / cardio'],['hyrox','Hyrox'],['forme','Forme générale']];
 const LEVELS=[['debutant','Débutant'],['inter','Intermédiaire'],['avance','Avancé']];
 const ZONES=[['genoux','Genoux'],['dos','Dos / lombaires'],['epaules','Épaules'],['poignets','Poignets / coudes']];
 const prof=()=>{const p=S.set&&S.set.prof;return p&&p.on?p:null;};
 window.hxProfOn=()=>!!prof();
 window.hxName=()=>{const p=prof();return p&&p.name?p.name:'Bastien';};
 window.hxProfKey=d=>{const p=prof();if(!p||!p.week||d<V2)return null;return p.week[dayId(d)]||'pf-rest';};

 /* ---------- séances de muscu génériques (composées avec les exos du programme) ---------- */
 const MUSC={
  'pf-full-a':{t:'Full body A',min:60,diff:'bleue',n:'Tout le corps : une jambe, une poussée, un tirage. Garde 2 répétitions en réserve sur chaque série.',ex:['leg-press','push-incline','pull-pulldown','sh-dbpress','leg-curl','pull-plank']},
  'pf-full-b':{t:'Full body B',min:60,diff:'bleue',n:'Même idée que la A avec d\'autres exos : on garde la fréquence en variant les angles.',ex:['leg-rdl','pec-dbpress','pull-rowcable','fri-lateral','pull-curlinc','push-tri']},
  'pf-upper':{t:'Haut du corps',min:65,diff:'bleue',n:'Pecs, dos, épaules et bras. Tire autant que tu pousses.',ex:['push-incline','pull-pulldown','sh-dbpress','pull-rowcable','push-tri','pull-curlinc']},
  'pf-lower':{t:'Bas du corps',min:60,diff:'bleue',n:'Cuisses, ischios, fessiers, mollets et gainage. Descente contrôlée.',ex:['leg-press','leg-rdl','leg-ext','leg-curl','leg-calf','pull-plank']},
  'pf-push':{t:'Push — pecs, épaules, triceps',min:60,diff:'bleue',n:'Tout ce qui pousse. Étirement complet en bas du mouvement.',ex:['pec-dbpress','sh-dbpress','push-fly','fri-lateral','push-tri']},
  'pf-pull':{t:'Pull — dos, biceps',min:60,diff:'bleue',n:'Tire avec les coudes, serre les omoplates.',ex:['pull-pulldown','pull-rowcable','back-dbrow','pull-face','pull-curlinc']},
  'pf-arms':{t:'Bras + abdos',min:45,diff:'verte',n:'Séance courte pour compléter la semaine : bras en superset si tu veux gagner du temps.',ex:['push-tri','pull-curlbar','pec-rope','back-curlcable','pull-crunch','th-hanging']}
 };
 const mk=o=>({soir:{title:o.t,short:o.t,dur:o.min+' min',min:o.min,A:[{n:'Musculation · '+o.min+' min',ex:o.ex}],note:o.n},short:o.t,diff:o.diff,title:undefined,note:undefined,rest:undefined,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 Object.keys(MUSC).forEach(k=>{window.hxTplExt[k]=()=>mk(MUSC[k]);});
 window.hxTplExt['pf-rest']=()=>({soir:undefined,short:'Repos',diff:'fermee',title:'Repos',note:'Récupération : marche, mobilité, sommeil. C\'est là que le muscle se construit.',rest:true,suggest:undefined,optional:undefined,run:undefined,load:undefined});
 window.hxSwExt.push({sec:'Muscu — autres formats',items:Object.keys(MUSC).map(k=>({k:k,t:MUSC[k].t,sub:MUSC[k].min+' min'}))});

 /* ---------- génération de la semaine ---------- */
 const cyc=(a,i)=>a[i%a.length];
 function pools(p){
  const bad=z=>p.zones.includes(z),lowImpact=bad('genoux')||bad('dos');
  const lv=p.level;
  let cardio=lowImpact?['gx-s-mix','gx-s-interv','gx-s-engine']
   :lv==='debutant'?['rn-easy30','gx-s-mix','rn-easy30','rn-easy45']
   :lv==='avance'?['rn-easy45','gx-s-interv','rn-tempo','gx-s-mix','rn-fart','gx-s-legrun']
   :['rn-easy45','gx-s-interv','rn-fart','gx-s-mix'];
  let hx;
  if(p.partner)hx=lv==='debutant'||lowImpact?['gx-d-relay','gx-d-partner']:lv==='avance'?['gx-d-ygig','gx-d-relay','gx-d-partner','gx-d-ygig']:['gx-d-ygig','gx-d-relay','gx-d-partner'];
  else hx=lowImpact?['gx-s-engine','gx-s-interv','hx-erg']:lv==='debutant'?['hx-circ','hx-erg','gx-s-engine']:lv==='avance'?['gx-s-emom','gx-s-hybrid','gx-s-ladder','hx-force']:['gx-s-emom','hx-circ','gx-s-engine','gx-s-ladder'];
  return{cardio:cardio,hx:hx};}
 function muscleSeq(p,m){
  const lv=p.level;if(m<=0)return[];
  if(m===1)return['pf-full-a'];
  if(m===2)return lv==='debutant'?['pf-full-a','pf-full-b']:['pf-upper','pf-lower'];
  if(m===3)return lv==='debutant'||p.goal==='forme'?['pf-full-a','pf-full-b','pf-full-a']:['pf-push','pf-pull','pf-lower'];
  if(m===4)return lv==='debutant'?['pf-full-a','pf-full-b','pf-full-a','pf-full-b']:lv==='avance'?['lun','mar','mer','jeu']:['pf-upper','pf-lower','pf-upper','pf-lower'];
  const five=lv==='debutant'?['pf-upper','pf-lower','pf-upper','pf-lower','pf-full-a']:['lun','mar','mer','jeu','pf-arms'];
  const out=[];for(let i=0;i<m;i++)out.push(cyc(five,i));return out;}
 function plan(p){
  const days=DO.filter(d=>p.days.includes(d)),n=days.length,week={};DO.forEach(d=>week[d]='pf-rest');if(!n)return week;
  const g=p.goal;let c,h;
  if(p.cardio!=='auto'&&p.cardio!=null)c=+p.cardio;else c=({muscle:n>=4?1:0,perte:Math.round(n/2),endu:Math.ceil(n*0.6),hyrox:1,forme:Math.round(n/3)})[g]||0;
  h=p.hx?(g==='hyrox'&&n>=4?2:1):0;if(g==='hyrox'&&!p.hx)h=0;
  if(n<3&&g!=='endu')h=Math.min(h,0);
  c=Math.max(0,Math.min(c,n));if(c+h>n)h=Math.max(0,n-c);
  let m=n-c-h;if(m<1&&g!=='endu'&&n>=1){m=1;if(c>=h&&c>0)c--;else if(h>0)h--;if(m+c+h>n)m=n-c-h;}
  const P=pools(p),M=muscleSeq(p,m);
  const items=[];
  const spread=(arr,tag)=>arr.forEach((k,i)=>items.push({pos:(i+0.5)/arr.length,k:k,pr:tag}));
  spread(M,0);
  const C=[],H=[];for(let i=0;i<c;i++)C.push(cyc(P.cardio,i));for(let i=0;i<h;i++)H.push(cyc(P.hx,i));
  spread(C,1);spread(H,2);
  items.sort((a,b)=>a.pos-b.pos||a.pr-b.pr);
  /* évite deux séances très dures d'affilée : on échange avec le voisin plus léger quand c'est possible */
  const hard=k=>/^gx-s-(emom|ladder|hybrid|legrun)|^gx-d-ygig|^gx-d-doubles|^hx-(sim|half|comp)|^rn-tempo|^mar$/.test(k);
  for(let i=1;i<items.length;i++){if(hard(items[i].k)&&hard(items[i-1].k)){for(let j=i+1;j<items.length;j++){if(!hard(items[j].k)){const t=items[i];items[i]=items[j];items[j]=t;break;}}}}
  days.forEach((d,i)=>{week[d]=items[i]?items[i].k:'pf-rest';});
  return week;}

 /* ---------- zones à ménager : on remplace l'exo par une variante sûre, sinon on le retire ---------- */
 const ZRX={
  genoux:/squat|presse à cuisses|leg press|presse horizontale|fentes|hack|leg extension|sissy|step-?up|bulgare|burpee|sled|prowler|lunge|wall ball|pendulum|belt|v-squat|vertical leg/i,
  dos:/soulevé|sdt|good morning|rowing barre|t-bar|squat|back extension|farmer|trap bar|buste penché|seal row|sandbag|rowing haut|hack|bent over|back extension|lower back|glute ham|reverse hyper/i,
  epaules:/militaire|arnold|dips|frontale|rowing menton|développé couché barre|développé incliné barre|pompes|wall ball|tractions|press machine épaules|shoulder press|viking|overhead/i,
  poignets:/barre au front|skull|dips|curl (barre|ez)|kickback|développé couché barre|rowing barre|planche|farmer|tractions/i
 };
 const hazard=(name,zones)=>zones.some(z=>ZRX[z]&&ZRX[z].test(name));
 function idsOfKey(k){
  if(MUSC[k])return MUSC[k].ex;
  const P=PROG2[k];if(P&&P.soir&&P.soir.A){const o=[];['A','B'].forEach(v=>(P.soir[v]||[]).forEach(b=>b.ex.forEach(x=>{if(!/^@cz:/.test(x))o.push(x);})));return o;}
  return[];}
 function safety(p){
  p.rm=[];p.sub={};if(!p.zones.length)return;
  const seen=new Set();
  Object.keys(p.week).forEach(d=>idsOfKey(p.week[d]).forEach(id=>{
   if(seen.has(id)||!EX[id])return;seen.add(id);const e=EX[id];if(e.kind!=='lift'&&e.kind!=='time')return;
   const cur=S.subs[id]||e.name;
   if(!hazard(cur,p.zones))return;
   const alt=(ALT[id]||[]).map(a=>a[0]).find(n=>!hazard(n,p.zones));
   if(!hazard(e.name,p.zones)){delete S.subs[id];return;}
   if(alt){S.subs[id]=alt;p.sub[id]=alt;}else p.rm.push(id);}));
 }
 function undoSafety(p){if(!p||!p.sub)return;Object.keys(p.sub).forEach(id=>{if(S.subs[id]===p.sub[id])delete S.subs[id];});}

 /* ---------- application du profil ---------- */
 function clean(p){return{name:String(p.name||'').trim().slice(0,30),goal:p.goal||'muscle',level:p.level||'debutant',days:(p.days||[]).filter(d=>DO.includes(d)),dur:+p.dur||60,zones:(p.zones||[]).filter(z=>ZRX[z]),cardio:p.cardio==null?'auto':p.cardio,hx:!!p.hx,partner:!!p.partner,note:String(p.note||'').slice(0,300)};}
 function apply(raw){
  const old=S.set.prof;undoSafety(old);
  const p=Object.assign({on:true,v:1},clean(raw));
  p.lf={debutant:.6,inter:.85,avance:1}[p.level]||.85;
  p.week=plan(p);safety(p);
  S.set.prof=p;S.set.onb=1;save();H=null;render(true);}
 function revert(){const old=S.set.prof;undoSafety(old);S.set.prof=null;S.set.onb=1;save();H=null;render(true);}
 /* ---------- code / lien de partage ---------- */
 const enc=o=>btoa(unescape(encodeURIComponent(JSON.stringify(o))));
 const dec=s=>JSON.parse(decodeURIComponent(escape(atob(s))));
 const baseUrl=()=>/github\.io/.test(location.host)?location.href.split('#')[0]:'https://bastien-ang.github.io/app-training/';
 function codeOf(p){return enc(clean(p));}

 /* filtres sur les séances d'un profil */
 const cleanNote=t=>typeof t!=='string'?t:t.split(/(?<=[.!?])\s+/).filter(x=>!/moto|vtt|vendredi|samedi|grip/i.test(x)).join(' ');
 window.hxPost=function(R,d){if(!prof()||!R)return R;return Object.assign({},R,{note:cleanNote(R.note)});};
 const _so=soirOf;
 soirOf=function(P,d){const r=_so(P,d);const p=prof();if(!r||!p||!r.blocks)return r;
  const added=new Set(((S.logs[d]&&S.logs[d].add)||[]).map(a=>a.id));const rm=p.rm||[];
  let blocks=r.blocks.map(b=>({n:b.n,ex:b.ex.filter(x=>added.has(x)||!rm.includes(x.split('~')[0]))}));
  if(p.dur<=45)blocks=blocks.filter(b=>!b.ex.every(x=>/^cz-/.test(x)));
  const cap=p.dur<=45?4:p.dur<=60?6:p.dur<=75?8:99;let cnt=0;
  blocks=blocks.map(b=>({n:b.n,ex:b.ex.filter(x=>{const e=EX[x];if(!e||(e.kind!=='lift'&&e.kind!=='time')||added.has(x))return true;cnt++;return cnt<=cap;})})).filter(b=>b.ex.length);
  return Object.assign({},r,{blocks:blocks.length?blocks:r.blocks,note:cleanNote(r.note)});};
 const _sf=setsFor;setsFor=function(it,D){let n=_sf(it,D);const p=prof();if(p&&p.level==='debutant')n=Math.max(2,n-1);return n;};
 const _rs=resolve;resolve=function(id,v){const it=_rs(id,v);const p=prof();
  if(p&&p.lf&&p.lf<1&&it.base>0&&it.inc>0&&(it.kind==='lift'||it.kind==='carry'||it.kind==='station'))it.base=Math.max(it.inc,rnd(it.base*p.lf));return it;};
 const _cc=coachContext;coachContext=function(){let s=_cc();const p=prof();if(p){const i=s.indexOf('Fitness Park.');if(i>0&&/^Tu es le coach de Bastien/.test(s))s='Tu es le coach de '+(p.name||'cette personne')+', qui s\'entraîne en salle (Fitness Park).'+s.slice(i+'Fitness Park.'.length);}if(p)s+='\nProfil actif : '+(p.name||'sans nom')+' · objectif '+((GOALS.find(x=>x[0]===p.goal)||[])[1]||p.goal)+' · niveau '+p.level+' · jours : '+p.days.join(', ')+' · séances de '+p.dur+' min max'+(p.zones.length?' · zones à ménager : '+p.zones.join(', '):'')+(p.partner?' · s\'entraîne en binôme':'')+(p.note?' · remarque : '+p.note:'');return s;};

 /* ---------- formulaire ---------- */
 function closeF(){const o=document.getElementById('pfov');if(o)o.remove();}
 const chip=(on,f,v,t)=>'<button class="chip'+(on?' on':'')+'" data-f="'+f+'" data-v="'+esc(v)+'">'+esc(t)+'</button>';
 const sec=t=>'<div class="mono-s" style="margin:12px 0 4px">'+t+'</div>';
 function formHTML(st,mode,link){
  const wk=plan(clean(st)),pv=DO.map(d=>'<div class="ls"><div class="grow"><b>'+DN[d]+'</b> · '+esc(wk[d]==='pf-rest'?'Repos':window.hxTitle(wk[d]))+'</div></div>').join('');
  let h='<div style="background:var(--panel);width:100%;max-width:560px;max-height:92vh;border-radius:18px 18px 0 0;padding:16px;overflow:auto"><div class="row" style="justify-content:space-between;align-items:center"><b style="font-size:16px">'+(mode==='friend'?'Profil d\'un ami':mode==='onb'?'Ton profil':'Mon profil')+'</b><button class="btn ghost sm" id="pfx">Fermer</button></div>'
   +'<div class="sub" style="margin:4px 0 8px">'+(mode==='friend'?'Remplis les contraintes de ton ami : tu obtiens un lien et un code à lui envoyer. Son app se règle toute seule, ses données restent chez lui.':'L\'app adapte tes séances à ces réponses. Tu pourras tout modifier ensuite.')+'</div>'
   +'<label class="lab">Prénom</label><input class="inp" id="pfn" placeholder="Prénom" value="'+esc(st.name)+'">'
   +sec('Objectif')+'<div class="row wrap" style="gap:6px">'+GOALS.map(x=>chip(st.goal===x[0],'goal',x[0],x[1])).join('')+'</div>'
   +sec('Niveau')+'<div class="row wrap" style="gap:6px">'+LEVELS.map(x=>chip(st.level===x[0],'level',x[0],x[1])).join('')+'</div>'
   +sec('Jours où tu peux t\'entraîner')+'<div class="row wrap" style="gap:6px">'+DO.map(d=>chip(st.days.includes(d),'days',d,DN[d])).join('')+'</div>'
   +sec('Durée maximale d\'une séance')+'<div class="row wrap" style="gap:6px">'+[45,60,75,90].map(x=>chip(st.dur===x,'dur',String(x),x+' min')).join('')+'</div>'
   +sec('Zones à ménager (blessure, gêne)')+'<div class="row wrap" style="gap:6px">'+ZONES.map(x=>chip(st.zones.includes(x[0]),'zones',x[0],x[1])).join('')+'</div>'
   +sec('Séances de cardio par semaine')+'<div class="row wrap" style="gap:6px">'+[['auto','Auto'],['0','0'],['1','1'],['2','2'],['3','3']].map(x=>chip(String(st.cardio)===x[0],'cardio',x[0],x[1])).join('')+'</div>'
   +sec('Hyrox / circuits en salle')+'<div class="row wrap" style="gap:6px">'+chip(st.hx,'hx','1','Oui, j\'en veux')+chip(!st.hx,'hx','0','Non')+chip(st.partner,'partner','1','Souvent en binôme')+chip(!st.partner,'partner','0','Seul(e)')+'</div>'
   +sec('Autre chose à savoir')+'<textarea class="inp" id="pfnote" rows="2" placeholder="Ex : reprise après blessure, pas de barre, objectif 10 kg en moins…">'+esc(st.note)+'</textarea>'
   +sec('Semaine type proposée')+pv;
  if(link)h+='<div class="card" style="margin-top:12px"><div class="sub" style="margin-bottom:6px">À envoyer à '+esc(st.name||'ton ami')+' : ouvre le lien sur son téléphone, ou colle le code dans l\'app (Réglages ▸ Mon profil ▸ Importer un code).</div><input class="inp" id="pflink" readonly value="'+esc(link)+'"><div class="row wrap" style="gap:6px;margin-top:6px"><button class="btn sm" id="pfcopy">Copier le lien</button><button class="btn ghost sm" id="pfcode">Copier le code seul</button></div></div>';
  h+='<div class="row wrap" style="gap:6px;margin-top:14px"><button class="btn" id="pfgo">'+(mode==='friend'?'Générer le lien':'Appliquer à mon app')+'</button></div></div>';
  return h;}
 function openForm(mode,pre){
  closeF();let st=Object.assign({name:'',goal:'muscle',level:'debutant',days:['lun','mer','ven'],dur:60,zones:[],cardio:'auto',hx:false,partner:false,note:''},pre?clean(pre):{});
  st.days=st.days.slice();st.zones=st.zones.slice();
  const o=document.createElement('div');o.id='pfov';o.style.cssText='position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.65);display:flex;align-items:flex-end;justify-content:center';
  let link='';
  const grab=()=>{const n=o.querySelector('#pfn'),t=o.querySelector('#pfnote');if(n)st.name=n.value;if(t)st.note=t.value;};
  const draw=()=>{o.innerHTML=formHTML(st,mode,link);};
  draw();document.body.appendChild(o);
  o.addEventListener('click',e=>{
   if(e.target===o||e.target.id==='pfx'){closeF();return;}
   const c=e.target.closest('[data-f]');
   if(c){grab();const f=c.dataset.f,v=c.dataset.v;
    if(f==='days'||f==='zones'){const a=st[f],i=a.indexOf(v);if(i<0)a.push(v);else a.splice(i,1);}
    else if(f==='dur')st.dur=+v;else if(f==='hx')st.hx=v==='1';else if(f==='partner')st.partner=v==='1';
    else if(f==='cardio')st.cardio=v;else st[f]=v;
    link='';draw();return;}
   if(e.target.id==='pfgo'){grab();if(!st.days.length){toast('Choisis au moins un jour');return;}
    if(mode==='friend'){link=baseUrl()+'#p='+codeOf(st);draw();toast('Lien prêt ✓');return;}
    closeF();apply(st);toast('Profil appliqué ✓');return;}
   if(e.target.id==='pfcopy'||e.target.id==='pfcode'){const t=e.target.id==='pfcopy'?link:codeOf(st);
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>toast('Copié ✓'),()=>toast('Copie impossible : sélectionne le texte'));else toast('Copie impossible : sélectionne le texte');}
  });}

 /* ---------- accueil pour un nouvel arrivant ---------- */
 function openOnb(){
  closeF();const o=document.createElement('div');o.id='pfov';o.style.cssText='position:fixed;inset:0;z-index:70;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:16px';
  o.innerHTML='<div style="background:var(--panel);width:100%;max-width:440px;border-radius:18px;padding:18px"><b style="font-size:17px">Bienvenue sur TRAINING</b><div class="sub" style="margin:6px 0 12px">Réponds à quelques questions et l\'app compose ta semaine : jours, durée, zones à ménager, cardio, Hyrox en salle. Tes données restent sur ton téléphone.</div>'
   +'<div style="display:flex;flex-direction:column;gap:8px"><button class="btn" id="obcreate">Créer mon profil</button><textarea class="inp" id="obcode" rows="2" placeholder="J\'ai reçu un code profil : colle-le ici"></textarea><button class="btn ghost" id="obgo">Importer ce code</button><button class="btn ghost" id="obskip">Garder le programme de base</button></div></div>';
  document.body.appendChild(o);
  o.addEventListener('click',e=>{const id=e.target.id;
   if(id==='obcreate'){closeF();openForm('onb');}
   else if(id==='obskip'){S.set.onb=1;save();closeF();}
   else if(id==='obgo'){const v=(o.querySelector('#obcode').value||'').trim().replace(/^.*#p=/,'');try{const p=dec(v);closeF();apply(p);toast('Profil de '+(p.name||'ton ami')+' appliqué ✓');}catch(err){toast('Code illisible');}}});}
 function fromHash(){
  const m=/[#&]p=([^&]+)/.exec(location.hash||'');if(!m)return false;
  let p;try{p=dec(decodeURIComponent(m[1]));}catch(e){return false;}
  try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
  const go=()=>{closeF();openForm('onb',p);toast('Profil reçu : vérifie et valide');};
  if(Object.keys(S.logs||{}).length&&prof())askConfirm('Remplacer ton profil actuel par celui de '+(p.name||'ton ami')+' ?',go);else go();
  return true;}

 Object.assign(A,{
  profMe:()=>openForm('me',prof()),
  profFriend:()=>openForm('friend'),
  profOff:()=>askConfirm('Revenir au programme de base ? Tes charges et ton historique restent.',()=>{revert();toast('Programme de base rétabli');}),
  profImport:()=>openOnb()
 });
 const _boot=boot;
 boot=function(){_boot.apply(this,arguments);setTimeout(()=>{try{if(fromHash())return;
  if(!S.set.onb&&!S.set.prof){if(Object.keys(S.logs||{}).length)S.set.onb=1;else openOnb();}}catch(e){console.warn('profils',e);}},900);};

 /* ---------- carte dans Réglages ---------- */
 const _vs=VIEWS.set;
 VIEWS.set=function(){let h=_vs();const p=prof();
  const g=p?(GOALS.find(x=>x[0]===p.goal)||[])[1]:'';
  const card='<div class="card"><h3 class="d">Mon profil &amp; amis</h3>'
   +(p?'<div class="sub" style="margin-bottom:8px"><b>'+esc(p.name||'Profil')+'</b> · '+esc(g)+' · '+esc((LEVELS.find(x=>x[0]===p.level)||[])[1]||'')+' · '+p.days.length+' jours · '+p.dur+' min max'+(p.zones.length?' · à ménager : '+esc(p.zones.join(', ')):'')+'</div><div class="row wrap" style="gap:6px;margin-bottom:10px"><button class="btn sm" data-a="profMe">Modifier mon profil</button><button class="btn ghost sm" data-a="profOff">Programme de base</button><button class="btn ghost sm" data-a="profImport">Importer un code</button></div>'
     :'<div class="sub" style="margin-bottom:8px">Programme de base actif. Crée un profil pour que l\'app compose ta semaine selon tes jours, ta durée et tes zones à ménager.</div><div class="row wrap" style="gap:6px;margin-bottom:10px"><button class="btn sm" data-a="profMe">Créer mon profil</button><button class="btn ghost sm" data-a="profImport">Importer un code</button></div>')
   +'<div class="sub" style="margin-bottom:6px">Pour partager l\'app : remplis les contraintes d\'un ami, envoie-lui le lien. Chacun garde ses propres données sur son téléphone.</div>'
   +'<div class="row wrap" style="gap:6px"><button class="btn sm" data-a="profFriend">Inviter un ami</button></div></div>';
  const k1='<div class="card"><h3 class="d">Garmin via',k2='<div class="card"><h3 class="d">Sauvegarde</h3>';
  return h.includes(k1)?h.replace(k1,card+k1):h.includes(k2)?h.replace(k2,card+k2):h+card;};
 window.hxProfile={plan:plan,clean:clean,code:codeOf,decode:dec,apply:apply,safety:safety};
})();
