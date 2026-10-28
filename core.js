(function(root){
'use strict';
const MAX_CHARS=100000,MAX_LINES=1200;
function lines(text){return text===''?[]:text.replace(/\r\n?/g,'\n').split('\n');}
function normalize(line,options){let value=line;if(options.spaces)value=value.trim().replace(/[\t ]+/g,' ');if(options.case)value=value.toLowerCase();return value;}
function compare(before,after,options={}){
 if(before.length>MAX_CHARS||after.length>MAX_CHARS)throw Error('Keep each version under 100,000 characters.');
 const a=lines(before),b=lines(after);if(a.length>MAX_LINES||b.length>MAX_LINES)throw Error('Keep each version at 1,200 lines or fewer.');
 const aa=a.map(v=>normalize(v,options)),bb=b.map(v=>normalize(v,options)),width=b.length+1;
 const dp=new Uint16Array((a.length+1)*width);
 for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)dp[i*width+j]=aa[i]===bb[j]?1+dp[(i+1)*width+j+1]:Math.max(dp[(i+1)*width+j],dp[i*width+j+1]);
 const rows=[];let i=0,j=0,added=0,removed=0,ignored=0;
 while(i<a.length||j<b.length){if(i<a.length&&j<b.length&&aa[i]===bb[j]){if(a[i]!==b[j])ignored++;rows.push({type:'equal',old:i+1,new:j+1,text:b[j]});i++;j++;}else if(i<a.length&&(j===b.length||dp[(i+1)*width+j]>=dp[i*width+j+1])){rows.push({type:'remove',old:i+1,new:null,text:a[i++]});removed++;}else{rows.push({type:'add',old:null,new:j+1,text:b[j++]});added++;}}
 return{rows,added,removed,ignored};
}
function report(result,options){return ['DiffCheck comparison report','Whitespace normalization: '+(options.spaces?'on':'off'),'Ignore letter case: '+(options.case?'on':'off'),'Line endings normalized to LF; equal rows show the updated version.','This is a readable report, not an apply-ready patch.',`${result.added} added, ${result.removed} removed, ${result.ignored} normalized matches`,'','OLD\tNEW\tCHANGE\tTEXT',...result.rows.map(r=>`${r.old??''}\t${r.new??''}\t${r.type==='add'?'+':r.type==='remove'?'-':' '}\t${r.text}`)].join('\n');}
const api={compare,lines,report};if(typeof module!=='undefined')module.exports=api;else root.DiffCore=api;
})(globalThis);
