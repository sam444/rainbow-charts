import echarts from '../lib/echarts.min';
import { Component } from "rainbowui-core";
import "../css/component.css";
import "../lib/theme";
import PropTypes from 'prop-types';

export default class Bar extends Component {

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

Bar.propTypes = $.extend({}, Component.propTypes, {
    option: PropTypes.object,
    theme: PropTypes.string,
    eventType:PropTypes.string,
    eventFunc:PropTypes.func
});


Bar.defaultProps = $.extend({}, Component.defaultProps, {
    theme: "default",
    style: { "width": "100%", "height": "400px" },
    option: {
    tooltip : {
        trigger: 'axis',
        axisPointer : {            
            type : 'shadow'        
        }
    },
    legend: {
        data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis:  {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    series: [
        {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
    ]
}
});
