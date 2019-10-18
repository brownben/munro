(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-083fb67e"],{"02c0":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-input"},[n("div",{staticClass:"visible",on:{click:e.toggle}},[n("label",[e._v(e._s(e.label))]),n("p",[e._v(e._s(e.currentValue))]),n("svg",{class:{active:e.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown"},e._l(e.list,function(t){return n("p",{key:t,on:{click:function(n){return e.changeSelection(t)}}},[e._v(e._s(t))])}),0)])],1)},i=[],a={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},s=a,r=(n("9573"),n("2877")),u=Object(r["a"])(s,o,i,!1,null,"2375829c",null);t["a"]=u.exports},"44ee":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.create?n("vue-headful",{attrs:{title:"Munro - Create League",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):n("vue-headful",{attrs:{title:"Munro - Edit League",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),e.notFound?e._e():n("div",[e.create?n("h1",[e._v("Create League")]):e._e(),e.create?e._e():n("h1",[e._v("Edit League")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.submit()}}},[n("label",[e._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Description:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.info,expression:"info",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.info},on:{input:function(t){t.target.composing||(e.info=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Website:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.website,expression:"website",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.website},on:{input:function(t){t.target.composing||(e.website=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Logo (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.logo,expression:"logo",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.logo},on:{input:function(t){t.target.composing||(e.logo=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Coordinator:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.coordinator,expression:"coordinator",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.coordinator},on:{input:function(t){t.target.composing||(e.coordinator=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Scoring Method:")]),n("dropdown-input",{attrs:{list:["Position Based (100 Max)","Position Based (50 Max)","Position Based (99 Max)","Position Based (99 Max - Reduced in a Draw)"]},model:{value:e.scoringMethod,callback:function(t){e.scoringMethod=t},expression:"scoringMethod"}}),n("label",[e._v("Number of Events to Count:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.numberOfCountingEvents,expression:"numberOfCountingEvents",modifiers:{number:!0}}],attrs:{type:"text",inputmode:"numeric",pattern:"[0-9]*",min:"1"},domProps:{value:e.numberOfCountingEvents},on:{input:function(t){t.target.composing||(e.numberOfCountingEvents=e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Courses: (Comma Separated)")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.courses,expression:"courses",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.courses},on:{input:function(t){t.target.composing||(e.courses=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.create?n("button",[e._v("Create League")]):e._e(),e.create?e._e():n("button",[e._v("Update League")])],1)]),e.notFound?n("not-found"):e._e()],1)},i=[],a=n("bc3a"),s=n.n(a),r=n("02c0");const u=()=>n.e("chunk-10545b19").then(n.bind(null,"9703"));var d={components:{NotFound:u,DropdownInput:r["a"]},data:function(){return{notFound:!1,create:!0,oldName:"",name:"",website:"",logo:"",coordinator:"",scoringMethod:"",numberOfCountingEvents:1,courses:"",info:"",numberOfEvents:0}},mounted:function(){this.$route.path.includes("edit")&&(this.create=!1,this.getLeagueDetails())},methods:{validateForm:function(){return""===this.name||""===this.scoringMethod?(this.$messages.addMessage("Please Ensure Name and Scoring Method Fields are not Blank"),!1):!this.name.includes("/")&&!this.name.includes("\\")||(this.$messages.addMessage("Please Ensure Name doesn't Include any Slashes"),!1)},returnToLeaguePage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/leagues/"+this.name)},scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max - Reduced in a Draw)":""},scoringMethodFullToShorthand:e=>{return"Position Based (100 Max)"===e?"position":"Position Based (50 Max)"===e?"position50":"Position Based (99 Max)"===e?"position99":"Position Based (99 Max - Reduced in a Draw)"===e?"position99average":""},getLeagueDetails:function(){return s.a.get("/api/leagues/"+this.$route.params.name).then(e=>{e.data?(this.oldName=e.data.name,this.name=e.data.name,this.website=e.data.website,this.coordinator=e.data.coordinator,this.scoringMethod=this.scoringMethodShorthandToFull(e.data.scoringMethod),this.numberOfCountingEvents=e.data.numberOfCountingEvents,this.logo=e.data.logo,e.data.courses&&(this.courses=e.data.courses.join(",")),this.info=e.data.description):this.notFound=!0}).catch(()=>this.$messages.addMessage("Problem Fetching League Details"))},submit:function(){this.create?this.createLeague():this.updateLeague()},createLeague:function(){if(this.validateForm())return s.a.post("/api/leagues",{name:this.name,website:this.website,logo:this.logo,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Creating League - Please Try Again"))},updateLeague:function(){if(this.validateForm())return s.a.put("/api/leagues/"+this.oldName,{oldName:this.oldName,name:this.name,website:this.website,logo:this.logo,coordinator:this.coordinator,scoringMethod:this.scoringMethodFullToShorthand(this.scoringMethod),numberOfCountingEvents:this.numberOfCountingEvents,courses:this.courses,description:this.info}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Updating League - Please Try Again"))}}},c=d,l=(n("4e07"),n("2877")),m=Object(l["a"])(c,o,i,!1,null,"56317cf1",null);t["default"]=m.exports},"4e07":function(e,t,n){"use strict";var o=n("d67f"),i=n.n(o);i.a},"63da":function(e,t,n){},9573:function(e,t,n){"use strict";var o=n("63da"),i=n.n(o);i.a},d67f:function(e,t,n){}}]);
//# sourceMappingURL=chunk-083fb67e.363cf4ed.js.map