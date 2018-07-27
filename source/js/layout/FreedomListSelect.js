/**
 * Created by zhangxia_sagreen on 2017/3/7.
 */
require('../../css/layout/FreedomListSelect.scss');

let React=require('react');
let ReactDom=require('react-dom');
let sgMethods=require('../modules/sgMethods.js');
let api=require('../modules/api.js');
let LS=require('../modules/localstorage.js');

let _FreedomListselect={};
class FreedomListselect extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            listNum:4,
            closeBtnCallBack:this.props.closeBtnCallBack||function(){},
            selectCallback:this.props.selectCallback||function(){},
            selectedDate:this.props.selectId
        };
        // if(LS.getItem('addressListTime')&&new Date().getTime()-LS.getItem('addressListTime')<15*1000){
        //     this.state.list=JSON.parse(LS.getItem('addressList'));
        //     this.state.listNum=Math.min(4,this.state.list.length);
        // }else{
            // api.getAddressAll()
            // .then((obj)=>{
            //     this.setState({list:obj,listNum:Math.min(4,obj.length)});
            //     LS.setItem('addressList',JSON.stringify(obj));
            //     LS.setItem('addressListTime',new Date().getTime());
            //
            // });
            let _obj={
                city:1,
                selectedDate:this.state.selectedDate
            }
            api.getQueryAvailableSku(_obj).then((obj)=>{
                this.setState({list:obj,listNum:Math.min(4,obj.length)});
            });
        // }

    }

    componentWillMount(){
    }

    componentDidMount(){
            this.show();
    }

    show(){
        if(!this.state.list){
            setTimeout(()=>{
                this.show();
            },100)
        }else{

            let _self=this;
            let _box=document.querySelector('.address_select');
            let _innerBox=document.querySelector('.address_select_inner');
            setTimeout(function(){
                //list height
                let _item=document.querySelectorAll('.address_select_item');
                let _list=document.querySelector('.address_select_list');
                let _listHeight=((_item[0]&&_item[0].clientHeight)||0)*_self.state.listNum;

                if(_item.length==0){
                    _self.show();
                    return false;
                }

                _list.style.height=_listHeight+'px';
                _box.style.transition='opacity 0.3s';
                _innerBox.style.transition='bottom 0.3s  0.3s';

                _box.className='address_select active';
            },100);
        }
    }

    bgClose(e){
        let _e=e.nativeEvent;
        if(this.props.bgClose&&e.nativeEvent.target.className.search('address_select')>=0){
            if(_e.target.className.search('address_select')>=0&&_e.target.className.search('address_select_')<0){
                this.close(e);
            }
        }
    }

    close(e){
        sgMethods.touchClick(e.nativeEvent,()=>{
            this.closeAction();
        });
    }
    closeAction(){
        let _box=document.querySelector('.address_select');
        let _innerBox=document.querySelector('.address_select_inner');
        _box.style.transition='opacity 0.3s 0.3s';
        _innerBox.style.transition='bottom 0.3s';
        _box.className='address_select';
        this.state.closeBtnCallBack();
    }
    selectAddress(i,support,e){
        let _e=e.nativeEvent;
        sgMethods.touchClick(e.nativeEvent,()=>{
            if(support&&_e.target.className.search('icon-edit')<0){
                this.state.selectCallback(this.state.list[i],i);
                this.closeAction();
            }
        });
    }
    render() {
        let _list=[];
        if(!this.state.list){
            this.state.list=[];
        }
        if(this.props.selectId){
            this.state.list.map((item)=>{
                if(this.props.selectId==item.id){
                    item.optionName=item.specOptionDTOList[0].options[0].optionName;
                    _list.push(item);
                }
            });
            this.state.list.map((item)=>{
                if(this.props.selectId!=item.id){
                    item.optionName=item.specOptionDTOList[0].options[0].optionName;
                    _list.push(item);
                }
            });
        }else{
            _list=this.state.list;
        }
        this.state.list=_list;//赋值返回给select使用
        console.log(this.state.list)

        return(
            <div className="address_select" onTouchStart={this.bgClose.bind(this)}>
                <div className="address_select_inner">
                    <div className="address_select_head">
                        <div className="address_select_head_left">选择菜品</div>
                        <div className="address_select_head_right" onTouchStart={this.close.bind(this)}>
                            <i className="icon-down"></i>
                        </div>
                    </div>

                    <div className="address_select_body">
                        <div className="address_select_list">
                            {
                                _list.map((item,index)=>{
                                    let _select = ''
                                    if(this.props.productId==item.productId){
                                        _select=<i className="icon-choose"></i>
                                    }
                                    return <div onTouchStart={this.selectAddress.bind(this,index,item)} key={index} data-id={item.idStr} className="address_select_item" >
                                        <div className="freedom_select_item_left">
                                            <img src={item.smallImage}/>
                                        </div>
                                        <div className="freedom_select_item_center">
                                            <div className="freedom_select_item_info">
                                                <span className="freedom_select_item_name">{item.name}</span>
                                            </div>
                                            <div className="freedom_select_item_info">
                                                <span className="freedom_select_item_jieshao">{item.descInDiyPlan}</span>
                                            </div>
                                            <div className="freedom_select_item_freedom">
                                                <span className="freedom_select_item_price">¥{item.price}</span>
                                                &nbsp;
                                                <div><img src="https://resource.sa-green.cn/image/jpg/V.png"/>尊享价¥{item.memberPrice}</div>
                                            </div>
                                        </div>
                                        <div className="freedom_select_item_right">
                                            {_select}
                                        </div>

                                    </div>

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
}


}


_FreedomListselect.showList=function(selectedDate,selectCallback,productId){
    if(!document.querySelector('.address_select_layout')){
        //creat address dom
        let _address=document.createElement('div');
        _address.className='address_select_layout';
        document.body.appendChild(_address);
    }else{
        document.querySelector('.address_select_layout').innerHTML='';
    }
    ReactDom.render(
        <FreedomListselect
            selectCallback={selectCallback}
            selectId={selectedDate}
            bgClose={true}
            productId={productId}
        />,
        document.querySelector('.address_select_layout')
    );

}

module.exports=_FreedomListselect;
