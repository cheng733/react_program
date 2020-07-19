import React,{Component} from 'react'
import {Select,Card,Modal, Button,Form,Input}from 'antd'

import './category.css'
import CategoryData from '../../components/categoryData/categoryData'
import {reqAddCategory} from '../../api/ajax'
const { Option } = Select;
 class Category extends Component{
        state={
            data:{},
            pData:[],
            visible: false,
            confirmLoading: false
        }
    getFirstCategory = ()=>{
            this.setState({data:1})
                 return this.state.data
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err&&values.categoryName) {
               if(values.categoryId === '一级分类'){
                   let parentId = '0'
                   let {categoryName} = values
                   reqAddCategory({parentId,categoryName})
               }else{
                   let parentId = values.categoryId
                   let {categoryName} = values
                   reqAddCategory({parentId,categoryName})
               }
                this.setState({
                    confirmLoading: true,
                });
                setTimeout(() => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                        data:2
                    });
                }, 2000);
            }

        });

    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        console.log('render')
            const {data,visible, confirmLoading,pData} = this.state
            const { getFieldDecorator } = this.props.form
            const title = (data.key===undefined?<div>一级分类列表</div>:<div><a onClick={this.getFirstCategory}>一级分类列表</a><span>-->{data.name}</span></div>)
             return (
            <Card title={title} extra={ <Button type="primary" onClick={this.showModal}
            icon='plus'
            >
               Add
                </Button>} style={{ width: '100%',height:'100%' }}>
                <CategoryData getData={(data)=>this.setState({data})}
                              getFirstCategory={this.state.data}
                              getPdata={(pData)=> this.setState({pData}) }
                />
                <Form  className="login-form">
                 <Modal
        title="添加分类"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
            >
                         <Form.Item>
                             {getFieldDecorator('categoryId', {
                                 rules: [{ required: true }],
                                 initialValue:'一级分类'
                             })(
                        <Select style={{ width: '100%'}} >
                            <Option value='0'>一级分类</Option>
                         {pData.map(re =>(
                                 <Option value={re.key} key={re.key}>{re.name}</Option>
                             )
                         )}
                     </Select>
                         )}
                               </Form.Item>
                                 <Form.Item>
                                 {getFieldDecorator('categoryName', {
                                 rules: [{ required: true, message: '请输入分类名称' }],
                             })(
                                 <Input/>
                                 )}
                                 </Form.Item>
                </Modal>
                                 </Form>
            </Card>
        )
    }
}
export default Form.create()(Category)