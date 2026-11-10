/* ===================== AJOUT D'EXERCICE + SUPERSET + INTERVALS.ICU ===================== */
(function(){
 /* clones : permettre le même exo plusieurs fois (id~xxx) */
 const clonable=(O,mk)=>Object.setPrototypeOf(O,new Proxy(Object.prototype,{get(t,k){if(typeof k==='string'&&k.indexOf('~')>0){const b=k.slice(0,k.indexOf('~'));const src=O[b];if(src!==undefined){const v=mk(src,b,k);Object.defineProperty(O,k,{value:v,writable:true,configurable:true,enumerable:false});return v;}}return Reflect.get(t,k);},has(t,k){if(typeof k==='string'&&k.indexOf('~')>0)return O[k]!==undefined;return Reflect.has(t,k);}}));
 clonable(EX,(s,b)=>Object.assign({},s,{lg:s.lg||b}));
 clonable(ALT,s=>s);
 clonable(PAT_DEFAULT,s=>s);
 const addList=d=>((S.logs[d]&&S.logs[d].add)||[]);
 const isAdded=(d,id)=>addList(d).some(a=>a.id===id);
 const _so=soirOf;
 soirOf=function(P,d){const r=_so(P,d);if(!r)return r;const ad=addList(d);if(!ad.length)return r;
  const blocks=r.blocks.map(b=>({n:b.n,ex:b.ex.slice()}));
  ad.forEach(a=>{if(!EX[a.id]||blocks.some(b=>b.ex.includes(a.id)))return;let bi=blocks.findIndex(b=>b.ex.includes(a.after));if(bi<0){bi=blocks.length-1;for(let i=blocks.length-1;i>=0;i--){if(!blocks[i].ex.every(x=>/^cz-/.test(x))){bi=i;break;}}}const b=blocks[bi],p=b.ex.indexOf(a.after);b.ex.splice(p<0?b.ex.length:p+1,0,a.id);});
  return Object.assign({},r,{blocks});};
 /* bouton sous chaque exercice */
 const _ec=exCard;
 exCard=function(id,d){let h=_ec(id,d);let ok=false;try{ok=!!soirOf(progOf(d),d);}catch(e){}
  if(!ok)return h;
  return h+'<div class="row wrap" style="gap:6px;margin:-2px 0 10px"><button class="btn ghost sm" data-a="addex" data-d="'+d+'" data-id="'+id+'">＋ Ajouter un exo après</button>'+(isAdded(d,id)?'<button class="btn ghost sm" style="color:var(--ember)" data-a="addrm" data-d="'+d+'" data-id="'+id+'">✕ Retirer cet exo</button>':'')+'</div>';};
 /* sélecteur */
 function pickList(){const out=[];Object.keys(PAT_DEFAULT).forEach(id=>{const e=EX[id];if(!e||/^cz-/.test(id))return;if(e.kind&&e.kind!=='lift'&&e.kind!=='time')return;out.push({id:id,name:e.name,m:e.m||'Autre'});});
  const seen={};return out.filter(x=>{const k=x.name+'|'+x.m;if(seen[k])return false;seen[k]=1;return true;});}
 function closePick(){const o=document.getElementById('pickov');if(o)o.remove();}
 function openPick(d,after){closePick();const all=pickList(),ms=['Tous'].concat([...new Set(all.map(x=>x.m))].sort());
  const o=document.createElement('div');o.id='pickov';o.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center';
  const afn=after&&EX[after]?EX[after].name:'';
  o.innerHTML='<div style="background:var(--panel);width:100%;max-width:560px;max-height:88vh;border-radius:18px 18px 0 0;padding:16px;display:flex;flex-direction:column;gap:10px"><div class="row" style="justify-content:space-between;align-items:center"><b style="font-size:16px">Ajouter un exercice</b><button class="btn ghost sm" id="pkx">Fermer</button></div>'+(afn?'<div class="sub">Il sera placé juste après : <b>'+esc(afn)+'</b></div>':'')+'<input class="inp" id="pkq" placeholder="Rechercher (triceps, poulie, curl…)"><div class="row wrap" id="pkm" style="gap:6px"></div><label class="sub" style="display:flex;gap:8px;align-items:center"><input type="checkbox" id="pkss" checked> Enchaîner en superset (sans repos) avec l\'exo du dessus</label><div id="pkl" style="overflow:auto;display:flex;flex-direction:column;gap:6px;min-height:120px"></div></div>';
  document.body.appendChild(o);let mf='Tous';
  const draw=()=>{const q=o.querySelector('#pkq').value.toLowerCase();o.querySelector('#pkm').innerHTML=ms.map(m=>'<button class="chip'+(m===mf?' on':'')+'" data-m="'+esc(m)+'">'+esc(m)+'</button>').join('');
   o.querySelector('#pkl').innerHTML=all.filter(x=>(mf==='Tous'||x.m===mf)&&(!q||(x.name+' '+x.m).toLowerCase().includes(q))).map(x=>'<button class="btn ghost" style="text-align:left;justify-content:flex-start" data-id="'+x.id+'">'+esc(x.name)+' <span class="sub" style="margin-left:6px">'+esc(x.m)+'</span></button>').join('')||'<div class="sub">Aucun résultat</div>';};
  draw();o.addEventListener('click',e=>{if(e.target===o||e.target.id==='pkx'){closePick();return;}const m=e.target.closest('[data-m]');if(m){mf=m.dataset.m;draw();return;}const b=e.target.closest('#pkl [data-id]');if(b)doAdd(d,after,b.dataset.id,o.querySelector('#pkss').checked);});
  o.querySelector('#pkq').addEventListener('input',draw);}
 function doAdd(d,after,base,ss){const L=S.logs[d]=S.logs[d]||{};L.add=L.add||[];
  const SO=soirOf(progOf(d),d);const inSess=SO&&SO.blocks.some(b=>b.ex.includes(base));
  const id=inSess?base+'~'+Date.now().toString(36):base;
  L.add.push({id:id,after:after,ss:!!ss});
  if(ss&&after&&ssOk(after,id)){L.ss=L.ss||[];if(!L.ss.includes(after))L.ss.push(after);}
  save();closePick();render(true);toast(EX[id].name+' ajouté'+(inSess?' (2e fois : change la variante dans le menu)':''));}
 Object.assign(A,{
  addex:d=>openPick(d.d,d.id),
  addrm:d=>{const L=S.logs[d.d];if(!L||!L.add)return;const a=L.add.find(x=>x.id===d.id);L.add=L.add.filter(x=>x.id!==d.id);L.add.forEach(x=>{if(x.after===d.id)x.after=a?a.after:x.after;});
   if(L.ss){L.ss=L.ss.filter(x=>x!==d.id);if(a&&a.ss&&!L.add.some(x=>x.after===a.after&&x.ss)&&!(SOnext(d.d,a.after)))L.ss=L.ss.filter(x=>x!==a.after);}
   const e=getEx(d.d,d.id);if(e&&!isDone(e))delete L.ex[d.id];save();render(true);toast('Exercice retiré');}});
 function SOnext(d,id){return false;}
 /* ---------- Intervals.icu ---------- */
 const CK='hx_icu';
 const cfg=()=>{try{return JSON.parse(localStorage.getItem(CK)||'{}');}catch(e){return{};}};
 const setCfg=o=>{try{localStorage.setItem(CK,JSON.stringify(Object.assign(cfg(),o)));}catch(e){}};
 function lineFor(d,id){const it=itFor(d,id);
  if(it.kind==='lift'||it.kind==='time'){try{const isT=it.kind==='time',tg=isT?timeTarget(it,d):liftTarget(it,d);const n=setsFor(it,d);
    if(isT)return '• '+it.name+' — '+n+' × '+(tg.t||'')+' s';
    const r=it.reps||[8,10];const w=tg.w;return '• '+it.name+' — '+n+' × '+r[0]+(r[1]!==r[0]?'–'+r[1]:'')+(w?' @ '+fmtW(w)+' '+(it.unit||'kg'):'')+(it.rest?' · repos '+it.rest+' s':'');}catch(e){}}
  return '• '+it.name+(it.txt?' — '+it.txt:'');}
 function icuDesc(d,SO){const out=[];SO.blocks.forEach(b=>{out.push(b.n);ssGroups(d,b.ex).forEach(g=>{if(g.length>1)out.push('⛓ '+ssLabel(g.length)+' : '+g.map(x=>itFor(d,x).name).join(' + '));g.forEach(x=>out.push(lineFor(d,x)));});out.push('');});
  if(SO.note)out.push(SO.note);return out.join('\n').trim();}
 function icuEvents(n){const ev=[];const ds=Array.isArray(n)?n:Array.from({length:n},(_,i)=>addDays(today(),i));for(const d of ds){let P,SO;try{P=progOf(d);SO=soirOf(P,d);}catch(e){continue;}if(!SO||!SO.blocks||!SO.blocks.length)continue;
   const ids=SO.blocks.flatMap(b=>b.ex),run=window.RN_STEPS&&ids.length&&ids.every(x=>window.RN_STEPS[x]);ev.push({category:'WORKOUT',type:run?'Run':'WeightTraining',start_date_local:d+'T18:30:00',name:SO.title,description:run?ids.map(x=>window.RN_STEPS[x]).join('\n'):icuDesc(d,SO),moving_time:(SO.min||60)*60,external_id:'hx-'+d});}
  return ev;}
 let busy=false;
 async function icuPush(n,quiet){const c=cfg();if(!c.key){if(!quiet)toast('Renseigne ta clé API Intervals.icu dans Réglages');return false;}
  if(busy)return false;busy=true;
  try{const ev=icuEvents(n||10);if(!ev.length){if(!quiet)toast('Aucune séance à envoyer');return false;}
   const body=JSON.stringify(ev);if(quiet&&c.hash===body.length+':'+hashS(body)&&Date.now()-(c.last||0)<6*3600e3)return true;
   const r=await fetch('https://intervals.icu/api/v1/athlete/'+encodeURIComponent(c.id||'0')+'/events/bulk?upsert=true',{method:'POST',headers:{'Authorization':'Basic '+btoa('API_KEY:'+c.key),'Content-Type':'application/json'},body:body});
   if(!r.ok){const t=await r.text().catch(()=>'');throw new Error(r.status===401||r.status===403?'clé ou ID Intervals.icu refusé':('erreur '+r.status+' '+t.slice(0,80)));}
   setCfg({last:Date.now(),hash:body.length+':'+hashS(body)});if(!quiet)toast(ev.length+' séance(s) envoyée(s) à Intervals.icu ✓');renderIcuState();return true;}
  catch(e){if(!quiet)toast('Intervals.icu : '+(e.message==='Failed to fetch'?'connexion bloquée (réseau ou page non autorisée)':e.message));return false;}
  finally{busy=false;}}
 function hashS(s){let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return h;}
 function renderIcuState(){const el=document.getElementById('icust');if(!el)return;const c=cfg();el.textContent=c.last?'Dernier envoi : '+new Date(c.last).toLocaleString('fr-FR'):'Jamais envoyé';}
 Object.assign(A,{
  icuSave:()=>{const id=(document.getElementById('icuid').value||'').trim(),k=(document.getElementById('icukey').value||'').trim();const o={id:id};if(k&&!/^•+$/.test(k))o.key=k;setCfg(o);toast('Enregistré sur cet appareil');render(true);},
  icuAuto:()=>{setCfg({auto:!cfg().auto});render(true);},
  icuSend:()=>{icuPush(cfg().range===1?1:10,false);},
  icuDel:()=>{try{localStorage.removeItem(CK);}catch(e){}render(true);toast('Clé effacée');},
  icuCopy:()=>{const d=today(),SO=soirOf(progOf(d),d);if(!SO){toast('Pas de séance aujourd\'hui');return;}const t=SO.title+'\n\n'+icuDesc(d,SO);
   if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(()=>toast('Séance copiée — colle-la dans Intervals.icu')).catch(()=>toast('Copie impossible'));else toast('Copie impossible');}});

 Object.assign(A,{
  icuRange:d=>{setCfg({range:+d.n,hash:''});render(true);},
  icuDay:async d=>{const c=cfg();if(!c.key){toast('Renseigne ta clé API dans Réglages');return;}const ev=icuEvents([d.d]);if(!ev.length){toast('Aucune séance ce jour-là');return;}
   try{const r=await fetch('https://intervals.icu/api/v1/athlete/'+encodeURIComponent(c.id||'0')+'/events/bulk?upsert=true',{method:'POST',headers:{'Authorization':'Basic '+btoa('API_KEY:'+c.key),'Content-Type':'application/json'},body:JSON.stringify(ev)});
    if(!r.ok)throw new Error(r.status===401||r.status===403?'clé ou ID refusé':'erreur '+r.status);toast('Séance envoyée sur ta montre ⌚ (via Intervals.icu)');}catch(e){toast('Intervals.icu : '+(e.message==='Failed to fetch'?'connexion bloquée':e.message));}},
  icuRm:async d=>{const c=cfg();if(!c.key){toast('Renseigne ta clé API dans Réglages');return;}
   try{const r=await fetch('https://intervals.icu/api/v1/athlete/'+encodeURIComponent(c.id||'0')+'/events/bulk-delete',{method:'PUT',headers:{'Authorization':'Basic '+btoa('API_KEY:'+c.key),'Content-Type':'application/json'},body:JSON.stringify([{external_id:'hx-'+d.d}])});
    if(!r.ok)throw new Error('erreur '+r.status);setCfg({hash:''});toast('Séance retirée d\'Intervals.icu');}catch(e){toast('Intervals.icu : '+(e.message==='Failed to fetch'?'connexion bloquée':e.message));}}});
 const _vs=VIEWS.set;
 VIEWS.set=function(){let h=_vs();const c=cfg();
  const card='<div class="card"><h3 class="d">Garmin via Intervals.icu</h3><div class="sub" style="margin-bottom:8px">Envoie tes séances à venir (10 jours) dans le calendrier Intervals.icu, qui les pousse sur ta montre Garmin si la synchro Garmin est activée dans Intervals.icu (Settings ▸ Garmin). Clé : Intervals.icu ▸ Settings ▸ Developer Settings ▸ API key. Elle reste uniquement sur cet appareil.</div>'
   +'<div class="row" style="gap:6px;margin-bottom:6px"><input class="inp" id="icuid" placeholder="ID athlète (ex : i123456) — facultatif" value="'+esc(c.id||'')+'"></div>'
   +'<div class="row" style="gap:6px;margin-bottom:8px"><input class="inp" id="icukey" type="password" placeholder="Clé API" value="'+(c.key?'••••••••••':'')+'"><button class="btn sm" data-a="icuSave">OK</button>'+(c.key?'<button class="btn ghost sm" data-a="icuDel">Effacer</button>':'')+'</div>'
   +'<div class="sub" style="margin-bottom:4px">Quoi envoyer :</div><div class="row wrap" style="gap:6px;margin-bottom:8px"><button class="chip'+(c.range===1?' on':'')+'" data-a="icuRange" data-n="1">Aujourd\'hui seulement</button><button class="chip'+(c.range!==1?' on':'')+'" data-a="icuRange" data-n="10">10 prochains jours</button></div>'
   +'<div class="row wrap" style="gap:6px"><button class="chip'+(c.auto?' on':'')+'" data-a="icuAuto">Envoi automatique</button><button class="btn sm" data-a="icuSend">Envoyer maintenant</button><button class="btn ghost sm" data-a="icuCopy">Copier la séance du jour</button></div>'
   +'<div class="sub" id="icust" style="margin-top:8px">'+(c.last?'Dernier envoi : '+esc(new Date(c.last).toLocaleString('fr-FR')):'Jamais envoyé')+'</div></div>';
  const k='<div class="card"><h3 class="d">Sauvegarde</h3>';return h.includes(k)?h.replace(k,card+k):h+card;};
 /* envoi auto : à l'ouverture et après modification de la séance */
 let tm=null;const _sv=save;save=function(){const r=_sv.apply(this,arguments);try{if(cfg().auto&&cfg().key){clearTimeout(tm);tm=setTimeout(()=>icuPush(cfg().range===1?1:10,true),20000);}}catch(e){}return r;};
 setTimeout(()=>{try{if(cfg().auto&&cfg().key)icuPush(cfg().range===1?1:10,true);}catch(e){}},4000);
})();
