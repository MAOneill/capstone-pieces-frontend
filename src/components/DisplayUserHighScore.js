import React from 'react'

export default function DisplayUserHighScore(props) {
    let ascore;
    console.log("props are",props.scores[0])
    if (props.scores) {

        //  ascore = props.scores[0].score
         ascore = Math.max(...props.scores.map((each) => {
             return each.score
         }))
    }
    else {
        ascore = "no score yet"
    }
    console.log(ascore);
  return (
    <div>
       <h4>Your high Score is: {ascore}</h4>
    </div>
  )
}



