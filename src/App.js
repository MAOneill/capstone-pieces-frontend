import React, { Component } from 'react'
import './App.css';
import FileUpload from './components/FileUpload'
import SendScore from './components/SendScore';


import axios, {post} from 'axios';
import DisplayUserHighScore from './components/DisplayUserHighScore';
import DisplayUserPhotos from './components/DisplayUserPhotos';

axios.defaults.withCredentials = true


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:null,
      userEmail:null,
      componentUpdated:false,
      message:null,
      pictureArray:[],
      scoreArray:[],
    }
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <DisplayUserPhotos photos={this.state.pictureArray}/>
      <DisplayUserHighScore scores={this.state.scoreArray} />
        <FileUpload message={this.state.message} 
                  id={this.state.userId} 
                  handleUpdate={this._compUpdated}
                  handleMessage={this._updateMessage}/>
        <SendScore message={this.state.message} 
                  id={this.state.userId}
                  handleUpdate={this._compUpdated}
                  handleMessage={this._updateMessage}/>
      </header>
    </div>
    )
  }

  async componentDidMount() {

    //retrieve the userObject and pass it to state.

    const url = "/main/userid";

      const credentials = await axios.get(url);

      if (true) {
      // if (credentials.userObject) {
          console.log("front end using axios to retrie4ve session user id: ", credentials.data.userObject);
    
          //if logged in, then get the user's pictures and scores.  save these to state

          const scoreArray = await axios.get("main/getscore");
        console.log("get score array ran")
          
          const pictureArray = await axios.get("main/getphotos");
        console.log("get picture ARray ran");
          this.setState({
              userId:credentials.data.userObject.id,
              userEmail:credentials.data.userObject.email,
              pictureArray:pictureArray.data,
              scoreArray:scoreArray.data,
    
          })

      }
      else {
        //this will only work when build is merged into backend
        // window.location = "http://localhost:3100/login"
        //use this in build:
        // window.location = "/login"
      }

  }

  _compUpdated = () => {
    this.setState({
      componentUpdated:true,
    })
  }
  _updateMessage = (message) => {
    this.setState({
      message
    })
  }

}



