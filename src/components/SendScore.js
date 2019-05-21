import React, { Component } from 'react'

import axios, {post} from 'axios';

export default class SendScore extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
  render() {
    return (
      <div>
        <button  onClick={this._addScore}>
            Send Score 42
        </button>
      </div>
    )
  }

  _addScore = () => {

    //i should have the user id in here....
    //it really needs ot load in the app.js and be passed to all the components

    //the '1' below will have to come from the credentials info later...
    console.log(this.props.id);

    let uid = this.props.id
    if ((uid === null) || (uid === 'null')) {
        uid = 1;
    }
    const url = `/main/addscore/42/${uid}`;
    post(url)


  }
}
