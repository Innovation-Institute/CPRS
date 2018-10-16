const airtable= require('../../../config');
const base= airtable.base;

module.exports={
    updateRecord: updateRecord,
    filterRecord: filterRecord
}

function updateRecord(updated_record,id,callback){
base('team').update(id, updated_record, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.get('Name_Text'));
      callback(record);
  });

}

function filterRecord(value,table){
    base('team').select({
        filterByFormula: 'FIND("3D Printed Laser", Name_Text)'
    }).eachPage(function page(records, fetchNextPage) {
        
        fetchNextPage
    }, function done(error) {
        console.log()
    });
}