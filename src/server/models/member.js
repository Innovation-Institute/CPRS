const airtable= require('../../../config');
const base= airtable.base;

module.exports={
    viewPrimaryKeys:viewPrimaryKeys
}
function viewPrimaryKeys(callback){
    let set=[];
    base('member').select({
        // Selecting the first 3 records in all_team:
        view: "all_member"
    }).eachPage(async function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    
        records.forEach(function(record) {
            set.push(record.get('Name_Text'));
        });
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
        callback(set);
    });
            // async function to avoid callback hell !!!
}