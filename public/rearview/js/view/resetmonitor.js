define(["view/base"],function(e){var t=e.extend({subscriptions:{"view:smallmonitor:reset":"setCurrentMonitor"},events:{"click button.cancel":"closeModal","click button.reset":"resetMonitor"},initialize:function(e){_.bindAll(this,"setCurrentMonitor","resetMonitor","closeModal"),this.templar=e.templar,this.render()},render:function(){this.templar.render({path:"resetmonitor",el:this.$el,data:{}}),this.$modal=this.$el.find(".reset-monitor"),this.resizeModal($("#resetMonitor"),"small",!0)},setCurrentMonitor:function(e){this.model=e.model},resetMonitor:function(){this.closeModal(),$.ajax({url:"/jobs/"+this.model.get("id")+"/reset.json",type:"post",data:{_method:"PUT"},success:function(){Backbone.Mediator.pub("view:resetmonitor:reset",{model:this.model,message:"The '"+this.model.get("name")+"' monitor's history and data were reset.",attention:"Monitor Reset Successful!"})}.bind(this),error:function(){Backbone.Mediator.pub("view:resetmonitor:reset",{model:this.model,message:"The monitor '"+this.model.get("name")+"' caused an error on reset, please check your monitor code.",attention:"Monitor Activate Error!",status:"error"})}.bind(this)})},closeModal:function(){this.$modal.modal("hide")},destructor:function(){var e=this.$el.prev();this.destroySubscriptions(),this.remove(),this.unbind(),this.onDestruct&&this.onDestruct(),this.$el=$("<section class='reset-monitor-wrap'></section>").insertAfter(e)}});return t});