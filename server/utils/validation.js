let isRealString = (str) =>{
    let val = typeof str === "string" && str.trim().length>0;
    return val ;  //make sure string is a real string and when white space trimmed, it is is still bigger than 0
};

module.exports = {isRealString};