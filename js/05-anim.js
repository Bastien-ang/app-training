/* ===================== ANIMATIONS DE MOUVEMENT (bonhomme SVG, calculé par cinématique) ===================== */
const dirv=(a,l)=>{const r=a*Math.PI/180;return[Math.sin(r)*l,-Math.cos(r)*l];};
const vadd=(a,b)=>[a[0]+b[0],a[1]+b[1]];
const ease=x=>x*x*(3-2*x);
function ik2(A,B,l1,l2,pick){let dx=B[0]-A[0],dy=B[1]-A[1],d=Math.hypot(dx,dy)||1;d=Math.min(d,l1+l2-.01);const a=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-a*a));
 const ux=dx/Math.hypot(dx,dy||1e-9),uy=dy/Math.hypot(dx,dy||1e-9),mx=A[0]+ux*a,my=A[1]+uy*a;const c1=[mx-uy*h,my+ux*h],c2=[mx+uy*h,my-ux*h];return pick(c1,c2)?c1:c2;}
const DEF={th:180,sh:180,to:0,ua:180,fa:180,hd:0,rise:0};
function norm(p,pd){const q=Object.assign({},DEF,p);if(q.th2===undefined)q.th2=q.th;if(q.sh2===undefined)q.sh2=q.sh;const rt=pd.root||{x:50};if(q.rx===undefined)q.rx=rt.x;if(q.ry===undefined)q.ry=rt.y===undefined?84:rt.y;return q;}
function mixp(a,b,f){const o={};for(const k in a)o[k]=a[k]+(b[k]-a[k])*f;return o;}
function sideJ(p,pd){const K=dirv(p.th,17),F=vadd(K,dirv(p.sh,17)),N=dirv(p.to,22),H=vadd(N,dirv(p.to+p.hd,7)),E=vadd(N,dirv(p.ua,12)),W=vadd(E,dirv(p.fa,11)),K2=dirv(p.th2,17),F2=vadd(K2,dirv(p.sh2,17));
 const J={P:[0,0],K:K,F:F,N:N,H:H,E:E,W:W,K2:K2,F2:F2};const rk=pd.root.k;let off;
 if(rk==='F')off=[p.rx-F[0],(p.ry-p.rise)-F[1]];else off=[p.rx-J[rk][0],p.ry-J[rk][1]];
 for(const k in J)J[k]=vadd(J[k],off);
 const gr=rk==='F';J.T=gr?[J.F[0]+6,87]:vadd(J.F,[6,3]);J.T2=gr?[J.F2[0]+6,87]:vadd(J.F2,[6,3]);return J;}
function sideD(J){const f=v=>v[0].toFixed(1)+' '+v[1].toFixed(1);return'M'+f(J.F2)+'L'+f(J.K2)+'L'+f(J.P)+'L'+f(J.K)+'L'+f(J.F)+'M'+f(J.F)+'L'+f(J.T)+'M'+f(J.F2)+'L'+f(J.T2)+'M'+f(J.P)+'L'+f(J.N)+'M'+f(J.N)+'L'+f(J.E)+'L'+f(J.W);}
function frontJ(p,pd){const dy=p.dy||0,N=[50,32+dy],P=[50,54+dy],H=[50,26+dy],SL=[43,33+dy],SR=[57,33+dy];let HL=[47,54+dy],HR=[53,54+dy];
 let KL=[46,71+dy],KR=[54,71+dy],FL=[45,88+dy],FR=[55,88+dy];if(pd.seat){KL=[42,64];KR=[58,64];FL=[42,88];FR=[58,88];HL=[46,56];HR=[54,56];P[1]=56;}
 let ER,WR,EL,WL;
 if(p.hx!==undefined){WR=[50+p.hx,p.hy];WL=[50-p.hx,p.hy];ER=ik2(SR,WR,12,11,(a,b)=>a[0]>b[0]);EL=ik2(SL,WL,12,11,(a,b)=>a[0]<b[0]);}
 else{ER=vadd(SR,[Math.sin(p.u*Math.PI/180)*12,Math.cos(p.u*Math.PI/180)*12]);WR=vadd(ER,[Math.sin(p.f*Math.PI/180)*11,Math.cos(p.f*Math.PI/180)*11]);EL=[100-ER[0],ER[1]];WL=[100-WR[0],WR[1]];}
 return{H:H,N:N,P:P,SL:SL,SR:SR,HL:HL,HR:HR,KL:KL,KR:KR,FL:FL,FR:FR,EL:EL,ER:ER,WL:WL,WR:WR,W:WR,F:FR,front:true};}
function frontD(J){const f=v=>v[0].toFixed(1)+' '+v[1].toFixed(1);return'M'+f(J.SL)+'L'+f(J.SR)+'M'+f(J.N)+'L'+f(J.P)+'M'+f(J.HL)+'L'+f(J.KL)+'L'+f(J.FL)+'M'+f(J.HR)+'L'+f(J.KR)+'L'+f(J.FR)+'M'+f(J.SL)+'L'+f(J.EL)+'L'+f(J.WL)+'M'+f(J.SR)+'L'+f(J.ER)+'L'+f(J.WR);}

/* cycle spécial : vélo, course */
function bikeJ(t){const P=[44,58],a=t*2*Math.PI,C=[50,82],pe=[C[0]+7*Math.cos(a),C[1]+7*Math.sin(a)],pe2=[C[0]-7*Math.cos(a),C[1]-7*Math.sin(a)];
 const K=ik2(P,pe,17,17,(x,y)=>x[0]>y[0]),K2=ik2(P,pe2,17,17,(x,y)=>x[0]>y[0]),N=vadd(P,dirv(38,22)),HB=[72,50],E=ik2(N,HB,12,11,(x,y)=>x[1]>y[1]);
 return{P:P,K:K,F:pe,K2:K2,F2:pe2,N:N,H:vadd(N,dirv(38,7)),E:E,W:HB,T:vadd(pe,[3,0]),T2:vadd(pe2,[3,0])};}
