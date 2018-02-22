import React from 'react';

import {bindActionCreators} from 'redux';
import {connect}from 'react-redux';
import {empList} from "../actions/index.js";
import {addEmp} from "../actions/index.js";
import {stateList} from "../actions/index.js";
import {cityList} from "../actions/index.js";


import {Table,Modal,Button,Form,FormGroup,Col,ControlLabel,FormControl} from 'react-bootstrap';

const axios=require('axios');

class EmpForm extends React.Component{
    constructor(){
        super();
        this.state={
            isActive:false
        }
    }
    toggleActive=()=>{
        this.setState({
            isActive:!this.state.isActive
        })
    }
    componentWillMount(){

       //this.stateList1();
    }
    stateList1=()=>{

        axios.get('http://localhost:8282/statelist').then((response)=>{

            console.log('State Data : ',response.data);
            this.props.method.dispatch(stateList(response.data))

            // empList(response.data)
        })
    }
    addEmp=()=>{

        axios.post('http://localhost:8282/list').then((response)=>{
            console.log('EMp Data : ',response.data);
            this.props.method.dispatch(addEmp(response.data))

            // empList(response.data)
        })
    }
    render(){
        return(
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
                                    <FormControl type="text" placeholder="" name="firstname"/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Lastname
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" name="lastname" />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" name="email" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    State
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" name="state">
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
                                    <FormControl componentClass="select"  name="city">
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
                                    <FormControl type="file" placeholder="Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button bsStyle="success" type="submit" name="btnSubmit">Save</Button>
                                </Col>
                            </FormGroup>
                        </Form>;
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.toggleActive}>Close</button>
                </Modal.Footer>
            </Modal>

        )
    }
}
function mapStateToProps(state) {
    console.log("state ",state.empList)
    console.log("State data FOrm ",state.stateList)

    return{
        list:state.empList,
        statelist:state.stateList,
        citylist:state.cityList
    }
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({empList,stateList,cityList},dispatch)
}
export  default connect(mapStateToProps,matchDispatchToProps)(EmpForm);