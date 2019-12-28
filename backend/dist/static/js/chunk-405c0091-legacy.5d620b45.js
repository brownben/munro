(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-405c0091"],{"02c0":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dropdown-input"},[n("div",{staticClass:"visible",on:{click:e.toggle}},[n("label",[e._v(e._s(e.label))]),n("p",[e._v(e._s(e.currentValue))]),n("svg",{class:{active:e.open},attrs:{fill:"#9E9E9E",height:"24",viewBox:"0 0 24 24",width:"24"}},[n("path",{attrs:{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}}),n("path",{attrs:{d:"M0-.75h24v24H0z",fill:"none"}})])]),n("transition",{attrs:{name:"open"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"dropdown"},e._l(e.list,(function(t){return n("p",{key:t,on:{click:function(n){return e.changeSelection(t)}}},[e._v(e._s(t))])})),0)])],1)},r=[],o={name:"DropdownInput",props:{label:{type:String,default:""},value:{type:String,default:""},list:{type:Array,default:function(){return[]}}},data:function(){return{open:!1,currentValue:this.value}},watch:{value:function(e){this.currentValue=e}},methods:{changeSelection:function(e){this.open=!1,this.currentValue=e,this.$emit("input",e)},toggle:function(){this.open=!this.open,this.open&&this.$emit("opened")}}},i=o,s=(n("9573"),n("2877")),u=Object(s["a"])(i,a,r,!1,null,"2375829c",null);t["a"]=u.exports},"106c":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.create?n("vue-headful",{attrs:{title:"Munro - Create Competitor",description:"",head:{meta:{name:"robots",content:"noindex"}}}}):n("vue-headful",{attrs:{title:"Munro - Edit Competitor",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),e.notFound?e._e():n("div",[e.create?n("h1",[e._v("Create Competitor")]):e._e(),e.create?e._e():n("h1",[e._v("Edit Competitor")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.submit(t)}}},[n("label",[e._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.name,expression:"name",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Club:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.club,expression:"club",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.club},on:{input:function(t){t.target.composing||(e.club=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("Age Class:")]),n("input",{directives:[{name:"model",rawName:"v-model.trim",value:e.ageClass,expression:"ageClass",modifiers:{trim:!0}}],attrs:{type:"text"},domProps:{value:e.ageClass},on:{input:function(t){t.target.composing||(e.ageClass=t.target.value.trim())},blur:function(t){return e.$forceUpdate()}}}),n("label",[e._v("League:")]),n("dropdown-input",{attrs:{list:e.leagues.map((function(e){return e.name}))},model:{value:e.league,callback:function(t){e.league=t},expression:"league"}}),n("label",[e._v("Course:")]),n("dropdown-input",{attrs:{list:e.coursesInLeague},model:{value:e.course,callback:function(t){e.course=t},expression:"course"}}),e.create?n("button",[e._v("Create Competitor")]):e._e(),e.create?e._e():n("button",[e._v("Update Competitor")])],1)]),e.notFound?n("not-found"):e._e()],1)},r=[],o=(n("4de4"),n("caad6"),n("b0c0"),n("d3b7"),n("2532"),n("bc3a")),i=n.n(o),s=n("02c0"),u=function(){return n.e("chunk-9bd3c674").then(n.bind(null,"9703"))},c={components:{NotFound:u,DropdownInput:s["a"]},data:function(){return{id:"",notFound:!1,create:!0,leagues:[],name:"",club:"",ageClass:"",league:"",course:""}},computed:{coursesInLeague:function(){var e=this,t=this.leagues.filter((function(t){return t.name===e.league}));return t.length>0?t[0].courses:[]}},mounted:function(){this.getLeagues(),this.$route.path.includes("edit")&&(this.create=!1,this.getCompetitorDetails())},methods:{submit:function(){this.create?this.createCompetitor():this.updateCompetitor()},getCompetitorDetails:function(){var e=this;return i.a.get("/api/competitors/"+this.$route.params.id).then((function(t){t.data?(e.id=e.$route.params.id,e.name=t.data.name,e.club=t.data.club,e.ageClass=t.data.ageClass,e.league=t.data.league,e.course=t.data.course):e.notFound=!0})).catch((function(){return e.$messages.addMessage("Problem Getting Competitor Details")}))},getLeagues:function(){var e=this;return i.a.get("/api/leagues").then((function(t){e.leagues=t.data})).catch((function(){return e.$messages.addMessage("Problem Fetching List of Leagues")}))},validateForm:function(){return""!==this.name&&""!==this.league&&""!==this.course},createCompetitor:function(){var e=this;if(this.validateForm())return i.a.post("/api/competitors",{name:this.name,club:this.club,ageClass:this.ageClass,league:this.league,course:this.course}).then((function(t){return e.returnToCompetitorsPage(t)})).catch((function(){return e.$messages.addMessage("Error: Problem Creating Competitor - Please Try Again")}));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},updateCompetitor:function(){var e=this;if(this.validateForm())return i.a.put("/api/competitors/"+this.id,{id:this.id,name:this.name,club:this.club,ageClass:this.ageClass,league:this.league,course:this.course}).then((function(t){return e.returnToCompetitorsPage(t)})).catch((function(t){return e.$messages.addMessage(t.response.data.message)}));this.$messages.addMessage("Please Ensure Name and League Fields are not Blank")},returnToCompetitorsPage:function(e){this.$messages.addMessage(e.data.message),this.$router.push("/competitors")}}},l=c,d=(n("46c4"),n("2877")),p=Object(d["a"])(l,a,r,!1,null,"a0991ae0",null);t["default"]=p.exports},"1be4":function(e,t,n){var a=n("d066");e.exports=a("document","documentElement")},2532:function(e,t,n){"use strict";var a=n("23e7"),r=n("5a34"),o=n("1d80"),i=n("ab13");a({target:"String",proto:!0,forced:!i("includes")},{includes:function(e){return!!~String(o(this)).indexOf(r(e),arguments.length>1?arguments[1]:void 0)}})},"37e8":function(e,t,n){var a=n("83ab"),r=n("9bf2"),o=n("825a"),i=n("df75");e.exports=a?Object.defineProperties:function(e,t){o(e);var n,a=i(t),s=a.length,u=0;while(s>u)r.f(e,n=a[u++],t[n]);return e}},"44d2":function(e,t,n){var a=n("b622"),r=n("7c73"),o=n("9bf2"),i=a("unscopables"),s=Array.prototype;void 0==s[i]&&o.f(s,i,{configurable:!0,value:r(null)}),e.exports=function(e){s[i][e]=!0}},"44e7":function(e,t,n){var a=n("861d"),r=n("c6b6"),o=n("b622"),i=o("match");e.exports=function(e){var t;return a(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==r(e))}},"46c4":function(e,t,n){"use strict";var a=n("ec6b"),r=n.n(a);r.a},"4de4":function(e,t,n){"use strict";var a=n("23e7"),r=n("b727").filter,o=n("d039"),i=n("1dde"),s=i("filter"),u=s&&!o((function(){[].filter.call({length:-1,0:1},(function(e){throw e}))}));a({target:"Array",proto:!0,forced:!s||!u},{filter:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(e,t,n){var a=n("44e7");e.exports=function(e){if(a(e))throw TypeError("The method doesn't accept regular expressions");return e}},"7c73":function(e,t,n){var a,r=n("825a"),o=n("37e8"),i=n("7839"),s=n("d012"),u=n("1be4"),c=n("cc12"),l=n("f772"),d=">",p="<",m="prototype",f="script",h=l("IE_PROTO"),g=function(){},v=function(e){return p+f+d+e+p+"/"+f+d},b=function(e){e.write(v("")),e.close();var t=e.parentWindow.Object;return e=null,t},C=function(){var e,t=c("iframe"),n="java"+f+":";return t.style.display="none",u.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(v("document.F=Object")),e.close(),e.F},w=function(){try{a=document.domain&&new ActiveXObject("htmlfile")}catch(t){}w=a?b(a):C();var e=i.length;while(e--)delete w[m][i[e]];return w()};s[h]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(g[m]=r(e),n=new g,g[m]=null,n[h]=e):n=w(),void 0===t?n:o(n,t)}},"94eb":function(e,t,n){},9573:function(e,t,n){"use strict";var a=n("94eb"),r=n.n(a);r.a},ab13:function(e,t,n){var a=n("b622"),r=a("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,"/./"[e](t)}catch(a){}}return!1}},b0c0:function(e,t,n){var a=n("83ab"),r=n("9bf2").f,o=Function.prototype,i=o.toString,s=/^\s*function ([^ (]*)/,u="name";!a||u in o||r(o,u,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(e){return""}}})},caad6:function(e,t,n){"use strict";var a=n("23e7"),r=n("4d64").includes,o=n("44d2");a({target:"Array",proto:!0},{includes:function(e){return r(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},df75:function(e,t,n){var a=n("ca84"),r=n("7839");e.exports=Object.keys||function(e){return a(e,r)}},ec6b:function(e,t,n){}}]);
//# sourceMappingURL=chunk-405c0091-legacy.5d620b45.js.map