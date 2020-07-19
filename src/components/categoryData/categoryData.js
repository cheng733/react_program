import React,{Component} from 'react'
import {Table, Form, Modal, Select, Input} from 'antd'

import {reqCategoryData,reqCategoryName} from '../../api/ajax'

 class CategoryData extends Component{
    state = {
        columns:[],
        pData:[],
        loading:true,
        visible: false,
        confirmLoading: false,
        record:{}
    }
    getColumns = () =>{
        const columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
                align:'center'
            },
            {
                title: '操作',
                dataIndex:'operate',
                align:'center',
                render:(text,record)=>(<div><a onClick={()=>this.showModal(record)}>修改分类</a>&nbsp;&nbsp;&nbsp;&nbsp;
                    {this.subData===undefined?( <a onClick={()=>{this.getSubCategory(record)}
                        }>查看子分类</a> ):null}</div>)}


        ]
        return columns
    }
    getInitData = (result) =>{
        const Data = result.map(re =>(
            {   key:re._id,
                name:re.name,
                parentId:re.parentId
            }
            )
        )
        return Data
    }
    getSubCategory = async (record) => {
        this.setState({loading:true})
        const id = record.key
        const response = await reqCategoryData(id)
        const result = response.data
       if(result.status ===0){
           const  subData = this.getInitData(result.data)
           this.subData = subData
          this.props.getData(record)
       }
        this.setState({loading:false})
    }
     getCategory = async () => {
         const response = await reqCategoryData(0)
         const result = response.data
         if (result.status === 0) {
             const pData = this.getInitData(result.data)
             this.setState({pData})
         }
     }
     showModal = (record) => {
        console.log(record)
         this.setState({
             visible: true,
             record
         });
     };
     handleOk = () => {

         this.props.form.validateFields(async (err, values) => {
             let categoryId = this.state.record.key
             let {parentId} = this.state.record
             let {categoryName} = values
             if (!err) {
                 if(categoryName!==this.state.record.name){
                     const response = await reqCategoryName(categoryId, categoryName)
                     const result = response.data
                     if(result.status === 0&&parentId==='0'){
                         this.getCategory()
                     }
                     this.setState({
                         confirmLoading: true,
                     });
                     setTimeout(() => {
                         this.setState({
                             visible: false,
                             confirmLoading: false
                         });
                     }, 2000);

                 }
             }


         });

     };

     handleCancel = () => {
         console.log('Clicked cancel button');
         this.setState({
             visible: false,
         });
     };

    componentWillMount() {
        const columns = this.getColumns();
        this.setState({columns})
    }

    async componentDidMount() {
        const response = await reqCategoryData(0)
        const result = response.data
        if(result.status === 0){
         const pData = this.getInitData(result.data)
            this.props.getPdata(pData)
          this.setState({pData,loading:false})
        }
    }


     render() {
        console.log('render  sub')
         const { getFieldDecorator } = this.props.form;
        const {columns,loading,pData,visible,confirmLoading,record} = this.state
        const a = this.props.getFirstCategory
        if(a===1){
            this.subData =undefined
        }else if(a===2){
            this.getCategory()
        }
        let data = this.subData?this.subData:pData
        return  <div>
         <Table columns={columns}
                       dataSource={data}
                       bordered
                       loading={loading}
                       pagination={{defaultPageSize:3}}

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
                        {getFieldDecorator('categoryName', {
                            rules: [{ required: true }],
                            initialValue:record.name
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                </Modal>
            </Form>
        </div>
    }


 }
 export default Form.create()(CategoryData)
