import React from 'react'

export const menuList = [
    {
        key:'/home',
        name:'首页',
        type:''
    },
    {
        key:'/store',
        name:'商品',
        type:'',
        children:[
            {  key:'/category',
                name:'品类管理',
                type:''
            },
            {
                key:'/product',
                name:'商品管理',
                type:''
            }
        ]
    },
    {
        key:'/user',
        name:'用户管理',
        type:''
    },{
        key:'/role',
        name:'角色管理',
        type:''
    },
    {
        key:'/charts',
        name:'图形图表',
        type:'',
        children:[
            {
                key:'/charts/bar',
                name:'柱形图',
                type:''
            },
            {
                key:'/charts/line',
                name:'折线图',
                type:''
            },
            {
                key:'/charts/pie',
                name:'饼图',
                type:''
            }
        ]
    }]

