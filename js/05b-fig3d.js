
/* ===================== FIGURES 3D (three.js) — mannequin réaliste, repli sur le SVG ===================== */
(function(){
 if(typeof THREE==='undefined')return;
 const T=THREE,V=(x,y,z)=>new T.Vector3(x,y,z);
 let R=null,scene,cam,ok=false,body={},eqp={},decoCache={},curDeco=null,glow=[];
 const RW=420,RH=Math.round(420*94/100);
 const SK=0xc68863,SK2=0xb87a56,SHIRT=0x3a3f4a,SHORT=0x15161a,SHOE=0xe9e9ea,HAIR=0x2a1f1a,METAL=0x8d939c,DARK=0x1c1d21,PAD=0x101114,ACC=0xff5a1f,FRAME=0x4a4f58;
 const mat=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.62,metalness:.05},o||{}));
 /* géométries */
 function lathe(prof,seg){const pts=[new T.Vector2(0,prof[0][0])];prof.forEach(p=>pts.push(new T.Vector2(p[1],p[0])));pts.push(new T.Vector2(0,prof[prof.length-1][0]));return new T.LatheGeometry(pts,seg||16);}
 function mesh(g,m,sh){const o=new T.Mesh(g,m);o.castShadow=sh!==false;o.matrixAutoUpdate=false;scene.add(o);return o;}
 const _x=V(),_y=V(),_z=V(),_m=new T.Matrix4(),_s=V();
 /* place un os : origine A, axe Y vers B, axe latéral = hint (défaut Z monde) */
 function bone(o,A,B,opt){opt=opt||{};_y.subVectors(B,A);const len=_y.length()||1e-3;_y.multiplyScalar(1/len);
  _z.copy(opt.lat||V(0,0,1));_z.addScaledVector(_y,-_z.dot(_y));if(_z.lengthSq()<1e-4){_z.set(1,0,0);_z.addScaledVector(_y,-_z.dot(_y));}_z.normalize();_x.crossVectors(_y,_z);
  _m.makeBasis(_x,_y,_z);_m.setPosition(A);const sy=opt.fixed?1:len/(opt.base||1);_s.set(opt.sx||1,sy,opt.sz||1);_m.scale(_s);o.matrix.copy(_m);o.visible=true;return o;}
 function at(o,P,s){o.matrix.makeScale(s||1,s||1,s||1);o.matrix.setPosition(P);o.visible=true;}
 function build(){
  const skin=()=>mat(SK),g=(k,geo,m,sh)=>{body[k]=mesh(geo,m,sh);return body[k];};
  /* tronc : profil (hauteur, rayon latéral), aplati en profondeur */
  const flat=(geo,d)=>{geo.scale(d,1,1);return geo;};
  g('pelvis',flat(lathe([[-1.2,4.2],[0,5.6],[2.5,6.5],[5.5,6.2],[7.5,5.7]],22),.76),mat(SHORT));
  g('abs',flat(lathe([[6.8,5.7],[9,5.5],[12,6.3],[14.5,7.4]],22),.66),mat(SHIRT));
  g('chest',flat(lathe([[14,7.3],[16.5,8.4],[19,8.9],[20.8,8.2],[22.2,5.6],[23.4,2.6]],22),.66),mat(SHIRT));
  g('neck',lathe([[0,2.5],[.5,2.1],[1,2.0]],12),skin());
  g('head',new T.SphereGeometry(1,22,18),skin());
  g('hair',new T.SphereGeometry(1,20,14,0,Math.PI*2,0,Math.PI*.5),mat(HAIR,{roughness:.9}));g('earL',new T.SphereGeometry(.9,8,6),skin(),false);g('earR',new T.SphereGeometry(.9,8,6),skin(),false);g('eyeL',new T.SphereGeometry(.42,8,6),mat(0x1a1310,{roughness:.3}),false);g('eyeR',new T.SphereGeometry(.42,8,6),mat(0x1a1310,{roughness:.3}),false);
  g('nose',new T.SphereGeometry(.55,8,6),skin(),false);
  ['L','R'].forEach(s=>{
   g('delt'+s,new T.SphereGeometry(3.45,14,12),skin());
   g('ua'+s,lathe([[0,2.9],[.35,3.15],[.7,2.6],[1,2.15]],14),skin());
   g('elb'+s,new T.SphereGeometry(2.12,10,8),skin());
   g('fa'+s,lathe([[0,2.15],[.25,2.5],[.6,1.95],[1,1.45]],14),skin());
   g('hand'+s,new T.SphereGeometry(1,10,8),skin());
   g('hip'+s,new T.SphereGeometry(4.75,14,12),mat(SHORT));
   g('short'+s,lathe([[0,4.8],[.25,4.95],[.5,4.55]],16),mat(SHORT));
   g('thigh'+s,lathe([[0,4.6],[.3,4.8],[.7,3.9],[1,3.1]],16),skin());
   g('knee'+s,new T.SphereGeometry(3.05,12,10),skin());
   g('shin'+s,lathe([[0,3.0],[.28,3.5],[.6,2.6],[1,1.8]],14),skin());
   g('sock'+s,lathe([[.8,2.3],[1,2.0]],12),mat(0xdcdcdc));
   g('shoe'+s,new T.SphereGeometry(1,14,10),mat(SHOE,{roughness:.5}));
   g('sole'+s,new T.SphereGeometry(1,14,6,0,Math.PI*2,Math.PI*.55,Math.PI*.45),mat(0x2c2f36,{roughness:.8}));
  });
  /* matériel réutilisable */
  const metal=()=>mat(METAL,{metalness:.75,roughness:.32}),dark=()=>mat(DARK,{roughness:.55,metalness:.3});
  const cyl=(r,m)=>{const o=mesh(new T.CylinderGeometry(r,r,1,14),m);o.geometry.translate(0,.5,0);return o;};
  eqp.bar=cyl(.75,metal());eqp.pl=[0,1,2,3].map(i=>cyl(i<2?6.2:4.6,dark()));eqp.plr=[0,1].map(()=>cyl(2.2,mat(ACC,{roughness:.5})));
  eqp.db=[0,1].map(()=>({h:cyl(.6,metal()),a:cyl(2.1,dark()),b:cyl(2.1,dark())}));
  eqp.grip=[0,1].map(()=>cyl(.85,mat(ACC,{roughness:.6})));
  eqp.ball=mesh(new T.SphereGeometry(5.2,18,14),mat(0x24262b,{roughness:.8}));eqp.ballr=mesh(new T.TorusGeometry(5.25,.28,6,24),mat(ACC));
  eqp.cable=[0,1].map(()=>cyl(.32,mat(0xa9afb8,{roughness:.4,metalness:.5})));eqp.cbar=cyl(.6,metal());
  eqp.pad=[0,1].map(()=>cyl(2.3,mat(PAD,{roughness:.9})));eqp.roll=cyl(2.4,mat(PAD,{roughness:.9}));
  eqp.sled=[0,1,2,3,4].map(i=>mesh(new T.BoxGeometry(1,1,1),i<1?dark():metal()));
  eqp.rail=[0,1].map(()=>cyl(.7,metal()));
 }
 function hideEq(){const h=o=>{if(Array.isArray(o))o.forEach(h);else if(o.isMesh)o.visible=false;else Object.values(o).forEach(h);};Object.values(eqp).forEach(h);}
 /* ---------- joints 2D -> 3D ---------- */
 const P3=(p,z,x)=>V(p[0]-50+(x||0),88-p[1],z||0);
 function joints3(J,pd,pat){const o={S:{},E:{},W:{},H:{},K:{},F:{},T:{}};
  if(J.front){const lz=p=>p[0]-50,Y=p=>88-p[1];
   o.P=V(0,Y(J.P),0);o.N=V(0,Y(J.N),0);o.Hd=V(0,Y(J.H),0);
   const hint=pat==='fly'?'hug':(pat==='pecdeck'||pat==='pecdeckrev')?'deck':(pat==='pulldown'||pat==='pullup')?'pull':'';
   [['R',J.SR,J.ER,J.WR,J.HR,J.KR,J.FR,1],['L',J.SL,J.EL,J.WL,J.HL,J.KL,J.FL,-1]].forEach(a=>{const s=a[0],sg=a[7];
    const S=V(0,Y(a[1])-.6,sg*9.0);o.S[s]=S;
    let ue=V(0,-(a[2][1]-a[1][1]),lz(a[2])-lz(a[1])),ew=V(0,-(a[3][1]-a[2][1]),lz(a[3])-lz(a[2]));
    if(hint==='deck'){const u=Math.atan2(Math.abs(ue.z),-ue.y)*180/Math.PI;const phi=Math.max(0,Math.min(1,(95-u)/73))*82*Math.PI/180;ue=V(Math.sin(phi)*12,-1.2,sg*Math.cos(phi)*12);ew=V(1.5,10.8,0);}
    else if(hint==='hug'){const L=Math.abs(ue.z),u=Math.atan2(L,-ue.y)*180/Math.PI,phi=Math.max(0,Math.min(1,(100-u)/62))*75*Math.PI/180;const rot=v=>{const l=Math.abs(v.z);return V(l*Math.sin(phi)+2,v.y,sg*l*Math.cos(phi)*(v.z*sg<0?-1:1));};ue=rot(ue);ew=rot(ew);ew.x+=3;}
    else if(hint==='pull'){ue.x=1.5;ew.x=2.5;}
    else{ue.x=1.2;ew.x=2.4;}
    o.E[s]=S.clone().add(ue);o.W[s]=o.E[s].clone().add(ew);
    const H=V(0,Y(a[4]),sg*4.9);o.H[s]=H;
    if(pd.seat){o.K[s]=V(14.5,H.y-8.5,sg*5.2);o.F[s]=V(15.5,2.6,sg*5.2);o.T[s]=V(21.5,1.4,sg*5.6);}
    else{o.K[s]=V(.8,Y(a[5]),sg*4.9);o.F[s]=V(0,Math.max(2.4,Y(a[6])+2.4),sg*5.2);o.T[s]=o.F[s].clone().add(V(6,Y(a[6])<1?-1:-2.6,sg*.8));}
   });
   o.front=true;return o;}
  o.P=P3(J.P);o.N=P3(J.N);o.Hd=P3(J.H);
  const ty=V().subVectors(o.N,o.P).normalize();
  [['R',1,J.K,J.F,J.T],['L',-1,J.K2,J.F2,J.T2]].forEach(a=>{const s=a[0],sg=a[1];
   o.S[s]=P3(J.N,sg*9.0).addScaledVector(ty,-1.6);o.E[s]=P3(J.E,sg*10.2);o.W[s]=P3(J.W,sg*10.0);
   o.H[s]=P3(J.P,sg*4.9);o.K[s]=P3(a[2],sg*5.2);o.F[s]=P3(a[3],sg*5.4);o.T[s]=P3(a[4],sg*6.0);
   o.F[s].y+=0;});
  return o;}
 const mid=(a,b)=>V().addVectors(a,b).multiplyScalar(.5);
 function pose(j){const ty=V().subVectors(j.N,j.P),tl=ty.length();ty.normalize();const LAT=V(0,0,1);
  const sc=tl/22;
  ['pelvis','abs','chest'].forEach(k=>bone(body[k],j.P,j.N,{fixed:true}));
  if(Math.abs(sc-1)>.02)['pelvis','abs','chest'].forEach(k=>{_s.set(1,sc,1);body[k].matrix.scale(_s);});
  const hd=V().subVectors(j.Hd,j.N).normalize(),nb=j.N.clone().addScaledVector(ty,-.6);
  bone(body.neck,nb,nb.clone().addScaledVector(hd,4.2),{base:1});
  const hc=j.N.clone().addScaledVector(hd,7.4);
  /* tête orientée : avant = y × z */
  _y.copy(hd);_z.copy(LAT).addScaledVector(_y,-LAT.dot(_y)).normalize();_x.crossVectors(_y,_z);
  const hm=new T.Matrix4().makeBasis(_x,_y,_z);hm.setPosition(hc);
  body.head.matrix.copy(hm).scale(_s.set(4.5,5.3,4.1));body.hair.matrix.copy(hm);body.hair.matrix.multiply(new T.Matrix4().makeRotationZ(.72)).scale(_s.set(5.0,5.85,4.62));
  body.nose.matrix.copy(hm).multiply(new T.Matrix4().makeTranslation(4.45,-.9,0));
  [['L',-1],['R',1]].forEach(a=>{body['ear'+a[0]].matrix.copy(hm).multiply(new T.Matrix4().makeTranslation(-.2,-.3,a[1]*4.05));body['eye'+a[0]].matrix.copy(hm).multiply(new T.Matrix4().makeTranslation(3.95,.55,a[1]*1.5));});
  ['L','R'].forEach(s=>{
   at(body['delt'+s],j.S[s]);bone(body['ua'+s],j.S[s],j.E[s]);at(body['elb'+s],j.E[s]);bone(body['fa'+s],j.E[s],j.W[s]);
   const fd=V().subVectors(j.W[s],j.E[s]).normalize(),hp=j.W[s].clone().addScaledVector(fd,1.5);
   bone(body['hand'+s],hp.clone().addScaledVector(fd,-.01),hp.clone().addScaledVector(fd,1),{fixed:true,sx:1.05,sz:1.45});body['hand'+s].matrix.scale(_s.set(1.25,2.4,1.25));
   at(body['hip'+s],j.H[s]);bone(body['short'+s],j.H[s],j.K[s]);bone(body['thigh'+s],j.H[s],j.K[s]);at(body['knee'+s],j.K[s]);bone(body['shin'+s],j.K[s],j.F[s]);bone(body['sock'+s],j.K[s],j.F[s]);
   const fdv=V().subVectors(j.T[s],j.F[s]);const fl=fdv.length()||1;fdv.multiplyScalar(1/fl);const sc0=j.F[s].clone().addScaledVector(fdv,2.2);sc0.y-=1.1;
   /* chaussure : ellipsoïde allongée vers la pointe */
   _y.copy(fdv);_z.copy(LAT).addScaledVector(_y,-LAT.dot(_y)).normalize();_x.crossVectors(_y,_z);
   const fm=new T.Matrix4().makeBasis(_x,_y,_z);fm.setPosition(sc0);
   body['shoe'+s].matrix.copy(fm).scale(_s.set(2.5,5.0,2.9));body['sole'+s].matrix.copy(fm).multiply(new T.Matrix4().makeRotationZ(-Math.PI/2)).scale(_s.set(5.1,2.6,3.0));
  });}
 /* ---------- surbrillance du muscle ciblé ---------- */
 const GL={quad:['thighL','thighR'],ham:['thighL','thighR'],glute:['pelvis','shortL','shortR','hipL','hipR'],calf:['shinL','shinR'],chest:['chest'],lat:['chest','abs'],abs:['abs'],delt:['deltL','deltR'],tri:['uaL','uaR'],bi:['uaL','uaR']};
 const _ca=new T.Color(ACC);
 function setGlow(mu,t){glow.forEach(k=>{const m=body[k].material;m.emissive.setHex(0);if(m.userData.c0!==undefined)m.color.setHex(m.userData.c0);});glow=GL[mu]||[];const a=.5+.5*Math.sin(t*4.5);glow.forEach(k=>{const m=body[k].material;if(m.userData.c0===undefined)m.userData.c0=m.color.getHex();m.color.setHex(m.userData.c0).lerp(_ca,.42+.2*a);m.emissive.setHex(ACC);m.emissiveIntensity=.16+.16*a;});}
 /* ---------- matériel ---------- */
 const ZAX=V(0,0,1);
 function seg(o,A,B){return bone(o,A,B,{base:1});}
 function equip(eq,j,J,pd,smith){hideEq();if(smith&&eq==='handle')eq='bar';if(!eq||eq==='none')return;
  const wm=mid(j.W.L,j.W.R),key=pd.at||'W';
  let c=key==='N'?j.N.clone().add(V(-3.4,.6,0)):key==='P'?j.P.clone().add(V(0,4.6,0)):key==='F'?mid(j.F.L,j.F.R):wm.clone();
  const along=(o,C,half)=>seg(o,C.clone().add(V(0,0,-half)),C.clone().add(V(0,0,half)));
  if(eq==='bar'){const hc=key==='W'?wm.clone().add(V().subVectors(j.W.R,j.E.R).normalize().multiplyScalar(1.6)):c;along(eqp.bar,hc,24);
   [[17.5,20.2,0],[-20.2,-17.5,1]].forEach(a=>{seg(eqp.pl[a[2]],hc.clone().add(V(0,0,a[0])),hc.clone().add(V(0,0,a[1])));seg(eqp.pl[a[2]+2],hc.clone().add(V(0,0,a[0]>0?20.2:-21.6)),hc.clone().add(V(0,0,a[0]>0?21.6:-20.2)));});
   seg(eqp.plr[0],hc.clone().add(V(0,0,21.6)),hc.clone().add(V(0,0,22.6)));seg(eqp.plr[1],hc.clone().add(V(0,0,-22.6)),hc.clone().add(V(0,0,-21.6)));
   if(smith){eqp.rail.forEach((r,i)=>seg(r,V(hc.x,0,i?-25:25),V(hc.x,86,i?-25:25)));}}
  else if(eq==='db'||eq==='db2'){['L','R'].forEach((s,i)=>{const fd=V().subVectors(j.W[s],j.E[s]).normalize(),h=j.W[s].clone().addScaledVector(fd,1.7),d=eqp.db[i];
    let ax=V(1,0,0);if(Math.abs(fd.x)>.75)ax=V(0,0,1);ax.addScaledVector(fd,-ax.dot(fd)).normalize();
    seg(d.h,h.clone().addScaledVector(ax,-3.6),h.clone().addScaledVector(ax,3.6));seg(d.a,h.clone().addScaledVector(ax,-3.9),h.clone().addScaledVector(ax,-2.0));seg(d.b,h.clone().addScaledVector(ax,2.0),h.clone().addScaledVector(ax,3.9));});}
  else if(eq==='handle'){['L','R'].forEach((s,i)=>{const fd=V().subVectors(j.W[s],j.E[s]).normalize(),h=j.W[s].clone().addScaledVector(fd,1.7);seg(eqp.grip[i],h.clone().add(V(0,0,-2.4)),h.clone().add(V(0,0,2.4)));});}
  else if(eq==='ball'){const b=wm.clone().add(V().subVectors(j.W.R,j.E.R).normalize().multiplyScalar(5));at(eqp.ball,b);eqp.ballr.matrix.makeRotationY(.5);eqp.ballr.matrix.setPosition(b);eqp.ballr.visible=true;}
  else if(eq==='cable'){const an=pd.anchor||[94,30],A=V(an[0]-50,88-an[1],0),fd=V().subVectors(j.W.R,j.E.R).normalize(),h=wm.clone().addScaledVector(fd,1.7);
   seg(eqp.cable[0],h,A);along(eqp.cbar,h,10.5);}
  else if(eq==='pads'){['L','R'].forEach((s,i)=>{const a=mid(j.E[s],j.W[s]);seg(eqp.pad[i],a.clone().add(V(1.6,-4.2,0)),a.clone().add(V(1.6,4.2,0)));});}
  else if(eq==='hbar'){const d=V().subVectors(j.W.R,j.W.L).normalize(),up=V(1.2,1.6,0);seg(eqp.bar,j.W.L.clone().add(up).addScaledVector(d,-6),j.W.R.clone().add(up).addScaledVector(d,6));
   if(pd.seat){const m=wm.clone().add(up);seg(eqp.cable[0],m,V(m.x,90,0));}}
  else if(eq==='pad'){const f=mid(j.F.L,j.F.R),sd=V().subVectors(j.F.R,j.K.R).normalize(),fr=V().crossVectors(sd,ZAX).normalize(),p=f.clone().addScaledVector(sd,-2.5).addScaledVector(fr,-3.6);along(eqp.roll,p,9);}
  else if(eq==='sled'){const h=wm,b=eqp.sled,box=(o,cx,cy,cz,sx,sy,sz)=>{o.matrix.makeScale(sx,sy,sz);o.matrix.setPosition(cx,cy,cz);o.visible=true;};
   box(b[0],h.x+11,3,0,26,3,22);box(b[1],h.x+1,h.y/2+2,8.4,1.4,h.y+4,1.4);box(b[2],h.x+1,h.y/2+2,-8.4,1.4,h.y+4,1.4);box(b[3],h.x+13,9,0,9,9,9);box(b[4],h.x+1,h.y+3,0,1.2,1.2,18);}
 }
 /* ---------- décor (bancs, bâtis) : chemins 2D -> volumes ---------- */
 function parseDeco(s){const segs=[],circ=[];(s.match(/d="[^"]*"/g)||[]).forEach(d=>{const tk=d.slice(3,-1).match(/[MLHVZ]|-?\d+(?:\.\d+)?/g)||[];let i=0,cmd='',cx=0,cy=0,sx=0,sy=0;
   while(i<tk.length){if(/[MLHVZ]/.test(tk[i])){cmd=tk[i++];if(cmd==='Z'){segs.push([cx,cy,sx,sy]);cx=sx;cy=sy;continue;}}
    if(cmd==='M'){cx=+tk[i++];cy=+tk[i++];sx=cx;sy=cy;cmd='L';}else if(cmd==='L'){const x=+tk[i++],y=+tk[i++];segs.push([cx,cy,x,y]);cx=x;cy=y;}
    else if(cmd==='H'){const x=+tk[i++];segs.push([cx,cy,x,cy]);cx=x;}else if(cmd==='V'){const y=+tk[i++];segs.push([cx,cy,cx,y]);cy=y;}else i++;}});
  (s.match(/<circle[^>]*>/g)||[]).forEach(c=>{const g=k=>+((c.match(new RegExp(k+'="([\\d.]+)"'))||[])[1]||0);circ.push([g('cx'),g('cy'),g('r')]);});return{segs:segs,circ:circ};}
 function decoFor(pat,pd){if(decoCache[pat]!==undefined)return decoCache[pat];const grp=new T.Group();grp.visible=false;scene.add(grp);decoCache[pat]=grp;if(!pd.deco)return grp;
  const d=parseDeco(pd.deco),fm=mat(FRAME,{metalness:.55,roughness:.45}),pm=mat(PAD,{roughness:.85}),fv=!!pd.fv;
  const box=(cx,cy,cz,sx,sy,sz,m,rz)=>{const o=new T.Mesh(new T.BoxGeometry(sx,sy,sz),m);o.position.set(cx,cy,cz);if(rz)o.rotation.z=rz;o.castShadow=true;grp.add(o);return o;};
  const tube=(A,B,r,m)=>{const o=new T.Mesh(new T.CylinderGeometry(r,r,1,10),m);o.geometry.translate(0,.5,0);o.matrixAutoUpdate=false;o.castShadow=true;grp.add(o);bone(o,A,B,{base:1});return o;};
  const wide=pat==='squat'?24:pat==='wallball'?0:pat==='dips'?9:pat==='hanging'?0:6.5;
  d.segs.forEach(s=>{const x1=s[0]-50,y1=88-s[1],x2=s[2]-50,y2=88-s[3],dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy);if(L<.5)return;const hor=Math.abs(dy)<Math.abs(dx)*.45,gnd=Math.min(y1,y2)<1.5;
   if(fv){/* plan frontal : x 2D = latéral (Z) */
    if(hor){if(Math.max(y1,y2)>60)tube(V(1.5,y1+1.6,x1),V(1.5,y2+1.6,x2),1,fm);else if(y1<3)box(-2,y1+.8,(x1+x2)/2,14,1.6,L,fm);else box(-1,y1-1.4,(x1+x2)/2,15,2.8,L,pm);}
    else if(Math.max(y1,y2)>60){}else tube(V(-2,y1,x1),V(-2,y2,x2),1.5,fm);return;}
   if(pat==='wallball'){if(!hor&&gnd)box(x1+2.5,43,0,3,86,60,mat(0x2a2d33,{roughness:.9}));else if(hor&&y1>60)box(x1+.5,(88-22),0,1.5,16,16,mat(ACC,{roughness:.7}));return;}
   if(hor){if(gnd)box((x1+x2)/2,.8,0,L,1.6,wide*2+3,fm);else if(pat==='dips'||pat==='hanging'){tube(V(x1,y1,-wide),V(x2,y2,-wide),1,fm);if(wide)tube(V(x1,y1,wide),V(x2,y2,wide),1,fm);else{grp.children[grp.children.length-1].matrix.identity();bone(grp.children[grp.children.length-1],V((x1+x2)/2,y1,-16),V((x1+x2)/2,y1,16),{base:1});}}
     else if(pat==='squat')[-1,1].forEach(z=>tube(V(x1,y1,z*wide),V(x2,y2,z*wide),.9,fm));
     else if(Math.min(y1,y2)>38&&L<30)[-1,1].forEach(z=>tube(V(x1,y1,z*9),V(x2,y2,z*9),1,fm));
     else box((x1+x2)/2,(y1+y2)/2-1.3,0,L,2.6,13,pm,Math.atan2(dy,dx));}
   else if(gnd||Math.abs(dx)<Math.abs(dy)*.2&&L>30){[-1,1].forEach(z=>tube(V(x1,y1,z*(wide||5)),V(x2,y2,z*(wide||5)),1.1,fm));}
   else if(Math.min(y1,y2)>38&&Math.abs(dx)>3){[-1,1].forEach(z=>tube(V(x1,y1,z*9),V(x2,y2,z*9),1,fm));}
   else{/* dossier / plan incliné */const o=box((x1+x2)/2,(y1+y2)/2,0,L,2.4,12,pm,Math.atan2(dy,dx));o.translateY(-1.4*(dx*dy>0?-1:1)*0);}
  });
  d.circ.forEach(c=>{const o=new T.Mesh(new T.CylinderGeometry(c[2],c[2],2.4,24),mat(DARK,{metalness:.5,roughness:.4}));o.rotation.x=Math.PI/2;o.position.set(c[0]-50,88-c[1],0);o.castShadow=true;grp.add(o);const r=new T.Mesh(new T.TorusGeometry(c[2],.5,6,24),mat(ACC));r.position.copy(o.position);grp.add(r);});
  return grp;}
 /* ---------- MACHINES : bâti, bras de levier, colonne de plaques / disques, couleurs par marque ---------- */
 const MFAM={chestpress:1,shpressm:1,hbench:1,highrow:1,machrow:1,pulldown:1,pecdeck:1,pecdeckrev:1,latmach:1,legpress:1,hack:1,legext:1,legcurl:1,preacher:0};
 function mkOf(name,pat){const n=name||'';let b=/technogym/i.test(n)?'tg':/hammer/i.test(n)?'hs':/gym80/i.test(n)?'g8':'';
  if(!b){if(MFAM[pat]||/machine|presse|leg press|pec deck|convergente|hack|guidé|butterfly/i.test(n))b='gen';else return '';}
  let t='sel';if(/disques|plate.?loaded|pure kraft/i.test(n)||(b==='g8'&&!/hybrid/i.test(n))||(b==='hs'&&!/select|mts/i.test(n))||(b==='gen'&&(pat==='hack'||pat==='hbench'||(pat==='legpress'&&!/assis|horizont/i.test(n)))))t='pl';
  return b+'|'+t;}
 const BR={tg:{f:0x2b2d31,a:0xf2c200,s:0xd4d7db},hs:{f:0xb7bcc4,a:0xc8102e,s:0x2a2c30},g8:{f:0x121316,a:0xd01f2a,s:0x1a1b1f},gen:{f:0x4a4f58,a:0xff5a1f,s:0x2a2d33}};
 const machCache={};let curMach=null;
 function machFor(pat,pd,mk){if(!mk)return null;const key=pat+'|'+mk;if(machCache[key]!==undefined)return machCache[key];
  const b=mk.split('|')[0],pl=mk.split('|')[1]==='pl',C=BR[b],grp=new T.Group();grp.visible=false;scene.add(grp);
  const fm=mat(C.f,{metalness:.6,roughness:.4}),am=mat(C.a,{roughness:.5}),pm=mat(PAD,{roughness:.85}),sm=mat(C.s,{roughness:.6,metalness:.2}),wm=mat(0x202126,{metalness:.2,roughness:.6});
  const upd=[];
  const tube=(A,B,r,m)=>{const o=new T.Mesh(new T.CylinderGeometry(r,r,1,10),m||fm);o.geometry.translate(0,.5,0);o.matrixAutoUpdate=false;o.castShadow=true;grp.add(o);bone(o,A,B,{base:1});return o;};
  const dyn=(r,m)=>{const o=new T.Mesh(new T.CylinderGeometry(r,r,1,12),m||fm);o.geometry.translate(0,.5,0);o.matrixAutoUpdate=false;o.castShadow=true;grp.add(o);return o;};
  const box=(cx,cy,cz,sx,sy,sz,m,rz)=>{const o=new T.Mesh(new T.BoxGeometry(sx,sy,sz),m||fm);o.position.set(cx,cy,cz);if(rz)o.rotation.z=rz;o.castShadow=true;grp.add(o);return o;};
  const ball=(P,r,m)=>{const o=new T.Mesh(new T.SphereGeometry(r,10,8),m||am);o.position.copy(P);grp.add(o);return o;};
  /* colonne de plaques (sélecteur) : plaques fixes + bloc mobile qui monte avec l'effort */
  const stack=(x,z,inv)=>{box(x,1,z,8,2,16);[-1,1].forEach(s=>tube(V(x,2,z+s*4),V(x,60,z+s*4),.55,mat(METAL,{metalness:.8,roughness:.3})));box(x,61,z,8,2.4,16);
   for(let i=0;i<9;i++)box(x,4+i*2.15,z,5.4,1.85,12.5,wm);
   const mg=new T.Group();for(let i=0;i<4;i++){const o=new T.Mesh(new T.BoxGeometry(5.4,1.85,12.5),wm);o.position.set(x,i*2.15,z);o.castShadow=true;mg.add(o);}
   const pin=new T.Mesh(new T.BoxGeometry(6.2,.9,2.2),am);pin.position.set(x,2.15*1,z+5.4);mg.add(pin);grp.add(mg);
   box(x-3.6,31,z,1,60,17,sm);
   upd.push((j,p)=>{mg.position.y=4+9*2.15+(inv?1-p:p)*14;});};
  /* disques sur ergot : suivent un point mobile */
  const plates=(fn,n)=>{const ds=[];[-1,1].forEach(s=>{for(let i=0;i<(n||2);i++){ds.push([dyn(6.4,wm),s,i]);}const h=dyn(.9,mat(METAL,{metalness:.8,roughness:.3}));ds.push([h,s,-1]);const cp=dyn(1.5,am);ds.push([cp,s,-2]);});
   upd.push((j,p)=>{ds.forEach(d=>{const q=fn(j,p,d[1]);if(!q){d[0].visible=false;return;}const s=d[1],z0=q.z;
     if(d[2]===-1)seg(d[0],V(q.x,q.y,z0),V(q.x,q.y,z0+s*8));else if(d[2]===-2)seg(d[0],V(q.x,q.y,z0+s*7.6),V(q.x,q.y,z0+s*8.6));else seg(d[0],V(q.x,q.y,z0+s*(2.2+d[2]*1.9)),V(q.x,q.y,z0+s*(3.8+d[2]*1.9)));});});};
  const hand=(j,s)=>{const k=s>0?'R':'L',fd=V().subVectors(j.W[k],j.E[k]).normalize();return j.W[k].clone().addScaledVector(fd,1.7);};
  /* bras de levier : pivot fixe -> main, + disques éventuels */
  const lever=(px,py,z,pf,opt)=>{opt=opt||{};const a=[dyn(1.15),dyn(1.15)],g=[dyn(1.0,am),dyn(1.0,am)];
   [-1,1].forEach(s=>ball(V(px,py,s*z),2,am));tube(V(px,py,-z-1.5),V(px,py,z+1.5),1.3);
   upd.push(j=>{[-1,1].forEach((s,i)=>{const h=hand(j,s),pv=V(px,py,s*z),el=V(h.x,h.y,s*z);seg(a[i],pv,el);seg(g[i],el,V(h.x,h.y,h.z-s*2.6));});});
   if(pl)plates((j,p,s)=>{const h=hand(j,s);return V(px+(h.x-px)*pf,py+(h.y-py)*pf,s*z);},2);};
  const upright=(x0,x1,y1,z)=>{[-1,1].forEach(s=>tube(V(x0,0,s*z),V(x1,y1,s*z),1.35));tube(V(x0,.9,-z-4),V(x0,.9,z+4),1.2);};
  const knob=(x,y,z)=>ball(V(x,y,z),1.35,am);
  if(pat==='chestpress'){upright(-27,-23,66,13);lever(-23,66,13,.62);if(!pl)stack(-39,0);knob(-8,9,7);}
  else if(pat==='shpressm'){upright(-30,-28,52,13);lever(-28,52,13,.6);if(!pl)stack(-41,0);knob(-8,9,7);}
  else if(pat==='hbench'){upright(-42,-42,54,14);lever(-42,54,14,.7);if(!pl)stack(-52,0);}
  else if(pat==='highrow'){upright(25,27,84,12);lever(27,84,12,.5);if(!pl)stack(40,0);knob(-6,9,7);}
  else if(pat==='machrow'){[-1,1].forEach(s=>tube(V(-8,1,s*9),V(28,1,s*9),1.2));lever(26,5,12,.62);if(!pl)stack(40,0);knob(-6,9,7);}
  else if(pat==='legext'||pat==='legcurl'){const K0=joints3(jointsAt(pd,1e-6),pd,pat).K.R.clone(),a=[dyn(1.1),dyn(1.1)];[-1,1].forEach(s=>ball(V(K0.x,K0.y,s*10.5),1.9,am));
   upd.push(j=>{[-1,1].forEach((s,i)=>{const f=j.F[s>0?'R':'L'],sd=V().subVectors(f,j.K[s>0?'R':'L']).normalize(),fr=V().crossVectors(sd,ZAX).normalize(),e=f.clone().addScaledVector(sd,-2.5).addScaledVector(fr,-3.6);seg(a[i],V(K0.x,K0.y,s*10.5),V(e.x,e.y,s*10.5));});});
   if(pl)plates((j,p,s)=>{const f=j.F.R,sd=V().subVectors(f,j.K.R).normalize();const e=f.clone().addScaledVector(sd,2);return V(e.x,e.y,s*10.5);},1);else stack(K0.x-14,-21,pat==='legcurl'?false:false);
   knob(K0.x-10,K0.y-5,8);}
  else if(pat==='legpress'){const d=V(44,28,0).normalize(),n=V(-d.y,d.x,0),fp=new T.Mesh(new T.BoxGeometry(2.2,22,27),fm);fp.castShadow=true;fp.matrixAutoUpdate=false;grp.add(fp);const rl=[dyn(1.2),dyn(1.2)];
   [-1,1].forEach(s=>tube(V(-12,2,s*15),V(34,31,s*15),1.3));
   upd.push(j=>{const f=mid(j.F.L,j.F.R),c=f.clone().addScaledVector(d,3.4).addScaledVector(n,-1.5);_m.makeBasis(d,n,ZAX);_m.setPosition(c);fp.matrix.copy(_m);[-1,1].forEach((s,i)=>seg(rl[i],V(c.x,c.y,s*13.5).addScaledVector(n,-11),V(c.x,c.y,s*13.5).addScaledVector(n,-11).addScaledVector(d,-14)));});
   if(pl)plates((j,p,s)=>{const f=mid(j.F.L,j.F.R).addScaledVector(d,4).addScaledVector(n,-4);return V(f.x,f.y,s*14.5);},3);else stack(6,-26,true);}
  else if(pat==='hack'){const bp=new T.Mesh(new T.BoxGeometry(3,24,15),pm);bp.matrixAutoUpdate=false;bp.castShadow=true;grp.add(bp);const sp=[dyn(2.6,pm),dyn(2.6,pm)];
   upd.push(j=>{const ty=V().subVectors(j.N,j.P).normalize(),bk=V().crossVectors(ZAX,ty).normalize(),c=mid(j.P,j.N).addScaledVector(bk,6.2).addScaledVector(ty,1);_m.makeBasis(bk,ty,ZAX);_m.setPosition(c);bp.matrix.copy(_m);
    [-1,1].forEach((s,i)=>{const a=j.N.clone().addScaledVector(ty,1.5);seg(sp[i],V(a.x,a.y,s*7).addScaledVector(bk,5),V(a.x,a.y,s*7).addScaledVector(bk,-7));});});
   plates((j,p,s)=>{const ty=V().subVectors(j.N,j.P).normalize(),bk=V().crossVectors(ZAX,ty).normalize(),c=j.N.clone().addScaledVector(bk,8).addScaledVector(ty,-4);return V(c.x,c.y,s*9.5);},3);}
  else if(pat==='pulldown'){[-1,1].forEach(s=>{tube(V(-13,0,s*13),V(-13,96,s*13),1.4);tube(V(-13,96,s*13),V(4,96,s*5),1.3);});tube(V(-13,96,-13),V(-13,96,13),1.3);tube(V(-13,1,-17),V(-13,1,17),1.2);
   const kr=tube(V(9,39.5,-10),V(9,39.5,10),2.5,pm);tube(V(2,24,0),V(9,39,0),1.2);
   if(pl){const a=[dyn(1.15),dyn(1.15)];[-1,1].forEach(s=>ball(V(-9,94,s*9),2,am));upd.push(j=>{[-1,1].forEach((s,i)=>{const h=j.W[s>0?'R':'L'];seg(a[i],V(-9,94,s*9),V(h.x+1.2,h.y+1.6,h.z));});});
    plates((j,p,s)=>{const h=j.W[s>0?'R':'L'];return V(-9+(h.x+10.2)*.45,94+(h.y-92.4)*.45,s*9+(h.z-s*9)*.45);},2);}
   else{stack(-24,0);const pu=new T.Mesh(new T.CylinderGeometry(3,3,1.6,16),wm);pu.rotation.x=Math.PI/2;pu.position.set(3,94,0);grp.add(pu);}
   knob(-4,22,8);}
  else if(pat==='pecdeck'||pat==='pecdeckrev'||pat==='latmach'){[-1,1].forEach(s=>tube(V(-13,0,s*11),V(-13,78,s*11),1.4));tube(V(-13,78,-13),V(-13,78,13),1.3);tube(V(-13,1,-16),V(-13,1,16),1.2);box(-6.5,46,0,2.6,30,13,pm);
   if(pat==='latmach'){const a=[dyn(1.15),dyn(1.15)];const S0=joints3(jointsAt(pd,1e-6),pd,pat).S;[-1,1].forEach(s=>{ball(V(-4,S0.R.y+1,s*10.5),1.9,am);tube(V(-13,S0.R.y+1,s*10.5),V(-4,S0.R.y+1,s*10.5),1.2);});
    upd.push(j=>{[-1,1].forEach((s,i)=>{const k=s>0?'R':'L',e=mid(j.E[k],j.W[k]);seg(a[i],V(-4,S0.R.y+1,s*10.5),V(e.x+1.6,e.y,e.z+s*1));});});
    if(pl)plates((j,p,s)=>{const k=s>0?'R':'L',e=mid(j.E[k],j.W[k]);return V(e.x-3,e.y,e.z+s*2.5);},1);else stack(-25,0);}
   else{const a=[dyn(1.15),dyn(1.15)],v=[dyn(1.15),dyn(1.15)];[-1,1].forEach(s=>{tube(V(-13,78,s*11),V(-2,78,s*11),1.3);ball(V(-2,78,s*11),2,am);});
    upd.push(j=>{[-1,1].forEach((s,i)=>{const k=s>0?'R':'L',e=mid(j.E[k],j.W[k]).add(V(1.6,0,0));seg(a[i],V(-2,78,s*11),V(e.x,78,e.z));seg(v[i],V(e.x,78,e.z),V(e.x,e.y+4.2,e.z));});});
    if(pl)plates((j,p,s)=>{const k=s>0?'R':'L',e=mid(j.E[k],j.W[k]);return V(-2+(e.x+3.6)*.5,80,s*11+(e.z-s*11)*.5);},1);else stack(-25,0,pat==='pecdeckrev'?false:false);}
   knob(-2,22,8);}
  else{/* autre machine de marque : colonne de plaques ou râtelier de disques derrière l'athlète */
   const bx=pd.fv?-26:-42;if(pl){[-1,1].forEach(s=>{tube(V(bx,0,s*6),V(bx,34,s*6),1.3);});tube(V(bx,1,-9),V(bx,1,9),1.2);[14,26].forEach(y=>{[-1,1].forEach(s=>{const o=new T.Mesh(new T.CylinderGeometry(6,6,3.2,18),wm);o.rotation.x=Math.PI/2;o.position.set(bx,y,s*9.2);o.castShadow=true;grp.add(o);const c=new T.Mesh(new T.CylinderGeometry(1.4,1.4,4,10),am);c.rotation.x=Math.PI/2;c.position.set(bx,y,s*9.6);grp.add(c);});});}
   else stack(bx,0);}
  /* progression 0..1 du mouvement (main ou pied entre les deux poses extrêmes) */
  const leg=pat==='legext'||pat==='legcurl'||pat==='legpress'||pat==='hack';
  const j0=joints3(jointsAt(pd,1e-6),pd,pat),j1=joints3(jointsAt(pd,.5),pd,pat),q=j=>leg?(pat==='hack'?j.N:j.F.R):j.W.R,A0=q(j0).clone(),D=V().subVectors(q(j1),A0),dl=D.lengthSq()||1;
  const m={grp:grp,update:j=>{const p=Math.max(0,Math.min(1,V().subVectors(q(j),A0).dot(D)/dl));upd.forEach(f=>f(j,p));},box:null};
  m.update(j0);grp.updateMatrixWorld(true);const bb=new T.Box3().setFromObject(grp);m.box=bb;machCache[key]=m;return m;}
 /* ---------- rendu partagé ---------- */
 function init(){try{const cv=document.createElement('canvas');R=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true,preserveDrawingBuffer:false});R.setPixelRatio(1);R.setSize(RW,RH,false);R.setClearColor(0,0);
   R.shadowMap.enabled=true;R.shadowMap.type=T.PCFSoftShadowMap;if(T.sRGBEncoding)R.outputEncoding=T.sRGBEncoding;
   scene=new T.Scene();cam=new T.PerspectiveCamera(24,RW/RH,10,800);
   scene.add(new T.HemisphereLight(0xdfe6f2,0x24262c,.5));
   const key=new T.DirectionalLight(0xfff0e0,.82);key.position.set(60,150,110);key.castShadow=true;key.shadow.mapSize.set(1024,1024);const sc=key.shadow.camera;sc.left=-75;sc.right=75;sc.top=95;sc.bottom=-20;sc.near=10;sc.far=400;key.shadow.bias=-.0015;key.shadow.radius=3;scene.add(key);
   const rim=new T.DirectionalLight(0xff6a2c,.42);rim.position.set(-100,18,-110);scene.add(rim);
   const fl=new T.Mesh(new T.PlaneGeometry(400,400),new T.ShadowMaterial({opacity:.42}));fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;scene.add(fl);
   const disc=new T.Mesh(new T.CircleGeometry(58,48),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.045,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.position.y=-.05;scene.add(disc);
   build();ok=true;}catch(e){ok=false;}}
 function frame(c,now){const pat=c.dataset.pat,pd=PATS[pat];if(!pd)return;const t=((now/1000)/pd.dur)%1,J=jointsAt(pd,t),j=joints3(J,pd,pat);
  pose(j);setGlow(MU[pat],now/1000);const sm_=c.dataset.smith==='1';let eq_=c.dataset.eq;if(c.dataset.mk&&c.dataset.mk.indexOf('gen')!==0&&!sm_&&(eq_==='bar'||eq_==='db'))eq_='handle';equip(eq_,j,J,pd,sm_);
  const dg=decoFor(pat,pd);if(curDeco&&curDeco!==dg)curDeco.visible=false;dg.visible=true;curDeco=dg;
  const mc=machFor(pat,pd,c.dataset.mk);if(curMach&&curMach!==mc)curMach.grp.visible=false;if(mc){mc.grp.visible=true;mc.update(j);}curMach=mc;
  const az=((pd.fv?64:30)+5*Math.sin(now/2600))*Math.PI/180,el=13*Math.PI/180,ft=fitFor(pat,pd,mc),D=216*ft.k,ty=ft.cy,tx=ft.cx;
  cam.position.set(tx+Math.sin(az)*Math.cos(el)*D,ty+Math.sin(el)*D,Math.cos(az)*Math.cos(el)*D);cam.lookAt(tx,ty,0);
  R.render(scene,cam);const x=c._x||(c._x=c.getContext('2d'));x.clearRect(0,0,c.width,c.height);x.drawImage(R.domElement,0,0,c.width,c.height);}
 const fits={};const c_mk=mc=>{for(const k in machCache)if(machCache[k]===mc)return k;return'';};
 function fitFor(pat,pd,mc){const fk=pat+(mc?'|'+c_mk(mc):'');if(fits[fk])return fits[fk];let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,z1=12;for(let i=0;i<10;i++){const j=joints3(jointsAt(pd,i/10+1e-6),pd,pat);[j.P,j.N,j.Hd].concat(Object.values(j.E),Object.values(j.W),Object.values(j.K),Object.values(j.F),Object.values(j.T)).forEach(v=>{x0=Math.min(x0,v.x);x1=Math.max(x1,v.x);y0=Math.min(y0,v.y);y1=Math.max(y1,v.y);z1=Math.max(z1,Math.abs(v.z));});}
  y1+=9;y0=Math.min(y0,0);x0-=7;x1+=7;if(mc&&mc.box){x0=Math.min(x0,mc.box.min.x-2);x1=Math.max(x1,mc.box.max.x+2);y1=Math.max(y1,Math.min(mc.box.max.y+3,100));z1=Math.max(z1,Math.min(24,mc.box.max.z));}const a=(pd.fv?64:30)*Math.PI/180,w=(x1-x0)*Math.cos(a)+2*(z1+6)*Math.sin(a)+16,h=(y1-y0)+14;
  const k=Math.max(.6,Math.min(1.3,Math.max(h/94,w/100)));return fits[fk]={k:k,cx:(x0+x1)/2*(k<1?.8:0),cy:Math.max(30*k+6,(y0+y1)/2)};}
 let run=false,last=0,vis=new Set(),io=null;
 function loop(now){const l=document.querySelectorAll('canvas.fig3d');if(!l.length||document.hidden){run=false;return;}
  if(now-last>30){last=now;l.forEach(c=>{if(!io||vis.has(c)||!c._d){c._d=1;try{frame(c,now);}catch(e){}}});}
  requestAnimationFrame(loop);}
 function upgrade(){if(!R)init();if(!ok)return;
  if(!io&&'IntersectionObserver' in window)io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target);}),{rootMargin:'80px'});
  document.querySelectorAll('svg.fig').forEach(s=>{const c=document.createElement('canvas');c.className=s.getAttribute('class')+' fig3d';c.dataset.pat=s.dataset.pat;c.dataset.eq=s.dataset.eq;c.dataset.smith=/stroke-dasharray/.test(s.innerHTML)?'1':'0';c.dataset.mk=mkOf(s.dataset.nm||'',s.dataset.pat);
   const big=/\bbig\b|\blg\b/.test(c.className)||s.clientWidth>170;c.width=big?RW:260;c.height=Math.round(c.width*94/100);s.parentNode.insertBefore(c,s);s.remove();if(io)io.observe(c);else vis.add(c);});
  if(io)vis.forEach(c=>{if(!c.isConnected){vis.delete(c);io.unobserve(c);}});
  const l=document.querySelectorAll('canvas.fig3d');const now=performance.now();l.forEach(c=>{if(!c._d){c._d=1;try{frame(c,now);}catch(e){}}});
  if(!run&&l.length){run=true;requestAnimationFrame(loop);}}
 const _fh=figHTML;figHTML=function(pat,name,cls){const h=_fh(pat,name,cls);return h.replace('<svg ','<svg data-nm="'+String(name||'').replace(/["<>&]/g,'')+'" ');};
 const _sf=startFigs;startFigs=function(){try{upgrade();}catch(e){ok=false;}return _sf.apply(this,arguments);};
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&ok&&!run&&document.querySelector('canvas.fig3d')){run=true;requestAnimationFrame(loop);}});
 window.FIG3D={upgrade:upgrade,get ok(){return ok;}};
})();
