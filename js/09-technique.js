/* ===================== TECHNIQUES D'INTENSITÉ (option par exercice) ===================== */
const TECH=[['','Normal',''],
['fail','Jusqu\'à l\'échec (dernière série)','Garde 1–2 reps en réserve sur les premières séries, puis va jusqu\'à l\'échec technique (plus aucune rep propre) sur la dernière. Pas d\'échec sur les exercices lourds sans sécurité.'],
['drop','Drop set','Série à l\'échec, baisse la charge de 20–25 % sans repos, repars à l\'échec. 1 à 2 baisses maximum. À réserver à l\'isolation (poulie, machine).'],
['rp','Rest-pause','Série à l\'échec, repos 15–20 s, relance 3–5 reps jusqu\'à l\'échec, répète 1 à 2 fois. Gain de temps et beaucoup d\'intensité.'],
['tempo','Tempo lent','3 s en descente, 1 s de pause en bas, montée contrôlée. Baisse la charge d\'environ 20 %. Très bon pour apprendre le geste.'],
['partial','Partielles en étirement','Après l\'échec, enchaîne 5–8 demi-répétitions dans la moitié basse (muscle étiré). Très efficace sur triceps, mollets, pecs en isolation.'],
['pause','Pause en étirement','2 s de pause en position étirée à chaque rep (bas du curl, bas de l\'extension, bas de l\'écarté). Réduis la charge de 15–20 %.']];
function techHTML(id,d,e){if(!ssLift(id))return'';const cur=(e&&e.tech)||'';const t=TECH.find(x=>x[0]===cur)||TECH[0];
 return'<div class="techr"><select class="sel s" data-i="tech" data-id="'+id+'" data-d="'+d+'"><option value="">Technique : normale</option>'+TECH.slice(1).map(x=>'<option value="'+x[0]+'"'+(x[0]===cur?' selected':'')+'>'+esc(x[1])+'</option>').join('')+'</select>'+(cur?'<div class="obj" style="margin-top:4px">'+esc(t[2])+'</div>':'')+'</div>';}
