(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4eb15240"],{"02f4":function(e,t,r){var n=r("4588"),a=r("be13");e.exports=function(e){return function(t,r){var o,i,s=String(a(t)),u=n(r),c=s.length;return u<0||u>=c?e?"":void 0:(o=s.charCodeAt(u),o<55296||o>56319||u+1===c||(i=s.charCodeAt(u+1))<56320||i>57343?e?s.charAt(u):o:e?s.slice(u,u+2):i-56320+(o-55296<<10)+65536)}}},"0390":function(e,t,r){"use strict";var n=r("02f4")(!0);e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},"0bfb":function(e,t,r){"use strict";var n=r("cb7c");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},"214f":function(e,t,r){"use strict";r("b0c5");var n=r("2aba"),a=r("32e9"),o=r("79e5"),i=r("be13"),s=r("2b4c"),u=r("520a"),c=s("species"),l=!o(function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}),d=function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2===r.length&&"a"===r[0]&&"b"===r[1]}();e.exports=function(e,t,r){var f=s(e),p=!o(function(){var t={};return t[f]=function(){return 7},7!=""[e](t)}),v=p?!o(function(){var t=!1,r=/a/;return r.exec=function(){return t=!0,null},"split"===e&&(r.constructor={},r.constructor[c]=function(){return r}),r[f](""),!t}):void 0;if(!p||!v||"replace"===e&&!l||"split"===e&&!d){var g=/./[f],h=r(i,f,""[e],function(e,t,r,n,a){return t.exec===u?p&&!a?{done:!0,value:g.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),b=h[0],m=h[1];n(String.prototype,e,b),a(RegExp.prototype,f,2==t?function(e,t){return m.call(e,this,t)}:function(e){return m.call(e,this)})}}},"520a":function(e,t,r){"use strict";var n=r("0bfb"),a=RegExp.prototype.exec,o=String.prototype.replace,i=a,s="lastIndex",u=function(){var e=/a/,t=/b*/g;return a.call(e,"a"),a.call(t,"a"),0!==e[s]||0!==t[s]}(),c=void 0!==/()??/.exec("")[1],l=u||c;l&&(i=function(e){var t,r,i,l,d=this;return c&&(r=new RegExp("^"+d.source+"$(?!\\s)",n.call(d))),u&&(t=d[s]),i=a.call(d,e),u&&i&&(d[s]=d.global?i.index+i[0].length:t),c&&i&&i.length>1&&o.call(i[0],r,function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(i[l]=void 0)}),i}),e.exports=i},"5f1b":function(e,t,r){"use strict";var n=r("23c6"),a=RegExp.prototype.exec;e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var o=r.call(e,t);if("object"!==typeof o)throw new TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw new TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},a481:function(e,t,r){"use strict";var n=r("cb7c"),a=r("4bf8"),o=r("9def"),i=r("4588"),s=r("0390"),u=r("5f1b"),c=Math.max,l=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,v=function(e){return void 0===e?e:String(e)};r("214f")("replace",2,function(e,t,r,g){return[function(n,a){var o=e(this),i=void 0==n?void 0:n[t];return void 0!==i?i.call(n,o,a):r.call(String(o),n,a)},function(e,t){var a=g(r,e,this,t);if(a.done)return a.value;var d=n(e),f=String(this),p="function"===typeof t;p||(t=String(t));var b=d.global;if(b){var m=d.unicode;d.lastIndex=0}var x=[];while(1){var w=u(d,f);if(null===w)break;if(x.push(w),!b)break;var y=String(w[0]);""===y&&(d.lastIndex=s(f,o(d.lastIndex),m))}for(var $="",k=0,E=0;E<x.length;E++){w=x[E];for(var A=String(w[0]),R=c(l(i(w.index),f.length),0),L=[],S=1;S<w.length;S++)L.push(v(w[S]));var M=w.groups;if(p){var P=[A].concat(L,R,f);void 0!==M&&P.push(M);var _=String(t.apply(void 0,P))}else _=h(A,f,R,L,M,t);R>=k&&($+=f.slice(k,R)+_,k=R+A.length)}return $+f.slice(k)}];function h(e,t,n,o,i,s){var u=n+e.length,c=o.length,l=p;return void 0!==i&&(i=a(i),l=f),r.call(s,l,function(r,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(u);case"<":s=i[a.slice(1,-1)];break;default:var l=+a;if(0===l)return r;if(l>c){var f=d(l/10);return 0===f?r:f<=c?void 0===o[f-1]?a.charAt(1):o[f-1]+a.charAt(1):r}s=o[l-1]}return void 0===s?"":s})}})},a55b:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("vue-headful",{attrs:{title:"Munro - Login",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),r("h1",[e._v("Admin Login")]),r("form",{on:{submit:function(t){return t.preventDefault(),e.sendLoginRequest()}}},[r("label",[e._v("Email Address:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"email"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),r("label",[e._v("Password:")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),r("button",[e._v("Login")])]),r("div",{attrs:{id:"link-to-upload"}},[r("b",[e._v("Looking for Results Upload?")]),r("p",[e._v("\n      Results are uploaded\n      "),r("router-link",{attrs:{to:"/upload"}},[e._v("here")])],1)])],1)},a=[],o=(r("a481"),r("7013")),i={data:function(){return{username:"",password:""}},mounted:function(){this.$auth.user&&(this.$messages.addMessage("You Are Already Logged In"),this.$router.push("/")),this.blankFields(),this.$route.query.redirect&&this.$messages.addMessage("Please Login to Access that Page")},methods:{blankFields:function(){this.username="",this.password=""},validateLogin:function(){return""!==this.username&&""!==this.password},sendLoginRequest:function(){var e=this;if(this.validateLogin())return o["a"].login(this.username,this.password).then(function(t){t&&e.$router.replace(e.$route.query.redirect||"/"),e.$messages.addMessage("Hello"),e.blankFields()}).catch(function(){return e.$messages.addMessage("Error: Problem Logging In - Please Try Again")});this.$messages.addMessage("Problem: Username or Password were left Blank")}}},s=i,u=(r("f170"),r("2877")),c=Object(u["a"])(s,n,a,!1,null,"d65604de",null);t["default"]=c.exports},b0c5:function(e,t,r){"use strict";var n=r("520a");r("5ca1")({target:"RegExp",proto:!0,forced:n!==/./.exec},{exec:n})},b911:function(e,t,r){},f170:function(e,t,r){"use strict";var n=r("b911"),a=r.n(n);a.a}}]);
//# sourceMappingURL=chunk-4eb15240-legacy.b4f3ad0d.js.map