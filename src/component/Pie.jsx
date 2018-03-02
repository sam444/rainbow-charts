import echarts from '../lib/echarts.min';
import {Component} from "rainbowui-core";
import "../css/component.css";
import "../lib/theme";
import PropTypes from 'prop-types';

export default class Pie extends Component {

    renderComponent() {
        return (
            <div className="uiChars">
                <div className={this.props.styleClass} style={this.props.style} id={this.props.id} >

                </div>
            </div>
        );
    }

    componentDidMount(){
        const chartObject = this.initOption();
        chartObject.on(this.props.eventType, (params) => {
            this.props.eventFunc(params);
        });
    }

    componentDidUpdate(){
        this.initOption();
    }

    initOption(){
        const myChart = document.getElementById(this.props.id);
        if (myChart) {
            const chartObject = echarts.init(myChart,this.props.theme, {renderer: 'svg'});
            chartObject.setOption(this.props.option);
            return chartObject;
        }
    }


};

Pie.propTypes = $.extend({}, Component.propTypes, {
    option:PropTypes.object,
    theme:PropTypes.string,
    eventType:PropTypes.string,
    eventFunc:PropTypes.func
});


Pie.defaultProps = $.extend({}, Component.defaultProps, {
    theme:"default",
    style:{"width":"100%","height":"400px"},
    option: {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ]
        }
    ]
}
});



