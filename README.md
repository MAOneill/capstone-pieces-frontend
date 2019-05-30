## Livesite: https://pieces.photo/

<PIECES GIF>

## Pieces – play with your photos:

## Description 
This project involved taking apart digital photographs and using the subsets as patterns for SVG shapes.  At first, I worked out the logic to take an image and create SVG patterns that would map to circles that were created using the D3 library.  D3 is a powerful SVG creator and the technique that I used calculates ‘force’ to make the user’s mouse movements cause the circles to move around the screen and appear to bounce off of each other.  The circles containing small portions of the picture that will now randomly dance in response to the cursor movements.

This technique was then used to make a guessing game, where the user tries to guess the contents of an image as the circle portions get smaller, more abundant, and move out of original location.  The user’s high score is logged as they progress through a random selection of photos.

A user can upload their own pictures and turn them into moveable bubbles with up to 400 circles.  Try it – it is oddly soothing!  The pictures can also be converted into a jigsaw puzzle that is solvable.  Each piece is randomly placed in the display space and the user can rotate and drag the pieces into place.  Subtle clues inform the user of correct placement.

## Technologies used
Axios, PostgreSQL, node.js, express.js, sharp, bcrypt, and dotenv were implemented for the backend to handle a database of user accounts, manage their scores and their uploaded files.  The sharp module was particularity helpful to square and reorient uploaded images.  The front end was developed with React.js.  HTML, especially SVG and Canvas elements, the D3 JavaScript library and CSS construct the frontend. 

## Challenges

One of the biggest challenges for this project was ensuring cross-browser compatibility.  Safari was particularly difficult, and I learned that the safari platform has much stricter rules for SVG images and patterns than Chrome or Firefox.  The math used to calculate the puzzle piece location was particularly difficult, especially since SVG elements do not support “drag” events.

## Backend code can be found here https://github.com/MAOneill/capstone-pieces-backend




