import React from 'react'

// import {Link, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function MenuBar(props) {
  return (
    <div className="nav">


<Link className="navelement topnav" to="/out">Logout</Link>
{/* logout will still need to be a component...in didMount: it will do a window.location to /login */}
<Link className="navelement topnav" to="/puzzle">Puzzle</Link>
<Link className="navelement topnav" to="/bubbles">Bubbles</Link>
<Link className="navelement topnav" to="/guess">Guessing Game</Link>
<Link className="navelement topnav" to="/uploadphotos">Upload Photos</Link>

    </div>
  )
}
