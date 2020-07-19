
export default function Count(state=1,action) {
    console.log(state,action)
    switch (action.type) {
        case 'INCREMENT':
            return state+action.count

        case 'DECREMENT':
            return state-action.count

        default:
            return state
    }
}