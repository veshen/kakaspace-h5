/**
 * Created by zhangxia_sagreen on 2017/7/17.
 */
 let LS=require('../modules/localstorage.js');
//const
const monthStr=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
//const weekStr=['周一','周二','周三','周四','周五','周六','周日'];
const weekStr=['日','一','二','三','四','五','六'];
let _select=[];
//class
class dateGet {

    constructor(option) {
        this.tip = option.tip;//特殊标签、售罄、优惠
        //共显示几个月
        this.allMounth = option.allMounth;
        //是否显示2个月
        this.showTwoMouth = option.showTwoMouth;
        //startTime
        this.startTime = option.startTime;
        this.backupStartTime=this.startTime;
        //endTIme
        this.endTime = option.endTime;

        //dom
        this.dom=option.dom;
        if(!this.dom){
            return false;
        }
        //select ON/OFF
        (option.selectSwitch===false)?this.selectSwitch=false : this.selectSwitch=true;

        //select
        this.nowDay=option.nowDay||false;
        this.nowDayArr=option.nowDayArr||false;

        //type
        this.type=option.type||'single';

        //showType
        if(this.endTime.getTime()- this.startTime.getTime()<7*24*60*60*1000){
            this.showType=option.showType||'week';
        }else{
            this.showType=option.showType||'month';
        }

        //serial
        this.serialNum=option.serialNum||3;



        //holiday
        this.holiday=option.holiday||[];

        //tag
        this.tag=option.tag||[];

        //
        this.selectStyle=option.selectStyle||[];

        //event callback
        this.rightCallback=option.rightCallback||function(){console.log('touchstart right')};
        this.leftCallback=option.leftCallback||function(){console.log('touchstart left')};
        this.selectCallback=option.selectCallback||function(){console.log('touchstart item')};

        //can't select
        this.NoSelectCallback=option.NoSelectCallback||function(){console.log('NoSelectCallback')};


        //margin
        this.boxMargin=option.boxMargin||12;
        this.boxPadding=option.boxPadding||10;

        this.preAndNextHide=false;

        //weekOnly
        this.weekOnly=option.weekOnly||false;

        //do init
        this.init();
    }

