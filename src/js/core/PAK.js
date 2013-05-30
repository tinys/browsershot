if(!PAK){
	var PAK = (function(){
		var that = jQuery;
    
		that.register = function(ns, maker){
			var NSList = ns.split('.');
			var step = that;
			var k = null;
			while(k = NSList.shift()){
				if(NSList.length){
					if(step[k] === undefined){
						step[k] = {};
					}
					step = step[k];
				}else{
					if(step[k] === undefined){
							step[k] = maker(that);//pkg
							return true;
					}
				}
			}
			return false;
		};
    return that;
  })();
}