import React, { Component } from 'react'


// import {Link, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      showMenu:false
    }
  }
  render() {
  return (
    <div className="nav">

<div className="mobilenav">

<img className="logo" src="./default/pieces2.png" />
<div className="menu"
  onClick={() =>
    document.getElementById("menulist").classList.toggle("hidemenu")
  }
  >
  <img className="menuimg" src="./default/menu.png"></img>
  </div>
  <div>
      <ul onClick={() =>
      document.getElementById("menulist").classList.add("hidemenu")
      }
      id="menulist" className="displaymenuonclick hidemenu">
        <li><a className="navelement topnav" href="/logout">Logout</a></li>
    <li><Link className="navelement topnav" to="/">Menu</Link></li>
    <li><Link className="navelement topnav" to="/puzzle">Puzzle</Link></li>
    <li><Link className="navelement topnav" to="/bubbles">Bubbles</Link></li>
    <li><Link className="navelement topnav" to="/guess">Guessing Game</Link></li>
    <li><Link className="navelement topnav" to="/uploadphotos">Change Images</Link></li>
  </ul>
  </div>



</div>

<div className="desktopnav"> 
<img className="logo" src="./default/pieces2.png" />

<a className="navelement topnav" href="/logout">Logout</a>
<img className="tinypuzzlepiece" src="./default/puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/">Menu</Link>
<img className="tinypuzzlepiece" src="./default/puzzlepiece.png" alt="tiny puzzle piece"></img>
{/* logout will still need to be a component...in didMount: it will do a window.location to /login */}
<Link className="navelement topnav" to="/puzzle">Puzzle</Link>
<img className="tinypuzzlepiece" src="./default/puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/bubbles">Bubbles</Link>
<img className="tinypuzzlepiece" src="./default/puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/guess">Guessing Game</Link>
<img className="tinypuzzlepiece" src="./default/puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/uploadphotos">Change Images</Link>
<img className="logoright" src="./default/pieces2.png" />
</div>

    </div>
  )
}
}
