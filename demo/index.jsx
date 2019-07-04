import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import './demo.scss';


import Demo1 from "./demolist/Demo1";
var DemoArray = [{"example":<Demo1 />,"title":" 甘特图","code":"/**\n *\n * @title 甘特图\n * @description 基于Echart甘特图\n *\n */\n\nimport React, { Component } from 'react';\nimport AcGanttChart from '../../src/index';\n\nclass Demo1 extends Component {\n  barTitle = [\n    '验线、交底、验料',\n    '空调到场交底、验收材料、挂机、布管、打压、自检',\n    '新风到场交底、验收材料、挂机、布管、打压、自检',\n    // '外门窗到场交底、复测',\n    // '柜厨到场交底',\n    // '地暖到场交底、验收材料、分水器定位及主管路铺设',\n    // '净水、软水系统到场交底、管线施工',\n    // '壁炉到场交底、管线施工',\n    // '安防系统到场交底、管线施工、点位验收',\n    // '智能控制系统交底、管线施工、点位验收',\n    // '影院到场交底、管线施工',\n  ];\n  // 11\n\n  //  计划时间\n  planDate = [\n    ['2019-01-02', '2019-01-10'],\n    ['2019-02-02', '2019-02-15'],\n    ['2019-03-16', '2019-03-30'],\n  ];\n\n  // 完成时间\n  realDate = [\n    ['2019-01-02', '2019-01-11'],\n    ['2019-02-02', '2019-02-20'],\n    ['2019-04-01', '2019-04-10'],\n  ];\n\n\n  render() {\n    return (\n      <div className=\"demoPadding\">\n        <AcGanttChart\n          id=\"gantt\" // 组件id\n          minWidthY={10} // 每天的最小宽\n          minHeightX={80} // 每一组最小高\n          title=\"2019年度尚层项目工期\" // 甘特图标题\n          legendTitle={['计划', '完工']}\n          maxIntervalDay={5} // x轴最大刻度\n          barTitle={this.barTitle} // bar 上的信息\n          planDate={this.planDate} // 计划周期\n          realDate={this.realDate} // 实际周期\n          right={100} // 图表左padding\n          left={50} // 图表右padding\n          bottom={10} // 图表下padding\n          top={50} // 图表上padding\n          bgColor=\"#eceff1\" // 图表背景色\n        />\n      </div>\n    );\n  }\n}\n\n\n","desc":" 基于Echart甘特图"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code.replace('../../src/index',COMPONENT).replace('../../src',COMPONENT) }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
        </Col>
    )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
            <Row>
            {DemoArray.map((child,index) => {

                return (
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('root'));
