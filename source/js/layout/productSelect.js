/**
 * Created by peiyuanwu_sagreen on 2017/3/29.
 */
require('../../css/layout/productSelect.scss');

let React=require('react');
let ReactDom=require('react-dom');
let sgMethods=require('../modules/sgMethods.js');
let api=require('../modules/api.js');

let _ProductSelect={};
class ProductSelect extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            listNum:3,
            closeBtnCallBack:this.props.closeBtnCallBack||function(){},
            selectCallback:this.props.selectCallback||function(){},
        };
        api.getProductList()
            .then((obj)=>{
                this.setState({list:obj,listNum:Math.min(3,obj.length)});

            });

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
            //let _html=document.querySelector('html');
            //let _body=document.body;
            let _box=document.querySelector('.product_select');
            let _innerBox=document.querySelector('.product_select_inner');
            setTimeout(function(){
                //list height
                let _item=document.querySelectorAll('.product_select_item');
                let _list=document.querySelector('.product_select_list');
                let _listHeight=((_item[0]&&_item[0].clientHeight)||0)*_self.state.listNum;

                if(_item.length==0){
                    _self.show();
                    return false;
                }

                _list.style.height=_listHeight+'px';
                _box.style.transition='opacity 0.3s';
                _innerBox.style.transition='bottom 0.3s  0.3s';

                //_html.style.overflowY='hidden';
                //_body.style.overflowY='hidden';
                //_html.style.height='100%';
                //_body.style.height='100%';


                _box.className='product_select active';
            },300);
        }
    }

    bgClose(e){
        let _e=e.nativeEvent;
        if(this.props.bgClose&&e.nativeEvent.target.className.search('product_select')>=0){
            if(_e.target.className.search('product_select')>=0&&_e.target.className.search('product_select_')<0){
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
        //let _html=document.querySelector('html');
        //let _body=document.body;
        let _box=document.querySelector('.product_select');
        let _innerBox=document.querySelector('.product_select_inner');
        _box.style.transition='opacity 0.3s 0.3s';
        _innerBox.style.transition='bottom 0.3s';
        //_html.style.overflowY='auto';
        //_body.style.overflowY='auto';
        //_html.style.height='auto';
        //_body.style.height='auto';

        _box.className='product_select';
        this.state.closeBtnCallBack();
    }
    selectProduct(i,e){
        sgMethods.touchClick(e.nativeEvent,()=>{
            this.state.selectCallback(this.state.list[i],i);
            this.closeAction();
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
                    _list.push(item);
                }
            });
            this.state.list.map((item)=>{
                if(this.props.selectId!=item.id){
                    _list.push(item);
                }
            });
        }else{
            _list=this.state.list;
        }
        this.state.list=_list;//赋值返回给select使用

        return(
            <div className="product_select" onTouchStart={this.bgClose.bind(this)}>
                <div className="product_select_inner">
                    <div className="product_select_head">
                        <div className="product_select_head_left">菜品选择</div>
                        <div className="product_select_head_right" onTouchStart={this.close.bind(this)}>
                            <i className="icon-down"></i>
                        </div>
                    </div>

                    <div className="product_select_body">
                        <div className="product_select_list">
                            {
                                _list.map((item,index)=>{
                                    if(item.description=='fill'){
                                        return
                                    }

                                    let _select=<i className="icon-choose disable"></i>;
                                    if(this.props.selectId==item.productId){
                                        _select=<i className="icon-choose"></i>
                                    }

                                    return <div onTouchStart={this.selectProduct.bind(this,index)} key={index} data-id={item.idStr} className="product_select_item" >
                                        <div className="product_select_item_left">
                                            <div className="product_select_item_img">
                                                <img  src={item.imageUrl}/>
                                            </div>
                                        </div>
                                        <div className="product_select_item_center">
                                            <div className="product_select_item_info">
                                                <span className="product_select_item_name">{item.productName}</span>
                                                <span className="product_select_item_sales">月销{item.sales}</span>
                                                <span className="product_select_item_price">&yen;{item.price}</span>
                                            </div>
                                            <div className="product_select_item_product">
                                                <span className="product_select_item_area">{item.regionName}</span> <span className="product_select_item_product_detail">{item.productDetail}</span>
                                            </div>
                                        </div>
                                        <div className="product_select_item_right">
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


_ProductSelect.showProduct=function(id,selectCallback){
    if(!document.querySelector('.product_select_layout')){
        //creat product dom
        let _product=document.createElement('div');
        _product.className='product_select_layout';
        document.body.appendChild(_product);
    }else{
        document.querySelector('.product_select_layout').innerHTML='';
    }
    ReactDom.render(
        <ProductSelect
            selectCallback={selectCallback}
            selectId={id}
            bgClose={true}
        />,
        document.querySelector('.product_select_layout')
    );

}

module.exports=_ProductSelect;