/**
 * Created by yangnan on 2018/07.
 */
require('../modules/global.js');
require('../../css/app/kakaqrcode.scss');
// let loading             = require('../layout/loading.js');
let rotateLoading       = require('../layout/rotateLoading.js');
rotateLoading.ready();
let React               = require('react');
let ReactDom            = require('react-dom');
let sgMethods           = require('../modules/sgMethods.js');
let LS                  = require('../modules/localstorage.js');
let Toast               = require('../layout/toast.js');
let diaLogConfirm       = require('../layout/diaLogConfirm');
let api                 = require('../modules/api.js');
// let wx                  = require('weixin-js-sdk');

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo : props.data
        }
        console.log(this.props.data);
    }
    componentWillMount() {

    }
    async submitFn(){
        try {
            rotateLoading.ready();
            const { orderId } = this.props.data;
            const checkNumber = document.querySelector('.code-in').value;
            const res = await api.confirmOrder({orderId,checkNumber});
            rotateLoading.loading_hide();
            Toast.msg([res.msg],2000);
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const orderInfo = this.props.data;
        return (
            <div>
                <div className='content'>
                    <div className='line-box'>
                        <div className='line-box-left'>
                            订单号
                        </div>
                        <div className='line-box-right'>
                            {orderInfo.orderId}
                        </div>
                    </div>
                    <div className='line-box'>
                        <div className='line-box-left'>
                            手机号
                        </div>
                        <div className='line-box-right'>
                            {orderInfo.mobile}
                        </div>
                    </div>
                    <div className='line-box'>
                        <div className='line-box-left'>
                            到店日期
                        </div>
                        <div className='line-box-right'>
                            {orderInfo.bookDay}
                        </div>
                    </div>
                    <div className='line-box'>
                        <div className='line-box-left'>
                            到店人数
                        </div>
                        <div className='line-box-right'>
                            {orderInfo.peerNumber}
                        </div>
                    </div>
                    <div className='line-box'>
                        <div className='line-box-left'>
                            验证密码
                        </div>
                        <div className='line-box-right'>
                            <input className="code-in" placeholder="请输入验证密码" type="text"/>
                        </div>
                    </div>
                </div>
                <div className="submit-btn" onClick={this.submitFn.bind(this)}>提交</div>
            </div>
        )
    }
}

window.onload = async function() {
    try {
        const orderId = sgMethods.urlParmKey('orderId');
        window.location.href = `https://kk.sa-green.cn/order/kakaqrcode.html?orderId=${orderId}`;
        return
        const token = 1;
        const res = await api.queryOrderDetail({orderId,token});
        rotateLoading.loading_hide()
        //init main dom
        sgMethods.initMain();
        updataRender(res);
    } catch (e) {
        console.log(e);
    }


};

function updataRender(res) {

    if (document.querySelector('.loadingBox')) {
        document.querySelector('.loadingBox').innerHTML = '';
    }
    //render
    let _main = document.querySelector('.main');
    // sgMethods.wxShare();
    ReactDom.render(
        <Index
            data={res}
        />, _main);

}
