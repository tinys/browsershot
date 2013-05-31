/**
 * 
 */
PAK.register("browsershot",function($){
  var that = $({});
  var _this = {
    showShot:false,
    bodyCanvas:false,
    showData :false
  };
  var _opt = {};
  that.setArgs = function(opt){
    _opt = $.extend(_opt,opt);
  };
  var option = {
    onrendered:function(canvas){
      _this.bodyCanvas = canvas;
      loadMyCanvas();
    }
  };
  
  var loadMyCanvas = function(){
    if(_this.bodyCanvas && _this.showData){
      var cxt = _this.bodyCanvas.getContext("2d");
      var imgData = cxt.getImageData(_this.showData.left,_this.showData.top,_this.showData.width,_this.showData.height);
      var result = document.createElement("canvas");
      result.width = imgData.width;
      result.hight = imgData.height;
      var rCxt = result.getContext("2d");
      rCxt.putImageData(imgData,0,0);
      that.trigger("shot",result);
    }
  };
  that.begin = function(){
    _this.showData  = false;
    var selectArea = $.module.createSelectArea();
    selectArea.on("select",function(evt,data){
      selectArea.destroy();
      _this.showData = data;
      loadMyCanvas();
    })
  };
  
  html2canvas(document.body,$.extend(option,_opt));
  
  return that;
});
