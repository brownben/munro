(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6c6d66e2"],{"14c3":function(e,t,n){var r=n("c6b6"),a=n("9263");e.exports=function(e,t){var n=e.exec;if("function"===typeof n){var i=n.call(e,t);if("object"!==typeof i)throw TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},5319:function(e,t,n){"use strict";var r=n("d784"),a=n("825a"),i=n("7b0b"),o=n("50c4"),s=n("a691"),u=n("1d80"),c=n("8aa5"),l=n("14c3"),d=Math.max,f=Math.min,p=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,g=/\$([$&'`]|\d\d?)/g,h=function(e){return void 0===e?e:String(e)};r("replace",2,(function(e,t,n,r){return[function(n,r){var a=u(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,a,r):t.call(String(a),n,r)},function(e,i){if(r.REPLACE_KEEPS_$0||"string"===typeof i&&-1===i.indexOf("$0")){var u=n(t,e,this,i);if(u.done)return u.value}var p=a(e),v=String(this),g="function"===typeof i;g||(i=String(i));var m=p.global;if(m){var b=p.unicode;p.lastIndex=0}var E=[];while(1){var w=l(p,v);if(null===w)break;if(E.push(w),!m)break;var y=String(w[0]);""===y&&(p.lastIndex=c(v,o(p.lastIndex),b))}for(var $="",R=0,A=0;A<E.length;A++){w=E[A];for(var I=String(w[0]),P=d(f(s(w.index),v.length),0),_=[],k=1;k<w.length;k++)_.push(h(w[k]));var S=w.groups;if(g){var L=[I].concat(_,P,v);void 0!==S&&L.push(S);var M=String(i.apply(void 0,L))}else M=x(I,v,P,_,S,i);P>=R&&($+=v.slice(R,P)+M,R=P+I.length)}return $+v.slice(R)}];function x(e,n,r,a,o,s){var u=r+e.length,c=a.length,l=g;return void 0!==o&&(o=i(o),l=v),t.call(s,l,(function(t,i){var s;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return n.slice(0,r);case"'":return n.slice(u);case"<":s=o[i.slice(1,-1)];break;default:var l=+i;if(0===l)return t;if(l>c){var d=p(l/10);return 0===d?t:d<=c?void 0===a[d-1]?i.charAt(1):a[d-1]+i.charAt(1):t}s=a[l-1]}return void 0===s?"":s}))}}))},6547:function(e,t,n){var r=n("a691"),a=n("1d80"),i=function(e){return function(t,n){var i,o,s=String(a(t)),u=r(n),c=s.length;return u<0||u>=c?e?"":void 0:(i=s.charCodeAt(u),i<55296||i>56319||u+1===c||(o=s.charCodeAt(u+1))<56320||o>57343?e?s.charAt(u):i:e?s.slice(u,u+2):o-56320+(i-55296<<10)+65536)}};e.exports={codeAt:i(!1),charAt:i(!0)}},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},9263:function(e,t,n){"use strict";var r=n("ad6d"),a=n("9f7f"),i=RegExp.prototype.exec,o=String.prototype.replace,s=i,u=function(){var e=/a/,t=/b*/g;return i.call(e,"a"),i.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),c=a.UNSUPPORTED_Y||a.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],d=u||l||c;d&&(s=function(e){var t,n,a,s,d=this,f=c&&d.sticky,p=r.call(d),v=d.source,g=0,h=e;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(v="(?: "+v+")",h=" "+h,g++),n=new RegExp("^(?:"+v+")",p)),l&&(n=new RegExp("^"+v+"$(?!\\s)",p)),u&&(t=d.lastIndex),a=i.call(f?n:d,h),f?a?(a.input=a.input.slice(g),a[0]=a[0].slice(g),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:u&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),l&&a&&a.length>1&&o.call(a[0],n,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(a[s]=void 0)})),a}),e.exports=s},"9f7f":function(e,t,n){"use strict";var r=n("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=r((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a55b:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - Login",description:"",head:{meta:{name:"robots",content:"noindex"}}}}),n("h1",[e._v("Admin Login")]),n("form",{on:{submit:function(t){return t.preventDefault(),e.sendLoginRequest(t)}}},[n("label",[e._v("Email Address:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"email"},domProps:{value:e.username},on:{input:function(t){t.target.composing||(e.username=t.target.value)}}}),n("label",[e._v("Password:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}}),n("button",[e._v("Login")])]),n("div",{attrs:{id:"link-to-upload"}},[n("b",[e._v("Looking for Results Upload?")]),n("p",[e._v(" Results are uploaded "),n("router-link",{attrs:{to:"/upload"}},[e._v("here")])],1)])],1)},a=[],i=(n("ac1f"),n("5319"),n("7013")),o={data:function(){return{username:"",password:""}},mounted:function(){this.$auth.user&&(this.$messages.addMessage("You Are Already Logged In"),this.$router.push("/")),this.blankFields(),this.$route.query.redirect&&this.$messages.addMessage("Please Login to Access that Page")},methods:{blankFields:function(){this.username="",this.password=""},validateLogin:function(){return""!==this.username&&""!==this.password},sendLoginRequest:function(){var e=this;if(this.validateLogin())return i["a"].login(this.username,this.password).then((function(t){t&&e.$router.replace(e.$route.query.redirect||"/"),e.$messages.addMessage("Hello"),e.blankFields()})).catch((function(){return e.$messages.addMessage("Error: Problem Logging In - Please Try Again")}));this.$messages.addMessage("Problem: Username or Password were left Blank")}}},s=o,u=(n("fb3b"),n("2877")),c=Object(u["a"])(s,r,a,!1,null,"07ae97bc",null);t["default"]=c.exports},ac1f:function(e,t,n){"use strict";var r=n("23e7"),a=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},d784:function(e,t,n){"use strict";var r=n("6eeb"),a=n("d039"),i=n("b622"),o=n("9263"),s=n("9112"),u=i("species"),c=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),d=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));e.exports=function(e,t,n,f){var p=i(e),v=!a((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),g=v&&!a((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[u]=function(){return n},n.flags="",n[p]=/./[p]),n.exec=function(){return t=!0,null},n[p](""),!t}));if(!v||!g||"replace"===e&&(!c||!l)||"split"===e&&!d){var h=/./[p],x=n(p,""[e],(function(e,t,n,r,a){return t.exec===o?v&&!a?{done:!0,value:h.call(t,n,r)}:{done:!0,value:e.call(n,t,r)}:{done:!1}}),{REPLACE_KEEPS_$0:l}),m=x[0],b=x[1];r(String.prototype,e,m),r(RegExp.prototype,p,2==t?function(e,t){return b.call(e,this,t)}:function(e){return b.call(e,this)})}f&&s(RegExp.prototype[p],"sham",!0)}},e46a:function(e,t,n){},fb3b:function(e,t,n){"use strict";var r=n("e46a"),a=n.n(r);a.a}}]);
//# sourceMappingURL=chunk-6c6d66e2-legacy.46efabc8.js.map