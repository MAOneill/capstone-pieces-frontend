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
            transformOrigin:this.props.tranformOrigin,
            path:this.props.path,
            style:{
            
                 transform: `rotate(${this.props.rotateDeg}deg) translate(${this.props.xMove}px, ${this.props.yMove}px)`,
                 transformOrigin:this.props.transformOrigin,
                 stroke:this.props.stroke,
                }
        }
    }
    render() {
        return (
            <svg className={`puzzlesvg puz${this.state.patternNum}`}
					key={this.state.patternNum}
						viewBox={`0 0 ${this.props.viewBoxWidth} ${this.props.viewBoxHeight}` }

						xmlns="http://www.w3.org/2000/svg" 
						xmlnsXlink="http://www.w3.org/1999/xlink">
						<path className={`st0 x${this.state.patternNum}`}  		
                            style={this.state.style}

							d={this.state.path}
							fill={`url(#pattern${this.state.patternNum})`} />
					</svg>
        )
    }

componentWillMount() {
    console.log("transform Origin", this.props.transformOrigin);
    //assign random deg turns and positioning
    let x = 600;
    let y = 20;
    let deg = -30;
    if (this.state.patternNum === 54) {
        //you must move x and y first THEN ROTATE!!!
        this.setState({
            
            style:{
                stroke:"orange",
                transformOrigin:this.state.transformOrigin,
                transform: ` translate(${x}px, ${y}px) rotate(${deg}deg)`,
             

            }

        })
    }
}

}
