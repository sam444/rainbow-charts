import echarts from '../lib/echarts.min';
import { Component } from "rainbowui-core";
import "../css/component.css";
import "../lib/theme";
import PropTypes from 'prop-types';

export default class Topology extends Component {

    renderComponent() {
        return (
            <div className="uiChars">
                <div className={this.props.styleClass} style={this.props.style} id={this.props.id} >
                </div>
            </div>
        );
    }

    componentDidMount() {
        const chartObject = this.initOption();
        chartObject.on(this.props.eventType, (params) => {
            this.props.eventFunc(params);
        });
    }

    componentDidUpdate() {
        this.initOption();
    }

    initOption() {
        const myChart = document.getElementById(this.props.id);
        if (myChart) {
            const chartObject = echarts.init(myChart, this.props.theme, {renderer: 'svg'});
            chartObject.setOption(this.props.option);
            return chartObject;
        }
    }

};

Topology.propTypes = $.extend({}, Component.propTypes, {
    option: PropTypes.object,
    theme: PropTypes.string,
    eventType: PropTypes.string,
    eventFunc: PropTypes.func
});


Topology.defaultProps = $.extend({}, Component.defaultProps, {
    option: {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',

                data: [{
                    "name": "flare",
                    "children": [
                        {
                            "name": "flex",
                            "children": [
                                { "name": "FlareVis", "value": 4116 }
                            ]
                        },
                        {
                            "name": "scale",
                            "children": [
                                { "name": "IScaleMap", "value": 2105 },
                                { "name": "LinearScale", "value": 1316 },
                                { "name": "LogScale", "value": 3151 },
                                { "name": "OrdinalScale", "value": 3770 },
                                { "name": "QuantileScale", "value": 2435 },
                                { "name": "QuantitativeScale", "value": 4839 },
                                { "name": "RootScale", "value": 1756 },
                                { "name": "Scale", "value": 4268 },
                                { "name": "ScaleType", "value": 1821 },
                                { "name": "TimeScale", "value": 5833 }
                            ]
                        },
                        {
                            "name": "display",
                            "children": [
                                { "name": "DirtySprite", "value": 8833 }
                            ]
                        }
                    ]
                }],

                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                symbolSize: 7,

                label: {
                    normal: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    }
                },

                leaves: {
                    label: {
                        normal: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    }
                },

                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    },
    theme: "default",
    style: { "width": "600px", "height": "400px" }
});
