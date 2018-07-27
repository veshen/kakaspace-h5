/**
 * Created by zhangxia_sagreen on 2017/8/16.
 */
require('../../css/layout/blessing.scss');
let React=require('react');
let ReactDom=require('react-dom');
let sgMethods=require('../modules/sgMethods.js');



class Blessing extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bless:props.bless,
        };
    }
    componentDidMount(){
        document.querySelector('.textarea').style.height = document.querySelector('.textarea').scrollHeight + 'px'

    }
    goReplay(){
        location.href = '/vpage/giftReplay?type=replay'
    }
    //<textarea className="textarea" value={this.state.bless.blessWord} readOnly/>
    render(){
        return(
            <section className="blessing_main">
                <div className="blessing_div">
                    <div className="blessing_name">
                        <div>
                            <img className="toimg" src="https://resource.sa-green.cn/image/gift/TO1.png"></img>
                            {this.state.bless.hisName}
                        </div>
                        {sgMethods.urlParmKey('type') == 'oldUser'&&false ?
                            <div className="replay_wor" onClick={this.goReplay.bind(this)}>
                                <i className="icon-replay"></i>回复
                            </div>:null

                        }
                    </div>
                    <div className="blessing_detail">
                        <div className="textarea">{this.state.bless.blessWord}</div>
                    </div>
                    <div className="blessing_user">
                        <img className="byimg"  src="https://resource.sa-green.cn/image/gift/by1.png"></img>
                        {this.state.bless.myName}
                    </div>
                </div>
                {/*<div className="gift_replay_word">
                    <div className="word_d">
                        回复：太感谢了～
                    </div>
                </div>*/}
            </section>
        )
    }

}

module.exports=Blessing;
