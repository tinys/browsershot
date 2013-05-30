/**
 * 用来给一个layer 添加移动的效果
 * 
 * @author yajie
 */
PAK.register("module.bindMoveLayer",function($){
  return function(layer){
    var that = $({});
    var _this = {
      
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
      start:getDefault(),
      end:getDefault(),
      // 状态
      type:0,
      
      // 清除状态
      clear:function(){
      },
      mousedown:function(evt){
        console.log("down",evt);
      },
      mouseup:function(evt){
        console.log("up",evt);
      },
      mousemove:function(evt){
        console.log("move",evt);
      }
    };
    
    var bindEvent = function(){
      var node = layer.getNode();
      $.each(["mousedown","mouseup","mousemove"],function(i,a){
        node.delegate("[node='move']",a,evtListener[a] );      
      });
    },
    unBindEvent = function(){
      var node = layer.getNode();
      $.each(["mousedown","mouseup","mousemove"],function(i,a){
        node.undelegate("[node='move']",a,evtListener[a] );      
      });
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
