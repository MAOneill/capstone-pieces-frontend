import React, { Component } from 'react'
import './App.css';
import FileUpload from './components/FileUpload'
// import SendScore from './components/SendScore';

// import {Link, Route, Switch} from 'react-router-dom'
import { Route, Switch} from 'react-router-dom'
// import axios, {post} from 'axios';
import axios from 'axios';
import DisplayUserHighScore from './components/DisplayUserHighScore';
import DisplayUserPhotos from './components/DisplayUserPhotos';
import MenuBar from './components/MenuBar';
import Bubbles from './components/Bubbles';
import PhotoActions from './components/PhotoActions';
import Guess from './components/Guess';
import Puzzle from './components/Puzzle';

axios.defaults.withCredentials = true


export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      instruction:null,
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
      {/* <header className="App-header"> */}
      <h3>{this.state.instruction}</h3>
      <MenuBar />
      <Switch>
        {/* <Route exact path="/puzzle" component={Puzzle} /> */}
        <Route exact path="/out"
          render={() => (
            <img className="piecesimage" src="./pieces.gif"></img>
          )} />
        <Route exact path="/bubbles" 
              render={(props)=> (
                <Bubbles userPhoto={this.state.selectedPhoto}/>
              )} />
        <Route exact path="/puzzle"
            render={(props)=> (
              <Puzzle userPhoto={this.state.selectedPhoto}/>
            )} />
        <Route exact path="/guess" 
              render={(props) => (
                <div>
                {/* <DisplayUserHighScore scores={this.state.scoreArray} /> */}
                
                <Guess 
                scores={this.state.scoreArray}
                handleUpdate={this._scoreUpdated}
                handleMessage={this._updateMessage}/>
              </div>

              )} />
        <Route exact path="/uploadphotos" 
        render={(props) => (
          <div>
            <h3>Pick a photo to use:</h3>
            <div className="flexbox">
            <FileUpload message={this.state.message} 
                      id={this.state.userId} 
                      handleUpdate={this._photoUpdated}
                      handleMessage={this._updateMessage}/>

              <DisplayUserPhotos photos={this.state.pictureArray}
                        handleSelectPhoto={this._selectedPhoto}
                        handleUpdate={this._photoUpdated}
                      handleMessage={this._updateMessage}
                        />

            <PhotoActions selectedPhoto={this.state.selectedPhoto} />
            </div>
          </div>

        )
                }   />

      </Switch>
      {/* </header> */}
    </div>
    )
  }
async componentDidUpdate () {
if (this.state.photoAdded) {
      const pictureArray = await axios.get("main/getphotos");
      // console.log("get picture ARray ran");

      this.setState({
          photoAdded:false,
          pictureArray:pictureArray.data,

      })
  }
if (this.state.scoreAdded) {
  const scoreArray = await axios.get("main/getscore");
  // console.log("get score array ran")
  this.setState({
      photoAdded:false,
      scoreArray:scoreArray.data,
      scoreAdded:false,
  })
    
}
}

  async componentDidMount() {

    //retrieve the userObject and pass it to state.


      const credentials = await axios.get("/main/userid");

      if (true) {
      // if (credentials.userObject) {
          // console.log("front end using axios to retrie4ve session user id: ", credentials.data.userObject);
    
          //if logged in, then get the user's pictures and scores.  save these to state

          const scoreArray = await axios.get("main/getscore");
        // console.log("get score array ran")
          
          const pictureArray = await axios.get("main/getphotos");
        // console.log("get picture ARray ran");
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
      message:message,
    })
  }

_selectedPhoto = (url) => {
  this.setState({
    selectedPhoto:url,
  })
}

_updateInstruction = (instruction) => {
  this.setState({
    instruction
  })
}
}



