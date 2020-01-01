(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d434389"],{"02c0":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-input relative top--4"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),n("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:e.toggle}},[n("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),n("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return n("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(n){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},i=[],a={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},r=a,o=(n("6a22"),n("2877")),l=Object(o["a"])(r,s,i,!1,null,"042b4bbc",null);t["a"]=l.exports},"2ff4":function(e,t,n){},"6a22":function(e,t,n){"use strict";var s=n("2ff4"),i=n.n(s);i.a},"761e":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{title:"Munro - Transfer Results",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v("Transfer Result")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.transfer(t)}}},[n("dropdown-input",{attrs:{list:e.leagues.map((function(e){return e.name})),"include-blank":!0,label:"League:"},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),n("dropdown-input",{attrs:{list:e.eventsInLeague.map((function(e){return e.name+" - "+e.date})),"include-blank":!0,label:"Event:"},model:{value:e.event,callback:function(t){e.event=t},expression:"event"}}),n("dropdown-input",{attrs:{list:e.coursesInLeague,"include-blank":!0,label:"Course"},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}}),n("dropdown-input",{attrs:{list:e.resultsForEvent.map((function(t){return t.position+" - "+e.elapsedTime(t.time)+" ("+t.name+")"})),"include-blank":!0,label:"Result:"},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}}),n("dropdown-input",{attrs:{list:e.competitorsForLeague.map(e.competitorTransformForSelect),"include-blank":!0,label:"Competitor:"},model:{value:e.competitor,callback:function(t){e.competitor=t},expression:"competitor"}}),n("button",{staticClass:"button-lg"},[e._v("Transfer Result")])],1)],1)},i=[],a=n("bc3a"),r=n.n(a),o=n("02c0");function l(e,t,n,s,i,a,r){try{var o=e[a](r),l=o.value}catch(u){return void n(u)}o.done?t(l):Promise.resolve(l).then(s,i)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(s,i){var a=e.apply(t,n);function r(e){l(a,s,i,r,o,"next",e)}function o(e){l(a,s,i,r,o,"throw",e)}r(void 0)}))}}var c={components:{DropdownInput:o["a"]},data:()=>({competitors:[],leagues:[],events:[],results:[],league:"",event:"",course:"",competitor:"",result:""}),computed:{competitorsForLeague:function(){var e=this.competitors.filter(e=>e.league===this.league&&e.course===this.course);return e.sort((e,t)=>e.name>t.name)},coursesInLeague:function(){var e=this.leagues.filter(e=>e.name===this.league);return e.length>0?e[0].courses:[]},eventsInLeague:function(){return this.events.filter(e=>e.league===this.league)},resultsForEvent:function(){var e="",t=this.events.filter(e=>e.name===this.event.split(" - ")[0]&&e.date===this.event.split(" - ")[1]);return t.length>0&&(e=t[0].id),this.results.filter(t=>t.event===e&&t.course===this.course).sort((e,t)=>{return parseInt(e.position)===parseInt(t.position)?0:null===e.position||void 0===e.position?1:null===t.position||void 0===t.position?-1:parseInt(e.position)>parseInt(t.position)?1:-1})}},created:function(){var e=u((function*(){yield this.getCompetitors(),yield this.getLeagues(),yield this.getEvents(),yield this.getResults()}));function t(){return e.apply(this,arguments)}return t}(),methods:{getCompetitors:function(){return r.a.get("/api/competitors").then(e=>{this.competitors=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Competitors"))},getLeagues:function(){return r.a.get("/api/leagues").then(e=>{this.leagues=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Leagues"))},getEvents:function(){return r.a.get("/api/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Events"))},getResults:function(){return r.a.get("/api/results").then(e=>{this.results=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching Results"))},validateForm:function(){return""!==this.event&&""!==this.course&&""!==this.result},twoDigits:function(e){return e.toString().length<2?"0"+e.toString():e},elapsedTime:function(e){var t=Math.floor(e/60),n=Math.abs(e%60);return this.twoDigits(t)+":"+this.twoDigits(n)},elapsedTimeToSeconds:function(e){return 60*parseInt(e.split(":")[0])+parseInt(e.split(":")[1])},competitorTransformForSelect:function(e){return e.club&&e.ageClass?e.name+" ("+e.ageClass+", "+e.club+") ["+e.id+"]":e.club?e.name+" ("+e.club+") ["+e.id+"]":e.ageClass?e.name+" ("+e.ageClass+") ["+e.id+"]":e.name+" ["+e.id+"]"},transfer:function(){if(this.validateForm()){var e="",t=this.events.find(e=>e.name===this.event.split(" - ")[0]&&e.date===this.event.split(" - ")[1]);t&&(e=t.id);var n=this.competitor.replace(/.*\[|\]/g,""),s=this.results.find(t=>t.course===this.course&&t.event===e&&t.time===this.elapsedTimeToSeconds(this.result.match(/-.*\(/)[0].slice(2,-2)));return r.a.post("/api/results/transfer",{competitor:n,result:s.id}).then(e=>this.returnToCompetitorsPage(e)).catch(e=>this.$messages.addMessage(e.response.data.message))}this.$messages.addMessage("The Competitors Selected are the Same")},returnToCompetitorsPage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/competitors")}}},p=c,d=n("2877"),h=Object(d["a"])(p,s,i,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-7d434389.c36aac3c.js.map