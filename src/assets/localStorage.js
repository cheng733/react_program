/*
1.登录后刷新界面不会跳到登录的界面
2.登录后键入登录的路径不会跳转到登录的界面
3.关掉浏览器后重开不会跳转到登录的界面
*/
import store from 'store'
export  function setuser(user) {
    let time = new Date().getTime()+60000
    store.set('user',user,time)
}
export  function getuser() {
    return store.get('user')||{}
}