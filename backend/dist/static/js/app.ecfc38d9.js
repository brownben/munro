(function(e){function t(t){for(var a,o,c=t[0],u=t[1],i=t[2],l=0,d=[];l<c.length;l++)o=c[l],s[o]&&d.push(s[o][0]),s[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);h&&h(t);while(d.length)d.shift()();return r.push.apply(r,i||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(a=!1)}a&&(r.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},o={app:0},s={app:0},r=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-03b9b286":"ee2bc7a9","chunk-114e3a79":"8ac74ae7","chunk-1d453bae":"07896893","chunk-27b696cc":"6624f179","chunk-2d0a4a1a":"88653be0","chunk-2d0cca18":"245d1c25","chunk-2d0e8be4":"fac44ab2","chunk-361755e1":"afbb23bd","chunk-3c09fd1c":"4283fef9","chunk-41130d0b":"0a8f5f40","chunk-5f240c17":"380c50e2","chunk-64fdaa34":"3c78e3e3","chunk-767a03f4":"17fd35c8","chunk-7cd8712e":"24d7ce66","chunk-7d434389":"c36aac3c","chunk-aea506aa":"e49c2e7d","chunk-2caf49bc":"856d60b6","chunk-2d0e5e97":"5d30aae9","chunk-9fe4714a":"6765db68"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-03b9b286":1,"chunk-114e3a79":1,"chunk-27b696cc":1,"chunk-361755e1":1,"chunk-3c09fd1c":1,"chunk-41130d0b":1,"chunk-5f240c17":1,"chunk-64fdaa34":1,"chunk-767a03f4":1,"chunk-7cd8712e":1,"chunk-7d434389":1,"chunk-aea506aa":1,"chunk-2caf49bc":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-03b9b286":"9d7858d6","chunk-114e3a79":"4fc82610","chunk-1d453bae":"31d6cfe0","chunk-27b696cc":"cc0d1f05","chunk-2d0a4a1a":"31d6cfe0","chunk-2d0cca18":"31d6cfe0","chunk-2d0e8be4":"31d6cfe0","chunk-361755e1":"cc0d1f05","chunk-3c09fd1c":"b8772645","chunk-41130d0b":"3f593e27","chunk-5f240c17":"e39fe809","chunk-64fdaa34":"cc0d1f05","chunk-767a03f4":"43b4f8ad","chunk-7cd8712e":"c09b40aa","chunk-7d434389":"cc0d1f05","chunk-aea506aa":"be26c262","chunk-2caf49bc":"d344ad61","chunk-2d0e5e97":"31d6cfe0","chunk-9fe4714a":"31d6cfe0"}[e]+".css",s=u.p+a,r=document.getElementsByTagName("link"),c=0;c<r.length;c++){var i=r[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===a||l===s))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){i=d[c],l=i.getAttribute("data-href");if(l===a||l===s)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var a=t&&t.target&&t.target.src||s,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete o[e],h.parentNode.removeChild(h),n(r)},h.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(h)})).then((function(){o[e]=0})));var a=s[e];if(0!==a)if(a)t.push(a[2]);else{var r=new Promise((function(t,n){a=s[e]=[t,n]}));t.push(a[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e),i=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=s[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,r=new Error("Loading chunk "+e+" failed.\n("+a+": "+o+")");r.type=a,r.request=o,n[1](r)}s[e]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/static/",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var h=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),o=n.n(a);o.a},"21c4":function(e,t,n){},"4beb":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("2b0e"),o=n("59ca"),s=n.n(o),r=(n("ea7b"),n("ec02")),c=n.n(r),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("app-menu",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),n("div",{attrs:{id:"content"}},[n("messages"),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("router-view",{class:{embed:e.$route.path.includes("embed")},attrs:{id:"router-view"}})],1)],1),n("cookie-dialog",{directives:[{name:"show",rawName:"v-show",value:!e.$route.path.includes("embed"),expression:"!$route.path.includes('embed')"}]}),e.$route.path.includes("embed")?n("p",{staticClass:"font-heading text-center w-full text-main"},[e._v(" League Results by Munro ")]):e._e()],1)},i=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"w-full h-12 border-b border-main-veryLight select-none"},[n("h1",{staticClass:"w-full md:w-auto h-12 text-4xl font-heading text-main md:mx-8 inline-block text-center"},[n("router-link",{attrs:{to:"/"}},[e._v("Munro")])],1),n("svg",{staticClass:"h-12 p-2 mr-2 fill-current text-main md:hidden inline-block float-right absolute right-0",class:{active:e.showMenu},attrs:{viewBox:"0 0 24 24"},on:{click:function(t){e.showMenu=!e.showMenu}}},[n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}}),n("path",{attrs:{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"}})]),n("transition",{attrs:{name:"shrink"}},[n("nav",{directives:[{name:"show",rawName:"v-show",value:e.showMenu||!e.smallWindow,expression:"showMenu || !smallWindow"}],staticClass:"md:h-12 text-main text-lg font-normal h-screen--12 md:mr-2 md:float-right relative z-50 top--12 md:top-0 md:bg-transparent bg-white flex flex-col justify-center align-center w-full md:w-auto md:inline-block mt-12 md:mt-0",class:{"sr-only":!e.showMenu&&e.smallWindow,smallWindow:e.smallWindow}},[n("router-link",{staticClass:"menu-item",attrs:{to:"/leagues"}},[e._v("Leagues")]),n("router-link",{staticClass:"menu-item",attrs:{to:"/latest-results"}},[e._v("Latest Results")]),n("router-link",{staticClass:"menu-item",attrs:{to:"/upload"}},[e._v("Upload Results")]),e.auth.user?n("router-link",{staticClass:"menu-item",attrs:{to:"/logout"}},[e._v("Log Out")]):e._e()],1)])],1)},d=[],h={data:function(){return{showMenu:!1,auth:this.$auth,smallWindow:!1}},watch:{$route:function(){this.showMenu=!1}},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize()},destroyed(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize(){this.showMenu=!1,this.smallWindow=window.innerWidth<=768}}},m=h,f=(n("f2e2"),n("2877")),p=Object(f["a"])(m,l,d,!1,null,"17e72646",null),b=p.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"fade"}},[n("transition-group",{directives:[{name:"show",rawName:"v-show",value:e.messages.length>0,expression:"messages.length > 0"}],tag:"div",staticClass:"fixed bottom-0 right-0",attrs:{id:"messages",name:"list",mode:"out-in"}},e._l(e.messages,(function(t){return n("p",{key:t.id,staticClass:"card-color m-3 font-heading",on:{click:function(n){return e.clear(t.id)}}},[e._v(" "+e._s(t.text)+" ")])})),0)],1)},k=[],v={name:"Messages",data:function(){return{messages:this.$messages.messages}},methods:{clear:function(e){this.$messages.removeMessage(e)}}},w=v,y=(n("5ba5"),Object(f["a"])(w,g,k,!1,null,"d16335de",null)),C=y.exports,E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{name:"slide"}},[e.show?n("div",{staticClass:"fixed w-full p-3 bottom-0"},[n("div",{staticClass:"card-color z-50",on:{click:e.allowCookies}},[n("p",{staticClass:"mr-12"},[e._v(" This site uses Cookies and Local Storage in order to function correctly. By using this site you consent to the use of Cookies and Local Storage. ")]),n("svg",{staticClass:"fill-current h-6 absolute right-0 mr-8",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}})])])]):e._e()])},x=[],M={name:"CookieDialog",data:()=>({show:Boolean}),created:function(){this.show="accepted"!==localStorage.getItem("cookies")},methods:{allowCookies:function(){this.show=!1,localStorage.setItem("cookies","accepted")}}},_=M,P=(n("f240"),Object(f["a"])(_,E,x,!1,null,"c81c8d24",null)),L=P.exports,O={name:"App",components:{AppMenu:b,Messages:C,CookieDialog:L},data:function(){return{auth:this.$auth}}},A=O,S=(n("034f"),Object(f["a"])(A,u,i,!1,null,null,null)),$=S.exports,j=n("8c4f"),R={messages:[],id:0,addMessage:function(e){var t=this.id;this.id+=1,this.messages.push({id:t,text:e}),setTimeout(e=>this.removeMessage(e),15e3,t)},clearMessages:function(){this.messages.splice(0,this.messages.length)},removeMessage:function(e){this.messages.splice(this.messages.map(e=>e.id).indexOf(e),1)}},z=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-64fdaa34")]).then(n.bind(null,"106c")),N=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-361755e1")]).then(n.bind(null,"7321")),T=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-7cd8712e")]).then(n.bind(null,"dd20")),I=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-27b696cc")]).then(n.bind(null,"cc28")),W=()=>n.e("chunk-03b9b286").then(n.bind(null,"bb51")),B=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-3c09fd1c")]).then(n.bind(null,"44ee")),D=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-5f240c17")]).then(n.bind(null,"c6e0")),H=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-2d0a4a1a")]).then(n.bind(null,"06ec")),U=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-2d0e8be4")]).then(n.bind(null,"8b26")),F=()=>n.e("chunk-9fe4714a").then(n.bind(null,"a55b")),q=()=>n.e("chunk-2d0e5e97").then(n.bind(null,"9703")),K=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-41130d0b")]).then(n.bind(null,"883d")),J=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-767a03f4")]).then(n.bind(null,"7c84")),Q=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-7d434389")]).then(n.bind(null,"761e")),G=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-aea506aa")]).then(n.bind(null,"2679")),V=()=>n.e("chunk-2caf49bc").then(n.bind(null,"2c99")),X=()=>n.e("chunk-114e3a79").then(n.bind(null,"bd86")),Y=()=>Promise.all([n.e("chunk-1d453bae"),n.e("chunk-2d0cca18")]).then(n.bind(null,"4f6f"));a["a"].use(j["a"]);var Z=new j["a"]({routes:[{path:"/",name:"Home",component:W},{path:"/create-competitor",name:"Create Competitor",component:z,beforeEnter:te},{path:"/competitors",name:"Competitors",component:T,beforeEnter:te},{path:"/competitors/:id/edit",name:"Edit Competitors",component:z,beforeEnter:te},{path:"/competitors/merge",name:"Merge Competitors",component:N,beforeEnter:te},{path:"/competitors/:league",name:"Competitors for League",component:T,beforeEnter:te},{path:"/create-league",name:"Create League",component:B,beforeEnter:te},{path:"/leagues",name:"Leagues",component:H},{path:"/leagues/:name",name:"League",component:D},{path:"/embed/leagues/:name/events",name:"Embed League Events",component:U},{path:"/leagues/:name/edit",name:"Edit League",component:B,beforeEnter:te},{path:"/leagues/:league/create-event",name:"Create Event for League",component:I,beforeEnter:te},{path:"/leagues/:name/results/:course",name:"League Course Results",component:K},{path:"/embed/leagues/:name/results/:course",name:"Embed League Course Results",component:K},{path:"/create-event",name:"Create Event",component:I,beforeEnter:te},{path:"/events/:id/edit",name:"Edit Events",component:I,beforeEnter:te},{path:"/events/:event/results",name:"Event Results",component:J},{path:"/upload",name:"Upload Results",component:G},{path:"/upload/:id",name:"Upload Results (From Event Page)",component:G},{path:"/upload-instructions",name:"Upload Instructions",component:V},{path:"/results/transfer",name:"Transfer Result",component:Q,beforeEnter:te},{path:"/latest-results",name:"Latest Results",component:Y},{path:"/developers",name:"Developers",component:X},{path:"/login",name:"Login",component:F},{path:"/logout",beforeEnter:function(e,t,n){Z.app.$auth.logout().then(()=>{n("/"),R.addMessage("Goodbye - Logged Out Successfully")}).catch(()=>R.addMessage("Problem Logging Out - Please Try Again"))}},{path:"*",name:"NotFound",component:q}],mode:"history"}),ee=Z;function te(e,t,n){var a=Z.app.$auth.user;a?n():n({path:"/login",query:{redirect:e.fullPath}})}var ne=n("7013"),ae=n("9483");Object(ae["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(e){console.log("Registration successful, scope is:",e.scope),console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var oe;n("9c9e");function se(){oe||(oe=new a["a"]({el:"#app",router:ee,render:e=>e($)}))}a["a"].config.productionTip=!1,a["a"].prototype.$messages=R,a["a"].prototype.$auth=ne["a"],a["a"].component("vue-headful",c.a),s.a.initializeApp({apiKey:"AIzaSyAQriY0O2Atf-En8yKMXNs5TIRCglWuAbQ ",authDomain:"munro-leagues.firebaseapp.com",projectId:"munro-leagues"}),s.a.auth().setPersistence(s.a.auth.Auth.Persistence.SESSION),s.a.auth().onAuthStateChanged(e=>{e?(a["a"].prototype.$auth.user=e,e.getIdToken().then(e=>{document.cookie="token="+e+";secure;samesite=strict;path=/"})):document.cookie="token=;secure;samesite=strict;path=/",se()})},"5ba5":function(e,t,n){"use strict";var a=n("21c4"),o=n.n(a);o.a},7013:function(e,t,n){"use strict";var a=n("59ca"),o=n.n(a);n("ea7b");t["a"]={login:function(e,t){return o.a.auth().signInWithEmailAndPassword(e,t).then(e=>{return this.user=e,e})},logout:function(){return o.a.auth().signOut().then(()=>{this.user=!1})},checkLogin:function(){return this.user=o.a.auth().currentUser,!!this.user},user:!1}},"85ec":function(e,t,n){},"996b":function(e,t,n){},"9c9e":function(e,t,n){},f240:function(e,t,n){"use strict";var a=n("996b"),o=n.n(a);o.a},f2e2:function(e,t,n){"use strict";var a=n("4beb"),o=n.n(a);o.a}});
//# sourceMappingURL=app.ecfc38d9.js.map