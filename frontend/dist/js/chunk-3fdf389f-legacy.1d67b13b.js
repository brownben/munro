(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3fdf389f"],{2679:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - Upload Results",description:"Upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/upload",head:{meta:{name:"robots",content:"all"}}}}),n("h1",[e._v("Upload Results")]),n("p",[e._v("For instructions to upload results go to "),n("router-link",{attrs:{to:"/upload-instructions"}},[e._v("/upload-instructions")])],1),n("label",[e._v("Event ID:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:e.eventId,expression:"eventId",modifiers:{trim:!0,lazy:!0}}],attrs:{type:"text"},domProps:{value:e.eventId},on:{change:[function(t){e.eventId=t.target.value.trim()},function(t){return e.findEvent()}],blur:function(t){return e.$forceUpdate()}}}),n("p",{directives:[{name:"show",rawName:"v-show",value:e.event.name,expression:"event.name"}],attrs:{id:"eventName"}},[n("b",[e._v("Event Name:")]),e._v("\n    "+e._s(e.event.name)+"\n  ")]),n("label",[e._v("Upload Key:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.uploadKey,expression:"uploadKey",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.uploadKey},on:{input:function(t){t.target.composing||(e.uploadKey=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Results File:")]),n("div",{staticClass:"file-input"},[n("label",{staticClass:"button",attrs:{for:"file"}},[e._v("Browse for File")]),n("input",{attrs:{id:"file",type:"file",accept:".csv"},on:{change:e.fileChange}}),n("p",[e._v(e._s(e.fileName))])]),e.event.resultUploaded?n("Checkbox",{attrs:{label:"Overwrite Existing Results:"},model:{value:e.overwrite,callback:function(t){e.overwrite=t},expression:"overwrite"}}):e._e(),n("label",[e._v("Results (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.event.results,expression:"event.results",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.event.results},on:{input:function(t){t.target.composing||e.$set(e.event,"results",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Routegadget (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.event.routegadget,expression:"event.routegadget",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.event.routegadget},on:{input:function(t){t.target.composing||e.$set(e.event,"routegadget",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Winsplits (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.event.winsplits,expression:"event.winsplits",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.event.winsplits},on:{input:function(t){t.target.composing||e.$set(e.event,"winsplits",t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.eventId&&e.uploadKey&&e.file?n("button",{attrs:{id:"uploadButton"},on:{click:e.uploadFile}},[e._v("Upload File")]):e._e()],1)},s=[],i=(n("7f7f"),n("bc3a")),r=n.n(i),o=n("c824"),l={components:{Checkbox:o["a"]},data:function(){return{eventId:"",uploadKey:"",event:{},fileName:"Select a File",file:"",overwrite:!1,results:"",routegadget:"",winsplits:""}},mounted:function(){this.$route.params.id&&(this.eventId=this.$route.params.id,this.findEvent())},methods:{findEvent:function(){var e=this;return r.a.get("/api/events/"+this.eventId).then(function(t){e.event=t.data,e.event.name||(e.event={},e.event.name="No Event Found")}).catch(function(){return e.$messages.addMessage("Problem Fetching Event Name")})},fileChange:function(e){var t=e.target||e.dataTransfer,n=t.files;if(!n||!n.length)return!1;this.fileName=n[0].name,this.readFile(n[0])},readFile:function(e){var t=new FileReader;t.onload=this.readFileResult,t.readAsText(e)},readFileResult:function(e){this.file=e.target.result},uploadFile:function(){var e=this;return this.$messages.addMessage("Upload Data Sent"),r.a.post("/api/upload",{eventId:this.eventId,uploadKey:this.uploadKey,file:this.file,overwrite:this.overwrite,results:this.event.results,winsplits:this.event.winsplits,routegadget:this.event.routegadget}).then(function(){e.$messages.addMessage("Results Uploaded Successfully"),e.$router.push("/leagues/"+e.event.league)}).catch(function(t){return e.$messages.addMessage(t.response.data.message)})}}},u=l,d=(n("614c"),n("2877")),c=Object(d["a"])(u,a,s,!1,null,"d29f981a",null);t["default"]=c.exports},"562b":function(e,t,n){"use strict";var a=n("900d"),s=n.n(a);s.a},"614c":function(e,t,n){"use strict";var a=n("ffe9"),s=n.n(a);s.a},"7f7f":function(e,t,n){var a=n("86cc").f,s=Function.prototype,i=/^\s*function ([^ (]*)/,r="name";r in s||n("9e1e")&&a(s,r,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},"900d":function(e,t,n){},c824:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input"},[n("label",[e._v("\n    "+e._s(e.label)+"\n    "),n("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},s=[],i={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},r=i,o=(n("562b"),n("2877")),l=Object(o["a"])(r,a,s,!1,null,"70403901",null);t["a"]=l.exports},ffe9:function(e,t,n){}}]);
//# sourceMappingURL=chunk-3fdf389f-legacy.1d67b13b.js.map