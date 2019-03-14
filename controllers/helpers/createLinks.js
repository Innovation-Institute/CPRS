/**
 * This will create links for the views pass in this file
 * or the specfic function while calling render so that it 
 * could be avaiable to make an any String with comma separated 
 * values(All "_Name" fields in Airtable are returned as comma separated 
 * values) and an array with their IDs(All "_Link" fields are 
 * returned as arrays). 
 * 
 * For Eg: Inputs
 *         values->Member_Name -> "John Doe, Maxi Rodriguez"
 *         keys->Member_Link -> ["rec15262635","rec9282891"]
 *         table->members
 *         Outputs:
 *         "<a href='/members/view/rec15262635'>John Doe</a>
 *          <a href='/members/view/rec9282891'>Maxi Rodriguez</a>"
 * @param {Array} keys 
 * @param {String} values 
 * @param {String} table 
 * 
 */
module.exports={
    createClickableLinks: createClickableLinks
}
function createClickableLinks(keys,values,table){
    if (typeof values!="undefined"){
        values= values.toString().split(",");
        totalLength= keys.length;
    }else{
        totalLength= 0;
    }
    htmlLinks="";
    for(i=0;i < totalLength;i++){ 
        if(i<totalLength-1){
            htmlLinks=htmlLinks+"<a href='/"+table+"s/view/"+keys[i]+"'>"+values[i]+"</a>,";
        }
        else{
            htmlLinks=htmlLinks+"<a href='/"+table+"s/view/"+keys[i]+"'>"+values[i]+"</a>";
        }
    }
    return htmlLinks;
}