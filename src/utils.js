function createRandomArray(n) {

    //this creates an array of integers from 1 to n.
    //these integers are then randomized inside the array.
    //note you will have keys from 0 to n-1.  Length will be n.
    const patternKeyArray = [...Array(n + 1).keys()]

    patternKeyArray.splice(0,1);  //remove the first zero

    let randomArray = [];
    
    for (let i=0; i < n ; i++) {
        //take a random number from patternKeyArray and push it to random array:
        let randomKey = parseInt((Math.random() * patternKeyArray.length));
        randomArray.push(patternKeyArray[randomKey])
        // remove that randomKey from patternKeyArray
        patternKeyArray.splice((randomKey),1);
    }
    // console.log(patternKeyArray, "should be empty");
    // console.log(randomArray, `should have ${n} values`);

  
return randomArray;


}

export {createRandomArray};