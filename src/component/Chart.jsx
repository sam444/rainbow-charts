import echarts from '../lib/echarts.min';
import { Component } from "rainbowui-core";
import "../css/component.css";
import "../lib/theme";
import PropTypes from 'prop-types';

export default class Chart extends Component {

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

Chart.propTypes = $.extend({}, Component.propTypes, {
    option: PropTypes.object,
    theme: PropTypes.string,
    eventType:PropTypes.string,
    eventFunc:PropTypes.func
});


Chart.defaultProps = $.extend({}, Component.defaultProps, {
    theme: "default",
    style: { "width": "100%", "height": "400px" },
    option: {
  title: {
                "text": "本年商场顾客男女人数统计",

            },
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                },
            },
            grid: {
                borderWidth: 0,
                top: 110,
                bottom: 95,
            },
            legend: {
                x: '4%',
                top: '11%',
                data: ['女', '男', '平均']
            },
            xAxis: [{
                type: "category",
                data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            }],
            yAxis: [{
                type: "value",
                splitLine: {
                    "show": false
                },
            }],
            series: [{
                name: "女",
                type: "bar",
                stack: "总量",
                barMaxWidth: 35,
                barGap: "10%",
                itemStyle: {
                    normal: {
                        color: "rgba(255,144,128,1)",
                        label: {
                            show: true,
                            textStyle: {
                                color: "#fff"
                            },
                            position: "insideTop",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                data: [
                    709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078
                ],
            },

            {
                name: "男",
                type: "bar",
                stack: "总量",
                itemStyle: {
                    normal: {
                        color: "rgba(0,191,183,1)",
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                data: [
                    327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220
                ]
            }, {
                name: "总数",
                type: "line",
                stack: "总量",
                symbolSize: 10,
                symbol: 'circle',
                itemStyle: {
                    normal: {
                        color: "rgba(252,230,48,1)",
                        barBorderRadius: 0,
                        label: {
                            show: true,
                            position: "top",
                            formatter: function (p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
                data: [
                    1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298
                ]
            },
            ]
}
});
