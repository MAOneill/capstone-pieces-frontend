import React, { Component } from 'react'

import axios, {post} from 'axios';
import { async } from 'q';

export default class SendScore extends Component {
    constructor(props) {
        super(props);
        this.state={
            message:null,
        }
    }
  render() {
    return (
      <div>
        <button  onClick={this._addScore}>
            Send Score 42
        </button>
        <h4>{this.props.message}</h4>
      </div>
    )
  }

  _addScore = async () => {

    //i should have the user id in here....
    //it really needs ot load in the app.js and be passed to all the components

    //the '1' below will have to come from the credentials info later...
    // console.log(this.props.id);

    // let uid = this.props.id
    // if ((uid === null) || (uid === 'null')) {
    //     uid = 1;
    // }
    const url = `/main/addscore/42/`;
    const response = await post(url);
    console.log("front end r4esponse", response);
    this.props.handleUpdate();
    this.props.handleMessage(response.data.message)
    // this.setState({
    //     message:response.data.message,
    // })


  }
}
