define(["view/base"],function(e){var t=e.extend({initialize:function(e){this.templar=e.templar,_.bindAll(this),this.currentNav={secondary:{nav:{ecosystem:!0,dashboard:!1}}},Backbone.Mediator.sub("view:dashboard:render",this.render,this),Backbone.Mediator.sub("controller:dashboard:init",this.render,this),this.render()},render:function(e){this.destructor(),this.previous=self.currentNav,_.extend(this.currentNav.secondary,e),this.templar.render({path:"secondarynav",el:this.$el,data:this.currentNav})},destructor:function(){this.$el.empty()}});return t});