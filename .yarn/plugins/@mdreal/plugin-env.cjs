/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@mdreal/plugin-env",
factory: function (require) {
var plugin=(()=>{var L=Object.create;var f=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var G=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var Q=(e,n,t)=>n in e?f(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var c=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,t)=>(typeof require<"u"?require:n)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});var V=(e,n)=>()=>(n||e((n={exports:{}}).exports,n),n.exports),z=(e,n)=>{for(var t in n)f(e,t,{get:n[t],enumerable:!0})},$=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let a of W(n))!I.call(e,a)&&a!==t&&f(e,a,{get:()=>n[a],enumerable:!(r=M(n,a))||r.enumerable});return e};var _=(e,n,t)=>(t=e!=null?L(G(e)):{},$(n||!e||!e.__esModule?f(t,"default",{value:e,enumerable:!0}):t,e)),K=e=>$(f({},"__esModule",{value:!0}),e);var D=(e,n,t)=>(Q(e,typeof n!="symbol"?n+"":n,t),t);var y=V((le,X)=>{X.exports={name:"dotenv",version:"16.0.3",description:"Loads environment variables from .env file",main:"lib/main.js",types:"lib/main.d.ts",exports:{".":{require:"./lib/main.js",types:"./lib/main.d.ts",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},scripts:{"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard","lint-readme":"standard-markdown",pretest:"npm run lint && npm run dts-check",test:"tap tests/*.js --100 -Rspec",prerelease:"npm test",release:"standard-version"},repository:{type:"git",url:"git://github.com/motdotla/dotenv.git"},keywords:["dotenv","env",".env","environment","variables","config","settings"],readmeFilename:"README.md",license:"BSD-2-Clause",devDependencies:{"@types/node":"^17.0.9",decache:"^4.6.1",dtslint:"^3.7.0",sinon:"^12.0.1",standard:"^16.0.4","standard-markdown":"^7.1.0","standard-version":"^9.3.2",tap:"^15.1.6",tar:"^6.1.11",typescript:"^4.5.4"},engines:{node:">=12"}}});var k=V((pe,j)=>{var Y=c("fs"),S=c("path"),Z=c("os"),C=y(),ee=C.version,ne=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function te(e){let n={},t=e.toString();t=t.replace(/\r\n?/mg,`
`);let r;for(;(r=ne.exec(t))!=null;){let a=r[1],s=r[2]||"";s=s.trim();let i=s[0];s=s.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),i==='"'&&(s=s.replace(/\\n/g,`
`),s=s.replace(/\\r/g,"\r")),n[a]=s}return n}function w(e){console.log(`[dotenv@${ee}][DEBUG] ${e}`)}function se(e){return e[0]==="~"?S.join(Z.homedir(),e.slice(1)):e}function ie(e){let n=S.resolve(process.cwd(),".env"),t="utf8",r=Boolean(e&&e.debug),a=Boolean(e&&e.override);e&&(e.path!=null&&(n=se(e.path)),e.encoding!=null&&(t=e.encoding));try{let s=b.parse(Y.readFileSync(n,{encoding:t}));return Object.keys(s).forEach(function(i){Object.prototype.hasOwnProperty.call(process.env,i)?(a===!0&&(process.env[i]=s[i]),r&&w(a===!0?`"${i}" is already defined in \`process.env\` and WAS overwritten`:`"${i}" is already defined in \`process.env\` and was NOT overwritten`)):process.env[i]=s[i]}),{parsed:s}}catch(s){return r&&w(`Failed to load ${n} ${s.message}`),{error:s}}}var b={config:ie,parse:te};j.exports.config=b.config;j.exports.parse=b.parse;j.exports=b});var ae={};z(ae,{default:()=>re});var p=c("path"),o=c("fs"),d=_(k()),N=async(e,n,t)=>{let r=(0,p.resolve)(n,".env"),a=(0,o.existsSync)(r),s=(0,p.resolve)(n,".env.prod"),i=(0,p.resolve)(n,".env.production"),h=(0,o.existsSync)(s),l=(0,o.existsSync)(i),g=(0,p.resolve)(n,".env.dev"),E=(0,p.resolve)(n,".env.development"),F=(0,o.existsSync)(g),x=(0,o.existsSync)(E),O=(0,p.resolve)(n,".env.test"),P=(0,p.resolve)(n,".env.testing"),U=(0,o.existsSync)(O),A=(0,o.existsSync)(P);return a&&Object.assign(e,(0,d.parse)(await o.promises.readFile(r,"utf8"))),e.NODE_ENV=e.NODE_ENV||t||"production",e.NODE_ENV==="production"&&(h&&Object.assign(e,(0,d.parse)(await o.promises.readFile(s,"utf8"))),l&&Object.assign(e,(0,d.parse)(await o.promises.readFile(i,"utf8")))),e.NODE_ENV==="development"&&(F&&Object.assign(e,(0,d.parse)(await o.promises.readFile(g,"utf8"))),x&&Object.assign(e,(0,d.parse)(await o.promises.readFile(E,"utf8")))),e.NODE_ENV==="test"&&(U&&Object.assign(e,(0,d.parse)(await o.promises.readFile(O,"utf8"))),A&&Object.assign(e,(0,d.parse)(await o.promises.readFile(P,"utf8")))),e};var B=async(e,n)=>{let t=await N({},n.PROJECT_CWD,n.NODE_ENV);Object.assign(n,t)};var T=c("util"),v=c("path"),H=c("@yarnpkg/cli"),u=c("clipanion"),J=_(c("typanion"));var q=c("clipanion"),R=q.Command.Usage({description:"print environment variables",details:`
This command will print environment variables.

Environment variables are loaded from the following files:

 - .env

For NODE_ENV=production:  

 - .env.prod
 - .env.production

For NODE_ENV=development:  

 - .env.dev
 - .env.development

For NODE_ENV=test:  

 - .env.test
 - .env.testing
`.trimStart(),examples:[["Print environment variables","$0 env"],["Print environment variables for NODE_ENV=development","$0 env --env dev,development"],["Print environment variables for NODE_ENV=production","$0 env --env prod,production"],["Print environment variables for NODE_ENV=test","$0 env --env test,testing"],["Print environment as json","$0 env --json"],["Print environment as json-object","$0 env --json --object"],["Print environment as bash string (default)","$0 env --text"]],category:"Environment"});var m=class extends H.BaseCommand{text=u.Option.Boolean("--text",!0,{description:"Print environment as json"});json=u.Option.Boolean("--json",!1,{description:"Print environment as json"});object=u.Option.Boolean("--object,-o",!1,{description:"Print environment as javascript object. Uses with --json together"});envVar=u.Option.String("--envVar",null,{description:"Print and set environment variables for NODE_ENV",validator:J.isEnum(["production","development","testing","prod","dev","test"])});async execute(){let n=process.env.NODE_ENV,t=["development","dev"],r=["production","prod"],a=["testing","test"],s=t.includes(this.envVar)?"development":r.includes(this.envVar)?"production":a.includes(this.envVar)?"test":null,i={},h=[process.cwd().split(v.sep)[0],""].join(v.sep),l=process.cwd();for(;l.split(v.sep).length>1&&(process.platform==="win32"?l!==h:l!==v.sep);)await N(i,l,n||s),l=(0,v.dirname)(l);let g=Object.entries(i).map(([F,x])=>`${F}=${x}`).join(`
`),E=this.json?this.object?(0,T.inspect)(i,{colors:!0})+`
`:JSON.stringify(i,null,2):g;this.context.stdout.write(`${E}
`)}};D(m,"paths",[["env"]]),D(m,"usage",R);var oe={hooks:{setupScriptEnvironment:B},commands:[m]},re=oe;return K(ae);})();
return plugin;
}
};
