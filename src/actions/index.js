const axios=require('axios')
export const selectUser=(user)=>{
    console.log("You clicked on ",user.name)
    debugger;
    return{
        type:"USER_SELECTED",
        payload:user
    }
}
export const stateList=(payload)=>{
    //debugger;

    console.log("Your ACTION state  ",payload)
    return{
        type:"STATE_LIST",
        payload
    }
    // return (dispatch)=>{
    //     axios.get('http://localhost:5005/emp').then((response)=>{
    //         console.log('EMp Data : ',response.data);
    //         //this.props.method.dispatch(empList(response.data))
    //         dispatch({
    //             type:"EMP_LIST",
    //             payload:response.data
    //         })
    //     })
    //
    //
    // }
}
export const cityList=(payload)=>{
    //debugger;

    console.log("Your ACTION state  ",payload)
    return{
        type:"CITY_LIST",
        payload
    }
    // return (dispatch)=>{
    //     axios.get('http://localhost:5005/emp').then((response)=>{
    //         console.log('EMp Data : ',response.data);
    //         //this.props.method.dispatch(empList(response.data))
    //         dispatch({
    //             type:"EMP_LIST",
    //             payload:response.data
    //         })
    //     })
    //
    //
    // }
}

export const empList=(payload)=>{
    //debugger;
   console.log("Your ACTION  ",payload)
    return{
        type:"EMP_LIST",
        payload
    }

    // return (dispatch)=>{
    //     axios.get('http://localhost:5005/emp').then((response)=>{
    //         console.log('EMp Data : ',response.data);
    //         //this.props.method.dispatch(empList(response.data))
    //         dispatch({
    //             type:"EMP_LIST",
    //             payload:response.data
    //         })
    //     })
    //
    //
    // }


}
export const deleteEmp=(payload)=>{
    //debugger;
    console.log("Your ACTION  ",payload)
    return{
        type:"DELETE_EMP",
        payload
    }

    // return (dispatch)=>{
    //     axios.get('http://localhost:5005/emp').then((response)=>{
    //         console.log('EMp Data : ',response.data);
    //         //this.props.method.dispatch(empList(response.data))
    //         dispatch({
    //             type:"EMP_LIST",
    //             payload:response.data
    //         })
    //     })
    //
    //
    // }


}
export const addEmp=(payload)=>{
    console.log("Your ACTION  ",payload)
    return{
        type:"ADD_EMP",
        payload
    }

}
export const updateEmp=(payload)=>{
    console.log("Your ACTION  ",payload)
    return{
        type:"UPDATE_EMP",
        payload
    }

}