    //init
    init(){
        this.createLayoutDom();
        this.createDom(this.startTime);
        this.addEvent();

    };
    //dom
    createDom(date){
        let _self=this;
        date=date||this.startTime;
        let main='';
        let monthDay=getMonthDay(date);//每月有多少天
        let prevMonthDay=getPrevMonthDay(date);
        let monthFirstDay=getDayFirstDay(date);
        let monthLastDay=getDayLastDay(date);
        let dayArr=[]; //当前月每一天的日期对象 和 日期（号）
        let itemWidth=(window.innerWidth-this.boxMargin*2)/8;
        console.log(this.startTime.getMonth()+2);
        //datArr
        for(let j=1;j<this.allMounth+1;j++){
            let _date = getMonthDay(new Date(this.startTime.getFullYear(),this.startTime.getMonth()+j,0))
            // if (j==1) {
            //     _date = getMonthDay(new Date(this.startTime.getFullYear(),this.startTime.getMonth()+j,0))
            // }else{
            //     _date = getMonthDay(new Date(this.startTime.getFullYear()+1,1,0))
            // }
            console.log(_date);
            for(let i=1;i<_date+1;i++ ){
                let _obj={
                        type:'now',
                        value:i,
                        date:new Date(date.getFullYear()+'/'+(date.getMonth()+j)+'/'+i),
                        datetimestamp:Date.parse(new Date(date.getFullYear()+'/'+(date.getMonth()+j)+'/'+i))
                    };
                    dayArr.push(_obj)
                // if (j==1) {
                //     let _obj={
                //         type:'now',
                //         value:i,
                //         date:new Date(date.getFullYear()+'/'+(date.getMonth()+j)+'/'+i),
                //         datetimestamp:Date.parse(new Date(date.getFullYear()+'/'+(date.getMonth()+j)+'/'+i))
                //     };
                //     dayArr.push(_obj)
                // }else{
                //     let month = (date.getMonth()+j)%12;
                //     let _obj={
                //         type:'now',
                //         value:i,
                //         date:new Date(2018+'/'+month+'/'+i),
                //         datetimestamp:Date.parse(new Date(2018+'/'+month+'/'+i))
                //     };
                //     dayArr.push(_obj)
                // }

            }
        }
        console.log(dayArr)
        //只选择时间段内的
        let _dayArr=[]
        for(let i=0;i<dayArr.length;i++){
            if(dayArr[i].date.getTime()>=this.startTime.getTime()&&dayArr[i].date.getTime()<=this.endTime.getTime()){
                _dayArr.push(dayArr[i])
            }
        }
        dayArr = _dayArr

        //console.log(dayArr)
        let _iToday = new Date().getDate()
        let _todayobj={
            type:'today',
            value:_iToday,
            date:new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+_iToday)
        }
        dayArr.unshift(_todayobj);
        let _prevday = new Date().getDay();
        let _prevdayobj;
        if(_prevday!=7){
            for(let i=0; i<_prevday; i++){
                _prevdayobj={
                    type:'prev',
                    value:i,
                    date:new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+(new Date().getDate()))
                }
                dayArr.unshift(_prevdayobj);
            }
        }


        let _dayLength = _dayArr.length-1
        let _lastday = _dayArr[_dayLength].date.getDay();
        if(_lastday!=7){
            let _lastdayobj;
            for(let i=0; i<6-_lastday; i++){
                _lastdayobj={
                    type:'next',
                    value:i,
                    date:new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+(new Date().getDate()))
                }
                dayArr.push(_lastdayobj);
            }

        } else{
            let _lastdayobj;
            for(let i=0; i<6; i++){
                _lastdayobj={
                    type:'next',
                    value:i,
                    date:new Date(new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+(new Date().getDate()))
                }
                dayArr.push(_lastdayobj);
            }
        }

        //week
        if(this.showType=='week'){
            let _self=this;
            let _weekArr=[];
            //let _tempArr=[];
            for(let i=0;i<dayArr.length/7;i++){
                _weekArr.push({
                    arr:[],
                    state:false
                });
            }
            dayArr.map(function(item,index){
                let _weekIndex=Math.floor((index+1)/7-0.01);
                if(!_weekArr[_weekIndex].state&&item.date.getTime()>=_self.startTime.getTime()&&item.date.getTime()<=_self.endTime.getTime()){
                    _weekArr[_weekIndex].state=true;
                }
                _weekArr[_weekIndex].arr.push(item)
            });
            for(let i in _weekArr){
                let _weekArrChild=_weekArr[i];
                if(_weekArrChild.state){
                    let _tempArr=[];
                    for(let  j in _weekArrChild.arr){
                        _tempArr.push(_weekArrChild.arr[j]);
                    }
                    dayArr=_tempArr;
                    break;
                }
            }
        }


        //export
        this.nowDateArr=dayArr;//当前日期列表
        this.nowDate=date;//当前日期


        //body
        let bodyListHead='';
        let bodyListItem='';
        let bodyListItemNext='';
        bodyListHead+='<div class="dateGet_body_list_head">';
        for(let i in weekStr){
            let weekStyle = '';
            if (weekStr[i]==='六'||weekStr[i]==='日') {
                weekStyle = ' font_green';
            }
            bodyListHead+='<div class="dateGet_body_list_head_item '+weekStyle+'">'+weekStr[i]+'</div>';
        }
        bodyListHead+='</div>';

        bodyListItem+='<div class="dateGet_body_list_body">';
            for(let i=0;i<dayArr.length;i++){
            if((i)%7==0||i==0){
                bodyListItem+='<div class="dateGet_body_list_item_box">';
            }
            var _active='';
            var _disable='';
            var _flag=0;
            var _first=0;
            var _last=0;
            var _toDayTime=getToDay();
            var _toDay='';
            var _holiday=this.holiday[dayArr[i].date.getTime()];
            var _tag=this.tag[dayArr[i].date.getTime()];//是否售罄
            var _discount=this.tag[dayArr[i].date.getTime()];//是否优惠
            var _Mounth=this.tag[dayArr[i].date.getTime()];//是否显示月份
            var _weekday=this.tag[dayArr[i].date.getTime()];//是否休息上班
            var _selectStyle=this.selectStyle[dayArr[i].datetimestamp];
            var _selectListStyle='';



            if(dayArr[i].date.getTime()<this.startTime.getTime()||dayArr[i].date.getTime()>this.endTime.getTime()){
                _disable='disable';
            }
            if(_selectStyle!==undefined){
                _selectStyle='ic-choose icon icon_all ';
                _selectListStyle='dateGetBorder dateGet_body_list_body_item dateGet_body_list_body_item_now  list-choose';

            }else{
                _selectStyle='icon icon_my icon_all';
                _selectListStyle='dateGetBorder dateGet_body_list_body_item dateGet_body_list_body_item_now';
            }

            if(_tag!==undefined){//售罄
                let _disableClass='';
                if(_tag.disable){
                    _disableClass='disabled'
                    if(_tag.txt!=''){
                        _selectListStyle='dateGetBorder dateGet_body_list_body_item dateGet_body_list_body_item_now disabled dateGet_body_list_body_item_disabled';
                    }
                }
                if(_tag.txt!=''){
                    _tag='<span class="dateGet_tag_disabled '+_disableClass+'"><em>'+_tag.txt+'</em></span>';
                } else{
                    _tag='';
                }
            }else{
                _tag='';
            }
            if(_discount!==undefined){//是否打折
                if(_discount.discount!=''){
                    _discount='<span class="dateGet_tag_discount"><em>'+_discount.discount+'</em></span>';
                } else{
                    _discount='';
                }
            }else{
                _discount='';
            }
            if(_Mounth!==undefined){//是否显示月份
                if(_Mounth.mounth!=''){
                    _Mounth='<span class="dateGet_tag_mounth"><em>'+_Mounth.mounth+'</em></span>';
                } else{
                    _Mounth='';
                }
            }else{
                _Mounth='';
            }
            if(_weekday!==undefined){//是否上班休息
                if(_weekday.weekday!=''){
                    _weekday='<div class="dateGet_tag_week"><em>'+_weekday.weekday+'</em></div>';
                } else{
                    _weekday='';
                }
            }else{
                _weekday='';
            }



            switch (dayArr[i].type){
                case 'prev':
                    bodyListItem+='<div data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGetBorder dateGet_body_list_body_item1 dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val"></span>'+
                        '</div>';
                break;
                case 'today':
                    bodyListItem+='<div data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="today dateGetBorder disable dateGet_body_list_body_item1 dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span><span class="dateGet_today">今天</span>'+
                        '</div>';
                    break;
                case 'now':
                    let index = i-_prevday-1
                    let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                    bodyListItem+='<div data-index="'+index+'" data-time="'+dayArr[i].datetimestamp+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="'+_selectListStyle+' '+_disable+'">'+
                        '<div class="'+_selectStyle+'"></div>'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_tag+_Mounth+_weekday+_discount+
                        '</div>';
                    break;
                case 'next':
                    bodyListItem+='<div data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGetBorder dateGet_body_list_body_item1 dateGet_body_list_body_item_next '+_active+'">'+
                        '<span class="dateGet_val"></span>'+
                        '</div>';
                    break;
            }
            if((i+1)%7==0){
                bodyListItem+='</div>';
            }

        }
        bodyListItem+='</div>';

        let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))

        let body='' +
            '<div class="dateGet_body">' +
            '<div class="dateGet_body_list">' +
            bodyListHead+
            bodyListItem+
            '</div>' +
            '</div>';


        //do
        main+=body;
        this.dom.querySelector('.'+this.dom.className+" .dateGet_inner").innerHTML=main;
    }
    createLayoutDom(){
        if(
            !this.dom.querySelector('.'+this.dom.className+" .dateGet_inner")
            &&
            !this.dom.querySelector('.'+this.dom.className+" .dateGet_animate")
        ){
            let layout='<div class="dateGet">' +
                '<div class="dateGet_inner">' +
                '</div>'+
                '<div class="dateGet_animate">' +
                '</div>' +
                '<div class="dateGet_first">' +
                '<div class="dateGet_first_item"></div>'+
                '</div>' +
                '</div>';
            this.dom.innerHTML=layout;
        }
    }


    //addEvent
    addEvent(){
        let _self=this;
        let _eventStart=function(e){
            let _event=function(ed){
                _self.dom.removeEventListener('touchend',_event)

                if(Math.abs(e.changedTouches[0].clientX-ed.changedTouches[0].clientX)>20||Math.abs(e.changedTouches[0].clientY-ed.changedTouches[0].clientY)>20){
                    return false;
                }
                //选择日期event
                if(e.target.className.search('dateGet_body_list_body_item_now')>=0){
                    e.stopPropagation();
                    let _index=e.target.getAttribute('data-index')-0;

                    if(document.querySelectorAll('.dateGet_body_list_body_item_now')[_index].className.indexOf('disabled')>-1){
                        //alert('不能点击哦')
                    } else{
                        let _timestamp = new Date().getTime();
                        LS.setItem('planFreedom_timestamp',_timestamp);
                        if(document.querySelectorAll('.icon')[_index].className.indexOf('ic-choose')>-1){//取消选中
                            let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                            for(let i=0;i<=planFreedom_json.length;i++){
                                if(planFreedom_json[i] == e.target.getAttribute('data-time')){
                                    planFreedom_json.splice(i,1)
                                    LS.setItem('planFreedom_json',JSON.stringify(planFreedom_json));
                                }
                            }
                            if(planFreedom_json.length == '5'){
                                document.querySelectorAll('.tabli')[0].className = 'tabli activeTab'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                            }
                            else if(planFreedom_json.length == '7'){
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli activeTab'
                            }
                            else if(planFreedom_json.length == '15'){
                                document.querySelectorAll('.tabli')[2].className = 'tabli activeTab'
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                            } else{
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                            }
                            setTimeout(function(){
                                document.querySelectorAll('.icon')[_index].className='icon icon_all icon_my'
                                document.querySelectorAll('.dateGet_body_list_body_item')[_index].className='dateGetBorder dateGet_body_list_body_item dateGet_body_list_body_item_now'
                            },100)

                        } else{//选中
                            let planFreedom_json = '';
                            if(LS.getItem('planFreedom_json')){
                                 planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                            } else{
                                 planFreedom_json = []
                            }
                           planFreedom_json.push(e.target.getAttribute('data-time'))
                           LS.setItem('planFreedom_json',JSON.stringify(planFreedom_json));
                            let _tmp = new Array();
                            let _lsJson = JSON.parse(LS.getItem('planFreedom_json'))
                            for(var i in _lsJson){//去重复
                                if(_tmp.indexOf(_lsJson[i])==-1){
                                    _tmp.push(_lsJson[i]);
                                }
                            }
                            LS.setItem('planFreedom_json',JSON.stringify(_tmp));
                            if(_tmp.length == '5'){
                                document.querySelectorAll('.tabli')[0].className = 'tabli activeTab'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                            }
                            else if(_tmp.length == '7'){
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli activeTab'
                            }
                            else if(_tmp.length == '15'){
                                document.querySelectorAll('.tabli')[2].className = 'tabli activeTab'
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                            } else{
                                document.querySelectorAll('.tabli')[2].className = 'tabli'
                                document.querySelectorAll('.tabli')[0].className = 'tabli'
                                document.querySelectorAll('.tabli')[1].className = 'tabli'
                            }
                            setTimeout(function(){
                                document.querySelectorAll('.icon')[_index].className='icon ic-choose icon_all '
                                document.querySelectorAll('.dateGet_body_list_body_item')[_index].className='dateGetBorder dateGet_body_list_body_item dateGet_body_list_body_item_now  list-choose'
                            },100)
                        }
                    }


                }


            };
            _self.dom.addEventListener('touchend',_event)

        };

        //event
        this.dom.removeEventListener('touchstart',_eventStart);
        this.dom.addEventListener('touchstart',_eventStart);
    }


}

