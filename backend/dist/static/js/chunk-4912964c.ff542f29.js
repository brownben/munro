(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4912964c"],{"02c0":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dropdown-input"},[a("div",{staticClass:"visible",on:{click:e.toggle}},[a("label",[e._v(e._s(e.label))]),a("p",[e._v(e._s(e.currentValue))]),a("svg",{class:{active:e.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[a("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),a("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),a("transition",{attrs:{name:"open"}},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown"},e._l(e.list,function(t){return a("p",{key:t,on:{click:function(a){return e.changeSelection(t)}}},[e._v(e._s(t))])}),0)])],1)},i=[],s={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:()=>[]}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},r=s,o=(a("901f"),a("2877")),u=Object(o["a"])(r,n,i,!1,null,"7130b6c2",null);t["a"]=u.exports},"09ab":function(e,t,a){"use strict";var n=a("b890"),i=a.n(n);i.a},"901f":function(e,t,a){"use strict";var n=a("cee4"),i=a.n(n);i.a},b890:function(e,t,a){},cc28:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.create?a("vue-headful",{attrs:{title:"Munro - Create Event",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):a("vue-headful",{attrs:{title:"Munro - Edit Event",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),e.notFound?e._e():a("div",[e.create?a("h1",[e._v("Create Event")]):e._e(),e.create?e._e():a("h1",[e._v("Edit Event")]),a("form",{on:{submit:function(t){return t.preventDefault(),e.submit()}}},[a("label",[e._v("Name:")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("Date: (DD/MM/YYYY)")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.date,expression:"date"}],attrs:{type:"date"},domProps:{value:e.date},on:{input:function(t){t.target.composing||(e.date=t.target.value)}}}),a("label",[e._v("Club/ Organiser:")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.organiser,expression:"organiser",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.organiser},on:{input:function(t){t.target.composing||(e.organiser=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("Website:")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.website,expression:"website",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.website},on:{input:function(t){t.target.composing||(e.website=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("Results: (URL)")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.results,expression:"results",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.results},on:{input:function(t){t.target.composing||(e.results=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("Winsplits: (URL)")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.winsplits,expression:"winsplits",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.winsplits},on:{input:function(t){t.target.composing||(e.winsplits=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("Routegadget: (URL)")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.routegadget,expression:"routegadget",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.routegadget},on:{input:function(t){t.target.composing||(e.routegadget=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),a("label",[e._v("League:")]),a("dropdown-input",{attrs:{list:e.leagues.map(function(e){return e.name})},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),a("label",[e._v("More Information:")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.moreInformation,expression:"moreInformation",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.moreInformation},on:{input:function(t){t.target.composing||(e.moreInformation=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.create?a("button",[e._v("Create Event")]):e._e(),e.create?e._e():a("button",[e._v("Update Event")])],1)]),e.notFound?a("not-found"):e._e()],1)},i=[],s=a("bc3a"),r=a.n(s),o=a("02c0");const u=()=>a.e("chunk-10545b19").then(a.bind(null,"9703"));var l={components:{NotFound:u,DropdownInput:o["a"]},data:function(){return{id:"",notFound:!1,create:!0,leagues:[],name:"",date:"",resultUploaded:!1,organiser:"",moreInformation:"",website:"",results:"",winsplits:"",routegadget:"",league:this.$route.params.league}},mounted:function(){this.getLeagues(),this.$route.path.includes("edit")&&(this.create=!1,this.getEventDetails())},methods:{submit:function(){this.create?this.createEvent():this.updateEvent()},getEventDetails:function(){return r.a.get("/api/events/"+this.$route.params.id).then(e=>{e.data?(this.id=this.$route.params.id,this.name=e.data.name,this.date=e.data.date,this.resultUploaded=e.data.resultUploaded,this.organiser=e.data.organiser,this.moreInformation=e.data.moreInformation,this.website=e.data.website,this.results=e.data.results,this.winsplits=e.data.winsplits,this.routegadget=e.data.routegadget,this.league=e.data.league):this.notFound=!0}).catch(()=>this.$messages.addMessage("Problem Getting Event Details"))},getLeagues:function(){return r.a.get("/api/leagues").then(e=>{this.leagues=e.data}).catch(()=>this.$messages.addMessage("Problem Fetching List of Leagues"))},validateForm:function(){return""!==this.name&&""!==this.league},createEvent:function(){if(this.validateForm())return r.a.post("/api/events",{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(e=>this.returnToLeaguePage(e)).catch(()=>this.$messages.addMessage("Error: Problem Creating Event - Please Try Again"));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},updateEvent:function(){if(this.validateForm())return r.a.put("/api/events/"+this.id,{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(e=>this.returnToLeaguePage(e)).catch(e=>this.$messages.addMessage(e.response.data.message));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},returnToLeaguePage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/leagues/"+this.league)}}},d=l,m=(a("09ab"),a("2877")),c=Object(m["a"])(d,n,i,!1,null,"78e97620",null);t["default"]=c.exports},cee4:function(e,t,a){}}]);
//# sourceMappingURL=chunk-4912964c.ff542f29.js.map