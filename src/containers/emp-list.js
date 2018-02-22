import React from 'react';
import {Table,Modal,Button,Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';

import {bindActionCreators} from 'redux';
import {connect}from 'react-redux';
import {empList} from "../actions/index.js";
import {stateList} from "../actions/index.js";
import {cityList} from "../actions/index.js";
import {deleteEmp} from "../actions/index.js";
import {addEmp} from "../actions/index.js";
import {updateEmp} from "../actions/index.js";

import EmpForm from "./emp-form";



const axios=require('axios');

class EmpList extends React.Component{
    constructor(){
        super();
        this.state={
            currentData:[],
            editData:[],
            editId:'',
            isEditing:false,
            isActive:false,
            curr:1,
            totalRecords:5,
            searchArr:[],
            isSearch:false,
            photo:'',
            previewFile:''
        }
    }
    componentWillMount(){
        this.ListEmp();
        this.stateList1();
        this.cityList1();
    }
    stateList1=()=>{

        axios.get('http://localhost:8282/statelist').then((response)=>{

            console.log('State Data : ',response.data);
            this.props.method.dispatch(stateList(response.data))

            // empList(response.data)
        })
    }
    cityList1=()=>{

        axios.get('http://localhost:8282/citylist').then((response)=>{

            console.log('State Data : ',response.data);
            this.props.method.dispatch(cityList(response.data))

            // empList(response.data)
        })
    }
    clearData=()=>{
        this.state.editData=[];
        this.state.currentData=[];
    }
    search=(e)=>{
        e.preventDefault();
        var key=e.target.value;

        this.setState({
            searchArr:[],
            isSearch:true
        })
        var temp=[]
        this.props.list.map((st,i)=>{
            if(st.firstname.includes(key))
            {
                temp.push(st);
            }
            else if(st.lastname.includes(key))
            {
                temp.push(st);
            }
            else if(st.state.includes(key))
            {
                temp.push(st);
            }
            else if(st.city.includes(key))
            {
                temp.push(st);
            }
        })
        if(key=='')
        {
            this.setState({
                searchArr:[],
                isSearch:false
            })
        }
        this.setState({
            searchArr:temp,

        })

    }

    handleChange=(event)=>{
        console.log('control : ',event.target.value);
        const {value, name} = event.target;
        const currentData=this.state.currentData;
        currentData[name]=value;
        this.setState({currentData}, () => {
            console.log(this.state.currentData.firstname);
        });

        console.log('control : ',event.target.value);
        //const {value, name} = event.target;
        const editData=this.state.editData;
        editData[name]=value;
        this.setState({editData}, () => {
            console.log(this.state.editData.firstname);
        });
    }

    sort=(e)=>{
        var key=e.target.id;
        var myData=[].concat(this.props.list).sort((a,b)=>a[key]>b[key])
       // this.props.list=myData;

    }
    dsort=(e)=>{
        var key=e.target.id;
        var myData=[].concat(this.props.list).sort((a,b)=>a[key]<b[key])
        // this.props.list=myData;

    }

    ListEmp=()=>{

        axios.get('http://localhost:8282/list').then((response)=>{
            console.log('EMp Data : ',response.data);
            this.props.method.dispatch(empList(response.data))

            // empList(response.data)
        })
    }
    deleteEmp1=(eid)=>{

        axios.post('http://localhost:8282/delete',{id:eid}).then((response)=>{
            console.log('Emp Delete : ',response.data);
            // var d=this.props.list.filter((d)=>response.data['_id']!==d._id);
            // console.log("After Deltee",d);
            this.props.method.dispatch(deleteEmp(response.data))
           // this.props.method.dispatch(empList(d))

            // empList(response.data)
        })
    }
    addEmp1=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8282/add',
            {
                photo:this.state.previewFile,
                ...this.state.currentData
            }).then((response)=>{
            console.log('Emp Add : ',response.data);
            this.toggleActive();
            this.clearData();
            this.props.method.dispatch(addEmp(response.data))
        })


    }
    updateEmp=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8282/add',
            {
                photo:this.state.previewFile,
                id:this.state.editId,
                ...this.state.editData
            }).then((response)=>{
            console.log('Emp Update : ',response.data);
            this.toggleActive();
            this.clearData();
            this.props.method.dispatch(updateEmp(response.data))
        })
    }
    fileUpload=(e)=>{
        let reader=new FileReader();
        let file=e.target.files[0];
        reader.onloadend=()=>{
            this.setState({
                photo:file,
                previewFile:reader.result
            })
        }

        reader.readAsDataURL(file);
    }
    handleEntry=(e)=>{
        this.setState({
            totalRecords:e.target.value
        })
    }
    mypage=(no)=>{
        this.setState({
            curr:no
        })
    }

    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive
        })
    }

    render(){
        const editData=this.state.editData;
        var pages=[];
        var len=this.props.list.length;
        var totalPages=Math.ceil(len/this.state.totalRecords);
        for(let i=1;i<=totalPages;i++)
        {
            pages.push(i);
        }

        var lastRec=this.state.curr*this.state.totalRecords;
        var firstRec=lastRec-this.state.totalRecords;

        var myRec=this.props.list.slice(firstRec,lastRec);
        return(
            <div>
                 <div>
                     <select onChange={this.handleEntry}>
                         <option value="5">5</option>
                         <option value="10">10</option>
                         <option value="15">15</option>
                     </select>
                     <input type="text" onChange={this.search}/>
                     <Button bsStyle="primary" onClick={this.toggleActive}> Add Employee</Button>
                            <Table hover striped>
                                <thead>
                                    <th>Name
                                        <a id="firstname" onClick={this.sort} className="glyphicon glyphicon-arrow-up"></a>
                                        <a id="firstname" onClick={this.dsort} className="glyphicon glyphicon-arrow-down"></a>

                                    </th>
                                    <th>Email
                                        <a id="firstname" onClick={this.sort} className="glyphicon glyphicon-arrow-up"></a>
                                        <a id="firstname" onClick={this.dsort} className="glyphicon glyphicon-arrow-down"></a>
                                    </th>
                                    <th>State

                                        <a id="firstname" onClick={this.sort} className="glyphicon glyphicon-arrow-up"></a>
                                        <a id="firstname" onClick={this.dsort} className="glyphicon glyphicon-arrow-down"></a>
                                    </th>
                                    <th>City
                                        <a id="firstname" onClick={this.sort} className="glyphicon glyphicon-arrow-up"></a>
                                        <a id="firstname" onClick={this.dsort} className="glyphicon glyphicon-arrow-down"></a>
                                    </th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </thead>
                                <tbody>
                                {
                                    this.state.isSearch?
                                        this.state.searchArr.map((emp,i)=>{
                                            return(
                                                <tr>
                                                    <td key={i}>{emp.firstname}{' '}{emp.lastname} </td>
                                                    <td key={i}>{emp.email}</td>
                                                    <td key={i}>{emp.state}</td>
                                                    <td key={i}>{emp.city}</td>
                                                    <td key={i}><img src={emp.photo} height="50px" width="50px"/></td>
                                                    <td>Delete</td>
                                                </tr>)
                                        })
                                        :
                                        myRec.map((emp,i)=>{
                                            return(
                                                <tr>
                                                    <td key={i}>{emp.firstname}{' '}{emp.lastname}
                                                      </td>
                                                    <td key={i}>{emp.email}</td>
                                                    <td key={i}>{emp.state}</td>
                                                    <td key={i}>{emp.city}</td>
                                                    <td key={i}><img src={emp.photo} height="50px" width="50px"/></td>
                                                    <td><Button onClick={()=>{this.deleteEmp1(emp._id)}}>Delete</Button>
                                                        <Button onClick={()=>{
                                                            this.setState({
                                                                editId:emp._id,
                                                                editData:emp,
                                                                isActive:true,
                                                                isEditing:true
                                                            })
                                                        }}>Edit</Button>
                                                    </td>
                                                </tr>)
                                        })
                                }

                                <tr align="center" colSpan="4">
                                    {
                                        pages.map((p,i)=>{
                                            return <button onClick={()=>{this.mypage(p)}}>{p}</button>
                                        })
                                    }
                                </tr>
                                </tbody>
                            </Table>
                </div>
                <Modal onHide={this.toggleActive} show={this.state.isActive}>
                    <Modal.Header>
                        <h3>Employee Management</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Form horizontal>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Firstname
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text"  value={editData.firstname} name="firstname" onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Lastname
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="text" name="lastname" value={editData.lastname} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Email
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="email" name="email" value={editData.email} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>

                                <FormGroup controlId="formControlsSelect">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        State
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl componentClass="select" name="state" value={editData.state} onChange={this.handleChange}>
                                            {
                                                this.props.statelist.map((st,i)=>{
                                                    return(
                                                        <option value={st.statename}>{st.statename}</option>
                                                    )
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formControlsSelect">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        City
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl componentClass="select" value={editData.city} onChange={this.handleChange} name="city">
                                            {
                                                this.props.citylist.map((c,i)=>{

                                                    return(
                                                        <option value={c.cityname}>{c.cityname}</option>
                                                    )
                                                })
                                            }
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail" name="photo">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Photo
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl type="file" name="photo" onChange={this.fileUpload} />
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        {
                                            this.state.isEditing?
                                                <Button bsStyle="success" type="submit" onClick={this.updateEmp} name="btnSubmit">Update</Button>

                                                :
                                                <Button bsStyle="success" type="submit" onClick={this.addEmp1} name="btnSubmit">Insert</Button>

                                        }
                                    </Col>
                                </FormGroup>
                            </Form>;
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.toggleActive}>Close</button>
                    </Modal.Footer>
                </Modal>

            </div>

        )
    }
}
function mapStateToProps(state) {
   console.log("state ",state.empList)
    console.log("state List ",state.stateList)
    return{
         list:state.empList,
        statelist:state.stateList,
        citylist:state.cityList,
        deleteemp:state.deleteEmp,
        addemp:state.addEmp,
        updateemp:state.updateEmp

    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({empList,stateList,cityList,deleteEmp,addEmp,updateEmp},dispatch)

 }
export  default connect(mapStateToProps,matchDispatchToProps)(EmpList);