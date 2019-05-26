(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1af5b678"],{"230e":function(e,t,n){var r=n("d3f4"),a=n("7726").document,o=r(a)&&r(a.createElement);e.exports=function(e){return o?a.createElement(e):{}}},6532:function(e,t,n){"use strict";var r=n("d7c3"),a=n.n(r);a.a},"6a99":function(e,t,n){var r=n("d3f4");e.exports=function(e,t){if(!r(e))return e;var n,a;if(t&&"function"==typeof(n=e.toString)&&!r(a=n.call(e)))return a;if("function"==typeof(n=e.valueOf)&&!r(a=n.call(e)))return a;if(!t&&"function"==typeof(n=e.toString)&&!r(a=n.call(e)))return a;throw TypeError("Can't convert object to primitive value")}},7726:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"79e5":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"7f7f":function(e,t,n){var r=n("86cc").f,a=Function.prototype,o=/^\s*function ([^ (]*)/,i="name";i in a||n("9e1e")&&r(a,i,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},"86cc":function(e,t,n){var r=n("cb7c"),a=n("c69a"),o=n("6a99"),i=Object.defineProperty;t.f=n("9e1e")?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),a)try{return i(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},"8b26":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.league?n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"}}),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.name))]),t.date?n("p",[e._v("\n        On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+" organised by "+e._s(t.organiser)+"\n      ")]):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v("\n        More Information can be found at\n        "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(t.website))])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])})],2):e._e(),e.league?e._e():n("not-found")],1)},a=[],o=(n("7f7f"),n("96cf"),n("3b8d")),i=n("bc3a"),s=n.n(i),u=function(){return n.e("chunk-164ca264").then(n.bind(null,"9703"))},c={components:{NotFound:u},data:function(){return{league:{},events:[]}},watch:{$route:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:function(e){return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){var e=this;return s.a.get("/api/leagues/"+this.$route.params.name).then(function(t){e.league=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting League Details")})},getLeagueEvents:function(){var e=this;return!!this.league&&s.a.get("/api/leagues/"+this.league.name+"/events").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting Event Details")})}}},f=c,l=(n("6532"),n("2877")),p=Object(l["a"])(f,r,a,!1,null,"c452beca",null);t["default"]=p.exports},"9e1e":function(e,t,n){e.exports=!n("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},c69a:function(e,t,n){e.exports=!n("9e1e")&&!n("79e5")(function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a})},cb7c:function(e,t,n){var r=n("d3f4");e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},d3f4:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}},d7c3:function(e,t,n){}}]);
//# sourceMappingURL=chunk-1af5b678-legacy.c2b7c31d.js.map