function runJ(t){const a=t*2*Math.PI,P=[50,50+2*Math.cos(2*a)];const th=s=>180-40*Math.sin(s),sh=(s,ph)=>th(s)+35+30*Math.sin(s);
 const p={th:th(a),sh:sh(a),th2:th(a+Math.PI),sh2:sh(a+Math.PI),to:8,ua:180+35*Math.sin(a),fa:180+35*Math.sin(a)-85,hd:0,rise:0,rx:P[0],ry:P[1]};
 const J=sideJ(p,{root:{k:'P'}});return J;}

/* patterns */
const PATS={
 squat:{dur:3,root:{k:'F',x:50},eq:'bar',at:'N',poses:[{th:180,sh:180,to:0,ua:195,fa:15},{th:78,sh:210,to:38,ua:233,fa:53}],deco:'<path class="dc" d="M18 22V88M18 22H26"/>'},
 legpress:{dur:3,root:{k:'P',x:30,y:76},eq:'pad',at:'F',poses:[{to:305,th:15,sh:125,ua:160,fa:100},{to:305,th:65,sh:65,ua:160,fa:100}],deco:'<path class="dc" d="M6 58L30 82H42M38 84L82 56"/>'},
 hinge:{dur:3,root:{k:'F',x:42},eq:'bar',at:'W',poses:[{th:180,sh:180,to:0},{th:170,sh:187,to:72}]},
 legcurl:{dur:2.6,root:{k:'P',x:44,y:63},eq:'pad',at:'F',poses:[{to:270,th:90,sh:90,ua:160,fa:120},{to:270,th:90,sh:-25,ua:160,fa:120}],deco:'<path class="dc" d="M6 68H66M12 68V88M60 68V88"/>'},
 legext:{dur:2.6,root:{k:'P',x:30,y:72},eq:'pad',at:'F',poses:[{to:350,th:90,sh:180,ua:150,fa:120},{to:350,th:90,sh:92,ua:150,fa:120}],deco:'<path class="dc" d="M20 76H50M20 76V46M24 76V88"/>'},
 calf:{dur:2.2,root:{k:'F',x:50},eq:'db',at:'W',poses:[{rise:0,ua:182,fa:180},{rise:7,ua:182,fa:180}]},
 lunge:{dur:3,root:{k:'F',x:56},eq:'db',at:'W',poses:[{},{th:90,sh:180,th2:200,sh2:268}]},
 bench:{dur:2.8,root:{k:'P',x:58,y:72},eq:'bar',at:'W',poses:[{to:270,th:75,sh:185,ua:0,fa:0},{to:270,th:75,sh:185,ua:115,fa:0}],deco:'<path class="dc" d="M18 75H76M24 75V88M70 75V88"/>'},
 incline:{dur:2.8,root:{k:'P',x:52,y:74},eq:'db',at:'W',poses:[{to:320,th:60,sh:180,ua:0,fa:0},{to:320,th:60,sh:180,ua:160,fa:-5}],deco:'<path class="dc" d="M28 50L50 78H62M56 78V88"/>'},
 shoulderpress:{dur:2.8,root:{k:'F',x:50},eq:'bar',at:'W',poses:[{ua:160,fa:5},{ua:0,fa:0}]},
 lateral:{dur:2.6,fv:true,eq:'db2',poses:[{u:6,f:6},{u:84,f:78}]},
 fly:{dur:2.6,fv:true,eq:'db2',poses:[{u:100,f:112},{u:38,f:18}]},
 pushdown:{dur:2.4,root:{k:'F',x:46},eq:'cable',at:'W',anchor:[66,4],poses:[{to:8,ua:182,fa:92},{to:8,ua:182,fa:178}]},
 overhead:{dur:2.8,root:{k:'F',x:50},eq:'db',at:'W',anchor:[8,86],poses:[{ua:-5,fa:200},{ua:0,fa:360}]},
 skull:{dur:2.8,root:{k:'P',x:58,y:72},eq:'bar',at:'W',poses:[{to:270,th:75,sh:185,ua:0,fa:250},{to:270,th:75,sh:185,ua:0,fa:360}],deco:'<path class="dc" d="M18 75H76M24 75V88M70 75V88"/>'},
 dips:{dur:2.8,root:{k:'W',x:50,y:46},eq:'none',poses:[{to:12,th:190,sh:250,ua:180,fa:180},{to:22,th:190,sh:250,ua:185,fa:15}],deco:'<path class="dc" d="M36 46H66M40 46V88M64 46V88"/>'},
 pulldown:{dur:2.8,fv:true,seat:true,eq:'hbar',poses:[{u:165,f:178},{u:32,f:152}],deco:'<path class="dc" d="M34 3V8M66 3V8M36 59H64"/>'},
 pullup:{dur:3,fv:true,eq:'hbar',poses:[{hx:14,hy:8,dy:-2},{hx:14,hy:8,dy:-15}],deco:'<path class="dc" d="M24 8H76M24 8V3M76 8V3"/>'},
 rowbent:{dur:2.6,root:{k:'F',x:42},eq:'bar',at:'W',poses:[{th:172,sh:190,to:68,ua:180,fa:180},{th:172,sh:190,to:68,ua:245,fa:170}]},
 rowseated:{dur:2.8,root:{k:'P',x:36,y:72},eq:'cable',at:'W',anchor:[92,50],poses:[{to:25,th:92,sh:172,ua:92,fa:92},{to:-5,th:92,sh:172,ua:250,fa:95}],deco:'<path class="dc" d="M26 76H46M32 76V88M62 64V88M92 40V88"/>'},
 facepull:{dur:2.6,root:{k:'F',x:40},eq:'cable',at:'W',anchor:[94,28],poses:[{to:355,ua:90,fa:90},{to:355,ua:76,fa:-60}],deco:'<path class="dc" d="M94 14V88"/>'},
 curl:{dur:2.4,root:{k:'F',x:50},eq:'db',at:'W',poses:[{ua:178,fa:178},{ua:172,fa:25}]},
 crunch:{dur:2.4,root:{k:'P',x:60,y:80},eq:'none',poses:[{to:270,th:60,sh:185,ua:250,fa:20},{to:315,th:60,sh:185,ua:295,fa:60}],deco:'<path class="dc" d="M14 83H78"/>'},
 hanging:{dur:2.8,root:{k:'W',x:50,y:12},eq:'none',poses:[{to:0,th:180,sh:185,ua:0,fa:0},{to:-10,th:95,sh:100,ua:0,fa:0}],deco:'<path class="dc" d="M38 12H62"/>'},
 plank:{dur:3.2,root:{k:'F',x:86},eq:'none',poses:[{to:280,th:100,sh:100,ua:180,fa:270},{to:284,th:100,sh:100,ua:180,fa:270}]},
 carry:{dur:1.4,root:{k:'P',x:50,y:54},eq:'db',at:'W',poses:[{th:165,sh:178,th2:195,sh2:182},{th:195,sh:182,th2:165,sh2:178}]},
 sledpush:{dur:1.6,root:{k:'P',x:30,y:56},eq:'sled',at:'W',poses:[{to:60,th:155,sh:185,th2:205,sh2:200,ua:75,fa:85},{to:60,th:205,sh:200,th2:155,sh2:185,ua:75,fa:85}]},
 sledpull:{dur:2.8,root:{k:'P',x:50,y:56},eq:'cable',at:'W',anchor:[94,84],poses:[{to:340,th:190,sh:175,ua:80,fa:85},{to:340,th:190,sh:175,ua:250,fa:100}],deco:'<path class="dc" d="M88 80H98V88H88Z"/>'},
 skierg:{dur:2.4,root:{k:'F',x:42},eq:'cable',at:'W',anchor:[60,3],poses:[{ua:15,fa:15},{th:160,sh:195,to:35,ua:170,fa:175}],deco:'<path class="dc" d="M62 3V88M56 88H72"/><circle class="dc" cx="62" cy="8" r="5"/>'},
 rower:{dur:2.6,root:{k:'F',x:74,y:74},eq:'cable',at:'W',anchor:[88,66],poses:[{to:25,th:45,sh:135,ua:70,fa:75},{to:-20,th:95,sh:95,ua:250,fa:100}],deco:'<path class="dc" d="M14 80H80M74 64L78 82"/><circle class="dc" cx="88" cy="66" r="9"/>'},
 bike:{dur:1.3,fn:bikeJ,eq:'none',deco:'<path class="dc" d="M42 60L50 82L66 58L72 50M40 60H48M50 82L66 58"/><circle class="dc" cx="50" cy="82" r="7"/>'},
 run:{dur:.9,fn:runJ,eq:'none'},
 burpee:{dur:4,root:{k:'F',x:50},eq:'none',poses:[{rx:50},{rx:44,th:80,sh:210,to:70,ua:165,fa:170},{rx:18,th:255,sh:262,to:80,ua:180,fa:180},{rx:44,th:80,sh:210,to:70,ua:165,fa:170},{rx:50,ua:0,fa:0,rise:12}]},
 wallball:{dur:2.4,root:{k:'F',x:40},eq:'ball',at:'W',poses:[{th:80,sh:208,to:22,ua:115,fa:20},{th:180,sh:180,to:0,ua:5,fa:5}],deco:'<path class="dc" d="M92 4V88M88 14H96V30H88Z"/>'},
 hbench:{dur:2.8,root:{k:'P',x:58,y:72},eq:'handle',at:'W',poses:[{to:270,th:75,sh:185,ua:112,fa:2},{to:270,th:75,sh:185,ua:2,fa:0}],deco:'<path class="dc" d="M18 75H76M24 75V88M70 75V88M10 80V36L26 30"/>'},
 chestpress:{dur:2.8,root:{k:'P',x:40,y:70},eq:'handle',at:'W',poses:[{to:352,th:90,sh:175,ua:240,fa:94},{to:352,th:90,sh:175,ua:90,fa:90}],deco:'<path class="dc" d="M33 72L29 36M30 72H54M42 72V88M36 88H50"/>'},
 shpressm:{dur:2.8,root:{k:'P',x:40,y:70},eq:'handle',at:'W',poses:[{to:352,th:90,sh:175,ua:165,fa:8},{to:352,th:90,sh:175,ua:5,fa:0}],deco:'<path class="dc" d="M33 72L29 30M30 72H54M42 72V88M36 88H50"/>'},
 pecdeck:{dur:2.8,fv:true,seat:true,eq:'pads',poses:[{u:95,f:182},{u:22,f:176}],deco:'<path class="dc" d="M36 59H64M50 59V88M44 88H56"/>'},
 pecdeckrev:{dur:2.8,fv:true,seat:true,eq:'pads',poses:[{u:22,f:176},{u:95,f:182}],deco:'<path class="dc" d="M36 59H64M50 59V88M44 88H56"/>'},
 highrow:{dur:2.8,root:{k:'P',x:40,y:72},eq:'handle',at:'W',poses:[{to:8,th:90,sh:175,ua:62,fa:48},{to:8,th:90,sh:175,ua:235,fa:95}],deco:'<path class="dc" d="M30 72H56M44 72V88M50 42V68M62 28H72L86 14"/>'},
 sealrow:{dur:2.8,root:{k:'P',x:60,y:38},eq:'bar',at:'W',poses:[{to:90,th:268,sh:268,ua:180,fa:180},{to:90,th:268,sh:268,ua:245,fa:178}],deco:'<path class="dc" d="M18 47H94M24 47V88M88 47V88"/>'},
 machrow:{dur:2.8,root:{k:'P',x:40,y:72},eq:'handle',at:'W',poses:[{to:355,th:90,sh:175,ua:82,fa:84},{to:355,th:90,sh:175,ua:238,fa:92}],deco:'<path class="dc" d="M30 72H56M44 72V88M50 40V70M62 56H76"/>'},
 inclrow:{dur:2.8,root:{k:'P',x:42,y:55},eq:'db',at:'W',poses:[{to:40,th:205,sh:188,ua:185,fa:180},{to:40,th:205,sh:188,ua:245,fa:170}],deco:'<path class="dc" d="M36 80L66 42M50 80V88M62 58V88"/>'},
 crunchm:{dur:2.4,root:{k:'P',x:40,y:72},eq:'none',poses:[{to:355,th:90,sh:175,ua:100,fa:30},{to:42,th:90,sh:175,ua:100,fa:30}],deco:'<path class="dc" d="M30 72H56M44 72V88M52 46V66M30 74L26 40"/>'},
 kickback:{dur:2.6,root:{k:'F',x:42},eq:'db',at:'W',poses:[{to:68,th:172,sh:190,ua:255,fa:170},{to:68,th:172,sh:190,ua:255,fa:258}],deco:'<path class="dc" d="M64 66H84M70 66V88"/>'},
 preacher:{dur:2.6,root:{k:'P',x:36,y:70},eq:'bar',at:'W',poses:[{to:350,th:90,sh:175,ua:120,fa:122},{to:350,th:90,sh:175,ua:120,fa:-28}],deco:'<path class="dc" d="M42 54L62 82M28 72H48M36 72V88"/>'},
 hack:{dur:3,root:{k:'F',x:56},eq:'handle',at:'W',poses:[{th:180,sh:180,to:340,ua:200,fa:190},{th:72,sh:218,to:338,ua:200,fa:190}],deco:'<path class="dc" d="M26 24L50 84M32 22L56 82M60 86H78"/>'},
 calfseat:{dur:2.2,root:{k:'P',x:40,y:72},eq:'none',poses:[{to:355,th:90,sh:176,ua:140,fa:160},{to:355,th:84,sh:181,ua:140,fa:160}],deco:'<path class="dc" d="M28 72H52M36 72V88M46 60H62M66 88H78"/>'},
 hipthrust:{dur:2.6,root:{k:'N',x:30,y:66},eq:'bar',at:'P',poses:[{to:300,th:50,sh:150,ua:150,fa:130},{to:275,th:85,sh:180,ua:150,fa:130}],deco:'<path class="dc" d="M10 70H36V88"/>'}
};
const PAT_RULES=[[/tirage poulie haute|lat pulldown/i,'pulldown'],[/crunch machine/i,'crunchm'],[/kickback/i,'kickback'],[/pupitre|larry scott/i,'preacher'],[/rowing sur banc incliné|banc incliné.*rowing/i,'inclrow'],[/rowing t-bar \(machine\)|rowing machine convergente|tirage horizontal machine|tirage.*convergente/i,'machrow'],[/hack squat/i,'hack'],[/mollets assis/i,'calfseat'],[/bike erg|assault/i,'bike'],[/stepper|escalier/i,'run'],[/[ée]l[ée]vations? lat[ée]rales?|y-raise/i,'lateral'],[/seal row|banc de rowing/i,'sealrow'],[/high row|rowing haut/i,'highrow'],[/katana|au-dessus de la tête/i,'overhead'],[/iso-lateral.*(couché|bench)|couché.*hammer|hammer.*couché/i,'hbench'],[/pec deck inversé|oiseau machine/i,'pecdeckrev'],[/pec deck|butterfly/i,'pecdeck'],[/presse à pec|chest press|presse pectoraux|couché machine|couché.*guidé|incliné machine|machine convergente/i,'chestpress'],[/press machine épaules|épaules.*machine|développé épaules/i,'shpressm'],[/skierg/i,'skierg'],[/rameur|rowing erg|erg\b/i,'rower'],[/assault|air bike|vélo|bike|elliptique/i,'bike'],[/marche en pente|tapis/i,'run'],[/sled push|prowler|poussée dynamique|marche lestée/i,'sledpush'],[/sled pull|rope sled/i,'sledpull'],[/burpee/i,'burpee'],[/wall ball/i,'wallball'],
 [/fentes|step-up|bulgare|sandbag lunges|lunges/i,'lunge'],[/hip thrust/i,'hipthrust'],[/soulevé|sdt|good morning|back extension/i,'hinge'],[/leg curl|nordic/i,'legcurl'],[/leg extension|sissy/i,'legext'],[/presse à cuisses|hack|leg press/i,'legpress'],[/squat|gobelet/i,'squat'],[/mollets/i,'calf'],
 [/curl/i,'curl'],[/presse à pec|pec deck inversé|oiseau|pec deck|écart|butterfly/i,'fly'],[/incliné/i,'incline'],[/couché|presse à pec convergente|pompes/i,'bench'],[/militaire|arnold|press machine épaules/i,'shoulderpress'],[/latérales|y-raise|frontale/i,'lateral'],
 [/dips/i,'dips'],[/jm press|barre au front|skull/i,'skull'],[/nuque|kickback/i,'overhead'],[/triceps/i,'pushdown'],[/traction/i,'pullup'],[/tirage vertical|pulldown|pull-over/i,'pulldown'],[/face pull|menton/i,'facepull'],
 [/poulie basse|horizontal|convergente|machine/i,'rowseated'],[/rowing|t-bar|pendlay|yates|kroc|tirage/i,'rowbent'],[/crunch/i,'crunch'],[/relevé/i,'hanging'],[/planche|gainage|hollow|roue/i,'plank'],[/farmer|carry|suitcase|rack|trap bar/i,'carry']];
