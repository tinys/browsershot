/**
 * 一个随风飘荡的浮层
 * @author yajie
 */
PAK.register("module.abLayer",function($){
  return function(opt){
    var args = {
      zIndex:"9999",
      top:"0px",
      left:"0px",
      width:"0px",
      position:"absolute",
      margin:"0",
      padding:"0",
      opacity:"0",
      display:"none",
      height:"0px"
    };
    var _this = {
      layer:false
    };
    var init = function(){
      _this.layer = $("<div></div>");
      _this.layer.css($.extend(args,opt));
      $(document.body).append(_this.layer);
    };
    var that = $({});
    
    that.show = function(opt){
      if(opt){
        _this.layer.css(opt);
      }
      _this.layer.show();
      that.trigger("show");
    };
    that.hide = function(){
      _this.layer.hide();
      that.trigger("hide");
    };
    that.destroy = function(){
      that.trigger("destroy");
      _this.layer.remove();
      delete _this.layer;
    };
    that.getNode = function(){
      return _this.layer;
    }
    init();
    return that;
  }
})
