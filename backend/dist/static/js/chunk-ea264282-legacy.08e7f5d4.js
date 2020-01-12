(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ea264282"],{"02c0":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-input relative",class:{"top--4":e.shift}},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3"},[e._v(e._s(e.label))]),n("div",{staticClass:"visible w-full border border-main rounded-shape px-4 py-2 outline-none",on:{click:e.toggle}},[n("p",{staticClass:"leading-normal h-6 truncate"},[e._v(e._s(e.currentValue))]),n("svg",{staticClass:"h-8 text-main float-right fill-current mr--3 mt--68/10",attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown absolute text-body z-40 bg-white text-center w-full border border-main select-none border-t-0 mb-2"},e._l(e.list,(function(t){return n("p",{key:t,staticClass:"select-none leading-normal text-center px-3 py-2 truncate hover:bg-main-veryLight",on:{click:function(n){return e.changeSelection(t)}}},[e._v(" "+e._s(t)+" ")])})),0)])],1)},i=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}},shift:{type:Boolean,default:!0}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},s=o,r=(n("0886"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,null,null);t["a"]=u.exports},"0886":function(e,t,n){"use strict";var a=n("27fc"),i=n.n(a);i.a},1966:function(e,t,n){},"27fc":function(e,t,n){},3775:function(e,t,n){},"40f3":function(e,t,n){"use strict";var a=n("aa8d"),i=n.n(a);i.a},"446e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),n("input",{staticClass:"w-full border border-main rounded-shape px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})])},i=[],o={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},s=o,r=(n("40f3"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,null,null);t["a"]=u.exports},"44ee":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[e.create?n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Create League",description:""}}):n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"noindex"}},title:"Munro - Edit League",description:""}}),e.notFound?e._e():n("div",[e.create?n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Create League ")]):e._e(),e.create?e._e():n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Edit League ")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[n("text-input",{attrs:{label:"Name:"},model:{value:e.name,callback:function(t){e.name="string"===typeof t?t.trim():t},expression:"name"}}),n("text-input",{attrs:{label:"Year:"},model:{value:e.year,callback:function(t){e.year="string"===typeof t?t.trim():t},expression:"year"}}),n("text-input",{attrs:{label:"Description:"},model:{value:e.info,callback:function(t){e.info="string"===typeof t?t.trim():t},expression:"info"}}),n("text-input",{attrs:{label:"Website: (URL)",type:"url"},model:{value:e.website,callback:function(t){e.website="string"===typeof t?t.trim():t},expression:"website"}}),n("text-input",{attrs:{label:"Coordinator:"},model:{value:e.coordinator,callback:function(t){e.coordinator="string"===typeof t?t.trim():t},expression:"coordinator"}}),n("dropdown-input",{attrs:{list:["Position Based (100 Max)","Position Based (99 Max)","Position Based (50 Max)","Position Based (100 Max, Double Points)","Position Based (50 Max, Double Points)","Position Based (99 Max, Reduced in a Draw)","Relative to Average Time (1000 Average)","Relative to Average Time (100 Average)","From Upload File"],label:"Scoring Method:"},model:{value:e.scoringMethod,callback:function(t){e.scoringMethod=t},expression:"scoringMethod"}}),n("number-input",{attrs:{min:1,label:"Number of Events to Count:"},model:{value:e.numberOfCountingEvents,callback:function(t){e.numberOfCountingEvents=e._n(t)},expression:"numberOfCountingEvents"}}),n("text-input",{attrs:{label:"Courses: (Comma Separated)"},model:{value:e.courses,callback:function(t){e.courses="string"===typeof t?t.trim():t},expression:"courses"}}),n("checkbox-input",{staticClass:"text-left mb-5",attrs:{label:"Dynamic Event Results:"},model:{value:e.dynamicResults,callback:function(t){e.dynamicResults=t},expression:"dynamicResults"}}),e.create?n("button",{staticClass:"button-lg"},[e._v("Create League")]):e._e(),e.create?e._e():n("button",{staticClass:"button-lg"},[e._v("Update League")])],1)]),e.notFound?n("not-found"):e._e()],1)},i=[],o=n("bc3a"),s=n.n(o),r=n("02c0"),u=n("446e"),l=n("d610"),c=n("c824"),d=function(){return n.e("chunk-2d0e5e97").then(n.bind(null,"9703"))},m={components:{NotFound:d,DropdownInput:r["a"],TextInput:u["a"],NumberInput:l["a"],CheckboxInput:c["a"]},data:function(){return{notFound:!1,create:!0,oldName:"",name:"",year:"",website:"",coordinator:"",scoringMethod:"",numberOfCountingEvents:1,courses:"",info:"",numberOfEvents:0,dynamicResults:!0}},mounted:function(){this.$route.path.includes("edit")&&(this.create=!1,this.getLeagueDetails())},methods:{validateForm:function(){return""===this.name||""===this.scoringMethod?(this.$messages.addMessage("Please Ensure Name and Scoring Method Fields are not Blank"),!1):!this.name.includes("/")&&!this.name.includes("\\")||(this.$messages.addMessage("Please Ensure Name doesn't Include any Slashes"),!1)},returnToLeaguePage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/leagues/".concat(this.name))},scoringMethodShorthandToFull:function(e){return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":"positionDouble"===e?"Position Based (100 Max, Double Points)":"position50Double"===e?"Position Based (50 Max, Double Points)":"timeAverage"===e?"Relative to Average Time (1000 Average)":"timeAverage100"===e?"Relative to Average Time (100 Average)":"file"===e?"From Upload File":""},scoringMethodFullToShorthand:function(e){return"Position Based (100 Max)"===e?"position":"Position Based (50 Max)"===e?"position50":"Position Based (99 Max)"===e?"position99":"Position Based (99 Max - Reduced in a Draw)"===e?"position99average":"Position Based (100 Max, Double Points)"===e?"positionDouble":"Position Based (50 Max, Double Points)"===e?"position50Double":"Relative to Average Time (1000 Average)"===e?"timeAverage":"Relative to Average Time (100 Average)"===e?"timeAverage100":"From Upload File"===e?"file":""},getLeagueDetails:function(){var e=this;return s.a.get("/api/leagues/".concat(this.$route.params.name)).then((function(t){t.data?(e.oldName=t.data.name,e.name=t.data.name,e.year=t.data.year,e.website=t.data.website,e.coordinator=t.data.coordinator,e.scoringMethod=e.scoringMethodShorthandToFull(t.data.scoringMethod),e.numberOfCountingEvents=t.data.numberOfCountingEvents,t.data.courses&&(e.courses=t.data.courses.join(",")),e.info=t.data.description,e.dynamicResults=t.data.dynamicEventResults):e.notFound=!0})).catch((function(){return e.$messages.addMessage("Problem Fetching League Details")}))},submit:function(){this.create?this.createLeague():this.updateLeague()},createLeague:function(){var e=this;if(this.validateForm())return s.a.post("/api/leagues",{name:this.name,year:this.year,website:this.website,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info,dynamicEventResults:this.dynamicResults}).then((function(t){return e.returnToLeaguePage(t)})).catch((function(){return e.$messages.addMessage("Error: Problem Creating League - Please Try Again")}))},updateLeague:function(){var e=this;if(this.validateForm())return s.a.put("/api/leagues/".concat(this.oldName),{oldName:this.oldName,name:this.name,year:this.year,website:this.website,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info,dynamicEventResults:this.dynamicResults}).then((function(t){return e.returnToLeaguePage(t)})).catch((function(){return e.$messages.addMessage("Error: Problem Updating League - Please Try Again")}))}}},p=m,h=n("2877"),g=Object(h["a"])(p,a,i,!1,null,null,null);t["default"]=g.exports},"79a9":function(e,t,n){"use strict";var a=n("1966"),i=n.n(a);i.a},aa8d:function(e,t,n){},c824:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input mt-3"},[n("label",{staticClass:"text-md select-none font-heading text-main"},[e._v(" "+e._s(e.label)+" "),n("input",{staticClass:"hidden",attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},i=[],o={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},s=o,r=(n("79a9"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,"72041513",null);t["a"]=u.exports},d610:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative appearance-none"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),n("input",{staticClass:"w-full border border-main rounded-shape px-4 py-2 text-body outline-none appearance-none",attrs:{min:e.min,max:e.max,type:"number"},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})])},i=[],o={name:"NumberInput",props:{value:{type:Number,default:0},label:{type:String,default:""},min:{type:Number,default:0},max:{type:Number,default:100}}},s=o,r=(n("e86a"),n("2877")),u=Object(r["a"])(s,a,i,!1,null,null,null);t["a"]=u.exports},e86a:function(e,t,n){"use strict";var a=n("3775"),i=n.n(a);i.a}}]);
//# sourceMappingURL=chunk-ea264282-legacy.08e7f5d4.js.map