
import React, { Component } from 'react'
import puzzleDict from '../puzzleDict';

export default class Puzzle extends Component {

        constructor(props) {
            super(props);
            this.state={
				patterns:[],
				dataObject:puzzleDict,
				selectedImage:null,
				imageLoadSize:400,
				// styleObj:{}
            }
        }
	


    render() {
        return (
            <div className="thepuzzleContainer">
			

				<svg className="puzzlesvg"  
								key={(new Date().getTime())}
								viewBox={`0 0 700 700` }
								xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">



				<defs className="patternDefs">

					{this.state.patterns.map((pattern,i) => (
								<pattern id={`pattern${i+1}`} 
								key={(new Date().getTime() + i)} 
								patternUnits="objectBoundingBox" width="100%" height="100%">
									<image 
										key={(new Date().getTime()+(i*1000))}
										width={`${this.state.dataObject[i].w}px`} height={`${this.state.dataObject[i].h}px`} 
										xlinkHref={pattern.href.baseVal}
										>
									</image>
								</pattern>
								))}

				</defs>
{/* all the paths go here...should be the same viewBox size as parent svg... */}
				{this.state.dataObject.map((piece,i) => (
					<svg className={`puzzlesvg puz${piece.pat}`}
					key={i}
						// viewBox={`0 0 1000 1000 ` }
						viewBox={`0 0 700 700 ` }
						xmlns="http://www.w3.org/2000/svg" 
						xmlnsXlink="http://www.w3.org/1999/xlink">
						<path className={`st0 x${piece.pat}`}  		
							style={{
								transform: piece.style,
								transformOrigin:`${piece.x + (piece.w/2)}px ${piece.y +(piece.h/2)}px`,
								stroke:piece.stroke,
							// transform: "rotate(10deg) translate(-100px, 100px)",
							// transform: "translate(10,400)",
							// transform: "rotate(5deg) translateX(-10) translateY(-10)",
						}}

							d={piece.d}
							fill={`url(#pattern${piece.pat})`} />
					</svg>
					
				))}

				</svg>						
			</div>
        )
	}
	

componentDidMount() {

		// let styleObj = {};
		// 	this.state.dataObject.forEach((piece)=> {
		// 		styleObj[`${piece.pat}`]= { style:"rotate(10deg) translate(-100px, 100px)",
		// 									rotateDeg: 0,
		// 									xMove:0,
		// 									yMove:0,
		// 									}
											 
		// 		})
		// 		console.log(styleObj);

	// this.setState({
	// 	styleObj:styleObj,
	// })

	//you have to give it an empty src.  THEN assign the onload behavior,
	//THEN you can load the real image.  this a bug in safari and this is the only way around it.
	//otherwise subsequent images will not load into the patterns!
	const myImage = new Image(this.state.imageLoadSize,this.state.imageLoadSize);   
    myImage.src="";
    
    myImage.onload = () => {
        const size = myImage.width
        //set contants
            console.log("CREATING PATTERNS")
            const oCtx =  loadImageToCanvas(myImage ,size, size)
            
            const allPatternImages = []
            this.state.dataObject.forEach((piece,i) => {
				// console.log(piece.w, piece.h, piece.loc);
				const tempCanvas = createTempCanvas(piece.w,piece.h);
                allPatternImages.push(createPatterns(oCtx,tempCanvas,piece.x,piece.y,piece.w,piece.h,i+1))
            })
            this.setState({
                patterns:allPatternImages,
				// dataObject:dataObject,
				// styleObj:styleObj,
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




