import {readFileSync} from 'node:fs';
try{const state=JSON.parse(readFileSync(new URL('.runtime/server.json',import.meta.url)));const r=await fetch(state.url+'/api/health',{signal:AbortSignal.timeout(1000)});if((await r.json()).app!=='tokscale-local-web')throw new Error('进程身份不匹配');process.kill(state.pid,'SIGTERM');console.log('服务已停止');}catch(e){console.log('服务未运行或无法确认身份：'+e.message);}
