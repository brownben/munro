(function(e){function n(n){for(var a,o,u=n[0],c=n[1],i=n[2],l=0,h=[];l<u.length;l++)o=u[l],s[o]&&h.push(s[o][0]),s[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(n);while(h.length)h.shift()();return r.push.apply(r,i||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,o=1;o<t.length;o++){var u=t[o];0!==s[u]&&(a=!1)}a&&(r.splice(n--,1),e=c(c.s=t[0]))}return e}var a={},o={app:0},s={app:0},r=[];function u(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-11b21566":"76b46d47","chunk-1d453bae":"07896893","chunk-02d95072":"f8675250","chunk-1c6c3db1":"ea441835","chunk-23869b71":"7ccab2ae","chunk-284619ae":"3a5f13f2","chunk-4439a226":"75f9792b","chunk-44603742":"6f288276","chunk-67fcb920":"e75a46d4","chunk-72f83ea8":"b019b366","chunk-773d3caf":"17290cba","chunk-a4b28d58":"b0f92bb3","chunk-c97c5412":"23805188","chunk-e2194626":"f994a1e4","chunk-624a1592":"b101a09a","chunk-65982faa":"a3236282","chunk-9bd3c674":"4524d98a","chunk-a9920a8a":"841e1cd4"}[e]+".js"}function c(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.e=function(e){var n=[],t={"chunk-11b21566":1,"chunk-02d95072":1,"chunk-1c6c3db1":1,"chunk-23869b71":1,"chunk-284619ae":1,"chunk-4439a226":1,"chunk-44603742":1,"chunk-67fcb920":1,"chunk-72f83ea8":1,"chunk-773d3caf":1,"chunk-a4b28d58":1,"chunk-c97c5412":1,"chunk-e2194626":1,"chunk-624a1592":1,"chunk-65982faa":1,"chunk-9bd3c674":1,"chunk-a9920a8a":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-11b21566":"c7b9f4ee","chunk-1d453bae":"31d6cfe0","chunk-02d95072":"2b1e0291","chunk-1c6c3db1":"3f5df874","chunk-23869b71":"0b7ec86a","chunk-284619ae":"ff54c92f","chunk-4439a226":"66788fff","chunk-44603742":"c5eb2fb9","chunk-67fcb920":"ffe918c0","chunk-72f83ea8":"629d2791","chunk-773d3caf":"4907e736","chunk-a4b28d58":"9383a179","chunk-c97c5412":"9b37a4e6","chunk-e2194626":"b8d47230","chunk-624a1592":"e5b46f3c","chunk-65982faa":"20f4903a","chunk-9bd3c674":"71f058a1","chunk-a9920a8a":"69a0a0ed"}[e]+".css",s=c.p+a,r=document.getElementsByTagName("link"),u=0;u<r.length;u++){var i=r[u],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===a||l===s))return n()}var h=document.getElementsByTagName("style");for(u=0;u<h.length;u++){i=h[u],l=i.getAttribute("data-href");if(l===a||l===s)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var a=n&&n.target&&n.target.src||s,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],d.parentNode.removeChild(d),t(r)},d.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){o[e]=0})));var a=s[e];if(0!==a)if(a)n.push(a[2]);else{var r=new Promise((function(n,t){a=s[e]=[n,t]}));n.push(a[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=u(e),i=function(n){l.onerror=l.onload=null,clearTimeout(h);var t=s[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");r.type=a,r.request=o,t[1](r)}s[e]=void 0}};var h=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(n)},c.m=e,c.c=a,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,n){if(1&n&&(e=c(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)c.d(t,a,function(n){return e[n]}.bind(null,a));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="/static/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var h=0;h<i.length;h++)n(i[h]);var d=l;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"0230":function(e,n,t){},"0a23":function(e,n,t){"use strict";var a=t("1a3c"),o=t.n(a);o.a},"1a3c":function(e,n,t){},"3ca3":function(e,n,t){"use strict";var a=t("e783"),o=t.n(a);o.a},"56d7":function(e,n,t){"use strict";t.r(n);var a=t("2b0e"),o=t("59ca"),s=t.n(o),r=(t("ea7b"),t("ec02")),u=t.n(r),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("app-menu",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),t("div",{attrs:{id:"content"}},[t("messages"),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view",{class:{embed:e.$route.path.includes("embed")},attrs:{id:"router-view"}})],1)],1),t("cookie-dialog",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),e.$route.path.includes("embed")?t("p",{staticClass:"credits"},[e._v("League Results by Munro")]):e._e()],1)},i=[],l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:{dark:"/"===e.$route.path},attrs:{id:"menu"}},[t("h1",[t("router-link",{attrs:{to:"/"}},[e._v("Munro")])],1),e.smallWindow?t("svg",{class:{active:e.showMenu},attrs:{viewBox:"0 0 24 24"},on:{click:function(n){e.showMenu=!e.showMenu}}},[t("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),t("path",{attrs:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}})]):e._e(),t("transition",{attrs:{name:"shrink"}},[t("nav",{directives:[{name:"show",rawName:"v-show",value:e.showMenu||!e.smallWindow,expression:"showMenu || !smallWindow"}]},[t("router-link",{attrs:{to:"/leagues"}},[e._v("Leagues")]),t("router-link",{attrs:{to:"/latest-results"}},[e._v("Latest Results")]),t("router-link",{attrs:{to:"/upload"}},[e._v("Upload Results")]),e.auth.user?t("router-link",{attrs:{to:"/logout"}},[e._v("Log Out")]):e._e()],1)])],1)},h=[],d={data:function(){return{showMenu:!1,smallWindow:!1,auth:this.$auth}},watch:{$route:function(){this.showMenu=!1}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize(){this.showMenu=!1,this.smallWindow=window.innerWidth<=700}}},m=d,p=(t("0a23"),t("2877")),f=Object(p["a"])(m,l,h,!1,null,"66937a54",null),b=f.exports,g=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"fade"}},[t("transition-group",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],tag:"div",attrs:{id:"messages",name:"list",mode:"out-in"}},e._l(e.messages,(function(n){return t("p",{key:n.id,on:{click:function(t){return e.clear(n.id)}}},[e._v(e._s(n.text))])})),0)],1)},k=[],v={name:"Messages",data:function(){return{messages:this.$messages.messages}},methods:{clear:function(e){this.$messages.removeMessage(e)}}},w=v,y=(t("3ca3"),Object(p["a"])(w,g,k,!1,null,"52e20330",null)),E=y.exports,_=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"slide"}},[e.show?t("div",{on:{click:e.allowCookies}},[t("p",[e._v("This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage.")]),t("svg",{attrs:{viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])]):e._e()])},M=[],P={name:"CookieDialog",data:()=>({show:Boolean}),created:function(){this.show="accepted"!==localStorage.getItem("cookies")},methods:{allowCookies:function(){this.show=!1,localStorage.setItem("cookies","accepted")}}},C=P,L=(t("8a98"),Object(p["a"])(C,_,M,!1,null,"d7e5ca1c",null)),O=L.exports,$={name:"App",components:{AppMenu:b,Messages:E,CookieDialog:O},data:function(){return{auth:this.$auth}}},x=$,A=(t("7faf"),Object(p["a"])(x,c,i,!1,null,null,null)),S=A.exports,j=(t("e6cf"),t("8c4f")),N={messages:[],id:0,addMessage:function(e){var n=this.id;this.id+=1,this.messages.push({id:n,text:e}),setTimeout(e=>this.removeMessage(e),15e3,n)},clearMessages:function(){this.messages.splice(0,this.messages.length)},removeMessage:function(e){this.messages.splice(this.messages.map(e=>e.id).indexOf(e),1)}},R=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-c97c5412")]).then(t.bind(null,"106c")),T=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-72f83ea8")]).then(t.bind(null,"7321")),z=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-4439a226")]).then(t.bind(null,"dd20")),I=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-67fcb920")]).then(t.bind(null,"cc28")),B=()=>t.e("chunk-11b21566").then(t.bind(null,"bb51")),W=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-284619ae")]).then(t.bind(null,"44ee")),D=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-02d95072")]).then(t.bind(null,"c6e0")),H=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-a4b28d58")]).then(t.bind(null,"06ec")),U=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-23869b71")]).then(t.bind(null,"8b26")),F=()=>t.e("chunk-a9920a8a").then(t.bind(null,"a55b")),q=()=>t.e("chunk-9bd3c674").then(t.bind(null,"9703")),K=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-1c6c3db1")]).then(t.bind(null,"e854")),J=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-773d3caf")]).then(t.bind(null,"761e")),Q=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-e2194626")]).then(t.bind(null,"2679")),G=()=>t.e("chunk-65982faa").then(t.bind(null,"2c99")),V=()=>t.e("chunk-624a1592").then(t.bind(null,"bd86")),X=()=>Promise.all([t.e("chunk-1d453bae"),t.e("chunk-44603742")]).then(t.bind(null,"4f6f"));a["a"].use(j["a"]);var Y=new j["a"]({routes:[{path:"/",name:"Home",component:B},{path:"/create-competitor",name:"Create Competitor",component:R,beforeEnter:ee},{path:"/competitors",name:"Competitors",component:z,beforeEnter:ee},{path:"/competitors/:id/edit",name:"Edit Competitors",component:R,beforeEnter:ee},{path:"/competitors/merge",name:"Merge Competitors",component:T,beforeEnter:ee},{path:"/competitors/:league",name:"Competitors for League",component:z,beforeEnter:ee},{path:"/create-league",name:"Create League",component:W,beforeEnter:ee},{path:"/leagues",name:"Leagues",component:H},{path:"/leagues/:name",name:"League",component:D},{path:"/embed/leagues/:name/events",name:"Embed League Events",component:U},{path:"/leagues/:name/edit",name:"Edit League",component:W,beforeEnter:ee},{path:"/leagues/:league/create-event",name:"Create Event for League",component:I,beforeEnter:ee},{path:"/leagues/:name/results/:course",name:"League Course Results",component:K},{path:"/embed/leagues/:name/results/:course",name:"Embed League Course Results",component:K},{path:"/create-event",name:"Create Event",component:I,beforeEnter:ee},{path:"/events/:id/edit",name:"Edit Events",component:I,beforeEnter:ee},{path:"/upload",name:"Upload Results",component:Q},{path:"/upload/:id",name:"Upload Results (From Event Page)",component:Q},{path:"/upload-instructions",name:"Upload Instructions",component:G},{path:"/results/transfer",name:"Transfer Result",component:J,beforeEnter:ee},{path:"/latest-results",name:"Latest Results",component:X},{path:"/developers",name:"Developers",component:V},{path:"/login",name:"Login",component:F},{path:"/logout",beforeEnter:function(e,n,t){Y.app.$auth.logout().then(()=>{t("/"),N.addMessage("Goodbye - Logged Out Successfully")}).catch(()=>N.addMessage("Problem Logging Out - Please Try Again"))}},{path:"*",name:"NotFound",component:q}],mode:"history"}),Z=Y;function ee(e,n,t){var a=Y.app.$auth.user;a?t():t({path:"/login",query:{redirect:e.fullPath}})}var ne,te=t("7013"),ae=t("9483");function oe(){ne||(ne=new a["a"]({el:"#app",router:Z,render:e=>e(S)}))}Object(ae["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(e){console.log("Registration successful, scope is:",e.scope),console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),a["a"].config.productionTip=!1,a["a"].prototype.$messages=N,a["a"].prototype.$auth=te["a"],a["a"].component("vue-headful",u.a),s.a.initializeApp({apiKey:"AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ",authDomain:"munro-leagues.firebaseapp.com",projectId:"munro-leagues"}),s.a.auth().setPersistence(s.a.auth.Auth.Persistence.SESSION),s.a.auth().onAuthStateChanged(e=>{e?(a["a"].prototype.$auth.user=e,e.getIdToken().then(e=>{document.cookie="token="+e+";secure;samesite=strict;path=/"})):document.cookie="token=;secure;samesite=strict;path=/",oe()})},7013:function(e,n,t){"use strict";var a=t("59ca"),o=t.n(a);t("ea7b");n["a"]={login:function(e,n){return o.a.auth().signInWithEmailAndPassword(e,n).then(e=>{return this.user=e,e})},logout:function(){return o.a.auth().signOut().then(()=>{this.user=!1})},checkLogin:function(){return this.user=o.a.auth().currentUser,!!this.user},user:!1}},"7faf":function(e,n,t){"use strict";var a=t("b8ff"),o=t.n(a);o.a},"8a98":function(e,n,t){"use strict";var a=t("0230"),o=t.n(a);o.a},b8ff:function(e,n,t){},e783:function(e,n,t){}});
//# sourceMappingURL=app.b97a0756.js.map