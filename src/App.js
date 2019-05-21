import React, { Component } from 'react'
import './App.css';
import FileUpload from './components/FileUpload'
import SendScore from './components/SendScore';


import axios, {post} from 'axios';

axios.defaults.withCredentials = true


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:null,
      userEmail:null,
    }
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
        

        <FileUpload id={this.state.userId}/>
        <SendScore id={this.state.userId}/>
      </header>
    </div>
    )
  }

  async componentDidMount() {

    //retrieve the userObject and pass it to state.

    const url = "/main/userid";

      const credentials = await axios.get(url);

      if (credentials.userObject) {
          console.log("front end using axios to retrie4ve session user id: ", credentials.data.userObject);
    
          this.setState({
              userId:credentials.data.userObject.id,
              userEmail:credentials.data.userObject.email,
    
          })

      }

  }
}



