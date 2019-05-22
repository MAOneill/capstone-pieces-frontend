import React from 'react'

export default function DisplayUserPhotos(props) {

    let photoURL;
    console.log("props are",props.photos[0])
    if (props.photos.length) {

        photoURL = props.photos[0].photoURL
        
    }
    else {
        photoURL = null;
    }
    console.log(photoURL);

  return (
    
      
    <div className="photoComponent">  
        
    <div className="photogrid">

        {props.photos.length ? 
            props.photos.map((photo)=> (
                <div className="gridbox">
                <div className="eachphoto">
                <img className="photoThumb" src={`./${photo.photoURL}`}></img>
                <input type="radio" name="photoToUse" value={photo.photoURL} 
                    onClick={(e) => {
                        props.handleSelectPhoto(e.target.value)
                    }}/> 
                {/* <h5>{photo.photoURL}</h5> */}
                </div>
                </div>
                
            ))
        : null
        }
        {(props.photos.length === 0) ? 
        <div className="gridbox">
            <div className = "eachphoto">
                <h4>You don't have any pictures</h4>
                </div>
         </div>:
        null}
    
    </div>
    </div>
    
  )

}
