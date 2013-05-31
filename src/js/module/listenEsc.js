/**
 * 监听Esc
 */
PAK.register("module.listenEsc",function($){
  var that = {};
  var funList = [];
  
  var fireList = function(evt){
    if(evt.keyCode == "27"){
      $.each(funList,function(i,a){
        a.apply(null);
      })
    }
  };
  var addListen = function(){
    $(document.body).on("keydown",fireList);
  },
  removeListen = function(){
    $(document.body).off("keydown",fireList);
  };
  
  that.add = function(fun){
    if(!funList.length){
      addListen();
    }
    funList.push(fun);
  };
  that.remove = function(fun){
    $.each(funList,function(i,a){
      if(a == fun){
        funList.splice(i,i+1);
        return false;
      }
    })
    if(!funList.length){
      removeListen();
    }
  }
  return that;
})