const PAT_DEFAULT={'leg-squat':'squat','leg-rdl':'hinge','leg-press':'legpress','leg-curl':'legcurl','leg-ext':'legext','leg-calf':'calf','leg-bike':'bike','push-bench':'bench','push-incline':'incline','push-ohp':'shoulderpress','push-lateral':'lateral','push-dips':'dips','jr-pullup':'pullup','jr-dips':'dips','push-fly':'fly','push-tri':'pushdown','push-ski':'skierg','push-sled':'sledpush','pull-pullup':'pullup','pull-rowbar':'rowbent','pull-rowcable':'rowseated','pull-pulldown':'pulldown','pull-face':'facepull','pull-curlbar':'curl','pull-curlinc':'curl','pull-crunch':'crunch','pull-plank':'plank','pull-erg':'rower','pull-farmer':'carry','fri-chest':'chestpress','fri-lateral':'lateral','fri-pull':'pulldown','fri-tri':'pushdown','fri-curl':'curl','fri-bike':'bike','mer-skierg':'skierg','mer-sledpush':'sledpush','mer-sledpull':'sledpull','mer-burpee':'burpee','mer-row':'rower','mer-farmer':'carry','mer-lunges':'lunge','mer-wb':'wallball','leg-bike2':'bike'};
function patFor(id,name){if(id==='push-ski'||id==='leg-bike'||id==='fri-bike'||id==='fin-bike'||id==='cd-z2'||id==='cd-run'||/^cz-/.test(id)){for(const r of PAT_RULES){if(r[0].test(name))return r[1];}}
 if(name!==EX[id].name)for(const r of PAT_RULES){if(r[0].test(name))return r[1];}return PAT_DEFAULT[id]||'squat';}
