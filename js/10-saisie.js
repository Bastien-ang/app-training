/* ===================== SAISIE ERGONOMIQUE ===================== */
function stpIn(f,id,d,i,ph,val,mode){const a=' data-id="'+id+'" data-d="'+d+'" data-n="'+i+'" data-f="'+f+'"';
 return'<div class="stp"><button type="button" class="sb" data-a="stp" data-dir="-1"'+a+'>−</button><input class="inp" inputmode="'+mode+'" placeholder="'+ph+'" value="'+(val!==undefined?esc(val):'')+'" data-i="set"'+a+'><button type="button" class="sb" data-a="stp" data-dir="1"'+a+'>+</button></div>';}
function exAllDone(d,id){const it=itFor(d,id),e=getEx(d,id)||{sets:[]};
 if(it.kind==='lift'||it.kind==='time'){const n=setsFor(it,d);let c=0;(e.sets||[]).forEach(s=>{if(s&&s.d)c++;});return c>=n&&n>0;}
 return !!e.d;}
function exProg(d,id){const it=itFor(d,id),e=getEx(d,id)||{sets:[]};
 if(it.kind==='lift'||it.kind==='time'){const n=Math.max(setsFor(it,d),(e.sets||[]).length);let c=0;(e.sets||[]).forEach(s=>{if(s&&s.d)c++;});return[c,n];}
 return[e.d?1:0,1];}
function sessProg(d,SO){let a=0,b=0;SO.blocks.forEach(bl=>bl.ex.forEach(id=>{const p=exProg(d,id);a+=p[0];b+=p[1];}));return[a,b];}
function fillEx(d,id){const it=itFor(d,id),e=ensureEx(d,it);
 if(it.kind==='lift'||it.kind==='time'){const isT=it.kind==='time',tg=isT?timeTarget(it,d):liftTarget(it,d);const n=Math.max(setsFor(it,d),e.sets.length);dense(e.sets,n-1);
  for(let i=0;i<n;i++){const s=e.sets[i];if(s.d)continue;if(s.w===undefined||s.w==='')s.w=isT?String(Math.round(tg.t)):String(tg.w);if(!isT&&(s.r===undefined||s.r===''))s.r=String(tg.r);s.d=true;}}
 else if(!e.d){const tg=it.kind==='carry'||it.kind==='station'?loadTarget(it,d):null;if(it.kind==='carry'&&(e.v===undefined||e.v===''))e.v=String(tg.w);if(it.kind==='station'&&it.base!==undefined&&(e.v===undefined||e.v===''))e.v=String(tg.w);e.d=true;}}
