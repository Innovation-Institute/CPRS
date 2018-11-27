const team = require('../models/team');
const member = require('../models/member');
const all= require('../models/all');
const async=require('async');
const xl= require('excel4node');

exports.index = async function(req, res){
    res.render("report/index");
}

exports.createReport = async function(req, res){
    report_name=req.body.report_name;
    chosenCols=req.body.chosenCols;
    if(typeof chosenCols== "string"){
        chosenCols=[];
        chosenCols.push(chosenCols);
    }
    filter='FIND("'+report_name+'", {Funding_Link})>=1';//['one', createFieldFilter("Name_Text","Team_Link", results)],
    all.filteredRecords("team", filter, function(err, set){
    new_filter=createFieldFilter("Name_Text","Team_Link",set);
    old_set=set;
    //var groupedByTeam=groupBy(set,"Team_Name")
        async.parallel({
            record: async.apply(all.filteredRecords,"funding",new_filter),
            },function(err,results){
            records=results["record"];
            records= groupBy(records,"Team_Name");
            new_set=setField(records,"Chancellor");
            finalSet=addChosenCols(new_set,old_set,chosenCols);
            createExcel(res,finalSet,chosenCols);
            }
        ); 
    });
}

/**
 * Index page of Reports
 * 
 */

exports.All = async function(req,res){
    res.render("report/index");
}


/**
 * 
 * I receive the parameters from the previous table 
 * and make it into a query for the new table by mentioning the 
 * Field name in the new Table, so I could query the new Table for 
 * the IDs obtained from the previous table.
 * 
 * Example:
 * 
 * We have a query from Team table- Name_Text -> oldField Name_Text
 * Funding Table- Team_Link - > newField
 * set -> consists of all queries consisting with Name_Text and Record_ID
 * 
 * 
 * @param {String} oldField 
 * @param {String} newField 
 * @param {JSON} set 
 * 
 * @return {String}
 * 
 */
function createFieldFilter(oldField,newField,set){
    let filter="OR(";
    for(var key in set){
        param=set[key]["record"][oldField];
        filter+='FIND("'+param+'",{'+newField+'}),';
    }
    filter=filter.substring(0, filter.length - 1);
    filter=filter+")";
    //console.log(filter);
    return filter;
}
/**
 * 
 * Take a JSON object and group the records of the 
 * JSON object by a certain key, provided by the user.
 * 
 * Example:
 * We have a JSON object with each Funding Team 
 * and we are grouping them by the Team Names itself.
 * 
 * @param {JSON} xs JSON object 
 * @param {string} key key to which groupby should happen
 * 
 * @returns {JSON}
 */
var groupBy = 
function(xs, key) {
        new_val= xs.reduce(function(rv, x) {
          (rv[x["record"][key]] = rv[x["record"][key]] || []).push(x);
          return rv;
        }, {});
        return this.new_val;
      };
/**
 * 
 * We have a JSON object and based on the static 
 * report name we will generate a new JSON which 
 * will be passed to the function.
 * 
 * @param {JSON} set 
 * @param {String} report_name
 * 
 * @returns {JSON} 
 */
