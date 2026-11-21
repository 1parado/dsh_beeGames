const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
// Test-only dependencies resolve normally, or from an explicit test directory.
const modulePaths = [root, ...(process.env.BEEGAME_TEST_MODULES ? [process.env.BEEGAME_TEST_MODULES] : [])];
const reactRoot = path.dirname(require.resolve('react/package.json', { paths: modulePaths }));
const reactDOMRoot = path.dirname(require.resolve('react-dom/package.json', { paths: modulePaths }));
const port = Number(process.env.BEEGAME_TEST_PORT ?? 0);
if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error('Invalid BEEGAME_TEST_PORT');
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;font:14px sans-serif;background:#fff}#main{position:fixed;inset:40px 0 0 200px}
:root{--dsw-alias-bg-base:#fff;--dsw-alias-bg-layer-1:#fff;--dsw-alias-bg-layer-2:#f5f5f5;--dsw-alias-text-primary:#222;--dsw-alias-text-secondary:#666}
</style><button id="conversation" onclick="navigate(null)">会话</button><button onclick="navigate('beegame')">游戏</button><div id="root"></div>
<script src="/react.js"></script><script src="/react-dom.js"></script><script>
const slots={},slotSpecs={};let dictionaries={},setPanel;
const localeListeners=new Set();
let localeSnapshot={active:new URLSearchParams(location.search).get('lang')||localStorage.getItem('test-locale')||'zh',revision:0};
window.setTestLocale=active=>{
 localStorage.setItem('test-locale',active);localeSnapshot={active,revision:localeSnapshot.revision+1};
 for(const listener of localeListeners)listener();
};
window.navigate=id=>setPanel(id);
const makeStore=initial=>{let value=initial;const listeners=new Set();return {
 getSnapshot:()=>value, subscribe:listener=>{listeners.add(listener);return()=>listeners.delete(listener);},
 set:next=>{value=next;for(const listener of listeners)listener();}, count:()=>listeners.size};};
const statusStore=makeStore(new Map([['test-session',{completionUnread:true}]]));
const titleStore=makeStore({byId:{'test-session':{title:'测试任务'}}});
window.setTestStatus=entries=>statusStore.set(new Map(entries));
window.setTestTitles=byId=>titleStore.set({byId});
window.openedSessions=[];
window.testOpenSessionMode='ok';
window.sessionSubscriptions=()=>({status:statusStore.count(),titles:titleStore.count()});
let setHookMode;
window.setTestHooks=mode=>setHookMode(mode);
const ctx={locale:{
 bind:()=>(key,params)=>{const text=dictionaries[localeSnapshot.active]?.[key]||dictionaries.zh?.[key]||key;return params?text.replace(/\\{(\\w+)\\}/g,(match,name)=>name in params?String(params[name]):match):text;},
 register:(ns,dict)=>{dictionaries=dict;return()=>{};},
 getSnapshot:()=>localeSnapshot,getLocale:()=>localeSnapshot,
 subscribe:listener=>{localeListeners.add(listener);return()=>localeListeners.delete(listener);}},
 sessions:{list:titleStore},
 effect:fn=>fn(),get:name=>name==='layout'?{selectPanel:id=>navigate(id)}:name==='uiWorkspace'?{openSession:id=>{
 if(window.testOpenSessionMode==='false')return false;
 if(window.testOpenSessionMode==='reject')return Promise.reject(new Error('Test navigation rejected'));
 if(window.testOpenSessionMode==='defer')return new Promise(resolve=>{window.resolveTestOpen=()=>{window.openedSessions.push(id);navigate(null);resolve();};});
 window.openedSessions.push(id);navigate(null);
 }}:name==='uiSession'?{sessionStatus:statusStore}:null,
 slots:{inject:(name,fn)=>fn(),register:(spec,component)=>{slots[spec.name]=component;slotSpecs[spec.name]=spec;}}};
window.hudRenders=0;
const instrumentedReact={...React,memo:component=>React.memo(component.name==='TaskHudView'?function ObservedHud(props){window.hudRenders++;return component(props);}:component)};
window.__ModuleLoader__={load:spec=>{window.plugin=spec.factory(()=>instrumentedReact);}};
const hostProps={useSessionStatus:selector=>React.useSyncExternalStore(statusStore.subscribe,()=>selector(statusStore.getSnapshot())),useSessions:selector=>React.useSyncExternalStore(titleStore.subscribe,()=>selector(titleStore.getSnapshot()))};
const malformedHooks={useSessionStatus:()=>statusStore.getSnapshot(),useSessions:()=>new Map()};
function Host(){const [panel,change]=React.useState('beegame');const [hookMode,setMode]=React.useState('both');setHookMode=setMode;setPanel=change;
const hooks=hookMode==='malformed'?malformedHooks:{...(hookMode==='both'||hookMode==='status'?{useSessionStatus:hostProps.useSessionStatus}:{}),...(hookMode==='both'||hookMode==='titles'?{useSessions:hostProps.useSessions}:{})};
return React.createElement(React.Fragment,null,
React.createElement('main',{id:'main'},panel==='beegame'?React.createElement(slots.main,hooks):React.createElement('textarea',{'aria-label':'安排任务',placeholder:'安排任务'})),
React.createElement(slots['shell.overlay'],hooks));}
</script><script src="/client.js"></script><script>plugin.apply(ctx);ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Host));</script>`;
const server = http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname.startsWith('/api/beegame/')){res.setHeader('Content-Type','application/json');res.end(JSON.stringify({games:[{id:'test',name:'Keepalive Test',url:'https://game.example.test/game',category:['Puzzle'],orientation:'landscape'}],total:1,updatedAt:Date.now()-120000}));return;}
 const files={'/react.js':path.join(reactRoot,'umd/react.development.js'),'/react-dom.js':path.join(reactDOMRoot,'umd/react-dom.development.js'),'/client.js':path.join(root,'client.js')};
 if(files[url.pathname]){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(files[url.pathname]));return;}
 res.setHeader('Content-Type','text/html; charset=utf-8');res.end(html);
});
server.listen(port,'127.0.0.1',()=>console.log(`Harness listening on http://127.0.0.1:${server.address().port}`));
