(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4b28d58"],{"06ec":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("vue-headful",{attrs:{title:"Munro - Leagues",description:"League Results on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues",head:{meta:{name:"robots",content:"all"}}}}),a("h1",[e._v("Leagues")]),a("div",{attrs:{id:"leagues"}},e._l(e.leagues,(function(t){return a("div",{key:t.name,staticClass:"league"},[t.logo?a("img",{attrs:{src:t.logo,alt:"The Logo of "+t.name,height:"150px"}}):e._e(),a("h1",[e._v(e._s(t.name))]),t.description?a("p",[e._v(e._s(t.description))]):e._e(),t.website?a("p",[e._v(" More information can be found "),a("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v("here")])]):e._e(),a("router-link",{staticClass:"button",attrs:{to:"/leagues/"+t.name}},[e._v("View League")])],1)})),0)],1)},s=[],n=(a("26e9"),a("bc3a")),u=a.n(n),i={data(){return{leagues:[]}},created:function(){this.getLeagues()},methods:{getLeagues:function(){return u.a.get("/api/leagues").then(e=>{this.leagues=e.data.reverse()}).catch(()=>this.$messages.addMessage("Problem Fetching League Details"))}}},o=i,c=(a("8edc"),a("2877")),l=Object(c["a"])(o,r,s,!1,null,"63430c96",null);t["default"]=l.exports},"09ac":function(e,t,a){},"26e9":function(e,t,a){"use strict";var r=a("23e7"),s=a("e8b5"),n=[].reverse,u=[1,2];r({target:"Array",proto:!0,forced:String(u)===String(u.reverse())},{reverse:function(){return s(this)&&(this.length=this.length),n.call(this)}})},"8edc":function(e,t,a){"use strict";var r=a("09ac"),s=a.n(r);s.a},e8b5:function(e,t,a){var r=a("c6b6");e.exports=Array.isArray||function(e){return"Array"==r(e)}}}]);
//# sourceMappingURL=chunk-a4b28d58.b0f92bb3.js.map