import React, { Component } from 'react'

export default class PuzzlePiece extends Component {
    constructor(props) {
        super(props);
     
        this.state={
            rotateDeg:this.props.rotateDeg,
            xMove:this.props.xMove,
            yMove:this.props.yMove,
            stroke:"red",
            selected:this.props.selectedPiece,
            patternNum:this.props.patternNum,
            transformOrigin:this.props.transformOrigin,
            path:this.props.path,
            origX:this.props.origX,
            origY:this.props.origY,
            isDragging:false,
            isRotateable:false,
            svgWidth:this.props.svgWidth, 
			svgHeight:this.props.svgHeight, 
			svgOffsetTop:this.props.svgOffsetTop,
			svgOffSetLeft:this.props.svgOffSetLeft,
            style:{
            
                 transform: ` translate(${this.props.xMove}px, ${this.props.yMove}px)
                              rotate(${this.props.rotateDeg}deg)`,
                 transformOrigin:this.props.transformOrigin,
                 stroke:this.props.stroke,
                }
        }
        // this.PuzzlePiece = React.createRef();
        // this.isDragging=false;
        this.timeout="";
    }
    render() {
        return (
            <svg className={`puzzlesvg puz${this.state.patternNum}`}
            draggable="true"
            // ref={this.PuzzlePiece}
                id={this.state.isDragging? "drag" : ""}
                // id={this.props.id} 
                key={this.state.patternNum}
						viewBox={`0 0 ${this.props.viewBoxWidth} ${this.props.viewBoxHeight}` }

						xmlns="http://www.w3.org/2000/svg" 
						xmlnsXlink="http://www.w3.org/1999/xlink">
						<path className={`st0 x${this.state.patternNum}`}  		
                            style={this.state.style}

							d={this.state.path}
                            fill={`url(#pattern${this.state.patternNum})`} 
                            
                            onTouchMove={(e) => {
                              
                                //IPHONE REGISTERS A TOUCH MOVE.BUT I CAN'T GET X/Y POSITIONS
                                //FROM THE EVENT ON THE SVG PIECE.
                                this.setState({
                                    isDragging:true,
                                })
                                document.addEventListener('touchmove', this._handleMouseMove, { passive: false });
                                document.addEventListener('touchup', this._handleMouseUp, { passive: false });
                                
                                // this._handleMouseMove(e)
                            }}
                            
                            onMouseDown={(e) => {
                            // alert("mouse down")
                                // this.props.handleSelectedPiece()
                                e.preventDefault();
                                document.addEventListener('mousemove', this._handleMouseMove);
                                document.addEventListener('mouseup', this._handleMouseUp);
                                this.setState({
                                    isDragging:true,
                                    isRotateable:true,
                                })
            
                                    }}

                                onClick={(e) => {
                                  
                                    e.preventDefault();
                                    console.log("click only");
                                }}
                           
                            
                            />
                            {/* use this to rotate.  only show it if selected. */}
                            {this.state.isRotateable ? 
                                <circle r="5px" cx={this.props.origX} cy={this.props.origY} 
                                style={this.state.style}
                                onClick={this._handleRotation}
                                fill="yellow" />
                            :null}
                            
					</svg>
        )
    }
_handleRotation = () => {
    let bordercolor = "red"
    if ((this.state.xMove === 0) && (this.state.yMove === 0) && ((this.state.rotateDeg + 90) === 0)) {
        bordercolor = "green"
    }
    this.setState({
        rotateDeg:(this.state.rotateDeg + 90) % 360 ,
        stroke:bordercolor,
        style:{
            transformOrigin:this.state.transformOrigin,
            // transform: ` translate(300px, 300px)
            //             rotate(90deg)`,
            transform: ` translate(${this.state.xMove}px, 
                        ${this.state.yMove}px)
                        rotate(${(this.state.rotateDeg + 90)%360}deg)`,

            strokeWidth:"2px",
            stroke:"yellow",
            }
    })
}
_handleMouseUp = (e) => {
    e.preventDefault();
    //this clears all the timeouts that are running...so there is only one.
    //otherwise, eveytime you mouseup on the piece it creates timeoout interval and the 
    //rotate button becomes unreliable.  this way, there is only ONE timeout event
    //to remove the rotate button from the LAST mouse up event
                clearTimeout(this.timeout)
                                document.removeEventListener('mousemove', this._handleMouseMove);
                                document.removeEventListener('touchmove',this._handleMouseMove)
                                // console.log("mouseUp")
                                // alert("mouse up")

                                //this is NOT getting triggered in phone, because I'm not
                                //touching hte piece.  the touchup is supposed to be on th edocuent...
                                //but its not recognizing it...  but if I tap and release
                                //the piece it works...so....
                                //get positioning correct, should work....
                                this.setState({
                                    isDragging:false,
                                    style:{
                                        ...this.state.style,
                                        transformOrigin:this.state.transformOrigin,
                                        strokeWidth:"1px",                                        
                                        stroke:this.state.stroke,
                                       },
                                })
                                // console.log("onmouseup,", e, this.state.isDragging)
                                
                                     this.timeout = setTimeout(() => {
                                        this.setState({
                                            isRotateable:false,
                                            style:{
                                                ...this.state.style,
                                                
                                                strokeWidth:"1px",                                        
                                                stroke:this.state.stroke,
                                               },
                                        })
                                    },5000);
                                        
                                
                            }


_handleMouseMove = (e) => {
    // alert("mose move")    //iphone gets here!!!
    //   alert(`touch move e.screenX: ${e.screenX}, e.clientX:${e.clientX}, 
    //                             e.screenY:${e.screenY}, e.clientY:${e.clientY}`)
    console.log("my _handlemousemove", 
    `svgOffSetTop: ${this.state.svgOffsetTop}, svgOffSetLeft:${this.state.svgOffSetLeft},
    svgWidth:${this.state.svgWidth}, svgHeight:${this.state.svgHeight},
    e.screenX: ${e.screenX}, e.clientX:${e.clientX}, 
    e.screenY:${e.screenY}, e.clientY:${e.clientY},
    this.state.origY:${this.state.origY}
    this.state.origX:${this.state.origX}`);

    let clientX, clientY, magnifyer;
    //touches are the iphone x and y.  this works

    //trying to use magnifyer to account for pixel ratio on iphone....not working
    if (e.touches) {
         clientX = e.touches[0].clientX;
         clientY = e.touches[0].clientY;
         magnifyer=2;
         console.log("touchevent",e);
        // alert(`clientX: ${clientX} clientY: ${clientY}`)
    }
    else {
        clientX = e.clientX;
        clientY = e.clientY;
        magnifyer=1;
    }

            e.preventDefault();
            if (this.state.isDragging) {
                // console.log("moving") 
                let bordercolor="";
                let strokecolor="red"
                let maxX = Math.min((clientX -this.state.svgOffSetLeft)* 700/this.state.svgWidth,660)
                    maxX = Math.max(maxX,0)
                let maxY = Math.min((clientY -this.state.svgOffsetTop)* 500/this.state.svgHeight ,470)
                    maxY = Math.max(maxY,0)
                // let xmove= (-this.state.origX  + ((clientX -this.state.svgOffSetLeft) * 700/this.state.svgWidth) ) -20
                // let ymove =( -this.state.origY  + ((clientY -this.state.svgOffsetTop) * 500/this.state.svgHeight) ) -20
                let xmove= (-this.state.origX  + (maxX  ) -20)
                let ymove =( -this.state.origY  + (maxY ) -20)
                
                console.log(maxX, maxY)
                
                //if the pice is within 5 pixels of the origin, set the move offset to zero:
                if ((xmove < 5) && (xmove > -5)) {
                    xmove = 0
                }
                if ((ymove < 5) && (ymove > -5)) {
                    ymove = 0
                }

                if ((xmove===0) && (ymove===0)) {
                    bordercolor="green"
                    if(this.state.rotateDeg === 0) {
                        strokecolor="green"
                    }
                }
                else bordercolor="yellow"
                
                console.log(xmove, ymove, "are these correct");
                this.setState({
                    xMove:xmove,
                    yMove:ymove,
                    stroke:strokecolor,
                    style:{
                        transformOrigin:this.state.transformOrigin,
                        // transform: ` translate(300px, 300px)
                        //             rotate(90deg)`,
                        transform: ` translate(${xmove}px, 
                                    ${ymove}px)
                                    rotate(${this.state.rotateDeg}deg)`,

                        strokeWidth:"2px",
                        stroke:bordercolor,
                        }
                })
            }

}
componentDidMount() {

    //create random piece positioning
    let randomX  = parseInt(Math.random() * 650)
    let randomY  = parseInt(Math.random() * 460)
    let randomRotate = parseInt(Math.random() * 4) * 90
    let xmove= (-this.state.origX  + (randomX) ) 
    let ymove =( -this.state.origY  + (randomY) ) 
  this.setState({
      rotateDeg:randomRotate,
    style:{
        ...this.state.style,
        transform: ` translate(${xmove}px, 
                    ${ymove}px)
                    rotate(${randomRotate}deg)`,

        strokeWidth:"1px",
        stroke:this.state.stroke,
        }
  })
  
}

}
