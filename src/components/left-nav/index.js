import React,{Component} from 'react'
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

import './leftNav.css'
import {menuList} from '../menu-list/menuList'
const { SubMenu } = Menu;
export class LeftNav extends Component{
    render() {
        return(
            <div style={{height:1200,backgroundColor:'pink',position:'absolute', width:'20%',left:0}} className='aa'>
                <div style={{height:40,display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    fontSize:25,
                    margin:'10px 0'
                }}><Link to='/home'>
                    <img src='favicon.ico' style={{width:40,height:40,marginRight:10}}/></Link>React 后台</div>
                <Menu
                    mode="inline"
                    style={{ width: '100%' }}
                    defaultOpenKeys='/store'
                >
                    {menuList.map(menus => {
                        if(menus.children){
                         return (
                             <SubMenu
                                key={menus.key}
                                title={
                                    <span>
              <Icon type="appstore" />
              <span>{menus.name}</span>
            </span>
                                }
                            >
                                 {menus.children.map(menusChild =>{
                                     return (
                                         <Menu.Item key={menusChild.key}>
                                             <Link to={menusChild.key}>{menusChild.name}</Link>
                                         </Menu.Item>
                                     )
                                 })}
                            </SubMenu>)
                        }else{
                             return (
                                 <Menu.Item key={menus.key}>
                                     <Link to={menus.key}>
                                     <Icon type="mail" />
                                     <span>{menus.name}</span>
                                     </Link>
                                 </Menu.Item>
                             )
                    }
                    })}
                </Menu>
            </div>
        )
    }
}