function eqFor(pat,name){const pd=PATS[pat];let e=pd.eq;if(e==='none'||e==='sled'||e==='ball'||e==='hbar'||e==='db2'||e==='pads')return e;
 if(/haltère|kettlebell|gobelet|sac|sandbag/i.test(name)&&e!=='cable')return'db';if(/poulie|câble|corde|cable/i.test(name)&&pd.anchor)return'cable';if(/machine|presse|smith|hack|convergente|pec deck/i.test(name)&&e!=='cable'&&e!=='pad')return'handle';if(/barre|bar\b|trap|ez/i.test(name)&&e==='db')return'bar';return e;}

/* rendu */
function jointsAt(pd,t){if(pd.fn)return pd.fn(t);const ps=pd.poses,n=ps.length,u=t*n,i=Math.floor(u)%n,f=ease(u-Math.floor(u));
 const a=norm(ps[i],pd),b=norm(ps[(i+1)%n],pd);
 if(pd.fv){const A=Object.assign({u:0,f:0,dy:0},ps[i]),B=Object.assign({u:0,f:0,dy:0},ps[(i+1)%n]);const m={};['u','f','dy','hx','hy'].forEach(k=>{if(A[k]!==undefined&&B[k]!==undefined)m[k]=A[k]+(B[k]-A[k])*f;});return frontJ(m,pd);}
 return sideJ(mixp(a,b,f),pd);}
