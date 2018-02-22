import {combineReducers} from 'redux'
import  UserReducer from './reducer-users.js'
import ActiveUserReducer from './reducer-active-user.js'
import {empCRUD} from './reducer-emp-list.js'
import {stateList} from './reducer-emp-list.js'
import {cityList} from './reducer-emp-list.js'
//import {deleteEmp} from './reducer-emp-list.js'


const allReducers=combineReducers({
    users:UserReducer,
    activeUser:ActiveUserReducer,
    empList:empCRUD,
    stateList:stateList,
    cityList:cityList,
    //deleteEmp:deleteEmp
})
export default allReducers