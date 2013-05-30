/**
 * 选中dom
 */
PAK.register("module.selectDom",function($){
  return function(){
    var that = $({});
    var _this = {
      target:false,
      layer:false
    };
    
    var buildSelectDiv = function(){
      _this.layer = $('<div style="position:absolute;z-index:9999;background:#000;opacity:0.3;display:none;top:0px;left:0px;width:0px;height:0px"><span style="position:absolute;top:-2px;right:1px;"><a select="true" style="width:25px;font-size:12px;position:absolute;top: -13px;right:1px;border: 1px solid #060606;color:blue;background: #e3e6f0;" href="javascript:;">确定</a></span></div>');
      _this.layer.prependTo(document.body);
      _this.layer.click(function(evt){
        if($(evt.target).attr("select")){
          that.trigger("select",_this.target);
          _this.layer.hide();
        };
        return false;
      })
    };
    var showSelectDiv = function(element){
      element = $(element);
      var position = element.offset();
      _this.layer.css({
        width:element.width()+"px",
        height:element.height()+"px",
        top:position.top,
        left:position.left
      });
      _this.layer.show();
      $(window).off("keyup",EvtObject.cancelSelect);
      $(window).keyup(EvtObject.cancelSelect);
    };
    
    var EvtObject = {
      selectDiv: function(evt){
        var target = $(evt.target);
        if(_this.target == target || target == _this.layer || $.contains(_this.layer,target)){
          return;
        }
        showSelectDiv(target);
        _this.target = target;
        return false;
      },
      cancelSelect:function(evt){
        if(evt.keyCode == "27"){
          _this.layer.hide(0.5);
          _this.target = false;
          $(window).off("keyup",EvtObject.cancelSelect);
        }
      }
    };
    var bindEvent = function(){
      var body = $(document.body);
      body.click(EvtObject.selectDiv);
    },
    unBindEvent = function(){
      var body = $(document.body);
      body.off("click",EvtObject.selectDiv);
    };
    
    var init = function(){
      bindEvent();
      buildSelectDiv();
    }
    that.destroy = function(){
      unBindEvent();
      _this.layer.remove();
    };
    that.getTarget = function(){
      return _this.target;
    }
    init();
    return that;
  }
});