function eqGeom(eq,J,pd){const c=[],p=[];const f=v=>v[0].toFixed(1)+' '+v[1].toFixed(1);const at=J[pd.at||'W']||J.W;
 if(eq==='bar')c.push([at[0],at[1],4.2]);else if(eq==='db')c.push([at[0],at[1],3.2]);else if(eq==='handle')c.push([at[0],at[1],2.6]);else if(eq==='ball')c.push([at[0],at[1],5.2]);
 else if(eq==='db2'){c.push([J.WL[0],J.WL[1],3.2]);c.push([J.WR[0],J.WR[1],3.2]);}
 else if(eq==='cable'){const an=pd.anchor||[94,30];p.push('M'+f(at)+'L'+f(an));c.push([at[0],at[1],2.4]);}
 else if(eq==='pads'){p.push('M'+(J.WL[0]).toFixed(1)+' '+(J.WL[1]-8).toFixed(1)+'V'+(J.WL[1]+3).toFixed(1));p.push('M'+(J.WR[0]).toFixed(1)+' '+(J.WR[1]-8).toFixed(1)+'V'+(J.WR[1]+3).toFixed(1));}
 else if(eq==='hbar'){p.push('M'+f(J.WL)+'L'+f(J.WR));}
 else if(eq==='pad'){const F=J.F;p.push('M'+(F[0]-1).toFixed(1)+' '+(F[1]-6).toFixed(1)+'L'+(F[0]+3).toFixed(1)+' '+(F[1]+5).toFixed(1));}
 else if(eq==='sled'){const w=at;p.push('M'+f(w)+'L'+w[0].toFixed(1)+' 80M'+(w[0]-4).toFixed(1)+' 82H'+(w[0]+20).toFixed(1)+'M'+(w[0]-2).toFixed(1)+' 76H'+(w[0]+16).toFixed(1)+'V88H'+(w[0]-2).toFixed(1)+'Z');}
 return{c:c,p:p};}
