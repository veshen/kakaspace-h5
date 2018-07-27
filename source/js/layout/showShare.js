/**
 * Created by zhangxia_sagreen on 2017/8/16.
 */

require('../../css/layout/showShare.scss');
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
                <img src="https://resource.sa-green.cn/image/gift/%E5%88%86%E4%BA%AB%E6%B5%AE%E5%B1%82.png"></img>
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
