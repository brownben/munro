(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c8af4a0"],{"7f7f":function(e,t,n){var a=n("86cc").f,r=Function.prototype,s=/^\s*function ([^ (]*)/,o="name";o in r||n("9e1e")&&a(r,o,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},"8b26":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.league?n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",head:{meta:{name:"robots",content:"noindex"}}}}),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.name))]),t.date?n("p",[e._v("\n        On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+" organised by "+e._s(t.organiser)+"\n      ")]):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v("\n        More Information can be found at\n        "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(t.website))])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])})],2):e._e(),e.league?e._e():n("not-found")],1)},r=[],s=(n("7f7f"),n("96cf"),n("3b8d")),o=n("bc3a"),i=n.n(o),u=function(){return n.e("chunk-10545b19").then(n.bind(null,"9703"))},c={components:{NotFound:u},data:function(){return{league:{},events:[]}},watch:{$route:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:function(e){return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){var e=this;return i.a.get("/api/leagues/"+this.$route.params.name).then(function(t){e.league=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting League Details")})},getLeagueEvents:function(){var e=this;return!!this.league&&i.a.get("/api/leagues/"+this.league.name+"/events").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting Event Details")})}}},l=c,f=(n("f44f"),n("2877")),g=Object(f["a"])(l,a,r,!1,null,"8cb12030",null);t["default"]=g.exports},"911c":function(e,t,n){},f44f:function(e,t,n){"use strict";var a=n("911c"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-8c8af4a0-legacy.7e5db910.js.map