(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32b690d3"],{"02c0":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dropdown-input relative top--4"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),a("div",{staticClass:"visible w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 outline-none",on:{click:e.toggle}},[a("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),a("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[a("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),a("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),a("transition",{attrs:{name:"open"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return a("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(a){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},i=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},s=o,r=(a("6a22"),a("2877")),u=Object(r["a"])(s,n,i,!1,null,"042b4bbc",null);t["a"]=u.exports},"299d":function(e,t,a){"use strict";var n=a("5b0b"),i=a.n(n);i.a},"2ff4":function(e,t,a){},"446e":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-input top--4 relative"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),"checkbox"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){var a=e.value,n=t.target,i=!!n.checked;if(Array.isArray(a)){var o=null,s=e._i(a,o);n.checked?s<0&&(e.value=a.concat([o])):s>-1&&(e.value=a.slice(0,s).concat(a.slice(s+1)))}else e.value=i}}}):"radio"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"radio"},domProps:{checked:e._q(e.value,null)},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){e.value=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=t.target.value)},function(t){return e.$emit("input",t.target.value)}]}})])},i=[],o={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},s=o,r=a("2877"),u=Object(r["a"])(s,n,i,!1,null,null,null);t["a"]=u.exports},"44ee":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[e.create?a("vue-headful",{attrs:{title:"Munro - Create League",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):a("vue-headful",{attrs:{title:"Munro - Edit League",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),e.notFound?e._e():a("div",[e.create?a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v("Create League")]):e._e(),e.create?e._e():a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v("Edit League")]),a("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[a("text-input",{attrs:{label:"Name:"},model:{value:e.name,callback:function(t){e.name="string"===typeof t?t.trim():t},expression:"name"}}),a("text-input",{attrs:{label:"Year:"},model:{value:e.year,callback:function(t){e.year="string"===typeof t?t.trim():t},expression:"year"}}),a("text-input",{attrs:{label:"Description:"},model:{value:e.info,callback:function(t){e.info="string"===typeof t?t.trim():t},expression:"info"}}),a("text-input",{attrs:{label:"Website: (URL)",type:"url"},model:{value:e.website,callback:function(t){e.website="string"===typeof t?t.trim():t},expression:"website"}}),a("text-input",{attrs:{label:"Coordinator:"},model:{value:e.coordinator,callback:function(t){e.coordinator="string"===typeof t?t.trim():t},expression:"coordinator"}}),a("dropdown-input",{attrs:{list:["Position Based (100 Max)","Position Based (50 Max)","Position Based (99 Max)","Position Based (99 Max, Reduced in a Draw)","Position Based (100 Max, Double Points)","Position Based (50 Max, Double Points)","Relative to Average Time (1000 Average)","Relative to Average Time (100 Average)"],label:"Scoring Method:"},model:{value:e.scoringMethod,callback:function(t){e.scoringMethod=t},expression:"scoringMethod"}}),a("number-input",{attrs:{min:1,label:"Number of Events to Count:"},model:{value:e.numberOfCountingEvents,callback:function(t){e.numberOfCountingEvents=e._n(t)},expression:"numberOfCountingEvents"}}),a("text-input",{attrs:{label:"Courses: (Comma Separated)"},model:{value:e.courses,callback:function(t){e.courses="string"===typeof t?t.trim():t},expression:"courses"}}),a("checkbox-input",{staticClass:"text-left mb-5",attrs:{label:"Dynamic Event Results:"},model:{value:e.dynamicResults,callback:function(t){e.dynamicResults=t},expression:"dynamicResults"}}),e.create?a("button",{staticClass:"button-lg"},[e._v("Create League")]):e._e(),e.create?e._e():a("button",{staticClass:"button-lg"},[e._v("Update League")])],1)]),e.notFound?a("not-found"):e._e()],1)},i=[],o=a("bc3a"),s=a.n(o),r=a("02c0"),u=a("446e"),l=a("d610"),c=a("c824"),d=()=>a.e("chunk-2d0e5e97").then(a.bind(null,"9703")),m={components:{NotFound:d,DropdownInput:r["a"],TextInput:u["a"],NumberInput:l["a"],CheckboxInput:c["a"]},data:function(){return{notFound:!1,create:!0,oldName:"",name:"",year:"",website:"",coordinator:"",scoringMethod:"",numberOfCountingEvents:1,courses:"",info:"",numberOfEvents:0,dynamicResults:!0}},mounted:function(){this.$route.path.includes("edit")&&(this.create=!1,this.getLeagueDetails())},methods:{validateForm:function(){return""===this.name||""===this.scoringMethod?(this.$messages.addMessage("Please Ensure Name and Scoring Method Fields are not Blank"),!1):!this.name.includes("/")&&!this.name.includes("\\")||(this.$messages.addMessage("Please Ensure Name doesn't Include any Slashes"),!1)},returnToLeaguePage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/leagues/"+this.name)},scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":"positionDouble"===e?"Position Based (100 Max, Double Points)":"position50Double"===e?"Position Based (50 Max, Double Points)":"timeAverage"===e?"Relative to Average Time (1000 Average)":"timeAverage100"===e?"Relative to Average Time (100 Average)":""},scoringMethodFullToShorthand:e=>{return"Position Based (100 Max)"===e?"position":"Position Based (50 Max)"===e?"position50":"Position Based (99 Max)"===e?"position99":"Position Based (99 Max - Reduced in a Draw)"===e?"position99average":"Position Based (100 Max, Double Points)"===e?"positionDouble":"Position Based (50 Max, Double Points)"===e?"position50Double":"Relative to Average Time (1000 Average)"===e?"timeAverage":"Relative to Average Time (100 Average)"===e?"timeAverage100":""},getLeagueDetails:function(){return s.a.get("/api/leagues/"+this.$route.params.name).then(e=>{e.data?(this.oldName=e.data.name,this.name=e.data.name,this.year=e.data.year,this.website=e.data.website,this.coordinator=e.data.coordinator,this.scoringMethod=this.scoringMethodShorthandToFull(e.data.scoringMethod),this.numberOfCountingEvents=e.data.numberOfCountingEvents,e.data.courses&&(this.courses=e.data.courses.join(",")),this.info=e.data.description,this.dynamicResults=e.data.dynamicEventResults):this.notFound=!0}).catch(()=>this.$messages.addMessage("Problem Fetching League Details"))},submit:function(){this.create?this.createLeague():this.updateLeague()},createLeague:function(){if(this.validateForm())return s.a.post("/api/leagues",{name:this.name,year:this.year,website:this.website,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info,dynamicEventResults:this.dynamicResults}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Creating League - Please Try Again"))},updateLeague:function(){if(this.validateForm())return s.a.put("/api/leagues/"+this.oldName,{oldName:this.oldName,name:this.name,year:this.year,website:this.website,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info,dynamicEventResults:this.dynamicResults}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Updating League - Please Try Again"))}}},p=m,h=(a("299d"),a("2877")),g=Object(h["a"])(p,n,i,!1,null,"cc85ec0a",null);t["default"]=g.exports},"5b0b":function(e,t,a){},"6a22":function(e,t,a){"use strict";var n=a("2ff4"),i=a.n(n);i.a},"6d3d":function(e,t,a){"use strict";var n=a("e7a6"),i=a.n(n);i.a},c824:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"checkbox-input mt-3"},[a("label",{staticClass:"text-md select-none font-heading text-main"},[e._v(" "+e._s(e.label)+" "),a("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),a("span")])])},i=[],o={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},s=o,r=(a("6d3d"),a("2877")),u=Object(r["a"])(s,n,i,!1,null,"9c7172ae",null);t["a"]=u.exports},d610:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-input top--4 relative appearance-none"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),a("input",{directives:[{name:"model",rawName:"v-model.number",value:e.value,expression:"value",modifiers:{number:!0}}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none appearance-none",attrs:{min:e.min,max:e.max,type:"number"},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=e._n(t.target.value))},function(t){return e.$emit("input",t.target.value)}],blur:function(t){return e.$forceUpdate()}}})])},i=[],o={name:"NumberInput",props:{value:{type:Number,default:0},label:{type:String,default:""},min:{type:Number,default:0},max:{type:Number,default:100}}},s=o,r=a("2877"),u=Object(r["a"])(s,n,i,!1,null,null,null);t["a"]=u.exports},e7a6:function(e,t,a){}}]);
//# sourceMappingURL=chunk-32b690d3.5733a3c1.js.map