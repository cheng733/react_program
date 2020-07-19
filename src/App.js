import React,{Component} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Blog from "./pages/blog/blog"
import './utils/test.css'


export  default class App extends Component {

    render() {
        let fnTextPopup = function (arr, options) {
            // arr参数是必须的
            if (!arr || !arr.length) {
                return;
            }
            // 主逻辑
            let index = 0;
            document.documentElement.addEventListener('click', function (event) {
                let x = event.pageX, y = event.pageY;
                let eleText = document.createElement('span');
                eleText.className = 'text-popup';
                this.appendChild(eleText);
                if (arr[index]) {
                    eleText.innerHTML = arr[index];
                } else {
                    index = 0;
                    eleText.innerHTML = arr[0];
                }
                // 动画结束后删除自己
                eleText.addEventListener('animationend', function () {
                    eleText.parentNode.removeChild(eleText);
                });
                // 位置
                eleText.style.left = (x - eleText.clientWidth / 2) + 'px';
                eleText.style.top = (y - eleText.clientHeight) + 'px';
                // index递增
                index++;
            });
        };

        fnTextPopup(['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善']);

        return(
                   <BrowserRouter>
                       <Switch>
                           <Route path='/blog' component={Blog}/>
                           <Route path='/login' component={Login}/>
                           <Route path='/' component={Admin} />

                       </Switch>
                   </BrowserRouter>

                      )
    }
  }
