const team = require('../models/team');
const member = require('../models/member');
const all= require('../models/all');
const async=require('async');

/**
 * Renders the index page.
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.index = async function(req,res){
    all.getFundingAmount(function(err,set){
    res.render('index',{
        records: set
    });
    });
}
/**
 * Will list 
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.listField = async function(req,res){
    table= req.params.table;
    all.viewPrimaryKeys(table, function(err, set){
        if(err){
            res.send( {err: err} )
        }
        res.send(set);
    } );
}


/**
 * Testing Box
 */

exports.boxTest = async function(req,res){
    res.render('test');
}
/**
 * Filter record based on condition
 * 
 *  */ 
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


/* Helper functions */
/**
 * 
 * @param {JSON} body 
 * @returns {String}
 */
function createFilter(body){
    condition=body["condition"];
    filter=condition+"(";
    for (var key in body) {
        if(key!="condition" && body[key]!="" &&  !(body[key] instanceof Array)){
        filter=filter+'SEARCH("'+body[key]+'",{'+key+'})>=1,';
        //filter=filter+'AND(FIND("'+body[key]+'",{'+key+'})>=1,FIND({'+key+'},"'+body[key]+'")>=1),';
        }
        else if(key!="condition" && body[key]!="" &&  (body[key] instanceof Array)){
            arr_val=body[key];
            filter=filter+condition+"(";
            for (var arr_key in arr_val){
                filter=filter+'SEARCH("'+body[key][arr_key]+'",{'+key+'})>=1,';
            }
            filter=filter.substring(0, filter.length - 1);
            filter=filter+"),";
        }
      }
      filter=filter.substring(0, filter.length - 1);
      filter=filter+")";
      console.log(filter);
      return filter;
}
/**
 * 
 * @param {String} oldField 
 * @param {String} newField 
 * @param {JSON} set 
 * 
 * @param {String}
 * 
 */
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
/**
 * 
 * @param {JSON} xs JSON object 
 * @param {string} key key to which groupby should happen
 * 
 * @returns {JSON}
 */
var groupBy = function(xs, key) {
        new_val= xs.reduce(function(rv, x) {
          (rv[x["record"][key]] = rv[x["record"][key]] || []).push(x);
          return rv;
        }, {});
        return this.new_val;
      };
/**
 * 
 * @param {JSON} set 
 * @param {String} report_name
 * 
 * @returns {JSON} 
 */
function setField(set, report_name){
    newSet={}; // Final JSON to be sent on Front End
    for(var key in set){
        teamName=key;
        subset=set[key];
        newSet[key]={};
        for(var subkey in subset){
            fundingName=subset[subkey]["record"]["Name_Text"];
            amountReceived=subset[subkey]["record"]["Amount_Received_Text"];
            budgetRequestDate=subset[subkey]["record"]["Budget_Request_Date_Text"];
            calendarYear=subset[subkey]["record"]["Calendar_Year_Select"];
            eventName=subset[subkey]["record"]["Event_Name"];
            newSet[key][fundingName]={};
            newSet[key][fundingName]["amountReceived"]=amountReceived;
            newSet[key][fundingName]["budgetRequestDate"]=budgetRequestDate;
            newSet[key][fundingName]["calendarYear"]=calendarYear;
            newSet[key][fundingName]["eventName"]=eventName;
        }
    }
    return this.newSet;
}
      