const airtable= require('../../../config');
const base= airtable.base;

module.exports={
viewPrimaryKeys: viewPrimaryKeys,
getRecord: getRecord,
filteredRecords: filteredRecords,
viewAll: viewAll
}

function viewAll(table){
    base(table).select({
        view: 'all_'+table
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            set.push({"id": record["id"],"record": record["fields"]});
            console.log(set);
        });
    
        fetchNextPage();
    }, function done(error) {
        console.log(error);
        callback(error,set);
    });

}
function viewPrimaryKeys(table,callback){
let set=[];
let fields=['id','Name_Text']
base(table).select({
// Selecting the first 3 records in all_team:
view: "all_"+table
}).eachPage(async function page(records, fetchNextPage) {
// This function (`page`) will get called for each page of records.
records.forEach(function(record) {
set.push({"id": record["id"],"name": record["fields"]["Name_Text"]});
});
// To fetch the next page of records, call `fetchNextPage`.
// If there are more records, `page` will get called again.
// If there are no more records, `done` will get called.
fetchNextPage();
}, function done(err) {
if (err) { console.error(err); return; }
console.log("Here");
callback(null,set);
});
// async function to avoid callback hell !!!
}

function getRecord(table,id,callback){
    base(table).find(id, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.get("Description_Text"));
        callback(null,record["fields"]);
    });
}

function filteredRecords(table,filter,callback){
    let set=[];
    base(table).select({
        filterByFormula: filter
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function(record) {
            set.push({"id": record["id"],"record": record["fields"]});
            console.log(set);
        });
    
        fetchNextPage();
    }, function done(error) {
        console.log(error);
        callback(error,set);
    });
}