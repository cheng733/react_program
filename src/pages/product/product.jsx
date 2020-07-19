import React,{Component} from 'react'
import { Card,Select,Input,Button,Table} from 'antd'
import {Link} from 'react-router-dom'


import {reqProduceLists} from '../../api/ajax'

const { Option } = Select
export class Product extends Component{
    state={
        columns:[],
        data:[]
    }
    getColumns = () =>{
       const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render:(price)=> '￥'+price
            },
            {
                title: '状态',
                key: 'mode',
                render: ()=><div><Button type='primary'>下架</Button><br/><span>在售</span></div>
            },
            {
                title: '操作',
                key: 'action',
                render: (text,record)=> <div><a onClick={()=>this.pushDate(record)}>详情</a>&nbsp;&nbsp;<a onClick={()=>this.pushRepairData(record)}>修改</a></div>
            },
        ];
       return columns
    }
    pushDate = (record) =>{
           this.props.history.push('/product/detail',record)

    }
    pushRepairData = (record) =>{
        this.props.history.push('/product/addupdate',record)
    }
    componentWillMount() {
        const columns = this.getColumns()
        this.setState({columns})
    }
    async componentDidMount() {
        const response = await reqProduceLists(1,5)
        const result = response.data
        if(result.status ===0){
            const lists = result.data.list
            const data = lists.map(list => ({
                    name:list.name,
                    desc:list.desc,
                    price:list.price,
                    key:list._id,
                    imgs:list.imgs,
                    detail:list.detail,
                    pCategoryId:list.pCategoryId,
                    categoryId:list.categoryId
            }))
            this.setState({data})
        }
    }

    render() {
           const {columns,data} = this.state
        const title = (<div><Select defaultValue="jack" style={{ width: 150 }} >
            <Option value="jack">按名称搜索</Option>
            <Option value="lucy">按描述搜索</Option>
        </Select><Input style={{width:150,margin:'0 15px'}}/><Button type='primary'>搜索</Button></div>)
        return (
            <div>
                <Card title={title} extra={<Link to='/product/addupdate'><Button type='primary' icon='plus'>添加商品</Button></Link>} style={{ width: '100%',height:'100%' }}>
                    <Table columns={columns} dataSource={data} bordered/>
                </Card>
            </div>

        )
    }
}