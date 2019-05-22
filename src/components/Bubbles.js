import React, { Component } from 'react';
import D3bubbles from './D3bubbles';

export default class Bubbles extends Component {
    constructor(props) {
        super(props);
        this.state={
            patterns:[],
            dataObject:[],
            numberOfCircles:3,
            imageLoadSize:400,
        }
        this.width = parseInt(this.state.imageLoadSize / this.state.numberOfCircles)
    }
  render() {
    return (
      <div>
        
        <div id="pictureframe" data-div>
            
            {this.props.userPhoto ? 
            <img  id="myimg" onLoad={this._imgOnLoad} src={`./${this.props.userPhoto}`} alt="user supplied"></img>
            : <img id="myimg" onLoad={this._imgOnLoad} src="./photos/bug.jpg" alt="default "></img>
            }
        </div>
            
        <div >
            <svg id="patterns"  viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">




                
        <defs>

{/* THIS HAS TO BE A SEPARATE COMPONENT - SO IT ONLY RENDERS ONCE WHEN THE IMAGE LOADS */}
{/* OR - DON'T USE ONLOAD FOR IMAGE - PUT THIS ALL IN COMPONENT DID MOUNT... */}
{/* // let randomPatternId =parseInt((Math.random() * patternKeyArray.length)) ; 
    //this randomized the name of the pattern
    //this will be important in the guess game
    // pattern.setAttribute('id', `pattern${patternKeyArray[randomPatternId]}`);
    // console.log("pattern id is :", randomPatternId, patternKeyArray[randomPatternId])
    // patternKeyArray.splice((randomPatternId),1); */}

            {this.state.patterns.map((pattern,i) => (
                <pattern id={`pattern${i+1}`} key={i} patternUnits="objectBoundingBox" width="100%" height="100%">
                    <image width={`${this.width}px`} height={`${this.width}px`} xlinkHref={pattern.href.baseVal}
                    >

                    </image>
                </pattern>
            ))}
        </defs>
        {/* circles go here */}

        {/* {this.state.dataObject.map((circle,i)=> (
            <circle key={i} r={circle.radius} 
                    cx={circle.x+(circle.pW/2)} 
                    cy={circle.y+(circle.pW/2)}
                    // fill={`url(pattern${i+1})`}
                    fill={`url(`+ window.location.origin + window.location.pathname + `#pattern${i+1})`}
                    // fill="#499444"
                    >

                    </circle> */}
        ))}

        </svg>
        </div>

        
        <div className="svgcontainer">          
        
            <D3bubbles dataObject={this.state.dataObject}/>
    
        </div>





      </div>
    )
  }

  _imgOnLoad = () => {
      console.log("Image Loaded");

      const myImage = new Image(this.state.imageLoadSize,this.state.imageLoadSize);   

    this.props.userPhoto ?  myImage.src = `./${this.props.userPhoto}`:myImage.src = "./photos/bug.jpg"   ;
    //   console.log(myImage);
      const size = myImage.width
    //   console.log(size);

      
      //set contants
      const numberOfCircles = this.state.numberOfCircles;
    //   const svgNS = "http://www.w3.org/2000/svg"

      //this was used to randomize the patterns:
      //removing for now, it has to be a global variable that the function can see...
    //   const patternKeyArray = [...Array(numberOfCircles*numberOfCircles + 1).keys()]
    //   patternKeyArray.splice(0,1);  //remove the first zero


      //create patterns and load them to state

      const oCtx =  loadImageToCanvas(myImage ,size, size)
      const patternWidth = parseInt(size/numberOfCircles) //same as this.width
      const dataObject = createDataArray(numberOfCircles,patternWidth,patternWidth)
    
      const tempCanvas = createTempCanvas(patternWidth,patternWidth);
      
      const allPatternImages = []
      dataObject.forEach((d,i) => {
          allPatternImages.push(createPatterns(oCtx,tempCanvas,d.x,d.y,d.pW,d.pH,i+1))
      })
    //   createD3(numberOfCircles)


      this.setState({
          patterns:allPatternImages,
          dataObject:dataObject,
      }) 
}
}


function loadImageToCanvas(loadedImage,canvasWidth, canvasHeight) {
    const oCanvas = document.createElement('canvas');
    const oCtx = oCanvas.getContext('2d');
    
    //for now I am smooshing it into a square.  I will change this to be proportional later
    oCanvas.height = canvasHeight;   //versus naturalHeight
    oCanvas.width= canvasWidth;
    oCtx.drawImage(loadedImage, 0, 0, canvasWidth, canvasHeight );
    return oCtx;
    
}

function createDataArray(numberOfCircles, patternWidth, patternHeight) {
    const dataObj = [];
    for (let i = 0; i<numberOfCircles; i++) {
        for (let j = 0; j<numberOfCircles; j++) {
    
            dataObj.push({
                    x:i*patternWidth,
                    y:j*patternWidth,
                    pW:patternWidth,
                    pH:patternWidth,
                    radius:patternWidth/2,
                })
        }
    }
    return dataObj;
}

function createTempCanvas(patternWidth,patternHeight) {
    /////////CREATE A TEMP CANVAS
    const tCanvas = document.createElement('canvas');
    tCanvas.width = patternWidth;
    tCanvas.height = patternHeight;
    return tCanvas
}

function createPatterns(oCtx, tCanvas, patternX, patternY, patternWidth, patternHeight,i) {
    //this creates the images that will be loaded into the svg/defs/patterns
    const svgNS = "http://www.w3.org/2000/svg"

    const patternImgData = oCtx.getImageData(patternX, patternY, patternWidth, patternHeight );
    const tCtx = tCanvas.getContext('2d');

    tCtx.putImageData(patternImgData, 0, 0);
    const imagePattern = tCanvas.toDataURL("image/jpeg",.4);
    // const  imagePattern = tCanvas.toDataURL("image/png"); //much larger

    //create the svg namespace image element
    const svg_img = document.createElementNS(svgNS, "image");
        //and assign the pattern data
        svg_img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", imagePattern);

    return svg_img;

}
