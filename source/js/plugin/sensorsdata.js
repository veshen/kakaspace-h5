/**
 * Created by peiyuanwu_sagreen on 2017/3/7.
 */

let api=require('../modules/api.js');

//神策打点通用head
// let config={
//     sdk_url: 'http://static.sa-green.cn/static/sensorsdata/20170111_01/sensorsdata.min.js',
//     name: 'sa',
//     server_url: 'http://d.d.sa-green.cn:8006/sa',
//     is_single_page:true
// };
//
// if((location.href+'').search('www.')>-1){
//     config.server_url='http://d.d.sa-green.cn:8006/sa?project=production'
// }
//
// (function(para) {
//     var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
//     w['sensorsDataAnalytic201505'] = n;
//     w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
//     var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout'];
//     for (var i = 0; i < ifs.length; i++) {
//         w[n][ifs[i]] = w[n].call(null, ifs[i]);
//     }
//     if (!w[n]._t) {
//         x = d.createElement(s), y = d.getElementsByTagName(s)[0];
//         x.async = 1;
//         x.src = p;
//         y.parentNode.insertBefore(x, y);
//         w[n].para = para;
//     }
// })(config);


//神策打点热力图
let config={
  //sdk_url: 'http://static.sa-green.cn/static/sensorsdata/20170111_01/sensorsdata.min.js',
  sdk_url: 'http://static.sa-green.cn/static/sensorsdata/20170512_01/sensorsdata.min.js',
  name: 'sa',
  web_url: 'http://d.d.sa-green.cn:8007/',
  server_url: 'http://d.d.sa-green.cn:8006/sa',
  is_single_page:false,
  heatmap: {}
};

if((location.href+'').search('www.')>-1){
  config.web_url = 'http://d.d.sa-green.cn:8007/?project=sagreenGrowthProduction'
  config.server_url='http://d.d.sa-green.cn:8006/sa?project=sagreenGrowthProduction'
}

(function(para) {
    var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
    var ifs = ['track','quick','register','registerPage','registerOnce','clearAllRegister','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister'];
    for (var i = 0; i < ifs.length; i++) {
      w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
      x = d.createElement(s), y = d.getElementsByTagName(s)[0];
      x.async = 1;
      x.src = p;
      y.parentNode.insertBefore(x, y);
      w[n].para = para;
    }
})(config);



//get UserId
const _get = (_url) => {
    return fetch(_url, {
        credentials: 'include',
        // mode: "cors"
    }).then((res) => {
        if(res.status >= 200){
            return res.json();
        }
        alert(new Error(res.status));
        return Promise.reject(new Error(res.status));
    })
}
api.getSensorData().then((res)=>{
    sa.login(res.sensorsDataUserId);
    sa.quick('autoTrack');
});
