import React, { Component } from 'react';
import D3bubbles from './D3bubbles';
// import {createRandomArray} from '../utils';

export default class Bubbles extends Component {
    constructor(props) {
        super(props);
        this.state={
            patterns:[],
            dataObject:[],
            numberOfCircles:3,
            imageLoadSize:400,
            imageToUse:"photos/sharks.jpg",
        }
        this.width = parseInt(this.state.imageLoadSize / this.state.numberOfCircles)
    }
  render() {
    return (
      <div className="mainbubblecontainer">
        
            
        <div  >
            <svg id="patterns" 
            key={(new Date().getTime())}
            viewBox={`0 0 ${this.state.imageLoadSize * 2} ${this.state.imageLoadSize * 2}` }
            // viewBox="0 0 800 800" 
            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                    
                <defs>

                {/* THIS HAS TO BE A SEPARATE COMPONENT - SO IT ONLY RENDERS ONCE WHEN THE IMAGE LOADS */}
                {/* OR - DON'T USE ONLOAD FOR IMAGE - PUT THIS ALL IN COMPONENT DID MOUNT... */}

                    {this.state.patterns.map((pattern,i) => (
                        <pattern id={`pattern${i+1}`} 
                        key={(new Date().getTime() + i)} 
                        patternUnits="objectBoundingBox" width="100%" height="100%">
                            <image 
                            key={(new Date().getTime()+(i*1000))}
                            width={`${this.width}px`} height={`${this.width}px`} 
                            xlinkHref={pattern.href.baseVal}
                            >

                            </image>
                        </pattern>
                    ))}
                </defs>
            </svg>
        </div>

        <div className="bubblegrid">
            <div className="svgcontainer">          
            
                <D3bubbles dataObject={this.state.dataObject}
                viewsize={(this.state.imageLoadSize * 2)}/>
        
            </div> 


            <div id="pictureframe" data-div>
            {/* <img  id="myimg" onLoad={this._imgOnLoad} src={`./${this.state.imageToUse}`} alt="user supplied"></img> */}
                {this.props.userPhoto ? 
                <img  id="myimg" onLoad={this._imgOnLoad} src={`./${this.props.userPhoto}`} alt="user supplied"></img>
                : <img id="myimg" onLoad={this._imgOnLoad} src="./photos/sharks.jpg" alt="default "></img>
                }
            </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
//   }
  
//   _imgOnLoad =  () => {
      console.log("Image Loaded");
// let testARray = createRandomArray(100);

      const myImage = new Image(this.state.imageLoadSize,this.state.imageLoadSize);   
    myImage.src="";
    
    myImage.onload = () => {
        const size = myImage.width
        //set contants
            const numberOfCircles = this.state.numberOfCircles;
            //create patterns and load them to state
            console.log("CREATING PATTERNS")
            const oCtx =  loadImageToCanvas(myImage ,size, size)
            const patternWidth = parseInt(size/numberOfCircles) //same as this.width
            const dataObject = createDataArray(numberOfCircles,patternWidth,patternWidth)
        
            const tempCanvas = createTempCanvas(patternWidth,patternWidth);
            
            const allPatternImages = []
            dataObject.forEach((d,i) => {
                allPatternImages.push(createPatterns(oCtx,tempCanvas,d.x,d.y,d.pW,d.pH,i+1))
            })
            this.setState({
                patterns:allPatternImages,
                dataObject:dataObject,
            }) 
      }
      
      this.props.userPhoto ?  myImage.src = `./${this.props.userPhoto}` : myImage.src =`./photos/sharks.jpg`   ;
   
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
