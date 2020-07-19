import React,{Component} from 'react'

import { Form, Icon, Input, Button,Card,message} from 'antd';

import {reqLogin}from '../../api/ajax'
import ReactCanvasNest from 'react-canvas-nest';
import {Redirect} from "react-router-dom";

import {setUser}from '../../assets/localUser'
import {setuser,getuser} from '../../assets/localStorage'
  class Login extends Component{
        state = {
            user:{}
        }
      handleUsername = (rule,value,callback)=>{
          const regExp = /^[A-z][A-z0-9_]{4,5}$/
          if(!regExp.test(value)){
              callback('以字母开头5-6位，只能是数字、字母和_不能有空格')
          }
          callback()
      }
      handlePassword = (rule,value,callback)=>{
          const regExp = /^[0-9A-z]{5,8}$/
          if(!regExp.test(value)){
              callback('密码只能是数字和字母不能有空格5-8位')
          }
          callback()
      }


     handleSubmit = e => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 const {username, password} = values
                 reqLogin(username, password)
                     .then((response) => {
                     const result = response.data
                         this.setState({user:result.data})
                     if (result.status === 0) {
                         setUser(this.state.user)
                         setuser(this.state.user)
                         this.props.history.replace('/')
                     }else {
                         this.props.form.resetFields()
                         message.error("输入有误请重新输入")
                     }
                 })
                     .catch(function(error){
                        message.error('出现异常，请稍后再试')
                     })
             }
         })
     }
      render() {
          const {getFieldDecorator} = this.props.form;
          const id = getuser()._id
          if (id) {
              return <Redirect to='/'/>
          }
              return (
                  <div style={{width: '100%', height: '100%'}}>
                      <div style={{
                          width: '100%', height: 50, backgroundColor: ' rgba(0,0,25,.3)', textAlign: 'center',
                          fontSize: 25
                      }}>React 小站
                      </div>
                      <ReactCanvasNest config={{pointColor: '255,0,255', lineColor: '255,0,255'}}/>
                      <Card style={{width: 350, margin: '100px auto'}}>
                          <h2 style={{fontSize: 25, fontWeight: 400, textAlign: 'center'}}>用户登录界面</h2>
                          <Form onSubmit={this.handleSubmit}>
                              <Form.Item>
                                  {getFieldDecorator('username', {
                                      rules: [{required: true, message: '请输入用户名'},
                                          {required: true, validator: this.handleUsername}
                                      ],
                                  })(
                                      <Input
                                          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          placeholder="Username"
                                      />,
                                  )}
                              </Form.Item>
                              <Form.Item>
                                  {getFieldDecorator('password', {
                                      rules: [{required: true, message: '请输入密码'},
                                          {required: true, validator: this.handlePassword}
                                      ],
                                  })(
                                      <Input
                                          prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                          type="password"
                                          placeholder="Password"
                                      />,
                                  )}
                              </Form.Item>
                              <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                  Log in
                              </Button>
                          </Form>
                      </Card>
                  </div>
              );
          }
 }
export default Form.create()(Login)