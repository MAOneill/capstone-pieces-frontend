import React from 'react'
import {Link} from 'react-router-dom';

export default function PhotoActions(props) {
    return (
        <div>
            <h4>Select Photo Above then:</h4>
            <Link className={props.selectedPhoto ? "navelement bright":"navelement dull"}
                    to="/puzzle">Puzzle</Link>
            <Link className={props.selectedPhoto ? "navelement bright":"navelement dull"}
                    to="/bubbles">Bubbles</Link>

        </div>
    )
}
