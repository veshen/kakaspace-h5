/**
 * Created by Kolou on 2017/2/20.
 */
//const
const monthStr=['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
const weekStr=['周一','周二','周三','周四','周五','周六','周日'];

//class
class dateGet {

    constructor(option) {

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

        //domParameter
        this.domParameter={
            headRight:option.headRight||'>',
            headLeft:option.headLeft||'<'
        };

        //holiday
        this.holiday=option.holiday||[];

        //tag
        this.tag=option.tag||[];

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
        date=date||this.startTime;

        let main='';
        let monthDay=getMonthDay(date);
        let prevMonthDay=getPrevMonthDay(date);
        let monthFirstDay=getDayFirstDay(date);
        let monthLastDay=getDayLastDay(date);
        let dayArr=[]; //当前月每一天的日期对象 和 日期（号）
        let itemWidth=(window.innerWidth-this.boxMargin*2)/7;

        //datArr
        for(let i=1;i<monthDay+1;i++ ){
            let _obj={
                type:'now',
                value:i,
                date:new Date(date.getFullYear()+'/'+(date.getMonth()+1)+'/'+i)
            };
            dayArr.push(_obj);
        }

        //prev
        if(monthFirstDay!=0){
            for(let i=1;i<monthFirstDay;i++){
                let _obj={
                    type:'prev',
                    value:prevMonthDay--
                };
                console.log(_obj);
                if(date.getMonth()==0){
                    let _str=date.getFullYear()+'/12/'+_obj.value;
                    _obj.date=new Date(_str);
                }else{
                    let _str=date.getFullYear()+'/'+(date.getMonth())+'/'+_obj.value;
                    _obj.date=new Date(_str);
                }
                dayArr.unshift(_obj)
            }
        }else{
            for(let i=1;i<7;i++){
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
            }
        }

        //next
        if(monthLastDay!=0){
            for(let i=0;i<=6-monthLastDay;i++){
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

        //head
        let _leftBtnShow='';
        let _rightBtnShow='';
        if((new Date(date.getFullYear()+'/'+(date.getMonth()+1)+'/1 0:0').getTime()<=this.startTime.getTime())||this.preAndNextHide){
            _leftBtnShow='disabled';
        }
        if((dayArr[dayArr.length-1].date.getTime()>=this.endTime.getTime())||this.preAndNextHide){
            _rightBtnShow='disabled';
        }


        let head='' +
            '<div class="dateGet_head">' +
            '<div class="dateGet_head_left '+_leftBtnShow+'">'+this.domParameter.headLeft+'</div>' +
            '<div class="dateGet_head_center">'+date.getFullYear()+' '+monthStr[date.getMonth()]+'</div>'+
            '<div class="dateGet_head_right '+_rightBtnShow+'">'+this.domParameter.headRight+'</div>' +
            '</div>';

        //body
        let bodyListHead='';
        let bodyListItem='';
        bodyListHead+='<div class="dateGet_body_list_head">';
        for(let i in weekStr){
            let weekStyle = '';
            if (weekStr[i]==='周六'||weekStr[i]==='周日') {
                weekStyle = ' font_red';
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
            var _tag=this.tag[dayArr[i].date.getTime()];


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
                    if(_flag){
                        _active='active';

                        if(_first&&this.type=='serial'){
                            _active='active first';
                        }
                        if(_last&&this.type=='serial'){
                            _active='active last';
                        }
                        if(this.type!='serial'){
                            _active='active first last';
                        }



                    }

                    bodyListItem+='<div data-index="'+i+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_prev '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'now':
                    if(this.nowDay&&dayArr[i].date.getTime()==this.nowDay.getTime()||_flag){
                        _active='active';

                        if(_first&&this.type=='serial'){
                            _active='active first';
                        }
                        if(_last&&this.type=='serial'){
                            _active='active last';
                        }
                        if(this.type!='serial'){
                            _active='active first last';
                        }


                    }
                    bodyListItem+='<div data-index="'+i+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_now '+_active+' '+_disable+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
                case 'next':
                    if(_flag){
                        _active='active';

                        if(_first&&this.type=='serial'){
                            _active='active first';
                        }
                        if(_last&&this.type=='serial'){
                            _active='active last';
                        }
                        if(this.type!='serial'){
                            _active='active first last';
                        }


                    }

                    bodyListItem+='<div data-index="'+i+'" data-type="'+dayArr[i].type+'" style="height:'+itemWidth+'px;" class="dateGet_body_list_body_item dateGet_body_list_body_item_next '+_active+'">'+
                        '<span class="dateGet_val">'+dayArr[i].value+'</span>'+_holiday+_tag+_toDay+
                        '</div>';
                    break;
            }


            if((i+1)%7==0){
                bodyListItem+='</div>';
            }

        }
        bodyListItem+='</div>';


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

        this.animate();
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

                //左切换event
                if(e.target.className.search('dateGet_head_left')>=0&&e.target.className.search('disabled')<0){
                    e.stopPropagation();
                    if(getPrevMonth(_self.nowDate).getTime()>=_self.startTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                        _self.createDom(getPrevMonth(_self.nowDate));
                    }
                    if(typeof _self.leftCallback=='function'){
                        _self.leftCallback();
                    }
                }

                //右切换event
                if(e.target.className.search('dateGet_head_right')>=0&&e.target.className.search('disabled')<0){
                    e.stopPropagation();
                    if(getNextMonth(_self.nowDate).getTime()<getMonth(_self.endTime).getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                        _self.createDom(getNextMonth(_self.nowDate));
                    }
                    if(typeof _self.rightCallback=='function'){
                        _self.rightCallback();
                    }
                }

                //选择日期event
                if(e.target.className.search('dateGet_body_list_body_item')>=0){
                    e.stopPropagation();
                    let _index=e.target.getAttribute('data-index')-0;

                    if(!_self.selectSwitch||_self.nowDateArr[_index].date.getTime()<_self.startTime.getTime()||_self.nowDateArr[_index].date.getTime()>_self.endTime.getTime()){
                        return false;
                    }

                    if(_self.showType=='week'){
                        _self.startTime=_self.backupStartTime;
                        _self.showType='month';
                        //_self.createDom(getMonth(_self.nowDayArr[0]));
                    }

                    switch (_self.type){
                        case 'single':

                            for(let i=0;i<e.target.childNodes.length;i++){
                                if(e.target.childNodes[i].className&&e.target.childNodes[i].className.search('disabled')>=0){
                                    return false;
                                }
                            }

                            let _tempNowDay=_self.nowDay;

                            //export
                            _self.nowDay=_self.nowDateArr[_index].date;
                            switch(_self.nowDateArr[_index].type){
                                case 'prev':
                                    if(getPrevMonth(_self.nowDate).getTime()>=_self.startTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getPrevMonth(_self.nowDate));
                                    }
                                    break;
                                case 'now':
                                    _self.createDom(_self.nowDate);
                                    break;
                                case 'next':
                                    if(getPrevMonth(_self.nowDate).getTime()<=_self.endTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getNextMonth(_self.nowDate));
                                    }
                                    break;
                            }

                            if((_self.nowDay.getDay()!=6&&_self.nowDay.getDay()!=0)&&_self.weekOnly){
                                _self.nowDay=_tempNowDay;
                                _self.NoSelectCallback(3);//week
                                return false;
                            }

                            if(typeof _self.selectCallback=='function'){
                                _self.selectCallback(_self.nowDay);
                            }

                            break;
                        case 'multiple':
                            for(let i=0;i<e.target.childNodes.length;i++){
                                if(e.target.childNodes[i].className&&e.target.childNodes[i].className.search('disabled')>=0){
                                    return false;
                                }
                            }
                            //export
                            if(_self.nowDayArr){//判断日期数组是否存在
                                let _flag=0;
                                for(let i=0;i<_self.nowDayArr.length;i++){
                                    if(_self.nowDateArr[_index].date.getTime()==_self.nowDayArr[i].getTime()){
                                        _flag=1;
                                        break;
                                    }
                                }
                                if(_flag==1){
                                    let _arr=[];
                                    _self.nowDayArr.map(function(item){
                                        if(_self.nowDateArr[_index].date.getTime()!=item.getTime()){
                                            _arr.push(item)
                                        }
                                    });
                                    _self.nowDayArr=_arr;
                                }else{
                                    _self.nowDayArr.push(_self.nowDateArr[_index].date);
                                }
                            }else{//如果日期数组不存在则初始化一个新的数组
                                _self.nowDayArr=[_self.nowDateArr[_index].date];
                            }
                            if(_self.nowDayArr.length>_self.multipleLength){//如果数组的长度超过了轻体计划的天数
                                _self.nowDayArr.shift()
                            }
                            for (var i = 0; i < _self.nowDayArr.length; i++) {
                                _self.nowDayArr[i].sortTime = _self.nowDayArr[i].getTime();
                                _self.nowDayArr[i].sortIndex = i+1;
                            }

                            //_self.nowDayArr.sort(compare("sortNum"));
                            console.log(_self.nowDayArr);
                            switch(_self.nowDateArr[_index].type){
                                case 'prev':
                                    if(getPrevMonth(_self.nowDate).getTime()>=_self.startTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getPrevMonth(_self.nowDate));
                                    }
                                    break;
                                case 'now':
                                    _self.createDom(_self.nowDate);
                                    break;
                                case 'next':
                                    if(getPrevMonth(_self.nowDate).getTime()<=_self.endTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getNextMonth(_self.nowDate));
                                    }
                                    break;
                            }

                            if(typeof _self.selectCallback=='function'){
                                _self.selectCallback(_self.nowDayArr);
                            }

                            break;
                        case 'serial':
                            if(_self.weekOnly){

                            }
                            //export
                            let _tempArr=_self.nowDayArr;
                            _self.nowDayArr=[];
                            for(let i=0;i<_self.serialNum;i++){
                                _self.nowDayArr.push(new Date(_self.nowDateArr[_index].date.getTime()+i*24*60*60*1000));
                            }
                            for(let i=0;i<_self.nowDayArr.length;i++){
                                let _flag=0;
                                for(let j in _self.tag){
                                    if(_self.tag[j].disable&&j==_self.nowDayArr[i].getTime()){
                                        _flag=1;
                                    }
                                }

                                if(_flag){
                                    _self.nowDayArr=_tempArr;
                                    _self.NoSelectCallback(1);//tag
                                    return false;
                                }

                                if(_self.nowDayArr[i].getTime()>_self.endTime.getTime()){
                                    _self.nowDayArr=_tempArr;
                                    _self.NoSelectCallback(2);//end
                                    return false;
                                }

                                if((_self.nowDayArr[i].getDay()!=6&&_self.nowDayArr[i].getDay()!=0)&&_self.weekOnly){
                                    _self.nowDayArr=_tempArr;
                                    _self.NoSelectCallback(3);//week
                                    return false;
                                }
                            }


                            switch(_self.nowDateArr[_index].type){
                                case 'prev':

                                    if(getPrevMonth(_self.nowDate).getTime()>=_self.startTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getPrevMonth(_self.nowDate));
                                    }

                                    break;
                                case 'now':
                                    _self.createDom(_self.nowDate);
                                    break;
                                case 'next':
                                    if(getPrevMonth(_self.nowDate).getTime()<=_self.endTime.getTime()&&_self.endTime.getTime()!=_self.startTime.getTime()){
                                        _self.createDom(getNextMonth(_self.nowDate));
                                    }
                                    break;
                            }

                            if(typeof _self.selectCallback=='function'){
                                _self.selectCallback(_self.nowDayArr);
                            }

                            break;
                    }


                }


            };
            _self.dom.addEventListener('touchend',_event)

        };

        //event
        this.dom.removeEventListener('touchstart',_eventStart);
        this.dom.addEventListener('touchstart',_eventStart);
    }

    //animate
    animate(){
        let _self=this;
        let _nowDayArr=this.nowDayArr;
        let _nowDateArr=this.nowDateArr;
        let _item=document.querySelectorAll('.'+this.dom.className+" .dateGet_body_list_body_item.active");
        let _animate=document.querySelector('.'+this.dom.className+" .dateGet_animate");
        let _toDay=document.querySelector('.'+this.dom.className+" .dateGet_today");
        if(_toDay){
            _toDay=_toDay.parentNode;
        }else{
            _toDay=false;
        }
        let _animateItem=document.querySelectorAll('.'+this.dom.className+" .dateGet_animate_item");
        let _animateFirstItem=document.querySelector('.'+this.dom.className+" .dateGet_first_item");
        let _padding=_self.boxPadding;//animate padding

        //select 动画
        switch (this.type){
            case 'single':
                //动画dom新增移除
                if(_animateItem.length<_item.length){
                    _animate.innerHTML='<div class="dateGet_animate_item"></div>';
                }
                if(_animateItem.length>_item.length){
                    _animate.innerHTML=''
                }

                //updata
                _animateItem=this.dom.querySelector('.'+this.dom.className+" .dateGet_animate_item");
                _item=this.dom.querySelector('.'+this.dom.className+" .dateGet_body_list_body_item.active");

                //动画dom updata
                if(_item){
                    _animateFirstItem.style.width=_animateItem.style.width=_item.clientWidth-_padding+'px';
                    _animateFirstItem.style.height=_animateItem.style.height=_item.clientHeight-_padding+'px';
                    _animateFirstItem.style.left=_animateItem.style.left=_item.offsetLeft+_padding/2+'px';
                    _animateFirstItem.style.top=_animateItem.style.top=_item.offsetTop+_padding/2+'px';
                    _animateFirstItem.style.opacity=_animateItem.style.opacity=1;
                    _animateFirstItem.style.borderRadius=_animateItem.style.borderRadius='100%';
                    _animateFirstItem.style.transition=_animateItem.style.transition='all 0.3s';
                }


                break;
            case 'multiple':

                _animateItem=this.dom.querySelectorAll('.'+this.dom.className+" .dateGet_animate_item");
                _item=this.dom.querySelectorAll('.'+this.dom.className+" .dateGet_body_list_body_item.active");

                for(let index=0;index<_item.length;index++){
                    let item=_item[index];
                    let _index=item.getAttribute('data-index');
                    let _timeMap=_self.nowDateArr[_index].date.getTime();
                    let _animateShadowItem=document.querySelector('.'+_self.dom.className+" .dateGet_animate_item_"+_timeMap);

                    //动画dom新增
                    if(!_animateShadowItem){
                        _animateShadowItem=document.createElement('div');
                        _animateShadowItem.className="dateGet_animate_item dateGet_animate_item_"+_timeMap;
                        _animate.appendChild(_animateShadowItem);
                        _animateShadowItem=document.querySelector('.'+_self.dom.className+" .dateGet_animate_item_"+_timeMap);
                    }
                    _animateShadowItem.setAttribute('data-time',_timeMap);
                    _animateShadowItem.style.width=item.clientWidth-_padding+'px';
                    _animateShadowItem.style.height=item.clientHeight-_padding+'px';
                    _animateShadowItem.style.left=item.offsetLeft+_padding/2+'px';
                    _animateShadowItem.style.top=item.offsetTop+_padding/2+'px';
                    _animateShadowItem.style.borderRadius = '50%';
                    _animateShadowItem.style.opacity=1;
                    _animateShadowItem.style.transition='all 0.3s';
                    //动画dom存在判断去除圆角
                    // let _nextItem=_item[index].nextSibling;
                    // let _prevItem=_item[index].previousSibling;
                    // let _prevParentItem=false;
                    // let _nextParentItem=false;
                    // if(_item[index].parentNode.nextSibling){
                    //     _prevParentItem=_item[index].parentNode.nextSibling.firstChild;
                    // }
                    // if(_item[index].parentNode.previousSibling){
                    //     _nextParentItem=_item[index].parentNode.previousSibling.lastChild;
                    // }
                    //
                    // if(
                    //     _prevItem
                    //     &&
                    //     _prevItem.className.search('active')>=0
                    //     &&
                    //     _nextItem
                    //     &&
                    //     _nextItem.className.search('active')>=0
                    // ){
                    //     _animateShadowItem.style.borderTopLeftRadius='0';
                    //     _animateShadowItem.style.borderBottomLeftRadius='0';
                    //     _animateShadowItem.style.borderTopRightRadius='0';
                    //     _animateShadowItem.style.borderBottomRightRadius='0';
                    //     _animateShadowItem.style.width=item.clientWidth+'px';
                    //     _animateShadowItem.style.left=item.offsetLeft+'px';
                    //
                    // }else if(
                    //     _prevItem
                    //     &&
                    //     _prevItem.className.search('active')>=0
                    // ){
                    //     _animateShadowItem.style.borderTopLeftRadius='0';
                    //     _animateShadowItem.style.borderBottomLeftRadius='0';
                    //     _animateShadowItem.style.borderTopRightRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderBottomRightRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.width=item.clientWidth-_padding/2+'px';
                    //     _animateShadowItem.style.left=item.offsetLeft+'px';
                    //
                    // }else if(
                    //     _nextItem
                    //     &&
                    //     _nextItem.className.search('active')>=0
                    // ){
                    //     _animateShadowItem.style.borderTopLeftRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderBottomLeftRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderTopRightRadius='0';
                    //     _animateShadowItem.style.borderBottomRightRadius='0';
                    //     _animateShadowItem.style.width=item.clientWidth-_padding/2+'px';
                    //
                    // }else{
                    //     _animateShadowItem.style.borderTopLeftRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderBottomLeftRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderTopRightRadius=item.clientWidth-_padding+'px';
                    //     _animateShadowItem.style.borderBottomRightRadius=item.clientWidth-_padding+'px';
                    // }
                    //
                    //
                    // if(
                    //     !_item[index].nextSibling
                    //     &&
                    //     _prevParentItem
                    //     &&
                    //     _prevParentItem.className.search('active')>=0
                    //     &&
                    //     _prevParentItem.offsetLeft!=_prevItem.offsetLeft
                    //     &&
                    //     _prevParentItem.offsetTop!=_prevItem.offsetTop
                    // ){
                    //     _animateShadowItem.style.borderTopRightRadius='0';
                    //     _animateShadowItem.style.borderBottomRightRadius='0';
                    //     _animateShadowItem.style.width=item.clientWidth+_self.boxMargin+'px';
                    // }
                    //
                    // if(
                    //     !_item[index].previousSibling
                    //     &&
                    //     _nextParentItem
                    //     &&
                    //     _nextParentItem.className.search('active')>=0
                    //     &&
                    //     _nextParentItem.offsetLeft!=_nextItem.offsetLeft
                    //     &&
                    //     _nextParentItem.offsetTop!=_nextItem.offsetTop
                    // ){
                    //     _animateShadowItem.style.borderTopLeftRadius='0';
                    //     _animateShadowItem.style.borderBottomLeftRadius='0';
                    //     _animateShadowItem.style.width=item.clientWidth+_self.boxMargin+'px';
                    //     _animateShadowItem.style.left=item.offsetLeft-_self.boxMargin+'px';
                    //
                    // }
                }

                //移除多余动画dom
                for(let i=0;i<_animateItem.length;i++){
                    let item=_animateItem[i];
                    let _timeMap=item.getAttribute('data-time');
                    let _flag=0;

                    _nowDayArr.map(function(time){
                        if(
                            _timeMap==time.getTime()
                            &&
                            _timeMap>=_nowDateArr[0].date.getTime()
                            &&
                            _timeMap<=_nowDateArr[_nowDateArr.length-1].date.getTime()
                        ){
                            _flag=1;
                        }
                    });
                    if(_flag==0){
                        item.style.opacity=0;
                        setTimeout(function(){
                            if(item.parentNode){
                                item.parentNode.removeChild(item);
                            }
                        },300);
                    }

                }

                break;

            case 'serial':
                let _tempArr=[];
                let _tempArrIndex=[];
                let _animateShadowItemGroup=document.querySelectorAll('.'+_self.dom.className+" .dateGet_animate_item");

                //根据高度归类
                for(let i=0;i<_item.length;i++){
                    let item=_item[i];
                    if(!_tempArr[item.offsetTop]){
                        _tempArr[item.offsetTop]=[];
                    }
                    _tempArr[item.offsetTop].push(item);
                }

                _tempArr.map(function(item){
                    _tempArrIndex.push(item)
                });
                _tempArr=_tempArrIndex;

                //已存在选中判断去除多余项

                for(let index=0;index<_animateShadowItemGroup.length;index++){
                    let item=_animateShadowItemGroup[index];
                    if(index>=_tempArrIndex.length){
                        item.parentNode.removeChild(item);
                    }
                }

                _animateFirstItem.style.opacity=0;


                //动画dom相关
                _tempArrIndex.map(function(arr,index){
                    setTimeout(function(){
                        let _animateShadowItem=document.querySelector('.'+_self.dom.className+" .dateGet_animate_item_"+index);

                        //新增动画用dom
                        if(!_animateShadowItem){
                            _animateShadowItem=document.createElement('div');
                            _animateShadowItem.className="dateGet_animate_item dateGet_animate_item_"+index;
                            _animate.appendChild(_animateShadowItem);
                            _animateShadowItem=document.querySelector('.'+_self.dom.className+" .dateGet_animate_item_"+index);
                        }

                        //初始化样式
                        if(_tempArrIndex.length>1&&index!=0){
                            _animateShadowItem.style.width='0px';
                            _animateShadowItem.style.height=arr[0].clientHeight-_padding+'px';
                            _animateShadowItem.style.left=arr[0].offsetLeft-_self.boxMargin+'px';
                            _animateShadowItem.style.top=arr[0].offsetTop+_padding/2+'px';
                            _animateShadowItem.style.opacity=1;
                        }else{
                            _animateShadowItem.style.width='0px';
                            _animateShadowItem.style.height=arr[0].clientHeight-_padding+'px';
                            _animateShadowItem.style.left=arr[0].offsetLeft+_padding/2+'px';
                            _animateShadowItem.style.top=arr[0].offsetTop+_padding/2+'px';
                            _animateShadowItem.style.opacity=1;
                        }

                        if(_self.showType=='week'&&_tempArrIndex[0][0].className.search('first')<0){
                            _animateShadowItem.style.width='0px';
                            _animateShadowItem.style.borderTopLeftRadius=0;
                            _animateShadowItem.style.borderBottomLeftRadius=0;
                            _animateShadowItem.style.borderTopRightRadius=arr[0].clientWidth+'px';
                            _animateShadowItem.style.borderBottomRightRadius=arr[0].clientWidth+'px';

                            _animateShadowItem.style.height=arr[0].clientHeight-_padding+'px';
                            _animateShadowItem.style.left=arr[0].offsetLeft-_padding*2+'px';
                            _animateShadowItem.style.top=arr[0].offsetTop+_padding/2+'px';
                            _animateShadowItem.style.opacity=1;

                        }


                        //多行判断
                        if(_tempArrIndex[index+1]){
                            _animateShadowItem.style.borderTopRightRadius=0;
                            _animateShadowItem.style.borderBottomRightRadius=0;
                            _animateShadowItem.style.borderTopLeftRadius=arr[0].clientWidth+'px';
                            _animateShadowItem.style.borderBottomLeftRadius=arr[0].clientWidth+'px';
                        }
                        if(_tempArrIndex[index-1]){
                            _animateShadowItem.style.borderTopLeftRadius=0;
                            _animateShadowItem.style.borderBottomLeftRadius=0;
                            _animateShadowItem.style.borderTopRightRadius=arr[0].clientWidth+'px';
                            _animateShadowItem.style.borderBottomRightRadius=arr[0].clientWidth+'px';
                        }
                        if(!_tempArrIndex[index-1]&&!_tempArrIndex[index+1]){
                            _animateShadowItem.style.borderRadius=arr[0].clientWidth+'px';
                        }

                        //通栏判断
                        if(_tempArrIndex[index].length==7){
                            _animateShadowItem.style.borderTopLeftRadius=0;
                            _animateShadowItem.style.borderBottomLeftRadius=0;
                            _animateShadowItem.style.borderTopRightRadius=0;
                            _animateShadowItem.style.borderBottomRightRadius=0;
                        }

                        //周显示判断
                        if(_self.showType=='week'){
                            if(_tempArrIndex[0].length<_self.serialNum){
                                _animateShadowItem.style.borderTopRightRadius=0;
                                _animateShadowItem.style.borderBottomRightRadius=0;
                            }
                        }

                        //月初月末尾显示判断
                        if(_self.showType=='month'){
                            if(_tempArrIndex[0].length<_self.serialNum&&_item.length<_self.serialNum){
                                if(_tempArrIndex[0][0].className.search('first')>=0){
                                    _animateShadowItem.style.borderTopRightRadius=0;
                                    _animateShadowItem.style.borderBottomRightRadius=0;
                                }else{
                                    _animateShadowItem.style.borderTopLeftRadius=0;
                                    _animateShadowItem.style.borderBottomLeftRadius=0;
                                }
                            }
                        }


                        //间隔执行动画
                        setTimeout(function(){
                            _animateShadowItem.style.transition='all 0.3s';
                            if(_tempArrIndex.length>1){
                                if(index<_tempArrIndex.length-1){
                                    _animateShadowItem.style.width=(arr.length*arr[0].clientWidth-_padding/2+_self.boxMargin)+'px';
                                }else{
                                    _animateShadowItem.style.width=arr.length*arr[0].clientWidth-_padding/2+_self.boxMargin+'px';
                                    _animateShadowItem.style.left=arr[0].offsetLeft-_self.boxMargin+'px';
                                }
                            }else{
                                if(_self.showType=='week') {
                                    if(_tempArrIndex[0].length<_self.serialNum){
                                        if(_tempArrIndex[0][0].className.search('first')>=0){
                                            _animateShadowItem.style.borderTopLeftRadius=arr[0].clientWidth+'px';
                                            _animateShadowItem.style.borderBottomLeftRadius=arr[0].clientWidth+'px';
                                            _animateShadowItem.style.borderTopRightRadius=0;
                                            _animateShadowItem.style.borderBottomRightRadius=0;

                                            _animateShadowItem.style.width=arr.length*arr[0].clientWidth-_padding/2+_self.boxMargin+'px';
                                        }else{
                                            _animateShadowItem.style.borderTopLeftRadius=0;
                                            _animateShadowItem.style.borderBottomLeftRadius=0;
                                            _animateShadowItem.style.borderTopRightRadius=arr[0].clientWidth+'px';
                                            _animateShadowItem.style.borderBottomRightRadius=arr[0].clientWidth+'px';

                                            _animateShadowItem.style.width=arr.length*arr[0].clientWidth-_padding/2+_self.boxMargin+'px';
                                            _animateShadowItem.style.left=arr[0].offsetLeft-_padding*1.1+'px';

                                        }
                                    }else{
                                        _animateShadowItem.style.width=arr.length*arr[0].clientWidth-_padding/2+'px';
                                    }
                                }else{

                                    _animateShadowItem.style.width=arr.length*arr[0].clientWidth-_padding/2+'px';


                                }
                            }
                            //first
                            if(index==0&&_item[0].className.search('first')>=0){
                                if(_self.selectSwitch||(_self.showType!='week'&&!(getToDay().getTime()>_nowDayArr[0].getTime()&&getToDay().getTime()<=_nowDayArr[_nowDayArr.length-1].getTime()))){
                                    _animateFirstItem.style.width=_animateShadowItem.style.height;
                                    _animateFirstItem.style.height=_animateShadowItem.style.height;
                                    _animateFirstItem.style.left=_animateShadowItem.style.left;
                                    _animateFirstItem.style.top=_animateShadowItem.style.top;
                                    _animateFirstItem.style.opacity=_animateShadowItem.style.opacity;
                                    _animateFirstItem.style.transition=_animateShadowItem.style.transition;

                                    if(_nowDayArr[0].getTime()==getToDay().getTime()){
                                        document.querySelector('.'+_self.dom.className+' .dateGet_today').style.display='none';
                                    }
                                }else{
                                    if(_toDay&&!_self.selectSwitch){
                                        document.querySelector('.'+_self.dom.className+' .dateGet_today').style.display='none';
                                        _animateFirstItem.style.width=_animateShadowItem.style.height;
                                        _animateFirstItem.style.height=_animateShadowItem.style.height;
                                        _animateFirstItem.style.left=_toDay.offsetLeft+(_toDay.clientWidth-_animateShadowItem.clientHeight)/2+'px';
                                        _animateFirstItem.style.top=_toDay.offsetTop+(_toDay.clientWidth-_animateShadowItem.clientHeight)/2+'px';
                                        _animateFirstItem.style.opacity=1;
                                    }else{
                                        _animateFirstItem.style.opacity=0;
                                    }
                                }
                            }


                        },1)
                    },index*300);
                });

                break;
        }

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
