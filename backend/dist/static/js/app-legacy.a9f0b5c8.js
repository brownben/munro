(function(e){function n(n){for(var a,o,u=n[0],c=n[1],i=n[2],l=0,h=[];l<u.length;l++)o=u[l],r[o]&&h.push(r[o][0]),r[o]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);d&&d(n);while(h.length)h.shift()();return s.push.apply(s,i||[]),t()}function t(){for(var e,n=0;n<s.length;n++){for(var t=s[n],a=!0,o=1;o<t.length;o++){var u=t[o];0!==r[u]&&(a=!1)}a&&(s.splice(n--,1),e=c(c.s=t[0]))}return e}var a={},o={app:0},r={app:0},s=[];function u(e){return c.p+"js/"+({}[e]||e)+"-legacy."+{"chunk-1d453bae":"07896893","chunk-09e69d0c":"3b99217c","chunk-222c3661":"611505e9","chunk-2d0a4a1a":"91639680","chunk-2d0cca18":"841cbbdf","chunk-38c7f823":"2ee98344","chunk-4412d6b0":"e0b7faf1","chunk-1ebb95c2":"b8ece2ef","chunk-497a874e":"06e3e359","chunk-49ff6e8e":"6f2ea0bd","chunk-4d6dc0c4":"30cd53b8","chunk-60472e52":"6205d9ce","chunk-695f07e3":"7723cdb5","chunk-6e37c2aa":"ee95930a","chunk-9ac73e42":"fdbd6b37","chunk-dde4b11c":"6ca2f85a","chunk-2d0e5e97":"7a08c303","chunk-67fe2664":"19e164e7","chunk-708470ab":"f146e8df","chunk-9fe4714a":"7cb7566b","chunk-e7480d10":"0a662789"}[e]+".js"}function c(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,c),t.l=!0,t.exports}c.e=function(e){var n=[],t={"chunk-09e69d0c":1,"chunk-222c3661":1,"chunk-4412d6b0":1,"chunk-1ebb95c2":1,"chunk-497a874e":1,"chunk-49ff6e8e":1,"chunk-4d6dc0c4":1,"chunk-60472e52":1,"chunk-695f07e3":1,"chunk-6e37c2aa":1,"chunk-9ac73e42":1,"chunk-dde4b11c":1,"chunk-67fe2664":1,"chunk-708470ab":1,"chunk-e7480d10":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-1d453bae":"31d6cfe0","chunk-09e69d0c":"0fe3d252","chunk-222c3661":"0fe3d252","chunk-2d0a4a1a":"31d6cfe0","chunk-2d0cca18":"31d6cfe0","chunk-38c7f823":"31d6cfe0","chunk-4412d6b0":"46c1a291","chunk-1ebb95c2":"993a7efd","chunk-497a874e":"9b1aae07","chunk-49ff6e8e":"0fe3d252","chunk-4d6dc0c4":"9d0c74a1","chunk-60472e52":"c258b27e","chunk-695f07e3":"0fe3d252","chunk-6e37c2aa":"7e235562","chunk-9ac73e42":"b1fd867d","chunk-dde4b11c":"0fe3d252","chunk-2d0e5e97":"31d6cfe0","chunk-67fe2664":"9e27d9c9","chunk-708470ab":"3cea6c77","chunk-9fe4714a":"31d6cfe0","chunk-e7480d10":"a56978fd"}[e]+".css",r=c.p+a,s=document.getElementsByTagName("link"),u=0;u<s.length;u++){var i=s[u],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===a||l===r))return n()}var h=document.getElementsByTagName("style");for(u=0;u<h.length;u++){i=h[u],l=i.getAttribute("data-href");if(l===a||l===r)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var a=n&&n.target&&n.target.src||r,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete o[e],d.parentNode.removeChild(d),t(s)},d.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)n.push(a[2]);else{var s=new Promise((function(n,t){a=r[e]=[n,t]}));n.push(a[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=u(e),i=function(n){l.onerror=l.onload=null,clearTimeout(h);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,s=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");s.type=a,s.request=o,t[1](s)}r[e]=void 0}};var h=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(n)},c.m=e,c.c=a,c.d=function(e,n,t){c.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,n){if(1&n&&(e=c(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)c.d(t,a,function(n){return e[n]}.bind(null,a));return t},c.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(n,"a",n),n},c.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},c.p="/static/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var h=0;h<i.length;h++)n(i[h]);var d=l;s.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var a=t("85ec"),o=t.n(a);o.a},"34b5":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);var a=t("2b0e"),o=t("59ca"),r=t.n(o),s=(t("ea7b"),t("ec02")),u=t.n(s),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("app-menu",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),t("div",{attrs:{id:"content"}},[t("messages"),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view",{class:{embed:e.$route.path.includes("embed")},attrs:{id:"router-view"}})],1)],1),t("cookie-dialog",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),e.$route.path.includes("embed")?t("p",{staticClass:"font-heading text-center w-full text-main"},[e._v(" League Results by Munro ")]):e._e()],1)},i=[],l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"w-full h-12 border-b border-main-veryLight select-none"},[t("h1",{staticClass:"w-full md:w-auto h-12 text-4xl font-heading text-main md:mx-8 inline-block text-center"},[t("router-link",{attrs:{to:"/"}},[e._v("Munro")])],1),t("svg",{staticClass:"h-12 p-2 mr-2 fill-current text-main md:hidden inline-block float-right absolute right-0",class:{active:e.showMenu},attrs:{viewBox:"0 0 24 24"},on:{click:function(n){e.showMenu=!e.showMenu}}},[t("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),t("path",{attrs:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}})]),t("transition",{attrs:{name:"shrink"}},[t("nav",{directives:[{name:"show",rawName:"v-show",value:e.showMenu||!e.smallWindow,expression:"showMenu || !smallWindow"}],staticClass:"md:h-12 text-main text-lg font-normal h-screen--12 md:mr-2 md:float-right relative z-50 top--12 md:top-0 md:bg-transparent bg-white flex flex-col justify-center align-center w-full md:w-auto md:inline-block mt-12 md:mt-0",class:{"sr-only":!e.showMenu&&e.smallWindow,smallWindow:e.smallWindow}},[t("router-link",{staticClass:"menu-item",attrs:{to:"/leagues"}},[e._v("Leagues")]),t("router-link",{staticClass:"menu-item",attrs:{to:"/latest-results"}},[e._v("Latest Results")]),t("router-link",{staticClass:"menu-item",attrs:{to:"/upload"}},[e._v("Upload Results")]),e.auth.user?t("router-link",{staticClass:"menu-item",attrs:{to:"/logout"}},[e._v("Log Out")]):e._e()],1)])],1)},h=[],d={data:function(){return{showMenu:!1,auth:this.$auth,smallWindow:!1}},watch:{$route:function(){this.showMenu=!1}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.showMenu=!1,this.smallWindow=window.innerWidth<=768}}},f=d,m=(t("f05f"),t("2877")),p=Object(m["a"])(f,l,h,!1,null,"ae43c754",null),b=p.exports,g=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"fade"}},[t("transition-group",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],tag:"div",staticClass:"fixed bottom-0 right-0",attrs:{id:"messages",name:"list",mode:"out-in"}},e._l(e.messages,(function(n){return t("p",{key:n.id,staticClass:"card-color m-3 font-heading z-40",on:{click:function(t){return e.clear(n.id)}}},[e._v(" "+e._s(n.text)+" ")])})),0)],1)},k=[],v={name:"Messages",data:function(){return{messages:this.$messages.messages}},methods:{clear:function(e){this.$messages.removeMessage(e)}}},w=v,y=(t("8c8b"),Object(m["a"])(w,g,k,!1,null,"5a8aaf48",null)),C=y.exports,E=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"slide"}},[e.show?t("div",{staticClass:"fixed w-full p-3 bottom-0"},[t("div",{staticClass:"card-color z-50",on:{click:e.allowCookies}},[t("p",{staticClass:"mr-12"},[e._v(" This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage. ")]),t("svg",{staticClass:"fill-current h-6 absolute right-0 mr-8",attrs:{viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])])]):e._e()])},x=[],M={name:"CookieDialog",data:function(){return{show:Boolean}},created:function(){this.show="accepted"!==localStorage.getItem("cookies")},methods:{allowCookies:function(){this.show=!1,localStorage.setItem("cookies","accepted")}}},P=M,_=(t("67bb"),Object(m["a"])(P,E,x,!1,null,"6a677317",null)),L=_.exports,O={name:"App",components:{AppMenu:b,Messages:C,CookieDialog:L},data:function(){return{auth:this.$auth}}},A=O,S=(t("034f"),Object(m["a"])(A,c,i,!1,null,null,null)),$=S.exports,j=t("8c4f"),R={messages:[],id:0,addMessage:function(e){var n=this,t=this.id;this.id+=1,this.messages.push({id:t,text:e}),setTimeout((function(e){return n.removeMessage(e)}),15e3,t)},clearMessages:function(){this.messages.splice(0,this.messages.length)},removeMessage:function(e){this.messages.splice(this.messages.map((function(e){return e.id})).indexOf(e),1)}},z=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-09e69d0c")]).then(t.bind(null,"106c"))},N=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-49ff6e8e")]).then(t.bind(null,"7321"))},T=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-6e37c2aa")]).then(t.bind(null,"dd20"))},I=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-dde4b11c")]).then(t.bind(null,"cc28"))},W=function(){return t.e("chunk-67fe2664").then(t.bind(null,"bb51"))},B=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-60472e52")]).then(t.bind(null,"44ee"))},H=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-9ac73e42")]).then(t.bind(null,"c6e0"))},D=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-2d0a4a1a")]).then(t.bind(null,"06ec"))},U=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-38c7f823")]).then(t.bind(null,"8b26"))},F=function(){return t.e("chunk-9fe4714a").then(t.bind(null,"a55b"))},q=function(){return t.e("chunk-2d0e5e97").then(t.bind(null,"9703"))},K=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-4412d6b0"),t.e("chunk-497a874e")]).then(t.bind(null,"883d"))},J=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-4412d6b0"),t.e("chunk-1ebb95c2")]).then(t.bind(null,"7c84"))},Q=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-222c3661")]).then(t.bind(null,"761e"))},V=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-4d6dc0c4")]).then(t.bind(null,"2679"))},G=function(){return t.e("chunk-e7480d10").then(t.bind(null,"2c99"))},X=function(){return t.e("chunk-708470ab").then(t.bind(null,"bd86"))},Y=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-2d0cca18")]).then(t.bind(null,"4f6f"))},Z=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-695f07e3")]).then(t.bind(null,"c538"))};a["a"].use(j["a"]);var ee=new j["a"]({routes:[{path:"/",name:"Home",component:W},{path:"/create-competitor",name:"Create Competitor",component:z,beforeEnter:te},{path:"/competitors",name:"Competitors",component:T,beforeEnter:te},{path:"/competitors/:id/edit",name:"Edit Competitors",component:z,beforeEnter:te},{path:"/competitors/merge",name:"Merge Competitors",component:N,beforeEnter:te},{path:"/competitors/:league",name:"Competitors for League",component:T,beforeEnter:te},{path:"/create-league",name:"Create League",component:B,beforeEnter:te},{path:"/leagues",name:"Leagues",component:D},{path:"/leagues/:name",name:"League",component:H},{path:"/embed/leagues/:name/events",name:"Embed League Events",component:U},{path:"/leagues/:name/edit",name:"Edit League",component:B,beforeEnter:te},{path:"/leagues/:league/create-event",name:"Create Event for League",component:I,beforeEnter:te},{path:"/leagues/:name/results/:course",name:"League Course Results",component:K},{path:"/embed/leagues/:name/results/:course",name:"Embed League Course Results",component:K},{path:"/create-event",name:"Create Event",component:I,beforeEnter:te},{path:"/events/:id/edit",name:"Edit Events",component:I,beforeEnter:te},{path:"/events/:event/results",name:"Event Results",component:J},{path:"/upload",name:"Upload Results",component:V},{path:"/upload/:id",name:"Upload Results (From Event Page)",component:V},{path:"/upload-instructions",name:"Upload Instructions",component:G},{path:"/results/transfer",name:"Transfer Result",component:Q,beforeEnter:te},{path:"/results/manual",name:"Manual Result",component:Z},{path:"/latest-results",name:"Latest Results",component:Y},{path:"/developers",name:"Developers",component:X},{path:"/login",name:"Login",component:F},{path:"/logout",beforeEnter:function(e,n,t){ee.app.$auth.logout().then((function(){t("/"),R.addMessage("Goodbye - Logged Out Successfully")})).catch((function(){return R.addMessage("Problem Logging Out - Please Try Again")}))}},{path:"*",name:"NotFound",component:q}],mode:"history"}),ne=ee;function te(e,n,t){var a=ee.app.$auth.user;a?t():t({path:"/login",query:{redirect:e.fullPath}})}var ae=t("7013"),oe=t("9483");Object(oe["a"])("/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(e){console.log("Registration successful, scope is:",e.scope),console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var re;t("9c9e");function se(){re||(re=new a["a"]({el:"#app",router:ne,render:function(e){return e($)}}))}a["a"].config.productionTip=!1,a["a"].prototype.$messages=R,a["a"].prototype.$auth=ae["a"],a["a"].component("VueHeadful",u.a),r.a.initializeApp({apiKey:"AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ",authDomain:"munro-leagues.firebaseapp.com",projectId:"munro-leagues"}),r.a.auth().setPersistence(r.a.auth.Auth.Persistence.SESSION),r.a.auth().onAuthStateChanged((function(e){e?(a["a"].prototype.$auth.user=e,e.getIdToken().then((function(e){document.cookie="token=".concat(e,";secure;samesite=strict;path=/")}))):document.cookie="token=;secure;samesite=strict;path=/",se()}))},"67bb":function(e,n,t){"use strict";var a=t("34b5"),o=t.n(a);o.a},7013:function(e,n,t){"use strict";var a=t("59ca"),o=t.n(a);t("ea7b");n["a"]={login:function(e,n){var t=this;return o.a.auth().signInWithEmailAndPassword(e,n).then((function(e){return t.user=e,e}))},logout:function(){var e=this;return o.a.auth().signOut().then((function(){e.user=!1}))},checkLogin:function(){return this.user=o.a.auth().currentUser,!!this.user},user:!1}},7928:function(e,n,t){},"85ec":function(e,n,t){},"8c8b":function(e,n,t){"use strict";var a=t("9426"),o=t.n(a);o.a},9426:function(e,n,t){},"9c9e":function(e,n,t){},f05f:function(e,n,t){"use strict";var a=t("7928"),o=t.n(a);o.a}});
//# sourceMappingURL=app-legacy.a9f0b5c8.js.map