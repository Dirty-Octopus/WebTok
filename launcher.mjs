import {readFileSync,openSync} from 'node:fs';
import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function alive(){try{const state=JSON.parse(readFileSync(path.join(root,'.runtime/server.json')));if(!/^http:\/\/127\.0\.0\.1:\d+$/.test(state.url))return;const res=await fetch(state.url+'/api/health',{signal:AbortSignal.timeout(1000)});if((await res.json()).app==='tokscale-local-web')return state.url;}catch{}}
let url=await alive();
if(!url){const log=openSync(path.join(root,'.runtime/server.log'),'a');const child=spawn(process.execPath,['server.mjs'],{cwd:root,detached:true,stdio:['ignore',log,log],env:process.env});child.unref();for(let i=0;i<100;i++){await sleep(100);url=await alive();if(url)break;}if(!url){console.error('启动失败，请检查 .runtime/server.log');process.exit(1);}}
console.log(`已部署并启动：${url}\n停止服务：npm run stop\n日志：.runtime/server.log`);
if(!process.env.NO_OPEN){const cmd=process.platform==='darwin'?'open':process.platform==='win32'?'explorer':'xdg-open';spawn(cmd,[url],{stdio:'ignore'}).on('error',()=>{});}
