import  React from 'react'
import ReactCanvasNest from 'react-canvas-nest';
import { Calendar } from 'antd';
 import moment from 'moment';
import 'moment/locale/zh-cn';
import { Avatar } from 'antd';
import { Layout, Menu } from 'antd';
import {Link}from 'react-router-dom'

import logo from './image/one-piece-ace-1092633-1280x0.jpeg'
import './blog.less'
import Index from '../../components/combine'
import WordCloud from '../../components/word_Cloud/'


moment.locale('zh-cn');
const {  Sider} = Layout;
const { SubMenu } = Menu;
export default  class Blog extends React.Component {
    handleClick = e => {


    };

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <div className='title'>
                  <header>小程&nbsp;客栈</header>
                 <footer>该网站对chrome浏览器支持较好</footer>
                    <ReactCanvasNest config={{pointColor: '255,0,255',lineColor:'255,0,255'}} />
                <div className='banner'>
                    <div style={{width:'30%',height:'100%',float:'right',boxSizing:' border-box'}}>
                        <div className='title-right'>
                            <Avatar src={logo}  size='large'/>
                            <h2>简介:</h2>
                            <span>这人真懒啥都没留下</span>
                        </div>
                        <WordCloud style={{width:'100%'}}/>
                        <div style={{width:'100%'}}>
                            <Calendar fullscreen={false}/>
                        </div>
                    </div>
                    <div className='banner-left' >
                        <Layout>
                            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                                <div className="logo" />
                                <Menu
                                    onClick={this.handleClick}
                                    style={{ width: 200 }}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    mode="inline" >
                                    <Menu.Item key="/blog" style={{top:'-4px',textAlign:'center',fontSize:'20px'}}>
                                        <Link to='/blog'> 首页</Link>
                                    </Menu.Item>
                                    <SubMenu
                                        key="sub1"
                                        title={<span>JavaScript_code</span>} >
                                        <Menu.Item key="/js">
                                            <Link to='/blog/js'> JS基础知识</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">Option 2</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={
                                            <span>React_code</span>
                                        }
                                    >
                                        <Menu.Item key="/react">
                                            <Link to='/blog/react'> React基础知识</Link>
                                        </Menu.Item>
                                        <Menu.Item key="6">Option 6</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub4"
                                        title={
                                            <span>Vue_code</span>
                                        }>
                                        <Menu.Item key="/VueCode">
                                            <Link to='/blog/vue'>Vue基础知识</Link>
                                        </Menu.Item>
                                        <Menu.Item key="10">Option 10</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Index/>
                        </Layout>
                    </div>
                    </div>
            </div>

        )
    }
}