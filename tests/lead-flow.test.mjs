import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {confirmedLead} from '../src/utils/lead-response.ts';

test('HTTP-success payloads cannot invent a receipt', () => {
  for (const value of [null, {}, {ok:false}, {ok:true}, {ok:true,saved:false,lead_id:'x'}, {ok:true,saved:true,lead_id:'<script>'}]) assert.throws(() => confirmedLead(value));
  assert.equal(confirmedLead({ok:true,saved:true,lead_id:'SME-12345678-1234-4234-8234-123456789abc'}),'SME-12345678-1234-4234-8234-123456789abc');
});
function backend() {
  const ctx = vm.createContext({console});
  vm.runInContext(readFileSync('docs/google-apps-script.js','utf8'),ctx);
  return ctx;
}
const valid=()=>({form_type:'quote_request',service:'Accounting services',location:'Johor Bahru',contact:'test@example.com',details:'TEST ONLY — bookkeeping enquiry, do not match.',consent:'yes',consent_version:'2026-09-16',request_id:'12345678-1234-4234-8234-123456789abc',started_at:String(Date.now()-5000)});
test('backend rejects unsupported services, missing consent, spam and malformed contacts',()=>{
  const ctx=backend();
  assert.equal(ctx.validateLead_(valid()),'');
  for(const change of [{service:'Renovation'}, {consent:''}, {contact:'hello'}, {website:'spam'}, {details:'click https://spam.example jackpot'}, {request_id:'bad'}]) assert.ok(ctx.validateLead_({...valid(),...change}));
});
test('spreadsheet formula injection is stored as plain text',()=>{
  const ctx=backend();
  for(const text of ['=IMPORTXML("url")','+60123456789','@SUM(A1)','-1']) assert.equal(ctx.safeCell_(text),"'"+text);
  assert.equal(ctx.safeCell_('normal request'),'normal request');
});

function backendWithStorage({mailFails=false,saveFails=false}={}) {
  const rows=[Array(24).fill('header')];
  let mails=0;
  const sheet={getLastRow:()=>rows.length, getSheetId:()=>42,
    appendRow:row=>{if(saveFails)throw Error('storage unavailable'); rows.push(row);},
    getRange:(row,col)=>({createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>rows.some(r=>r[1]===id)?{}:null})}),setValue:value=>{rows[row-1][col-1]=value;}})};
  const cache=new Map();
  const ctx=vm.createContext({console,SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},
    LockService:{getScriptLock:()=>({tryLock:()=>true,releaseLock:()=>{}})},
    CacheService:{getScriptCache:()=>({get:k=>cache.get(k),put:(k,v)=>cache.set(k,v)})},
    Utilities:{DigestAlgorithm:{SHA_256:'SHA_256'},computeDigest:(_,v)=>v,base64EncodeWebSafe:v=>v},
    MailApp:{sendEmail:()=>{mails++;if(mailFails)throw Error('mail unavailable');}},
    ContentService:{MimeType:{JSON:'json'},createTextOutput:body=>({setMimeType:()=>JSON.parse(body)})}});
  vm.runInContext(readFileSync('docs/google-apps-script.js','utf8'),ctx);
  return {ctx,rows,mails:()=>mails};
}
test('a retry creates one persisted lead and one notification',()=>{
  const b=backendWithStorage(); const data=valid();
  const first=b.ctx.doPost({parameter:data});const retry=b.ctx.doPost({parameter:data});
  assert.equal(first.saved,true);assert.equal(retry.lead_id,first.lead_id);assert.equal(retry.duplicate,true);
  assert.equal(b.rows.length,2); assert.equal(b.mails(),1);
});
test('notification failure preserves successful receipt and exposes operational failure',()=>{
  const b=backendWithStorage({mailFails:true});const result=b.ctx.doPost({parameter:valid()});
  assert.equal(result.saved,true);assert.match(b.rows[1][22],/^failed/);assert.equal(b.rows.length,2);
});
test('storage failure never acknowledges a saved lead',()=>{
  const b=backendWithStorage({saveFails:true});const result=b.ctx.doPost({parameter:valid()});
  assert.equal(result.ok,false);assert.equal(result.saved,undefined);assert.equal(b.mails(),0);
});
