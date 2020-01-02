(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5f240c17"],{c6e0:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"view"},[a("vue-headful",{attrs:{title:"Munro - "+e.$route.params.name,description:"Event Information and Results for the "+e.$route.params.name+" league on Munro, the Fast and Easy Results System for Orienteering Leagues. A simple way to calculate the results for orienteering leagues, with search and sort features",url:"https://munro-leagues.herokuapp.com/leagues/"+e.$route.params.name,head:{meta:{name:"robots",content:"all"}}}}),e.league&&e.league.name?[a("div",{staticClass:"card-text mb-4 mt-2 w-full mx-0"},[a("h1",{staticClass:"text-main text-3xl font-normal font-heading"},[e._v(e._s(e.league.name))]),e.league.description?a("p",[e._v(e._s(e.league.description))]):e._e(),e.league.courses?a("p",[e._v(" There are normally "+e._s(e.league.courses.length)+" courses - "+e._s(e.league.courses.join(", "))+" ")]):e._e(),e.league.coordinator?a("p",[e._v(e._s(e.league.coordinator)+" coordinates the league.")]):e._e(),a("p",[e.league.scoringMethod?a("span",[e._v("The scoring for the league is calculated using a "+e._s(e.scoringMethodShorthandToFull(e.league.scoringMethod)))]):e._e(),e._v(" "),e.league.numberOfCountingEvents&&e.league.numberOfEvents?a("span",[e._v("With your best "+e._s(e.league.numberOfCountingEvents)+" events from all "+e._s(e.league.numberOfEvents)+" events counting.")]):e._e()]),e.league.website?a("p",[e._v(" More information can be found at "),a("a",{staticClass:"link",attrs:{href:e.league.website,target:"_blank",rel:"noopener noreferrer"}},[e._v(e._s(e.league.website))])]):e._e()]),e.auth.user?a("div",{staticClass:"card my-4"},[a("h2",{staticClass:"text-2xl font-heading"},[e._v("Admin Actions")]),a("div",[a("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/create-event"}},[e._v("Add Event")]),a("router-link",{staticClass:"button",attrs:{to:e.$route.path+"/edit"}},[e._v("Edit League")]),a("button",{staticClass:"button",on:{click:e.deleteLeague}},[e._v("Delete League")]),a("router-link",{staticClass:"button",attrs:{to:"/competitors/"+this.$route.params.name}},[e._v(" Manage Competitors ")])],1)]):e._e()]:e._e(),e.events.length>0?a("div",{staticClass:"card my-4"},[a("h2",{staticClass:"text-2xl font-heading"},[e._v("League Results")]),a("div",e._l(e.league.courses,(function(t){return a("router-link",{key:t,staticClass:"button",attrs:{to:e.$route.path+"/results/"+t}},[e._v(" "+e._s(t)+" ")])})),1)]):e._e(),e._l(e.events,(function(t){return a("div",{key:t.name,staticClass:"card my-4",class:{"card-text":!t.resultUploaded}},[a("h2",{staticClass:"font-heading text-xl my-1",class:{"text-2xl":e.auth.user}},[e._v(e._s(t.name))]),e.auth.user?a("div",{staticClass:"event-actions"},[a("router-link",{staticClass:"button",attrs:{to:"/events/"+t.id+"/edit"}},[e._v("Edit Event")]),a("router-link",{staticClass:"button",attrs:{to:"/upload/"+t.id}},[e._v("Upload Results")]),a("button",{staticClass:"button",on:{click:function(a){return e.deleteEvent(t)}}},[e._v("Delete Event")])],1):e._e(),a("div",{staticClass:"my-1"},[e.auth.user?a("p",[a("b",[e._v("Event ID:")]),e._v(" "+e._s(t.id)+" ")]):e._e(),e.auth.user&&t.uploadKey?a("p",[a("b",[e._v("Event Upload Key:")]),e._v(" "+e._s(t.uploadKey)+" ")]):e._e()]),t.date?a("p",[e._v(" On "+e._s(t.date.split("-")[2])+"/"+e._s(t.date.split("-")[1])+"/"+e._s(t.date.split("-")[0])+" "),t.organiser?[e._v(" organised by "+e._s(t.organiser)+" ")]:e._e()],2):e._e(),t.moreInformation?a("p",[e._v(e._s(t.moreInformation))]):e._e(),t.website?a("p",[e._v(" More Information can be found on their "),a("a",{staticClass:"link",attrs:{href:t.website,target:"_blank",rel:"noopener noreferrer"}},[e._v("website")])]):e._e(),t.resultUploaded?a("div",{staticClass:"event-actions event-result-actions"},[e.league.dynamicEventResults?a("router-link",{staticClass:"button",attrs:{to:"/events/"+t.id+"/results"}},[e._v(" Results ")]):e._e(),t.results?a("a",{staticClass:"button",attrs:{href:t.results,target:"_blank",rel:"noopener noreferrer"}},[e._v("HTML Results")]):e._e(),t.winsplits?a("a",{staticClass:"button",attrs:{href:t.winsplits,target:"_blank",rel:"noopener noreferrer"}},[e._v("WinSplits")]):e._e(),t.routegadget?a("a",{staticClass:"button",attrs:{href:t.routegadget,target:"_blank",rel:"noopener noreferrer"}},[e._v("Routegadget")]):e._e()],1):e._e()])})),e.league?e._e():a("not-found")],2)},n=[],r=a("bc3a"),i=a.n(r);function o(e,t,a,s,n,r,i){try{var o=e[r](i),u=o.value}catch(l){return void a(l)}o.done?t(u):Promise.resolve(u).then(s,n)}function u(e){return function(){var t=this,a=arguments;return new Promise((function(s,n){var r=e.apply(t,a);function i(e){o(r,s,n,i,u,"next",e)}function u(e){o(r,s,n,i,u,"throw",e)}i(void 0)}))}}var l=()=>a.e("chunk-2d0e5e97").then(a.bind(null,"9703")),c={components:{NotFound:l},data:function(){return{league:{},events:[],auth:this.$auth}},watch:{$route:function(){var e=u((function*(){yield this.getLeague(),this.getLeagueEvents()}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){var e=u((function*(){yield this.getLeague(),this.getLeagueEvents()}));function t(){return e.apply(this,arguments)}return t}(),methods:{scoringMethodShorthandToFull:e=>{return"position"===e?"Position Based (100 Max)":"position50"===e?"Position Based (50 Max)":"position99"===e?"Position Based (99 Max)":"position99average"===e?"Position Based (99 Max, Reduced in a Draw)":""},getLeague:function(){return i.a.get("/api/leagues/"+this.$route.params.name).then(e=>{this.league=e.data}).catch(()=>this.$messages.addMessage("Problem Getting League Details"))},getLeagueEvents:function(){return!(!this.league||!this.league.name)&&(this.auth.user?i.a.get("/api/leagues/"+this.league.name+"/events/uploadKey").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details")):i.a.get("/api/leagues/"+this.league.name+"/events").then(e=>{this.events=e.data}).catch(()=>this.$messages.addMessage("Problem Getting Event Details")))},deleteLeague:function(){if(confirm("Are you Sure you Want to Delete League - "+this.league.name+"? \nThis Action Can't Be Recovered"))return i.a.delete("/api/leagues/"+this.league.name).then(()=>{this.$messages.addMessage("League: "+this.league.name+" was Deleted"),this.$router.push("/")}).catch(()=>this.$messages.addMessage("Problem Deleting League - Please Try Again"))},deleteEvent:function(e){if(confirm("Are you Sure you Want to Delete Event - "+e.name+"? \nThis Action Can't Be Recovered"))return i.a.delete("/api/events/"+e.id).then(()=>this.$messages.addMessage("Event: "+e.name+" was Deleted")).then(()=>this.getLeague()).then(()=>this.getLeagueEvents()).catch(()=>this.$messages.addMessage("Problem Deleting Event - Please Try Again"))}}},g=c,d=(a("ce0e"),a("2877")),h=Object(d["a"])(g,s,n,!1,null,"095f0bb8",null);t["default"]=h.exports},ce0e:function(e,t,a){"use strict";var s=a("d83b"),n=a.n(s);n.a},d83b:function(e,t,a){}}]);
//# sourceMappingURL=chunk-5f240c17.380c50e2.js.map