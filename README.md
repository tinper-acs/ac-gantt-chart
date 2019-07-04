# 甘特图 AcGanttChart

## 如何使用

```js
npm install ac-gantt-chart --save

import AcGanttChart from 'ac-gantt-chart';
```

## API

 参数      | 类型                 | 默认值        | 说明
----------|----------------------|--------------|--------------
id        | string               | `gantt`      | 组件id
minWidthY | number               | 10           | 每天的列最小宽
minHeightX| number               | 80           | 每一组最小高
title     | string               | -            | 甘特图标题
legendTitle| array               | []           | 图列标题
maxIntervalDay| number           | 5            | x轴最大刻度
barTitle  | string               | -            | bar 上的信息
planDate  | array                | []           | 计划周期
realDate  | array                | []           | 实际周期
right     | number               | 0            | 图表右padding
left      | number               | 0            | 图表左padding
bottom    | number               | 0            | 图表下padding
top       | number               | 0            | 图表上padding
bgColor   | string               | -            | 图表背景色



## 注意事项

暂无

## 更新日志

