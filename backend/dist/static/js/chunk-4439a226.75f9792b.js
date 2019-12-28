(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4439a226"],{"02c0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-input"},[n("div",{staticClass:"visible",on:{click:t.toggle}},[n("label",[t._v(t._s(t.label))]),n("p",[t._v(t._s(t.currentValue))]),n("svg",{class:{active:t.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown"},t._l(t.list,(function(e){return n("p",{key:e,on:{click:function(n){return t.changeSelection(e)}}},[t._v(t._s(e))])})),0)])],1)},s=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},i=o,a=(n("9573"),n("2877")),c=Object(a["a"])(i,r,s,!1,null,"2375829c",null);e["a"]=c.exports},"1da1":function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));n("d3b7"),n("e6cf");function r(t,e,n,r,s,o,i){try{var a=t[o](i),c=a.value}catch(u){return void n(u)}a.done?e(c):Promise.resolve(c).then(r,s)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(s,o){var i=t.apply(e,n);function a(t){r(i,s,o,a,c,"next",t)}function c(t){r(i,s,o,a,c,"throw",t)}a(void 0)}))}}},"26e9":function(t,e,n){"use strict";var r=n("23e7"),s=n("e8b5"),o=[].reverse,i=[1,2];r({target:"Array",proto:!0,forced:String(i)===String(i.reverse())},{reverse:function(){return s(this)&&(this.length=this.length),o.call(this)}})},"491c":function(t,e,n){"use strict";var r=n("d86e"),s=n.n(r);s.a},"4e82":function(t,e,n){"use strict";var r=n("23e7"),s=n("1c0b"),o=n("7b0b"),i=n("d039"),a=n("b301"),c=[],u=c.sort,l=i((function(){c.sort(void 0)})),d=i((function(){c.sort(null)})),p=a("sort"),f=l||!d||p;r({target:"Array",proto:!0,forced:f},{sort:function(t){return void 0===t?u.call(o(this)):u.call(o(this),s(t))}})},"7b0b":function(t,e,n){var r=n("1d80");t.exports=function(t){return Object(r(t))}},"8f9b":function(t,e,n){"use strict";var r=n("f506"),s=n.n(r);s.a},"94eb":function(t,e,n){},9573:function(t,e,n){"use strict";var r=n("94eb"),s=n.n(r);s.a},b041:function(t,e,n){"use strict";var r=n("00ee"),s=n("f5df");t.exports=r?{}.toString:function(){return"[object "+s(this)+"]"}},b301:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!n||!r((function(){n.call(null,e||function(){throw 1},1)}))}},bb25:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"up-down-arrows"},[n("svg",{class:{active:t.active&&!t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{active:t.active&&t.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},s=[],o={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},i=o,a=(n("491c"),n("2877")),c=Object(a["a"])(i,r,s,!1,null,"1e1ecba6",null);e["a"]=c.exports},d3b7:function(t,e,n){var r=n("00ee"),s=n("6eeb"),o=n("b041");r||s(Object.prototype,"toString",o,{unsafe:!0})},d86e:function(t,e,n){},dd20:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-headful",{attrs:{title:"Munro - Competitors",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",[t._v("Competitors")]),n("div",{staticClass:"actions"},[n("h2",[t._v("Actions")]),n("div",[n("router-link",{staticClass:"button",attrs:{to:"/create-competitor"}},[t._v("Add Competitor")]),n("router-link",{staticClass:"button",attrs:{to:"/competitors/merge"}},[t._v("Merge Competitors")]),n("router-link",{staticClass:"button",attrs:{to:"/results/transfer"}},[t._v("Transfer Result")]),n("div",{attrs:{id:"filter"}},[n("label",[t._v("League:")]),n("dropdown-input",{attrs:{list:t.leagues.map((function(t){return t.name}))},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}})],1)],1)]),t.filteredCompetitors.length>0?n("table",[n("thead",[n("tr",[n("th",{on:{click:function(e){return t.sortBy("name")}}},[n("p",[t._v("Name")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"name"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("club")}}},[n("p",[t._v("Club")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"club"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("ageClass")}}},[n("p",[t._v("Class")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"ageClass"===t.sortedBy}})],1),n("th",{on:{click:function(e){return t.sortBy("course")}}},[n("p",[t._v("Course")]),n("up-down-arrow",{attrs:{ascending:t.ascendingSort,active:"course"===t.sortedBy}})],1)])]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},t._l(t.sortedCompetitors,(function(e){return n("tr",{key:e.name+e.league+e.course,class:{striped:t.sortedCompetitors.indexOf(e)%2===0},on:{click:function(n){return t.$router.push("/competitors/"+e.id+"/edit")}}},[n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.club))]),n("td",[t._v(t._s(e.ageClass))]),n("td",[t._v(t._s(e.course))])])})),0)],1):t._e()],1)},s=[],o=(n("26e9"),n("4e82"),n("1da1")),i=n("bc3a"),a=n.n(i),c=n("bb25"),u=n("02c0"),l={components:{UpDownArrow:c["a"],DropdownInput:u["a"]},data:()=>({league:"",leagues:[],competitors:[],ascendingSort:!1,sortedBy:"name"}),computed:{filteredCompetitors:function(){return this.competitors.filter(t=>t.league===this.league)},sortedCompetitors:function(){return this.sort(this.filteredCompetitors,this.sortedBy,this.ascendingSort)}},created:function(){var t=Object(o["a"])((function*(){this.$route.params.league&&""!==this.$route.params.league&&(this.league=this.$route.params.league),this.getLeagues(),this.getCompetitors()}));function e(){return t.apply(this,arguments)}return e}(),methods:{getCompetitors:function(){return a.a.get("/api/competitors").then(t=>{this.competitors=t.data}).catch(()=>this.$messages.addMessage("Problem Fetching Competitor Details"))},sort:function(t,e){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=(t,n)=>{return t[e]===n[e]?0:null===t[e]?1:null===n[e]?-1:t[e]<n[e]?1:-1};return n?t.sort(r):t.sort(r).reverse()},sortBy:function(t){t!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=t},getLeagues:function(){return a.a.get("/api/leagues").then(t=>{this.leagues=t.data}).catch(()=>this.$messages.addMessage("Problem Fetching List of Leagues"))}}},d=l,p=(n("8f9b"),n("2877")),f=Object(p["a"])(d,r,s,!1,null,"61643cc2",null);e["default"]=f.exports},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}},f506:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4439a226.75f9792b.js.map