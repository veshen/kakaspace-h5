/**
 * Created by peiyuanwu_sagreen on 2017/2/28.
 */
require('../../css/layout/footerNav.scss');

let React = require('react');
let ReactDom = require('react-dom');
let LS              = require('../modules/localstorage.js');
let api=require('../modules/api.js');
//FooterNavs
class FooterNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count : 0
        }
    }
    componentDidMount() {
        if (this.props.cartCount===undefined) {
            var cartData = JSON.parse(LS.getItem("cartdata"));
            var count = 0;
            if (cartData&&cartData.length>0) {
                for (var i = 0; i < cartData.length; i++) {
                    count += cartData[i].skuCount;
                }
            }
            this.setState({
                count : count
            })
        }
        this.redData()
    }
    redData(){
        var _myArr = [];
        var _orderArr = [];
        api.getFetchRedDots({nodeKey:'root'}).then((res)=>{
            for(let i=0;i<res.length;i++){
                if(res[i].nodeKey == 'my'){
                    _myArr.push(res[i])
                }
                if(res[i].nodeKey == 'orderList'){
                    _orderArr.push(res[i])
                }
            }
            if(_myArr.length==1){
                let _type = _myArr[0].redDotType
                switch (_type){
                    case 1:
                    document.querySelector('.red').innerHTML = '<span class="reddot"></span>'
                    break;
                    case 2:
                    document.querySelector('.red').innerHTML = '<span class="dot-count icon-circle-number" >'+
                        _myArr[0].value+
                    '</span>'
                    break;
                    case 3:
                    document.querySelector('.red').innerHTML = '<div class="dot-word" >'+
                        '<div class="reddot-word">'+
                            _myArr[0].value+
                        '</div><span class="trigle"></span>'+
                    '</div>'
                    break;
                }
            }
            if(_orderArr.length==1){
                let _typeorder = _orderArr[0].redDotType
                console.log(_orderArr)
                switch (_typeorder){
                    case 1:
                    document.querySelector('.orderred').innerHTML = '<span class="reddot"></span>'
                    break;
                    case 2:
                    document.querySelector('.orderred').innerHTML = '<span class="dot-count icon-circle-number" >'+
                        _orderArr[0].value+
                    '</span>'
                    break;
                    case 3:
                    document.querySelector('.orderred').innerHTML = '<div class="dot-word" >'+
                        '<div class="reddot-word">'+
                            _orderArr[0].value+
                        '</div><span class="trigle"></span>'+
                    '</div>'
                    break;
                }

            }

        })


    }
    toHref(path) {
        let _self = this;
        if (path==this.props.pageName) {
            return;
        }
        switch (path) {
            case 'home':
                location.href = "/?#!/list";
                break;
            case 'cart':
                location.href = "/vpage/cart";
                break;
            case 'order':
                api.getRemoveRedDot({nodeKey:'orderList'}).then(()=>{
                    location.href = "/vpage/myOrder";
                })
                setTimeout(function(){
                    location.href = "/vpage/myOrder";
                },5000)

                break;
            case 'my':
                api.getRemoveRedDot({nodeKey:'my'}).then((obj)=>{
                    location.href = "/vpage/my";
                })
                setTimeout(function(){
                    location.href='/vpage/myOrder';
                },5000)
                break;
            case 'plan':
                location.href = "/vpage/planIndex";
                break;
        }
    }
    render() {
        return (
            <nav className="nav-bottom">
                <ul>
                    <li className="home" onClick={this.toHref.bind(this, "home")}>
                        <span className={this.props.pageName == "home"
                            ? "icons icon-home-fill active"
                            : "icons icon-home"}></span>
                        <span className={this.props.pageName == "home"
                            ? "active text"
                            : "text"}>菜单</span>
                    </li>
                    <li className="cart" onClick={this.toHref.bind(this, "cart")}>
                        <span className={this.props.pageName == "cart"
                            ? "icons icon-cart-fill active"
                            : "icons icon-cart"}>
                            <span className={this.props.cartCount && this.props.cartCount > 0
                                ? "dot-count icon-circle-number"
                                : "hide"}>{this.props.cartCount}</span>
                            <span className={this.state.count && this.state.count > 0
                                ? "dot-count icon-circle-number"
                                : "hide"}>{this.state.count}</span>
                        </span>
                        <span className={this.props.pageName == "cart"
                            ? "active text"
                            : "text"}>购物车</span>
                    </li>
                    <div className="plan_enter" onClick={this.toHref.bind(this, "plan")}>
                        <img src="https://resource.sa-green.cn/image/plan/%E8%BD%BB%E4%BD%93%E5%A5%97%E9%A4%90nav.png"/>
                    </div>

                    <li className="order" onClick={this.toHref.bind(this, "order")}>
                        <span className={this.props.pageName == "order"
                            ? "icons icon-order-fill active"
                            : "icons icon-order"}>
                            <div className='orderred'></div>
                        </span>
                        <span className={this.props.pageName == "order"
                            ? "active text"
                            : "text"}>订单</span>
                    </li>
                    <li className="my" onClick={this.toHref.bind(this, "my")}>
                        <span className={this.props.pageName == "user"
                            ? "icons icon-user-fill active"
                            : "icons icon-user"}>
                            <div className='red'></div>
                        </span>
                        <span className={this.props.pageName == "user"
                            ? "active text"
                            : "text"}>我的</span>
                    </li>
                </ul>
            </nav>
        )
    }
}

module.exports = FooterNav;
