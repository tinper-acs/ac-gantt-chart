/**
 *
 * @title 应用组件名称
 * @description 应用组件描述
 *
 */

import React, { Component } from 'react';
import AcGanttChart from '../../src/index';

class Demo1 extends Component {

  barTitle = [
    '验线、交底、验料',
    '空调到场交底、验收材料、挂机、布管、打压、自检',
    '新风到场交底、验收材料、挂机、布管、打压、自检',
    // '外门窗到场交底、复测',
    // '柜厨到场交底',
    // '地暖到场交底、验收材料、分水器定位及主管路铺设',
    // '净水、软水系统到场交底、管线施工',
    // '壁炉到场交底、管线施工',
    // '安防系统到场交底、管线施工、点位验收',
    // '智能控制系统交底、管线施工、点位验收',
    // '影院到场交底、管线施工',
  ];
  // 11

  //  计划时间
  planDate = [
    ['2019-01-02', '2019-01-10'],
    ['2019-02-02', '2019-02-15'],
    ['2019-03-16', '2019-03-30'],
  ];

  // 完成时间
  realDate = [
    ['2019-01-02', '2019-01-11'],
    ['2019-02-02', '2019-02-20'],
    ['2019-04-01', '2019-04-10'],
  ];


  render() {

    return (
      <div className="demoPadding">
        <AcGanttChart
          id='gantt' // 组件id
          minWidthY={10} // 每天的最小宽
          minHeightX={80} // 每一组最小高
          title={'2019年度尚层项目工期'} // 甘特图标题
          legendTitle={['计划', '完工']}
          maxIntervalDay={5} // x轴最大刻度
          barTitle={this.barTitle} // bar 上的信息
          planDate={this.planDate} // 计划周期
          realDate={this.realDate}  // 实际周期
          right={100} // 图表左padding
          left={50}   // 图表右padding
          bottom={10}  // 图表下padding
          top={50}  // 图表上padding
          bgColor='#eceff1'  // 图表背景色
        />
      </div>
    );
  }
}

export default Demo1;
