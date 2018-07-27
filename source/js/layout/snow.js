/**
 * Created by peiyuanwu_sagreen on 2016/12/20.
 */
var snow={};

snow.init=function(display){
    "use strict";
    let _box=document.createElement('div');
    _box.className='snowBox';
    _box.style.display=display;
    snow.box=_box;
    document.body.appendChild(_box);
};
snow.show=function(display){
    "use strict";
    snow.box.style.display=display
};
module.exports=snow;