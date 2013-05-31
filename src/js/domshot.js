/**
 * 
 */
PAK.register("domshot",function($){
  var that = $({});
  var _this = {
    showShot:false
  };
  var _opt = {};
  that.setArgs = function(opt){
    _opt = $.extend(_opt,opt);
  };
  that.begin = function(){
    var selectDiv = PAK.module.selectDom();
    var option = {
      onrendered:function(canvas){
        selectDiv.destroy();
        _this.showShot = $.module.showShot();
       _this.showShot.showCanvas(canvas);
        _this.showShot.on("cancel",function(){
          _this.showShot.destroy();
        })
        _this.showShot.on("sure",function(){
          that.trigger("shot",canvas);
          _this.showShot.destroy();
        })
      }
    };
    
    selectDiv.on("select",function(evt,data){
      html2canvas(data,$.extend(option,_opt));
    });
  };
  
  return that;
});
