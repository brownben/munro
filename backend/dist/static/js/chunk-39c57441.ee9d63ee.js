(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-39c57441"],{"02c0":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"dropdown-input"},[o("div",{staticClass:"visible",on:{click:e.toggle}},[o("label",[e._v(e._s(e.label))]),o("p",[e._v(e._s(e.currentValue))]),o("svg",{class:{active:e.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[o("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),o("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),o("transition",{attrs:{name:"open"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown"},e._l(e.list,function(t){return o("p",{key:t,on:{click:function(o){return e.changeSelection(t)}}},[e._v(e._s(t))])}),0)])],1)},i=[],a={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},s=a,r=(o("cded"),o("2877")),u=Object(r["a"])(s,n,i,!1,null,"f729b13e",null);t["a"]=u.exports},"44ee":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[e.create?o("vue-headful",{attrs:{title:"Munro - Create League"}}):o("vue-headful",{attrs:{title:"Munro - Edit League"}}),e.notFound?e._e():o("div",[e.create?o("h1",[e._v("Create League")]):e._e(),e.create?e._e():o("h1",[e._v("Edit League")]),o("form",{on:{submit:function(t){return t.preventDefault(),e.submit()}}},[o("label",[e._v("Name:")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Description:")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.info,expression:"info",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.info},on:{input:function(t){t.target.composing||(e.info=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Website:")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.website,expression:"website",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.website},on:{input:function(t){t.target.composing||(e.website=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Logo (URL):")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.logo,expression:"logo",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.logo},on:{input:function(t){t.target.composing||(e.logo=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Coordinator:")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.coordinator,expression:"coordinator",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.coordinator},on:{input:function(t){t.target.composing||(e.coordinator=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Scoring Method:")]),o("dropdown-input",{attrs:{list:["Position Based (100 Max)","Position Based (50 Max)"]},model:{value:e.scoringMethod,callback:function(t){e.scoringMethod=t},expression:"scoringMethod"}}),o("label",[e._v("Number of Events to Count:")]),o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.numberOfCountingEvents,expression:"numberOfCountingEvents",modifiers:{number:!0}}],attrs:{type:"text",inputmode:"numeric",pattern:"[0-9]*",min:"1"},domProps:{value:e.numberOfCountingEvents},on:{input:function(t){t.target.composing||(e.numberOfCountingEvents=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}}),o("label",[e._v("Courses: (Comma Separated)")]),o("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.courses,expression:"courses",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.courses},on:{input:function(t){t.target.composing||(e.courses=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.create?o("button",[e._v("Create League")]):e._e(),e.create?e._e():o("button",[e._v("Update League")])],1)]),e.notFound?o("not-found"):e._e()],1)},i=[],a=o("bc3a"),s=o.n(a),r=o("02c0");const u=()=>o.e("chunk-164ca264").then(o.bind(null,"9703"));var d={components:{NotFound:u,DropdownInput:r["a"]},data:function(){return{notFound:!1,create:!0,oldName:"",name:"",website:"",logo:"",coordinator:"",scoringMethod:"",numberOfCountingEvents:1,courses:"",info:"",numberOfEvents:0}},mounted:function(){this.$route.path.includes("edit")&&(this.create=!1,this.getLeagueDetails())},methods:{validateForm:function(){return""!==this.name&&""!==this.scoringMethod},returnToLeaguePage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/leagues/"+this.name)},scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},scoringMethodFullToShorthand:e=>{return"Position Based (100 Max)"===e?"position":"Position Based (50 Max)"===e?"position50":"Position Based (99 Max)"===e?"position99":"Position Based (99 Max, Reduced in a Draw)"===e?"position99average":""},getLeagueDetails:function(){return s.a.get("/api/leagues/"+this.$route.params.name).then(e=>{e.data?(this.oldName=e.data.name,this.name=e.data.name,this.website=e.data.website,this.coordinator=e.data.coordinator,this.scoringMethod=this.scoringMethodShorthandToFull(e.data.scoringMethod),this.numberOfCountingEvents=e.data.numberOfCountingEvents,this.logo=e.data.logo,e.data.courses&&(this.courses=e.data.courses.join(",")),this.info=e.data.description):this.notFound=!0}).catch(()=>this.$messages.addMessage("Problem Fetching League Details"))},submit:function(){this.create?this.createLeague():this.updateLeague()},createLeague:function(){if(this.validateForm())return s.a.post("/api/leagues",{name:this.name,website:this.website,logo:this.logo,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Creating League - Please Try Again"));this.$messages.addMessage("Please Ensure Name and Scoring Method Fields are not Blank")},updateLeague:function(){if(this.validateForm())return s.a.put("/api/leagues/"+this.oldName,{oldName:this.oldName,name:this.name,website:this.website,logo:this.logo,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Updating League - Please Try Again"));this.$messages.addMessage("Please Ensure Name and Scoring Method Fields are not Blank")}}},c=d,l=(o("4e8e"),o("2877")),m=Object(l["a"])(c,n,i,!1,null,"4f142233",null);t["default"]=m.exports},"4e8e":function(e,t,o){"use strict";var n=o("e8af"),i=o.n(n);i.a},cded:function(e,t,o){"use strict";var n=o("f038"),i=o.n(n);i.a},e8af:function(e,t,o){},f038:function(e,t,o){}}]);
//# sourceMappingURL=chunk-39c57441.ee9d63ee.js.map