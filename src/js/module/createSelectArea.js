/**
 * 建立一个拖拉选中区域
 * 
 * @author yajie
 * $Import("module.createScreenLayer")
 * $Import("module.bindMoveLayer")
 */
PAK.register("module.createSelectArea",function($){
  return function(opt){
    var that = $({});
    var _this = {
      layer:false
    };
    opt = opt || {};
    $.module.createScreenLayer.showLayer();
    _this.layer = $.module.abLayer({
      width:"1px",
      height:"1px",
      opacity:"0.2",
      border:"0",
      background: "#000"
    });
    
    var body = $(document.body);
    var followMouse = function(){
      if(!EventBind.isDown){
        return;
      };
      var start = EventBind.startPoint;
      var end = EventBind.endPoint;
      var style = {
        left:start.l,
        top:start.t
      };
      var width = end.l - start.l ,
      height = end.t - start.t;
      
      style.width = width;
      style.height = height;
      
      // 向上滑动
      if(height < 0){
        style.top = end.t;
        style.height = start.t - end.t;
      }
      // 向左滑动
      if(width < 0){
        style.left = end.l;
        style.width = start.l - end.l;
      };
      $.each(style,function(i,a){
        if(EventBind.isDown == 2 && (i =="width" || i == "height")){
          a = Math.max(a,opt.min || 30);
        }
        style[i] = a+"px";
      });
      
      _this.layer.show(style);
    };
    var defaultValue = {l:0,
        t:0};
    var EventBind = {
      // 0 未初始化 1.截图中 2.截图完毕
      isDown:0,
      startPoint:{
        l:0,
        t:0
      },
      endPoint:{
        l:0,
        t:0
      },
      mouseDown:function(evt){
        if(EventBind.isDown){
          return;
        }
        EventBind.isDown = 1;
        var startPoint = EventBind.startPoint;
        startPoint.l = evt.pageX;
        startPoint.t = evt.pageY;
        return false;
      },
      mouseUp:function(evt){
        if(EventBind.isDown !== 1){
          return;
        }
        EventBind.isDown = 2;
        var endPoint = EventBind.endPoint;
        endPoint.l = evt.pageX;
        endPoint.t = evt.pageY;
        followMouse();
        EventBind.clear();
        
        // 拖拽选择完毕
        that.trigger("selectOver")
      },
      mouseMove:function(evt){
        if(EventBind.isDown !== 1){
          return;
        }
        var endPoint = EventBind.endPoint;
        endPoint.l = evt.pageX;
        endPoint.t = evt.pageY;
        followMouse();
      },
      clear:function(){
        // 清理记录
        EventBind.startPoint = {
          l:0,
          t:0
        };
        EventBind.endPoint = {
          l:0,
          t:0
        };
      }
    };
    // 进行第二次选中
    that.on("selectOver",function(evt,data){
      var posStr = "position:absolute;margin:0;padding:0;width:15px;height:15px;opacity:1;";
      // 左上
      var lt = '<span node="move" pos="lt" style="'+posStr+'cursor:nw-resize;top:0px;left:0px;"></span>';
      // 左下
      var lb = '<span node="move" pos="lb" style="'+posStr+'cursor:sw-resize;left:0px;bottom:0px;"></span>';
      
      // 右上
      var rt = '<span node="move" pos="rt" style="'+posStr+'cursor:ne-resize;top:0px;right:0px;"></span>';
      // 右下
      var rb = '<span node="move" pos="rb" style="'+posStr+'cursor:se-resize;bottom:0px;right:0px;"></span>';
       
      // 中间
      var node = _this.layer.getNode();
      node.append($(lt+lb+rt+rb));
      node.css({
        "cursor":"move"
      });
      node.attr({
        "node":"move",
        "pos":"center"
      });
      
      body.css("cursor",tempCursor);
      var fireSelect = function(){
        // getBoundRectClient
        var data = node.position();
        data.width = node.width();
        data.height = node.height();
        that.trigger("select",data);
      };
      node.dblclick(fireSelect);
      
      _this.layer.on("destroy",function(){
        node.off("dbClick",fireSelect);
      });
      
      $.module.bindMoveLayer(_this.layer);
    });
    
    
    var evtList = {
      "mousedown":EventBind.mouseDown,
      "mouseup":EventBind.mouseUp,
      "mousemove":EventBind.mouseMove
    }
    $.each(evtList,function(i,a){
      body.on(i,a);
    })
    var tempCursor = body.css("cursor");
    body.css("cursor","crosshair")
    
    
    that.getLayer = function(){
      return _this.layer;
    };
    
    that.destroy = function(){
      $.each(evtList,function(i,a){
        body.off(i,a);
      });
      body.css("cursor",tempCursor);
      _this.layer.destroy();
      $.module.createScreenLayer.destroy();
    };
    return that;
  }
})

