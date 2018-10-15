const team = require('../Model/team');
const member = require('../Model/member');
const all= require('../Model/all');
const async=require('async');

exports.listField = async function(req,res){
    table= req.params.table;
    all.viewPrimaryKeys(table, function(err, set){
        if(err){
            res.send( {err: err} )
        }
        res.send(set);
    } );
}

exports.filterField = async function(req,res){
    table= req.params.table;
    body=req.body;
    filter=createFilter(body);
    //filter='OR(FIND("1st Gear 2014.01",{Event_Link})>=1,FIND("!!! DO-NOT-DELETE",{Event_Link})>=1)';
    all.filteredRecords(table,filter, function(err, set){
        res.render(table+'/filtered_report',{
            records: set
        })
    });
}


/* Helper functions */

function createFilter(body){
    condition=body["condition"];
    filter=condition+"(";
    for (var key in body) {
        if(key!="condition" && body[key]!="" &&  !(body[key] instanceof Array)){
        filter=filter+'FIND("'+body[key]+'",{'+key+'})>=1,';
        }
        else if(key!="condition" && body[key]!="" &&  (body[key] instanceof Array)){
            arr_val=body[key];

            for (var arr_key in arr_val){
                filter=filter+'FIND("'+body[key][arr_key]+'",{'+key+'})>=1,';
            }
        }
      }
      filter=filter.substring(0, filter.length - 1);
      filter=filter+")";
      return filter;
}