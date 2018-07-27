/**
 * Created by peiyuanwu_sagreen on 2017-3-7.
 */
const holiday={};
const holidayGroup={
    [new Date('2017-4-2').getTime()]:'清明',
    [new Date('2017-4-3').getTime()]:'清明',
    [new Date('2017-4-4').getTime()]:'清明',
    [new Date('2017-4-29').getTime()]:'劳动节',
    [new Date('2017-4-30').getTime()]:'劳动节',
    [new Date('2017-05-01').getTime()]:'劳动节',
    [new Date('2017-05-28').getTime()]:'端午',
    [new Date('2017-05-29').getTime()]:'端午',
    [new Date('2017-05-30').getTime()]:'端午',
    // [new Date('2017-08-01').getTime()]:'建军',
    [new Date('2017-10-01').getTime()]:'国庆',
    [new Date('2017-10-02').getTime()]:'国庆',
    [new Date('2017-10-03').getTime()]:'国庆',
    [new Date('2017-10-04').getTime()]:'中秋',
    [new Date('2017-10-05').getTime()]:'国庆',
    [new Date('2017-10-06').getTime()]:'国庆',
    [new Date('2017-10-07').getTime()]:'国庆',
    [new Date('2017-10-08').getTime()]:'国庆'
};

holiday.check=function(date){
    let _date=new Date(date);
    if(holidayGroup[_date.getTime()]){
        return '节假日'
    }else if(_date.getDay()==0){
        return '周日'
    }else if(_date.getDay()==6){
        return '周六'
    }else if(_date.getDay()==5){
        return '周五'
    }else if(_date.getDay()==4){
        return '周四'
    }else if(_date.getDay()==3){
        return '周三'
    }else if(_date.getDay()==2){
        return '周二'
    }else if(_date.getDay()==1){
        return '周一'
    }
};

module.exports=holiday;
