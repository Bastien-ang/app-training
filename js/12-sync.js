/* ===================== SYNC optionnelle (capacité db de l'artefact) : sauvegarde + téléphone/ordinateur ===================== */
const SY={col:null,timer:null,busy:false,on:false,hs:{},ts:{}};
const SY_KEYS=['logs','acts','ready','nutri','skip'];
function syChunks(){const c={},meta={weights:S.weights,subs:S.subs,set:S.set};c.meta=meta;
 SY_KEYS.forEach(k=>{const o=S[k]||{};Object.keys(o).forEach(d=>{const m=d.slice(0,7);(c[m]=c[m]||{});(c[m][k]=c[m][k]||{})[d]=o[d];});});return c;}
function syApply(id,o){if(id==='meta'){if(o.weights)S.weights=o.weights;if(o.subs)S.subs=o.subs;if(o.set)S.set=Object.assign(defState().set,o.set);return;}
 SY_KEYS.forEach(k=>{S[k]=S[k]||{};Object.keys(S[k]).forEach(d=>{if(d.slice(0,7)===id)delete S[k][d];});Object.assign(S[k],(o[k]||{}));});}
function scheduleSync(){if(!SY.on)return;clearTimeout(SY.timer);SY.timer=setTimeout(syPush,1800);}
async function syPush(){if(!SY.on||SY.busy)return;SY.busy=true;
 try{const ch=syChunks();for(const id of Object.keys(ch)){const j=JSON.stringify(ch[id]);if(SY.hs[id]===j)continue;const t=Date.now();await SY.col.doc(id).set({t:t,j:j});SY.hs[id]=j;SY.ts[id]=t;}
  const el=document.getElementById('sv');if(el&&saveOK){el.textContent=el.textContent.replace(/ ☁$/,'')+' ☁';}}
 catch(e){console.warn('sync',e&&e.code);}SY.busy=false;}
async function initSync(){try{if(!window.claude||!claude.use)return;const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);if(!db||!user)return;const uid=await user.id();if(!uid)return;
 SY.col=db.doc('data/users/'+uid+'/hx').collection('c');
 const snap=await SY.col.get();const local=syChunks();let adopted=false;
 let lastEdit=0;try{lastEdit=+localStorage.getItem('hyrox_lastedit')||0;}catch(e){}
 snap.docs.forEach(d=>{const r=d.data();if(!r||!r.j)return;const id=d.id;const lj=JSON.stringify(local[id]||{});
  SY.hs[id]=r.j;SY.ts[id]=r.t;
  if(lj===r.j)return;
  if(r.t>lastEdit){try{syApply(id,JSON.parse(r.j));adopted=true;SY.hs[id]=r.j;}catch(e){}}else{delete SY.hs[id];}});
 SY.on=true;
 if(adopted){H=null;try{localStorage.setItem(LS_KEY,JSON.stringify(S));}catch(e){}render(true);toast('Données synchronisées ☁');}
 syPush();}catch(e){console.warn('sync init',e&&(e.code||e.message));}}
