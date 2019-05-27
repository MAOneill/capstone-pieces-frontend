import React from 'react'
import {Link} from 'react-router-dom';

export default function PhotoActions(props) {
    return (
        <div>
            {props.selectedPhoto ?
             <h5>What would you like to do with this photo?</h5>
             : <h5>Select A Photo to Use.</h5> }
            {props.selectedPhoto ?
            <div>
            <Link className="navelement bright"
            to="/puzzle">Create a Puzzle</Link>
            <Link className="navelement bright"
            to="/bubbles">Bubble-fy it</Link>
            </div>
            : null
            }
            {/* <Link className={props.selectedPhoto ? "navelement bright":"navelement dull"}
                    to="/puzzle">Create a Puzzle</Link>
            <Link className={props.selectedPhoto ? "navelement bright":"navelement dull"}
                    to="/bubbles">Bubble-fy it</Link> */}

        </div>
    )
}
