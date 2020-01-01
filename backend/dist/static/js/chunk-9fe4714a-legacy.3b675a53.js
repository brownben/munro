(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9fe4714a"],{"446e":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"text-input top--4 relative"},[a("label",{staticClass:"font-heading text-sm text-main p-1 mx-3 bg-white relative select-none bottom--3 pb-0"},[e._v(e._s(e.label))]),"checkbox"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.value)?e._i(e.value,null)>-1:e.value},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){var a=e.value,n=t.target,s=!!n.checked;if(Array.isArray(a)){var r=null,l=e._i(a,r);n.checked?l<0&&(e.value=a.concat([r])):l>-1&&(e.value=a.slice(0,l).concat(a.slice(l+1)))}else e.value=s}}}):"radio"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:"radio"},domProps:{checked:e._q(e.value,null)},on:{input:function(t){return e.$emit("input",t.target.value)},change:function(t){e.value=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.value,expression:"value"}],staticClass:"w-full border border-main rounded-tl-lg rounded-br-lg px-4 py-2 text-body outline-none",attrs:{type:e.type},domProps:{value:e.value},on:{input:[function(t){t.target.composing||(e.value=t.target.value)},function(t){return e.$emit("input",t.target.value)}]}})])},s=[],r={name:"TextInput",props:{value:{type:String,default:""},label:{type:String,default:""},type:{type:String,default:"text"}}},l=r,o=a("2877"),i=Object(o["a"])(l,n,s,!1,null,null,null);t["a"]=i.exports},a55b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[a("vue-headful",{attrs:{title:"Munro - Login",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),a("h1",{staticClass:"text-main text-2xl font-heading my-2"},[e._v("Admin Login")]),a("form",{on:{submit:function(t){return t.preventDefault(),e.sendLoginRequest(t)}}},[a("text-input",{attrs:{label:"Email Address:",type:"email"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),a("text-input",{attrs:{label:"Password:",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("button",{staticClass:"button-lg"},[e._v("Login")])],1),a("div",{staticClass:"mt-4 card-color"},[a("p",[a("b",{staticClass:"font-heading p-2 text-lg"},[e._v("Looking for Results Upload?")]),e._v(" You don't have to login, just visit the "),a("router-link",{staticClass:"link",attrs:{to:"/upload"}},[e._v("upload page")])],1)])],1)},s=[],r=a("7013"),l=a("446e"),o={components:{TextInput:l["a"]},data:function(){return{username:"",password:""}},mounted:function(){this.$auth.user&&(this.$messages.addMessage("You Are Already Logged In"),this.$router.push("/")),this.blankFields(),this.$route.query.redirect&&this.$messages.addMessage("Please Login to Access that Page")},methods:{blankFields:function(){this.username="",this.password=""},validateLogin:function(){return""!==this.username&&""!==this.password},sendLoginRequest:function(){var e=this;if(this.validateLogin())return r["a"].login(this.username,this.password).then((function(t){t&&e.$router.replace(e.$route.query.redirect||"/"),e.$messages.addMessage("Hello"),e.blankFields()})).catch((function(){return e.$messages.addMessage("Error: Problem Logging In - Please Try Again")}));this.$messages.addMessage("Problem: Username or Password were left Blank")}}},i=o,u=a("2877"),d=Object(u["a"])(i,n,s,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-9fe4714a-legacy.3b675a53.js.map