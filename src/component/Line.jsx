import echarts from '../lib/echarts.min';
import { Component } from "rainbowui-core";
import "../css/component.css";
import "../lib/theme";
import PropTypes from 'prop-types';

export default class Line extends Component {



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


Line.propTypes = $.extend({}, Component.propTypes, {
    option: PropTypes.object,
    theme: PropTypes.string,
    eventType:PropTypes.string,
    eventFunc:PropTypes.func
});


Line.defaultProps = $.extend({}, Component.defaultProps, {
    theme: "default",
    style: { "width": "100%", "height": "400px" },
    option: {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高保费', '最低保费']
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['一月', '二月', '三月', '四月', '五月', '六月']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name: '最高保费',
                type: 'line',
                data: [11, 11, 15, 13, 12, 10],
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: '最低保费',
                type: 'line',
                data: [1, -2, 2, 5, 3, 0],
                markPoint: {
                    data: [
                        { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' },
                        [{
                            symbol: 'none',
                            x: '90%',
                            yAxis: 'max'
                        }, {
                            symbol: 'circle',
                            label: {
                                normal: {
                                    position: 'start',
                                    formatter: '最大值'
                                }
                            },
                            type: 'max',
                            name: '最高点'
                        }]
                    ]
                }
            }
        ]
    }
});
