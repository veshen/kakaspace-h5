/**
 * Created by zhangxia_sagreen on 2017/10/09.
 */
require('../../css/layout/shareRedpack.scss');
let React=require('react');
let ReactDom=require('react-dom');
class ShowShare extends React.Component{
    constructor(props){
        super(props);
        this.state={
            callback:props.callback
        };
    }
    componentDidMount(){
    }
    close(){
        document.querySelector('.share_layout').innerHTML='';
    }
    render(){
        return(
            <section className="share_main" onClick={this.close.bind(this)}>
                <img src="http://resource.sa-green.cn/image/userShareRedPacket/%E9%81%AE%E7%BD%A9-%E7%BA%A2%E5%8C%85.png"></img>
            </section>
        )
    }
}
let _Share={};
_Share.show=(callback)=>{
    if(!document.querySelector('.share_layout')){
        //creat address dom
        let _address=document.createElement('div');
        _address.className='share_layout';
        document.body.appendChild(_address);
    }else{
        document.querySelector('.share_layout').innerHTML='';
    }
    ReactDom.render(
        <ShowShare callback={callback}/>,
        document.querySelector('.share_layout')
    );
};
module.exports=_Share;
