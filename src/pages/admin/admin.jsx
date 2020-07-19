import React from 'react'
import { Layout,Button,Divider } from 'antd';


import {getuser} from '../../assets/localStorage'
import {Redirect,Route,Switch} from "react-router-dom";
import {LeftNav} from "../../components/left-nav";
import {Home} from '../home/home'
import Category from '../category/category'
import {Products} from '../products/products'
import {Role} from '../role/role'
import {User} from '../user/user'
import {Bar} from '../charts/bar'
import {Line} from '../charts/line'
import {Pie} from '../charts/pie'
import './admin.css'

const { Footer, Content } = Layout;

export default class Admin extends React.Component{
    render() {
        const user = getuser()
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <div style={{display:'flex'}}>
                <LeftNav/>
                <div className='rightSide'>
                    <header className='header'>
                        <div style={{height:'40px',color:'#fff'}}>
                        <div className='content-right'>
                            <span>欢迎&nbsp;admin</span>
                            <Button>退出</Button>
                        </div>
                        </div>
                        <Divider dashed='true'/>
                        <div style={{height:'40px',color:'#fff'}}>
                            <div className='rightSideH3'><span>首&nbsp;页</span></div>
                            <div className='content-bottom'>
                                <span>2020-3-26 23：13：45</span>
                                <span>晴</span>
                            </div>
                        </div>
                    </header>
                    <Content className='rightSideContent'>
                        <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Products}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' component={Pie}/>
                        </Switch>
                    </Content>
                    <Footer style={{position:'absolute',bottom:0,width:'100%',height:20,color:'pink',
                        fontSize:20,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'deeppink'
                    }}>该项目对chrome浏览器的支持最好</Footer>
                </div>
            </div>)
    }
}