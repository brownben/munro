(function(e){function n(n){for(var a,o,s=n[0],u=n[1],i=n[2],l=0,d=[];l<s.length;l++)o=s[l],r[o]&&d.push(r[o][0]),r[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);h&&h(n);while(d.length)d.shift()();return c.push.apply(c,i||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],a=!0,o=1;o<t.length;o++){var s=t[o];0!==r[s]&&(a=!1)}a&&(c.splice(n--,1),e=u(u.s=t[0]))}return e}var a={},o={app:0},r={app:0},c=[];function s(e){return u.p+"js/"+({}[e]||e)+"-legacy."+{"chunk-03b9b286":"ee2bc7a9","chunk-114e3a79":"8ac74ae7","chunk-1d453bae":"07896893","chunk-06ced548":"bd85fd4a","chunk-0cd4ddf8":"df0ce751","chunk-233fbe14":"40eceed1","chunk-27b696cc":"416b41fa","chunk-2d0a4a1a":"e8b2cee0","chunk-321387ce":"defbc3d8","chunk-3c09fd1c":"e37acd56","chunk-61b722ac":"e8df352a","chunk-060bfbac":"e24dc55a","chunk-4eb34063":"a027a602","chunk-64fdaa34":"83ffca1b","chunk-6cf68fc5":"1ad6a3fb","chunk-ad98c60e":"70501d69","chunk-ff2af6a0":"e80c105e","chunk-2caf49bc":"856d60b6","chunk-2d0e5e97":"5d30aae9","chunk-9fe4714a":"3b675a53"}[e]+".js"}function u(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-03b9b286":1,"chunk-114e3a79":1,"chunk-06ced548":1,"chunk-0cd4ddf8":1,"chunk-233fbe14":1,"chunk-27b696cc":1,"chunk-321387ce":1,"chunk-3c09fd1c":1,"chunk-61b722ac":1,"chunk-060bfbac":1,"chunk-4eb34063":1,"chunk-64fdaa34":1,"chunk-ff2af6a0":1,"chunk-2caf49bc":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-03b9b286":"9d7858d6","chunk-114e3a79":"4fc82610","chunk-1d453bae":"31d6cfe0","chunk-06ced548":"cc0d1f05","chunk-0cd4ddf8":"cc0d1f05","chunk-233fbe14":"bec714be","chunk-27b696cc":"cc0d1f05","chunk-2d0a4a1a":"31d6cfe0","chunk-321387ce":"be26c262","chunk-3c09fd1c":"b8772645","chunk-61b722ac":"1a2550b6","chunk-060bfbac":"e0329bd5","chunk-4eb34063":"bbee0a52","chunk-64fdaa34":"cc0d1f05","chunk-6cf68fc5":"31d6cfe0","chunk-ad98c60e":"31d6cfe0","chunk-ff2af6a0":"e39fe809","chunk-2caf49bc":"d344ad61","chunk-2d0e5e97":"31d6cfe0","chunk-9fe4714a":"31d6cfe0"}[e]+".css",r=u.p+a,c=document.getElementsByTagName("link"),s=0;s<c.length;s++){var i=c[s],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===a||l===r))return n()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){i=d[s],l=i.getAttribute("data-href");if(l===a||l===r)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var a=n&&n.target&&n.target.src||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete o[e],h.parentNode.removeChild(h),t(c)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)n.push(a[2]);else{var c=new Promise((function(n,t){a=r[e]=[n,t]}));n.push(a[2]=c);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=s(e),i=function(n){l.onerror=l.onload=null,clearTimeout(d);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,c=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");c.type=a,c.request=o,t[1](c)}r[e]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(n)},u.m=e,u.c=a,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)u.d(t,a,function(n){return e[n]}.bind(null,a));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/static/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=n,i=i.slice();for(var d=0;d<i.length;d++)n(i[d]);var h=l;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var a=t("85ec"),o=t.n(a);o.a},"21c4":function(e,n,t){},"4beb":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);var a=t("2b0e"),o=t("59ca"),r=t.n(o),c=(t("ea7b"),t("ec02")),s=t.n(c),u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("app-menu",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),t("div",{attrs:{id:"content"}},[t("messages"),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view",{class:{embed:e.$route.path.includes("embed")},attrs:{id:"router-view"}})],1)],1),t("cookie-dialog",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),e.$route.path.includes("embed")?t("p",{staticClass:"font-heading text-center w-full text-main"},[e._v(" League Results by Munro ")]):e._e()],1)},i=[],l=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"w-full h-12 border-b border-main-veryLight select-none"},[t("h1",{staticClass:"w-full md:w-auto h-12 text-4xl font-heading text-main md:mx-8 inline-block text-center"},[t("router-link",{attrs:{to:"/"}},[e._v("Munro")])],1),t("svg",{staticClass:"h-12 p-2 mr-2 fill-current text-main md:hidden inline-block float-right absolute right-0",class:{active:e.showMenu},attrs:{viewBox:"0 0 24 24"},on:{click:function(n){e.showMenu=!e.showMenu}}},[t("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),t("path",{attrs:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}})]),t("transition",{attrs:{name:"shrink"}},[t("nav",{directives:[{name:"show",rawName:"v-show",value:e.showMenu||!e.smallWindow,expression:"showMenu || !smallWindow"}],staticClass:"md:h-12 text-main text-lg font-normal h-screen--12 md:mr-2 md:float-right relative z-50 top--12 md:top-0 md:bg-transparent bg-white flex flex-col justify-center align-center w-full md:w-auto md:inline-block mt-12 md:mt-0",class:{"sr-only":!e.showMenu&&e.smallWindow,smallWindow:e.smallWindow}},[t("router-link",{staticClass:"menu-item",attrs:{to:"/leagues"}},[e._v("Leagues")]),t("router-link",{staticClass:"menu-item",attrs:{to:"/latest-results"}},[e._v("Latest Results")]),t("router-link",{staticClass:"menu-item",attrs:{to:"/upload"}},[e._v("Upload Results")]),e.auth.user?t("router-link",{staticClass:"menu-item",attrs:{to:"/logout"}},[e._v("Log Out")]):e._e()],1)])],1)},d=[],h={data:function(){return{showMenu:!1,auth:this.$auth,smallWindow:!1}},watch:{$route:function(){this.showMenu=!1}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.showMenu=!1,this.smallWindow=window.innerWidth<=768}}},f=h,m=(t("f2e2"),t("2877")),p=Object(m["a"])(f,l,d,!1,null,"17e72646",null),b=p.exports,g=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"fade"}},[t("transition-group",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],tag:"div",staticClass:"fixed bottom-0 right-0",attrs:{id:"messages",name:"list",mode:"out-in"}},e._l(e.messages,(function(n){return t("p",{key:n.id,staticClass:"card-color m-3 font-heading",on:{click:function(t){return e.clear(n.id)}}},[e._v(" "+e._s(n.text)+" ")])})),0)],1)},k=[],v={name:"Messages",data:function(){return{messages:this.$messages.messages}},methods:{clear:function(e){this.$messages.removeMessage(e)}}},w=v,y=(t("5ba5"),Object(m["a"])(w,g,k,!1,null,"d16335de",null)),C=y.exports,E=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"slide"}},[e.show?t("div",{staticClass:"fixed w-full p-3 bottom-0"},[t("div",{staticClass:"card-color z-50",on:{click:e.allowCookies}},[t("p",{staticClass:"mr-12"},[e._v(" This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage. ")]),t("svg",{staticClass:"fill-current h-6 absolute right-0 mr-8",attrs:{viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])])]):e._e()])},x=[],M={name:"CookieDialog",data:function(){return{show:Boolean}},created:function(){this.show="accepted"!==localStorage.getItem("cookies")},methods:{allowCookies:function(){this.show=!1,localStorage.setItem("cookies","accepted")}}},_=M,P=(t("f240"),Object(m["a"])(_,E,x,!1,null,"c81c8d24",null)),L=P.exports,O={name:"App",components:{AppMenu:b,Messages:C,CookieDialog:L},data:function(){return{auth:this.$auth}}},A=O,S=(t("034f"),Object(m["a"])(A,u,i,!1,null,null,null)),$=S.exports,j=t("8c4f"),R={messages:[],id:0,addMessage:function(e){var n=this,t=this.id;this.id+=1,this.messages.push({id:t,text:e}),setTimeout((function(e){return n.removeMessage(e)}),15e3,t)},clearMessages:function(){this.messages.splice(0,this.messages.length)},removeMessage:function(e){this.messages.splice(this.messages.map((function(e){return e.id})).indexOf(e),1)}},z=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-64fdaa34")]).then(t.bind(null,"106c"))},N=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-06ced548")]).then(t.bind(null,"7321"))},T=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-233fbe14")]).then(t.bind(null,"dd20"))},I=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-27b696cc")]).then(t.bind(null,"cc28"))},W=function(){return t.e("chunk-03b9b286").then(t.bind(null,"bb51"))},B=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-3c09fd1c")]).then(t.bind(null,"44ee"))},D=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-ff2af6a0")]).then(t.bind(null,"c6e0"))},H=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-2d0a4a1a")]).then(t.bind(null,"06ec"))},U=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-6cf68fc5")]).then(t.bind(null,"8b26"))},F=function(){return t.e("chunk-9fe4714a").then(t.bind(null,"a55b"))},q=function(){return t.e("chunk-2d0e5e97").then(t.bind(null,"9703"))},K=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-61b722ac"),t.e("chunk-4eb34063")]).then(t.bind(null,"883d"))},J=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-61b722ac"),t.e("chunk-060bfbac")]).then(t.bind(null,"7c84"))},Q=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-0cd4ddf8")]).then(t.bind(null,"761e"))},G=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-321387ce")]).then(t.bind(null,"2679"))},V=function(){return t.e("chunk-2caf49bc").then(t.bind(null,"2c99"))},X=function(){return t.e("chunk-114e3a79").then(t.bind(null,"bd86"))},Y=function(){return Promise.all([t.e("chunk-1d453bae"),t.e("chunk-ad98c60e")]).then(t.bind(null,"4f6f"))};a["a"].use(j["a"]);var Z=new j["a"]({routes:[{path:"/",name:"Home",component:W},{path:"/create-competitor",name:"Create Competitor",component:z,beforeEnter:ne},{path:"/competitors",name:"Competitors",component:T,beforeEnter:ne},{path:"/competitors/:id/edit",name:"Edit Competitors",component:z,beforeEnter:ne},{path:"/competitors/merge",name:"Merge Competitors",component:N,beforeEnter:ne},{path:"/competitors/:league",name:"Competitors for League",component:T,beforeEnter:ne},{path:"/create-league",name:"Create League",component:B,beforeEnter:ne},{path:"/leagues",name:"Leagues",component:H},{path:"/leagues/:name",name:"League",component:D},{path:"/embed/leagues/:name/events",name:"Embed League Events",component:U},{path:"/leagues/:name/edit",name:"Edit League",component:B,beforeEnter:ne},{path:"/leagues/:league/create-event",name:"Create Event for League",component:I,beforeEnter:ne},{path:"/leagues/:name/results/:course",name:"League Course Results",component:K},{path:"/embed/leagues/:name/results/:course",name:"Embed League Course Results",component:K},{path:"/create-event",name:"Create Event",component:I,beforeEnter:ne},{path:"/events/:id/edit",name:"Edit Events",component:I,beforeEnter:ne},{path:"/events/:event/results",name:"Event Results",component:J},{path:"/upload",name:"Upload Results",component:G},{path:"/upload/:id",name:"Upload Results (From Event Page)",component:G},{path:"/upload-instructions",name:"Upload Instructions",component:V},{path:"/results/transfer",name:"Transfer Result",component:Q,beforeEnter:ne},{path:"/latest-results",name:"Latest Results",component:Y},{path:"/developers",name:"Developers",component:X},{path:"/login",name:"Login",component:F},{path:"/logout",beforeEnter:function(e,n,t){Z.app.$auth.logout().then((function(){t("/"),R.addMessage("Goodbye - Logged Out Successfully")})).catch((function(){return R.addMessage("Problem Logging Out - Please Try Again")}))}},{path:"*",name:"NotFound",component:q}],mode:"history"}),ee=Z;function ne(e,n,t){var a=Z.app.$auth.user;a?t():t({path:"/login",query:{redirect:e.fullPath}})}var te=t("7013"),ae=t("9483");Object(ae["a"])("/service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(e){console.log("Registration successful, scope is:",e.scope),console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var oe;t("9c9e");function re(){oe||(oe=new a["a"]({el:"#app",router:ee,render:function(e){return e($)}}))}a["a"].config.productionTip=!1,a["a"].prototype.$messages=R,a["a"].prototype.$auth=te["a"],a["a"].component("vue-headful",s.a),r.a.initializeApp({apiKey:"AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ",authDomain:"munro-leagues.firebaseapp.com",projectId:"munro-leagues"}),r.a.auth().setPersistence(r.a.auth.Auth.Persistence.SESSION),r.a.auth().onAuthStateChanged((function(e){e?(a["a"].prototype.$auth.user=e,e.getIdToken().then((function(e){document.cookie="token="+e+";secure;samesite=strict;path=/"}))):document.cookie="token=;secure;samesite=strict;path=/",re()}))},"5ba5":function(e,n,t){"use strict";var a=t("21c4"),o=t.n(a);o.a},7013:function(e,n,t){"use strict";var a=t("59ca"),o=t.n(a);t("ea7b");n["a"]={login:function(e,n){var t=this;return o.a.auth().signInWithEmailAndPassword(e,n).then((function(e){return t.user=e,e}))},logout:function(){var e=this;return o.a.auth().signOut().then((function(){e.user=!1}))},checkLogin:function(){return this.user=o.a.auth().currentUser,!!this.user},user:!1}},"85ec":function(e,n,t){},"996b":function(e,n,t){},"9c9e":function(e,n,t){},f240:function(e,n,t){"use strict";var a=t("996b"),o=t.n(a);o.a},f2e2:function(e,n,t){"use strict";var a=t("4beb"),o=t.n(a);o.a}});
//# sourceMappingURL=app-legacy.e9656dd7.js.map