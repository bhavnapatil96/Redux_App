export const empCRUD= (state=[],action) =>{
    switch (action.type){
        case "EMP_LIST":
            //debugger;
            console.log("in reducer",action.payload);
            return action.payload;
            break;
        case "ADD_EMP":
            console.log("in add reducer",action.payload);
            let record = action.payload;
            state.push(record);
            return state;
            //return action.payload;
            break;
        case "UPDATE_EMP":
            console.log("in update reducer",action.payload);
            //let record = action.payload;
            //state.push(record);
            return state;
            //return action.payload;
            break;
        case "DELETE_EMP":
            let arr=[...state];
            console.log("in delete  reducer",action.payload);
            return [...state].filter((dt)=>dt._id!==action.payload._id);
            break;

    }
    return state;
}
// export const deleteEmp= (state=[],action) =>{
//     switch (action.type){
//         case "DELETE_EMP":
//             console.log("in delete  reducer",action.payload);
//             return action.payload;
//             break;
//     }
//     return state;
// }
export const stateList= (state=[],action) =>{
    switch (action.type){
        case "STATE_LIST":
            console.log("in state list reducer",action.payload);
            return action.payload;
            break;
    }
    return state;
}
export const cityList= (state=[],action) =>{
    switch (action.type){
        case "CITY_LIST":
            console.log("in City list reducer",action.payload);
            return action.payload;
            break;
    }
    return state;
}
