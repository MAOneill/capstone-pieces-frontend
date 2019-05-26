
import React, { Component } from 'react'
import puzzleDict from '../puzzleDict';
import PuzzlePiece from './PuzzlePiece';

export default class Puzzle extends Component {

        constructor(props) {
            super(props);
            this.state={
				patterns:[],
				dataObject:puzzleDict,
				// selectedImage:null,
				imageLoadSize:400,
				// styleObj:{},
				viewBoxWidth:700,
				viewBoxHeight:500,
				selectedPiece:null,
				svgWidth:null,
				svgHeight:null,
				svgOffsetTop:null,
				svgOffSetLeft:null,
			}
			this.puzzlesvg = React.createRef();
			// console.log(this.puzzlesvg)
        }
	


    render() {
        return (
            <div className="thepuzzleContainer">
			

				<svg className="puzzlesvg"  
				ref={this.puzzlesvg}
							// draggable="true"
								key={(new Date().getTime())}
								// viewBox={`0 0 700 700` }
								viewBox={`0 0 ${this.state.viewBoxWidth} ${this.state.viewBoxHeight}` }
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
					<PuzzlePiece 
						id={`piece${piece.pat}`}
						key={piece.pat}
						viewBoxWidth={this.state.viewBoxWidth}
						viewBoxHeight={this.state.viewBoxHeight}
						patternNum={piece.pat}
						transformOrigin={`${piece.x + (piece.w/2)}px ${piece.y +(piece.h/2)}px`}
						stroke={piece.stroke}
						path={piece.d}
						origX={piece.x}
						origY={piece.y}
						rotateDeg={0}
						xMove={0}
						yMove={0}
						svgWidth={this.state.svgWidth}
						svgHeight={this.state.svgHeight}
						svgOffsetTop={this.state.svgOffsetTop}
						svgOffSetLeft={this.state.svgOffSetLeft}
						
						fill={`url(#pattern${piece.pat})`}
						// selected={(this.state.selectedPiece === piece.pat) ? true : false}
						handleSelectedPiece={() => {
							this._selectedPiece(piece.pat)
						}}
						/>

					
					
				))}
 {/* <use id="use" xlinkHref={`#piece${this.state.selectedPiece}`} /> */}
 <use id="use" xlinkHref="#drag" />
				</svg>						
			</div>
        )
	}
	
_selectedPiece = (pat) => {
	console.log("does this get activated on a drag too? NO, IT DOESN'T...")
	this.setState({
		selectedPiece:pat
	})
}
componentDidMount() {
// console.log(this.puzzlesvg, this.puzzlesvg.current.clientWidth, this.puzzlesvg.current.clientHeight, 
// 	this.puzzlesvg.current.parentElement.offsetTop,
// 	this.puzzlesvg.current.parentElement.offsetLeft,
// 	);
	
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
				svgWidth:this.puzzlesvg.current.clientWidth, 
				svgHeight:this.puzzlesvg.current.clientHeight, 
				svgOffsetTop:this.puzzlesvg.current.parentElement.offsetTop,
				svgOffSetLeft:this.puzzlesvg.current.parentElement.offsetLeft,

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




