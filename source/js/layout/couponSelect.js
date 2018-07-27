/**
 * Created by peiyuanwu_sagreen on 2017/3/7.
 */
require('../../css/layout/couponSelect.scss');

let React=require('react');
let ReactDom=require('react-dom');
let sgMethods=require('../modules/sgMethods.js');
let api=require('../modules/api.js');
let LS=require('../modules/localstorage.js');
let rotateLoading   = require('../layout/rotateLoading.js');

let _CouponSelect={};
class CouponSelect extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            unavailableList:[],
            listNum:3,
            closeBtnCallBack:this.props.closeBtnCallBack||function(){},
            selectCallback:this.props.selectCallback||function(){},
            id : this.props.selectId,
            item : {},
            allUnAvailable : false
        };
    }

    componentWillMount(){

    }

    componentDidMount(){
        rotateLoading.ready()
        sgMethods.scrollSwitch(false);
        var This = this;
        if (this.props.planCouponList) {
            rotateLoading.loading_hide();
            This.checkCouponList(this.props.planCouponList);
            console.log('this.props.planCouponList',this.props.planCouponList);
        }else{
            api.getCouponForUserList({products:this.props.productList,deliveryTime:this.props.deliveryTime})
            .then((obj)=>{
                rotateLoading.loading_hide();
                console.log(obj);
                This.checkCouponList(obj);
            });
        }
        // this.show();
    }
    checkCouponList(obj){
        var list = [];
        var unavailableList = [];
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].available) {
                list.push(obj[i])
            }else{
                unavailableList.push(obj[i])
            }
        }
        let allUnAvailable = false;
        if (list.length == 0) {
            allUnAvailable = true;
        }
        this.setState({list:list,unavailableList:unavailableList,allUnAvailable:allUnAvailable,listNum:Math.min(3,obj.length)});
    }
    show(){
        if(!this.state.list){
            setTimeout(()=>{
                this.show();
            },100)
        }else{
            let _self=this;
            let _box=document.querySelector('.Coupon_select');
            let _innerBox=document.querySelector('.Coupon_select_inner');
            setTimeout(function(){
                //list height
                let _item=document.querySelectorAll('.Coupon_select_item');
                let _list=document.querySelector('.Coupon_select_list');
                let _listHeight=((_item[0]&&_item[0].clientHeight)||0)*_self.state.listNum;

                if(_item.length==0){
                    _self.show();
                    return false;
                }

                _list.style.height=_listHeight+'px';
                _box.style.transition='opacity 0.3s';
                _innerBox.style.transition='bottom 0.3s  0.3s';

                _box.className='Coupon_select active';
            },300);
        }
    }

    bgClose(e){
        var This = this;
        let _e=e.nativeEvent;
        if(this.props.bgClose&&e.nativeEvent.target.className.search('Coupon_select')>=0){
            if(_e.target.className.search('Coupon_select')>=0&&_e.target.className.search('Coupon_select_')<0){
                this.close(e);
                This.confirmSelect();
            }
        }
    }

    close(e){
        sgMethods.touchClick(e.nativeEvent,()=>{
            this.closeAction();
        });
    }
    closeAction(){

        sgMethods.scrollSwitch(true)
        let _box=document.querySelector('.Coupon_select_layout');
        _box.innerHTML = "";
    }
    selectCoupon(item,e){
        let _e=e.nativeEvent;
        sgMethods.touchClick(e.nativeEvent,()=>{
            if (item.serialId==this.state.id) {
                this.setState({id : ""})
            }else{
                this.setState({id : item.serialId,item : item})
                this.confirmSelect();
            }
        });
    }
    confirmSelect(){
        console.log(this.props.selectId);
        if (this.props.selectId==this.state.id) {
            this.closeAction();//和默认的优惠券相同
        }else if (this.state.id=="") {
            this.props.selectCallback(false);//不使用优惠券
            this.closeAction();
        }else{
            this.props.selectCallback(this.state.item);//更改了优惠券
            this.closeAction();
        }

    }
    render() {
        let _list=[];
        if(!this.state.list){
            this.state.list=[];
        }
        if(this.props.selectId){
            this.state.list.map((item)=>{
                if(this.props.selectId==item.serialId){
                    _list.push(item);
                }
            });
            this.state.list.map((item)=>{
                if(this.props.selectId!=item.serialId){
                    _list.push(item);
                }
            });
        }else{
            _list=this.state.list;
        }
        this.state.list=_list;//赋值返回给select使用


        return(
            <div className="Coupon_select" onTouchStart={this.bgClose.bind(this)}>
                <div className="Coupon_select_inner">
                    <div className="Coupon_select_head">
                        <div className="Coupon_select_head_left">优惠券</div>
                    </div>

                    <div className="Coupon_select_body">
                        <div className={this.state.allUnAvailable?"tipsMessage":"hide"}>
                            <img src="https://resource.sa-green.cn/image/active/%E8%80%83%E5%8D%9A%E7%86%8A.png"/>
                            <p>没有可用的优惠券</p>
                        </div>
                        <div className="Coupon_select_list">
                            {
                                _list.map((item,index)=>{
                                    return  <div key={index} className={item.serialId==this.state.id?"Coupon_select_item selected":"Coupon_select_item"} onTouchStart={this.selectCoupon.bind(this,item)}>
                                                <div className="left">
                                                    <p className="money">
                                                        <span className="rmb">¥</span>{item.attributes.reduce}
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <p className="coupon-name">{item.title}</p>
                                                    <p className="dis">不与其他优惠活动同享</p>
                                                    <p className="use-time">有效期:
                                                        <span className="valid-time">{item.useBeginTimeStr}</span>
                                                        至<span className="valid-time">{item.useEndTimeStr}</span>
                                                    </p>
                                                </div>
                                            </div>

                                })
                            }
                            {
                                this.state.unavailableList.map((item,index)=>{
                                    return  <div key={index} className="Coupon_select_item">
                                                <div className="left">
                                                    <p className="money unavailableColor">
                                                        <span className="rmb unavailableColor">¥</span>{item.attributes.reduce}
                                                    </p>
                                                </div>
                                                <div className="right">
                                                    <p className="coupon-name unavailableColor">{item.title}</p>
                                                    <p className="dis unavailableColor">不与其他优惠活动同享</p>
                                                    <p className="use-time unavailableColor">有效期:
                                                        <span className="valid-time">{item.useBeginTimeStr}</span>
                                                        至<span className="valid-time">{item.useEndTimeStr}</span>
                                                    </p>
                                                </div>
                                            </div>

                                })
                            }
                        </div>
                        <div className="Coupon_select_list_btn">
                            <div onTouchStart={this.confirmSelect.bind(this)}>选好了</div>
                        </div>
                    </div>
                </div>
            </div>
        )
}


}


_CouponSelect.showCoupon=function(id,productList,deliveryTime,selectCallback,planCouponList){
    if(!document.querySelector('.Coupon_select_layout')){
        //creat Coupon dom
        let _Coupon=document.createElement('div');
        _Coupon.className='Coupon_select_layout';
        document.body.appendChild(_Coupon);
    }else{
        document.querySelector('.Coupon_select_layout').innerHTML='';
    }
    ReactDom.render(
        <CouponSelect
            selectCallback={selectCallback}
            selectId={id}
            bgClose={true}
            productList={productList}
            planCouponList={planCouponList}
            deliveryTime={deliveryTime}
        />,
        document.querySelector('.Coupon_select_layout')
    );

}

module.exports=_CouponSelect;
