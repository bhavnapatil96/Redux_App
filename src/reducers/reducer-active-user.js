export default function (state=null,action) {
    switch (action.type){
        case "USER_SELECTED":
            debugger;
            return action.payload;
            break;
    }
    return state
}