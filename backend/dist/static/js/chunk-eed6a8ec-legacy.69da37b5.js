(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eed6a8ec"],{"04f9":function(e,t,n){"use strict";var r=n("5144"),s=n.n(r);s.a},1276:function(e,t,n){"use strict";var r=n("d784"),s=n("44e7"),i=n("825a"),a=n("1d80"),o=n("4840"),c=n("8aa5"),u=n("50c4"),l=n("14c3"),f=n("9263"),d=n("d039"),p=[].push,h=Math.min,v=4294967295,g=!d((function(){return!RegExp(v,"y")}));r("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(a(this)),i=void 0===n?v:n>>>0;if(0===i)return[];if(void 0===e)return[r];if(!s(e))return t.call(r,e,i);var o,c,u,l=[],d=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,g=new RegExp(e.source,d+"g");while(o=f.call(g,r)){if(c=g.lastIndex,c>h&&(l.push(r.slice(h,o.index)),o.length>1&&o.index<r.length&&p.apply(l,o.slice(1)),u=o[0].length,h=c,l.length>=i))break;g.lastIndex===o.index&&g.lastIndex++}return h===r.length?!u&&g.test("")||l.push(""):l.push(r.slice(h)),l.length>i?l.slice(0,i):l}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var s=a(this),i=void 0==t?void 0:t[e];return void 0!==i?i.call(t,s,n):r.call(String(s),t,n)},function(e,s){var a=n(r,e,this,s,r!==t);if(a.done)return a.value;var f=i(e),d=String(this),p=o(f,RegExp),m=f.unicode,x=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(g?"y":"g"),b=new p(g?f:"^(?:"+f.source+")",x),y=void 0===s?v:s>>>0;if(0===y)return[];if(0===d.length)return null===l(b,d)?[d]:[];var w=0,R=0,_=[];while(R<d.length){b.lastIndex=g?R:0;var C,O=l(b,g?d:d.slice(R));if(null===O||(C=h(u(b.lastIndex+(g?0:R)),d.length))===w)R=c(d,R,m);else{if(_.push(d.slice(w,R)),_.length===y)return _;for(var E=1;E<=O.length-1;E++)if(_.push(O[E]),_.length===y)return _;R=w=C}}return _.push(d.slice(w)),_}]}),!g)},"14c3":function(e,t,n){var r=n("c6b6"),s=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return s.call(e,t)}},2532:function(e,t,n){"use strict";var r=n("23e7"),s=n("5a34"),i=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(e){return!!~String(i(this)).indexOf(s(e),arguments.length>1?arguments[1]:void 0)}})},"25f0":function(e,t,n){"use strict";var r=n("6eeb"),s=n("825a"),i=n("d039"),a=n("ad6d"),o="toString",c=RegExp.prototype,u=c[o],l=i((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),f=u.name!=o;(l||f)&&r(RegExp.prototype,o,(function(){var e=s(this),t=String(e.source),n=e.flags,r=String(void 0===n&&e instanceof RegExp&&!("flags"in c)?a.call(e):n);return"/"+t+"/"+r}),{unsafe:!0})},"26e9":function(e,t,n){"use strict";var r=n("23e7"),s=n("e8b5"),i=[].reverse,a=[1,2];r({target:"Array",proto:!0,forced:String(a)===String(a.reverse())},{reverse:function(){return s(this)&&(this.length=this.length),i.call(this)}})},2703:function(e,t,n){},"37e8":function(e,t,n){var r=n("83ab"),s=n("9bf2"),i=n("825a"),a=n("df75");e.exports=r?Object.defineProperties:function(e,t){i(e);var n,r=a(t),o=r.length,c=0;while(o>c)s.f(e,n=r[c++],t[n]);return e}},"3bbe":function(e,t,n){var r=n("861d");e.exports=function(e){if(!r(e)&&null!==e)throw TypeError("Can't set "+String(e)+" as a prototype");return e}},"44d2":function(e,t,n){var r=n("b622"),s=n("7c73"),i=n("9bf2"),a=r("unscopables"),o=Array.prototype;void 0==o[a]&&i.f(o,a,{configurable:!0,value:s(null)}),e.exports=function(e){o[a][e]=!0}},"44e7":function(e,t,n){var r=n("861d"),s=n("c6b6"),i=n("b622"),a=i("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==s(e))}},"466d":function(e,t,n){"use strict";var r=n("d784"),s=n("825a"),i=n("50c4"),a=n("1d80"),o=n("8aa5"),c=n("14c3");r("match",1,(function(e,t,n){return[function(t){var n=a(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,n):new RegExp(t)[e](String(n))},function(e){var r=n(t,e,this);if(r.done)return r.value;var a=s(e),u=String(this);if(!a.global)return c(a,u);var l=a.unicode;a.lastIndex=0;var f,d=[],p=0;while(null!==(f=c(a,u))){var h=String(f[0]);d[p]=h,""===h&&(a.lastIndex=o(u,i(a.lastIndex),l)),p++}return 0===p?null:d}]}))},"491c":function(e,t,n){"use strict";var r=n("d86e"),s=n.n(r);s.a},"4d63":function(e,t,n){var r=n("83ab"),s=n("da84"),i=n("94ca"),a=n("7156"),o=n("9bf2").f,c=n("241c").f,u=n("44e7"),l=n("ad6d"),f=n("9f7f"),d=n("6eeb"),p=n("d039"),h=n("69f3").set,v=n("2626"),g=n("b622"),m=g("match"),x=s.RegExp,b=x.prototype,y=/a/g,w=/a/g,R=new x(y)!==y,_=f.UNSUPPORTED_Y,C=r&&i("RegExp",!R||_||p((function(){return w[m]=!1,x(y)!=y||x(w)==w||"/a/i"!=x(y,"i")})));if(C){var O=function(e,t){var n,r=this instanceof O,s=u(e),i=void 0===t;if(!r&&s&&e.constructor===O&&i)return e;R?s&&!i&&(e=e.source):e instanceof O&&(i&&(t=l.call(e)),e=e.source),_&&(n=!!t&&t.indexOf("y")>-1,n&&(t=t.replace(/y/g,"")));var o=a(R?new x(e,t):x(e,t),r?this:b,O);return _&&n&&h(o,{sticky:n}),o},E=function(e){e in O||o(O,e,{configurable:!0,get:function(){return x[e]},set:function(t){x[e]=t}})},A=c(x),P=0;while(A.length>P)E(A[P++]);b.constructor=O,O.prototype=b,d(s,"RegExp",O)}v("RegExp")},"4de4":function(e,t,n){"use strict";var r=n("23e7"),s=n("b727").filter,i=n("d039"),a=n("1dde"),o=a("filter"),c=o&&!i((function(){[].filter.call({length:-1,0:1},(function(e){throw e}))}));r({target:"Array",proto:!0,forced:!o||!c},{filter:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}})},"4e82":function(e,t,n){"use strict";var r=n("23e7"),s=n("1c0b"),i=n("7b0b"),a=n("d039"),o=n("b301"),c=[],u=c.sort,l=a((function(){c.sort(void 0)})),f=a((function(){c.sort(null)})),d=o("sort"),p=l||!f||d;r({target:"Array",proto:!0,forced:p},{sort:function(e){return void 0===e?u.call(i(this)):u.call(i(this),s(e))}})},5144:function(e,t,n){},"562b":function(e,t,n){"use strict";var r=n("2703"),s=n.n(r);s.a},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var r=n("1d80"),s=n("5899"),i="["+s+"]",a=RegExp("^"+i+i+"*"),o=RegExp(i+i+"*$"),c=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(a,"")),2&e&&(n=n.replace(o,"")),n}};e.exports={start:c(1),end:c(2),trim:c(3)}},"5a34":function(e,t,n){var r=n("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},6547:function(e,t,n){var r=n("a691"),s=n("1d80"),i=function(e){return function(t,n){var i,a,o=String(s(t)),c=r(n),u=o.length;return c<0||c>=u?e?"":void 0:(i=o.charCodeAt(c),i<55296||i>56319||c+1===u||(a=o.charCodeAt(c+1))<56320||a>57343?e?o.charAt(c):i:e?o.slice(c,c+2):a-56320+(i-55296<<10)+65536)}};e.exports={codeAt:i(!1),charAt:i(!0)}},7156:function(e,t,n){var r=n("861d"),s=n("d2bb");e.exports=function(e,t,n){var i,a;return s&&"function"==typeof(i=t.constructor)&&i!==n&&r(a=i.prototype)&&a!==n.prototype&&s(e,a),e}},"7c73":function(e,t,n){var r,s=n("825a"),i=n("37e8"),a=n("7839"),o=n("d012"),c=n("1be4"),u=n("cc12"),l=n("f772"),f=">",d="<",p="prototype",h="script",v=l("IE_PROTO"),g=function(){},m=function(e){return d+h+f+e+d+"/"+h+f},x=function(e){e.write(m("")),e.close();var t=e.parentWindow.Object;return e=null,t},b=function(){var e,t=u("iframe"),n="java"+h+":";return t.style.display="none",c.appendChild(t),t.src=String(n),e=t.contentWindow.document,e.open(),e.write(m("document.F=Object")),e.close(),e.F},y=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}y=r?x(r):b();var e=a.length;while(e--)delete y[p][a[e]];return y()};o[v]=!0,e.exports=Object.create||function(e,t){var n;return null!==e?(g[p]=s(e),n=new g,g[p]=null,n[v]=e):n=y(),void 0===t?n:i(n,t)}},"7f7e":function(e,t,n){"use strict";var r=n("8cc5"),s=n.n(r);s.a},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},"8cc5":function(e,t,n){},9263:function(e,t,n){"use strict";var r=n("ad6d"),s=n("9f7f"),i=RegExp.prototype.exec,a=String.prototype.replace,o=i,c=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),u=s.UNSUPPORTED_Y||s.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],f=c||l||u;f&&(o=function(e){var t,n,s,o,f=this,d=u&&f.sticky,p=r.call(f),h=f.source,v=0,g=e;return d&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),g=String(e).slice(f.lastIndex),f.lastIndex>0&&(!f.multiline||f.multiline&&"\n"!==e[f.lastIndex-1])&&(h="(?: "+h+")",g=" "+g,v++),n=new RegExp("^(?:"+h+")",p)),l&&(n=new RegExp("^"+h+"$(?!\\s)",p)),c&&(t=f.lastIndex),s=i.call(d?n:f,g),d?s?(s.input=s.input.slice(v),s[0]=s[0].slice(v),s.index=f.lastIndex,f.lastIndex+=s[0].length):f.lastIndex=0:c&&s&&(f.lastIndex=f.global?s.index+s[0].length:t),l&&s&&s.length>1&&a.call(s[0],n,(function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(s[o]=void 0)})),s}),e.exports=o},9381:function(e,t,n){"use strict";var r=n("c007"),s=n.n(r);s.a},"9f7f":function(e,t,n){"use strict";var r=n("d039");function s(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=s("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=s("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ab13:function(e,t,n){var r=n("b622"),s=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[s]=!1,"/./"[e](t)}catch(r){}}return!1}},ac1f:function(e,t,n){"use strict";var r=n("23e7"),s=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==s},{exec:s})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,n){var r=n("83ab"),s=n("9bf2").f,i=Function.prototype,a=i.toString,o=/^\s*function ([^ (]*)/,c="name";!r||c in i||s(i,c,{configurable:!0,get:function(){try{return a.call(this).match(o)[1]}catch(e){return""}}})},bb25:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"up-down-arrows"},[n("svg",{class:{active:e.active&&!e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 14l5-5 5 5z"}})]),n("svg",{class:{active:e.active&&e.ascending},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7 10l5 5 5-5z"}})])])},s=[],i={name:"UpDownArrows",props:{active:{type:Boolean,default:!1},ascending:{type:Boolean,default:!1}}},a=i,o=(n("491c"),n("2877")),c=Object(o["a"])(a,r,s,!1,null,"1e1ecba6",null);t["a"]=c.exports},c007:function(e,t,n){},c824:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"checkbox-input"},[n("label",[e._v(" "+e._s(e.label)+" "),n("input",{attrs:{type:"checkbox"},domProps:{checked:e.value},on:{change:function(t){return e.$emit("input",t.target.checked)}}}),n("span")])])},s=[],i={name:"CheckboxInput",props:{value:{type:Boolean,default:!1},label:{type:String,default:""}}},a=i,o=(n("562b"),n("2877")),c=Object(o["a"])(a,r,s,!1,null,"70403901",null);t["a"]=c.exports},caad6:function(e,t,n){"use strict";var r=n("23e7"),s=n("4d64").includes,i=n("44d2");r({target:"Array",proto:!0},{includes:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),i("includes")},d2bb:function(e,t,n){var r=n("825a"),s=n("3bbe");e.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var e,t=!1,n={};try{e=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set,e.call(n,[]),t=n instanceof Array}catch(i){}return function(n,i){return r(n),s(i),t?e.call(n,i):n.__proto__=i,n}}():void 0)},d784:function(e,t,n){"use strict";var r=n("6eeb"),s=n("d039"),i=n("b622"),a=n("9263"),o=n("9112"),c=i("species"),u=!s((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),f=!s((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,d){var p=i(e),h=!s((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),v=h&&!s((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[c]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return t=!0,null},n[p](""),!t}));if(!h||!v||"replace"===e&&(!u||!l)||"split"===e&&!f){var g=/./[p],m=n(p,""[e],(function(e,t,n,r,s){return t.exec===a?h&&!s?{done:!0,value:g.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l}),x=m[0],b=m[1];r(String.prototype,e,x),r(RegExp.prototype,p,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}d&&o(RegExp.prototype[p],"sham",!0)}},d86e:function(e,t,n){},df75:function(e,t,n){var r=n("ca84"),s=n("7839");e.exports=Object.keys||function(e){return r(e,s)}},e25e:function(e,t,n){var r=n("23e7"),s=n("e583");r({global:!0,forced:parseInt!=s},{parseInt:s})},e583:function(e,t,n){var r=n("da84"),s=n("58a8").trim,i=n("5899"),a=r.parseInt,o=/^[+-]?0[Xx]/,c=8!==a(i+"08")||22!==a(i+"0x16");e.exports=c?function(e,t){var n=s(String(e));return a(n,t>>>0||(o.test(n)?16:10))}:a},e854:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name+" - "+e.$route.params.course+" Results",description:"Results from the "+e.$route.params.course+" course of the "+e.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues"+e.$route.params.name+"/results/"+e.$route.params.course,head:{meta:{name:"robots",content:"all"}}}}),n("h1",{attrs:{id:"league-title"}},[n("router-link",{attrs:{to:"/leagues/"+e.$route.params.name}},[e._v(e._s(e.$route.params.name))]),e._v(" - "+e._s(e.$route.params.course)+" ")],1),n("filter-menu",{on:{changed:e.filterChanged}}),n("transition",{attrs:{name:"shrink"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.filteredResults&&e.filteredResults.length>0,expression:"filteredResults && filteredResults.length > 0"}]},[n("table",[n("thead",[n("tr",[n("th",{on:{click:function(t){return e.sortBy("position")}}},[n("p",[e._v("Pos.")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"position"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("name")}}},[n("p",[e._v("Name")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"name"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("age")}}},[n("p",[e._v("Class")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"age"===e.sortedBy}})],1),n("th",{staticClass:"club",on:{click:function(t){return e.sortBy("club")}}},[n("p",[e._v("Club")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"club"===e.sortedBy}})],1),n("th",{on:{click:function(t){return e.sortBy("totalPoints")}}},[n("p",[e._v("Points")]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:"totalPoints"===e.sortedBy}})],1),e.smallWindow?n("td"):e._l(e.eventsWithResults,(function(t){return n("th",{key:e.eventsWithResults.indexOf(t),on:{click:function(n){e.sortBy("points-"+e.eventsWithResults.indexOf(t))}}},[n("p",[e._v(e._s(e.eventsWithResults.indexOf(t)+1))]),n("span",[e._v(e._s(t.name))]),n("up-down-arrow",{attrs:{ascending:e.ascendingSort,active:e.sortedBy==="points-"+e.eventsWithResults.indexOf(t)}})],1)}))],2)]),n("transition-group",{tag:"tbody",attrs:{name:"fade"}},[e._l(e.filteredResults,(function(t){return[n("tr",{key:t.name,staticClass:"normal-table-row",class:{striped:e.filteredResults.indexOf(t)%2===0},on:{click:function(n){e.toggleRow(e.filteredResults.indexOf(t))}}},[n("td",[e._v(e._s(t.position))]),n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.ageClass))]),n("td",{staticClass:"club"},[e._v(e._s(t.club))]),n("td",[e._v(e._s(t.totalPoints))]),e.smallWindow?n("td",[e.openedRows.includes(e.filteredResults.indexOf(t))?n("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})]):n("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"}}),n("path",{attrs:{d:"M0 0h24v24H0z",fill:"none"}})])]):e._l(e.eventsWithResults,(function(r){return n("td",{key:e.eventsWithResults.indexOf(r),class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(r))}},[e._v(" "+e._s(t.points[e.eventsWithResults.indexOf(r)])+" ")])}))],2),e.smallWindow&&e.openedRows.includes(e.filteredResults.indexOf(t))?n("tr",{key:t.name+"-mobile",staticClass:"mobile-table-expansion",class:{striped:e.filteredResults.indexOf(t)%2===0}},[n("td",{attrs:{colspan:"100%"}},e._l(e.eventsWithResults,(function(r){return n("p",{key:e.eventsWithResults.indexOf(r)},[e._v(" "+e._s(r.name)+": "),n("span",{class:{strikethrough:!t.largestPoints.includes(e.eventsWithResults.indexOf(r))}},[e._v(e._s(t.points[e.eventsWithResults.indexOf(r)]))])])})),0)]):e._e()]}))],2)],1),e.otherCourses.length>0?n("div",{staticClass:"card"},[n("h2",[e._v("Results for Other Courses")]),n("div",e._l(e.otherCourses,(function(t){return n("router-link",{key:t,staticClass:"button",attrs:{to:"/leagues/"+e.$route.params.name+"/results/"+t}},[e._v(" "+e._s(t)+" ")])})),1)]):e._e()])]),e.found?e._e():n("h2",[e._v("Sorry, No Results Could Be Found")])],1)},s=[],i=(n("4de4"),n("caad6"),n("c975"),n("d81d"),n("26e9"),n("fb6a"),n("4e82"),n("a434"),n("b0c0"),n("e25e"),n("4d63"),n("ac1f"),n("25f0"),n("2532"),n("466d"),n("1276"),n("96cf"),n("1da1")),a=n("bc3a"),o=n.n(a),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("accordion-dropdown",{attrs:{title:"Filter"}},[n("div",{staticClass:"half input"},[n("label",[e._v("Name:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.preferences.name,expression:"preferences.name"}],attrs:{type:"text"},domProps:{value:e.preferences.name},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"name",t.target.value)},e.onChange]}})]),n("div",{staticClass:"half input"},[n("label",[e._v("Club:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.preferences.club,expression:"preferences.club"}],attrs:{type:"text"},domProps:{value:e.preferences.club},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"club",t.target.value)},e.onChange]}})]),n("div",{staticClass:"quarter input"},[n("label",[e._v("Min Age:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.preferences.minAge,expression:"preferences.minAge",modifiers:{number:!0}}],attrs:{type:"number",min:"0",max:"120"},domProps:{value:e.preferences.minAge},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"minAge",e._n(t.target.value))},e.onChange],blur:function(t){return e.$forceUpdate()}}})]),n("div",{staticClass:"quarter input"},[n("label",[e._v("Max Age:")]),n("input",{directives:[{name:"model",rawName:"v-model.number",value:e.preferences.maxAge,expression:"preferences.maxAge",modifiers:{number:!0}}],attrs:{type:"number",min:"0",max:"120"},domProps:{value:e.preferences.maxAge},on:{input:[function(t){t.target.composing||e.$set(e.preferences,"maxAge",e._n(t.target.value))},e.onChange],blur:function(t){return e.$forceUpdate()}}})]),n("checkbox",{staticClass:"quarter",attrs:{label:"Male:"},on:{input:e.onChange},model:{value:e.preferences.male,callback:function(t){e.$set(e.preferences,"male",t)},expression:"preferences.male"}}),n("checkbox",{staticClass:"quarter",attrs:{label:"Female:"},on:{input:e.onChange},model:{value:e.preferences.female,callback:function(t){e.$set(e.preferences,"female",t)},expression:"preferences.female"}})],1)},u=[],l=n("c824"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"accordion"}},[n("div",{staticClass:"accordion-head",on:{click:function(t){e.accordionOpen=!e.accordionOpen}}},[n("h2",[e._v(e._s(e.title))]),n("svg",{class:{rotate:e.accordionOpen},attrs:{viewBox:"0 0 24 24"}},[n("path",{attrs:{d:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}}),n("path",{attrs:{fill:"none",d:"M0 0h24v24H0V0z"}})])]),n("transition",{attrs:{name:"shrink"}},[e.accordionOpen?n("div",{key:"1",staticClass:"accordion-body"},[e._t("default")],2):e._e()])],1)},d=[],p={props:{title:{type:String,default:"Title"}},data:function(){return{accordionOpen:!1}}},h=p,v=(n("9381"),n("2877")),g=Object(v["a"])(h,f,d,!1,null,"b099cdcc",null),m=g.exports,x={components:{Checkbox:l["a"],AccordionDropdown:m},data:function(){return{preferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},methods:{onChange:function(){this.$emit("changed",this.preferences)}}},b=x,y=(n("04f9"),Object(v["a"])(b,c,u,!1,null,"34cf92c8",null)),w=y.exports,R=n("bb25"),_={components:{FilterMenu:w,UpDownArrow:R["a"]},data:function(){return{smallWindow:!1,found:!0,openedRows:[],rawResults:[],events:[],otherCourses:[],sortedBy:"position",ascendingSort:!1,filterPreferences:{name:"",club:"",minAge:0,maxAge:100,male:!0,female:!0}}},computed:{resultsWithAgeClassSplit:function(){return this.rawResults.map((function(e){return e.ageClass&&(e.gender=e.ageClass[0],e.age=parseInt(e.ageClass.slice(1))),e}))},sortedResults:function(){var e=this.sortedBy;return this.sortedBy.includes("points-")&&(e=parseInt(e.split("-")[1])),this.sort(this.resultsWithAgeClassSplit,e,this.ascendingSort,this.sortedBy.includes("points-"))},filteredResults:function(){var e=this;return this.sortedResults.filter((function(t){return t.name.match(new RegExp(e.filterPreferences.name,"i"))})).filter((function(t){return t.club.match(new RegExp(e.filterPreferences.club,"i"))})).filter((function(t){return 100===e.filterPreferences.maxAge&&0===e.filterPreferences.minAge||e.filterPreferences.minAge<=t.age&&t.age<=e.filterPreferences.maxAge})).filter((function(t){return e.filterPreferences.male&&e.filterPreferences.female||e.filterPreferences.male&&"M"===t.gender||e.filterPreferences.female&&"W"===t.gender}))},eventsWithResults:function(){return this.events.filter((function(e){return e.resultUploaded}))}},watch:{$route:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.rawResults=[],this.openedRows=[],e.next=4,this.getResults();case 4:return e.next=6,this.getEventList();case 6:this.getOtherCourses();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return window.addEventListener("resize",this.handleResize),this.handleResize(),e.next=4,this.getResults();case 4:return e.next=6,this.getEventList();case 6:this.getOtherCourses();case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),destroyed:function(){window.removeEventListener("resize",this.handleResize)},methods:{handleResize:function(){window.innerWidth>900?this.smallWindow=!1:this.smallWindow=!0},getResults:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name+"/results/"+this.$route.params.course).then((function(t){t.data.length>0?e.rawResults=t.data:e.found=!1})).catch((function(){e.found=!1}))},getOtherCourses:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name).then((function(t){t.data.courses?e.otherCourses=t.data.courses.filter((function(t){return t!==e.$route.params.course})):e.otherCourses=!1})).catch((function(){e.otherCourses=!1}))},getEventList:function(){var e=this;return o.a.get("/api/leagues/"+this.$route.params.name+"/events").then((function(t){e.events=t.data})).catch((function(){return e.$messages.addMessage("Problem Fetching List of Events")}))},sort:function(e,t){var n,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],s=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n=s?function(e,n){return e.points[t]===n.points[t]?0:null===e.points[t]?1:null===n.points[t]?-1:e.points[t]<n.points[t]?1:-1}:function(e,n){return e[t]===n[t]?0:null===e[t]||void 0===e[t]?1:null===n[t]||void 0===n[t]?-1:e[t]<n[t]?1:-1},r?e.sort(n):e.sort(n).reverse()},sortBy:function(e){this.openedRows=[],e!==this.sortedBy?this.ascendingSort=!1:this.ascendingSort=!this.ascendingSort,this.sortedBy=e},filterChanged:function(e){this.filterPreferences.name=e.name,this.filterPreferences.club=e.club,""===e.minAge?this.filterPreferences.minAge=0:this.filterPreferences.minAge=e.minAge,""===e.maxAge?this.filterPreferences.maxAge=100:this.filterPreferences.maxAge=e.maxAge,this.filterPreferences.male=e.male,this.filterPreferences.female=e.female},toggleRow:function(e){var t=this.openedRows.indexOf(e);t>-1?this.openedRows.splice(t,1):this.openedRows.push(e)}}},C=_,O=(n("7f7e"),Object(v["a"])(C,r,s,!1,null,"906d3d7e",null));t["default"]=O.exports},fb6a:function(e,t,n){"use strict";var r=n("23e7"),s=n("861d"),i=n("e8b5"),a=n("23cb"),o=n("50c4"),c=n("fc6a"),u=n("8418"),l=n("1dde"),f=n("b622"),d=f("species"),p=[].slice,h=Math.max;r({target:"Array",proto:!0,forced:!l("slice")},{slice:function(e,t){var n,r,l,f=c(this),v=o(f.length),g=a(e,v),m=a(void 0===t?v:t,v);if(i(f)&&(n=f.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)?s(n)&&(n=n[d],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return p.call(f,g,m);for(r=new(void 0===n?Array:n)(h(m-g,0)),l=0;g<m;g++,l++)g in f&&u(r,l,f[g]);return r.length=l,r}})}}]);
//# sourceMappingURL=chunk-eed6a8ec-legacy.69da37b5.js.map