let figN=0;
const LC=v=>v[0].toFixed(1)+' '+v[1].toFixed(1);
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
function parts(J){const f=LC;
 if(J.front)return{legs:'M'+f(J.HL)+'L'+f(J.KL)+'L'+f(J.FL)+'M'+f(J.HR)+'L'+f(J.KR)+'L'+f(J.FR),torso:'M'+f(J.SL)+'L'+f(J.SR)+'M'+f(J.N)+'L'+f(J.P),arms:'M'+f(J.SL)+'L'+f(J.EL)+'L'+f(J.WL)+'M'+f(J.SR)+'L'+f(J.ER)+'L'+f(J.WR)};
 return{legs:'M'+f(J.F2)+'L'+f(J.K2)+'L'+f(J.P)+'L'+f(J.K)+'L'+f(J.F)+'M'+f(J.F)+'L'+f(J.T)+'M'+f(J.F2)+'L'+f(J.T2),torso:'M'+f(J.P)+'L'+f(J.N),arms:'M'+f(J.N)+'L'+f(J.E)+'L'+f(J.W)};}
function musclePts(m,J){
 if(J.front){switch(m){case'chest':return[[50,J.SL[1]+6]];case'delt':return[J.SL,J.SR];case'lat':return[lerp(J.SL,J.HL,.3),lerp(J.SR,J.HR,.3)];case'bi':case'tri':return[lerp(J.SL,J.EL,.5),lerp(J.SR,J.ER,.5)];case'abs':return[lerp(J.N,J.P,.65)];case'quad':case'ham':return[lerp(J.HL,J.KL,.5),lerp(J.HR,J.KR,.5)];case'glute':return[J.P];case'calf':return[lerp(J.KL,J.FL,.5),lerp(J.KR,J.FR,.5)];}return[];}
 switch(m){case'chest':return[lerp(J.P,J.N,.8)];case'lat':return[lerp(J.P,J.N,.55)];case'delt':return[J.N];case'bi':case'tri':return[lerp(J.N,J.E,.5)];case'abs':return[lerp(J.P,J.N,.35)];case'quad':case'ham':return[lerp(J.P,J.K,.55),lerp(J.P,J.K2,.55)];case'glute':return[J.P];case'calf':return[lerp(J.K,J.F,.5)];}return[];}
const MU={squat:'quad',legpress:'quad',hinge:'ham',legcurl:'ham',legext:'quad',calf:'calf',lunge:'quad',bench:'chest',incline:'chest',shoulderpress:'delt',lateral:'delt',fly:'chest',pushdown:'tri',overhead:'tri',skull:'tri',dips:'chest',pulldown:'lat',pullup:'lat',rowbent:'lat',rowseated:'lat',facepull:'delt',curl:'bi',crunch:'abs',hanging:'abs',plank:'abs',carry:'abs',sledpush:'quad',sledpull:'ham',skierg:'lat',rower:'lat',bike:'quad',run:'quad',burpee:'chest',wallball:'quad',hipthrust:'glute',chestpress:'chest',hbench:'chest',highrow:'lat',sealrow:'lat',machrow:'lat',inclrow:'lat',crunchm:'abs',kickback:'tri',preacher:'bi',hack:'quad',calfseat:'calf',shpressm:'delt',pecdeck:'chest',pecdeckrev:'delt'};
const MUNAME={quad:'Quadriceps',ham:'Ischios',calf:'Mollets',chest:'Pecs',delt:'Épaules',tri:'Triceps',lat:'Dos',bi:'Biceps',abs:'Abdos',glute:'Fessiers'};
const PHC={squat:['Descends en contrôle (3 s)','Pousse dans les talons'],legpress:['Fléchis lentement','Pousse sans verrouiller'],hinge:['Bassin en arrière, dos plat','Pousse les hanches vers l\'avant'],legcurl:['Ramène les talons vers les fesses','Reviens lentement'],legext:['Étends les jambes','Redescends lentement'],calf:['Monte sur la pointe, pause','Descends en étirant'],lunge:['Descends','Remonte'],bench:['Descends en 2–3 s','Pousse'],incline:['Descends en 2–3 s','Pousse'],shoulderpress:['Pousse vers le haut','Descends en contrôle'],lateral:['Monte jusqu\'aux épaules','Descends lentement'],fly:['Rapproche les bras','Ouvre en étirant'],pushdown:['Étends les coudes','Remonte lentement'],overhead:['Étends vers le haut','Descends derrière la tête'],skull:['Étends','Descends vers le front'],dips:['Descends','Pousse'],pulldown:['Tire vers la poitrine','Remonte bras tendus'],pullup:['Monte, menton au-dessus','Descends bras tendus'],rowbent:['Tire vers le nombril','Reviens lentement'],rowseated:['Tire les coudes en arrière','Reviens lentement'],facepull:['Tire vers le visage','Reviens lentement'],curl:['Monte, coudes fixes','Descends en 3 s'],crunch:['Enroule le buste','Reviens lentement'],hanging:['Monte les genoux','Descends sans balancer'],plank:['Corps aligné','Ne cambre pas'],carry:['Marche gainé','Épaules basses'],sledpush:['Pas puissants','Reste bas'],sledpull:['Tire','Recule'],skierg:['Tire en pliant les hanches','Reviens bras tendus'],rower:['Jambes, puis buste, puis bras','Bras, buste, puis jambes'],bike:['Pédale souple','Cadence régulière'],run:['Allure facile','Respire calmement'],burpee:['Descends','Saute'],wallball:['Descends','Lance'],hipthrust:['Monte le bassin','Descends en contrôle'],chestpress:['Pousse','Reviens lentement'],hbench:['Descends en 2–3 s','Pousse'],highrow:['Tire les coudes vers les hanches','Reviens bras tendus'],machrow:['Tire les coudes en arrière','Reviens lentement'],inclrow:['Tire le coude vers la hanche','Descends en étirant'],crunchm:['Enroule le buste','Reviens lentement'],kickback:['Étends le bras vers l\'arrière','Reviens coude fixe'],preacher:['Monte sans décoller les coudes','Descends en 3 s, bras presque tendu'],hack:['Descends en contrôle','Pousse dans les talons'],calfseat:['Monte sur la pointe','Descends en étirant'],sealrow:['Tire les coudes vers le plafond','Descends en contrôle'],shpressm:['Pousse','Descends en contrôle'],pecdeck:['Rapproche les coudes','Ouvre en contrôle'],pecdeckrev:['Écarte les bras','Reviens lentement']};
function phCap(pat){const c=PHC[pat];const m=MUNAME[MU[pat]];return(m?'<b>'+m+'</b> · ':'')+(c?'① '+c[0]+' · ② '+c[1]:'');}
const BODY=['lg2t','lg2s','lg2f','tor','lgt','lgs','lgf','nk','ua2','fa2','hd2','ua','fa','hd'];
function figHTML(pat,name,cls){const pd=PATS[pat]||PATS.squat;const eq=eqFor(pat in PATS?pat:'squat',name||'');
 let rails='';if(/smith/i.test(name||'')&&!pd.fn&&pd.poses){const wx=jointsAt(pd,1e-9).W;if(wx){rails='<path class="dc" d="M'+(wx[0]-9).toFixed(1)+' 4V88M'+(wx[0]+9).toFixed(1)+' 4V88" stroke-dasharray="2 3"/>';}}
 return'<svg class="fig '+(cls||'')+'" viewBox="0 0 100 94" data-pat="'+pat+'" data-eq="'+eq+'" aria-hidden="true"><ellipse class="shd" cx="50" cy="88.5" rx="30" ry="2.4"/><path class="dc" d="M4 88H96"/>'+(pd.deco||'')+rails+'<path class="fg"/>'+BODY.map(k=>'<path class="b b-'+k+'"/>').join('')+'<circle class="fh" r="4.9"/><path class="hr"/><circle class="hm m1" r="5"/><circle class="hm m2" r="5"/><path class="fe e1"/><path class="fe e2"/><circle class="fe c1"/><circle class="fe c2"/></svg>';}
