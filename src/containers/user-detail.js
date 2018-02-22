import React from 'react';
import {connect}from 'react-redux';
class UserDetail extends React.Component{
    render(){
        if(!this.props.user)
        {
            return(<div><h4>Select a user.............</h4></div>)
        }
        return(
            <div>
                <img src={this.props.user.pic} alt="No Image"/>
                <h2>{this.props.user.name}</h2>
                <h3>Age : {this.props.user.age}</h3>
                <h3>Description : {this.props.user.description}</h3>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        user:state.activeUser
    }

}
export default connect(mapStateToProps)(UserDetail)