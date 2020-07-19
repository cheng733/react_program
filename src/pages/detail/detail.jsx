import React,{Component} from 'react'
import { Card,Icon,List } from 'antd'

import {reqGetCategoryById} from '../../api/ajax'

export class Detail extends Component{

    constructor(props){
        super(props)
        const data = [
            this.props.location.state
        ]
       this.state ={
            data,
            loading: false,
            hasMore: true,
           pCategoryName:'',
           categoryName:''

        }

    }

    async componentWillMount() {
        const {pCategoryId, categoryId} = this.state.data[0]
        const response1 = await reqGetCategoryById(pCategoryId)
        const response2 =await reqGetCategoryById(categoryId)
        const result1 = response1.data
        const result2 = response2.data
        let pCategoryName,categoryName
        if(result1.status===0){
            pCategoryName = result1.data.name
        }
        if(result2.status===0){
            categoryName = result2.data.name
        }
        this.setState({pCategoryName,categoryName})
    }

    render() {
        const title = (<div><a onClick={()=>{this.props.history.goBack()}} style={{marginRight:10}}><Icon type="arrow-left" /></a> <span>商品详情</span></div>)
        const {pCategoryName,categoryName} = this.state
       return <Card title={title} style={{ width: '100%',height:'100%' }}>
           <List
               dataSource={this.state.data}

               renderItem={item =>
                (<List>
                     <List.Item >
                              <List.Item.Meta
                               description='商品名称:'/>
                              <div>{item.name}</div>
                       </List.Item>
                  <List.Item >
                             <List.Item.Meta
                            description='商品描述:'/>
                             <div>{item.desc}</div>
                   </List.Item>
                    <List.Item >
                        <List.Item.Meta
                            description='商品价格:'/>
                        <div>{item.price}</div>
                    </List.Item>
                    <List.Item >
                        <List.Item.Meta
                            description='所属分类:'/>
                        <div>{pCategoryName!==undefined?pCategoryName+'->'+categoryName:categoryName}</div>
                    </List.Item>
                    <List.Item >
                        <List.Item.Meta
                            description='商品照片:'/>
                        {item.imgs[0]?<img src={`/upload/${item.imgs[0]}`} style={{width:'10rem',height:'10rem'}}/>:<div>no image</div>}
                    </List.Item>
                    <List.Item >
                        <List.Item.Meta
                            description='商品详情:'/>
                        <div dangerouslySetInnerHTML={{__html:item.detail}}/>

                    </List.Item>
              </List>)

               }/>

       </Card>
    }
}