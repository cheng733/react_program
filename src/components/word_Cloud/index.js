import React from 'react'
import 'echarts-wordcloud';
import echarts from 'echarts';

import logo from './logo.png'

export default class WordCloud extends React.Component{
    componentDidMount() {
        let myChart = echarts.init(document.getElementById('main'));
        let maskImage = new Image();
        maskImage.src = logo;
        maskImage.onload = function(){
            myChart.setOption( {
                backgroundColor:'',
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                series: [{
                    type: 'wordCloud',
                    gridSize: 1,
                    sizeRange: [12, 55],
                    rotationRange: [-45, 0, 45, 90],
                    maskImage: maskImage,
                    textStyle: {
                        normal: {
                            color: function() {
                                return 'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) +
                                    ', ' + Math.round(Math.random() * 255) + ')'
                            }
                        }
                    },
                    top: 'center',
                    right: '0',
                    width:'300px',
                    height:'400px',
                    data:[
                        {
                            name: 'javascript',
                            value: 2023,
                        }, {
                            name: 'react',
                            value: 2021
                        }, {
                            name: 'vue',
                            value: 2022
                        }, {
                            name: 'npm',
                            value: 2023
                        }, {
                            name: 'yarn',
                            value: 2024
                        }, {
                            name: 'Jquery',
                            value: 2025
                        }, {
                            name: 'Node',
                            value: 2026
                        }, {
                            name: 'TypeScript',
                            value: 2027
                        }, {
                            name: 'Express',
                            value: 2028
                        }, {
                            name: 'Ant',
                            value: 2029
                        }, {
                            name: 'webpack',
                            value: 2030
                        }, {
                            name: 'html',
                            value: 2031
                        }, {
                            name: 'css',
                            value: 2032
                        }, {
                            name: 'less',
                            value: 2033
                        }, {
                            name: 'Webstorm',
                            value: 2034
                        }]
                }]
            })
        }
    }
    render () {
        return(
                <div id='main' style={{height:400,width:'100%',float:'right'}}/>
        )
    }
}
