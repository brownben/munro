(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0cdd5192"],{"02c0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-input"},[n("div",{staticClass:"visible",on:{click:t.toggle}},[n("label",[t._v(t._s(t.label))]),n("p",[t._v(t._s(t.currentValue))]),n("svg",{class:{active:t.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown"},t._l(t.list,function(e){return n("p",{key:e,on:{click:function(n){return t.changeSelection(e)}}},[t._v(t._s(e))])}),0)])],1)},s=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},a=o,i=(n("9573"),n("2877")),c=Object(i["a"])(a,r,s,!1,null,"2375829c",null);e["a"]=c.exports},"2f21":function(t,e,n){"use strict";var r=n("79e5");t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},"491c":function(t,e,n){"use strict";var r=n("6b05"),s=n.n(r);s.a},"55dd":function(t,e,n){"use strict";var r=n("5ca1"),s=n("d8e8"),o=n("4bf8"),a=n("79e5"),i=[].sort,c=[1,2,3];r(r.P+r.F*(a(function(){c.sort(void 0)})||!a(function(){c.sort(null)})||!n("2f21")(i)),"Array",{sort:function(t){return void 0===t?i.call(o(this)):i.call(o(this),s(t))}})},6390:function(t,e,n){},"63da":function(t,e,n){},"6b05":function(t,e,n){},"8f9b":function(t,e,n){"use strict";var r=n("6390"),s=n.n(r);s.a},9573:function(t,e,n){"use strict";var r=n("63da"),s=n.n(r);s.a},bb25:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"up-down-arrows"},[n("svg",{class:{active:t.active&&!t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{active:t.active&&t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},s=[],o={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},a=o,i=(n("491c"),n("2877")),c=Object(i["a"])(a,r,s,!1,null,"1e1ecba6",null);e["a"]=c.exports},dd20:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-headful",{attrs:{title:"Munro - Competitors",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",[t._v("Competitors")]),n("div",{staticClass:"actions"},[n("h2",[t._v("Actions")]),n("div",[n("router-link",{staticClass:"button",attrs:{to:"/create-competitor"}},[t._v("Add Competitor")]),n("router-link",{staticClass:"button",attrs:{to:"/competitors/merge"}},[t._v("Merge Competitors")]),n("router-link",{staticClass:"button",attrs:{to:"/results/transfer"}},[t._v("Transfer Result")]),n("div",{attrs:{id:"filter"}},[n("label",[t._v("League:")]),n("dropdown-input",{attrs:{list:t.leagues.map(function(t){return t.name})},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}})],1)],1)]),t.filteredCompetitors.length>0?n("table",[n("thead",[n("tr",[n("th",{on:{click:function(e){return t.sortBy("name")}}},[n("p",[t._v("Name")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"name"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("club")}}},[n("p",[t._v("Club")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"club"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("ageClass")}}},[n("p",[t._v("Class")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"ageClass"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("course")}}},[n("p",[t._v("Course")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"course"===t.sortedBy}})],1)])]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},t._l(t.sortedCompetitors,function(e){return n("tr",{key:e.name+e.league+e.course,class:{striped:t.sortedCompetitors.indexOf(e)%2===0},on:{click:function(n){return t.$router.push("/competitors/"+e.id+"/edit")}}},[n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.club))]),n("td",[t._v(t._s(e.ageClass))]),n("td",[t._v(t._s(e.course))])])}),0)],1):t._e()],1)},s=[],o=(n("96cf"),n("3b8d")),a=(n("55dd"),n("bc3a")),i=n.n(a),c=n("bb25"),u=n("02c0"),l={components:{UpDownArrow:c["a"],DropdownInput:u["a"]},data:function(){return{league:"",leagues:[],competitors:[],ascendingSort:!1,sortedBy:"name"}},computed:{filteredCompetitors:function(){var t=this;return this.competitors.filter(function(e){return e.league===t.league})},sortedCompetitors:function(){return this.sort(this.filteredCompetitors,this.sortedBy,this.ascendingSort)}},created:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.$route.params.league&&""!==this.$route.params.league&&(this.league=this.$route.params.league),this.getLeagues(),this.getCompetitors();case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),methods:{getCompetitors:function(){var t=this;return i.a.get("/api/competitors").then(function(e){t.competitors=e.data}).catch(function(){return t.$messages.addMessage("Problem Fetching Competitor Details")})},sort:function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=function(t,n){return t[e]===n[e]?0:null===t[e]?1:null===n[e]?-1:t[e]<n[e]?1:-1};return n?t.sort(r):t.sort(r).reverse()},sortBy:function(t){t!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=t},getLeagues:function(){var t=this;return i.a.get("/api/leagues").then(function(e){t.leagues=e.data}).catch(function(){return t.$messages.addMessage("Problem Fetching List of Leagues")})}}},d=l,p=(n("8f9b"),n("2877")),f=Object(p["a"])(d,r,s,!1,null,"61643cc2",null);e["default"]=f.exports}}]);
//# sourceMappingURL=chunk-0cdd5192-legacy.058d1cde.js.map