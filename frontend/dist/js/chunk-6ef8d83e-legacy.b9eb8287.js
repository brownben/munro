(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ef8d83e"],{"02f4":function(e,t,n){var r=n("4588"),s=n("be13");e.exports=function(e){return function(t,n){var i,a,o=String(s(t)),c=r(n),u=o.length;return c<0||c>=u?e?"":void 0:(i=o.charCodeAt(c),i<55296||i>56319||c+1===u||(a=o.charCodeAt(c+1))<56320||a>57343?e?o.charAt(c):i:e?o.slice(c,c+2):a-56320+(i-55296<<10)+65536)}}},"0390":function(e,t,n){"use strict";var r=n("02f4")(!0);e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"04f9":function(e,t,n){"use strict";var r=n("adb0"),s=n.n(r);s.a},"0bfb":function(e,t,n){"use strict";var r=n("cb7c");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"11e9":function(e,t,n){var r=n("52a7"),s=n("4630"),i=n("6821"),a=n("6a99"),o=n("69a8"),c=n("c69a"),u=Object.getOwnPropertyDescriptor;t.f=n("9e1e")?u:function(e,t){if(e=i(e),t=a(t,!0),c)try{return u(e,t)}catch(n){}if(o(e,t))return s(!r.f.call(e,t),e[t])}},"214f":function(e,t,n){"use strict";n("b0c5");var r=n("2aba"),s=n("32e9"),i=n("79e5"),a=n("be13"),o=n("2b4c"),c=n("520a"),u=o("species"),l=!i(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),f=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();e.exports=function(e,t,n){var d=o(e),p=!i(function(){var t={};return t[d]=function(){return 7},7!=""[e](t)}),h=p?!i(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[u]=function(){return n}),n[d](""),!t}):void 0;if(!p||!h||"replace"===e&&!l||"split"===e&&!f){var v=/./[d],g=n(a,d,""[e],function(e,t,n,r,s){return t.exec===c?p&&!s?{done:!0,value:v.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),m=g[0],b=g[1];r(String.prototype,e,m),s(RegExp.prototype,d,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}}},"283a":function(e,t,n){},"28a5":function(e,t,n){"use strict";var r=n("aae3"),s=n("cb7c"),i=n("ebd6"),a=n("0390"),o=n("9def"),c=n("5f1b"),u=n("520a"),l=n("79e5"),f=Math.min,d=[].push,p="split",h="length",v="lastIndex",g=4294967295,m=!l(function(){RegExp(g,"y")});n("214f")("split",2,function(e,t,n,l){var b;return b="c"=="abbc"[p](/(b)*/)[1]||4!="test"[p](/(?:)/,-1)[h]||2!="ab"[p](/(?:ab)*/)[h]||4!="."[p](/(.?)(.?)/)[h]||"."[p](/()()/)[h]>1||""[p](/.?/)[h]?function(e,t){var s=String(this);if(void 0===e&&0===t)return[];if(!r(e))return n.call(s,e,t);var i,a,o,c=[],l=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),f=0,p=void 0===t?g:t>>>0,m=new RegExp(e.source,l+"g");while(i=u.call(m,s)){if(a=m[v],a>f&&(c.push(s.slice(f,i.index)),i[h]>1&&i.index<s[h]&&d.apply(c,i.slice(1)),o=i[0][h],f=a,c[h]>=p))break;m[v]===i.index&&m[v]++}return f===s[h]?!o&&m.test("")||c.push(""):c.push(s.slice(f)),c[h]>p?c.slice(0,p):c}:"0"[p](void 0,0)[h]?function(e,t){return void 0===e&&0===t?[]:n.call(this,e,t)}:n,[function(n,r){var s=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,s,r):b.call(String(s),n,r)},function(e,t){var r=l(b,e,this,t,b!==n);if(r.done)return r.value;var u=s(e),d=String(this),p=i(u,RegExp),h=u.unicode,v=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(m?"y":"g"),x=new p(m?u:"^(?:"+u.source+")",v),w=void 0===t?g:t>>>0;if(0===w)return[];if(0===d.length)return null===c(x,d)?[d]:[];var y=0,R=0,_=[];while(R<d.length){x.lastIndex=m?R:0;var C,O=c(x,m?d:d.slice(R));if(null===O||(C=f(o(x.lastIndex+(m?0:R)),d.length))===y)R=a(d,R,h);else{if(_.push(d.slice(y,R)),_.length===w)return _;for(var k=1;k<=O.length-1;k++)if(_.push(O[k]),_.length===w)return _;R=y=C}}return _.push(d.slice(y)),_}]})},"2f21":function(e,t,n){"use strict";var r=n("79e5");e.exports=function(e,t){return!!e&&r(function(){t?e.call(null,function(){},1):e.call(null)})}},"2fdb":function(e,t,n){"use strict";var r=n("5ca1"),s=n("d2c8"),i="includes";r(r.P+r.F*n("5147")(i),"String",{includes:function(e){return!!~s(this,e,i).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},"33a3":function(e,t,n){},"3b2b":function(e,t,n){var r=n("7726"),s=n("5dbc"),i=n("86cc").f,a=n("9093").f,o=n("aae3"),c=n("0bfb"),u=r.RegExp,l=u,f=u.prototype,d=/a/g,p=/a/g,h=new u(d)!==d;if(n("9e1e")&&(!h||n("79e5")(function(){return p[n("2b4c")("match")]=!1,u(d)!=d||u(p)==p||"/a/i"!=u(d,"i")}))){u=function(e,t){var n=this instanceof u,r=o(e),i=void 0===t;return!n&&r&&e.constructor===u&&i?e:s(h?new l(r&&!i?e.source:e,t):l((r=e instanceof u)?e.source:e,r&&i?c.call(e):t),n?this:f,u)};for(var v=function(e){e in u||i(u,e,{configurable:!0,get:function(){return l[e]},set:function(t){l[e]=t}})},g=a(l),m=0;g.length>m;)v(g[m++]);f.constructor=u,u.prototype=f,n("2aba")(r,"RegExp",u)}n("7a56")("RegExp")},4917:function(e,t,n){"use strict";var r=n("cb7c"),s=n("9def"),i=n("0390"),a=n("5f1b");n("214f")("match",1,function(e,t,n,o){return[function(n){var r=e(this),s=void 0==n?void 0:n[t];return void 0!==s?s.call(n,r):new RegExp(n)[t](String(r))},function(e){var t=o(n,e,this);if(t.done)return t.value;var c=r(e),u=String(this);if(!c.global)return a(c,u);var l=c.unicode;c.lastIndex=0;var f,d=[],p=0;while(null!==(f=a(c,u))){var h=String(f[0]);d[p]=h,""===h&&(c.lastIndex=i(u,s(c.lastIndex),l)),p++}return 0===p?null:d}]})},"491c":function(e,t,n){"use strict";var r=n("6b05"),s=n.n(r);s.a},5147:function(e,t,n){var r=n("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[r]=!1,!"/./"[e](t)}catch(s){}}return!0}},"520a":function(e,t,n){"use strict";var r=n("0bfb"),s=RegExp.prototype.exec,i=String.prototype.replace,a=s,o="lastIndex",c=function(){var e=/a/,t=/b*/g;return s.call(e,"a"),s.call(t,"a"),0!==e[o]||0!==t[o]}(),u=void 0!==/()??/.exec("")[1],l=c||u;l&&(a=function(e){var t,n,a,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),c&&(t=f[o]),a=s.call(f,e),c&&a&&(f[o]=f.global?a.index+a[0].length:t),u&&a&&a.length>1&&i.call(a[0],n,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(a[l]=void 0)}),a}),e.exports=a},"55dd":function(e,t,n){"use strict";var r=n("5ca1"),s=n("d8e8"),i=n("4bf8"),a=n("79e5"),o=[].sort,c=[1,2,3];r(r.P+r.F*(a(function(){c.sort(void 0)})||!a(function(){c.sort(null)})||!n("2f21")(o)),"Array",{sort:function(e){return void 0===e?o.call(i(this)):o.call(i(this),s(e))}})},"562b":function(e,t,n){"use strict";var r=n("900d"),s=n.n(r);s.a},"5dbc":function(e,t,n){var r=n("d3f4"),s=n("8b97").set;e.exports=function(e,t,n){var i,a=t.constructor;return a!==n&&"function"==typeof a&&(i=a.prototype)!==n.prototype&&r(i)&&s&&s(e,i),e}},"5f1b":function(e,t,n){"use strict";var r=n("23c6"),s=RegExp.prototype.exec;e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw new TypeError("RegExp#exec called on incompatible receiver");return s.call(e,t)}},6762:function(e,t,n){"use strict";var r=n("5ca1"),s=n("c366")(!0);r(r.P,"Array",{includes:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},"6b05":function(e,t,n){},"7f7e":function(e,t,n){"use strict";var r=n("33a3"),s=n.n(r);s.a},"7f7f":function(e,t,n){var r=n("86cc").f,s=Function.prototype,i=/^\s*function ([^ (]*)/,a="name";a in s||n("9e1e")&&r(s,a,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(e){return""}}})},"8b97":function(e,t,n){var r=n("d3f4"),s=n("cb7c"),i=function(e,t){if(s(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,r){try{r=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),r(e,[]),t=!(e instanceof Array)}catch(s){t=!0}return function(e,n){return i(e,n),t?e.__proto__=n:r(e,n),e}}({},!1):void 0),check:i}},"900d":function(e,t,n){},9093:function(e,t,n){var r=n("ce10"),s=n("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,s)}},9381:function(e,t,n){"use strict";var r=n("283a"),s=n.n(r);s.a},aae3:function(e,t,n){var r=n("d3f4"),s=n("2d95"),i=n("2b4c")("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==s(e))}},adb0:function(e,t,n){},b0c5:function(e,t,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},bb25:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"up-down-arrows"},[n("svg",{class:{active:e.active&&!e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{active:e.active&&e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},s=[],i={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},a=i,o=(n("491c"),n("2877")),c=Object(o["a"])(a,r,s,!1,null,"1e1ecba6",null);t["a"]=c.exports},c824:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input"},[n("label",[e._v("\n    "+e._s(e.label)+"\n    "),n("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},s=[],i={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},a=i,o=(n("562b"),n("2877")),c=Object(o["a"])(a,r,s,!1,null,"70403901",null);t["a"]=c.exports},d2c8:function(e,t,n){var r=n("aae3"),s=n("be13");e.exports=function(e,t,n){if(r(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(s(e))}},e854:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name+" - "+e.$route.params.course+" Results",description:"Results from the "+e.$route.params.course+" course of the "+e.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues"+e.$route.params.name+"/results/"+e.$route.params.course,head:{meta:{name:"robots",content:"all"}}}}),n("h1",{attrs:{id:"league-title"}},[n("router-link",{attrs:{to:"/leagues/"+e.$route.params.name}},[e._v(e._s(e.$route.params.name))]),e._v("\n    - "+e._s(e.$route.params.course)+"\n  ")],1),n("filter-menu",{on:{changed:e.filterChanged}}),n("transition",{attrs:{name:"shrink"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.filteredResults&&e.filteredResults.length>0,expression:"filteredResults && filteredResults.length > 0"}]},[n("table",[n("thead",[n("tr",[n("th",{on:{click:function(t){return e.sortBy("position")}}},[n("p",[e._v("Pos.")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"position"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("name")}}},[n("p",[e._v("Name")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"name"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("age")}}},[n("p",[e._v("Class")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"age"===e.sortedBy}})],1),n("th",{staticClass:"club",on:{click:function(t){return e.sortBy("club")}}},[n("p",[e._v("Club")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"club"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("totalPoints")}}},[n("p",[e._v("Points")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"totalPoints"===e.sortedBy}})],1),e.smallWindow?n("td"):e._l(e.eventsWithResults,function(t){return n("th",{key:e.eventsWithResults.indexOf(t),on:{click:function(n){e.sortBy("points-"+e.eventsWithResults.indexOf(t))}}},[n("p",[e._v(e._s(e.eventsWithResults.indexOf(t)+1))]),n("span",[e._v(e._s(t.name))]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:e.sortedBy==="points-"+e.eventsWithResults.indexOf(t)}})],1)})],2)]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},[e._l(e.filteredResults,function(t){return[n("tr",{key:t.name,staticClass:"normal-table-row",class:{striped:e.filteredResults.indexOf(t)%2===0},on:{click:function(n){e.toggleRow(e.filteredResults.indexOf(t))}}},[n("td",[e._v(e._s(t.position))]),n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.ageClass))]),n("td",{staticClass:"club"},[e._v(e._s(t.club))]),n("td",[e._v(e._s(t.totalPoints))]),e.smallWindow?n("td",[e.openedRows.includes(e.filteredResults.indexOf(t))?n("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]):n("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})])]):e._l(e.eventsWithResults,function(r){return n("td",{key:e.eventsWithResults.indexOf(r),class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(r))}},[e._v("\n                  "+e._s(t.points[e.eventsWithResults.indexOf(r)])+"\n                ")])})],2),e.smallWindow&&e.openedRows.includes(e.filteredResults.indexOf(t))?n("tr",{key:t.name+"-mobile",staticClass:"mobile-table-expansion",class:{striped:e.filteredResults.indexOf(t)%2===0}},[n("td",{attrs:{colspan:"100%"}},e._l(e.eventsWithResults,function(r){return n("p",{key:e.eventsWithResults.indexOf(r)},[e._v("\n                  "+e._s(r.name)+":\n                  "),n("span",{class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(r))}},[e._v(e._s(t.points[e.eventsWithResults.indexOf(r)]))])])}),0)]):e._e()]})],2)],1),e.otherCourses.length>0?n("div",{staticClass:"card"},[n("h2",[e._v("Results for Other Courses")]),n("div",e._l(e.otherCourses,function(t){return n("router-link",{key:t,staticClass:"button",attrs:{to:"/leagues/"+e.$route.params.name+"/results/"+t}},[e._v("\n            "+e._s(t)+"\n          ")])}),1)]):e._e()])]),e.found?e._e():n("h2",[e._v("Sorry, No Results Could Be Found")])],1)},s=[],i=(n("96cf"),n("3b8d")),a=(n("3b2b"),n("7f7f"),n("4917"),n("55dd"),n("28a5"),n("6762"),n("2fdb"),n("bc3a")),o=n.n(a),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("accordion-dropdown",{attrs:{title:"Filter"}},[n("div",{staticClass:"half input"},[n("label",[e._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.preferences.name,expression:"preferences.name"}],attrs:{type:"text"},domProps:{value:e.preferences.name},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"name",t.target.value)},e.onChange]}})]),n("div",{staticClass:"half input"},[n("label",[e._v("Club:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.preferences.club,expression:"preferences.club"}],attrs:{type:"text"},domProps:{value:e.preferences.club},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"club",t.target.value)},e.onChange]}})]),n("div",{staticClass:"quarter input"},[n("label",[e._v("Min Age:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.preferences.minAge,expression:"preferences.minAge",modifiers:{number:!0}}],attrs:{type:"number",min:"0",max:"120"},domProps:{value:e.preferences.minAge},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"minAge",e._n(t.target.value))},e.onChange],blur:function(t){return e.$forceUpdate()}}})]),n("div",{staticClass:"quarter input"},[n("label",[e._v("Max Age:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.preferences.maxAge,expression:"preferences.maxAge",modifiers:{number:!0}}],attrs:{type:"number",min:"0",max:"120"},domProps:{value:e.preferences.maxAge},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"maxAge",e._n(t.target.value))},e.onChange],blur:function(t){return e.$forceUpdate()}}})]),n("checkbox",{staticClass:"quarter",attrs:{label:"Male:"},on:{input:e.onChange},model:{value:e.preferences.male,callback:function(t){e.$set(e.preferences,"male",t)},expression:"preferences.male"}}),n("checkbox",{staticClass:"quarter",attrs:{label:"Female:"},on:{input:e.onChange},model:{value:e.preferences.female,callback:function(t){e.$set(e.preferences,"female",t)},expression:"preferences.female"}})],1)},u=[],l=n("c824"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"accordion"}},[n("div",{staticClass:"accordion-head",on:{click:function(t){e.accordionOpen=!e.accordionOpen}}},[n("h2",[e._v(e._s(e.title))]),n("svg",{class:{rotate:e.accordionOpen},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}}),n("path",{attrs:{fill:"none",d:"M0 0h24v24H0V0z"}})])]),n("transition",{attrs:{name:"shrink"}},[e.accordionOpen?n("div",{key:"1",staticClass:"accordion-body"},[e._t("default")],2):e._e()])],1)},d=[],p={props:{title:{type:String,default:"Title"}},data:function(){return{accordionOpen:!1}}},h=p,v=(n("9381"),n("2877")),g=Object(v["a"])(h,f,d,!1,null,"b099cdcc",null),m=g.exports,b={components:{Checkbox:l["a"],AccordionDropdown:m},data:function(){return{preferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},methods:{onChange:function(){this.$emit("changed",this.preferences)}}},x=b,w=(n("04f9"),Object(v["a"])(x,c,u,!1,null,"34cf92c8",null)),y=w.exports,R=n("bb25"),_={components:{FilterMenu:y,UpDownArrow:R["a"]},data:function(){return{smallWindow:!1,found:!0,openedRows:[],rawResults:[],events:[],otherCourses:[],sortedBy:"position",ascendingSort:!1,filterPreferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},computed:{resultsWithAgeClassSplit:function(){return this.rawResults.map(function(e){return e.ageClass&&(e.gender=e.ageClass[0],e.age=parseInt(e.ageClass.slice(1))),e})},sortedResults:function(){var e=this.sortedBy;return this.sortedBy.includes("points-")&&(e=parseInt(e.split("-")[1])),this.sort(this.resultsWithAgeClassSplit,e,this.ascendingSort,this.sortedBy.includes("points-"))},filteredResults:function(){var e=this;return this.sortedResults.filter(function(t){return t.name.match(new RegExp(e.filterPreferences.name,"i"))}).filter(function(t){return t.club.match(new RegExp(e.filterPreferences.club,"i"))}).filter(function(t){return 100===e.filterPreferences.maxAge&&0===e.filterPreferences.minAge||e.filterPreferences.minAge<=t.age&&t.age<=e.filterPreferences.maxAge}).filter(function(t){return e.filterPreferences.male&&e.filterPreferences.female||e.filterPreferences.male&&"M"===t.gender||e.filterPreferences.female&&"W"===t.gender})},eventsWithResults:function(){return this.events.filter(function(e){return e.resultUploaded})}},watch:{$route:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.rawResults=[],this.openedRows=[],e.next=4,this.getResults();case 4:return e.next=6,this.getEventList();case 6:this.getOtherCourses();case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return window.addEventListener("resize",this.handleResize),this.handleResize(),e.next=4,this.getResults();case 4:return e.next=6,this.getEventList();case 6:this.getOtherCourses();case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){window.innerWidth>900?this.smallWindow=!1:this.smallWindow=!0},getResults:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name+"/results/"+this.$route.params.course).then(function(t){t.data.length>0?e.rawResults=t.data:e.found=!1}).catch(function(){e.found=!1})},getOtherCourses:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name).then(function(t){t.data.courses?e.otherCourses=t.data.courses.filter(function(t){return t!==e.$route.params.course}):e.otherCourses=!1}).catch(function(){e.otherCourses=!1})},getEventList:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name+"/events").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Fetching List of Events")})},sort:function(e,t){var n,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n=s?function(e,n){return e.points[t]===n.points[t]?0:null===e.points[t]?1:null===n.points[t]?-1:e.points[t]<n.points[t]?1:-1}:function(e,n){return e[t]===n[t]?0:null===e[t]||void 0===e[t]?1:null===n[t]||void 0===n[t]?-1:e[t]<n[t]?1:-1},r?e.sort(n):e.sort(n).reverse()},sortBy:function(e){this.openedRows=[],e!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=e},filterChanged:function(e){this.filterPreferences.name=e.name,this.filterPreferences.club=e.club,""===e.minAge?this.filterPreferences.minAge=0:this.filterPreferences.minAge=e.minAge,""===e.maxAge?this.filterPreferences.maxAge=100:this.filterPreferences.maxAge=e.maxAge,this.filterPreferences.male=e.male,this.filterPreferences.female=e.female},toggleRow:function(e){var t=this.openedRows.indexOf(e);t>-1?this.openedRows.splice(t,1):this.openedRows.push(e)}}},C=_,O=(n("7f7e"),Object(v["a"])(C,r,s,!1,null,"906d3d7e",null));t["default"]=O.exports}}]);
//# sourceMappingURL=chunk-6ef8d83e-legacy.b9eb8287.js.map