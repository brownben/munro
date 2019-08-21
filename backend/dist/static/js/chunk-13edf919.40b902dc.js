(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13edf919"],{"1da1":function(e,t,n){"use strict";function a(e,t,n,a,s,r,o){try{var u=e[r](o),i=u.value}catch(l){return void n(l)}u.done?t(i):Promise.resolve(i).then(a,s)}function s(e){return function(){var t=this,n=arguments;return new Promise(function(s,r){var o=e.apply(t,n);function u(e){a(o,s,r,u,i,"next",e)}function i(e){a(o,s,r,u,i,"throw",e)}u(void 0)})}}n.d(t,"a",function(){return s})},"4bef":function(e,t,n){"use strict";var a=n("f135"),s=n.n(a);s.a},c6e0:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues/"+e.$route.params.name,head:{meta:{name:"robots",content:"all"}}}}),e.league&&e.league.name?n("div",[n("h1",[e._v(e._s(e.league.name))]),e.league.description?n("p",[e._v(e._s(e.league.description))]):e._e(),e.league.courses?n("p",[e._v("\n      There are normally "+e._s(e.league.courses.length)+" courses - "+e._s(e.league.courses.join(", "))+"\n    ")]):e._e(),e.league.coordinator?n("p",[e._v(e._s(e.league.coordinator)+" coordinates the league.")]):e._e(),n("p",[e.league.scoringMethod?n("span",[e._v("The scoring for the league is calculated using a "+e._s(e.scoringMethodShorthandToFull(e.league.scoringMethod)))]):e._e(),e._v("\n       \n      "),e.league.numberOfCountingEvents&&e.league.numberOfEvents?n("span",[e._v("With your best "+e._s(e.league.numberOfCountingEvents)+" events from all "+e._s(e.league.numberOfEvents)+" events counting.")]):e._e()]),e.league.website?n("p",[e._v("\n      More information can be found at\n      "),n("a",{attrs:{href:e.league.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(e.league.website))])]):e._e(),e.auth.user?n("div",{staticClass:"results"},[n("h2",[e._v("Admin Actions")]),n("div",{staticClass:"results-actions"},[n("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/create-event"}},[e._v("Add Event")]),n("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/edit"}},[e._v("Edit League")]),n("button",{on:{click:function(t){return e.deleteLeague()}}},[e._v("Delete League")]),n("router-link",{staticClass:"button",attrs:{to:"/competitors/"+this.$route.params.name}},[e._v("\n          Manage Competitors\n        ")])],1)]):e._e(),e.events?n("div",{staticClass:"results"},[n("h2",[e._v("League Results")]),n("div",{staticClass:"results-actions"},e._l(e.league.courses,function(t){return n("router-link",{key:t,staticClass:"button",attrs:{to:e.$route.path+"/results/"+t}},[e._v("\n          "+e._s(t)+"\n        ")])}),1)]):e._e(),e._l(e.events,function(t){return n("div",{key:t.name,staticClass:"event"},[n("h2",[e._v(e._s(t.name))]),e.auth.user?n("div",{staticClass:"event-actions"},[n("router-link",{staticClass:"button",attrs:{to:"/events/"+t.id+"/edit"}},[e._v("Edit Event")]),n("router-link",{staticClass:"button",attrs:{to:"/upload/"+t.id}},[e._v("Upload Results")]),n("button",{on:{click:function(n){return e.deleteEvent(t)}}},[e._v("Delete Event")])],1):e._e(),e.auth.user?n("p",[n("b",[e._v("Event ID:")]),e._v("\n        "+e._s(t.id)+"\n      ")]):e._e(),e.auth.user&&t.uploadKey?n("p",[n("b",[e._v("Event Upload Key:")]),e._v("\n        "+e._s(t.uploadKey)+"\n      ")]):e._e(),t.date?n("p",[e._v("\n        On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+"\n        "),t.organiser?[e._v("\n          organised by "+e._s(t.organiser)+"\n        ")]:e._e()],2):e._e(),t.moreInformation?n("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?n("p",[e._v("\n        More Information can be found\n        "),n("a",{attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v("here")])]):e._e(),t.resultUploaded?n("div",{staticClass:"event-actions event-result-actions"},[t.results?n("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("Results")]):e._e(),t.winsplits?n("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?n("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()]):e._e()])})],2):e._e(),e.league?e._e():n("not-found")],1)},s=[],r=n("1da1"),o=n("bc3a"),u=n.n(o);const i=()=>n.e("chunk-10545b19").then(n.bind(null,"9703"));var l={components:{NotFound:i},data:function(){return{league:{},events:[],auth:this.$auth}},watch:{$route:function(){var e=Object(r["a"])(function*(){yield this.getLeague(),this.getLeagueEvents()});function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=Object(r["a"])(function*(){yield this.getLeague(),this.getLeagueEvents()});function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){return u.a.get("/api/leagues/"+this.$route.params.name).then(e=>{this.league=e.data}).catch(()=>this.$messages.addMessage("Problem Getting League Details"))},getLeagueEvents:function(){return!(!this.league||!this.league.name)&&(this.auth.user?u.a.get("/api/leagues/"+this.league.name+"/events/uploadKey").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details")):u.a.get("/api/leagues/"+this.league.name+"/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details")))},deleteLeague:function(){if(confirm("Are you Sure you Want to Delete League - "+this.league.name+"? \nThis Action Can't Be Recovered"))return u.a.delete("/api/leagues/"+this.league.name).then(()=>{this.$messages.addMessage("League: "+this.league.name+" was Deleted"),this.$router.push("/")}).catch(()=>this.$messages.addMessage("Problem Deleting League - Please Try Again"))},deleteEvent:function(e){if(confirm("Are you Sure you Want to Delete Event - "+e.name+"? \nThis Action Can't Be Recovered"))return u.a.delete("/api/events/"+e.id).then(()=>this.$messages.addMessage("Event: "+e.name+" was Deleted")).then(()=>this.getLeague()).then(()=>this.getLeagueEvents()).catch(()=>this.$messages.addMessage("Problem Deleting Event - Please Try Again"))}}},g=l,c=(n("4bef"),n("2877")),d=Object(c["a"])(g,a,s,!1,null,"67f2e843",null);t["default"]=d.exports},f135:function(e,t,n){}}]);
//# sourceMappingURL=chunk-13edf919.40b902dc.js.map