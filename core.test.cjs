const assert=require('node:assert/strict'),C=require('./core.js');
assert.deepEqual(C.compare('','').rows,[]);
assert.equal(C.compare('a','b').removed,1);assert.equal(C.compare('a','b').added,1);
assert.equal(C.compare('a\r\nb','a\nb').removed,0);
assert.equal(C.compare('a','a\n').added,1);
assert.equal(C.compare(' Hello  WORLD ','hello world',{spaces:true,case:true}).ignored,1);
assert.equal(C.compare('x\n\ny','x\ny',{spaces:true}).removed,1);
assert.equal(C.compare('a b','ab',{spaces:true}).removed,1);
assert.equal(C.compare('🐈 café','🐈 café').added,0);
assert.throws(()=>C.compare('x'.repeat(100001),''));assert.throws(()=>C.compare('\n'.repeat(1201),''));
// Reconstruct both versions from every diff, including repeated and empty lines.
let seed=42;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
for(let k=0;k<150;k++){const make=()=>Array.from({length:Math.floor(rand()*20)},()=>['a','b','','猫'][Math.floor(rand()*4)]).join('\n');const a=make(),b=make(),r=C.compare(a,b);assert.deepEqual(r.rows.filter(x=>x.type!=='add').map(x=>x.text),C.lines(a));assert.deepEqual(r.rows.filter(x=>x.type!=='remove').map(x=>x.text),C.lines(b));}
assert.ok(C.report(C.compare('a','b'),{}).includes('not an apply-ready patch'));
console.log('Passed: 150 reconstruction cases plus empty text, replacements, line endings, trailing newline, normalization, Unicode, report and size limits.');
