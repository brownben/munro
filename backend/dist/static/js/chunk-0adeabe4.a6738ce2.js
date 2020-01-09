(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0adeabe4"],{"02c0":function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dropdown-input relative top--4"},[s("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),s("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:e.toggle}},[s("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),s("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[s("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),s("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),s("transition",{attrs:{name:"open"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return s("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(s){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},a=[],i={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},o=i,r=(s("0886"),s("2877")),l=Object(r["a"])(o,n,a,!1,null,null,null);t["a"]=l.exports},"0886":function(e,t,s){"use strict";var n=s("27fc"),a=s.n(n);a.a},"27fc":function(e,t,s){},"761e":function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"view"},[s("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Transfer Results",description:""}}),s("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Transfer Result ")]),s("form",{on:{submit:function(t){return t.preventDefault(),e.transfer(t)}}},[s("dropdown-input",{attrs:{list:e.leagues.map((function(e){return e.name})),"include-blank":!0,label:"League:"},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),s("dropdown-input",{attrs:{list:e.eventsInLeague.map((function(e){return e.name+" - "+e.date})),"include-blank":!0,label:"Event:"},model:{value:e.event,callback:function(t){e.event=t},expression:"event"}}),s("dropdown-input",{attrs:{list:e.coursesInLeague,"include-blank":!0,label:"Course"},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}}),s("dropdown-input",{attrs:{list:e.resultsForEvent.map((function(t){return t.position+" - "+e.elapsedTime(t.time)+" ("+t.name+")"})),"include-blank":!0,label:"Result:"},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}}),s("dropdown-input",{attrs:{list:e.competitorsForLeague.map(e.competitorTransformForSelect),"include-blank":!0,label:"Competitor:"},model:{value:e.competitor,callback:function(t){e.competitor=t},expression:"competitor"}}),s("button",{staticClass:"button-lg"},[e._v("Transfer Result")])],1)],1)},a=[],i=s("bc3a"),o=s.n(i),r=s("02c0"),l={components:{DropdownInput:r["a"]},data:()=>({competitors:[],leagues:[],events:[],results:[],league:"",event:"",course:"",competitor:"",result:""}),computed:{competitorsForLeague:function(){var e=this.competitors.filter(e=>e.league===this.league&&e.course===this.course);return e.sort((e,t)=>e.name>t.name)},coursesInLeague:function(){var e=this.leagues.filter(e=>e.name===this.league);return e.length>0?e[0].courses:[]},eventsInLeague:function(){return this.events.filter(e=>e.league===this.league)},resultsForEvent:function(){var e="",t=this.events.filter(e=>e.name===this.event.split(" - ")[0]&&e.date===this.event.split(" - ")[1]);return t.length>0&&(e=t[0].id),this.results.filter(t=>t.event===e&&t.course===this.course).sort((e,t)=>{return parseInt(e.position,10)===parseInt(t.position,10)?0:null===e.position||void 0===e.position?1:null===t.position||void 0===t.position?-1:parseInt(e.position,10)>parseInt(t.position,10)?1:-1})}},created:function(){this.getCompetitors(),this.getLeagues(),this.getEvents(),this.getResults()},methods:{getCompetitors:function(){return o.a.get("/api/competitors").then(e=>{this.competitors=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Competitors"))},getLeagues:function(){return o.a.get("/api/leagues").then(e=>{this.leagues=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Leagues"))},getEvents:function(){return o.a.get("/api/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Events"))},getResults:function(){return o.a.get("/api/results").then(e=>{this.results=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Results"))},validateForm:function(){return""!==this.event&&""!==this.course&&""!==this.result&&""!==this.competitor},twoDigits:function(e){return e.toString().length<2?"0".concat(e.toString()):e},elapsedTime:function(e){var t=Math.floor(e/60),s=Math.abs(e%60);return"".concat(this.twoDigits(t),":").concat(this.twoDigits(s))},elapsedTimeToSeconds:function(e){return 60*parseInt(e.split(":")[0],10)+parseInt(e.split(":")[1],10)},competitorTransformForSelect:function(e){return e.club&&e.ageClass?"".concat(e.name," (").concat(e.ageClass,", ").concat(e.club,") [").concat(e.id,"]"):e.club?"".concat(e.name," (").concat(e.club,") [").concat(e.id,"]"):e.ageClass?"".concat(e.name," (").concat(e.ageClass,") [").concat(e.id,"]"):"".concat(e.name," [").concat(e.id,"]")},transfer:function(){if(this.validateForm()){var e="",t=this.events.find(e=>e.name===this.event.split(" - ")[0]&&e.date===this.event.split(" - ")[1]);t&&(e=t.id);var s=this.competitor.replace(/.*\[|\]/g,""),n=this.results.find(t=>t.course===this.course&&t.event===e&&t.time===this.elapsedTimeToSeconds(this.result.match(/-.*\(/)[0].slice(2,-2)));return o.a.post("/api/results/transfer",{competitor:s,result:n.id}).then(e=>this.returnToCompetitorsPage(e)).catch(e=>this.$messages.addMessage(e.response.data.message))}this.$messages.addMessage("Please Select a Result and a Competitor")},returnToCompetitorsPage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/competitors")}}},u=l,c=s("2877"),p=Object(c["a"])(u,n,a,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=chunk-0adeabe4.a6738ce2.js.map