function setField(set, report_name){
    newSet={}; // Final JSON to be sent on Front End
        for(var key in set)
        {
            teamName=key;
            subset=set[key];
            newSet[key]={};
            for(var subkey in subset)
            {
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
/**
 * 
 * Add chosen Columns from old_set(Team Table) to the new_set 
 * (which is a JSON funding report in the current and only instance.). 
 * 
 * @param {JSON} new_set 
 * @param {JSON} old_set 
 * @param {Array} chosenCols 
 */
function addChosenCols(new_set,old_set,chosenCols){
    for(currNewSet in new_set){
        new_set[currNewSet]["chosenCols"]={}
        for(currOldSet in old_set){
            if(currNewSet==old_set[currOldSet]["record"]["Name_Text"]){
                for(x in chosenCols){
                    //console.log(chosenCols[x])
                    new_set[currNewSet]["chosenCols"][chosenCols[x]]=old_set[currOldSet]["record"][chosenCols[x]];
                }
                break;
            }
        }
    }
    return new_set;
}
/**
 * 
 * Need to change this to make this per report basis
 * 
 * @param {Object} res 
 * @param {JSON} data 
 */
function createExcel(res,data,chosenCols){
    // Create a new instance of a Workbook class
var wb = new xl.Workbook();
 
// Add Worksheets to the workbook
var ws = wb.addWorksheet('Chancellor Funds Team-Funding');
var header_style = wb.createStyle({
    fill: {
        type: 'pattern',
        patternType: 'solid',
        bgColor: '#eedd82',
        fgColor: '#eedd82',
      },
    font: {
      color: '#b8860b',
      size: 15,
      bold: true,
      underline: true,
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  }); 

  var bold_style = wb.createStyle({
    font: {
      color: '#000000',
      size: 15,
      bold: true
    },
    numberFormat: '$#,##0.00; ($#,##0.00); -',
  }); 

// Create a reusable style
var style = wb.createStyle({
    font: {
      color: '#000000',
      size: 12,
    },
  });

var dollar_style = wb.createStyle({
  font: {
    color: '#000000',
    size: 12,
  },
  numberFormat: '$#,##0.00; ($#,##0.00); -',
});
preCols=["id","Team"];
chosenCols=chosenCols;
postCols=["Funding Source","Amount($)","Total","Event","Cal Year","Budget Requested/Award Date","Post CF $"];
if((chosenCols!=null) & (chosenCols!="")){
    allCols=preCols.concat(chosenCols);
}
else{
    allCols=preCols;
}
allCols=allCols.concat(postCols);
col=1;
for(x in allCols){
    ws.cell(1, col)
    .string(allCols[x])
    .style(header_style);
    col++;
    /**Get the array index of Amount($) */
    if(allCols[x]=="Amount($)"){
        amountCol=Number(x);
    }
}
amountCol=amountCol+1 // add one as the workbook starts with 1.
AmountIndex=String.fromCharCode(64+amountCol);
row=2; // assign each to each variable in array
teamID=0;

for(x in data){
    col=1;
    teamID=teamID+1;
    //console.log(row);
    ws.cell(row, col)
    .number(teamID)
    .style(style);
    col++;
    currentTeam=data[x];
    ws.cell(row, col)
    .string(x)
    .style(bold_style);
    currentTeam=data[x];
    firstRow=row;
    for(chosen in chosenCols){
        col++;
        if(chosen!=null){
        if(data[x]["chosenCols"][chosenCols[chosen]]!=null){
        ws.cell(row,col)
        .string(data[x]["chosenCols"][chosenCols[chosen]])
        .style(style);
        }else{
        ws.cell(row,col)
        .string("")
        .style(style);
        }
        }
    }
    columnStart=col+1;
    for(funding in currentTeam){
        col=columnStart;
        if(funding!="chosenCols"){
        ws.cell(row, col)
        .string(funding)
        .style(style);
        col++;
        if(typeof currentTeam[funding]["amountReceived"] === "undefined" || currentTeam[funding]["amountReceived"] === null){
            currentTeam[funding]["amountReceived"]=0;
        }
        //console.log(currentTeam[funding]["amountReceived"]);
        ws.cell(row,col)
        .number(currentTeam[funding]["amountReceived"]+0)
        .style(dollar_style);
        col++;
        ws.cell(row,col)
        .string('')
        .style(style);
        col++;
        ws.cell(row,col)
        .string(currentTeam[funding]["eventName"])
        .style(style);
        col++;
        ws.cell(row,col)
        .string(currentTeam[funding]["calendarYear"])
        .style(style);
        col++;
        ws.cell(row,col)
        .string(currentTeam[funding]["budgetRequestDate"])
        .style(style);
        col++;
        row++;
    }
    }
    lastRow=row;
    sumFormula='SUM('+AmountIndex+firstRow+':'+AmountIndex+(lastRow-1)+')';
    //console.log(sumFormula);
    ws.cell(row,amountCol+1) // Show total one ahead of amount
        .formula(sumFormula)
        .style(bold_style);
        col++;
    row=row+2;
}
for(i=1;i<allCols.length;i++){
    ws.column(i).setWidth(30);
}
  wb.write('ExcelFile.xlsx', res);
}