function figFor(id,name,cls){return figHTML(patFor(id,name),name,cls);}
function capd(a,b,w1,w2){const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,r1=w1/2,r2=w2/2,f=n=>n.toFixed(1);
 const p1=[a[0]+nx*r1,a[1]+ny*r1],p2=[b[0]+nx*r2,b[1]+ny*r2],p3=[b[0]-nx*r2,b[1]-ny*r2],p4=[a[0]-nx*r1,a[1]-ny*r1];
 return'M'+LC(p1)+'L'+LC(p2)+'A'+f(r2)+' '+f(r2)+' 0 0 0 '+LC(p3)+'L'+LC(p4)+'A'+f(r1)+' '+f(r1)+' 0 0 0 '+LC(p1)+'Z';}
function capb(A,B,w1,w2,bl){const dx=B[0]-A[0],dy=B[1]-A[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,r1=w1/2,r2=w2/2,rm=(r1+r2)/2*(bl||1.18),f=n=>n.toFixed(1);
 const m=[(A[0]+B[0])/2,(A[1]+B[1])/2],k=2*rm-(r1+r2)/2;
 const p1=[A[0]+nx*r1,A[1]+ny*r1],p2=[B[0]+nx*r2,B[1]+ny*r2],p3=[B[0]-nx*r2,B[1]-ny*r2],p4=[A[0]-nx*r1,A[1]-ny*r1];
 const c1=[m[0]+nx*k,m[1]+ny*k],c2=[m[0]-nx*k,m[1]-ny*k];
 return'M'+LC(p1)+'Q'+LC(c1)+' '+LC(p2)+'A'+f(r2)+' '+f(r2)+' 0 0 0 '+LC(p3)+'Q'+LC(c2)+' '+LC(p4)+'A'+f(r1)+' '+f(r1)+' 0 0 0 '+LC(p1)+'Z';}
const dot=(c,r)=>capd([c[0]-.01,c[1]],[c[0]+.01,c[1]],r*2,r*2);
function bodyD(J){const o={};
 if(J.front){const sh=[J.SL,J.SR,J.HR,J.HL].map(LC);
  o.tor='M'+sh[0]+'L'+sh[1]+'L'+sh[2]+'L'+sh[3]+'Z';
  o.lg2t=capb(J.HL,J.KL,7,5.4);o.lg2s=capb(J.KL,J.FL,5.4,3.6,1.3);o.lg2f=capd(J.FL,[J.FL[0]-3.5,J.FL[1]+2],3.4,3);
  o.lgt=capb(J.HR,J.KR,7,5.4);o.lgs=capb(J.KR,J.FR,5.4,3.6,1.3);o.lgf=capd(J.FR,[J.FR[0]+3.5,J.FR[1]+2],3.4,3);
  o.nk=capd(J.N,lerp(J.N,J.H,.8),3.4,3.2);
  o.ua2=capb(J.SL,J.EL,4.6,3.6);o.fa2=capd(J.EL,J.WL,3.6,2.7);o.hd2=dot(J.WL,2.6);
  o.ua=capb(J.SR,J.ER,4.6,3.6);o.fa=capd(J.ER,J.WR,3.6,2.7);o.hd=dot(J.WR,2.6);return o;}
 o.tor=capd(J.P,J.N,9,11);
 o.lg2t=capb(J.P,J.K2,7.4,5.4);o.lg2s=capb(J.K2,J.F2,5.4,3.5,1.3);o.lg2f=capd(J.F2,J.T2,3.4,2.8);
 o.lgt=capb(J.P,J.K,7.8,5.6);o.lgs=capb(J.K,J.F,5.6,3.6,1.3);o.lgf=capd(J.F,J.T,3.6,2.8);
 o.nk=capd(J.N,lerp(J.N,J.H,.8),3.4,3.2);
 o.ua=capb(J.N,J.E,4.8,3.8);o.fa=capb(J.E,J.W,4.2,2.8,1.2);o.hd=dot(J.W,2.7);return o;}
function drawFig(svg,now){const pat=svg.dataset.pat,pd=PATS[pat];if(!pd)return;const t=((now/1000)/pd.dur)%1;const J=jointsAt(pd,t);
 if(!svg._e){svg._e={};BODY.concat(['fg','fh','hr','m1','m2','e1','e2','c1','c2']).forEach(k=>{svg._e[k]=svg.querySelector('.b-'+k)||svg.querySelector('.'+k);});}
 const E=svg._e;
 if(!svg.dataset.g){svg.dataset.g='1';if(!pd.fn){const n=pd.poses.length;let d='';[0,Math.floor(n/2)].forEach(i=>{const q=parts(jointsAt(pd,i/n+1e-9));d+=q.legs+q.torso+q.arms;});E.fg.setAttribute('d',d);}}
 const bd=bodyD(J);BODY.forEach(k=>{if(bd[k]){E[k].setAttribute('d',bd[k]);E[k].style.display='';}else E[k].style.display='none';});
 E.tor.style.strokeWidth=J.front?'4':'1.5';
 E.fh.setAttribute('cx',J.H[0].toFixed(1));E.fh.setAttribute('cy',J.H[1].toFixed(1));
 const hx=J.H[0],hy=J.H[1];E.hr.setAttribute('d','M'+(hx-4.9).toFixed(1)+' '+(hy+.3).toFixed(1)+'A4.9 4.9 0 0 1 '+(hx+4.9).toFixed(1)+' '+(hy-.8).toFixed(1)+'Q'+(hx+1).toFixed(1)+' '+(hy-2.2).toFixed(1)+' '+(hx-4.9).toFixed(1)+' '+(hy+.3).toFixed(1)+'Z');
 const mp=musclePts(MU[pat],J);['m1','m2'].forEach((k,i)=>{const e=E[k];if(mp[i]){e.setAttribute('cx',mp[i][0].toFixed(1));e.setAttribute('cy',mp[i][1].toFixed(1));e.style.display='';}else e.style.display='none';});
 const g=eqGeom(svg.dataset.eq,J,pd);['e1','e2'].forEach((k,i)=>{const e=E[k];if(g.p[i]){e.setAttribute('d',g.p[i]);e.style.display='';}else e.style.display='none';});
 ['c1','c2'].forEach((k,i)=>{const e=E[k];if(g.c[i]){e.setAttribute('cx',g.c[i][0].toFixed(1));e.setAttribute('cy',g.c[i][1].toFixed(1));e.setAttribute('r',g.c[i][2]);e.style.display='';}else e.style.display='none';});}
let figRun=false;
function figLoop(now){const l=document.querySelectorAll('svg.fig');if(!l.length||document.hidden){figRun=false;return;}l.forEach(s=>drawFig(s,now));requestAnimationFrame(figLoop);}
function figDefs(){if(document.getElementById('figdefs'))return;const d=document.createElement('div');d.id='figdefs';d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
 const g=(id,c1,c2)=>'<linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></linearGradient>';
 d.innerHTML='<svg width="0" height="0"><defs>'+g('gSkin','#f6cfae','#c58a66')+g('gSkinD','#c9a082','#8f654b')+g('gShirt','#e9eef1','#8d9ca6')+g('gShort','#6d7b85','#343e46')+g('gShortD','#4d5a63','#2a3238')+g('gShoe','#ffffff','#c5cdd0')+'</defs></svg>';document.body.appendChild(d);}
function startFigs(){figDefs();const l=document.querySelectorAll('svg.fig');l.forEach(s=>drawFig(s,0));if(!figRun&&l.length){figRun=true;requestAnimationFrame(figLoop);}}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)startFigs();});

