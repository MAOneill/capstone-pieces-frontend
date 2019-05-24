import React, { Component } from 'react'
import * as d3 from "d3";

export default class D3bubbles extends Component {
  constructor(props) {
    super(props);
    this.state={
      tempDataObject:null,
    }
  }
  render() {
    return (
      <div>

{this.props.isGameOver ? null : (

<svg id="drawing" ref={node => this.node = node}
          // viewBox="0 0 1000 1000"
          viewBox = {`0 0 ${this.props.viewsize} ${this.props.viewsize}`}
          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          onMouseMove={this._thisMouseMove}>


            </svg>
)

}
      </div>
    )
  }


  componentDidMount(){
    this._createD3bubbles();
    console.log("component DID MOUNT RAN");
    this.setState({
      tempDataObject:this.props.dataObject,
    })

  }
  componentDidUpdate(){
    console.log("componentDidUpdate ran in d3");

    if (this.state.tempDataObject !== this.props.dataObject ) {
      //reset the entire d3 object
        const node = this.node   
        let svg = d3.select(node)
        svg.selectAll("circle").remove();
        this.setState({
          tempDataObject:this.props.dataObject,
        })
    }
    this._createD3bubbles();
  }
  _createD3bubbles = () => {

    const node = this.node   
    // console.log(this.node);
    const dataObject = this.props.dataObject;

  
    const nodes = [{x:1,y:1,pw:100,ph:100,radius:0}, ...dataObject]
   
    //this should really equal my viewbox size in Bubble.js
    const width = this.props.viewsize/2,
         height = this.props.viewsize/2;

     const   root = nodes[0];
    //  const   color = d3.scale.category10();
    
    root.radius = 0;
    root.fixed = true;
    
    let force = d3.layout.force()  
        .gravity(0.05)
        .charge(function(d, i) { return i ? 0 : -2000; })
        .nodes(nodes)
        .size([width, height]);
    
    force.start();
    
    // let svg = d3.select(node).append("svg")
    //     .attr("viewBox",`0 0 ${width},${height}`);
    
    let svg = d3.select(node)
    

    svg.selectAll("circle")     
        .data(nodes.slice(1))
        // .data(nodes)
      .enter()
      .append("circle")
        .attr("r", function(d) { return d.radius; })
        // .style("fill", function(d, i) { return color(i % 3); })
        .style("fill", function(d,i) {return `url(`+ window.location.origin + window.location.pathname + `#pattern${i+1})`});
    
    
        
    
    force.on("tick", function(e) {
      let q = d3.geom.quadtree(nodes),
          i = 0,
          n = nodes.length; //length of the array
    
      while (++i < n) q.visit(collide(nodes[i]));
    
      svg.selectAll("circle")
          .attr("cx", function(d) { return (d.x + (d.pW/2)); })
          .attr("cy", function(d) { return (d.y + (d.pH/2)); });
    });
    
 
    svg.on("mousemove", function() {
      let p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });
    
    function collide(node) {
        // console.log("c ollide function running"); //this runs constantly...

      let r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
    
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          let x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }

  }



}
