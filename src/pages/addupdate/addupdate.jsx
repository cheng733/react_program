import React,{Component} from 'react'
import { Card,Icon,Form,Input,Cascader,Upload, message,Button,Modal} from 'antd'
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './addupdate.css'
import {reqCategoryData, reqDeleteImage, reqGetCategoryById} from "../../api/ajax";

const { TextArea } = Input
 class Addupdate extends Component{
     constructor(props) {
         super(props)
         const data = [
             this.props.location.state
         ]
         const html = data[0].detail;
         const contentBlock = htmlToDraft(html);
         let editorState
         if (contentBlock) {
             const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
              editorState = EditorState.createWithContent(contentState);
         }
         this.state = {
             imageUrl: '',
             loading: false,
             editorState: editorState||EditorState.createEmpty(),
             options: [],
             previewVisible: false,
             previewImage: '',
             fileList: [],
             data:data[0],
             target:data[0]?'更新':'添加',
             categoryValue:[],
         }

     }
     handleCancel = () => this.setState({ previewVisible: false });
      getBase64 = (file) =>{
         return new Promise((resolve, reject) => {
             const reader = new FileReader();
             reader.readAsDataURL(file);
             reader.onload = () => resolve(reader.result);
             reader.onerror = error => reject(error);
         });
     }
     handlePreview = async file => {
         if (!file.url && !file.preview) {
             file.preview = await this.getBase64(file.originFileObj);
         }
         this.setState({
             previewImage: file.url || file.preview,
             previewVisible: true,
         });
     };
     handleChange = ({ fileList }) => {

         this.setState({ fileList })}
     handleRemove = async (file) => {
         const name = file.response.data.name
         const response = await reqDeleteImage(name)
         if(response.data.status ===0){
             console.log('delete sucessfully')
         }
     }

     onEditorStateChange=(editorState) => {

         this.setState({
             editorState,
         });
     };
     handleSubmit = e => {
         e.preventDefault();
         this.props.form.validateFieldsAndScroll(async (err, values) => {
             if (!err) {
                 const {fileList, editorState} = this.state
                 const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()))
                 const imgs = fileList.map(file => {
                   if( !!file.response){
                       return  file.response.data.name
                   }else {
                       return file.name
                   }
                 }

                    )
                 const {name, desc, price,category} = values
                  const parentId = category[0]
                 const categoryId = category[1]
               /* const response =  await reqProductAdd(categoryId, parentId, name, desc, price, detail, imgs)
                 const result = response.data
                 if(result.status === 0){
                     console.log('更新商品成功！！！！')
                 }*/
                console.log(values,detail,imgs,parentId,categoryId)
             }
         });
     };

     loadData = async (selectedOptions) => {
         const targetOption = selectedOptions[0];
         targetOption.loading = true
         const id = selectedOptions[0].id
         const response =  await reqCategoryData(id)
         const result = response.data
         console.log('zhi',!!result.data[0])
         if(result.status===0&&!!result.data[0]){
                 const data = result.data
                 const children = data.map(re =>({
                         parentId:re.parentId,
                         value: re._id,
                         label: re.name,
                         id:re._id,
                     }
                 ))
                 console.log('children',targetOption)

                 targetOption.loading = false
                 targetOption.children = children

             this.setState({
                 options:[...this.state.options]
             })

         }else {
             targetOption.suffixIcon = ''
             targetOption.loading = false
             targetOption.isLeaf = true
             this.setState({
                 options:[...this.state.options]
             })
         }
     }
     getCategory =  async (result) => {
         const {target, data} = this.state
         let options
         if (result.status === 0) {
             const data = result.data
              options = data.map(re => {
                     return {
                         parentId: re.parentId,
                         value: re._id,
                         label: re.name,
                         id: re._id,
                         isLeaf: false,
                     }
                 }
             )}
             if (target === '更新'&&data.pCategoryId!=='0') {
                 const categoryId = data.categoryId
                 const response = await reqGetCategoryById(categoryId)
                 const result1 = response.data
                 if (result1.status === 0) {
                     const data =[]
                     data.push( result1.data)
                     const subOptions = data.map(re => {
                             return {
                                 parentId: re.parentId,
                                 value: re._id,
                                 label: re.name,
                                 id: re._id,
                                 isLeaf: true,
                             }
                         }
                     )
                     const targetOption = options.find(option =>option.id===subOptions[0].parentId)
                     targetOption.children = subOptions
                 }
             }

             this.setState({options})
         }
      uploadImageCallBack = (file)=> {
         return new Promise(
             (resolve, reject) => {
                 const xhr = new XMLHttpRequest();
                 xhr.open('POST', '/manage/img/upload');

                 const data = new FormData();
                 data.append('image', file);
                 xhr.send(data);
                 xhr.addEventListener('load', () => {
                     const response = JSON.parse(xhr.responseText);
                     resolve(response);
                 });
                 xhr.addEventListener('error', () => {
                     const error = JSON.parse(xhr.responseText);
                     reject(error);
                 });
             }
         );
     }
     async componentDidMount() {
              const response = await reqCategoryData('0')
              const result = response.data
              this.getCategory(result)
      }
      getUpdateDate = () =>{
              const data = this.state.data
              const categoryId = data.categoryId
              const pCategoryId = data.pCategoryId
                console.log(categoryId,pCategoryId,typeof pCategoryId)

           this.categoryValue = []
          if(pCategoryId==='0'){
              this.categoryValue.push(categoryId)
          }else {
              this.categoryValue.push(pCategoryId)
              this.categoryValue.push(categoryId)
          }
          console.log( this.categoryValue)

      }
         componentWillMount() {
         const {target,data} = this.state
            if (target === '更新') {
                console.log(target,typeof  target,target === '更新',data)
                const {imgs} = data
                this.getUpdateDate()
              const fileList = imgs.map(img => (
                    {
                        uid:img,
                        url:'/upload/'+img,
                        name:img,
                         status:'done',
                    }
                ))
                this.setState({fileList})
                console.log('oprions',this.state.options)
            }
        }

     render() {
         const { editorState,options,previewVisible,fileList,previewImage,data } = this.state
         const {name,desc,price}  = data||{}
        const title = (<div><a onClick={()=>this.props.history.goBack()}><Icon type="arrow-left" /></a>&nbsp;&nbsp;<span>{data?'更新商品':'添加商品'}</span></div>)
        const { getFieldDecorator } = this.props.form;
         const uploadButton = (
             <div>
                 <Icon type="plus" />
                 <div className="ant-upload-text">Upload</div>
             </div>
         );

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 10 },
            },
        };

        return (<Card title={title} style={{ width:'100%',height:'100%'}}>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="商品名称:">
                    {getFieldDecorator('name', {
                        initialValue:name,
                        rules: [{
                                required: true,
                                message: '请输入商品名称'
                            },
                        ],
                    })(<Input placeholder='请输入商品名称'/>)}
                </Form.Item>
                <Form.Item label="商品描述">
                    {getFieldDecorator('desc', {
                        initialValue:desc,
                        rules: [{
                            required: true,
                            message: '请输入商品描述'
                        },
                        ],
                    })(<TextArea placeholder='请输入商品描述'/>)}
                </Form.Item>
                    <Form.Item label="商品价格">
                        {getFieldDecorator('price', {
                            initialValue:price,
                            rules: [{
                                pattern:/^[0-9]+$/,
                                required: true,
                                message: '请输入商品价格'
                            }
                            ],
                        getValueFromEvent:(event)=>{
                            return event.target.value.replace(/\D/g,'')
                        }
                        })(<Input placeholder='请输入商品价格' addonAfter={<div>元</div>}/>)}
                    </Form.Item>
                <Form.Item label="商品分类">
                    {getFieldDecorator('category', {
                        initialValue: this.categoryValue,
                        rules: [{
                            required: true,
                            message: '请指定商品分类'
                        },
                        ],
                    })(<Cascader options={options}
                                 loadData={this.loadData}
                                 placeholder="请指定商品分类" />)}
                </Form.Item>
                <Form.Item label="商品图片">
                  <div className="clearfix">
                        <Upload
                            action="/manage/img/upload"
                            listType="picture-card"
                            fileList={fileList}
                            name='image'
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                            onRemove={this.handleRemove}
                        >
                            {fileList.length >= 3 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </Form.Item>
                <Form.Item label="商品详情"
                wrapperCol={{
                    xs: { span: 24},
                    sm: { span: 18 }
                }
                  }
                           labelCol={{
                               xs: { span: 24},
                               sm: { span: 2 }
                           }
                           }
                >
                    <div>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={this.onEditorStateChange}
                            toolbar={{
                                image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}}
                            }}/>
                        <textarea
                            disabled
                            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                        />
                    </div>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                       提交
                    </Button>
                </Form.Item>
            </Form>
        </Card>)
    }
}
export  default Form.create()(Addupdate)