import React, { Component } from 'react';
import D3bubbles from './D3bubbles';
import DisplayUserHighScore from './DisplayUserHighScore';
import {createRandomArray} from '../utils';
import photos from '../guessing';
import {post} from 'axios';
// import {Link} from 'react-router-dom'

export default class Guess extends Component {
    constructor(props) {
        super(props);
        this.state={
            patterns:[],
            dataObject:[],
            numberOfCircles:2, //begins at 2
            numberCorrect:0,
            numberTurns:0,
            randomize:false,
            imageLoadSize:400,
            photos: photos,
            message:null,
            winner:false,
            photoKey:null,
            selectedImage:null,
            photoOrder:[],
            answerList:[],
            guessSelection:null,
            isGameOver:false,

        }
        this.width = parseInt(this.state.imageLoadSize / this.state.numberOfCircles);
        this.mydefs = React.createRef();
        console.log("scores", this.props.scores)
    }
  render() {
    return (
      <div className="maincontainer">
            <link
					rel="StyleSheet"
					type="text/css"
					href='../styles/guess.css'
				/>
        <div className="defs">
                <svg id="patterns"  
                style={{opacity:((this.state.numberTurns % 2) ? 1 : .99)}}
                key={(new Date().getTime())}
                viewBox={`0 0 ${this.state.imageLoadSize * 2} ${this.state.imageLoadSize * 2}` }
                xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                    
                    <defs ref={this.mydefs}>

                    {/* THIS HAS TO BE A SEPARATE COMPONENT - SO IT ONLY RENDERS ONCE WHEN THE IMAGE LOADS */}
                    {/* OR - DON'T USE ONLOAD FOR IMAGE - PUT THIS ALL IN COMPONENT DID MOUNT... */}

                        {this.state.patterns.map((pattern,i) => (
                            <pattern id={`pattern${i+1}`} 
                            key={(new Date().getTime()+i + this.state.numberTurns)}
                            style={{opacity:((this.state.numberTurns % 2) ? 1 : .99)}}
                            patternUnits="objectBoundingBox" 
                            width="100%" height="100%">
                            <image 
                            key={(new Date().getTime()+(i*1000))}
                            style={{opacity:((this.state.numberTurns % 2) ? 1 : .99)}}
                            width={`${this.width}px`} height={`${this.width}px`} 
                            xlinkHref={pattern.href.baseVal}
                                >

                                </image>
                            </pattern>
                        ))}
                    </defs>
                </svg>
        </div>

        <div className="guessGrid">
            {/* {this.state.isGameOver? 
            null:  */}
            <div className="svgcontainer guessingsize">          
            
                <D3bubbles isGameOver={this.state.isGameOver}
                        dataObject={this.state.dataObject}
                        numberOfTurns={this.state.numberTurns}
                        viewsize={(this.state.imageLoadSize * 2)}/>
        
            </div>
            {/* } */}


            <div className="guessingOptions">
                 <DisplayUserHighScore scores={this.props.scores} />
            {/* selections... */}
            {this.state.isGameOver ? (
                // <Link  className="aButton" to="/guess">Play Again?</Link>
                <button onClick={this._newGame}>Play Again?</button>
            )
            
             : (

                <form onSubmit={this._submitAnswer}>
                <ul className="answerlist">
                {this.state.answerList.map((key,i) => (
                    <li key={i+(this.state.numberTurns * 10)}>
                        <input onChange={this._selectRadioButton} name={this.state.numberTurns} type="radio" value={key} />
                    {this.state.photos[key].title}
                        
                    </li>
                    ))
                    }
                </ul>
                <button >Submit Answer</button>
                </form>
            )}
            {/* upon select - either lose/win, select new image */}
            <h4>{this.state.message}</h4>

            {this.state.numberTurns > 0 ? 
            <div>
            <h5>The previous image was:</h5>
            <img className="prevImgThumb" src={`./guessing/${this.state.photos[this.state.photoOrder[this.state.numberTurns-1]].photo}`}></img>
            </div>
            : null}
            </div> 
         </div>

{/* being hidden.  but it must exist */}
        <div id="pictureframe" className="hidethis" data-div>
            <img  id="myimg" onLoad={this._imgOnLoad} 
                 
                 style={{opacity:((this.state.numberTurns % 2) ? 1 : .99)}}
            src={`${this.state.selectedImage}`} alt="random pick"></img>
        </div>

        </div>
       
    )
  }
  _selectRadioButton = (e) => {
      this.setState({
          guessSelection:e.target.value
      })
  }

  
_newGame = () => {

            //do everything in component did mount, again:
            const photoOrder = createRandomArray(this.state.photos.length,true); //zero indexed
            const photoKey = photoOrder[this.state.numberTurns]
            //create another randome array, but only keep the first 4 numbers:
            //first remove the selected photoKey, then select 4 other random  answers
            const answerList = this._createAnswerArray(photoKey) ;

                        //you win - reset all
                        this.setState({
                            //patterns and dataObjects are created on image load:
                            // patterns:[],
                            // dataObject:[],
                            numberOfCircles:2, //begins at 2
                            numberCorrect:0,
                            numberTurns:0,
                            randomize:false,
                            // imageLoadSize:400,
                            // photos: photos,
                            message:null,
                            winner:false,
                            photoKey:photoKey,
                            selectedImage:`./guessing/${this.state.photos[photoKey].photo}`,
                            photoOrder:photoOrder, 
                            answerList:answerList,
                            guessSelection:null,
                            isGameOver:false,
                        })
            

}
componentDidMount() {

   
        // document.getElementById("menulist").classList.add("hidemenu")
    

    //select a random picture to load
    const photoOrder = createRandomArray(this.state.photos.length,true); //zero indexed
    console.log(photoOrder)
    
    //for the guessing game, we need to get a random picture from the photos array
    
    const photoKey = photoOrder[this.state.numberTurns]
    console.log(this.state.photos[photoKey].photo)

    //create another randome array, but only keep the first 4 numbers:
    //first remove the selected photoKey, then select 4 other random  answers
    const answerList = this._createAnswerArray(photoKey) ;

    this.setState({
//reload for each turn
        selectedImage:`./guessing/${this.state.photos[photoKey].photo}`,  
        answerList:answerList,  
//only create at beginning of game
        photoOrder:photoOrder, 
        photoKey:photoKey, 

    })

}


_createAnswerArray = (newKey) => {

    let arrayWithOutSelected = []
    this.state.photos.forEach((photo,i) => {
        if (i !== newKey) {
            arrayWithOutSelected.push(i)
        }
    })
    console.log("should be a list without photokey:", arrayWithOutSelected)
    console.log("photokey",newKey);

    let answerList = createRandomArray(arrayWithOutSelected.length,true);
    answerList = answerList.slice(0,4);
    answerList = answerList.map((ans) => {
        return arrayWithOutSelected[ans]
    })
    console.log("random answer keys", answerList);
    answerList.push(newKey);
    answerList.sort();
    console.log("random answer keys with answer is ", answerList);
    return answerList;
}


_submitAnswer = (e) => {
    e.preventDefault();
    //if guessSelection is null - do nothing
    if (this.state.guessSelection === null) {
        //do nothing
    }
    //WRONG SELECTION
    else if (parseInt(this.state.guessSelection) !== parseInt(this.state.photoKey)) {
        console.log(`${this.state.guessSelection} not equal to ${this.state.photoKey}`)
        //you lose
        
        this.setState({
            guessSelection:null,
            message:"sorry, that is incorrect",
            numberTurns:this.state.numberTurns+1,
            isGameOver:true,

        })
        console.log(`The number correct is ${this.state.numberCorrect}`);
        this._addScore(this.state.numberCorrect)

        //display play again or menu:

    }
    
    else if (parseInt(this.state.guessSelection) === parseInt(this.state.photoKey)) {
        //20th round:
        if (this.state.numberTurns === 18) {
            
            //you win 
            this.setState({
                message:"You Won.  Play Again.",
                guessSelection:null,
                isGameOver:true,
                
            })
            this._addScore(this.setState.numberCorrect + 1)


        }
        else {
            //not 20th round
            let newPhotoKey = this.state.photoOrder[this.state.numberTurns + 1]
            const answerList = this._createAnswerArray(newPhotoKey) ;
            // this.mydefs.
    
            this.setState({
                guessSelection:null,
                photoKey:newPhotoKey,
                numberTurns:this.state.numberTurns + 1,
                numberCorrect: this.state.numberCorrect + 1,
                selectedImage:`./guessing/${this.state.photos[newPhotoKey].photo}`, 
                message:"correct, guess again." ,
                answerList:answerList,
                numberOfCircles:this.state.numberOfCircles + 1,
            }, ()=> {
                console.log("we are running correct guess")
            })
        }

        }

}

_addScore = async (value) => {
console.log(`The value we are tyring to add is ${value}`);
    const url = `/main/addscore/${value}/`;
    const response = await post(url);
    // console.log("front end r4esponse", response);
    this.props.handleUpdate();
    this.props.handleMessage(response.data.message)


  }

