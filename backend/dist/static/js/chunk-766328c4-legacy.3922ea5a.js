(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-766328c4"],{4120:function(e,t,n){},"4f6f":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - Latest Results",description:"The latest results from events on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/latest-results",head:{meta:{name:"robots",content:"all"}}}}),n("h1",[e._v("Latest Results")]),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.league)+" - "+e._s(t.name))]),t.date?n("p",[e._v("\n      On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+"\n      "),t.organiser?[e._v("\n        organised by "+e._s(t.organiser)+"\n      ")]:e._e()],2):e._e(),t.website?n("p",[e._v("\n      More Information can be found at\n      "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(t.website))])]):e._e(),n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()])])})],2)},r=[],a=(n("96cf"),n("3b8d")),i=n("bc3a"),o=n.n(i),u={data:function(){return{events:[]}},watch:{$route:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.getEventsWithResults();case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(a["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.getEventsWithResults();case 1:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:function(e){return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getEventsWithResults:function(){var e=this;return o.a.get("/api/events/latest-results").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting Event Details")})}}},l=u,c=(n("e02e"),n("2877")),h=Object(c["a"])(l,s,r,!1,null,"6cedc3b2",null);t["default"]=h.exports},e02e:function(e,t,n){"use strict";var s=n("4120"),r=n.n(s);r.a}}]);
//# sourceMappingURL=chunk-766328c4-legacy.3922ea5a.js.map