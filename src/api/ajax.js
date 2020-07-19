import ajax from './api'
/*登录*/
export const reqLogin = (username,password) =>ajax('/login',{username,password},'Post')
/*获取一级或二级的分类列表数据*/
export const reqCategoryData = (parentId )=> ajax('/manage/category/list',{parentId})
/*添加分类*/
export const reqAddCategory = ({parentId,categoryName})=> ajax('/manage/category/add',{parentId,categoryName},'Post')
/*更新品类名称*/
export const reqCategoryName = (categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},'Post')
/*获取商品分页列表*/
export const reqProduceLists = (pageNum,pageSize)=> ajax('/manage/product/list',{pageNum,pageSize})
/*根据分类ID获取分类*/
export  const reqGetCategoryById = (categoryId) => ajax('/manage/category/info',{categoryId})
/*删除图片*/
export const reqDeleteImage = (name) => ajax('/manage/img/delete',{name},'Post')
/*添加商品*/
export const reqProductAdd = (categoryId,pCategoryId,name,desc,price,detail,imgs) => ajax('/manage/product/add',{categoryId,pCategoryId,name,desc,price,detail,imgs},'Post')