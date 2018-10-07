const airtable= require('../../../config');
const base= airtable.base;

module.exports={
    updateRecord: updateRecord
}


function updateRecord(updated_record,id,callback){
base('team').update(id, updated_record, function(err, record) {
      if (err) { console.error(err); return; }
      console.log(record.get('Name_Text'));
      callback(record);
  });

}
