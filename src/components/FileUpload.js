import React, { Component } from 'react'

import axios, {post} from 'axios';

axios.defaults.withCredentials = true

export default class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state={
            fileName:null,
        }
    }
  render() {
    return (
      <div>
         <form id="myform"  encType="multipart/form-data">
        <input name="foo" onChange={this._changeFileName} type="file" accept="image/png, image/jpeg, image/jpg, image/gif"></input>
        <button type="submit" onClick={this._getFormData}>Submit</button>
        </form>
      </div>
    )
  }

  async componentDidMount() {
    const url = "/main/userid";

      const userid = await axios.get(url);
      console.log("front end using axios to retrie4ve session user id: ", userid);
  }
_changeFileName = (e) => {
    console.log("The file name is ,", e.target.files);
    this.setState({
        fileName:e.target.files[0]
    })
}
_getFormData = (e) => {
    e.preventDefault();
    this._uploadFile(this.state.fileName)
        .then((response)=>{
            console.log(response.data);
        })

    // console.log("getFormData running")
    // const myform = document.getElementById('myform');

    // const newformdata = new FormData(myform)
    // console.log("my FormData",newformdata);
}

_uploadFile = (file) => {
      console.log("_upload file running");
const url = "/main/addurl";
const formData = new FormData();
formData.append('file',file)
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
return  post(url, formData, config)


  }
}