//function
//获取当天
function getToDay(){
    let _now=new Date();
    let _year=_now.getFullYear();
    let _month=_now.getMonth();
    let _day=_now.getDate();
    let _newDate=new Date(_year,_month,_day);
    return _newDate;

}
//获取月天数
function getMonthDay(date){
    let _year=date.getFullYear();
    let _month=date.getMonth()+1;
    let _newDate=new Date(_year,_month,0);
    return _newDate.getDate();
}
//获取上个月
function getPrevMonth(date){
    let _year=date.getFullYear();
    let _month=date.getMonth();
    if(_month==0){
        _month=11;
        _year-=1;
    }
    return new Date(_year,_month,0);
}
function getMonth(date){
    let _year=date.getFullYear();
    let _month=date.getMonth()+1;
    return new Date(_year,_month,1);
}
//获取下个月
function getNextMonth(date){
    let _year=date.getFullYear();
    let _month=date.getMonth();
    if(date.getMonth()+2>12){
        _month=1;
        _year+=1;
    }else{
        _month=date.getMonth()+2;
    }
    return new Date(_year,_month,0);
}

//获取上个月天数
function getPrevMonthDay(date){
    return getPrevMonth(date).getDate();
}

//获取月最后一天星期
function getDayLastDay(date){
    let _year=date.getFullYear();
    let _month=date.getMonth()+1;
    let _newDate=new Date(_year,_month,0);
    return _newDate.getDay();
}

//获取月第一天星期
function getDayFirstDay(date){
    let _year=date.getFullYear();
    let _month=date.getMonth();
    let _newDate=new Date(_year,_month,1);
    return _newDate.getDay();
}
//对象属性比较
function compare(propertyName) {
    return function(object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    }
 }
module.exports=dateGet;
