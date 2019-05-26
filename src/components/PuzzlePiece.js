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
        this.PuzzlePiece = React.createRef();
        this.isDragging=false;
    }
    render() {
        return (
            <svg className={`puzzlesvg puz${this.state.patternNum}`}
            draggable="true"
            ref={this.PuzzlePiece}
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
                            
                            //this resets all the pices...don't do this
                            // onClick={this.props.handleSelectedPiece}
                           
                            // onTouchStart={(e) => {

                            //     // this.props.handleSelectedPiece()
                            //     e.preventDefault();
                            //     document.addEventListener('ontouchmove', this._handleMouseMove);
                            //     document.addEventListener('ontouchend', this._handleMouseUp);
                            //     this.setState({
                            //         isDragging:true,
                            //     })
            
                            //         }}
                            onTouchMove={(e) => {
                                // alert(`touch move e.screenX: ${e.screenX}, e.clientX:${e.clientX}, 
                                // e.screenY:${e.screenY}, e.clientY:${e.clientY}`)
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
                                })
            
                                    }}

                                onClick={(e) => {
                                  
                                    e.preventDefault();
                                    console.log("click only");
                                }}
                           
                            
                            />
                            {/* use this to rotate.  only show it if selected. */}
                            <circle r="5px" cx={this.props.origX} cy={this.props.origY} 
                            style={this.state.style}
                            fill="yellow" />
					</svg>
        )
    }
_handleMouseUp = (e) => {
    e.preventDefault();
                                document.removeEventListener('mousemove', this._handleMouseMove);
                                document.removeEventListener('touchmove',this._handleMouseMove)
                                console.log("mouseUp")
                                // alert("mouse up")
                                this.setState({
                                    isDragging:false,
                                    style:{
                                        ...this.state.style,
                                        transformOrigin:this.state.transformOrigin,
                                        strokeWidth:"1px",                                        
                                        stroke:"red",
                                       },
                                })
                                console.log("onmouseup,", e, this.state.isDragging)
                            }


_handleMouseMove = (e) => {
    // alert("mose move")
    console.log("my _handlemousemove", 
    `svgOffSetTop: ${this.state.svgOffsetTop}, svgOffSetLeft:${this.state.svgOffSetLeft},
    svgWidth:${this.state.svgWidth}, svgHeight:${this.state.svgHeight},
    e.screenX: ${e.screenX}, e.clientX:${e.clientX}, 
    e.screenY:${e.screenY}, e.clientY:${e.clientY},
    this.state.origY:${this.state.origY}`,e);


            e.preventDefault();
            if (this.state.isDragging) {
                // console.log("moving")
                
                let xmove = e.clientX - this.state.svgOffSetLeft - 
                        (this.state.origX * this.state.svgWidth/500);
                let ymove = e.clientY  - this.state.svgOffsetTop - 
                        (this.state.origY * this.state.svgHeight/700);
                console.log(xmove, ymove, "are these correct");
                this.setState({
                    style:{
                        transformOrigin:this.state.transformOrigin,
                        // transform: ` translate(300px, 300px)
                        //             rotate(90deg)`,
                        transform: ` translate(${xmove}px, 
                                    ${ymove}px)
                                    rotate(${this.state.rotateDeg}deg)`,

                        strokeWidth:"2px",
                        stroke:"yellow",
                        }
                })
            }

}
componentDidMount() {
}

}
