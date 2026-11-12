// Codice condiviso da index.html e novita/index.html: legge il Google Sheet e disegna gli articoli.
const SHEET='1xgYUz4A8sXPU6lhXWtXICbGKg9SKU5H1Q1ApiGF2TDw';
const NOMI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
const MESI={primavera:[3,4,5],estate:[6,7,8],autunno:[9,10,11],inverno:[12,1,2]};
const mese=()=>new Date().getMonth()+1;
const stagione=()=>Object.keys(MESI).find(s=>MESI[s].includes(mese()));
const inRange=(m,a,f)=>a<=f?m>=a&&m<=f:m>=a||m<=f; // fine < inizio = stagione a cavallo d'anno

function csv(t){const r=[];let row=[],c='',q=false;for(let i=0;i<t.length;i++){const x=t[i];
 if(q){if(x=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=x}
 else if(x=='"')q=true;else if(x==','){row.push(c);c=''}else if(x=='\n'||x=='\r'){if(x=='\r'&&t[i+1]=='\n')i++;row.push(c);r.push(row);row=[];c=''}else c+=x}
 if(c||row.length){row.push(c);r.push(row)}return r}

const quando=(a,f)=>a==1&&f==12?"tutto l'anno":a==f?NOMI[a-1]:`${NOMI[a-1]} – ${NOMI[f-1]}`;
// Righe Frutta/Orto/Lavorati: [nome, inizio, fine, emoji]. Con tuttoAnno, Inizio e Fine vuoti valgono tutto l'anno.
const fatti=(rows,tuttoAnno)=>rows.map(r=>{const v=!(r[1]||'').trim()&&!(r[2]||'').trim()&&tuttoAnno;return[(r[0]||'').trim(),v?1:+r[1],v?12:+r[2],(r[3]||'').trim()||'●']}).filter(r=>r[0]&&r[1]>=1&&r[1]<=12&&r[2]>=1&&r[2]<=12);

// Righe del foglio (intestazione esclusa). Se il tab non esiste Google restituisce il primo: lo controlla chi chiama.
const tab=name=>fetch(`https://docs.google.com/spreadsheets/d/${SHEET}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(name)}`)
 .then(r=>r.ok?r.text():Promise.reject()).then(csv);

// Data nel foglio: gg/mm/aaaa, gg/mm (senza anno = anno corrente) o aaaa-mm-gg. Cella vuota o illeggibile = nessun limite.
const giorno=(v,oggi=new Date())=>{const s=(v||'').trim();let m=s.match(/^(\d{1,2})[\/.-](\d{1,2})(?:[\/.-](\d{2,4}))?$/),y,mo,d,senza=false;
 if(m){d=+m[1];mo=+m[2];if(m[3])y=+m[3]<100?2000+ +m[3]:+m[3];else{y=oggi.getFullYear();senza=true}}
 else if(m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)){y=+m[1];mo=+m[2];d=+m[3]}else return null;
 const t=new Date(y,mo-1,d);t.senzaAnno=senza;return t};
const visibile=(r,oggi=new Date())=>{const t=new Date(oggi);t.setHours(0,0,0,0);const a=giorno(r[5],oggi),b=giorno(r[6],oggi);
 if(a&&b&&b.senzaAnno&&b<a)b.setFullYear(b.getFullYear()+1); // es. dal 20/12 al 05/01: la fine è l'anno dopo
 return(!a||t>=a)&&(!b||t<=b)};

// Tab Blog: Titolo | Data | Testo | Link | Titolo link | Dal | Al. L'ultima riga del foglio è il primo articolo.
function posts(box,rows,n,expandable){
 if(!rows.length||rows[0][0].trim().toLowerCase()!='titolo')throw 0;
 const list=rows.slice(1).filter(r=>r[0]&&r[0].trim()&&visibile(r)).reverse();if(!list.length)throw 0;
 const els=list.map((r,i)=>{const d=document.createElement('details'),s=document.createElement('summary'),sm=document.createElement('small');
  s.append(r[0].trim());sm.textContent=(r[1]||'').trim();s.append(sm);d.append(s);d.open=i==0;d.hidden=i>=n;
  (r[2]||'').split(/\n+/).filter(p=>p.trim()).forEach(p=>{const e=document.createElement('p');e.textContent=p.trim();d.append(e)});
  const u=(r[3]||'').trim();if(/^(https?:\/\/|mailto:|tel:)/i.test(u)){const p=document.createElement('p'),a=document.createElement('a');
   a.href=u;a.textContent=(r[4]||'').trim()||u;if(/^h/i.test(u)){a.target='_blank';a.rel='noopener'}p.append(a);d.append(p)}
  return d});
 box.replaceChildren(...els);
 if(expandable&&els.length>n){const b=document.createElement('button');b.type='button';b.className='btn more';b.textContent=`Mostra tutti gli articoli (${els.length})`;
  b.onclick=()=>{els.forEach(e=>e.hidden=false);b.remove()};box.append(b)}}
