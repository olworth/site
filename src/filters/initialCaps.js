function initialCaps(str) {
// Capitalises the first letter of each word in a string
    let newStr = "";
    let arr = str.split(" ");
    for (let i=0; i<arr.length; i++) {
        newStr = newStr.concat(" ", arr[i].charAt(0).toUpperCase()+arr[i].slice(1));
    }
    
    return newStr
}

module.exports = initialCaps;