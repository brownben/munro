(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-439aa803"],{"02c0":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-input relative",class:{"top--4":e.shift}},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),n("div",{staticClass:"visible w-full border border-main rounded-shape px-4 py-2 outline-none",on:{click:e.toggle}},[n("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),n("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return n("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(n){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},s=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]},shift:{type:Boolean,default:!0}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},i=o,r=(n("0886"),n("2877")),l=Object(r["a"])(i,a,s,!1,null,null,null);t["a"]=l.exports},"0886":function(e,t,n){"use strict";var a=n("27fc"),s=n.n(a);s.a},"27fc":function(e,t,n){},3775:function(e,t,n){},c538:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Manual Points",description:""}}),n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Manual Points ")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.addResult(t)}}},[n("dropdown-input",{attrs:{list:e.leagues.map((function(e){return e.name})),"include-blank":!0,label:"League:"},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),n("dropdown-input",{attrs:{list:e.eventsInLeague.map((function(e){return e.name+" - "+e.date})),"include-blank":!0,label:"Event:"},model:{value:e.event,callback:function(t){e.event=t},expression:"event"}}),n("dropdown-input",{attrs:{list:e.coursesInLeague,"include-blank":!0,label:"Course"},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}}),n("dropdown-input",{attrs:{list:e.competitorsForLeague.map(e.competitorTransformForSelect),"include-blank":!0,label:"Competitor:"},model:{value:e.competitor,callback:function(t){e.competitor=t},expression:"competitor"}}),n("number-input",{attrs:{label:"Points:",max:1e4},model:{value:e.points,callback:function(t){e.points=e._n(t)},expression:"points"}}),n("button",{staticClass:"button-lg"},[e._v("Add Result")])],1)],1)},s=[],o=n("bc3a"),i=n.n(o),r=n("02c0"),l=n("d610"),u={components:{DropdownInput:r["a"],NumberInput:l["a"]},data:()=>({competitors:[],leagues:[],events:[],results:[],league:"",event:"",course:"",competitor:"",points:0}),computed:{competitorsForLeague:function(){var e=this.competitors.filter(e=>e.league===this.league&&e.course===this.course);return e.sort((e,t)=>e.name>t.name)},coursesInLeague:function(){var e=this.leagues.filter(e=>e.name===this.league);return e.length>0?e[0].courses:[]},eventsInLeague:function(){return this.events.filter(e=>e.league===this.league)}},created:function(){this.getLeagues(),this.getCompetitors(),this.getEvents()},methods:{getCompetitors:function(){return i.a.get("/api/competitors").then(e=>{this.competitors=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Competitors"))},getLeagues:function(){return i.a.get("/api/leagues").then(e=>{this.leagues=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Leagues"))},getEvents:function(){return i.a.get("/api/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Events"))},validateForm:function(){return""!==this.event&&""!==this.course&&""!==this.competitor},twoDigits:function(e){return e.toString().length<2?"0".concat(e.toString()):e},elapsedTime:function(e){var t=Math.floor(e/60),n=Math.abs(e%60);return"".concat(this.twoDigits(t),":").concat(this.twoDigits(n))},elapsedTimeToSeconds:function(e){return 60*parseInt(e.split(":")[0],10)+parseInt(e.split(":")[1],10)},competitorTransformForSelect:function(e){return e.club&&e.ageClass?"".concat(e.name," (").concat(e.ageClass,", ").concat(e.club,") [").concat(e.id,"]"):e.club?"".concat(e.name," (").concat(e.club,") [").concat(e.id,"]"):e.ageClass?"".concat(e.name," (").concat(e.ageClass,") [").concat(e.id,"]"):"".concat(e.name," [").concat(e.id,"]")},addResult:function(){if(this.validateForm()){var e=this.events.find(e=>e.name===this.event.split(" - ")[0]&&e.date===this.event.split(" - ")[1]);if(e){var t=e.id,n=this.competitor.replace(/.*\[|\]/g,"");return i.a.post("/api/results/manual",{competitor:n,points:this.points,event:t}).then(e=>this.returnToCompetitorsPage(e)).catch(e=>this.$messages.addMessage(e.response.data.message))}this.$messages.addMessage("No Event Selected")}else this.$messages.addMessage("Please Select a Competitor and an Event")},returnToCompetitorsPage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/competitors")}}},c=u,p=n("2877"),m=Object(p["a"])(c,a,s,!1,null,null,null);t["default"]=m.exports},d610:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative appearance-none"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),n("input",{staticClass:"w-full border border-main rounded-shape px-4 py-2 text-body outline-none appearance-none",attrs:{min:e.min,max:e.max,type:"number"},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})])},s=[],o={name:"NumberInput",props:{value:{type:Number,default:0},label:{type:String,default:""},min:{type:Number,default:0},max:{type:Number,default:100}}},i=o,r=(n("e86a"),n("2877")),l=Object(r["a"])(i,a,s,!1,null,null,null);t["a"]=l.exports},e86a:function(e,t,n){"use strict";var a=n("3775"),s=n.n(a);s.a}}]);
//# sourceMappingURL=chunk-439aa803.93e99969.js.map