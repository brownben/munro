(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-caefa986"],{"230e":function(t,n,e){var r=e("d3f4"),o=e("7726").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"2aba":function(t,n,e){var r=e("7726"),o=e("32e9"),i=e("69a8"),c=e("ca5a")("src"),a=e("fa5b"),s="toString",u=(""+a).split(s);e("8378").inspectSource=function(t){return a.call(t)},(t.exports=function(t,n,e,a){var s="function"==typeof e;s&&(i(e,"name")||o(e,"name",n)),t[n]!==e&&(s&&(i(e,c)||o(e,c,t[n]?""+t[n]:u.join(String(n)))),t===r?t[n]=e:a?t[n]?t[n]=e:o(t,n,e):(delete t[n],o(t,n,e)))})(Function.prototype,s,function(){return"function"==typeof this&&this[c]||a.call(this)})},"2d00":function(t,n){t.exports=!1},"2f21":function(t,n,e){"use strict";var r=e("79e5");t.exports=function(t,n){return!!t&&r(function(){n?t.call(null,function(){},1):t.call(null)})}},"32e9":function(t,n,e){var r=e("86cc"),o=e("4630");t.exports=e("9e1e")?function(t,n,e){return r.f(t,n,o(1,e))}:function(t,n,e){return t[n]=e,t}},4630:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},"491c":function(t,n,e){"use strict";var r=e("6b05"),o=e.n(r);o.a},"4bf8":function(t,n,e){var r=e("be13");t.exports=function(t){return Object(r(t))}},"53ce":function(t,n,e){},5537:function(t,n,e){var r=e("8378"),o=e("7726"),i="__core-js_shared__",c=o[i]||(o[i]={});(t.exports=function(t,n){return c[t]||(c[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"55dd":function(t,n,e){"use strict";var r=e("5ca1"),o=e("d8e8"),i=e("4bf8"),c=e("79e5"),a=[].sort,s=[1,2,3];r(r.P+r.F*(c(function(){s.sort(void 0)})||!c(function(){s.sort(null)})||!e("2f21")(a)),"Array",{sort:function(t){return void 0===t?a.call(i(this)):a.call(i(this),o(t))}})},"5ca1":function(t,n,e){var r=e("7726"),o=e("8378"),i=e("32e9"),c=e("2aba"),a=e("9b43"),s="prototype",u=function(t,n,e){var f,l,d,p,v=t&u.F,h=t&u.G,g=t&u.S,b=t&u.P,y=t&u.B,m=h?r:g?r[n]||(r[n]={}):(r[n]||{})[s],_=h?o:o[n]||(o[n]={}),w=_[s]||(_[s]={});for(f in h&&(e=n),e)l=!v&&m&&void 0!==m[f],d=(l?m:e)[f],p=y&&l?a(d,r):b&&"function"==typeof d?a(Function.call,d):d,m&&c(m,f,d,t&u.U),_[f]!=d&&i(_,f,p),b&&w[f]!=d&&(w[f]=d)};r.core=o,u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},"69a8":function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},"6a99":function(t,n,e){var r=e("d3f4");t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},"6b05":function(t,n,e){},"70a7":function(t,n,e){"use strict";var r=e("53ce"),o=e.n(r);o.a},7726:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},"79e5":function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},8378:function(t,n){var e=t.exports={version:"2.6.8"};"number"==typeof __e&&(__e=e)},"86cc":function(t,n,e){var r=e("cb7c"),o=e("c69a"),i=e("6a99"),c=Object.defineProperty;n.f=e("9e1e")?Object.defineProperty:function(t,n,e){if(r(t),n=i(n,!0),r(e),o)try{return c(t,n,e)}catch(a){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},"9b43":function(t,n,e){var r=e("d8e8");t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,o){return t.call(n,e,r,o)}}return function(){return t.apply(n,arguments)}}},"9e1e":function(t,n,e){t.exports=!e("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},bb25:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"up-down-arrows"},[e("svg",{class:{active:t.active&&!t.ascending},attrs:{viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),e("svg",{class:{active:t.active&&t.ascending},attrs:{viewBox:"0 0 24 24"}},[e("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},o=[],i={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},c=i,a=(e("491c"),e("2877")),s=Object(a["a"])(c,r,o,!1,null,"1e1ecba6",null);n["a"]=s.exports},be13:function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c69a:function(t,n,e){t.exports=!e("9e1e")&&!e("79e5")(function(){return 7!=Object.defineProperty(e("230e")("div"),"a",{get:function(){return 7}}).a})},ca5a:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},cb7c:function(t,n,e){var r=e("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},d3f4:function(t,n){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d8e8:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},dd20:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("vue-headful",{attrs:{title:"Munro - Competitors"}}),e("h1",[t._v("Competitors")]),e("div",{staticClass:"actions"},[e("h2",[t._v("Actions")]),e("div",[e("router-link",{staticClass:"button",attrs:{to:"/create-competitor"}},[t._v("Add Competitor")]),e("router-link",{staticClass:"button",attrs:{to:"/competitors/merge"}},[t._v("Merge Competitors")]),e("router-link",{staticClass:"button",attrs:{to:"/results/transfer"}},[t._v("Transfer Result")])],1)]),t.competitors?e("table",[e("thead",[e("tr",[e("th",{on:{click:function(n){return t.sortBy("name")}}},[e("p",[t._v("Name")]),e("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"name"===t.sortedBy}})],1),e("th",{on:{click:function(n){return t.sortBy("club")}}},[e("p",[t._v("Club")]),e("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"club"===t.sortedBy}})],1),e("th",{on:{click:function(n){return t.sortBy("ageClass")}}},[e("p",[t._v("Class")]),e("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"ageClass"===t.sortedBy}})],1),e("th",{staticClass:"club",on:{click:function(n){return t.sortBy("league")}}},[e("p",[t._v("League")]),e("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"league"===t.sortedBy}})],1),e("th",{on:{click:function(n){return t.sortBy("course")}}},[e("p",[t._v("Course")]),e("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"course"===t.sortedBy}})],1)])]),e("transition-group",{tag:"tbody",attrs:{name:"fade"}},t._l(t.sortedCompetitors,function(n){return e("tr",{key:n.name+n.league+n.course,class:{striped:t.sortedCompetitors.indexOf(n)%2===0},on:{click:function(e){return t.$router.push("/competitors/"+n.id+"/edit")}}},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.club))]),e("td",[t._v(t._s(n.ageClass))]),e("td",[t._v(t._s(n.league))]),e("td",[t._v(t._s(n.course))])])}),0)],1):t._e()],1)},o=[],i=(e("55dd"),e("bc3a")),c=e.n(i),a=e("bb25"),s={components:{UpDownArrow:a["a"]},data:function(){return{competitors:[],ascendingSort:!1,sortedBy:"name"}},computed:{sortedCompetitors:function(){return this.sort(this.competitors,this.sortedBy,this.ascendingSort)}},created:function(){this.getCompetitors()},methods:{getCompetitors:function(){var t=this;return c.a.get("/api/competitors").then(function(n){t.competitors=n.data}).catch(function(){return t.$messages.addMessage("Problem Fetching Competitor Details")})},sort:function(t,n){var e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=function(t,e){return t[n]===e[n]?0:null===t[n]?1:null===e[n]?-1:t[n]<e[n]?1:-1};return e?t.sort(r):t.sort(r).reverse()},sortBy:function(t){t!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=t}}},u=s,f=(e("70a7"),e("2877")),l=Object(f["a"])(u,r,o,!1,null,"18ea8a3d",null);n["default"]=l.exports},fa5b:function(t,n,e){t.exports=e("5537")("native-function-to-string",Function.toString)}}]);
//# sourceMappingURL=chunk-caefa986-legacy.d89298fb.js.map