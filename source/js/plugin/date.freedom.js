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

        //multipleLength  已选择的日期  默认为当天
        this.multipleLength = option.multipleLength;

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
        let _Twodate = new Date(this.startTime.getFullYear(),this.startTime.getMonth()+2,0)
        let _TwomonthDay = getMonthDay(_Twodate)
        let _TwomonthFirstDay = getDayFirstDay(_Twodate)
        let _TwomonthLastDay = getDayLastDay(_Twodate)
        let _Threedate = new Date(this.startTime.getFullYear(),this.startTime.getMonth()+3,0)
        let _ThreemonthDay = getMonthDay(_Threedate)
        let _ThreemonthFirstDay = getDayFirstDay(_Threedate)
        let _ThreemonthLastDay = getDayLastDay(_Threedate)
        let dayArr=[]; //当前月每一天的日期对象 和 日期（号）
        let OnedayArr=[];
        let TwodayArr=[];
        let ThreedayArr=[];
        let itemWidth=(window.innerWidth-this.boxMargin*2)/4;



        //datArr
        for(let i=1;i<monthDay+1;i++ ){
            let _obj={
                type:'now',
                value:i,
                date:new Date(date.getFullYear()+'/'+(date.getMonth()+1)+'/'+i)
            };
            dayArr.push(_obj);
            OnedayArr.push(_obj);
        }

        //prev
        if(monthFirstDay!=0){
            for(let i=1;i<monthFirstDay+1;i++){
                let _obj={
                    type:'prev',
                    value:prevMonthDay--
                };
                if(date.getMonth()==0){
                    let _str=date.getFullYear()+'/12/'+_obj.value;
                    _obj.date=new Date(_str);
                }else{
                    let _str=date.getFullYear()+'/'+(date.getMonth())+'/'+_obj.value;
                    _obj.date=new Date(_str);
                }
                dayArr.unshift(_obj)
                OnedayArr.unshift(_obj);
            }
        }

        //next
        if(monthLastDay!=0){
            for(let i=0;i<=5-monthLastDay;i++){
                let _obj={
                    type:'next',
                    value:i+1
                };
                if(date.getMonth()+2>12){
                    let _str=date.getFullYear()+'/1/'+_obj.value;
                    _obj.date=new Date(_str);
                }else{
                    let _str=date.getFullYear()+'/'+(date.getMonth()+2)+'/'+_obj.value;
                    _obj.date=new Date(_str);
                }

                dayArr.push(_obj)
                OnedayArr.push(_obj)
            }
        }


        if(this.allMounth==2||this.allMounth==3){
            //TwodatArr
            for(let i=1;i<_TwomonthDay+1;i++ ){
                let _obj={
                    type:'Twonow',
                    value:i,
                    date:new Date(date.getFullYear()+'/'+(date.getMonth()+2)+'/'+i)
                };
                TwodayArr.push(_obj);
            }
            //Twoprev
            if(_TwomonthFirstDay!=0){
                for(let i=1;i<_TwomonthFirstDay+1;i++){
                    let _obj={
                        type:'Twoprev',
                        value:prevMonthDay--
                    };
                    if(date.getMonth()==0){
                        let _str=date.getFullYear()+'/12/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }
                    TwodayArr.unshift(_obj)
                }
            }else{
                for(let i=1;i<7;i++){
                    let _obj={
                        type:'Twoprev',
                        value:prevMonthDay--
                    };
                    if(date.getMonth()==0){
                        let _str=date.getFullYear()+'/12/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }
                    TwodayArr.unshift(_obj)
                }
            }
            //Twonext
            if(_TwomonthLastDay!=0){
                for(let i=0;i<=5-_TwomonthLastDay;i++){
                    let _obj={
                        type:'Twonext',
                        value:i+1
                    };
                    if(date.getMonth()+2>12){
                        let _str=date.getFullYear()+'/1/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+3)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }

                    TwodayArr.push(_obj)
                }
            }
            dayArr=dayArr.concat(TwodayArr)

        }

        if(this.allMounth==3){
            //ThreedatArr
            for(let i=1;i<_ThreemonthDay+1;i++ ){
                let _obj={
                    type:'Threenow',
                    value:i,
                    date:new Date(date.getFullYear()+'/'+(date.getMonth()+3)+'/'+i)
                };
                ThreedayArr.push(_obj);
            }
            //Threeprev
            if(_ThreemonthFirstDay!=0){
                for(let i=1;i<_ThreemonthFirstDay+1;i++){
                    let _obj={
                        type:'Threeprev',
                        value:prevMonthDay--
                    };
                    if(date.getMonth()==0){
                        let _str=date.getFullYear()+'/12/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+2)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }
                    ThreedayArr.unshift(_obj)
                }
            }else{
                for(let i=1;i<7;i++){
                    let _obj={
                        type:'Threeprev',
                        value:prevMonthDay--
                    };
                    if(date.getMonth()==0){
                        let _str=date.getFullYear()+'/12/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+2)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }
                    ThreedayArr.unshift(_obj)
                }
            }
            //Threenext
            if(_ThreemonthLastDay!=0){
                for(let i=0;i<=5-_ThreemonthLastDay;i++){
                    let _obj={
                        type:'Threenext',
                        value:i+1
                    };
                    if(date.getMonth()+2>12){
                        let _str=date.getFullYear()+'/1/'+_obj.value;
                        _obj.date=new Date(_str);
                    }else{
                        let _str=date.getFullYear()+'/'+(date.getMonth()+4)+'/'+_obj.value;
                        _obj.date=new Date(_str);
                    }

                    ThreedayArr.push(_obj)
                }
            }
            dayArr=dayArr.concat(ThreedayArr)

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

        let head='' +
            '<div class="dateGet_head">' +
            '<div class="dateGet_head_center">'+date.getFullYear()+' '+monthStr[date.getMonth()]+'</div>'+
            '</div>';
        //body
        let bodyListHead='';
        let bodyListItem='';
        let bodyListItemNext='';
        bodyListHead+='<div class="dateGet_body_list_head">';
        for(let i in weekStr){
            let weekStyle = '';
            if (weekStr[i]==='六'||weekStr[i]==='日') {
                weekStyle = ' font_red';
            }
            bodyListHead+='<div class="dateGet_body_list_head_item '+weekStyle+'">'+weekStr[i]+'</div>';
        }
        bodyListHead+='</div>';

        bodyListItem+='<div class="dateGet_body_list_body">';
            dayArr=OnedayArr
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
            var _tag=this.tag[dayArr[i].date.getTime()];
            var _selectStyle=this.selectStyle[dayArr[i].date];


            if(_toDayTime.getTime()<=dayArr[dayArr.length-1].date.getTime()&&_toDayTime.getTime()>=dayArr[0].date.getTime()){
                if(_toDayTime.getTime()==dayArr[i].date.getTime()){
                    _toDay='<span class="dateGet_today">今天</span>';
                }
            }


            if(this.nowDay){
                let _self=this;
                if(_self.nowDay.getTime()==dayArr[i].date.getTime()){
                    _flag=1;
                }
            }

            if(this.nowDayArr){
                let _self=this;
                this.nowDayArr.map(function(obj,index){
                    if(obj.getTime()==dayArr[i].date.getTime()){
                        _flag=1;
                        if(index==0){
                            _first=1;
                        }
                        if(index==_self.nowDayArr.length-1){
                            _last=1;
                        }
                    }
                })
            }


            if(dayArr[i].date.getTime()<this.startTime.getTime()||dayArr[i].date.getTime()>this.endTime.getTime()){
                _disable='disable';
            }
            if(_holiday!==undefined){
                _holiday='<span class="dateGet_holiday"><em>'+_holiday+'</em></span>';
            }else{
                _holiday='';
            }
            if(_selectStyle!==undefined){
                _selectStyle='icon-choose icon icon_all';

            }else{
                _selectStyle='icon icon_my icon_all';
            }

            if(_tag!==undefined){
                let _disableClass='';
                if(_tag.disable){
                    _disableClass='disabled'
                }
                _tag='<span class="dateGet_tag '+_disableClass+'"><em>'+_tag.txt+'</em></span>';

            }else{
                _tag='';
            }
            switch (dayArr[i].type){
                case 'prev':
                    bodyListItem+='<div style="visibility:hidden" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'now':
                    let data_index = i-monthFirstDay
                    let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                    bodyListItem+='<div data-index="'+data_index+'" data-time="'+dayArr[i].date+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_now '+' '+_disable+'">'+
                        '<div class="'+_selectStyle+'"></div>'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'next':
                    bodyListItem+='<div style="visibility:hidden"  data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_next '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
            }
            if((i+1)%7==0){
                bodyListItem+='</div>';
            }

        }
        bodyListItem+='</div>';

        bodyListItem+='<div class="dateGet_body_list_body">';
            dayArr=TwodayArr
            bodyListItem+='<div class="nextMonthTag">'+monthStr[date.getMonth()+1]+'</div>'
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
            var _tag=this.tag[dayArr[i].date.getTime()];
            var _selectStyle=this.selectStyle[dayArr[i].date];


            if(this.nowDay){
                let _self=this;
                if(_self.nowDay.getTime()==dayArr[i].date.getTime()){
                    _flag=1;
                }
            }

            if(this.nowDayArr){
                let _self=this;
                this.nowDayArr.map(function(obj,index){
                    if(obj.getTime()==dayArr[i].date.getTime()){
                        _flag=1;
                        if(index==0){
                            _first=1;
                        }
                        if(index==_self.nowDayArr.length-1){
                            _last=1;
                        }
                    }
                })
            }


            if(dayArr[i].date.getTime()<this.startTime.getTime()||dayArr[i].date.getTime()>this.endTime.getTime()){
                _disable='disable';
            }

            if(_selectStyle!==undefined){
                _selectStyle='icon-choose icon icon_all';

            }else{
                _selectStyle='icon icon_my icon_all';
            }

            if(_holiday!==undefined){
                _holiday='<span class="dateGet_holiday"><em>'+_holiday+'</em></span>';
            }else{
                _holiday='';
            }

            if(_tag!==undefined){
                let _disableClass='';
                if(_tag.disable){
                    _disableClass='disabled'
                }
                _tag='<span class="dateGet_tag '+_disableClass+'"><em>'+_tag.txt+'</em></span>';

            }else{
                _tag='';
            }
            switch (dayArr[i].type){
                case 'Twoprev':
                    bodyListItem+='<div style="visibility:hidden"  data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'Twonow':
                    let data_index = i-_TwomonthFirstDay+monthDay
                    bodyListItem+='<div data-index="'+data_index+'" data-time="'+dayArr[i].date+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_now '+_active+' '+_disable+'">'+
                        '<div class="'+_selectStyle+'"></div>'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'Twonext':
                    bodyListItem+='<div style="visibility:hidden"  data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_next '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
            }
            if((i+1)%7==0){
                bodyListItem+='</div>';
            }

        }
        bodyListItem+='</div>';

        bodyListItem+='<div class="dateGet_body_list_body">';
            dayArr=ThreedayArr
            bodyListItem+='<div class="nextMonthTag">'+monthStr[date.getMonth()+2]+'</div>'
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
            var _tag=this.tag[dayArr[i].date.getTime()];
            var _selectStyle=this.selectStyle[dayArr[i].date];



            if(this.nowDay){
                let _self=this;
                if(_self.nowDay.getTime()==dayArr[i].date.getTime()){
                    _flag=1;
                }
            }

            if(this.nowDayArr){
                let _self=this;
                this.nowDayArr.map(function(obj,index){
                    if(obj.getTime()==dayArr[i].date.getTime()){
                        _flag=1;
                        if(index==0){
                            _first=1;
                        }
                        if(index==_self.nowDayArr.length-1){
                            _last=1;
                        }
                    }
                })
            }


            if(dayArr[i].date.getTime()<this.startTime.getTime()||dayArr[i].date.getTime()>this.endTime.getTime()){
                _disable='disable';
            }
            if(_holiday!==undefined){
                _holiday='<span class="dateGet_holiday"><em>'+_holiday+'</em></span>';
            }else{
                _holiday='';
            }


            if(_selectStyle!==undefined){
                _selectStyle='icon-choose icon icon_all';

            }else{
                _selectStyle='icon icon_my icon_all';
            }

            if(_tag!==undefined){
                let _disableClass='';
                if(_tag.disable){
                    _disableClass='disabled'
                }
                _tag='<span class="dateGet_tag '+_disableClass+'"><em>'+_tag.txt+'</em></span>';

            }else{
                _tag='';
            }
            switch (dayArr[i].type){
                case 'Threeprev':
                    bodyListItem+='<div style="visibility:hidden" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'Threenow':
                    let data_index = i-_ThreemonthFirstDay+_TwomonthDay+monthDay
                    bodyListItem+='<div data-index="'+data_index+'" data-time="'+dayArr[i].date+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_now '+_active+' '+_disable+'">'+
                        '<div class="'+_selectStyle+'"></div>'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'Threenext':
                    bodyListItem+='<div style="visibility:hidden" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item1 dateGet_body_list_body_item_next '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
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
        main+=head;
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
                if(e.target.className.search('dateGet_body_list_body_item')>=0){
                    e.stopPropagation();
                    let _index=e.target.getAttribute('data-index')-0;
                    if(document.querySelectorAll('.dateGet_body_list_body_item')[_index].className.indexOf('disable')>-1){
                        //alert('不能点击哦')
                    } else{
                        let _timestamp = new Date().getTime();
                        LS.setItem('planFreedom_timestamp',_timestamp);
                        if(document.querySelectorAll('.icon')[_index].className.indexOf('icon-choose')>-1){//取消选中
                            let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                            for(let i=0;i<=planFreedom_json.length;i++){
                                if(planFreedom_json[i] == e.target.getAttribute('data-time')){
                                    planFreedom_json.splice(i,1)
                                    LS.setItem('planFreedom_json',JSON.stringify(planFreedom_json));
                                }
                            }
                            document.querySelectorAll('.icon')[_index].className='icon icon_all icon_my'
                        } else{//选中
                            if(LS.getItem('planFreedom_json')){
                                let planFreedom_json = JSON.parse(LS.getItem('planFreedom_json'))
                                planFreedom_json.push(e.target.getAttribute('data-time'))
                                LS.setItem('planFreedom_json',JSON.stringify(planFreedom_json));
                            } else{
                                let planFreedom_json = []
                                planFreedom_json.push(e.target.getAttribute('data-time'))
                                LS.setItem('planFreedom_json',JSON.stringify(planFreedom_json));
                            }
                            document.querySelectorAll('.icon')[_index].className='icon icon-choose icon_all'
                        }
                    }



                    if(!_self.selectSwitch||_self.nowDateArr[_index].date.getTime()<_self.startTime.getTime()||_self.nowDateArr[_index].date.getTime()>_self.endTime.getTime()){
                        return false;
                    }

                    if(_self.showType=='week'){
                        _self.startTime=_self.backupStartTime;
                        _self.showType='month';
                        //_self.createDom(getMonth(_self.nowDayArr[0]));
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
