import React from 'react'

// import {Link, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function MenuBar(props) {
  return (
    <div className="nav">


<Link className="navelement topnav" to="/out">Logout</Link>
<img className="tinypuzzlepiece" src="./puzzlepiece.png" alt="tiny puzzle piece"></img>
{/* logout will still need to be a component...in didMount: it will do a window.location to /login */}
<Link className="navelement topnav" to="/puzzle">Puzzle</Link>
<img className="tinypuzzlepiece" src="./puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/bubbles">Bubbles</Link>
<img className="tinypuzzlepiece" src="./puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/guess">Guessing Game</Link>
<img className="tinypuzzlepiece" src="./puzzlepiece.png" alt="tiny puzzle piece"></img>
<Link className="navelement topnav" to="/uploadphotos">Change Images</Link>

    </div>
  )
}
