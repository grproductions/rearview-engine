define(["view/base"],function(t){var r=t.extend({el:".small-monitor",events:{"click .header-name":"editMonitor","click .settings .btn":"monitorSettings","click .save":"monitorSettings","click .monitor-inactive":"deactivateMonitor","click .monitor-active":"activateMonitor","click button.reset":"resetMonitor"},initialize:function(t){_.bindAll(this,"editMonitor","expandMonitor","monitorTitle","monitorSettings","deactivateMonitor","activateMonitor","resetMonitor","setupDrag"),this.templar=t.templar,this.user=t.user?t.user:null,this.dashboardId=t.dashboardId?t.dashboardId:null,this.addHelpers(),this.intervalLength=t.intervalLength?t.intervalLength:60,Backbone.Mediator.sub("controller:dashboard:init",this.expandMonitor,this);var r=_.debounce(this.monitorTitle,500);$(window).resize(r)},render:function(){return this.templar.render({path:"smallmonitor",el:this.$el,append:!0,data:{monitor:this.model.toJSON()}}),this.initMonitor(),this},initMonitor:function(){this.$el.data("view",this),this.$monitor=this.$el.find("#smallMonitor"+this.model.get("id")),this.$wrap=this.$monitor.parent(),this.$graph=this.$monitor.find(".graph")[0],this.$monitor.find("h1").tooltip(),this.chart=this.initGraph(this.$graph),this.updateGraph(),this.interval=setInterval(function(){this.updateGraph(!0)}.bind(this),1e3*this.intervalLength),this.setupDrag()},setupDrag:function(){this.$monitor.draggable({handle:this.$el.find(".drag-handle"),containment:"body",snap:".small-monitor-drag",snapMode:"inner",snapTolerance:30,appendTo:".monitor-wrap",scroll:!0,revert:"invalid",start:function(t,r){var e=r.helper;r.offset,e.draggable("option","revert",!0),$("body").removeAttr("style"),e.parent().css({"z-index":"9999"}),this.currentOrder=this.getMonitorOrder()}.bind(this),stop:function(t,r){var e=r.helper,i=(r.offset,e.attr("id")),o=!0;e.parent().css({"z-index":"1"}),$(".small-monitor").each(function(t,r){var a=$(r).attr("id");i!==a&&this.overlaps(e,r)&&(this.setorder(e.parent(),$(r).parent(),!0),e.css({left:0,top:0}),o=!1)}.bind(this)),o&&e.css({left:0,top:0})}.bind(this),drag:function(t,r){r.helper,r.offset}.bind(this)})},setorder:function(t,r,e){t=$(t),r=$(r),e=!!e;var i=(t.parent(),r.parent()),o=i.attr("data-order"),a=this.currentOrder?this.currentOrder:this.getMonitorOrder(),s=t.data("view"),n=s.model.get("id"),h=_.indexOf(a,n);a.splice(h,1),a.splice(o,0,n),this.currentOrder=a,this.reorder(),e&&this.setDashboardPreferences()},updateGraph:function(t){var r=!1;t?t&&this.model.get("active")&&(r=!0):r=!0,r&&(this.errorState=!0,this.showOverlay(this.$graph,"Loading...","small-monitor-overlay"),$.ajax({url:"/jobs/"+this.model.get("id")+"/data",success:function(t){"error"===t.status?(this.hideOverlay(),_.isEmpty(t.graph_data)?this.showOverlay(this.$graph,"Monitor Error - No Data","small-monitor-error-overlay"):this.showOverlay(this.$graph,"Monitor Error","small-monitor-error-overlay"),this._setErrorState()):"failed"===t.status?(this.hideOverlay(),this.formattedGraphData=this.formatGraphData(t.graph_data),this.renderGraphData(this.chart,this.formattedGraphData),this._setErrorState(),this.model.set("output",t.output)):"graphite_error"===t.status?(this.hideOverlay(),this.showOverlay(this.$graph,"Graphite Error","small-monitor-error-overlay"),this._setErrorState()):"graphite_metric_error"===t.status?(this.hideOverlay(),this.showOverlay(this.$graph,"Graphite Metrics Error","small-monitor-error-overlay"),this._setErrorState()):t.graph_data?(this.hideOverlay(),this.errorState=!1,this.formattedGraphData=this.formatGraphData(t.graph_data),this.renderGraphData(this.chart,this.formattedGraphData),this.model.set("output",t.output),this._setErrorState(!0)):(this.hideOverlay(),this.showOverlay(this.$graph,"Unexpected Error","small-monitor-error-overlay"),this._setErrorState())}.bind(this),error:function(){this.hideOverlay(),this.showOverlay(this.$graph,"Waiting For Next Run","small-monitor-error-overlay")}.bind(this)}))},deactivateMonitor:function(t){$(t.target).hasClass("active")||this.model.save({active:!1},{error:function(t){Backbone.Mediator.pub("view:smallmonitor:save",{model:this.model,message:"The monitor '"+t.get("name")+"' caused an error on deactivation, please check your monitor code.",attention:"Monitor Deactivate Error!",status:"error"})}})},activateMonitor:function(t){$(t.target).hasClass("active")||this.model.save({active:!0},{error:function(){Backbone.Mediator.pub("view:smallmonitor:save",{model:this.model,message:"The monitor '"+this.model.get("name")+"' caused an error on activation, please check your monitor code.",attention:"Monitor Activate Error!",status:"error"})}.bind(this)})},resetMonitor:function(){this.$monitor.find("#resetMonitor").toggle("show"),Backbone.Mediator.pub("view:smallmonitor:reset",{model:this.model})},expandMonitor:function(t){t.monitorId==this.model.get("id")&&this.editMonitor()},editMonitor:function(){Backbone.Mediator.pub("view:smallmonitor:edit",this.model.get("id"),this)},monitorSettings:function(){this.$monitor.toggleClass("flipped")},monitorTitle:function(){var t=140,r=this.$monitor.width();this.$header=this.$monitor.find(".header-name"),this.$titleText=this.$monitor.find(".header-name p"),this.$header.css("width",r-t),this.$titleText.width()>this.$header.width()?this.$header.addClass("truncated"):this.$header.removeClass("truncated")},nextRun:function(){this.hideOverlay(),this.showOverlay(this.$graph,"Waiting For Next Run","small-monitor-error-overlay")},reorder:function(){var t=$(".dashboard-"+this.model.get("dashboardId")+" .small-monitor-drag");t.each(function(t,r){$(r).prepend($("#smallMonitor"+this.currentOrder[t]).parent())}.bind(this))},setDashboardPreferences:function(){var t=this.user.get("preferences")?this.user.get("preferences"):{},r=t&&t.dashboards?t.dashboards:{};r[this.model.get("dashboardId")]={order:this.currentOrder},t.dashboards=r,this.user.updatePrefs(t)},getMonitorOrder:function(){var t=$(".dashboard-"+this.model.get("dashboardId")+" .small-monitor-wrap"),r=[];return t.each(function(t,e){var i=$(e).data("view");r.push(i.model.get("id"))}),r},destructor:function(){clearInterval(this.interval),this.model.unbind(),this.unbind(),this.off(),this.undelegateEvents(),Backbone.Mediator.unsubscribe("view:smallmonitor:edit",this.editMonitor),Backbone.Mediator.unsubscribe("controller:dashboard:init",this.expandMonitor,this),this.remove(),this.$el.remove()},_setErrorState:function(t){t?this.$el.children(":first").removeClass("red"):this.$el.children(":first").addClass("red")}});return r});