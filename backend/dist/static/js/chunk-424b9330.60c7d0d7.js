(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-424b9330"],{"0dea":function(e,t,n){},1966:function(e,t,n){},2679:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"view"},[n("vue-headful",{attrs:{head:{meta:{name:"robots",content:"all"}},title:"Munro - Upload Results",description:"Upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/upload"}}),n("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Upload Results ")]),n("div",{staticClass:"card-color mt-2 mb-4"},[n("p",[e._v(" For instructions on how to upload results please visit "),n("router-link",{staticClass:"link inline text-white ml-1",attrs:{to:"/upload-instructions"}},[e._v(" /upload-instructions ")])],1)]),n("text-input",{attrs:{label:"Event ID:"},on:{input:e.findEvent},model:{value:e.eventId,callback:function(t){e.eventId="string"===typeof t?t.trim():t},expression:"eventId"}}),n("p",{directives:[{name:"show",rawName:"v-show",value:e.event.name,expression:"event.name"}],staticClass:"mb-3"},[n("b",[e._v("Event Name:")]),e._v(" "+e._s(e.event.name)+" ")]),n("text-input",{attrs:{label:"Upload Key:"},model:{value:e.uploadKey,callback:function(t){e.uploadKey="string"===typeof t?t.trim():t},expression:"uploadKey"}}),e.event.resultUploaded?n("checkbox-input",{staticClass:"text-left mb-5",attrs:{label:"Overwrite Existing Results:"},model:{value:e.overwrite,callback:function(t){e.overwrite=t},expression:"overwrite"}}):e._e(),n("file-input",{attrs:{label:"Results File:"},on:{file:e.fileRead}}),n("text-input",{attrs:{label:"Results (URL):",type:"url"},model:{value:e.event.results,callback:function(t){e.$set(e.event,"results","string"===typeof t?t.trim():t)},expression:"event.results"}}),n("text-input",{attrs:{label:"Routegadget (URL):",type:"url"},model:{value:e.event.routegadget,callback:function(t){e.$set(e.event,"routegadget","string"===typeof t?t.trim():t)},expression:"event.routegadget"}}),n("text-input",{attrs:{label:"Winsplits: (URL):",type:"url"},model:{value:e.event.winsplits,callback:function(t){e.$set(e.event,"winsplits","string"===typeof t?t.trim():t)},expression:"event.winsplits"}}),e.eventId&&e.uploadKey&&e.file?n("button",{staticClass:"button-lg",on:{click:e.uploadFile}},[e._v(" Upload File ")]):e._e()],1)},s=[],l=n("bc3a"),i=n.n(l),r=n("c824"),o=n("446e"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"file-input relative top--4"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3  pb-0"},[e._v(e._s(e.label))]),n("p",{staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none truncate"},[e._v(" "+e._s(e.fileName)+" "),n("label",{staticClass:"absolute right-0 px-4 border-l border-r border-main rounded-tl-lg rounded-br-lg text-white bg-main hover:text-main hover:bg-white py-2 mt--2 font-heading inline-block",attrs:{for:"file"}},[e._v("Browse for File")]),n("input",{staticClass:"hidden",attrs:{id:"file",type:"file",accept:".csv"},on:{change:e.fileChange}})])])},d=[],c={name:"FileInput",props:{value:{type:String,default:""},label:{type:String,default:""}},data:()=>({fileName:"Select a File"}),methods:{fileChange:function(e){var t=e.target||e.dataTransfer,n=t.files;if(!n||!n.length)return!1;this.fileName=n[0].name,this.readFile(n[0])},readFile:function(e){var t=new FileReader;t.onload=this.readFileResult,t.readAsText(e)},readFileResult:function(e){this.$emit("file",e.target.result)}}},p=c,v=(n("755e"),n("2877")),f=Object(v["a"])(p,u,d,!1,null,null,null),h=f.exports,m={components:{CheckboxInput:r["a"],TextInput:o["a"],FileInput:h},data:function(){return{eventId:"",uploadKey:"",event:{},file:"",overwrite:!1,results:"",routegadget:"",winsplits:""}},mounted:function(){this.$route.params.id&&(this.eventId=this.$route.params.id,this.findEvent())},methods:{findEvent:function(){return i.a.get("/api/events/".concat(this.eventId)).then(e=>{this.event=e.data,this.event.name||(this.event={},this.event.name="No Event Found")}).catch(()=>this.$messages.addMessage("Problem Fetching Event Name"))},fileRead:function(e){this.file=e},uploadFile:function(){return this.$messages.addMessage("Upload Data Sent"),i.a.post("/api/upload",{eventId:this.eventId,uploadKey:this.uploadKey,file:this.file,overwrite:this.overwrite,results:this.event.results,winsplits:this.event.winsplits,routegadget:this.event.routegadget}).then(()=>{this.$messages.addMessage("Results Uploaded Successfully"),this.$router.push("/leagues/".concat(this.event.league))}).catch(e=>this.$messages.addMessage(e.response.data.message))}}},g=m,b=Object(v["a"])(g,a,s,!1,null,null,null);t["default"]=b.exports},"40f3":function(e,t,n){"use strict";var a=n("aa8d"),s=n.n(a);s.a},"446e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-input top--4 relative"},[n("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),n("input",{staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})])},s=[],l={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},i=l,r=(n("40f3"),n("2877")),o=Object(r["a"])(i,a,s,!1,null,null,null);t["a"]=o.exports},"755e":function(e,t,n){"use strict";var a=n("0dea"),s=n.n(a);s.a},"79a9":function(e,t,n){"use strict";var a=n("1966"),s=n.n(a);s.a},aa8d:function(e,t,n){},c824:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input mt-3"},[n("label",{staticClass:"text-md select-none font-heading text-main"},[e._v(" "+e._s(e.label)+" "),n("input",{staticClass:"hidden",attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},s=[],l={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},i=l,r=(n("79a9"),n("2877")),o=Object(r["a"])(i,a,s,!1,null,"72041513",null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-424b9330.60c7d0d7.js.map