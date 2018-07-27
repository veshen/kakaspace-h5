/**
 * Created by wangwei on 2017/07/13.
 * tipsText 必选
 * startTime 可选 格式 “yyyy/mm/dd hh:mm:ss”
 * endTime 可选 格式 “yyyy/mm/dd hh:mm:ss”
 */

require('../../css/layout/tipsBar.scss');

let React=require('react');
let ReactDom=require('react-dom');

class TipsBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showTips : false
        }
    }

    componentDidMount(){
        if (this.props.startTime&&this.props.endTime&&this.props.tipsText) {
            var startTime   = Date.parse(new Date(this.props.startTime));
            var endTime     = Date.parse(new Date(this.props.endTime));
            var currentTime = Date.parse(new Date());
            if (currentTime>startTime&&currentTime<endTime) {
                this.setState({
                    showTips : true
                })
            }
        }else if(this.props.startTime&&this.props.tipsText) {
            var startTime   = Date.parse(new Date(this.props.startTime));
            var currentTime = Date.parse(new Date());
            if (currentTime>startTime) {
                this.setState({
                    showTips : true
                })
            }
        }else if(this.props.endTime&&this.props.tipsText){
            var endTime   = Date.parse(new Date(this.props.endTime));
            var currentTime = Date.parse(new Date());
            if (currentTime<endTime) {
                this.setState({
                    showTips : true
                })
            }
        }else if (this.props.tipsText) {
            this.setState({
                showTips : true
            })
        }

    }
    payOrderCheck(bl){

    }
    render(){
        return(
            <section className={this.state.showTips?"tips-bar-box":"hide"}>
                <span className="icon-horn"></span>
                <span className="tips">{this.props.tipsText}</span>
            </section>
        )
    }

}

module.exports=TipsBar;
