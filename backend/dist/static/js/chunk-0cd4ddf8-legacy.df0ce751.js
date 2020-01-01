(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cd4ddf8"],{"02c0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-input relative top--4"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[t._v(t._s(t.label))]),n("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:t.toggle}},[n("p",{staticClass:"leading-normal h-6 truncate"},[t._v(t._s(t.currentValue))]),n("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},t._l(t.list,(function(e){return n("p",{key:e,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(n){return t.changeSelection(e)}}},[t._v(" "+t._s(e)+" ")])})),0)])],1)},o=[],i={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},a=i,s=(n("6a22"),n("2877")),u=Object(s["a"])(a,r,o,!1,null,"042b4bbc",null);e["a"]=u.exports},"2ff4":function(t,e,n){},"6a22":function(t,e,n){"use strict";var r=n("2ff4"),o=n.n(r);o.a},"761e":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{title:"Munro - Transfer Results",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[t._v("Transfer Result")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.transfer(e)}}},[n("dropdown-input",{attrs:{list:t.leagues.map((function(t){return t.name})),"include-blank":!0,label:"League:"},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}}),n("dropdown-input",{attrs:{list:t.eventsInLeague.map((function(t){return t.name+" - "+t.date})),"include-blank":!0,label:"Event:"},model:{value:t.event,callback:function(e){t.event=e},expression:"event"}}),n("dropdown-input",{attrs:{list:t.coursesInLeague,"include-blank":!0,label:"Course"},model:{value:t.course,callback:function(e){t.course=e},expression:"course"}}),n("dropdown-input",{attrs:{list:t.resultsForEvent.map((function(e){return e.position+" - "+t.elapsedTime(e.time)+" ("+e.name+")"})),"include-blank":!0,label:"Result:"},model:{value:t.result,callback:function(e){t.result=e},expression:"result"}}),n("dropdown-input",{attrs:{list:t.competitorsForLeague.map(t.competitorTransformForSelect),"include-blank":!0,label:"Competitor:"},model:{value:t.competitor,callback:function(e){t.competitor=e},expression:"competitor"}}),n("button",{staticClass:"button-lg"},[t._v("Transfer Result")])],1)],1)},o=[],i=n("a34a"),a=n.n(i),s=n("bc3a"),u=n.n(s),c=n("02c0");function l(t,e,n,r,o,i,a){try{var s=t[i](a),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,o)}function h(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){l(i,r,o,a,s,"next",t)}function s(t){l(i,r,o,a,s,"throw",t)}a(void 0)}))}}var f={components:{DropdownInput:c["a"]},data:function(){return{competitors:[],leagues:[],events:[],results:[],league:"",event:"",course:"",competitor:"",result:""}},computed:{competitorsForLeague:function(){var t=this,e=this.competitors.filter((function(e){return e.league===t.league&&e.course===t.course}));return e.sort((function(t,e){return t.name>e.name}))},coursesInLeague:function(){var t=this,e=this.leagues.filter((function(e){return e.name===t.league}));return e.length>0?e[0].courses:[]},eventsInLeague:function(){var t=this;return this.events.filter((function(e){return e.league===t.league}))},resultsForEvent:function(){var t=this,e="",n=this.events.filter((function(e){return e.name===t.event.split(" - ")[0]&&e.date===t.event.split(" - ")[1]}));return n.length>0&&(e=n[0].id),this.results.filter((function(n){return n.event===e&&n.course===t.course})).sort((function(t,e){return parseInt(t.position)===parseInt(e.position)?0:null===t.position||void 0===t.position?1:null===e.position||void 0===e.position?-1:parseInt(t.position)>parseInt(e.position)?1:-1}))}},created:function(){var t=h(a.a.mark((function t(){return a.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getCompetitors();case 2:return t.next=4,this.getLeagues();case 4:return t.next=6,this.getEvents();case 6:return t.next=8,this.getResults();case 8:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methods:{getCompetitors:function(){var t=this;return u.a.get("/api/competitors").then((function(e){t.competitors=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching Competitors")}))},getLeagues:function(){var t=this;return u.a.get("/api/leagues").then((function(e){t.leagues=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching Leagues")}))},getEvents:function(){var t=this;return u.a.get("/api/events").then((function(e){t.events=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching Events")}))},getResults:function(){var t=this;return u.a.get("/api/results").then((function(e){t.results=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching Results")}))},validateForm:function(){return""!==this.event&&""!==this.course&&""!==this.result},twoDigits:function(t){return t.toString().length<2?"0"+t.toString():t},elapsedTime:function(t){var e=Math.floor(t/60),n=Math.abs(t%60);return this.twoDigits(e)+":"+this.twoDigits(n)},elapsedTimeToSeconds:function(t){return 60*parseInt(t.split(":")[0])+parseInt(t.split(":")[1])},competitorTransformForSelect:function(t){return t.club&&t.ageClass?t.name+" ("+t.ageClass+", "+t.club+") ["+t.id+"]":t.club?t.name+" ("+t.club+") ["+t.id+"]":t.ageClass?t.name+" ("+t.ageClass+") ["+t.id+"]":t.name+" ["+t.id+"]"},transfer:function(){var t=this;if(this.validateForm()){var e="",n=this.events.find((function(e){return e.name===t.event.split(" - ")[0]&&e.date===t.event.split(" - ")[1]}));n&&(e=n.id);var r=this.competitor.replace(/.*\[|\]/g,""),o=this.results.find((function(n){return n.course===t.course&&n.event===e&&n.time===t.elapsedTimeToSeconds(t.result.match(/-.*\(/)[0].slice(2,-2))}));return u.a.post("/api/results/transfer",{competitor:r,result:o.id}).then((function(e){return t.returnToCompetitorsPage(e)})).catch((function(e){return t.$messages.addMessage(e.response.data.message)}))}this.$messages.addMessage("The Competitors Selected are the Same")},returnToCompetitorsPage:function(t){this.$messages.addMessage(t.data.message),this.$router.push("/competitors")}}},p=f,d=n("2877"),v=Object(d["a"])(p,r,o,!1,null,null,null);e["default"]=v.exports},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,n,r){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),a=new F(r||[]);return i._invoke=_(t,n,a),i}function c(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=u;var l="suspendedStart",h="suspendedYield",f="executing",p="completed",d={};function v(){}function m(){}function g(){}var y={};y[i]=function(){return this};var w=Object.getPrototypeOf,b=w&&w(w(S([])));b&&b!==n&&r.call(b,i)&&(y=b);var x=g.prototype=v.prototype=Object.create(y);function L(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function E(t){function e(n,o,i,a){var s=c(t[n],t,o);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&r.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,i,a)}),(function(t){e("throw",t,i,a)})):Promise.resolve(l).then((function(t){u.value=t,i(u)}),(function(t){return e("throw",t,i,a)}))}a(s.arg)}var n;function o(t,r){function o(){return new Promise((function(n,o){e(t,r,n,o)}))}return n=n?n.then(o,o):o()}this._invoke=o}function _(t,e,n){var r=l;return function(o,i){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw i;return I()}n.method=o,n.arg=i;while(1){var a=n.delegate;if(a){var s=k(a,n);if(s){if(s===d)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var u=c(t,e,n);if("normal"===u.type){if(r=n.done?p:h,u.arg===d)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=p,n.method="throw",n.arg=u.arg)}}}function k(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method))return d;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=c(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,d;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,d):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,d)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function F(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function S(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){while(++o<t.length)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:I}}function I(){return{value:e,done:!0}}return m.prototype=x.constructor=g,g.constructor=m,g[s]=m.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},L(E.prototype),E.prototype[a]=function(){return this},t.AsyncIterator=E,t.async=function(e,n,r,o){var i=new E(u(e,n,r,o));return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},L(x),x[s]="Generator",x[i]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=S,F.prototype={constructor:F,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return s.type="throw",s.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=r.call(a,"catchLoc"),c=r.call(a,"finallyLoc");if(u&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;T(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:S(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),d}},t}(t.exports);try{regeneratorRuntime=r}catch(o){Function("r","regeneratorRuntime = r")(r)}},a34a:function(t,e,n){t.exports=n("96cf")}}]);
//# sourceMappingURL=chunk-0cd4ddf8-legacy.df0ce751.js.map