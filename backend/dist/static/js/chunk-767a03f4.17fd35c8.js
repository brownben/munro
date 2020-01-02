(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-767a03f4","chunk-2d0e5e97"],{"10df":function(e,t,n){"use strict";var a=n("46d7"),s=n.n(a);s.a},"3cfe":function(e,t,n){},"3fbd":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("accordion-dropdown",{attrs:{title:"Filter"}},[n("text-input",{staticClass:"w-full md:w-1/2 inline-block md:pr-2",attrs:{label:"Name:"},on:{input:e.onChange},model:{value:e.preferences.name,callback:function(t){e.$set(e.preferences,"name",t)},expression:"preferences.name"}}),n("text-input",{staticClass:"w-full md:w-1/2 inline-block md:pl-2",attrs:{label:"Club:"},on:{input:e.onChange},model:{value:e.preferences.club,callback:function(t){e.$set(e.preferences,"club",t)},expression:"preferences.club"}}),n("number-input",{staticClass:"w-1/2 md:w-1/4 inline-block pr-2 md:mb--4",attrs:{label:"Min Age:",min:0,max:120},on:{input:e.onChange},model:{value:e.preferences.minAge,callback:function(t){e.$set(e.preferences,"minAge",e._n(t))},expression:"preferences.minAge"}}),n("number-input",{staticClass:"w-1/2 md:w-1/4 inline-block pl-2 md:mb--4",attrs:{label:"Max Age:",min:0,max:120},on:{input:e.onChange},model:{value:e.preferences.maxAge,callback:function(t){e.$set(e.preferences,"maxAge",e._n(t))},expression:"preferences.maxAge"}}),n("checkbox",{staticClass:"w-1/2 md:w-1/4 inline-block pr-2 text-center",attrs:{label:"Male:"},on:{input:e.onChange},model:{value:e.preferences.male,callback:function(t){e.$set(e.preferences,"male",t)},expression:"preferences.male"}}),n("checkbox",{staticClass:"w-1/2 md:w-1/4 inline-block pl-2 text-center",attrs:{label:"Female:"},on:{input:e.onChange},model:{value:e.preferences.female,callback:function(t){e.$set(e.preferences,"female",t)},expression:"preferences.female"}})],1)},s=[],r=n("c824"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"rounded-tl-lg rounded-br-lg shadow-md mt-3 mb-6 accordion bg-white"},[n("div",{staticClass:"accordion-head",on:{click:function(t){e.accordionOpen=!e.accordionOpen}}},[n("h2",{staticClass:"font-heading text-main text-2xl p-2 px-3 inline-block select-none"},[e._v(e._s(e.title))]),n("svg",{staticClass:"fill-current text-main h-12 float-right p-2",class:{rotate:e.accordionOpen},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}}),n("path",{attrs:{fill:"none",d:"M0 0h24v24H0V0z"}})])]),n("transition",{attrs:{name:"shrink"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.accordionOpen,expression:"accordionOpen"}],key:"1",staticClass:"accordion-body p-3 pt-0 pb-1"},[e._t("default")],2)])],1)},l=[],o={props:{title:{type:String,default:"Title"}},data:()=>({accordionOpen:!1})},c=o,u=(n("a781"),n("2877")),d=Object(u["a"])(c,i,l,!1,null,"ba3a1d34",null),f=d.exports,p=n("446e"),m=n("d610"),v={components:{Checkbox:r["a"],AccordionDropdown:f,TextInput:p["a"],NumberInput:m["a"]},data:()=>({preferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}),methods:{onChange:function(){this.$emit("changed",this.preferences)}}},h=v,g=Object(u["a"])(h,a,s,!1,null,"361ef9f6",null);t["a"]=g.exports},"446e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),"checkbox"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){var n=e.value,a=t.target,s=!!a.checked;if(Array.isArray(n)){var r=null,i=e._i(n,r);a.checked?i<0&&(e.value=n.concat([r])):i>-1&&(e.value=n.slice(0,i).concat(n.slice(i+1)))}else e.value=s}}}):"radio"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"radio"},domProps:{checked:e._q(e.value,null)},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){e.value=null}}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=t.target.value)},function(t){return e.$emit("input",t.target.value)}]}})])},s=[],r={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},i=r,l=n("2877"),o=Object(l["a"])(i,a,s,!1,null,null,null);t["a"]=o.exports},"46d7":function(e,t,n){},6327:function(e,t,n){},"6d3d":function(e,t,n){"use strict";var a=n("e7a6"),s=n.n(a);s.a},"7c84":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[e.eventFound?n("div",[n("h1",{directives:[{name:"show",rawName:"v-show",value:e.event,expression:"event"}],staticClass:"text-3xl font-normal font-heading"},[n("router-link",{staticClass:"link text-main",attrs:{to:"/leagues/"+e.event.league}},[e._v(e._s(e.event.league||""))]),e._v(" - "+e._s(e.event.name||"")+" ")],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.event&&e.coursesInResults,expression:"event && coursesInResults"}],staticClass:"card my-4"},[n("h3",{staticClass:"font-heading text-2xl"},[e._v("Courses")]),n("div",e._l(e.coursesInResults,(function(t){return n("button",{key:t,staticClass:"button inline-block",class:{active:e.chosenCourse===t},on:{click:function(n){e.chosenCourse=t}}},[e._v(" "+e._s(t)+" ")])})),0)]),n("filter-menu",{on:{changed:e.filterChanged}}),e.filteredResults&&e.filteredResults.length>0?n("div",[n("transition",{attrs:{name:"shrink"}},[n("table",{staticClass:"table mb-2"},[n("thead",[n("tr",[n("th",{on:{click:function(t){return e.sortBy("position")}}},[n("p",[e._v("Pos.")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"position"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("name")}}},[n("p",[e._v("Name")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"name"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("age")}}},[n("p",[e._v("Class")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"age"===e.sortedBy}})],1),n("th",{staticClass:"club",on:{click:function(t){return e.sortBy("club")}}},[n("p",[e._v("Club")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"club"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("time")}}},[n("p",[e._v("Time")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"time"===e.sortedBy}})],1)])]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},e._l(e.filteredResults,(function(t){return n("tr",{key:t.id,class:{striped:e.filteredResults.indexOf(t)%2===0}},[n("td",[e._v(e._s(t.position||""))]),n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.ageClass))]),n("td",{staticClass:"club"},[e._v(e._s(t.club))]),n("td",[e._v(e._s(e.elapsedTime(t.time)))])])})),0)],1)])],1):e._e(),e.eventFound&&!e.found?n("h2",{staticClass:"text-3xl font-heading"},[e._v("Sorry, No Results Could Be Found")]):e._e()],1):e._e(),e.eventFound?e._e():n("not-found")],1)},s=[],r=n("bc3a"),i=n.n(r),l=n("3fbd"),o=n("bb25"),c=n("9703");function u(e,t,n,a,s,r,i){try{var l=e[r](i),o=l.value}catch(c){return void n(c)}l.done?t(o):Promise.resolve(o).then(a,s)}function d(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var r=e.apply(t,n);function i(e){u(r,a,s,i,l,"next",e)}function l(e){u(r,a,s,i,l,"throw",e)}i(void 0)}))}}var f={components:{FilterMenu:l["a"],UpDownArrow:o["a"],NotFound:c["default"]},data:()=>({event:!1,found:!0,eventFound:!0,rawResults:[],sortedBy:"position",ascendingSort:!1,chosenCourse:"",filterPreferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}),computed:{resultsWithAgeClassSplit:function(){return this.rawResults.map(e=>{return e.ageClass&&(e.gender=e.ageClass[0],e.age=parseInt(e.ageClass.slice(1))),e})},sortedResults:function(){return this.sort(this.resultsWithAgeClassSplit,this.sortedBy,this.ascendingSort)},filteredResults:function(){return this.sortedResults.filter(e=>e.course===this.chosenCourse).filter(e=>e.name.match(new RegExp(this.filterPreferences.name,"i"))).filter(e=>e.club.match(new RegExp(this.filterPreferences.club,"i"))).filter(e=>{return 100===this.filterPreferences.maxAge&&0===this.filterPreferences.minAge||this.filterPreferences.minAge<=e.age&&e.age<=this.filterPreferences.maxAge}).filter(e=>this.filterPreferences.male&&this.filterPreferences.female||this.filterPreferences.male&&"M"===e.gender||this.filterPreferences.female&&"W"===e.gender)},coursesInResults:function(){var e=[...new Set(this.rawResults.map(e=>e.course))];return this.setChosenCourse(e),e}},watch:{$route:function(){var e=d((function*(){this.rawResults=[],yield this.getResults(),yield this.getEvent()}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=d((function*(){this.getResults(),this.getEvent()}));function t(){return e.apply(this,arguments)}return t}(),methods:{getResults:function(){return i.a.get("/api/events/"+this.$route.params.event+"/results").then(e=>{e.data.length>0?this.rawResults=e.data:this.found=!1}).catch(()=>{this.found=!1})},getEvent:function(){return i.a.get("/api/events/"+this.$route.params.event).then(e=>{this.event=e.data,this.eventFound=e.data}).catch(()=>{this.eventFound=!1})},sort:function(e,t){var n,a=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return n=(e,n)=>{return e[t]===n[t]?0:null===e[t]||void 0===e[t]||""===e[t]?-1:null===n[t]||void 0===n[t]||""===n[t]?1:e[t]<n[t]?1:-1},a?e.sort(n):e.sort(n).reverse()},sortBy:function(e){e!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=e},filterChanged:function(e){this.filterPreferences.name=e.name,this.filterPreferences.club=e.club,""===e.minAge?this.filterPreferences.minAge=0:this.filterPreferences.minAge=e.minAge,""===e.maxAge?this.filterPreferences.maxAge=100:this.filterPreferences.maxAge=e.maxAge,this.filterPreferences.male=e.male,this.filterPreferences.female=e.female},setChosenCourse:function(e){this.chosenCourse=e[0]},twoDigits:function(e){return e.toString().length<2?"0"+e.toString():e},elapsedTime:function(e){if("number"!==typeof e)return e;if(0===e)return"";var t=Math.floor(e/60),n=Math.abs(e%60);return this.twoDigits(t)+":"+this.twoDigits(n)}}},p=f,m=(n("8529"),n("2877")),v=Object(m["a"])(p,a,s,!1,null,"673359d0",null);t["default"]=v.exports},8529:function(e,t,n){"use strict";var a=n("3cfe"),s=n.n(a);s.a},9703:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{title:"Munro - Not Found",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("div",{staticClass:"card mt-5"},[n("h1",{staticClass:"text-main text-3xl font-heading my-2"},[e._v("Sorry We Can't Find What You Are Looking For")]),n("p",[e._v("Please check the URL and Try Again")]),n("div",[n("button",{staticClass:"button inline-block",on:{click:function(t){return e.$router.go(-1)}}},[e._v("Go Back")]),n("router-link",{staticClass:"button inline-block",attrs:{to:"/"}},[e._v("Return Home")])],1)])],1)},s=[],r=n("2877"),i={},l=Object(r["a"])(i,a,s,!1,null,null,null);t["default"]=l.exports},a781:function(e,t,n){"use strict";var a=n("6327"),s=n.n(a);s.a},bb25:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"up-down-arrow"},[n("svg",{class:{active:e.active&&!e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{active:e.active&&e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},s=[],r={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},i=r,l=(n("10df"),n("2877")),o=Object(l["a"])(i,a,s,!1,null,"72500ea2",null);t["a"]=o.exports},c824:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input mt-3"},[n("label",{staticClass:"text-md select-none font-heading text-main"},[e._v(" "+e._s(e.label)+" "),n("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},s=[],r={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},i=r,l=(n("6d3d"),n("2877")),o=Object(l["a"])(i,a,s,!1,null,"9c7172ae",null);t["a"]=o.exports},d610:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative appearance-none"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.value,expression:"value",modifiers:{number:!0}}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none appearance-none",attrs:{min:e.min,max:e.max,type:"number"},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=e._n(t.target.value))},function(t){return e.$emit("input",t.target.value)}],blur:function(t){return e.$forceUpdate()}}})])},s=[],r={name:"NumberInput",props:{value:{type:Number,default:0},label:{type:String,default:""},min:{type:Number,default:0},max:{type:Number,default:100}}},i=r,l=n("2877"),o=Object(l["a"])(i,a,s,!1,null,null,null);t["a"]=o.exports},e7a6:function(e,t,n){}}]);
//# sourceMappingURL=chunk-767a03f4.17fd35c8.js.map