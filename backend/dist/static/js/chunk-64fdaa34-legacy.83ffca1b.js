(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64fdaa34"],{"02c0":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dropdown-input relative top--4"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),a("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:e.toggle}},[a("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),a("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),a("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),a("transition",{attrs:{name:"open"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return a("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(a){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},s=[],r={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},o=r,i=(a("6a22"),a("2877")),u=Object(i["a"])(o,n,s,!1,null,"042b4bbc",null);t["a"]=u.exports},"106c":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[e.create?a("vue-headful",{attrs:{title:"Munro - Create Competitor",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):a("vue-headful",{attrs:{title:"Munro - Edit Competitor",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),e.notFound?e._e():a("div",[e.create?a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v("Create Competitor")]):e._e(),e.create?e._e():a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v("Edit Competitor")]),a("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[a("text-input",{attrs:{label:"Name:"},model:{value:e.name,callback:function(t){e.name="string"===typeof t?t.trim():t},expression:"name"}}),a("text-input",{attrs:{label:"Club:"},model:{value:e.club,callback:function(t){e.club="string"===typeof t?t.trim():t},expression:"club"}}),a("text-input",{attrs:{label:"Age Class:"},model:{value:e.ageClass,callback:function(t){e.ageClass="string"===typeof t?t.trim():t},expression:"ageClass"}}),a("dropdown-input",{attrs:{list:e.leagues.map((function(e){return e.name})),label:"League:"},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),a("dropdown-input",{attrs:{list:e.coursesInLeague,label:"Course:"},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}}),e.create?a("button",{staticClass:"button-lg"},[e._v("Create Competitor")]):e._e(),e.create?e._e():a("button",{staticClass:"button-lg"},[e._v("Update Competitor")])],1)]),e.notFound?a("not-found"):e._e()],1)},s=[],r=a("bc3a"),o=a.n(r),i=a("02c0"),u=a("446e"),l=function(){return a.e("chunk-2d0e5e97").then(a.bind(null,"9703"))},c={components:{NotFound:l,DropdownInput:i["a"],TextInput:u["a"]},data:function(){return{id:"",notFound:!1,create:!0,leagues:[],name:"",club:"",ageClass:"",league:"",course:""}},computed:{coursesInLeague:function(){var e=this,t=this.leagues.filter((function(t){return t.name===e.league}));return t.length>0?t[0].courses:[]}},mounted:function(){this.getLeagues(),this.$route.path.includes("edit")&&(this.create=!1,this.getCompetitorDetails())},methods:{submit:function(){this.create?this.createCompetitor():this.updateCompetitor()},getCompetitorDetails:function(){var e=this;return o.a.get("/api/competitors/"+this.$route.params.id).then((function(t){t.data?(e.id=e.$route.params.id,e.name=t.data.name,e.club=t.data.club,e.ageClass=t.data.ageClass,e.league=t.data.league,e.course=t.data.course):e.notFound=!0})).catch((function(){return e.$messages.addMessage("Problem Getting Competitor Details")}))},getLeagues:function(){var e=this;return o.a.get("/api/leagues").then((function(t){e.leagues=t.data})).catch((function(){return e.$messages.addMessage("Problem Fetching List of Leagues")}))},validateForm:function(){return""!==this.name&&""!==this.league&&""!==this.course},createCompetitor:function(){var e=this;if(this.validateForm())return o.a.post("/api/competitors",{name:this.name,club:this.club,ageClass:this.ageClass,league:this.league,course:this.course}).then((function(t){return e.returnToCompetitorsPage(t)})).catch((function(){return e.$messages.addMessage("Error: Problem Creating Competitor - Please Try Again")}));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},updateCompetitor:function(){var e=this;if(this.validateForm())return o.a.put("/api/competitors/"+this.id,{id:this.id,name:this.name,club:this.club,ageClass:this.ageClass,league:this.league,course:this.course}).then((function(t){return e.returnToCompetitorsPage(t)})).catch((function(t){return e.$messages.addMessage(t.response.data.message)}));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},returnToCompetitorsPage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/competitors")}}},d=c,p=a("2877"),m=Object(p["a"])(d,n,s,!1,null,null,null);t["default"]=m.exports},"2ff4":function(e,t,a){},"446e":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-input top--4 relative"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),"checkbox"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){var a=e.value,n=t.target,s=!!n.checked;if(Array.isArray(a)){var r=null,o=e._i(a,r);n.checked?o<0&&(e.value=a.concat([r])):o>-1&&(e.value=a.slice(0,o).concat(a.slice(o+1)))}else e.value=s}}}):"radio"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"radio"},domProps:{checked:e._q(e.value,null)},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){e.value=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=t.target.value)},function(t){return e.$emit("input",t.target.value)}]}})])},s=[],r={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},o=r,i=a("2877"),u=Object(i["a"])(o,n,s,!1,null,null,null);t["a"]=u.exports},"6a22":function(e,t,a){"use strict";var n=a("2ff4"),s=a.n(n);s.a}}]);
//# sourceMappingURL=chunk-64fdaa34-legacy.83ffca1b.js.map