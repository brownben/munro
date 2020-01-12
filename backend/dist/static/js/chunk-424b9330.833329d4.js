(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-424b9330"],{"0dea":function(e,t,a){},1966:function(e,t,a){},2679:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[a("vue-headful",{attrs:{head:{meta:{name:"robots",content:"all"}},title:"Munro - Upload Results",description:"Upload results to Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/upload"}}),a("h1",{staticClass:"text-main text-3xl font-normal font-heading mb-2"},[e._v(" Upload Results ")]),a("div",{staticClass:"card-color mt-2 mb-4"},[a("p",[e._v(" For instructions on how to upload results please visit "),a("router-link",{staticClass:"link inline text-white ml-1",attrs:{to:"/upload-instructions"}},[e._v(" /upload-instructions ")])],1)]),a("text-input",{attrs:{label:"Event ID:"},on:{input:e.findEvent},model:{value:e.eventId,callback:function(t){e.eventId="string"===typeof t?t.trim():t},expression:"eventId"}}),a("p",{directives:[{name:"show",rawName:"v-show",value:e.event.name,expression:"event.name"}],staticClass:"mb-3"},[a("b",[e._v("Event Name:")]),e._v(" "+e._s(e.event.name)+" ")]),a("text-input",{attrs:{label:"Upload Key:"},model:{value:e.uploadKey,callback:function(t){e.uploadKey="string"===typeof t?t.trim():t},expression:"uploadKey"}}),e.event.resultUploaded?a("checkbox-input",{staticClass:"text-left mb-5",attrs:{label:"Overwrite Existing Results:"},model:{value:e.overwrite,callback:function(t){e.overwrite=t},expression:"overwrite"}}):e._e(),a("file-input",{attrs:{label:"Results File:"},on:{file:e.fileRead}}),a("text-input",{attrs:{label:"Results (URL):",type:"url"},model:{value:e.event.results,callback:function(t){e.$set(e.event,"results","string"===typeof t?t.trim():t)},expression:"event.results"}}),a("text-input",{attrs:{label:"Routegadget (URL):",type:"url"},model:{value:e.event.routegadget,callback:function(t){e.$set(e.event,"routegadget","string"===typeof t?t.trim():t)},expression:"event.routegadget"}}),a("text-input",{attrs:{label:"Winsplits: (URL):",type:"url"},model:{value:e.event.winsplits,callback:function(t){e.$set(e.event,"winsplits","string"===typeof t?t.trim():t)},expression:"event.winsplits"}}),e.eventId&&e.uploadKey&&e.file?a("button",{staticClass:"button-lg",on:{click:e.uploadFile}},[e._v(" Upload File ")]):e._e()],1)},s=[],i=a("bc3a"),l=a.n(i),r=a("c824"),o=a("446e"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"file-input relative top--4"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3  pb-0"},[e._v(e._s(e.label))]),a("p",{staticClass:"w-full border border-main rounded-shape px-4 py-2 text-body outline-none truncate"},[e._v(" "+e._s(e.fileName)+" "),a("label",{staticClass:"absolute right-0 px-4 border-l border-r border-main rounded-shape text-white bg-main hover:text-main hover:bg-white py-2 mt--2 font-heading inline-block",attrs:{for:"file"}},[e._v("Browse for File")]),a("input",{staticClass:"hidden",attrs:{id:"file",type:"file",accept:".csv"},on:{change:e.fileChange}})])])},d=[],c={name:"FileInput",props:{value:{type:String,default:""},label:{type:String,default:""}},data:()=>({fileName:"Select a File"}),methods:{fileChange:function(e){var t=e.target||e.dataTransfer,a=t.files;if(!a||!a.length)return!1;this.fileName=a[0].name,this.readFile(a[0])},readFile:function(e){var t=new FileReader;t.onload=this.readFileResult,t.readAsText(e)},readFileResult:function(e){this.$emit("file",e.target.result)}}},p=c,v=(a("755e"),a("2877")),f=Object(v["a"])(p,u,d,!1,null,null,null),h=f.exports,m={components:{CheckboxInput:r["a"],TextInput:o["a"],FileInput:h},data:function(){return{eventId:"",uploadKey:"",event:{},file:"",overwrite:!1,results:"",routegadget:"",winsplits:""}},mounted:function(){this.$route.params.id&&(this.eventId=this.$route.params.id,this.findEvent())},methods:{findEvent:function(){return l.a.get("/api/events/".concat(this.eventId)).then(e=>{this.event=e.data,this.event.name||(this.event={},this.event.name="No Event Found")}).catch(()=>this.$messages.addMessage("Problem Fetching Event Name"))},fileRead:function(e){this.file=e},uploadFile:function(){return this.$messages.addMessage("Upload Data Sent"),l.a.post("/api/upload",{eventId:this.eventId,uploadKey:this.uploadKey,file:this.file,overwrite:this.overwrite,results:this.event.results,winsplits:this.event.winsplits,routegadget:this.event.routegadget}).then(()=>{this.$messages.addMessage("Results Uploaded Successfully"),this.$router.push("/leagues/".concat(this.event.league))}).catch(e=>this.$messages.addMessage(e.response.data.message))}}},b=m,g=Object(v["a"])(b,n,s,!1,null,null,null);t["default"]=g.exports},"40f3":function(e,t,a){"use strict";var n=a("aa8d"),s=a.n(n);s.a},"446e":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-input top--4 relative"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),a("input",{staticClass:"w-full border border-main rounded-shape px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:function(t){return e.$emit("input",t.target.value)}}})])},s=[],i={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},l=i,r=(a("40f3"),a("2877")),o=Object(r["a"])(l,n,s,!1,null,null,null);t["a"]=o.exports},"755e":function(e,t,a){"use strict";var n=a("0dea"),s=a.n(n);s.a},"79a9":function(e,t,a){"use strict";var n=a("1966"),s=a.n(n);s.a},aa8d:function(e,t,a){},c824:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"checkbox-input mt-3"},[a("label",{staticClass:"text-md select-none font-heading text-main"},[e._v(" "+e._s(e.label)+" "),a("input",{staticClass:"hidden",attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),a("span")])])},s=[],i={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},l=i,r=(a("79a9"),a("2877")),o=Object(r["a"])(l,n,s,!1,null,"72041513",null);t["a"]=o.exports}}]);
//# sourceMappingURL=chunk-424b9330.833329d4.js.map