import React from 'react'

// import {Link, Route} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function MenuBar(props) {
  return (
    <div className="nav">


<Link className="navelement" to="/out">Logout</Link>
{/* logout will still need to be a component...in didMount: it will do a window.location to /login */}
<Link className="navelement" to="/puzzle">Puzzle</Link>
<Link className="navelement" to="/bubbles">Bubbles</Link>
<Link className="navelement" to="/guess">Guessing Game</Link>
<Link className="navelement" to="/uploadphotos">Upload Photos</Link>

    </div>
  )
}
