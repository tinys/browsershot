/**
 * 创建一个悬浮的div，这样拖动选择的时候不至于将下面的文字选中
 * @author yajie
 */
PAK.register("module.createScreenLayer",function($){
  var that = {};
  var _this = {
    layer:false
  };
  
  that.showLayer = function(opt){
    if(!_this.layer){
      var w = $(document.body);
      _this.layer = $([
        '<div style="padding:0;margin:0;border:0;position:absolute;z-index:9999;opacity:1;top:0px;height:0px;width:'+w.width()+'px;height:'+w.outerHeight()+'px;display:hidden;">',
        '</div>'
      ].join(""));
    }
    if(!_this.layer.parent().length){
      $(document.body).append(_this.layer);
    }
    _this.layer.show();
  };
  var reSize = function(){
    var w = $(document.body);
    _this.layer.css({
      width:w.width()+"px",
      height:w.outerHeight()+"px"
    });
  }
  $(window).on("resize",reSize);
  
  that.hide = function(){
    _this.layer.hide();
  };
  that.destroy = function(){
    $(window).off("resize",reSize);
    _this.layer.remove();
    _this.layer = null;
  };
  return that;
})
