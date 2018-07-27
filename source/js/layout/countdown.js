/**
 * Created by peiyuanwu on 16/11/9.
 */
export default {
  init(obj,val,format,callback){
    let self=this;
    if(!obj){
      return false;
    }
    //init
    if(self.update(val,format)=='timeOut'){
      clearInterval(timeCheck);
      callback();
    }else{
      obj.innerHTML=self.update(val,format);
    }

    //interval
    var timeCheck=setInterval(function(){
      if(self.update(val,format)=='timeOut'){
        clearInterval(timeCheck);
        callback();
      }else{
        obj.innerHTML=self.update(val,format);
      }
    },1000)

  },
  update(val,format){
    let now=Date.parse(new Date())/1000;
    let interval=val-now;
    let day=Math.floor(interval/(60*60*24))+'';
    let hour=Math.floor((interval-day*24*60*60)/3600)+'';
    let minute=Math.floor((interval-day*24*60*60-hour*3600)/60)+'';
    let second=Math.floor(interval-day*24*60*60-hour*3600-minute*60)+'';

    if(day.length==1){
      day='0'+day;
    }
    if(hour.length==1){
      hour='0'+hour;
    }
    if(minute.length==1){
      minute='0'+minute;
    }
    if(second.length==1){
      second='0'+second;
    }

    format=format.replace('d',day);
    format=format.replace('h',hour);
    format=format.replace('m',minute);
    format=format.replace('s',second);
    if(interval<=0){
      return 'timeOut';
    }else{
      return format;
    }
  }
};
