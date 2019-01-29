/*Helper functions to check for nulls, Strings to Arrays and empty responses. */
module.exports={
    checkText: checkText,
    checkSelect: checkSelect,
    checkLink: checkLink,
    checkNumber:checkNumber
}
/**
 * Returns empty string if current text field is null
 * 
 * @param {*} val 
 */
function checkText(val){
    if(val == null){
        val='';
        return val;
    }
    return val;
}
/**
 * Returns null if select is an empty field.
 * 
 * @param {*} val 
 */
function checkSelect(val){
    if(val === ''){
        val=null;
        return val;
    }
    return val;
}
/**
 * Makes a linked field into an Array as when setting a value into AirTable, 
 * an array is required.
 * 
 * @param {*} val 
 */
function checkLink(val){
    if (val instanceof Array) {
        return val;
    } else if(typeof val == 'string' || val instanceof String) {
        val= [ val ];
        return val;
    } else {
        val = [];
        return val;
    }
}
/**
 * 
 * @param {String} val 
 */
function checkNumber(val){
    if(typeof val=="string"){
        val=Number(val)
    }else{
        val=0;
    }
    return val;
}

/**
 * 
 * For dates use Select as it simulates the necessary 
 * behavior for the date to be parsed by 1.
 * 
function checkDates(formInput,fields){
    for(i=0;i<fields.length;i++){
        if(formInput[fields[i]] == ""){
            delete formInput[fields[i]];
        }
    }
    return formInput;
}
*/

