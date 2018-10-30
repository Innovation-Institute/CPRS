const team = require('../Model/team');
const member = require('../Model/member');
const all= require('../Model/all');
const async=require('async');
/* index page
*  give funding amount as input graph. 
*
*/
exports.index =async function(req,res){
    all.getFundingAmount(function(err,set){
    res.render('index',{
        records: set
    });
    });
}

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
        res.render(table+'/index',{
            records: set
        });
    });
}

exports.reportRecords = async function(req, res){
    async.auto({
        one: async.apply(all.filteredRecords, filter), 
        // If two does not depend on one, then you can remove the 'one' string
        //   from the array and they will run asynchronously (good for "parallel" IO tasks)
        two: ['one', createFieldFilter("Name_Text","Team_Link", one)],
        // Final depends on both 'one' and 'two' being completed and their results
        final: ['one', 'two',function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        res.render("report/chancellor",{
            records: results
        });
        }]
    });
    /*report_name= req.params.report_name;
    filter='FIND("Chancellor Funds", {Funding_Link})>=1';
    all.filteredRecords("team",filter,function(err,set){
        new_filter=createFieldFilter("Name_Text","Team_Link",set);
        all.filteredRecords("funding",new_filter,function(err,set){
            var groubedByTeam=groupBy(set,"Team_Link")
            console.log(groubedByTeam);
            res.render("report/chancellor",{
                records: groubedByTeam
            });
        });
    });*/
}

/* Helper functions */

function createFilter(body){
    condition=body["condition"];
    filter=condition+"(";
    for (var key in body) {
        if(key!="condition" && body[key]!="" &&  !(body[key] instanceof Array)){
        filter=filter+'AND(FIND("'+body[key]+'",{'+key+'})>=1,FIND({'+key+'},"'+body[key]+'")>=1),';
        }
        else if(key!="condition" && body[key]!="" &&  (body[key] instanceof Array)){
            arr_val=body[key];

            for (var arr_key in arr_val){
                filter=filter+'AND(FIND("'+body[key][arr_key]+'",{'+key+'})>=1),';
            }
        }
      }
      filter=filter.substring(0, filter.length - 1);
      filter=filter+")";
      console.log(filter);
      return filter;
}

function createFieldFilter(oldField,newField,set){
    let filter="OR(";
    for(var key in set){
        param=set[key]["record"][oldField];
        filter+=newField+'="'+param+'",';
    }
    filter=filter.substring(0, filter.length - 1);
    filter=filter+")";
    console.log(filter);
    return filter;
}

var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x["record"][key]] = rv[x["record"][key]] || []).push(x);
          return rv;
        }, {});
      };
      