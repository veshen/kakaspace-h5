require('../../css/layout/ruler.scss');

let React=require('react');
let ReactDom=require('react-dom');
//充值规则
class Ruler extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rule:props.rule
        };
    }

    componentDidMount() {
        document.querySelector('.plan_rule_item_right').innerHTML = this.state.rule
    }

    render(){
        return(
            <div className="plan_rule">
                <div className="plan_rule_head">
                    {"成长沙拉Q&A"}
                </div>
                <div className="plan_rule_body">
                    <div className="plan_rule_item">
                        <div className="plan_rule_item_left"></div>
                        <div className="plan_rule_item_right"></div>
                    </div>
                </div>
                <div className="plan_rule_foot">
                </div>
            </div>
        )
    }

}
module.exports=Ruler;
