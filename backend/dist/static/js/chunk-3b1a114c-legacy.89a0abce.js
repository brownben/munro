(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b1a114c"],{"2d41":function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function u(t,e,n,r){var a=e&&e.prototype instanceof d?e:d,o=Object.create(a.prototype),i=new M(r||[]);return o._invoke=L(t,n,i),o}function c(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}t.wrap=u;var l="suspendedStart",h="suspendedYield",f="executing",g="completed",v={};function d(){}function p(){}function m(){}var y={};y[o]=function(){return this};var _=Object.getPrototypeOf,w=_&&_(_($([])));w&&w!==n&&r.call(w,o)&&(y=w);var b=m.prototype=d.prototype=Object.create(y);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function E(t){function e(n,a,o,i){var s=c(t[n],t,a);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&r.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,o,i)}),(function(t){e("throw",t,o,i)})):Promise.resolve(l).then((function(t){u.value=t,o(u)}),(function(t){return e("throw",t,o,i)}))}i(s.arg)}var n;function a(t,r){function a(){return new Promise((function(n,a){e(t,r,n,a)}))}return n=n?n.then(a,a):a()}this._invoke=a}function L(t,e,n){var r=l;return function(a,o){if(r===f)throw new Error("Generator is already running");if(r===g){if("throw"===a)throw o;return A()}n.method=a,n.arg=o;while(1){var i=n.delegate;if(i){var s=k(i,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=g,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var u=c(t,e,n);if("normal"===u.type){if(r=n.done?g:h,u.arg===v)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r=g,n.method="throw",n.arg=u.arg)}}}function k(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,k(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=c(r,t.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,v;var o=a.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function $(t){if(t){var n=t[o];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function n(){while(++a<t.length)if(r.call(t,a))return n.value=t[a],n.done=!1,n;return n.value=e,n.done=!0,n};return i.next=i}}return{next:A}}function A(){return{value:e,done:!0}}return p.prototype=b.constructor=m,m.constructor=p,m[s]=p.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(E.prototype),E.prototype[i]=function(){return this},t.AsyncIterator=E,t.async=function(e,n,r,a){var o=new E(u(e,n,r,a));return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},x(b),b[s]="Generator",b[o]=function(){return this},b.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=$,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(P),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function a(r,a){return s.type="throw",s.arg=t,n.next=r,a&&(n.method="next",n.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var u=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),P(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;P(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:$(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},a34a:function(t,e,n){t.exports=n("96cf")},c321:function(t,e,n){"use strict";var r=n("2d41"),a=n.n(r);a.a},c6e0:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{title:"Munro - "+t.$route.params.name,description:"Event Information and Results for the\n        "+t.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues/"+t.$route.params.name,head:{meta:{name:"robots",content:"all"}}}}),t.league&&t.league.name?[n("div",{staticClass:"card-text mb-4 mt-2 w-full mx-0"},[n("h1",{staticClass:"text-main text-3xl font-normal font-heading"},[t._v(" "+t._s(t.league.name)+" ")]),t.league.description?n("p",[t._v(t._s(t.league.description))]):t._e(),t.league.courses?n("p",[t._v(" There are normally "+t._s(t.league.courses.length)+" courses - "+t._s(t.league.courses.join(", "))+" ")]):t._e(),t.league.coordinator?n("p",[t._v(" "+t._s(t.league.coordinator)+" coordinates the league. ")]):t._e(),n("p",[t.league.scoringMethod?n("span",[t._v(" The scoring for the league is calculated using a "+t._s(t.scoringMethodShorthandToFull(t.league.scoringMethod))+" ")]):t._e(),t._v(" "),t.league.numberOfCountingEvents&&t.league.numberOfEvents?n("span",[t._v(" With your best "+t._s(t.league.numberOfCountingEvents)+" events from all "+t._s(t.league.numberOfEvents)+" events counting. ")]):t._e()]),t.league.website?n("p",[t._v(" More information can be found at "),n("a",{staticClass:"link",attrs:{href:t.league.website,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.league.website))])]):t._e()]),t.auth.user?n("div",{staticClass:"card my-4"},[n("h2",{staticClass:"text-2xl font-heading"},[t._v("Admin Actions")]),n("div",[n("router-link",{staticClass:"button",attrs:{to:t.$route.path+"/create-event"}},[t._v("Add Event")]),n("router-link",{staticClass:"button",attrs:{to:t.$route.path+"/edit"}},[t._v("Edit League")]),n("button",{staticClass:"button",on:{click:t.deleteLeague}},[t._v("Delete League")]),n("router-link",{staticClass:"button",attrs:{to:"/competitors/"+this.$route.params.name}},[t._v("Manage Competitors")])],1)]):t._e()]:t._e(),t.events.length>0?n("div",{staticClass:"card my-4"},[n("h2",{staticClass:"text-2xl font-heading"},[t._v("League Results")]),n("div",t._l(t.league.courses,(function(e){return n("router-link",{key:e,staticClass:"button",attrs:{to:t.$route.path+"/results/"+e}},[t._v(t._s(e))])})),1)]):t._e(),t._l(t.events,(function(e){return n("div",{key:e.name,staticClass:"card my-4",class:{"card-text":!e.resultUploaded}},[n("h2",{staticClass:"font-heading text-xl my-1",class:{"text-2xl":t.auth.user}},[t._v(" "+t._s(e.name)+" ")]),t.auth.user?n("div",{staticClass:"event-actions"},[n("router-link",{staticClass:"button",attrs:{to:"/events/"+e.id+"/edit"}},[t._v("Edit Event")]),n("router-link",{staticClass:"button",attrs:{to:"/upload/"+e.id}},[t._v("Upload Results")]),n("button",{staticClass:"button",on:{click:function(n){return t.deleteEvent(e)}}},[t._v("Delete Event")])],1):t._e(),n("div",{staticClass:"my-1"},[t.auth.user?n("p",[n("b",[t._v("Event ID:")]),t._v(" "+t._s(e.id)+" ")]):t._e(),t.auth.user&&e.uploadKey?n("p",[n("b",[t._v("Event Upload Key:")]),t._v(" "+t._s(e.uploadKey)+" ")]):t._e()]),e.date?n("p",[t._v(" On "+t._s(e.date.split("-")[2])+"/"+t._s(e.date.split("-")[1])+"/"+t._s(e.date.split("-")[0])+" "),e.organiser?[t._v("organised by "+t._s(e.organiser))]:t._e()],2):t._e(),e.moreInformation?n("p",[t._v(t._s(e.moreInformation))]):t._e(),e.website?n("p",[t._v(" More Information can be found on their "),n("a",{staticClass:"link",attrs:{href:e.website,target:"_blank",rel:"noopener noreferrer"}},[t._v("website")])]):t._e(),e.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.league.dynamicEventResults?n("router-link",{staticClass:"button",attrs:{to:"/events/"+e.id+"/results"}},[t._v("Results")]):t._e(),e.results?n("a",{staticClass:"button",attrs:{href:e.results,target:"_blank",rel:"noopener noreferrer"}},[t._v("HTML Results")]):t._e(),e.winsplits?n("a",{staticClass:"button",attrs:{href:e.winsplits,target:"_blank",rel:"noopener noreferrer"}},[t._v("WinSplits")]):t._e(),e.routegadget?n("a",{staticClass:"button",attrs:{href:e.routegadget,target:"_blank",rel:"noopener noreferrer"}},[t._v("Routegadget")]):t._e()],1):t._e()])})),t.league?t._e():n("not-found")],2)},a=[],o=n("a34a"),i=n.n(o),s=n("bc3a"),u=n.n(s);function c(t,e,n,r,a,o,i){try{var s=t[o](i),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,a)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){c(o,r,a,i,s,"next",t)}function s(t){c(o,r,a,i,s,"throw",t)}i(void 0)}))}}var h=function(){return n.e("chunk-2d0e5e97").then(n.bind(null,"9703"))},f={components:{NotFound:h},data:function(){return{league:{},events:[],auth:this.$auth}},watch:{$route:function(){var t=l(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){var t=l(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methods:{scoringMethodShorthandToFull:function(t){return"position"===t?"Position Based (100 Max)":"position50"===t?"Position Based (50 Max)":"position99"===t?"Position Based (99 Max)":"position99average"===t?"Position Based (99 Max, Reduced in a Draw)":"positionDouble"===t?"Position Based (100 Max, Double Points)":"position50Double"===t?"Position Based (50 Max, Double Points)":"timeAverage"===t?"Relative to Average Time (1000 Average)":"timeAverage100"===t?"Relative to Average Time (100 Average)":""},getLeague:function(){var t=this;return u.a.get("/api/leagues/".concat(this.$route.params.name)).then((function(e){t.league=e.data})).catch((function(){return t.$messages.addMessage("Problem Getting League Details")}))},getLeagueEvents:function(){var t=this;return!(!this.league||!this.league.name)&&(this.auth.user?u.a.get("/api/leagues/".concat(this.league.name,"/events/uploadKey")).then((function(e){t.events=e.data})).catch((function(){return t.$messages.addMessage("Problem Getting Event Details")})):u.a.get("/api/leagues/".concat(this.league.name,"/events")).then((function(e){t.events=e.data})).catch((function(){return t.$messages.addMessage("Problem Getting Event Details")})))},deleteLeague:function(){var t=this;if(confirm("Are you Sure you Want to Delete League - ".concat(this.league.name,"? \nThis Action Can't Be Recovered")))return u.a.delete("/api/leagues/".concat(this.league.name)).then((function(){t.$messages.addMessage("League: ".concat(t.league.name," was Deleted")),t.$router.push("/")})).catch((function(){return t.$messages.addMessage("Problem Deleting League - Please Try Again")}))},deleteEvent:function(t){var e=this;if(confirm("Are you Sure you Want to Delete Event - ".concat(t.name,"? \nThis Action Can't Be Recovered")))return u.a.delete("/api/events/".concat(t.id)).then((function(){return e.$messages.addMessage("Event: ".concat(t.name," was Deleted"))})).then((function(){return e.getLeague()})).then((function(){return e.getLeagueEvents()})).catch((function(){return e.$messages.addMessage("Problem Deleting Event - Please Try Again")}))}}},g=f,v=(n("c321"),n("2877")),d=Object(v["a"])(g,r,a,!1,null,"de04f296",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-3b1a114c-legacy.89a0abce.js.map