import React, { Component } from 'react'
import './App.css';
import FileUpload from './components/FileUpload'
import SendScore from './components/SendScore';


import axios, {post} from 'axios';
import DisplayUserHighScore from './components/DisplayUserHighScore';
import DisplayUserPhotos from './components/DisplayUserPhotos';
import MenuBar from './components/MenuBar';

axios.defaults.withCredentials = true


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:null,
      userEmail:null,
      photoAdded:false,
      scoreAdded:false,
      message:null,
      pictureArray:[],
      scoreArray:[],
      selectedPhoto:null,
    }
  }
  render() {
    return (
      <div className="App">
      <header className="App-header">
      <MenuBar />
          <h2>select a photo to use:</h2>
        <DisplayUserPhotos photos={this.state.pictureArray}
                      handleSelectPhoto={this._selectedPhoto}/>
      <DisplayUserHighScore scores={this.state.scoreArray} />
        <FileUpload message={this.state.message} 
                  id={this.state.userId} 
                  handleUpdate={this._photoUpdated}
                  handleMessage={this._updateMessage}/>
        <SendScore message={this.state.message} 
                  id={this.state.userId}
                  handleUpdate={this._scoreUpdated}
                  handleMessage={this._updateMessage}/>
      </header>
    </div>
    )
  }
async componentDidUpdate () {
if (this.state.photoAdded) {
      const pictureArray = await axios.get("main/getphotos");
      console.log("get picture ARray ran");

      this.setState({
          photoAdded:false,
          pictureArray:pictureArray.data,

      })
  }
if (this.state.scoreAdded) {
  const scoreArray = await axios.get("main/getscore");
  console.log("get score array ran")
  this.setState({
      photoAdded:false,
      scoreArray:scoreArray.data,
  })

    
}

}

  async componentDidMount() {

    //retrieve the userObject and pass it to state.


      const credentials = await axios.get("/main/userid");

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

  _photoUpdated = () => {
    this.setState({
      photoAdded:true,
    })
  }
  _scoreUpdated = () => {
    this.setState({
      scoreAdded:true
    })
  }
  _updateMessage = (message) => {
    this.setState({
      message
    })
  }

_selectedPhoto = (url) => {
  this.setState({
    selectedPhoto:url,
  })
}
}



