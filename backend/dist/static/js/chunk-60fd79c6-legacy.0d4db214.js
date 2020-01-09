(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60fd79c6"],{"02c0":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-input relative top--4"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[t._v(t._s(t.label))]),n("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:t.toggle}},[n("p",{staticClass:"leading-normal h-6 truncate"},[t._v(t._s(t.currentValue))]),n("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},t._l(t.list,(function(e){return n("p",{key:e,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(n){return t.changeSelection(e)}}},[t._v(" "+t._s(e)+" ")])})),0)])],1)},a=[],r={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},o=r,i=(n("0886"),n("2877")),u=Object(i["a"])(o,s,a,!1,null,null,null);e["a"]=u.exports},"0886":function(t,e,n){"use strict";var s=n("27fc"),a=n.n(s);a.a},"27fc":function(t,e,n){},"41d4":function(t,e,n){"use strict";var s=n("be9e"),a=n.n(s);a.a},"75a1":function(t,e,n){"use strict";var s=n("b08e"),a=n.n(s);a.a},b08e:function(t,e,n){},bb25:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"up-down-arrow"},[n("svg",{class:{"active-arrow":t.active&&!t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{"active-arrow":t.active&&t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},a=[],r={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},o=r,i=(n("41d4"),n("2877")),u=Object(i["a"])(o,s,a,!1,null,null,null);e["a"]=u.exports},be9e:function(t,e,n){},dd20:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Competitors",description:""}}),n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[t._v(" Competitors ")]),n("div",{staticClass:"card"},[n("h2",{staticClass:"text-2xl font-heading"},[t._v("Actions")]),n("div",[n("router-link",{staticClass:"button",attrs:{to:"/create-competitor"}},[t._v("Add Competitor")]),n("router-link",{staticClass:"button",attrs:{to:"/competitors/merge"}},[t._v("Merge Competitors")]),n("router-link",{staticClass:"button",attrs:{to:"/results/transfer"}},[t._v("Transfer Result")]),n("router-link",{staticClass:"button",attrs:{to:"/results/manual"}},[t._v("Manual Points")])],1),n("div",{staticClass:"text-left w-full"},[n("dropdown-input",{attrs:{list:t.leagues.map((function(t){return t.name})),label:"League:"},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}})],1)]),t.filteredCompetitors.length>0?n("table",{staticClass:"table my-4 table-fixed"},[n("thead",[n("tr",[n("th",{on:{click:function(e){return t.sortBy("name")}}},[n("p",[t._v("Name")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"name"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("club")}}},[n("p",[t._v("Club")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"club"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("ageClass")}}},[n("p",[t._v("Class")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"ageClass"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("course")}}},[n("p",[t._v("Course")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"course"===t.sortedBy}})],1)])]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},t._l(t.sortedCompetitors,(function(e){return n("tr",{key:e.name+e.league+e.course,class:{striped:t.sortedCompetitors.indexOf(e)%2===0},on:{click:function(n){return t.$router.push("/competitors/"+e.id+"/edit")}}},[n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.club))]),n("td",[t._v(t._s(e.ageClass))]),n("td",[t._v(t._s(e.course))])])})),0)],1):t._e()],1)},a=[],r=n("bc3a"),o=n.n(r),i=n("bb25"),u=n("02c0"),c={components:{UpDownArrow:i["a"],DropdownInput:u["a"]},data:function(){return{league:"",leagues:[],competitors:[],ascendingSort:!1,sortedBy:"name"}},computed:{filteredCompetitors:function(){var t=this;return this.competitors.filter((function(e){return e.league===t.league}))},sortedCompetitors:function(){return this.sort(this.filteredCompetitors,this.sortedBy,this.ascendingSort)}},created:function(){this.$route.params.league&&""!==this.$route.params.league&&(this.league=this.$route.params.league),this.getLeagues(),this.getCompetitors()},methods:{getCompetitors:function(){var t=this;return o.a.get("/api/competitors").then((function(e){t.competitors=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching Competitor Details")}))},sort:function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=function(t,n){return t[e]===n[e]?0:null===t[e]?1:null===n[e]?-1:t[e]<n[e]?1:-1};return n?t.sort(s):t.sort(s).reverse()},sortBy:function(t){t!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=t},getLeagues:function(){var t=this;return o.a.get("/api/leagues").then((function(e){t.leagues=e.data})).catch((function(){return t.$messages.addMessage("Problem Fetching List of Leagues")}))}}},l=c,d=(n("75a1"),n("2877")),p=Object(d["a"])(l,s,a,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-60fd79c6-legacy.0d4db214.js.map