(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38c7f823"],{"8b26":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.league?r("div",[r("vue-headful",{attrs:{title:"Munro - "+t.$route.params.name,description:"Event Information and Results for the "+t.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",head:{meta:{name:"robots",content:"noindex"}}}}),t._l(t.events,(function(e){return r("div",{key:e.name,staticClass:"card my-4"},[r("h2",{staticClass:"font-heading text-xl my-1"},[t._v(t._s(e.name))]),e.date?r("p",[t._v(" On "+t._s(e.date.split("-")[2])+"/"+t._s(e.date.split("-")[1])+"/"+t._s(e.date.split("-")[0])+" "),e.organiser?[t._v(" organised by "+t._s(e.organiser)+" ")]:t._e()],2):t._e(),e.moreInformation?r("p",[t._v(t._s(e.moreInformation))]):t._e(),e.website?r("p",[t._v(" More Information can be found on their "),r("a",{staticClass:"link",attrs:{href:e.website,target:"_blank",rel:"noopener noreferrer"}},[t._v("website")])]):t._e(),e.resultUploaded?r("div",{staticClass:"event-actions event-result-actions"},[e.results?r("a",{staticClass:"button",attrs:{href:e.results,target:"_blank",rel:"noopener noreferrer"}},[t._v("Results")]):t._e(),e.winsplits?r("a",{staticClass:"button",attrs:{href:e.winsplits,target:"_blank",rel:"noopener noreferrer"}},[t._v("WinSplits")]):t._e(),e.routegadget?r("a",{staticClass:"button",attrs:{href:e.routegadget,target:"_blank",rel:"noopener noreferrer"}},[t._v("Routegadget")]):t._e()]):t._e()])}))],2):t._e(),t.league?t._e():r("not-found")],1)},o=[],a=r("a34a"),i=r.n(a),s=r("bc3a"),u=r.n(s);function c(t,e,r,n,o,a,i){try{var s=t[a](i),u=s.value}catch(c){return void r(c)}s.done?e(u):Promise.resolve(u).then(n,o)}function l(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){c(a,n,o,i,s,"next",t)}function s(t){c(a,n,o,i,s,"throw",t)}i(void 0)}))}}var h=function(){return r.e("chunk-2d0e5e97").then(r.bind(null,"9703"))},f={components:{NotFound:h},data:function(){return{league:{},events:[]}},watch:{$route:function(){var t=l(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){var t=l(i.a.mark((function t(){return i.a.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methods:{scoringMethodShorthandToFull:function(t){return"position"===t?"Position Based (100 Max)":"position50"===t?"Position Based (50 Max)":"position99"===t?"Position Based (99 Max)":"position99average"===t?"Position Based (99 Max, Reduced in a Draw)":"positionDouble"===t?"Position Based (100 Max, Double Points)":"position50Double"===t?"Position Based (50 Max, Double Points)":"timeAverage"===t?"Relative to Average Time (1000 Average)":"timeAverage100"===t?"Relative to Average Time (100 Average)":""},getLeague:function(){var t=this;return u.a.get("/api/leagues/".concat(this.$route.params.name)).then((function(e){t.league=e.data})).catch((function(){return t.$messages.addMessage("Problem Getting League Details")}))},getLeagueEvents:function(){var t=this;return!!this.league&&u.a.get("/api/leagues/".concat(this.league.name,"/events")).then((function(e){t.events=e.data})).catch((function(){return t.$messages.addMessage("Problem Getting Event Details")}))}}},p=f,v=r("2877"),g=Object(v["a"])(p,n,o,!1,null,null,null);e["default"]=g.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function u(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,a=Object.create(o.prototype),i=new M(n||[]);return a._invoke=E(t,r,i),a}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=u;var l="suspendedStart",h="suspendedYield",f="executing",p="completed",v={};function g(){}function d(){}function y(){}var m={};m[a]=function(){return this};var w=Object.getPrototypeOf,_=w&&w(w(j([])));_&&_!==r&&n.call(_,a)&&(m=_);var b=y.prototype=g.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function L(t){function e(r,o,a,i){var s=c(t[r],t,o);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&n.call(l,"__await")?Promise.resolve(l.__await).then((function(t){e("next",t,a,i)}),(function(t){e("throw",t,a,i)})):Promise.resolve(l).then((function(t){u.value=t,a(u)}),(function(t){return e("throw",t,a,i)}))}i(s.arg)}var r;function o(t,n){function o(){return new Promise((function(r,o){e(t,n,r,o)}))}return r=r?r.then(o,o):o()}this._invoke=o}function E(t,e,r){var n=l;return function(o,a){if(n===f)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw a;return G()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var s=k(i,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===l)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var u=c(t,e,r);if("normal"===u.type){if(n=r.done?p:h,u.arg===v)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=p,r.method="throw",r.arg=u.arg)}}}function k(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,k(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=c(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function j(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:G}}function G(){return{value:e,done:!0}}return d.prototype=b.constructor=y,y.constructor=d,y[s]=d.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},x(L.prototype),L.prototype[i]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,o){var a=new L(u(e,r,n,o));return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(b),b[s]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},a34a:function(t,e,r){t.exports=r("96cf")}}]);
//# sourceMappingURL=chunk-38c7f823-legacy.aa5ebf60.js.map