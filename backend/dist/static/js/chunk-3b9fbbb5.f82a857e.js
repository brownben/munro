(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b9fbbb5"],{"1da1":function(e,t,n){"use strict";function a(e,t,n,a,s,r,o){try{var i=e[r](o),u=i.value}catch(l){return void n(l)}i.done?t(u):Promise.resolve(u).then(a,s)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(s,r){var o=e.apply(t,n);function i(e){a(o,s,r,i,u,"next",e)}function u(e){a(o,s,r,i,u,"throw",e)}i(void 0)})}}n.d(t,"a",function(){return s})},"8b26":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.league?n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",head:{meta:{name:"robots",content:"noindex"}}}}),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.name))]),t.date?n("p",[e._v("\n        On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+" organised by "+e._s(t.organiser)+"\n      ")]):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v("\n        More Information can be found at\n        "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(t.website))])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])})],2):e._e(),e.league?e._e():n("not-found")],1)},s=[],r=n("1da1"),o=n("bc3a"),i=n.n(o);const u=()=>n.e("chunk-10545b19").then(n.bind(null,"9703"));var l={components:{NotFound:u},data:function(){return{league:{},events:[]}},watch:{$route:function(){var e=Object(r["a"])(function*(){yield this.getLeague(),this.getLeagueEvents()});function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(r["a"])(function*(){yield this.getLeague(),this.getLeagueEvents()});function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){return i.a.get("/api/leagues/"+this.$route.params.name).then(e=>{this.league=e.data}).catch(()=>this.$messages.addMessage("Problem Getting League Details"))},getLeagueEvents:function(){return!!this.league&&i.a.get("/api/leagues/"+this.league.name+"/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details"))}}},c=l,d=(n("f44f"),n("2877")),f=Object(d["a"])(c,a,s,!1,null,"8cb12030",null);t["default"]=f.exports},"911c":function(e,t,n){},f44f:function(e,t,n){"use strict";var a=n("911c"),s=n.n(a);s.a}}]);
//# sourceMappingURL=chunk-3b9fbbb5.f82a857e.js.map