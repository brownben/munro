(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ecf7250"],{"1e1f":function(e,t,n){"use strict";var r=n("cec0"),i=n.n(r);i.a},"230e":function(e,t,n){var r=n("d3f4"),i=n("7726").document,a=r(i)&&r(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},2679:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - Upload Results",description:"Upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/upload",head:{meta:{name:"robots",content:"all"}}}}),n("h1",[e._v("Upload Results")]),n("label",[e._v("Event ID:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:e.eventId,expression:"eventId",modifiers:{trim:!0,lazy:!0}}],attrs:{type:"text"},domProps:{value:e.eventId},on:{change:[function(t){e.eventId=t.target.value.trim()},function(t){return e.findEvent()}],blur:function(t){return e.$forceUpdate()}}}),n("p",{directives:[{name:"show",rawName:"v-show",value:e.event.name,expression:"event.name"}],attrs:{id:"eventName"}},[n("b",[e._v("Event Name:")]),e._v("\n    "+e._s(e.event.name)+"\n  ")]),n("label",[e._v("Upload Key:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.uploadKey,expression:"uploadKey",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.uploadKey},on:{input:function(t){t.target.composing||(e.uploadKey=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Results File:")]),n("div",{staticClass:"file-input"},[n("label",{staticClass:"button",attrs:{for:"file"}},[e._v("Browse for File")]),n("input",{attrs:{id:"file",type:"file",accept:".csv"},on:{change:e.fileChange}}),n("p",[e._v(e._s(e.fileName))])]),e.event.resultUploaded?n("Checkbox",{attrs:{label:"Overwrite Existing Results:"},model:{value:e.overwrite,callback:function(t){e.overwrite=t},expression:"overwrite"}}):e._e(),n("label",[e._v("Results (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.results,expression:"results",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.results},on:{input:function(t){t.target.composing||(e.results=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Routegadget (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.routegadget,expression:"routegadget",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.routegadget},on:{input:function(t){t.target.composing||(e.routegadget=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Winsplits (URL):")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.winsplits,expression:"winsplits",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.winsplits},on:{input:function(t){t.target.composing||(e.winsplits=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),e.eventId&&e.uploadKey&&e.file?n("button",{attrs:{id:"uploadButton"},on:{click:e.uploadFile}},[e._v("Upload File")]):e._e()],1)},i=[],a=(n("7f7f"),n("bc3a")),o=n.n(a),s=n("c824"),u={components:{Checkbox:s["a"]},data:function(){return{eventId:"",uploadKey:"",event:{},fileName:"Select a File",file:"",overwrite:!1,results:"",routegadget:"",winsplits:""}},mounted:function(){this.$route.params.id&&(this.eventId=this.$route.params.id,this.findEvent())},methods:{findEvent:function(){var e=this;return o.a.get("/api/events/"+this.eventId).then(function(t){e.event=t.data,e.event.name||(e.event={},e.event.name="No Event Found")}).catch(function(){return e.$messages.addMessage("Problem Fetching Event Name")})},fileChange:function(e){var t=e.target||e.dataTransfer,n=t.files;if(!n||!n.length)return!1;this.fileName=n[0].name,this.readFile(n[0])},readFile:function(e){var t=new FileReader;t.onload=this.readFileResult,t.readAsText(e)},readFileResult:function(e){this.file=e.target.result},uploadFile:function(){var e=this;return this.$messages.addMessage("Upload Data Sent"),o.a.post("/api/upload",{eventId:this.eventId,uploadKey:this.uploadKey,file:this.file,overwrite:this.overwrite,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget}).then(function(){e.$messages.addMessage("Results Uploaded Successfully"),e.$router.push("/leagues/"+e.event.league)}).catch(function(t){return e.$messages.addMessage(t.response.data.message)})}}},l=u,c=(n("1e1f"),n("2877")),d=Object(c["a"])(l,r,i,!1,null,"58643042",null);t["default"]=d.exports},"562b":function(e,t,n){"use strict";var r=n("900d"),i=n.n(r);i.a},"6a99":function(e,t,n){var r=n("d3f4");e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},7726:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"79e5":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"7f7f":function(e,t,n){var r=n("86cc").f,i=Function.prototype,a=/^\s*function ([^ (]*)/,o="name";o in i||n("9e1e")&&r(i,o,{configurable:!0,get:function(){try{return(""+this).match(a)[1]}catch(e){return""}}})},"86cc":function(e,t,n){var r=n("cb7c"),i=n("c69a"),a=n("6a99"),o=Object.defineProperty;t.f=n("9e1e")?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),i)try{return o(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},"900d":function(e,t,n){},"9e1e":function(e,t,n){e.exports=!n("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},c69a:function(e,t,n){e.exports=!n("9e1e")&&!n("79e5")(function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a})},c824:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input"},[n("label",[e._v("\n    "+e._s(e.label)+"\n    "),n("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},i=[],a={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},o=a,s=(n("562b"),n("2877")),u=Object(s["a"])(o,r,i,!1,null,"70403901",null);t["a"]=u.exports},cb7c:function(e,t,n){var r=n("d3f4");e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},cec0:function(e,t,n){},d3f4:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}}}]);
//# sourceMappingURL=chunk-2ecf7250-legacy.cadfc6f8.js.map