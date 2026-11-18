import {build} from 'esbuild';
await build({entryPoints:['src/app.js'],bundle:true,outdir:'public/assets',entryNames:'app',assetNames:'[name]-[hash]',loader:{'.woff2':'file','.woff':'file'},format:'esm',target:'es2022',minify:true,legalComments:'eof'});
console.log('Material Web、字体与动态配色已打包到本地 public/assets');
