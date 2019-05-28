

import React, { Component } from 'react';
import axios, {post} from 'axios';


export default class DisplayUserPhotos extends Component {
   constructor(props) {
       super(props);
       this.state={

       }
    }
    //    let photoURL;
    // // console.log("props are",props.photos[0])
    // if (this.props.photos.length) {

    //     photoURL = this.props.photos[0].photoURL
        
    // }
    // else {
    //     photoURL = null;
    // }
    // // console.log(photoURL);
   

    
render() {
  return (
    
      
    <div className="photoComponent ">  
        
        {this.props.photos.length ? 
    <div className="photogrid">

            {this.props.photos.map((photo,i)=> (
                <div key={i} className="gridbox photoscroll">
                <div className="eachphoto">
                    <label>
                <img className="photoThumb" src={`./${photo.photoURL}`} alt="user supplied"></img>
                <input type="radio" name="photoToUse" value={photo.photoURL} 
                    onClick={(e) => {
                        this.props.handleSelectPhoto(e.target.value)
                    }}/> 
                    </label>
                    <br />
                <button className="deletephoto"
                    onClick={ async () => {
                        // console.log("the photo to delete is",photo);
                        console.log("deleting", `${photo.id}, ${photo.photoURL}`);
                        this._deletephoto(photo.id, photo.photoURL)
                            .then((response) => {
                                console.log("delete photo rspon", response.data.message);
                                this.props.handleUpdate();
                                this.props.handleMessage(response.data.message);
                            })
                    }}
                    >Delete Photo</button>
               
                {/* <h5>{photo.photoURL}</h5> */}
                </div>
                </div>
            ))}
                </div>   
        : null
        }
        {(this.props.photos.length === 0) ? 
        <div className="gridmessage">
           
                <h4 className="nophotomessage">You don't have any pictures. Add Some.</h4>
               
         </div>:
        null}
    
   
    </div>
    
  )}


  _deletephoto = (photoid, photourl) => {
    console.log("app.js deleting", photoid, photourl);

    //photourl has slash!!  need to code for that in the route
    return  axios.post(`main/deletephoto/${photoid}/${photourl}/`)
    // return  axios.post(`main/deletephoto/${photoid}/`)
    
 }
}
