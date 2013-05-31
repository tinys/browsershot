/**
 * 显示成果
 */
PAK.register("module.showShot",function($){
  return function(canvas){
    var that = $({});
    var _this = {
      layer:false,
      canvas:canvas
    };
    
    _this.layer = $.module.abLayer({
      left:"251px",
      top:"75px",
      opacity:"1",
      "color":"blue",
      border:"1px solid #fff",
      width:(canvas?canvas.width:0)+"px",
      height:(canvas?canvas.height:0)+"px"
    });
    var node = _this.layer.getNode();
    var str = 'position:absolute;top:-11px;cursor:hand;background-color:white;';
    node.html('<a style="'+str+'right:40px" href="javascript:;" node="sure">确定</a><a node="cancel" style="'+str+'right:10px" href="javascript:;">取消</a>');
    if(_this.canvas)
      node.append(_this.canvas);
    
    that.showCanvas = function(cvas){
      if(_this.canvas){
        $(_this.canvas).remove();
      }
      if(cvas){
        node.css({
          width:cvas.width+"px",
          height:cvas.height+"px"
        });
        node.append(cvas);
        _this.canvas = cvas;
      }
      _this.layer.show();
    };
    var fireEvent = function(evt){
      var ele = $(evt.target);
      switch(ele.attr("node")){
        case "sure":
        that.trigger("sure");
        break;
        case "cancel":
        that.trigger("cancel");
        break;
      };
      return false;
    }
    node.on("click",fireEvent);
    
    that.destroy = function(){
      _this.layer.destroy();
      node.off("click",fireEvent);
      node = null;
    };
    return that;
  }
})


