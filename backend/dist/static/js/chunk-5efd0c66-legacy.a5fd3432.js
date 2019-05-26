(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5efd0c66"],{"230e":function(e,t,n){var r=n("d3f4"),a=n("7726").document,s=r(a)&&r(a.createElement);e.exports=function(e){return s?a.createElement(e):{}}},"6a99":function(e,t,n){var r=n("d3f4");e.exports=function(e,t){if(!r(e))return e;var n,a;if(t&&"function"==typeof(n=e.toString)&&!r(a=n.call(e)))return a;if("function"==typeof(n=e.valueOf)&&!r(a=n.call(e)))return a;if(!t&&"function"==typeof(n=e.toString)&&!r(a=n.call(e)))return a;throw TypeError("Can't convert object to primitive value")}},7726:function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},"79e5":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"7f7f":function(e,t,n){var r=n("86cc").f,a=Function.prototype,s=/^\s*function ([^ (]*)/,o="name";o in a||n("9e1e")&&r(a,o,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},"86cc":function(e,t,n){var r=n("cb7c"),a=n("c69a"),s=n("6a99"),o=Object.defineProperty;t.f=n("9e1e")?Object.defineProperty:function(e,t,n){if(r(e),t=s(t,!0),r(n),a)try{return o(e,t,n)}catch(u){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},"9ddf":function(e,t,n){"use strict";var r=n("ba7c"),a=n.n(r);a.a},"9e1e":function(e,t,n){e.exports=!n("79e5")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},ba7c:function(e,t,n){},c69a:function(e,t,n){e.exports=!n("9e1e")&&!n("79e5")(function(){return 7!=Object.defineProperty(n("230e")("div"),"a",{get:function(){return 7}}).a})},c6e0:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+"league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features"}}),e.league?n("div",[n("h1",[e._v(e._s(e.league.name))]),e.league.description?n("p",[e._v(e._s(e.league.description))]):e._e(),e.league.courses?n("p",[e._v("\n      There are normally "+e._s(e.league.courses.length)+" courses - "+e._s(e.league.courses.join(", "))+"\n    ")]):e._e(),e.league.coordinator?n("p",[e._v(e._s(e.league.coordinator)+" coordinates the league.")]):e._e(),n("p",[e.league.scoringMethod?n("span",[e._v("The scoring for the league is calculated using a "+e._s(e.scoringMethodShorthandToFull(e.league.scoringMethod)))]):e._e(),e._v("\n       \n      "),e.league.numberOfCountingEvents&&e.league.numberOfEvents?n("span",[e._v("With your best "+e._s(e.league.numberOfCountingEvents)+" events from all "+e._s(e.league.numberOfEvents)+" events counting.")]):e._e()]),e.league.website?n("p",[e._v("\n      More information can be found at\n      "),n("a",{attrs:{href:e.league.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(e.league.website))])]):e._e(),e.auth.user?n("div",{staticClass:"results"},[n("h2",[e._v("Admin Actions")]),n("div",{staticClass:"results-actions"},[n("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/create-event"}},[e._v("Add Event")]),n("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/edit"}},[e._v("Edit League")]),n("button",{on:{click:function(t){return e.deleteLeague()}}},[e._v("Delete League")])],1)]):e._e(),e.events?n("div",{staticClass:"results"},[n("h2",[e._v("League Results")]),n("div",{staticClass:"results-actions"},e._l(e.league.courses,function(t){return n("router-link",{key:t,staticClass:"button",attrs:{to:e.$route.path+"/results/"+t}},[e._v("\n          "+e._s(t)+"\n        ")])}),1)]):e._e(),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.name))]),e.auth.user?n("div",{staticClass:"event-actions"},[n("router-link",{staticClass:"button",attrs:{to:"/events/"+t.id+"/edit"}},[e._v("Edit Event")]),n("router-link",{staticClass:"button",attrs:{to:"/upload/"+t.id}},[e._v("Upload Results")]),n("button",{on:{click:function(n){return e.deleteEvent(t)}}},[e._v("Delete Event")])],1):e._e(),e.auth.user?n("p",[n("b",[e._v("Event ID:")]),e._v("\n        "+e._s(t.id)+"\n      ")]):e._e(),e.auth.user&&t.uploadKey?n("p",[n("b",[e._v("Event Upload Key:")]),e._v("\n        "+e._s(t.uploadKey)+"\n      ")]):e._e(),t.date?n("p",[e._v("\n        On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+"\n        "),t.organiser?[e._v("\n          organised by "+e._s(t.organiser)+"\n        ")]:e._e()],2):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v("\n        More Information can be found at\n        "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(t.website))])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])})],2):e._e(),e.league?e._e():n("not-found")],1)},a=[],s=(n("7f7f"),n("96cf"),n("3b8d")),o=n("bc3a"),u=n.n(o),i=function(){return n.e("chunk-164ca264").then(n.bind(null,"9703"))},c={components:{NotFound:i},data:function(){return{league:{},events:[],auth:this.$auth}},watch:{$route:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLeague();case 2:this.getLeagueEvents();case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:function(e){return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){var e=this;return u.a.get("/api/leagues/"+this.$route.params.name).then(function(t){e.league=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting League Details")})},getLeagueEvents:function(){var e=this;return!!this.league&&(this.auth.user?u.a.get("/api/leagues/"+this.league.name+"/events/uploadKey").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting Event Details")}):u.a.get("/api/leagues/"+this.league.name+"/events").then(function(t){e.events=t.data}).catch(function(){return e.$messages.addMessage("Problem Getting Event Details")}))},deleteLeague:function(){var e=this;if(confirm("Are you Sure you Want to Delete League - "+this.league.name+"? \nThis Action Can't Be Recovered"))return u.a.delete("/api/leagues/"+this.league.name).then(function(){e.$messages.addMessage("League: "+e.league.name+" was Deleted"),e.$router.push("/")}).catch(function(){return e.$messages.addMessage("Problem Deleting League - Please Try Again")})},deleteEvent:function(e){var t=this;if(confirm("Are you Sure you Want to Delete Event - "+e.name+"? \nThis Action Can't Be Recovered"))return u.a.delete("/api/events/"+e.id).then(function(){return t.$messages.addMessage("Event: "+e.name+" was Deleted")}).then(function(){return t.getLeague()}).then(function(){return t.getLeagueEvents()}).catch(function(){return t.$messages.addMessage("Problem Deleting Event - Please Try Again")})}}},l=c,f=(n("9ddf"),n("2877")),g=Object(f["a"])(l,r,a,!1,null,"3c8ec6d9",null);t["default"]=g.exports},cb7c:function(e,t,n){var r=n("d3f4");e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},d3f4:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}}}]);
//# sourceMappingURL=chunk-5efd0c66-legacy.a5fd3432.js.map