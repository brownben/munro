(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f51f698"],{"02f4":function(t,e,n){var r=n("4588"),o=n("be13");t.exports=function(t){return function(e,n){var i,u,a=String(o(e)),c=r(n),s=a.length;return c<0||c>=s?t?"":void 0:(i=a.charCodeAt(c),i<55296||i>56319||c+1===s||(u=a.charCodeAt(c+1))<56320||u>57343?t?a.charAt(c):i:t?a.slice(c,c+2):u-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),o=n("32e9"),i=n("79e5"),u=n("be13"),a=n("2b4c"),c=n("520a"),s=a("species"),f=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),l=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var p=a(t),d=!i(function(){var e={};return e[p]=function(){return 7},7!=""[t](e)}),v=d?!i(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[s]=function(){return n}),n[p](""),!e}):void 0;if(!d||!v||"replace"===t&&!f||"split"===t&&!l){var g=/./[p],h=n(u,p,""[t],function(t,e,n,r,o){return e.exec===c?d&&!o?{done:!0,value:g.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}}),b=h[0],x=h[1];r(String.prototype,t,b),o(RegExp.prototype,p,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}}},"230e":function(t,e,n){var r=n("d3f4"),o=n("7726").document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},"23c6":function(t,e,n){var r=n("2d95"),o=n("2b4c")("toStringTag"),i="Arguments"==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},"2aba":function(t,e,n){var r=n("7726"),o=n("32e9"),i=n("69a8"),u=n("ca5a")("src"),a=n("fa5b"),c="toString",s=(""+a).split(c);n("8378").inspectSource=function(t){return a.call(t)},(t.exports=function(t,e,n,a){var c="function"==typeof n;c&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(c&&(i(n,u)||o(n,u,t[e]?""+t[e]:s.join(String(e)))),t===r?t[e]=n:a?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,c,function(){return"function"==typeof this&&this[u]||a.call(this)})},"2b4c":function(t,e,n){var r=n("5537")("wks"),o=n("ca5a"),i=n("7726").Symbol,u="function"==typeof i,a=t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))};a.store=r},"2d00":function(t,e){t.exports=!1},"2d95":function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},"32e9":function(t,e,n){var r=n("86cc"),o=n("4630");t.exports=n("9e1e")?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},4588:function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},4630:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},"4bf8":function(t,e,n){var r=n("be13");t.exports=function(t){return Object(r(t))}},"520a":function(t,e,n){"use strict";var r=n("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,u=o,a="lastIndex",c=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t[a]||0!==e[a]}(),s=void 0!==/()??/.exec("")[1],f=c||s;f&&(u=function(t){var e,n,u,f,l=this;return s&&(n=new RegExp("^"+l.source+"$(?!\\s)",r.call(l))),c&&(e=l[a]),u=o.call(l,t),c&&u&&(l[a]=l.global?u.index+u[0].length:e),s&&u&&u.length>1&&i.call(u[0],n,function(){for(f=1;f<arguments.length-2;f++)void 0===arguments[f]&&(u[f]=void 0)}),u}),t.exports=u},5537:function(t,e,n){var r=n("8378"),o=n("7726"),i="__core-js_shared__",u=o[i]||(o[i]={});(t.exports=function(t,e){return u[t]||(u[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n("2d00")?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},"5ca1":function(t,e,n){var r=n("7726"),o=n("8378"),i=n("32e9"),u=n("2aba"),a=n("9b43"),c="prototype",s=function(t,e,n){var f,l,p,d,v=t&s.F,g=t&s.G,h=t&s.S,b=t&s.P,x=t&s.B,m=g?r:h?r[e]||(r[e]={}):(r[e]||{})[c],y=g?o:o[e]||(o[e]={}),w=y[c]||(y[c]={});for(f in g&&(n=e),n)l=!v&&m&&void 0!==m[f],p=(l?m:n)[f],d=x&&l?a(p,r):b&&"function"==typeof p?a(Function.call,p):p,m&&u(m,f,p,t&s.U),y[f]!=p&&i(y,f,d),b&&w[f]!=p&&(w[f]=p)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),o=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"69a8":function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},"6a99":function(t,e,n){var r=n("d3f4");t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},7726:function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"79e5":function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},8378:function(t,e){var n=t.exports={version:"2.6.8"};"number"==typeof __e&&(__e=n)},"86cc":function(t,e,n){var r=n("cb7c"),o=n("c69a"),i=n("6a99"),u=Object.defineProperty;e.f=n("9e1e")?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},"9b43":function(t,e,n){var r=n("d8e8");t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},"9def":function(t,e,n){var r=n("4588"),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},"9e1e":function(t,e,n){t.exports=!n("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},a481:function(t,e,n){"use strict";var r=n("cb7c"),o=n("4bf8"),i=n("9def"),u=n("4588"),a=n("0390"),c=n("5f1b"),s=Math.max,f=Math.min,l=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,d=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,function(t,e,n,g){return[function(r,o){var i=t(this),u=void 0==r?void 0:r[e];return void 0!==u?u.call(r,i,o):n.call(String(i),r,o)},function(t,e){var o=g(n,t,this,e);if(o.done)return o.value;var l=r(t),p=String(this),d="function"===typeof e;d||(e=String(e));var b=l.global;if(b){var x=l.unicode;l.lastIndex=0}var m=[];while(1){var y=c(l,p);if(null===y)break;if(m.push(y),!b)break;var w=String(y[0]);""===w&&(l.lastIndex=a(p,i(l.lastIndex),x))}for(var S="",_=0,E=0;E<m.length;E++){y=m[E];for(var $=String(y[0]),k=s(f(u(y.index),p.length),0),M=[],P=1;P<y.length;P++)M.push(v(y[P]));var j=y.groups;if(d){var A=[$].concat(M,k,p);void 0!==j&&A.push(j);var R=String(e.apply(void 0,A))}else R=h($,p,k,M,j,e);k>=_&&(S+=p.slice(_,k)+R,_=k+$.length)}return S+p.slice(_)}];function h(t,e,r,i,u,a){var c=r+t.length,s=i.length,f=d;return void 0!==u&&(u=o(u),f=p),n.call(a,f,function(n,o){var a;switch(o.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(c);case"<":a=u[o.slice(1,-1)];break;default:var f=+o;if(0===f)return n;if(f>s){var p=l(f/10);return 0===p?n:p<=s?void 0===i[p-1]?o.charAt(1):i[p-1]+o.charAt(1):n}a=i[f-1]}return void 0===a?"":a})}})},a55b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("vue-headful",{attrs:{title:"Munro - Login",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",[t._v("Admin Login")]),n("form",{on:{submit:function(e){return e.preventDefault(),t.sendLoginRequest()}}},[n("label",[t._v("Email Address:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{type:"email"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}}),n("label",[t._v("Password:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),n("button",[t._v("Login")])]),n("div",{attrs:{id:"link-to-upload"}},[n("b",[t._v("Looking for Results Upload?")]),n("p",[t._v("\n      Results are uploaded\n      "),n("router-link",{attrs:{to:"/upload"}},[t._v("here")])],1)])],1)},o=[],i=(n("a481"),n("7013")),u={data:function(){return{username:"",password:""}},mounted:function(){this.$auth.user&&(this.$messages.addMessage("You Are Already Logged In"),this.$router.push("/")),this.blankFields(),this.$route.query.redirect&&this.$messages.addMessage("Please Login to Access that Page")},methods:{blankFields:function(){this.username="",this.password=""},validateLogin:function(){return""!==this.username&&""!==this.password},sendLoginRequest:function(){var t=this;if(this.validateLogin())return i["a"].login(this.username,this.password).then(function(e){e&&t.$router.replace(t.$route.query.redirect||"/"),t.$messages.addMessage("Hello"),t.blankFields()}).catch(function(){return t.$messages.addMessage("Error: Problem Logging In - Please Try Again")});this.$messages.addMessage("Problem: Username or Password were left Blank")}}},a=u,c=(n("f170"),n("2877")),s=Object(c["a"])(a,r,o,!1,null,"d65604de",null);e["default"]=s.exports},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},b911:function(t,e,n){},be13:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},c69a:function(t,e,n){t.exports=!n("9e1e")&&!n("79e5")(function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a})},ca5a:function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},cb7c:function(t,e,n){var r=n("d3f4");t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},d3f4:function(t,e){t.exports=function(t){return"object"===typeof t?null!==t:"function"===typeof t}},d8e8:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},f170:function(t,e,n){"use strict";var r=n("b911"),o=n.n(r);o.a},fa5b:function(t,e,n){t.exports=n("5537")("native-function-to-string",Function.toString)}}]);
//# sourceMappingURL=chunk-6f51f698-legacy.54a7823c.js.map