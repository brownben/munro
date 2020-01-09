(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-634643c9"],{"02c0":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dropdown-input relative top--4"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[t._v(t._s(t.label))]),a("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:t.toggle}},[a("p",{staticClass:"leading-normal h-6 truncate"},[t._v(t._s(t.currentValue))]),a("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),a("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),a("transition",{attrs:{name:"open"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},t._l(t.list,(function(e){return a("p",{key:e,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(a){return t.changeSelection(e)}}},[t._v(" "+t._s(e)+" ")])})),0)])],1)},s=[],i={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},r=i,o=(a("0886"),a("2877")),l=Object(o["a"])(r,n,s,!1,null,null,null);e["a"]=l.exports},"0886":function(t,e,a){"use strict";var n=a("27fc"),s=a.n(n);s.a},"27fc":function(t,e,a){},"40f3":function(t,e,a){"use strict";var n=a("aa8d"),s=a.n(n);s.a},"446e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-input top--4 relative"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[t._v(t._s(t.label))]),a("input",{staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:t.type},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}})])},s=[],i={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},r=i,o=(a("40f3"),a("2877")),l=Object(o["a"])(r,n,s,!1,null,null,null);e["a"]=l.exports},aa8d:function(t,e,a){},cc28:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"view"},[t.create?a("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Create Event",description:""}}):a("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Edit Event",description:""}}),t.notFound?t._e():a("div",[t.create?a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[t._v(" Create Event ")]):t._e(),t.create?t._e():a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[t._v(" Edit Event ")]),a("form",{on:{submit:function(e){return e.preventDefault(),t.submit(e)}}},[a("text-input",{attrs:{label:"Name:"},model:{value:t.name,callback:function(e){t.name="string"===typeof e?e.trim():e},expression:"name"}}),a("text-input",{attrs:{label:"Date: (YYYY-MM-DD)"},model:{value:t.date,callback:function(e){t.date="string"===typeof e?e.trim():e},expression:"date"}}),a("text-input",{attrs:{label:"Club/ Organiser:"},model:{value:t.organiser,callback:function(e){t.organiser="string"===typeof e?e.trim():e},expression:"organiser"}}),a("text-input",{attrs:{label:"Website: (URL)",type:"url"},model:{value:t.website,callback:function(e){t.website="string"===typeof e?e.trim():e},expression:"website"}}),a("text-input",{attrs:{label:"Results: (URL)",type:"url"},model:{value:t.results,callback:function(e){t.results="string"===typeof e?e.trim():e},expression:"results"}}),a("text-input",{attrs:{label:"Winsplits: (URL)",type:"url"},model:{value:t.winsplits,callback:function(e){t.winsplits="string"===typeof e?e.trim():e},expression:"winsplits"}}),a("text-input",{attrs:{label:"Routegadget: (URL)",type:"url"},model:{value:t.routegadget,callback:function(e){t.routegadget="string"===typeof e?e.trim():e},expression:"routegadget"}}),a("dropdown-input",{attrs:{list:t.leagues.map((function(t){return t.name})),label:"League:"},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}}),a("text-input",{attrs:{label:"More Information:"},model:{value:t.moreInformation,callback:function(e){t.moreInformation="string"===typeof e?e.trim():e},expression:"moreInformation"}}),t.create?a("button",{staticClass:"button-lg"},[t._v("Create Event")]):t._e(),t.create?t._e():a("button",{staticClass:"button-lg"},[t._v("Update Event")])],1)]),t.notFound?a("not-found"):t._e()],1)},s=[],i=a("bc3a"),r=a.n(i),o=a("02c0"),l=a("446e"),u=()=>a.e("chunk-2d0e5e97").then(a.bind(null,"9703")),d={components:{NotFound:u,DropdownInput:o["a"],TextInput:l["a"]},data:function(){return{id:"",notFound:!1,create:!0,leagues:[],name:"",date:"",resultUploaded:!1,organiser:"",moreInformation:"",website:"",results:"",winsplits:"",routegadget:"",league:this.$route.params.league}},mounted:function(){this.getLeagues(),this.$route.path.includes("edit")&&(this.create=!1,this.getEventDetails())},methods:{submit:function(){this.create?this.createEvent():this.updateEvent()},getEventDetails:function(){return r.a.get("/api/events/".concat(this.$route.params.id)).then(t=>{t.data?(this.id=this.$route.params.id,this.name=t.data.name,this.date=t.data.date,this.resultUploaded=t.data.resultUploaded,this.organiser=t.data.organiser,this.moreInformation=t.data.moreInformation,this.website=t.data.website,this.results=t.data.results,this.winsplits=t.data.winsplits,this.routegadget=t.data.routegadget,this.league=t.data.league):this.notFound=!0}).catch(()=>this.$messages.addMessage("Problem Getting Event Details"))},getLeagues:function(){return r.a.get("/api/leagues").then(t=>{this.leagues=t.data}).catch(()=>this.$messages.addMessage("Problem Fetching List of Leagues"))},validateForm:function(){return""===this.name||""===this.league?(this.$messages.addMessage("Please Ensure Name and League Fields are not Blank"),!1):!this.name.includes("/")&&!this.name.includes("\\")||(this.$messages.addMessage("Please Ensure Name doesn't Include any Slashes"),!1)},createEvent:function(){if(this.validateForm())return r.a.post("/api/events",{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(t=>this.returnToLeaguePage(t)).catch(()=>this.$messages.addMessage("Error: Problem Creating Event - Please Try Again"))},updateEvent:function(){if(this.validateForm())return r.a.put("/api/events/".concat(this.id),{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(t=>this.returnToLeaguePage(t)).catch(t=>this.$messages.addMessage(t.response.data.message))},returnToLeaguePage:function(t){this.$messages.addMessage(t.data.message),this.$router.push("/leagues/".concat(this.league))}}},c=d,p=a("2877"),g=Object(p["a"])(c,n,s,!1,null,null,null);e["default"]=g.exports}}]);
//# sourceMappingURL=chunk-634643c9.e900363e.js.map