/**
 * Created by peiyuanwu_sagreen on 2017/3/6.
 */
require('../../css/layout/progressLine.scss');

let React=require('react');

class ProgressLine extends React.Component{
    constructor(props){
        super(props);
        this.state={
            width:0
        };

    }
    componentDidMount(){
        let _self=this;

        setTimeout(function(){
            _self.setState({width:_self.props.progress})
        },this.props.time)

    }
    render(){
        return(
            <div className="progress_line">
                <div className="progress_line_bar_bg">
                    <div style={{'width':this.state.width+'%'}} className="progress_line_bar"></div>
                </div>
                <span>{this.state.width}%</span>
            </div>
        )
    }

}

module.exports=ProgressLine;