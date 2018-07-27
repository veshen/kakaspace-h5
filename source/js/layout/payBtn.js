/**
 * Created by peiyuanwu_sagreen on 2017/3/7.
 */
require('../../css/layout/payBtn.scss');

let React=require('react');
let ReactDom=require('react-dom');
let Toast           = require('../layout/toast.js');
class PayBtn extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.data,123);
    }

    componentDidMount(){

    }
    payOrderCheck(bl){
        if (bl) {
            this.props.payOrder()
        }else{
            Toast.msg([this.props.payBtnStatus.tips],2000,);
        }
    }
    render(){
        return(
            <section className="cart-submit-button-box">
                <div className="cart-submit-button-box-total-l">
                    <span className="number"><span className="unit">¥ </span>{this.props.data.actualPayAmount}</span>
                    <label className={this.props.data.totalDiscountAmount==0?"hide":"discount"}> 已优惠 ¥{this.props.data.totalDiscountAmount}</label>
                </div>
                <div className="cart-submit-button-box-inner">
                    <a onTouchStart={this.payOrderCheck.bind(this,this.props.payBtnStatus.active)} className={this.props.payBtnStatus.active?"cart-submit-button J_pay_btn":"cart-submit-button J_pay_btn gray"}> {this.props.data.actualPayAmount==0?'确认':'微信支付'} </a>
                </div>
            </section>
        )
    }

}

module.exports=PayBtn;
