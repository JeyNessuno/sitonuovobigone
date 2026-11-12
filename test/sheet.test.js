// Prova le funzioni di docs/sheet.js. Uso:  node test/sheet.test.js
const assert=require('node:assert'),fs=require('node:fs'),vm=require('node:vm');
const code=fs.readFileSync(__dirname+'/../docs/sheet.js','utf8');
const {csv,inRange,giorno,visibile,fatti,quando}=vm.runInNewContext(code+';({csv,inRange,giorno,visibile,fatti,quando})',{fetch(){},document:{}});
const d=(y,m,g)=>new Date(y,m-1,g),T=x=>x&&x.getTime(),json=x=>JSON.stringify(x);
const uguali=(a,b)=>assert.equal(json(a),json(b)); // confronta come testo: le liste del sandbox hanno un altro prototipo

// csv: virgole e virgolette dentro le celle, a capo, CRLF, ultima riga senza a capo
uguali(csv('a,"b,c",d\n"x""y","riga1\nriga2",z'),[['a','b,c','d'],['x"y','riga1\nriga2','z']]);
uguali(csv('a,b\r\nc,\r\n'),[['a','b'],['c','']]);

// inRange: mesi normali e stagione a cavallo d'anno (11 -> 2)
assert.ok(inRange(5,5,7)&&inRange(7,5,7)&&!inRange(8,5,7));
assert.ok(inRange(12,11,2)&&inRange(1,11,2)&&!inRange(6,11,2));

// giorno: con anno, senza anno (= anno di oggi), ISO, illeggibile
assert.equal(T(giorno('10/11/2026')),T(d(2026,11,10)));
assert.equal(T(giorno('5/1/27')),T(d(2027,1,5)));
assert.equal(T(giorno('2026-11-10')),T(d(2026,11,10)));
assert.equal(T(giorno('10/11',d(2026,6,1))),T(d(2026,11,10)));
assert.equal(giorno('10/11',d(2026,6,1)).senzaAnno,true);
assert.equal(giorno('boh'),null);assert.equal(giorno(''),null);

// visibile: righe [titolo,data,testo,link,titolo link,Dal,Al]
const oggi=d(2026,11,12),r=(dal,al)=>['t','','','','',dal,al];
assert.ok(visibile(r('',''),oggi));                       // nessun limite
assert.ok(!visibile(r('10/11','10/11'),oggi));            // il caso del post Test: scaduto
assert.ok(visibile(r('','12/11'),oggi));                  // l'ultimo giorno si vede ancora
assert.ok(!visibile(r('13/11',''),oggi));                 // non ancora iniziato
assert.ok(visibile(r('1/11/2026','30/11/2026'),oggi));    // con anno
assert.ok(!visibile(r('10/11/2026','11/11/2026'),oggi));
assert.ok(visibile(r('boh',''),oggi));                    // data illeggibile = nessun limite
assert.ok(visibile(r('20/12','5/1'),d(2026,12,25)));      // a cavallo d'anno, senza anno
assert.ok(!visibile(r('20/12','5/1'),oggi));

// fatti: righe valide, mese sbagliato scartato, vuoto = tutto l'anno solo se richiesto
uguali(fatti([['Ciliegie','5','7','🍒']]),[['Ciliegie',5,7,'🍒']]);
uguali(fatti([['Prugne','','','']]),[]);
uguali(fatti([['Composta','','','🍒']],true),[['Composta',1,12,'🍒']]);
uguali(fatti([['Pere','7','13','🍐'],['','5','6','x'],[' Kiwi ','10','10','']]),[['Kiwi',10,10,'●']]);

// quando
assert.equal(quando(1,12),"tutto l'anno");assert.equal(quando(5,5),'maggio');assert.equal(quando(5,7),'maggio – luglio');
console.log('Tutti i test passati.');
