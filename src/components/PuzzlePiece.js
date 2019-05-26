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
                is={this.state.isDragging? "drag" : ""}
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

                            onMouseDown={(e) => {
                                // this.props.handleSelectedPiece()

                                document.addEventListener('mousemove', this._handleMouseMove);
                                this.setState({
                                    isDragging:true,
                                })
                                // console.log(this.isDragging, "isdragging in mousedown");
                                // console.log("on mouse down: ", e.clientX, e.clientY);
                                // console.log("my new ref width", this.PuzzlePiece)
            
                                    }
                                }
                                
                            onMouseUp={(e) => {
                                // this.isDragging=false;
                                document.removeEventListener('mousemove', this._handleMouseMove);

                                this.setState({
                                    isDragging:false,
                                    style:{
                                        ...this.state.style,
                                        
                                        strokeWidth:"1px",
                                        
                                        stroke:"red",
                                       },
                                })
                                console.log("onmouseup,", e, this.state.isDragging)
                            }}
                            />
					</svg>
        )
    }
_handleMouseMove = (e) => {
    console.log("my _handlemousemove", 
    `svgOffSetTop: ${this.state.svgOffsetTop}, svgOffSetLeft:${this.state.svgOffSetLeft},
    svgWidth:${this.state.svgWidth}, svgHeight:${this.state.svgHeight},
    e.screenX: ${e.screenX}, e.clientX:${e.clientX}, 
    e.screenY:${e.screenY}, e.clientY${e.clientY}`);


            e.preventDefault();
            if (this.state.isDragging) {
                this.setState({
                    style:{...this.state.style,
                        transform: ` translate(${e.screenX-e.clientX-this.state.svgOffSetLeft}px, 
                                    ${e.screenY-e.clientY-this.state.svgOffSetLeft}px)
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
