/* ===================== DONNÉES : protection à chaque mise à jour + synchro en ligne (Gist GitHub privé) ===================== */
(function(){
 const APPV='2026-11-12a';              // change à chaque mise à jour de l'app -> copie de sécurité automatique
 const BK='hx_bak', CL='hx_cloud', FILE='training-data.json', DESC='training-app-data';
 const SEC=['logs','acts','ready','nutri','skip'];
 const lsGet=k=>{try{return localStorage.getItem(k);}catch(e){return null;}};
 const lsSet=(k,v)=>{try{localStorage.setItem(k,v);return true;}catch(e){return false;}};
 const cfg=()=>{try{return JSON.parse(lsGet(CL)||'{}');}catch(e){return{};}};
 const setCfg=o=>lsSet(CL,JSON.stringify(Object.assign(cfg(),o)));

 /* ---------- 1. Chargement blindé + migrations ---------- */
 const MIG={};                           // MIG[n]=fn(S) : fait passer l'état de la version n à n+1 (vide pour l'instant)
 function normalize(){
  const d=defState();
  ['logs','ready','nutri','acts','subs','skip'].forEach(k=>{if(!S[k]||typeof S[k]!=='object'||Array.isArray(S[k]))S[k]={};});
  if(!Array.isArray(S.weights))S.weights=[];
  S.set=Object.assign(d.set,S.set||{});
  if(!S._t||typeof S._t!=='object')S._t={};
  let v=S.v||1;while(MIG[v]){try{MIG[v](S);}catch(e){}v++;}
  S.v=Math.max(v,d.v);
 }
 const bakList=()=>{try{const l=JSON.parse(lsGet(BK)||'[]');return Array.isArray(l)?l:[];}catch(e){return[];}};
 function snapshot(why,force){
  try{const raw=JSON.stringify(S);const L=bakList(),now=Date.now(),last=L[L.length-1];
   if(last&&last.s===raw)return;
   if(!force&&last&&now-last.t<6*3600e3)return;
   L.push({t:now,w:why||'auto',s:raw});
   let keep=L.slice(-5);
   while(keep.length&&!lsSet(BK,JSON.stringify(keep)))keep=keep.slice(1);
  }catch(e){}
 }
 load=function(){
  const raw=lsGet(LS_KEY);
  if(raw){
   try{const o=JSON.parse(raw);if(!o||typeof o!=='object')throw new Error('format');S=Object.assign(defState(),o);normalize();}
   catch(e){
    lsSet('hx_corrupt',raw);                       // on ne perd jamais l'original
    const L=bakList();let ok=false;
    for(let i=L.length-1;i>=0&&!ok;i--){try{S=Object.assign(defState(),JSON.parse(L[i].s));normalize();ok=true;}catch(_){}}
    if(!ok){S=defState();normalize();}
    window.__restoredMsg=ok?'Données restaurées depuis la dernière copie de sécurité':'Données illisibles : copie conservée dans le stockage';
   }
  }else{S=defState();normalize();}
 };

 /* ---------- 2. Horodatage par entrée (sert à fusionner sans rien écraser) ---------- */
 const cache={};let inited=false;
 function curMap(){const c={};
  SEC.forEach(k=>{const o=S[k]||{};Object.keys(o).forEach(d=>{c[k+'|'+d]=JSON.stringify(o[d]);});});
  c.weights=JSON.stringify(S.weights);c.subs=JSON.stringify(S.subs);c.set=JSON.stringify(S.set);return c;}
 function stamp(){
  if(!inited)return;
  if(!S._t||typeof S._t!=='object')S._t={};
  const cur=curMap(),now=Date.now();
  Object.keys(cur).forEach(k=>{if(cache[k]!==cur[k]){S._t[k]=now;cache[k]=cur[k];}else if(!(k in S._t))S._t[k]=1;});
  Object.keys(cache).forEach(k=>{if(!(k in cur)){S._t[k]=now;delete cache[k];}});     // suppression = pierre tombale
 }
 function getVal(key){
  if(key==='weights')return S.weights;if(key==='subs')return S.subs;if(key==='set')return S.set;
  const i=key.indexOf('|'),k=key.slice(0,i),d=key.slice(i+1),o=S[k];return o&&Object.prototype.hasOwnProperty.call(o,d)?o[d]:null;}
 function setVal(key,val){
  if(key==='weights'){S.weights=Array.isArray(val)?val:[];return;}
  if(key==='subs'){S.subs=val&&typeof val==='object'?val:{};return;}
  if(key==='set'){S.set=Object.assign(defState().set,val||{});return;}
  const i=key.indexOf('|'),k=key.slice(0,i),d=key.slice(i+1);S[k]=S[k]||{};if(val===null||val===undefined)delete S[k][d];else S[k][d]=val;}
 function payload(){const v={};Object.keys(S._t).forEach(k=>{v[k]=getVal(k);});return JSON.stringify({app:'training',ver:1,t:S._t,v:v});}

 /* ---------- 3. Synchro Gist ---------- */
 const API='https://api.github.com';
 const hd=tok=>({'Authorization':'Bearer '+tok,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'});
 let busy=false,again=false,lastRun=0,timer=null;
 async function call(tok,method,path,body){
  const r=await fetch(API+path,{method:method,headers:Object.assign(hd(tok),body?{'Content-Type':'application/json'}:{}),body:body?JSON.stringify(body):undefined});
  if(r.status===401||r.status===403){const e=new Error('Jeton GitHub refusé (droit « gist » manquant ou expiré)');e.code=401;throw e;}
  if(r.status===404){const e=new Error('introuvable');e.code=404;throw e;}
  if(!r.ok)throw new Error('GitHub '+r.status);
  return r.json();
 }
 async function findOrCreate(tok){
  const l=await call(tok,'GET','/gists?per_page=100');
  const g=l.find(x=>x.description===DESC&&x.files&&x.files[FILE]);
  if(g)return g.id;
  const c=await call(tok,'POST','/gists',{description:DESC,public:false,files:{[FILE]:{content:payload()}}});
  return c.id;
 }
 async function fetchRemote(tok,gid){
  const g=await call(tok,'GET','/gists/'+gid);
  const f=g.files&&g.files[FILE];if(!f)return null;
  let txt=f.content;if(f.truncated||txt==null){const r=await fetch(f.raw_url);txt=await r.text();}
  const o=JSON.parse(txt);return o&&o.t&&o.v?o:null;
 }
 function persist(){lsSet(LS_KEY,JSON.stringify(S));}
 async function sync(manual){
  const c=cfg();if(!c.tok||!inited)return;
  if(busy){again=true;return;}
  busy=true;lastRun=Date.now();
  try{
   let gid=c.gid;
   if(!gid){gid=await findOrCreate(c.tok);setCfg({gid:gid});}
   let remote;
   try{remote=await fetchRemote(c.tok,gid);}
   catch(e){if(e.code===404){gid=await findOrCreate(c.tok);setCfg({gid:gid});remote=await fetchRemote(c.tok,gid);}else throw e;}
   stamp();
   const rt=remote?remote.t:{},rv=remote?remote.v:{};
   let changed=0,push=!remote;
   const keys=new Set(Object.keys(S._t).concat(Object.keys(rt)));
   const plan=[];
   keys.forEach(k=>{
    const tl=S._t[k]||0,tr=rt[k]||0;
    if(tr>tl)plan.push(k);
    else if(tl>tr)push=true;
    else if(remote){
     const a=JSON.stringify(getVal(k)),b=JSON.stringify(rv[k]===undefined?null:rv[k]);
     if(a!==b){if(b.length>a.length)plan.push(k);else{S._t[k]=Date.now();push=true;}}
    }
   });
   if(plan.length)snapshot('avant synchro',true);
   plan.forEach(k=>{setVal(k,rv[k]===undefined?null:rv[k]);S._t[k]=rt[k]||S._t[k]||1;const nv=getVal(k);
    if(nv===null||nv===undefined)delete cache[k];else cache[k]=JSON.stringify(nv);changed++;});
   if(changed){normalize();persist();H=null;try{render(true);}catch(e){}toast('Données synchronisées ☁');}
   else if(push)persist();
   if(push)await call(c.tok,'PATCH','/gists/'+gid,{files:{[FILE]:{content:payload()}}});
   setCfg({last:Date.now(),err:''});
   const el=document.getElementById('sv');if(el&&saveOK){el.textContent=el.textContent.replace(/ ☁$/,'')+' ☁';}
   uiState();
  }catch(e){
   setCfg({err:e&&e.message==='Failed to fetch'?'hors ligne (sera réessayé)':(e&&e.message)||'erreur'});
   if(manual)toast('Synchro : '+((e&&e.message==='Failed to fetch')?'pas de connexion':e.message));
   uiState();
  }finally{busy=false;if(again){again=false;soon(3000);}}
 }
 function soon(ms){if(!cfg().tok)return;clearTimeout(timer);timer=setTimeout(()=>sync(false),ms||4000);}
 function uiState(){const el=document.getElementById('clst');if(!el)return;const c=cfg();
  el.textContent=c.err?'⚠ '+c.err:(c.last?'Dernière synchro : '+new Date(c.last).toLocaleString('fr-FR'):'Pas encore synchronisé');}

 /* ---------- 4. Branchements ---------- */
 const _save=save;
 save=function(){try{stamp();}catch(e){}const r=_save.apply(this,arguments);try{snapshot('auto',false);soon(4000);}catch(e){}return r;};
 const _boot=boot;
 boot=function(){
  _boot.apply(this,arguments);
  try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist();}catch(e){}
  try{
   normalize();
   const pv=lsGet('hx_appv');if(pv!==APPV){snapshot('maj',true);lsSet('hx_appv',APPV);}
   Object.assign(cache,curMap());Object.keys(cache).forEach(k=>{if(!(k in S._t))S._t[k]=1;});inited=true;
   if(window.__restoredMsg)setTimeout(()=>toast(window.__restoredMsg),800);
  }catch(e){console.warn('donnees',e);}
  setTimeout(()=>sync(false),2500);
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&Date.now()-lastRun>20000)sync(false);});
  window.addEventListener('online',()=>sync(false));
 };

 /* ---------- 5. Interface (Réglages) ---------- */
 const when=t=>new Date(t).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
 Object.assign(A,{
  clSave:()=>{const v=(document.getElementById('cltok').value||'').trim();if(!v){toast('Colle ton jeton GitHub');return;}
   setCfg({tok:v,gid:'',err:''});toast('Connexion…');render(true);sync(true).then(()=>render(true));},
  clNow:()=>{sync(true);},
  clOff:()=>askConfirm('Déconnecter la synchro ? Tes données restent sur cet appareil et dans le Gist en ligne.',()=>{lsSet(CL,'{}');render(true);}),
  bakRestore:d=>{const L=bakList();const b=L[+d.i];if(!b)return;
   askConfirm('Restaurer la copie du '+when(b.t)+' ? L\'état actuel est d\'abord mis de côté.',()=>{
    snapshot('avant restauration',true);
    try{S=Object.assign(defState(),JSON.parse(b.s));normalize();save();H=null;render(true);toast('Copie restaurée');}catch(e){toast('Copie illisible');}});}
 });
 const _vs=VIEWS.set;
 VIEWS.set=function(){let h=_vs();const c=cfg(),L=bakList();
  const card='<div class="card"><h3 class="d">Synchro en ligne</h3>'
   +'<div class="sub" style="margin-bottom:8px">Garde toutes tes données (charges, séances modifiées, exos ajoutés) en ligne dans un Gist GitHub <b>secret</b> à toi, et les met à jour automatiquement entre iPhone, Safari et ordinateur. Aucune mise à jour de l\'app ne les efface. Crée un jeton : github.com ▸ Settings ▸ Developer settings ▸ Personal access tokens ▸ <b>Tokens (classic)</b>, coche seulement <b>gist</b>. Colle le même jeton sur chaque appareil.</div>'
   +(c.tok?'<div class="row wrap" style="gap:6px"><button class="btn sm" data-a="clNow">Synchroniser maintenant</button><button class="btn ghost sm" data-a="clOff">Déconnecter</button></div><div class="sub" id="clst" style="margin-top:8px">'+esc(c.err?'⚠ '+c.err:(c.last?'Dernière synchro : '+new Date(c.last).toLocaleString('fr-FR'):'Pas encore synchronisé'))+'</div>'
    :'<div class="row" style="gap:6px"><input class="inp" id="cltok" type="password" placeholder="Jeton GitHub (ghp_…)"><button class="btn sm" data-a="clSave">OK</button></div>')
   +'<div class="sub" style="margin:10px 0 6px">Copies de sécurité automatiques (sur cet appareil) :</div>'
   +(L.length?'<div class="row wrap" style="gap:6px">'+L.map((b,i)=>'<button class="chip" data-a="bakRestore" data-i="'+i+'">'+esc(when(b.t))+(b.w==='maj'?' · maj':'')+'</button>').reverse().join('')+'</div>':'<div class="sub">Aucune pour l\'instant.</div>')
   +'</div>';
  const k='<div class="card"><h3 class="d">Sauvegarde</h3>';return h.includes(k)?h.replace(k,card+k):h+card;};
})();
