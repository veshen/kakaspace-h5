/**
 * Created by peiyuanwu_sagreen on 2017/2/28.
 */
require('../../css/layout/floatPanle.scss');

let React=require('react');
let sgMethods=require('../modules/sgMethods.js');


//floatPanel
//充值协议弹窗
class AgreementPanel extends React.Component{
    constructor(props){
        super(props);
        this.state={
            agreement: props.agreement,
            agreementdata: props.agreementdata
        };
    }

    componentDidMount() {
        document.querySelector('.Agreement_rule_item_right').innerHTML = this.state.agreementdata
        document.querySelector('.agree_bg').style.display='block'
    }
    closeAgreement(){
        document.querySelector('.Agreement_rule').style.display='none';
        setTimeout("document.querySelector('.agree_bg').style.display='none'",500)
    }
    render(){
        return(
            <section>
                <div className="Agreement_rule">
                    <div className="Agreement_rule_head">
                        充返活动协议
                    </div>
                    <div className="Agreement_rule_body">
                        <div className="Agreement_rule_item">
                            <div className="Agreement_rule_item_left"></div>
                            <div className="Agreement_rule_item_right">
                            </div>
                        </div>
                    </div>
                    <div className="Agreement_rule_foot">
                    </div>
                    <div className="close" >
                        <img src="https://resource.sa-green.cn/image/recharge/close.png" onTouchStart={this.closeAgreement.bind(this)}/>
                    </div>
                </div>

                <div className="agree_bg"></div>
            </section>
        )
    }

}

module.exports=AgreementPanel;
