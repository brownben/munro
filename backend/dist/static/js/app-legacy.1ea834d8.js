(function(e){function n(n){for(var a,o,c=n[0],s=n[1],i=n[2],h=0,l=[];h<c.length;h++)o=c[h],u[o]&&l.push(u[o][0]),u[o]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);d&&d(n);while(l.length)l.shift()();return r.push.apply(r,i||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,o=1;o<t.length;o++){var c=t[o];0!==u[c]&&(a=!1)}a&&(r.splice(n--,1),e=s(s.s=t[0]))}return e}var a={},o={app:0},u={app:0},r=[];function c(e){return s.p+"static/js/"+({}[e]||e)+"-legacy."+{"chunk-164ca264":"0f95a075","chunk-1aef2688":"b4c5cbf1","chunk-79f97709":"5142d9df","chunk-b0330ab2":"4852a5fa","chunk-24156668":"79aa9c36","chunk-26a6c07e":"06c84c72","chunk-2bae3d4a":"4dea8e85","chunk-325ea99d":"a91bdc1a","chunk-61c231b1":"3d1a1a8a","chunk-091c73b2":"055917af","chunk-1af5b678":"c2b7c31d","chunk-37d48a0c":"33c42147","chunk-45186563":"3824cc38","chunk-4ab1e0c4":"18613edc","chunk-5efd0c66":"a5fd3432","chunk-6bf46b78":"0b24a890","chunk-72d45917":"4ef7647a","chunk-caefa986":"d89298fb"}[e]+".js"}function s(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,s),t.l=!0,t.exports}s.e=function(e){var n=[],t={"chunk-164ca264":1,"chunk-1aef2688":1,"chunk-79f97709":1,"chunk-24156668":1,"chunk-26a6c07e":1,"chunk-2bae3d4a":1,"chunk-325ea99d":1,"chunk-091c73b2":1,"chunk-1af5b678":1,"chunk-37d48a0c":1,"chunk-45186563":1,"chunk-4ab1e0c4":1,"chunk-5efd0c66":1,"chunk-6bf46b78":1,"chunk-72d45917":1,"chunk-caefa986":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise(function(n,t){for(var a="static/css/"+({}[e]||e)+"."+{"chunk-164ca264":"acf9d01f","chunk-1aef2688":"4d3dea58","chunk-79f97709":"f873ff1d","chunk-b0330ab2":"31d6cfe0","chunk-24156668":"41a96d98","chunk-26a6c07e":"da32b79f","chunk-2bae3d4a":"b6c5785a","chunk-325ea99d":"2f25f569","chunk-61c231b1":"31d6cfe0","chunk-091c73b2":"e711e505","chunk-1af5b678":"65c5029a","chunk-37d48a0c":"ad515d5c","chunk-45186563":"901ec610","chunk-4ab1e0c4":"7f299367","chunk-5efd0c66":"2f457590","chunk-6bf46b78":"806b8132","chunk-72d45917":"815b610d","chunk-caefa986":"85e52f80"}[e]+".css",u=s.p+a,r=document.getElementsByTagName("link"),c=0;c<r.length;c++){var i=r[c],h=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(h===a||h===u))return n()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){i=l[c],h=i.getAttribute("data-href");if(h===a||h===u)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var a=n&&n.target&&n.target.src||u,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],d.parentNode.removeChild(d),t(r)},d.href=u;var f=document.getElementsByTagName("head")[0];f.appendChild(d)}).then(function(){o[e]=0}));var a=u[e];if(0!==a)if(a)n.push(a[2]);else{var r=new Promise(function(n,t){a=u[e]=[n,t]});n.push(a[2]=r);var i,h=document.createElement("script");h.charset="utf-8",h.timeout=120,s.nc&&h.setAttribute("nonce",s.nc),h.src=c(e),i=function(n){h.onerror=h.onload=null,clearTimeout(l);var t=u[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");r.type=a,r.request=o,t[1](r)}u[e]=void 0}};var l=setTimeout(function(){i({type:"timeout",target:h})},12e4);h.onerror=h.onload=i,document.head.appendChild(h)}return Promise.all(n)},s.m=e,s.c=a,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)s.d(t,a,function(n){return e[n]}.bind(null,a));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="/",s.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],h=i.push.bind(i);i.push=n,i=i.slice();for(var l=0;l<i.length;l++)n(i[l]);var d=h;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"0a23":function(e,n,t){"use strict";var a=t("fc50"),o=t.n(a);o.a},"1e9e":function(e,n,t){},"3ca3":function(e,n,t){"use strict";var a=t("da62"),o=t.n(a);o.a},"56d7":function(e,n,t){"use strict";t.r(n);t("14c6"),t("08c1"),t("4842"),t("d9fc");var a=t("2b0e"),o=t("59ca"),u=t.n(o),r=(t("ea7b"),t("ec02")),c=t.n(r),s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("app-menu",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),t("div",{attrs:{id:"content"}},[t("messages"),t("transition",{attrs:{name:"fade",mode:"out-in"}},[t("router-view",{class:{embed:e.$route.path.includes("embed")},attrs:{id:"router-view"}})],1)],1),t("cookie-dialog",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),e.$route.path.includes("embed")?t("p",{staticClass:"credits"},[e._v("League Results by Munro")]):e._e()],1)},i=[],h=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{class:{dark:"/"===e.$route.path},attrs:{id:"menu"}},[t("h1",[t("router-link",{attrs:{to:"/"}},[e._v("Munro")])],1),e.smallWindow?t("svg",{class:{active:e.showMenu},attrs:{viewBox:"0 0 24 24"},on:{click:function(n){e.showMenu=!e.showMenu}}},[t("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),t("path",{attrs:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}})]):e._e(),t("transition",{attrs:{name:"shrink"}},[t("nav",{directives:[{name:"show",rawName:"v-show",value:e.showMenu||!e.smallWindow,expression:"showMenu || !smallWindow"}]},[t("router-link",{attrs:{to:"/leagues"}},[e._v("Leagues")]),t("router-link",{attrs:{to:"/latest-results"}},[e._v("Latest Results")]),t("router-link",{attrs:{to:"/upload"}},[e._v("Upload Results")]),e.auth.user?t("router-link",{attrs:{to:"/logout"}},[e._v("Log Out")]):e._e()],1)])],1)},l=[],d={data:function(){return{showMenu:!1,smallWindow:!1,auth:this.$auth}},watch:{$route:function(){this.showMenu=!1}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){this.showMenu=!1,this.smallWindow=window.innerWidth<=700}}},f=d,m=(t("0a23"),t("2877")),p=Object(m["a"])(f,h,l,!1,null,"66937a54",null),b=p.exports,k=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"fade"}},[t("transition-group",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],tag:"div",attrs:{id:"messages",name:"list",mode:"out-in"}},e._l(e.messages,function(n){return t("p",{key:n.id,on:{click:function(t){return e.clear(n.id)}}},[e._v(e._s(n.text))])}),0)],1)},g=[],v={name:"Messages",data:function(){return{messages:this.$messages.messages}},methods:{clear:function(e){this.$messages.removeMessage(e)}}},w=v,y=(t("3ca3"),Object(m["a"])(w,k,g,!1,null,"52e20330",null)),E=y.exports,_=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("transition",{attrs:{name:"slide"}},[e.show?t("div",{on:{click:function(n){return e.allowCookies()}}},[t("p",[e._v("This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage.")]),t("svg",{attrs:{viewBox:"0 0 24 24"}},[t("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])]):e._e()])},M=[],P={name:"CookieDialog",data:function(){return{show:Boolean}},created:function(){this.show="accepted"!==localStorage.getItem("cookies")},methods:{allowCookies:function(){this.show=!1,localStorage.setItem("cookies","accepted")}}},L=P,C=(t("6fab"),Object(m["a"])(L,_,M,!1,null,"58ab2511",null)),O=C.exports,$={name:"App",components:{AppMenu:b,Messages:E,CookieDialog:O},data:function(){return{auth:this.$auth}}},x=$,S=(t("7faf"),Object(m["a"])(x,s,i,!1,null,null,null)),A=S.exports,j=t("8c4f"),R={messages:[],id:0,addMessage:function(e){var n=this,t=this.id;this.id+=1,this.messages.push({id:t,text:e}),setTimeout(function(e){return n.removeMessage(e)},15e3,t)},clearMessages:function(){this.messages.splice(0,this.messages.length)},removeMessage:function(e){this.messages.splice(this.messages.map(function(e){return e.id}).indexOf(e),1)}},T=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-72d45917")]).then(t.bind(null,"106c"))},z=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-4ab1e0c4")]).then(t.bind(null,"7321"))},N=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-caefa986")]).then(t.bind(null,"dd20"))},I=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-24156668")]).then(t.bind(null,"cc28"))},W=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-2bae3d4a")]).then(t.bind(null,"bb51"))},B=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-325ea99d")]).then(t.bind(null,"44ee"))},D=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-5efd0c66")]).then(t.bind(null,"c6e0"))},H=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-26a6c07e")]).then(t.bind(null,"06ec"))},U=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-1af5b678")]).then(t.bind(null,"8b26"))},q=function(){return t.e("chunk-1aef2688").then(t.bind(null,"a55b"))},F=function(){return t.e("chunk-164ca264").then(t.bind(null,"9703"))},K=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-37d48a0c")]).then(t.bind(null,"e854"))},J=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-45186563")]).then(t.bind(null,"761e"))},Q=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-6bf46b78")]).then(t.bind(null,"2679"))},G=function(){return t.e("chunk-79f97709").then(t.bind(null,"bd86"))},V=function(){return Promise.all([t.e("chunk-b0330ab2"),t.e("chunk-61c231b1"),t.e("chunk-091c73b2")]).then(t.bind(null,"4f6f"))};a["a"].use(j["a"]);var X=new j["a"]({routes:[{path:"/",name:"Home",component:W},{path:"/create-competitor",name:"Create Competitor",component:T,beforeEnter:Z},{path:"/competitors",name:"Competitors",component:N,beforeEnter:Z},{path:"/competitors/:id/edit",name:"Edit Competitors",component:T,beforeEnter:Z},{path:"/competitors/merge",name:"Merge Competitors",component:z,beforeEnter:Z},{path:"/create-league",name:"Create League",component:B,beforeEnter:Z},{path:"/leagues",name:"Leagues",component:H},{path:"/leagues/:name",name:"League",component:D},{path:"/embed/leagues/:name/events",name:"Embed League Events",component:U},{path:"/leagues/:name/edit",name:"Edit League",component:B,beforeEnter:Z},{path:"/leagues/:league/create-event",name:"Create Event for League",component:I,beforeEnter:Z},{path:"/leagues/:name/results/:course",name:"League Course Results",component:K},{path:"/embed/leagues/:name/results/:course",name:"Embed League Course Results",component:K},{path:"/create-event",name:"Create Event",component:I,beforeEnter:Z},{path:"/events/:id/edit",name:"Edit Events",component:I,beforeEnter:Z},{path:"/upload",name:"Upload Results",component:Q},{path:"/upload/:id",name:"Upload Results (From Event Page)",component:Q},{path:"/results/transfer",name:"Transfer Result",component:J,beforeEnter:Z},{path:"/latest-results",name:"Latest Results",component:V},{path:"/developers",name:"Developers",component:G},{path:"/login",name:"Login",component:q},{path:"/logout",beforeEnter:function(e,n,t){X.app.$auth.logout().then(function(){t("/"),R.addMessage("Goodbye - Logged Out Successfully")}).catch(function(){return R.addMessage("Problem Logging Out - Please Try Again")})}},{path:"*",name:"NotFound",component:F}],mode:"history"}),Y=X;function Z(e,n,t){var a=X.app.$auth.user;a?t():t({path:"/login",query:{redirect:e.fullPath}})}var ee,ne=t("7013");function te(){ee||(ee=new a["a"]({el:"#app",router:Y,render:function(e){return e(A)}}))}a["a"].config.productionTip=!1,a["a"].prototype.$messages=R,a["a"].prototype.$auth=ne["a"],a["a"].component("vue-headful",c.a),u.a.initializeApp({apiKey:"AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ",authDomain:"munro-leagues.firebaseapp.com",projectId:"munro-leagues"}),u.a.auth().setPersistence(u.a.auth.Auth.Persistence.SESSION),u.a.auth().onAuthStateChanged(function(e){e?(a["a"].prototype.$auth.user=e,e.getIdToken().then(function(e){document.cookie="token="+e+";secure;samesite=strict;path=/"})):document.cookie="token=;secure;samesite=strict;path=/",te()})},"6fab":function(e,n,t){"use strict";var a=t("1e9e"),o=t.n(a);o.a},7013:function(e,n,t){"use strict";var a=t("59ca"),o=t.n(a);t("ea7b");n["a"]={login:function(e,n){var t=this;return o.a.auth().signInWithEmailAndPassword(e,n).then(function(e){return t.user=e,e})},logout:function(){var e=this;return o.a.auth().signOut().then(function(){e.user=!1})},checkLogin:function(){return this.user=o.a.auth().currentUser,!!this.user},user:!1}},"7faf":function(e,n,t){"use strict";var a=t("8fba"),o=t.n(a);o.a},"8fba":function(e,n,t){},da62:function(e,n,t){},fc50:function(e,n,t){}});
//# sourceMappingURL=app-legacy.1ea834d8.js.map