  _imgOnLoad = () => {
    console.log("Image Loaded");

      const myImage = new Image(this.state.imageLoadSize,this.state.imageLoadSize);   
      myImage.onload = () => {

                console.log("a 2nd image onload function")
                console.log("this.props.selectedImage is ", this.state.selectedImage)
                const size = myImage.width
                console.log("my image", myImage.src);
                
                //set contants
                const numberOfCircles = this.state.numberOfCircles;
                //create patterns and load them to state
                console.log("natural height should not be zero", myImage.naturalHeight)
                const oCtx =  loadImageToCanvas(myImage ,size, size)
                const patternWidth = parseInt(size/numberOfCircles) //same as this.width
                const dataObject = createDataArray(numberOfCircles,patternWidth,patternWidth)
                
                const tempCanvas = createTempCanvas(patternWidth,patternWidth);
                
                const allPatternImages = []
                dataObject.forEach((d,i) => {
                    allPatternImages.push(createPatterns(oCtx,tempCanvas,d.x,d.y,d.pW,d.pH,i+1))
                })
                
                console.log(allPatternImages.map((i)=> i.src))
                setTimeout(() => {
                    this.setState({
                        patterns:allPatternImages,
                        dataObject:dataObject,
                    }) 

                },500)
      }
      myImage.src = "";
      console.log("before setting image value")
      myImage.src = `${this.state.selectedImage}` ;
    //   this.state.selectedImage ? myImage.src=`./guessing/iguana.jpg` : myImage.src=`./guessing/sharks.jpg`

}

}

function loadImageToCanvas(loadedImage,canvasWidth, canvasHeight) {
    const oCanvas = document.createElement('canvas');
    const oCtx = oCanvas.getContext('2d');
    
    console.log("natural height", loadedImage.naturalHeight);
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
