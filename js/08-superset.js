/* ===================== BISETS / SUPERSETS / TRISETS ===================== */
const ssList=d=>{const L=S.logs[d];return(L&&L.ss)||[];};
function ssGroups(d,ids){const ss=ssList(d),g=[];let cur=[];ids.forEach((id,i)=>{cur.push(id);if(!(ss.includes(id)&&i<ids.length-1)){g.push(cur);cur=[];}});if(cur.length)g.push(cur);return g;}
const ssLift=id=>!EX[id].kind||EX[id].kind==='lift';
const ssOk=(a,b)=>ssLift(a)&&ssLift(b);
const ssLabel=n=>n===2?'BISET':n===3?'TRISET':'CIRCUIT';
function ssBtn(d,id,linked){return'<button class="ssb'+(linked?' on':'')+'" data-a="sslink" data-d="'+d+'" data-id="'+id+'">'+(linked?'⛓ Dissocier':'⛓ Enchaîner avec le suivant')+'</button>';}
function ssBlock(ids,d){const g=ssGroups(d,ids);let h='';
 g.forEach((grp,gi)=>{let inner='';grp.forEach((x,i)=>{inner+=exCard(x,d);if(i<grp.length-1)inner+=ssBtn(d,x,true);});
  if(grp.length>1)h+='<div class="ssg"><div class="ssh">'+ssLabel(grp.length)+' · '+grp.map(x=>esc(itFor(d,x).name)).join(' → ')+'</div><div class="sub" style="margin:0 0 6px">Une série de chaque exercice sans repos, puis repos complet. Répète pour toutes les séries.</div>'+inner+'</div>';
  else h+=inner;
  if(gi<g.length-1){const a=grp[grp.length-1],b=g[gi+1][0];if(ssOk(a,b))h+=ssBtn(d,a,false);}});
 return h;}
function ssBar(d,SO){const has=ssList(d).length>0;
 return'<div class="ssbar"><div class="sub" style="flex:1"><b>Biset / superset</b> : enchaîne 2 exercices sans repos, puis repose-toi. Gain de temps et plus d\'intensité.</div><button class="btn ghost sm" data-a="sssuggest" data-d="'+d+'">Proposer</button>'+(has?'<button class="btn ghost sm" data-a="ssclear" data-d="'+d+'">Tout retirer</button>':'')+'</div>';}
const SS_ANTA=[['Pecs','Dos'],['Biceps','Triceps']];
function ssPair(a,b){if(!ssOk(a,b))return false;const A=EX[a],B=EX[b];const anta=SS_ANTA.some(p=>(p[0]===A.m&&p[1]===B.m)||(p[1]===A.m&&p[0]===B.m));
 if(anta)return true;return A.m===B.m&&!(A.cat==='compound'&&B.cat==='compound');}
function ssSuggest(d,SO){const out=[];SO.blocks.forEach(b=>{const ids=b.ex;for(let i=0;i<ids.length-1;){if(ssPair(ids[i],ids[i+1])){out.push(ids[i]);i+=2;}else i++;}});return out;}
function ssTimer(d,id,it){const P=progOf(d),SO=soirOf(P,d);let grp=null;
 if(SO)SO.blocks.forEach(b=>{if(b.ex.includes(id))ssGroups(d,b.ex).forEach(g=>{if(g.includes(id))grp=g;});});
 if(grp&&grp.length>1){const i=grp.indexOf(id);if(i<grp.length-1){tStart(15);toast('Enchaîne : '+itFor(d,grp[i+1]).name);return;}const r=Math.max.apply(null,grp.map(x=>itFor(d,x).rest||0));if(r)tStart(r);return;}
 if(it.rest)tStart(it.rest);}
