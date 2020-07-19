export const increment = () =>({type:'INCREMENT',count:1})
export const decrement = () =>({type:'DECREMENT',count:1})
export const incrementAsync = () =>{

    return dispatch =>{
        setTimeout(()=>{
           dispatch(increment())
        },1000)
    }
}

