/**
 * 用来给一个layer 添加移动的效果
 * 
 * @author yajie
 */
PAK.register("module.bindMoveLayer",function($){
  return function(layer){
    var that = $({});
    var _this = {
      node:layer.getNode()
    };
    
    
    var shadowFlowMouse = function(){
      var begin = evtListener.begin,
          end = evtListener.end,
          startStart = evtListener.startState;
      // 鼠标偏移
      var left = end.l - begin.l,
          top  = end.t - begin.t,
          width = startStart.w,
          height = startStart.h;
      
      switch(evtListener.flag){
        // 左上 
        case "lt":
        width = width - left;
        height = height - top;
  
        left = startStart.l + left;
        top  = startStart.t + top;
        break;
        // 左下
        case "lb":
        width = width - left;
        height = height + top;
        left = startStart.l + left;
        top = startStart.t;
        break;
        // 右上
        case "rt":
        width = width + left;
        height = height - top;
        top  = startStart.t + top;
        left = startStart.l;
        break;
        // 右下
        case "rb":
        width = width + left;
        height = height + top;
        top = startStart.t;
        left = startStart.l;
        break;
        case "center":
          width = startStart.w;
          height = startStart.h;
          top  = startStart.t + top;
          left = startStart.l + left;
        break;
      };
      if(width < 30 || height < 30){
        return;
      }
      
      _this.node.css({
        left:left+"px",
        top :top+"px",
        width :width+"px",
        height :height+"px"
      })
      
    };
    
    var getDefault = function(){
      return {
        l:0,
        t:0,
        w:0,
        h:0
      };
    };
    var evtListener = {
      startState:getDefault(),
      begin:getDefault(),
      end:getDefault(),
      // 状态 0  默认状态 1 开始监听拖拽
      type:0,
      flag:"",
      // 清除状态
      clear:function(){
        
      },
      mousedown:function(evt){
        var target = evt.target;
        var pos = $(target).attr("pos");
        evtListener.flag = pos;
        evtListener.type = 1;
        // 开始的状态
        evtListener.startState = {
          l:parseInt(_this.node.css("left")),
          t:parseInt(_this.node.css("top")),
          w:parseInt(_this.node.css("width")),
          h:parseInt(_this.node.css("height"))
        };
        evtListener.begin.l = evt.pageX;
        evtListener.begin.t = evt.pageY;
        
        evtListener.end.l = evt.pageX;
        evtListener.end.t = evt.pageY;
        
        return false;
      },
      mouseup:function(evt){
        evtListener.type = 0;
        evtListener.clear();
      },
      mousemove:function(evt){
        if(evtListener.type !== 1){
          return;
        }
        var end = evtListener.end;
        end.l = evt.pageX;
        end.t = evt.pageY;
        
        shadowFlowMouse();
      }
    };
    
    var bindEvent = function(){
      _this.node.on("mousedown",evtListener["mousedown"]);
      var body = $(document.body);
      // 取消事件加在body上，拖得太快，监听不到mouseup
      $.each(["mouseup","mousemove"],function(i,a){
        body.on(a,evtListener[a]);
      });
    },
    unBindEvent = function(){
      var body = $(document.body);
      $.each(["mouseup","mousemove"],function(i,a){
        body.off(a,evtListener[a]);
      });
      _this.node.off("mousedown",evtListener["mousedown"]);
    };
    var init = function(){
      bindEvent();
    }
    layer.on("destroy",function(){
      unBindEvent();
    });
    that.destroy = function(){
      unBindEvent();
    }
    init();
    return that;
  }
})
