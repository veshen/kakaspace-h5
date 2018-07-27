/**
 * Created by zhangxia_sagreen on 2017/7/13.
 */
require('../../css/layout/scrollTxt.scss');

let React=require('react');

class ScrollTxt extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    componentDidMount(){
        if(this.props.list.length>1){
            //参与名单轮播
            let user_list=document.querySelector('.scroll_txt_list_inner');
            let user_item=document.querySelectorAll('.scroll_txt_list_inner em');
            let user_item_height=user_item[0].scrollHeight;
            let user_index=0;
            user_list.appendChild(user_item[0].cloneNode(true));
            setInterval(function(){
                if(user_index>=user_item.length){
                    user_list.style.top=(user_item.length*user_item_height)+'px';
                    user_item[0].style.transition='opacity 0s';
                    user_item[0].style.opacity=1;
                    setTimeout(function(){
                        if(user_item[user_item.length]){
                            user_item[user_item.length].style.transition='opacity 0.6s';
                            user_item[user_item.length].style.opacity=1;
                        }
                        user_list.style.transition='top 0s';
                        user_list.style.top=(0)+'px';
                        user_index=0;
                    },10)
                }else{
                    user_list.style.transition='top 0.6s';
                    if(user_item[user_index]){
                        user_item[user_index].style.transition='opacity 0.6s';
                        user_item[user_index].style.opacity=0;
                    }
                    user_index++;
                    if(user_item[user_index]){
                        user_item[user_index].style.transition='opacity 0.6s';
                        user_item[user_index].style.opacity=1;
                    }
                    user_list.style.top='-'+(user_index*user_item_height)+'px';
                }
            },this.props.speed)
        }

    }
    render(){
        let _red='#e9c98b'
        return(
            <div className="scroll_txt_list">
                <div className="scroll_txt_list_inner">
                    {
                        this.props.list.map(function (list,index) {
                            return(
                                <em key={index}>
                                    <i>{list.txt}刚刚完成了一次充值</i>
                                </em>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

module.exports=ScrollTxt;
