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
    <div>
        <img src={`./${photoURL}`}></img>
      {photoURL}
    </div>
  )
}
