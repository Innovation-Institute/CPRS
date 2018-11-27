const airtable= require('../config');
const base= airtable.base;

module.exports={
viewPrimaryKeys: viewPrimaryKeys,
getRecord: getRecord,
createRecord: createRecord,
filteredRecords: filteredRecords,
viewAll: viewAll,
getFundingAmount: getFundingAmount
}

/**
 * Create a new record.
 * 
 * @param {String} table 
 * @param {JSON} record 
 * @param {callback} callback 
 */
function createRecord(table,record,callback){
    base(table).create(record, function(err, record) {
        if (err) { console.error(err);  }
        record=record.getId();
        callback(err,record);
    });
}

/**
 * View All records of table
 * 
 * @param {String} table 
 * @param {callback} callback 
 */
function viewAll(table,callback){
    let set=[];
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
/**
 * View Primary Keys of the table.
 * 
 * @param {String} table 
 * @param {callback} callback 
 */
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
/**
 * Get Specfic Record.
 * 
 * @param {String} table 
 * @param {String} id 
 * @param {callback} callback 
 */
function getRecord(table,id,callback){
    base(table).find(id, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.get("Description_Text"));
        callback(null,record["fields"]);
    });
}
/**
 * 
 * Filter records of table
 * 
 * @param {String} table 
 * @param {String} filter 
 * @param {callback} callback 
 */
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

/**
 * Get specific Funding Amount, not used for now.
 * 
 * @param {callback} callback 
 */
function getFundingAmount(callback){
    table="team";
    let set=[];
    base(table).select({
        // Selecting the first 3 records in all_team:
        view: "all_"+table,
        filterByFormula: 'FIND("Phil Brooks",{Eir_Link})>=1' // Will replace it with EIR 
        //from login once I begin making login.
        }).eachPage(async function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
        set.push({"parameter": record["fields"]["Name_Text"],"value": record["fields"]["Total_Funding"]});
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

}