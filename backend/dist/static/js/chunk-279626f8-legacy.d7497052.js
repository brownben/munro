(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-279626f8"],{"02c0":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"dropdown-input"},[n("div",{staticClass:"visible",on:{click:t.toggle}},[n("label",[t._v(t._s(t.label))]),n("p",[t._v(t._s(t.currentValue))]),n("svg",{class:{active:t.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"dropdown"},t._l(t.list,function(e){return n("p",{key:e,on:{click:function(n){return t.changeSelection(e)}}},[t._v(t._s(e))])}),0)])],1)},i=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(t){this.currentValue=t}},methods:{changeSelection:function(t){this.open=!1,this.currentValue=t,this.$emit("input",t)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},a=o,u=(n("cded"),n("2877")),s=Object(u["a"])(a,r,i,!1,null,"f729b13e",null);e["a"]=s.exports},"09ab":function(t,e,n){"use strict";var r=n("b890"),i=n.n(r);i.a},"230e":function(t,e,n){var r=n("d3f4"),i=n("7726").document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},"2aba":function(t,e,n){var r=n("7726"),i=n("32e9"),o=n("69a8"),a=n("ca5a")("src"),u=n("fa5b"),s="toString",c=(""+u).split(s);n("8378").inspectSource=function(t){return u.call(t)},(t.exports=function(t,e,n,u){var s="function"==typeof n;s&&(o(n,"name")||i(n,"name",e)),t[e]!==n&&(s&&(o(n,a)||i(n,a,t[e]?""+t[e]:c.join(String(e)))),t===r?t[e]=n:u?t[e]?t[e]=n:i(t,e,n):(delete t[e],i(t,e,n)))})(Function.prototype,s,function(){return"function"==typeof this&&this[a]||u.call(this)})},"2b4c":function(t,e,n){var r=n("5537")("wks"),i=n("ca5a"),o=n("7726").Symbol,a="function"==typeof o,u=t.exports=function(t){return r[t]||(r[t]=a&&o[t]||(a?o:i)("Symbol."+t))};u.store=r},"2d00":function(t,e){t.exports=!1},"2d95":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"2fdb":function(t,e,n){"use strict";var r=n("5ca1"),i=n("d2c8"),o="includes";r(r.P+r.F*n("5147")(o),"String",{includes:function(t){return!!~i(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},"32e9":function(t,e,n){var r=n("86cc"),i=n("4630");t.exports=n("9e1e")?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},4588:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},4630:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},5147:function(t,e,n){var r=n("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,!"/./"[t](e)}catch(i){}}return!0}},5537:function(t,e,n){var r=n("8378"),i=n("7726"),o="__core-js_shared__",a=i[o]||(i[o]={});(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"5ca1":function(t,e,n){var r=n("7726"),i=n("8378"),o=n("32e9"),a=n("2aba"),u=n("9b43"),s="prototype",c=function(t,e,n){var l,f,d,p,m=t&c.F,v=t&c.G,g=t&c.S,h=t&c.P,b=t&c.B,w=v?r:g?r[e]||(r[e]={}):(r[e]||{})[s],x=v?i:i[e]||(i[e]={}),y=x[s]||(x[s]={});for(l in v&&(n=e),n)f=!m&&w&&void 0!==w[l],d=(f?w:n)[l],p=b&&f?u(d,r):h&&"function"==typeof d?u(Function.call,d):d,w&&a(w,l,d,t&c.U),x[l]!=d&&o(x,l,p),h&&y[l]!=d&&(y[l]=d)};r.core=i,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},"626a":function(t,e,n){var r=n("2d95");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},6762:function(t,e,n){"use strict";var r=n("5ca1"),i=n("c366")(!0);r(r.P,"Array",{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},6821:function(t,e,n){var r=n("626a"),i=n("be13");t.exports=function(t){return r(i(t))}},"69a8":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"6a99":function(t,e,n){var r=n("d3f4");t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},7726:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"77f1":function(t,e,n){var r=n("4588"),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},"79e5":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},"7f7f":function(t,e,n){var r=n("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,a="name";a in i||n("9e1e")&&r(i,a,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},8378:function(t,e){var n=t.exports={version:"2.6.8"};"number"==typeof __e&&(__e=n)},"86cc":function(t,e,n){var r=n("cb7c"),i=n("c69a"),o=n("6a99"),a=Object.defineProperty;e.f=n("9e1e")?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return a(t,e,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},"9b43":function(t,e,n){var r=n("d8e8");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},"9c6c":function(t,e,n){var r=n("2b4c")("unscopables"),i=Array.prototype;void 0==i[r]&&n("32e9")(i,r,{}),t.exports=function(t){i[r][t]=!0}},"9def":function(t,e,n){var r=n("4588"),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},"9e1e":function(t,e,n){t.exports=!n("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},aae3:function(t,e,n){var r=n("d3f4"),i=n("2d95"),o=n("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},b890:function(t,e,n){},be13:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c366:function(t,e,n){var r=n("6821"),i=n("9def"),o=n("77f1");t.exports=function(t){return function(e,n,a){var u,s=r(e),c=i(s.length),l=o(a,c);if(t&&n!=n){while(c>l)if(u=s[l++],u!=u)return!0}else for(;c>l;l++)if((t||l in s)&&s[l]===n)return t||l||0;return!t&&-1}}},c69a:function(t,e,n){t.exports=!n("9e1e")&&!n("79e5")(function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a})},ca5a:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},cb7c:function(t,e,n){var r=n("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},cc28:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.create?n("vue-headful",{attrs:{title:"Munro - Create Event",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):n("vue-headful",{attrs:{title:"Munro - Edit Event",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),t.notFound?t._e():n("div",[t.create?n("h1",[t._v("Create Event")]):t._e(),t.create?t._e():n("h1",[t._v("Edit Event")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.submit()}}},[n("label",[t._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("Date: (DD/MM/YYYY)")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.date,expression:"date"}],attrs:{type:"date"},domProps:{value:t.date},on:{input:function(e){e.target.composing||(t.date=e.target.value)}}}),n("label",[t._v("Club/ Organiser:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.organiser,expression:"organiser",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.organiser},on:{input:function(e){e.target.composing||(t.organiser=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("Website:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.website,expression:"website",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.website},on:{input:function(e){e.target.composing||(t.website=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("Results: (URL)")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.results,expression:"results",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.results},on:{input:function(e){e.target.composing||(t.results=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("Winsplits: (URL)")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.winsplits,expression:"winsplits",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.winsplits},on:{input:function(e){e.target.composing||(t.winsplits=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("Routegadget: (URL)")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.routegadget,expression:"routegadget",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.routegadget},on:{input:function(e){e.target.composing||(t.routegadget=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),n("label",[t._v("League:")]),n("dropdown-input",{attrs:{list:t.leagues.map(function(t){return t.name})},model:{value:t.league,callback:function(e){t.league=e},expression:"league"}}),n("label",[t._v("More Information:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.moreInformation,expression:"moreInformation",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:t.moreInformation},on:{input:function(e){e.target.composing||(t.moreInformation=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),t.create?n("button",[t._v("Create Event")]):t._e(),t.create?t._e():n("button",[t._v("Update Event")])],1)]),t.notFound?n("not-found"):t._e()],1)},i=[],o=(n("7f7f"),n("6762"),n("2fdb"),n("bc3a")),a=n.n(o),u=n("02c0"),s=function(){return n.e("chunk-10545b19").then(n.bind(null,"9703"))},c={components:{NotFound:s,DropdownInput:u["a"]},data:function(){return{id:"",notFound:!1,create:!0,leagues:[],name:"",date:"",resultUploaded:!1,organiser:"",moreInformation:"",website:"",results:"",winsplits:"",routegadget:"",league:this.$route.params.league}},mounted:function(){this.getLeagues(),this.$route.path.includes("edit")&&(this.create=!1,this.getEventDetails())},methods:{submit:function(){this.create?this.createEvent():this.updateEvent()},getEventDetails:function(){var t=this;return a.a.get("/api/events/"+this.$route.params.id).then(function(e){e.data?(t.id=t.$route.params.id,t.name=e.data.name,t.date=e.data.date,t.resultUploaded=e.data.resultUploaded,t.organiser=e.data.organiser,t.moreInformation=e.data.moreInformation,t.website=e.data.website,t.results=e.data.results,t.winsplits=e.data.winsplits,t.routegadget=e.data.routegadget,t.league=e.data.league):t.notFound=!0}).catch(function(){return t.$messages.addMessage("Problem Getting Event Details")})},getLeagues:function(){var t=this;return a.a.get("/api/leagues").then(function(e){t.leagues=e.data}).catch(function(){return t.$messages.addMessage("Problem Fetching List of Leagues")})},validateForm:function(){return""!==this.name&&""!==this.league},createEvent:function(){var t=this;if(this.validateForm())return a.a.post("/api/events",{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(function(e){return t.returnToLeaguePage(e)}).catch(function(){return t.$messages.addMessage("Error: Problem Creating Event - Please Try Again")});this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},updateEvent:function(){var t=this;if(this.validateForm())return a.a.put("/api/events/"+this.id,{name:this.name,date:this.date,resultUploaded:this.resultUploaded,organiser:this.organiser,moreInformation:this.moreInformation,website:this.website,results:this.results,winsplits:this.winsplits,routegadget:this.routegadget,league:this.league}).then(function(e){return t.returnToLeaguePage(e)}).catch(function(e){return t.$messages.addMessage(e.response.data.message)});this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},returnToLeaguePage:function(t){this.$messages.addMessage(t.data.message),this.$router.push("/leagues/"+this.league)}}},l=c,f=(n("09ab"),n("2877")),d=Object(f["a"])(l,r,i,!1,null,"78e97620",null);e["default"]=d.exports},cded:function(t,e,n){"use strict";var r=n("f038"),i=n.n(r);i.a},d2c8:function(t,e,n){var r=n("aae3"),i=n("be13");t.exports=function(t,e,n){if(r(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(i(t))}},d3f4:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d8e8:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},f038:function(t,e,n){},fa5b:function(t,e,n){t.exports=n("5537")("native-function-to-string",Function.toString)}}]);
//# sourceMappingURL=chunk-279626f8-legacy.d7497052.js.map