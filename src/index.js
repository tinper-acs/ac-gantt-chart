/* eslint-disable react/prop-types */
import React, { Component } from 'react';

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');


class AcGanttChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 最近id
  // 最小单位 宽
  //

  // todo 是否引入moment
  // 对日期格式化
  formatDate = (date) => {
    // 月份是否大于9
    const tempMonth = date.getMonth() + 1;
    const month = (tempMonth) > 9 ? tempMonth : `0${tempMonth.toString()}`;
    // 日期是否大于9
    const tempDay = date.getDate();
    const day = (tempDay) > 9 ? tempDay : `0${tempDay.toString()}`;
    return `${date.getFullYear()}-${month}-${day}`;
  };


  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例

    const _this = this;


    const {
      barTitle,
      legendTitle,
      planDate,
      realDate,
      title,
      id,
      planColor = 'green',
      realColor = 'red',
      maxIntervalDay = 5,
      right = 0,
      left = 0,
      bottom = 0,
      top = 0,


    } = this.props;

    const rePlanDate = planDate.reverse();
    const reRealDate = realDate.reverse();


    const planDateStart = rePlanDate.map(item => new Date(item[0])); // 计划开始
    const planDateEnd = rePlanDate.map(item => new Date(item[1])); // 计划结束
    const realDateStart = reRealDate.map(item => new Date(item[0])); // 实际开始
    const realDateEnd = reRealDate.map(item => new Date(item[1])); // 实际结束


    const myChart = echarts.init(document.getElementById(id));

    const option = {
      title: {
        text: title,
        padding: 20,
        left: 30,
        textStyle: {
          fontSize: 17,
          fontWeight: 'bolder',
          color: '#333',
        },
        subtextStyle: {
          fontSize: 13,
          fontWeight: 'bolder',
        },

      },

      toolbox: {
        show: true,
        right: 25,
        feature: {
          saveAsImage: {
            pixelRatio: 5,
          },
        },
      },

      legend: {
        data: legendTitle,
        top: 20,
      },

      grid: {
        containLabel: true,
        show: false,
        right,
        left,
        bottom,
        top,
      },

      xAxis: {
        type: 'time',
        zlevel: 1,
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 70,
          width: 200,
          formatter: value => _this.formatDate(new Date(value)),
        },
        // 最大刻度
        maxInterval: 3600 * 24 * 1000 * maxIntervalDay,
      },
      yAxis: {
        axisLabel: {
          show: false,
          interval: 0,
        },
        data: barTitle, // y轴
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const dateArray = params.map(item => _this.formatDate(item.data));
          const { axisValue } = params[0];
          return `${axisValue}</br>${legendTitle[0]} : ${dateArray[1]}~${dateArray[0]}</br>${legendTitle[1]} : ${dateArray[3]}~${dateArray[2]}`;
        },
      },
      series: [
        {
          name: legendTitle[0],
          type: 'bar',
          stack: '总量2',
          label: {
            normal: {
              show: true,
              color: '#000',
              position: 'right',
              zlevel: 10,
              formatter: (params) => {
                const { name, seriesName } = params;
                return `${name}  ${seriesName}`;
              },
            },
          },
          itemStyle: {
            normal: {
              color: planColor,
              borderColor: '#fff',
            },
          },

          zlevel: -1,
          data: planDateEnd, //  计划结束
        },

        // 计划阶段 白底
        {
          type: 'bar',
          stack: '总量2',
          itemStyle: {
            normal: {
              color: 'white',
              borderColor: '#fff',
            },
          },
          zlevel: 0,
          data: planDateStart, //  计划开始
        },


        {
          name: legendTitle[1],
          type: 'bar',
          stack: '总量3',
          barGap: '0%',
          itemStyle: {
            normal: {
              color: realColor,
            },
          },
          zlevel: -1,
          data: realDateEnd, //  实际结束,
        },
        // 实际阶段 白底
        {
          type: 'bar',
          stack: '总量3',
          barGap: '0%',
          itemStyle: {
            normal: {
              color: 'white',
              borderColor: '#fff',
            },
          },
          zlevel: 0,
          data: realDateStart, //  实际结束,
        },
      ],
    };
    myChart.setOption(option);
  }


  getWidthHeight = (planDate, realDate) => {
    const dateArray = [...planDate, ...realDate].flat()
      .sort((a, b) => (new Date(a)).getTime() - (new Date(b)).getTime());

    // 相差多少毫秒
    const timeNum = (new Date(dateArray.slice(-1))).getTime() - (new Date(dateArray[0])).getTime();
    // 相差多少天
    const dayNum = parseInt((timeNum / 1000 / 60 / 60 / 24), 10);
    return {
      dayNum,
      itemNum: planDate.length,
    };
  };


  render() {
    const {
      id = 'gantt',
      minHeightX = 100,
      minWidthY = 10,
      planDate,
      realDate,
      bgColor = '#eceff1',
    } = this.props;
    const { dayNum, itemNum } = this.getWidthHeight(planDate, realDate);


    const height = `${itemNum * minHeightX}px`;
    const width = `${dayNum * minWidthY}px`;

    return (

      <div
        id={id}
        style={{
          width,
          height,
          backgroundColor: bgColor,
        }}
      />
    );
  }
}

export default AcGanttChart;
