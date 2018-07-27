require('../../css/layout/recharge.scss');

let React=require('react');
let ReactDom=require('react-dom');
let api=require('../modules/api.js');
let Toast= require('../layout/toast.js');
let rotateLoading= require('../layout/rotateLoading.js');
let wx              = require('weixin-js-sdk');
class Recharge extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cardList : [],
            fold : true
        }
    }

    componentWillMount(){
        this.getBalancetopup();
    }
    async getBalancetopup(){
        try {
            const res = await api.getBalancetopup();
            this.setState({
                cardList : res
            })
            console.log(res,'充值方案')
        } catch (e) {

        } finally {

        }
    }
    async topUpAction(itemObj){
        rotateLoading.ready();
        var timer = setTimeout(function(){
            rotateLoading.loading_hide();
        },10000)
        var This = this;
        var data = {
            "existOrderId": "",
            "amount": itemObj.amount,
            "planId": itemObj.id
        }
        var cardData = this.state.cardList;
        for (var i = 0; i < cardData.length; i++) {
            if (cardData[i].id==itemObj.id&&cardData[i].existOrderId) {
                data.existOrderId = cardData[i].existOrderId;
            }
        }
        try {
            const res = await api.getRechargeAction(data);
            console.log(res);
            for (var i = 0; i < cardData.length; i++) {
                if (cardData[i].id==itemObj.id) {
                    cardData[i].existOrderId = res.orderId;
                    this.setState({
                        cardList : cardData
                    })
                }
            }
            wx.ready(()=>{
                wx.chooseWXPay({
                    timestamp:res.prePayInfoDTO.timestamp-0,
                    nonceStr:res.prePayInfoDTO.nonceStr,
                    package:res.prePayInfoDTO.prePayPackage,
                    signType:res.prePayInfoDTO.signType,
                    paySign:res.prePayInfoDTO.paySign,
                    success: function () {
                        rotateLoading.loading_hide();
                        location.href="/vpage/my";
                        window.clearTimeout(timer);
                    },
                    cancel:function(){
                        rotateLoading.loading_hide();
                        window.clearTimeout(timer);

                    }
                })
            })
        } catch (e) {
            rotateLoading.loading_hide();
            Toast.msg(["咦~充值失败了，重新再试试~"],2000);
            console.log(res);
        } finally {

        }
    }
    foldActive(){
        this.setState({
            fold : false
        })
    }
    render(){
        var classNameArr = []
        switch (this.state.cardList.length) {
            case 4:
            classNameArr = ['fatItem','fatItem','fatItem','fatItem'];
                break;
            case 5:
            classNameArr = ['thinItem','thinItem','thinItem','fatItem','fatItem'];
                break;
            case 6:
            classNameArr = ['thinItem','thinItem','thinItem','thinItem','thinItem','thinItem'];
                break;
            case 7:
            classNameArr = ['smallItem','smallItem','smallItem','smallItem','thinItem','thinItem','thinItem'];
                break;
            default:
            for (var i = 0; i < this.state.cardList.length; i++) {
                classNameArr.push('thinItem')
            }
        }
        var cardList = [];
        var cardData = this.state.cardList;
        for (var i = 0; i < cardData.length; i++) {
            cardList.push(
                <div className={"cardItem "+classNameArr[i]} key={i} onClick={this.topUpAction.bind(this,cardData[i])}>

                    <p className={cardData[i].tips&&cardData[i].tips!==""?"tips":"hide"}>{cardData[i].tips}</p>
                    <div className="balancePicBox">
                        <img className="balancePic" src={cardData[i].planImageUrl}/>
                        {
                            cardData[i].tag==="hot"?
                            <img className="hotTag" src="https://resource.sa-green.cn/images/base/%E5%85%85%E5%80%BChot.png"/>
                            :null
                        }
                    </div>

                </div>
            )
        }
        return(
            <section className="recharge-box">
                <div className="title"><p>选择充值金额</p></div>
                <div className={this.state.fold?"recharge-content heightLimit":"recharge-content"}>
                    {cardList}
                    <div className={this.state.fold?"foldBox":"hide"} onClick={this.foldActive.bind(this)}>
                        <p>查看更多充值优惠<span className="icon-down"></span></p>
                    </div>
                </div>
            </section>
        )
    }

}

module.exports=Recharge;
