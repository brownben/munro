(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5cb059a0"],{"4e32":function(e,t,s){},"883d":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"w-full pt-2 px-4 md:px-8 lg:px-16 xl:px-20"},[s("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name+" - "+e.$route.params.course+" Results",description:"Results from the "+e.$route.params.course+" course of the "+e.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues/"+e.$route.params.name+"/results/"+e.$route.params.course,head:{meta:{name:"robots",content:"all"}}}}),s("h1",{staticClass:"text-3xl font-normal font-heading"},[s("router-link",{staticClass:"link text-main",attrs:{to:"/leagues/"+e.$route.params.name}},[e._v(e._s(e.$route.params.name))]),e._v(" - "+e._s(e.$route.params.course)+" ")],1),s("filter-menu",{on:{changed:e.filterChanged}}),s("div",{directives:[{name:"show",rawName:"v-show",value:e.filteredResults&&e.filteredResults.length>0,expression:"filteredResults && filteredResults.length > 0"}],staticClass:"table-container"},[s("table",{staticClass:"table"},[s("thead",[s("tr",[s("th",{on:{click:function(t){return e.sortBy("position")}}},[s("p",[e._v("Pos.")]),s("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"position"===e.sortedBy}})],1),s("th",{on:{click:function(t){return e.sortBy("name")}}},[s("p",[e._v("Name")]),s("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"name"===e.sortedBy}})],1),s("th",{on:{click:function(t){return e.sortBy("age")}}},[s("p",[e._v("Class")]),s("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"age"===e.sortedBy}})],1),s("th",{staticClass:"club",on:{click:function(t){return e.sortBy("club")}}},[s("p",[e._v("Club")]),s("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"club"===e.sortedBy}})],1),s("th",{on:{click:function(t){return e.sortBy("totalPoints")}}},[s("p",[e._v("Points")]),s("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"totalPoints"===e.sortedBy}})],1),e.smallWindow?s("td"):e._l(e.eventsWithResults,(function(t){return s("th",{key:e.eventsWithResults.indexOf(t),staticClass:"points relative",on:{click:function(s){e.sortBy("points-"+e.eventsWithResults.indexOf(t))}}},[s("p",[e._v(e._s(e.eventsWithResults.indexOf(t)+1))]),s("span",[e._v(e._s(t.name))]),s("up-down-arrow",{staticClass:"points-arrow",attrs:{ascending:e.ascendingSort,active:e.sortedBy==="points-"+e.eventsWithResults.indexOf(t)}})],1)}))],2)]),s("transition-group",{tag:"tbody",attrs:{name:"fade"}},[e._l(e.filteredResults,(function(t){return[s("tr",{key:t.name,staticClass:"normal-table-row",class:{striped:e.filteredResults.indexOf(t)%2===0},on:{click:function(s){e.toggleRow(e.filteredResults.indexOf(t))}}},[s("td",[e._v(e._s(t.position))]),s("td",[e._v(e._s(t.name))]),s("td",[e._v(e._s(t.ageClass))]),s("td",{staticClass:"club"},[e._v(e._s(t.club))]),s("td",[e._v(e._s(t.totalPoints))]),e.smallWindow?s("td",[e.openedRows.includes(e.filteredResults.indexOf(t))?s("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[s("path",{attrs:{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}}),s("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]):s("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[s("path",{attrs:{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}}),s("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})])]):e._l(e.eventsWithResults,(function(n){return s("td",{key:e.eventsWithResults.indexOf(n),staticClass:"points",class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(n)),bold:t.types&&""!==t.types[e.eventsWithResults.indexOf(n)]}},[e._v(" "+e._s(t.points[e.eventsWithResults.indexOf(n)])+" ")])}))],2),e.smallWindow&&e.openedRows.includes(e.filteredResults.indexOf(t))?s("tr",{key:t.name+"-mobile",staticClass:"mobile-table-expansion",class:{striped:e.filteredResults.indexOf(t)%2===0}},[s("td",{attrs:{colspan:"100%"}},e._l(e.eventsWithResults,(function(n){return s("p",{key:e.eventsWithResults.indexOf(n)},[e._v(" "+e._s(n.name)+": "),s("span",{class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(n))}},[e._v(e._s(t.points[e.eventsWithResults.indexOf(n)]))])])})),0)]):e._e()]}))],2)],1)]),e.found?e._e():s("h2",{staticClass:"text-3xl font-heading my-10 mx-2"},[e._v(" Sorry, No Results Could Be Found ")]),e.otherCourses.length>0?s("div",{staticClass:"card my-6 mx-1"},[s("h2",{staticClass:"text-2xl font-heading"},[e._v("Results for Other Courses")]),s("div",e._l(e.otherCourses,(function(t){return s("router-link",{key:t,staticClass:"button",attrs:{to:"/leagues/"+e.$route.params.name+"/results/"+t}},[e._v(e._s(t))])})),1)]):e._e()],1)},r=[],i=s("a34a"),a=s.n(i),o=s("bc3a"),l=s.n(o),u=s("3fbd"),c=s("bb25");function d(e,t,s,n,r,i,a){try{var o=e[i](a),l=o.value}catch(u){return void s(u)}o.done?t(l):Promise.resolve(l).then(n,r)}function f(e){return function(){var t=this,s=arguments;return new Promise((function(n,r){var i=e.apply(t,s);function a(e){d(i,n,r,a,o,"next",e)}function o(e){d(i,n,r,a,o,"throw",e)}a(void 0)}))}}var h={components:{FilterMenu:u["a"],UpDownArrow:c["a"]},data:function(){return{smallWindow:!1,found:!0,openedRows:[],rawResults:[],events:[],otherCourses:[],sortedBy:"position",ascendingSort:!1,filterPreferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},computed:{resultsWithAgeClassSplit:function(){return this.rawResults.map((function(e){if(e.ageClass){var t=e.ageClass.match(/([MWmwfFDH])[^0-9]*([0-9]*)/);["M","H"].includes(t[1].toUpperCase())?e.gender="M":["W","F","D"].includes(t[1].toUpperCase())&&(e.gender="W"),e.age=parseInt(t[2],10)}return e}))},sortedResults:function(){var e=this.sortedBy;return this.sortedBy.includes("points-")&&(e=parseInt(e.split("-")[1],10)),this.sort(this.resultsWithAgeClassSplit,e,this.ascendingSort,this.sortedBy.includes("points-"))},filteredResults:function(){var e=this;return this.sortedResults.filter((function(t){return t.name.match(new RegExp(e.filterPreferences.name,"i"))&&t.club.match(new RegExp(e.filterPreferences.club,"i"))&&(e.filterPreferences.male&&e.filterPreferences.female||e.filterPreferences.male&&"M"===t.gender||e.filterPreferences.female&&"W"===t.gender)&&(e.filterPreferences.maxAge>=100&&0===e.filterPreferences.minAge||e.filterPreferences.minAge<=t.age&&t.age<=e.filterPreferences.maxAge)}))},eventsWithResults:function(){return this.events.filter((function(e){return e.resultUploaded}))}},watch:{$route:function(){var e=f(a.a.mark((function e(){return a.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.rawResults=[],this.openedRows=[],e.next=4,this.getResults();case 4:return e.next=6,this.getEventList();case 6:this.getOtherCourses();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){window.addEventListener("resize",this.handleResize),this.handleResize(),this.getResults(),this.getEventList(),this.getOtherCourses()},destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){window.innerWidth>900?this.smallWindow=!1:this.smallWindow=!0},getResults:function(){var e=this;return l.a.get("/api/leagues/".concat(this.$route.params.name,"/results/").concat(this.$route.params.course)).then((function(t){t.data.length>0?e.rawResults=t.data:e.found=!1})).catch((function(){e.found=!1}))},getOtherCourses:function(){var e=this;return l.a.get("/api/leagues/".concat(this.$route.params.name)).then((function(t){return t.data.courses?e.otherCourses=t.data.courses.filter((function(t){return t!==e.$route.params.course})):e.otherCourses=!1,e.otherCourses})).catch((function(){e.otherCourses=!1}))},getEventList:function(){var e=this;return l.a.get("/api/leagues/".concat(this.$route.params.name,"/events")).then((function(t){e.events=t.data})).catch((function(){return e.$messages.addMessage("Problem Fetching List of Events")}))},sort:function(e,t){var s,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return s=r?function(e,s){return e.points[t]===s.points[t]?0:null===e.points[t]?1:null===s.points[t]?-1:e.points[t]<s.points[t]?1:-1}:function(e,s){return e[t]===s[t]?0:null===e[t]||void 0===e[t]?1:null===s[t]||void 0===s[t]?-1:e[t]<s[t]?1:-1},n?e.sort(s):e.sort(s).reverse()},sortBy:function(e){this.openedRows=[],e!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=e},filterChanged:function(e){this.filterPreferences.name=e.name,this.filterPreferences.club=e.club,""===e.minAge?this.filterPreferences.minAge=0:this.filterPreferences.minAge=e.minAge,""===e.maxAge?this.filterPreferences.maxAge=100:this.filterPreferences.maxAge=e.maxAge,this.filterPreferences.male=e.male,this.filterPreferences.female=e.female},toggleRow:function(e){var t=this.openedRows.indexOf(e);t>-1?this.openedRows.splice(t,1):this.openedRows.push(e)}}},p=h,m=(s("f7a8"),s("2877")),g=Object(m["a"])(p,n,r,!1,null,null,null);t["default"]=g.exports},f7a8:function(e,t,s){"use strict";var n=s("4e32"),r=s.n(n);r.a}}]);
//# sourceMappingURL=chunk-5cb059a0-legacy.b5a3c8b0.js.map