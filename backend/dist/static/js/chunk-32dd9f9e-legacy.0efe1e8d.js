(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32dd9f9e","chunk-2d0e5e97"],{"740b":function(e,t,n){"use strict";var r=n("a3e6"),s=n.n(r);s.a},"7c84":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{title:"Munro - "+(e.event.name||"")+" Event Results",description:"Results from the "+(e.event.name||"")+" event of the "+(e.event.league||"")+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/events/"+e.$route.params.event,head:{meta:{name:"robots",content:"all"}}}}),e.eventFound?n("div",[n("h1",{directives:[{name:"show",rawName:"v-show",value:e.event,expression:"event"}],staticClass:"text-3xl font-normal font-heading"},[n("router-link",{staticClass:"link text-main",attrs:{to:"/leagues/"+e.event.league}},[e._v(" "+e._s(e.event.league||"")+" ")]),e._v(" - "+e._s(e.event.name||"")+" ")],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.event&&e.coursesInResults,expression:"event && coursesInResults"}],staticClass:"card my-4"},[n("h3",{staticClass:"font-heading text-2xl"},[e._v("Courses")]),n("div",e._l(e.coursesInResults,(function(t){return n("button",{key:t,staticClass:"button inline-block",class:{active:e.chosenCourse===t},on:{click:function(n){e.chosenCourse=t}}},[e._v(" "+e._s(t)+" ")])})),0)]),n("filter-menu",{on:{changed:e.filterChanged}}),e.filteredResults&&e.filteredResults.length>0?n("div",[n("transition",{attrs:{name:"shrink"}},[n("table",{staticClass:"table mb-2"},[n("thead",[n("tr",[n("th",{on:{click:function(t){return e.sortBy("position")}}},[n("p",[e._v("Pos.")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"position"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("name")}}},[n("p",[e._v("Name")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"name"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("age")}}},[n("p",[e._v("Class")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"age"===e.sortedBy}})],1),n("th",{staticClass:"club",on:{click:function(t){return e.sortBy("club")}}},[n("p",[e._v("Club")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"club"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("time")}}},[n("p",[e._v("Time")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"time"===e.sortedBy}})],1)])]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},e._l(e.filteredResults,(function(t){return n("tr",{key:t.id,class:{striped:e.filteredResults.indexOf(t)%2===0}},[n("td",[e._v(e._s(t.position||""))]),n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.ageClass))]),n("td",{staticClass:"club"},[e._v(e._s(t.club))]),n("td",[e._v(e._s(e.elapsedTime(t.time)))])])})),0)],1)])],1):e._e(),e.eventFound&&!e.found?n("h2",{staticClass:"text-3xl font-heading"},[e._v(" Sorry, No Results Could Be Found ")]):e._e()],1):e._e(),e.eventFound?e._e():n("not-found")],1)},s=[],i=n("a34a"),a=n.n(i),o=n("bc3a"),u=n.n(o),c=n("3fbd"),l=n("bb25"),f=n("9703");function d(e,t,n,r,s,i,a){try{var o=e[i](a),u=o.value}catch(c){return void n(c)}o.done?t(u):Promise.resolve(u).then(r,s)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,s){var i=e.apply(t,n);function a(e){d(i,r,s,a,o,"next",e)}function o(e){d(i,r,s,a,o,"throw",e)}a(void 0)}))}}function v(e){return p(e)||g(e)||m()}function m(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function g(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function p(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var w={components:{FilterMenu:c["a"],UpDownArrow:l["a"],NotFound:f["default"]},data:function(){return{event:!1,found:!0,eventFound:!0,rawResults:[],sortedBy:"position",ascendingSort:!1,chosenCourse:"",filterPreferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},computed:{resultsWithAgeClassSplit:function(){return this.rawResults.map((function(e){if(e.ageClass){var t=e.ageClass.match(/([MWmwfFDH])[^0-9]*([0-9]*)/);["M","H"].includes(t[1].toUpperCase())?e.gender="M":["W","F","D"].includes(t[1].toUpperCase())&&(e.gender="W"),e.age=parseInt(t[2],10)}return e}))},sortedResults:function(){return this.sort(this.resultsWithAgeClassSplit,this.sortedBy,this.ascendingSort)},filteredResults:function(){var e=this;return this.sortedResults.filter((function(t){return t.name.match(new RegExp(e.filterPreferences.name,"i"))&&t.club.match(new RegExp(e.filterPreferences.club,"i"))&&t.course===e.chosenCourse&&(e.filterPreferences.male&&e.filterPreferences.female||e.filterPreferences.male&&"M"===t.gender||e.filterPreferences.female&&"W"===t.gender)&&(e.filterPreferences.maxAge>=100&&0===e.filterPreferences.minAge||e.filterPreferences.minAge<=t.age&&t.age<=e.filterPreferences.maxAge)}))},coursesInResults:function(){var e=v(new Set(this.rawResults.map((function(e){return e.course}))));return this.setChosenCourse(e),e}},watch:{$route:function(){var e=h(a.a.mark((function e(){return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.rawResults=[],e.next=3,this.getResults();case 3:return e.next=5,this.getEvent();case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){this.getResults(),this.getEvent()},methods:{getResults:function(){var e=this;return u.a.get("/api/events/".concat(this.$route.params.event,"/results")).then((function(t){t.data.length>0?e.rawResults=t.data:e.found=!1})).catch((function(){e.found=!1}))},getEvent:function(){var e=this;return u.a.get("/api/events/".concat(this.$route.params.event)).then((function(t){e.event=t.data,e.eventFound=t.data})).catch((function(){e.eventFound=!1}))},sort:function(e,t){var n,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return n=function(e,n){return e[t]===n[t]?0:null===e[t]||void 0===e[t]||""===e[t]?-1:null===n[t]||void 0===n[t]||""===n[t]?1:e[t]<n[t]?1:-1},r?e.sort(n):e.sort(n).reverse()},sortBy:function(e){e!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=e},filterChanged:function(e){this.filterPreferences.name=e.name,this.filterPreferences.club=e.club,""===e.minAge?this.filterPreferences.minAge=0:this.filterPreferences.minAge=e.minAge,""===e.maxAge?this.filterPreferences.maxAge=100:this.filterPreferences.maxAge=e.maxAge,this.filterPreferences.male=e.male,this.filterPreferences.female=e.female},setChosenCourse:function(e){this.chosenCourse=e[0]},twoDigits:function(e){return e.toString().length<2?"0".concat(e.toString()):e},elapsedTime:function(e){if("number"!==typeof e)return e;if(0===e)return"";var t=Math.floor(e/60),n=Math.abs(e%60);return"".concat(this.twoDigits(t),":").concat(this.twoDigits(n))}}},b=w,C=(n("740b"),n("2877")),y=Object(C["a"])(b,r,s,!1,null,"814ccdca",null);t["default"]=y.exports},9703:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Not Found",description:""}}),n("div",{staticClass:"card mt-5"},[n("h1",{staticClass:"text-main text-3xl font-heading my-2"},[e._v(" Sorry We Can't Find What You Are Looking For ")]),n("p",[e._v("Please check the URL and Try Again")]),n("div",[n("button",{staticClass:"button inline-block",on:{click:function(t){return e.$router.go(-1)}}},[e._v(" Go Back ")]),n("router-link",{staticClass:"button inline-block",attrs:{to:"/"}},[e._v("Return Home")])],1)])],1)},s=[],i=n("2877"),a={},o=Object(i["a"])(a,r,s,!1,null,null,null);t["default"]=o.exports},a3e6:function(e,t,n){}}]);
//# sourceMappingURL=chunk-32dd9f9e-legacy.0efe1e8d.js.map