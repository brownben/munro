(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8be4"],{"8b26":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.league?n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",head:{meta:{name:"robots",content:"noindex"}}}}),e._l(e.events,(function(t){return n("div",{key:t.name,staticClass:"card my-4"},[n("h2",{staticClass:"font-heading text-xl my-1"},[e._v(e._s(t.name))]),t.date?n("p",[e._v(" On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+" "),t.organiser?[e._v(" organised by "+e._s(t.organiser)+" ")]:e._e()],2):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v(" More Information can be found on their "),n("a",{staticClass:"link",attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v("website")])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])}))],2):e._e(),e.league?e._e():n("not-found")],1)},s=[],r=n("bc3a"),o=n.n(r);function i(e,t,n,a,s,r,o){try{var i=e[r](o),u=i.value}catch(l){return void n(l)}i.done?t(u):Promise.resolve(u).then(a,s)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var r=e.apply(t,n);function o(e){i(r,a,s,o,u,"next",e)}function u(e){i(r,a,s,o,u,"throw",e)}o(void 0)}))}}var l=()=>n.e("chunk-2d0e5e97").then(n.bind(null,"9703")),d={components:{NotFound:l},data:function(){return{league:{},events:[]}},watch:{$route:function(){var e=u((function*(){yield this.getLeague(),this.getLeagueEvents()}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=u((function*(){yield this.getLeague(),this.getLeagueEvents()}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){return o.a.get("/api/leagues/"+this.$route.params.name).then(e=>{this.league=e.data}).catch(()=>this.$messages.addMessage("Problem Getting League Details"))},getLeagueEvents:function(){return!!this.league&&o.a.get("/api/leagues/"+this.league.name+"/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details"))}}},c=d,g=n("2877"),h=Object(g["a"])(c,a,s,!1,null,null,null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0e8be4.fac44ab2.js.map