Object.assign(PAT_DEFAULT,{'fin-bike':'bike','cd-run':'run','cd-erg':'skierg','cd-circuit':'wallball','cd-z2':'run','pec-dbpress':'bench','pec-incbar':'incline','pec-deck':'pecdeck','pec-skull':'skull','pec-rope':'pushdown','sh-arnold':'shoulderpress','sh-dbpress':'shoulderpress','sh-latcable':'lateral','sh-birds':'pecdeckrev','sh-front':'lateral','back-pulldown':'pulldown','back-tbar':'rowbent','back-dbrow':'rowbent','back-pullover':'pulldown','back-curlham':'curl','back-curlcable':'curl','th-hipthrust':'hipthrust','th-hanging':'hanging','th-calfseat':'calf'});

/* Jeudi : latérales machine plate loaded + frontales barre */
PATS.latmach={dur:2.6,fv:true,seat:true,eq:'pads',poses:[{u:6,f:6},{u:84,f:78}],deco:'<path class="dc" d="M36 59H64M50 59V88M44 88H56"/>'};
PATS.frontbar={dur:2.6,root:{k:'F',x:50},eq:'bar',at:'W',poses:[{ua:178,fa:178},{ua:90,fa:90}]};
MU.latmach='delt';MU.frontbar='delt';
PHC.latmach=PHC.lateral;PHC.frontbar=PHC.lateral;
Object.assign(PAT_DEFAULT,{'push-lateral':'latmach','sh-latcable':'latmach','sh-front':'frontbar'});
PAT_RULES.unshift([/frontales? barre|frontale.*barre/i,'frontbar'],[/latérales machine|plate.?loaded/i,'latmach']);

ALT['push-lateral']=[['Élévations latérales haltères',8,'kg/haltère'],['Élévations latérales poulie',7,'kg']];ALT['sh-latcable']=ALT['push-lateral'];
ALT['sh-front']=[['Élévations frontales haltères',8,'kg/haltère'],['Élévation frontale poulie',7,'kg'],['Élévation frontale disque',10,'kg']];
