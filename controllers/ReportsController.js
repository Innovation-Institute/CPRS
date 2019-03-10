const airtable= require('../models/airtable');
const async=require('async');
const xl= require('excel4node');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class ReportsController extends AppController{
    constructor(){
        super();
        this.table="reports";
        es6bindall(this,["index","createReport","createFieldFilter","groupBy","setField","addChosenCols","createExcel"]);
    }
    /**
     * Index Page
     */
    index(req, res){
        res.render("report/index",{
            user: req.session.user
        });
    }
    /**
     * Create Report Function
     * 
     * Entry Point for Creating a Report:
     * 
     */
    createReport(req, res){
        let columnName=req.body.columnName;
        let report_name=req.body.report_name;
        let chosenCols=req.body.chosenCols;
        if(typeof chosenCols== "string"){
            let temp=chosenCols;
            chosenCols=[];
            chosenCols.push(temp);
        }
        let filter=`FIND("${report_name}", ${columnName})>=1`;//['one', createFieldFilter("Name_Text","Team_Link", results)],
        airtable.filteredRecords("team", filter, (function(err, set){
        let new_filter=this.createFieldFilter("Name_Text","Team_Link",set);
        let old_set=set;
        //var groupedByTeam=groupBy(set,"Team_Name")
            async.parallel({
                record: async.apply(airtable.filteredRecords,"funding",new_filter),
                },(function(err,results){
                let records=results["record"];
                records= this.groupBy(records,"Team_Name");
                let new_set=this.setField(records);
                let finalSet=this.addChosenCols(new_set,old_set,chosenCols);
                this.createExcel(report_name,res,finalSet,chosenCols);
                }
            ).bind(this)); 
        }).bind(this));
    }

    /**
     * Index page of Reports
     * 
     */

    airtable(req,res){
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
     * set -> consists of airtable queries consisting with Name_Text and Record_ID
     * 
     * 
     * @param {String} oldField 
     * @param {String} newField 
     * @param {JSON} set 
     * 
     * @return {String}
     * 
     */
    createFieldFilter(oldField,newField,set){
        let filter="OR(";
        let param;
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
    groupBy(xs, key){
            let new_val= xs.reduce(function(rv, x) {
            (rv[x["record"][key]] = rv[x["record"][key]] || []).push(x);
            return rv;
            }, {});
            return new_val;
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
    setField(set){
        let newSet={}; // Final JSON to be sent on Front End
            for(var key in set)
            {
                let subset=set[key];
                newSet[key]={};
                for(var subkey in subset)
                {
                    let fundingName=subset[subkey]["record"]["Name_Text"];
                    let amountReceived=subset[subkey]["record"]["Amount_Received_Text"];
                    let budgetRequestDate=subset[subkey]["record"]["Budget_Request_Date_Text"];
                    let calendarYear=subset[subkey]["record"]["Calendar_Year_Select"];
                    let eventName=subset[subkey]["record"]["Event_Name"];
                    newSet[key][fundingName+" "+eventName]={};
                    newSet[key][fundingName+" "+eventName]["amountReceived"]=amountReceived;
                    newSet[key][fundingName+" "+eventName]["budgetRequestDate"]=budgetRequestDate;
                    newSet[key][fundingName+" "+eventName]["calendarYear"]=calendarYear;
                    newSet[key][fundingName+" "+eventName]["eventName"]=eventName;
                }
            }
        return newSet;
    }
    /**
     * 
     * Add chosen Columns from old_set(Team Table) to the new_set 
     * (which is a JSON funding report in the current and only instance.). 
     * 
     * @param {String} report_name 
     * @param {JSON} new_set 
     * @param {JSON} old_set 
     * @param {Array} chosenCols 
     */
    addChosenCols(new_set,old_set,chosenCols){
        let currNewSet="";
        let currOldSet="";
        for(currNewSet in new_set){
            new_set[currNewSet]["chosenCols"]={}
            for(currOldSet in old_set){
                if(currNewSet==old_set[currOldSet]["record"]["Name_Text"]){
                    let x;
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
    createExcel(report_name,res,data,chosenCols){
        // Create a new instance of a Workbook class
        let wb = new xl.Workbook();
        
        // Add Worksheets to the workbook
        let ws = wb.addWorksheet(report_name+' Team-Funding');
        let header_style = wb.createStyle({
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

        let bold_style = wb.createStyle({
            font: {
            color: '#000000',
            size: 15,
            bold: true
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
        }); 

        // Create a reusable style
        let style = wb.createStyle({
            font: {
            color: '#000000',
            size: 12,
            },
        });

        let dollar_style = wb.createStyle({
            font: {
                color: '#000000',
                size: 12,
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -',
            });
        let preCols=["id","Team"];
        let postCols=["Funding Source","Amount($)","Total","Event","Cal Year","Budget Requested/Award Date","Post CF $"];
        let airtableCols=preCols;
        if((chosenCols!=null) & (chosenCols!="")){
            airtableCols=preCols.concat(chosenCols);
        }
        airtableCols=airtableCols.concat(postCols);
        let col=1;
        let x,amountCol,chosen;
        for(x in airtableCols){
            ws.cell(1, col)
            .string(airtableCols[x])
            .style(header_style);
            col++;
            /**Get the array index of Amount($) */
            if(airtableCols[x]=="Amount($)"){
                amountCol=Number(x);
            }
        }
        amountCol=amountCol+1 // add one as the workbook starts with 1.
        let AmountIndex=String.fromCharCode(64+amountCol);
        let row=2; // assign each to each variable in array
        let teamID=0;
        for(x in data){
            col=1;
            teamID=teamID+1;
            //console.log(row);
            ws.cell(row, col)
            .number(teamID)
            .style(style);
            col++;
            ws.cell(row, col)
            .string(x)
            .style(bold_style);
            let currentTeam=data[x];
            let firstRow=row;
            for(chosen in chosenCols){
                col++;
                if(chosen!=null){
                    if(data[x]["chosenCols"][chosenCols[chosen]]!=null){
                    ws.cell(row,col)
                    .string(data[x]["chosenCols"][chosenCols[chosen]])
                    .style(style);
                    }   else   {
                    ws.cell(row,col)
                    .string("")
                    .style(style);
                    }
                }
            }
            let columnStart=col+1;
            let funding;
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
            let lastRow=row;
            let sumFormula='SUM('+AmountIndex+firstRow+':'+AmountIndex+(lastRow-1)+')';
            //console.log(sumFormula);
            // Add the Sum to the WorkSheet.
            ws.cell(row,amountCol+1) // Show total one ahead of amount( Magic Numbers?! Change it.)
                .formula(sumFormula)
                .style(bold_style);
                col++;
            row=row+2;
        }
        for(let i=1;i<airtableCols.length;i++){
            ws.column(i).setWidth(30);
        }
    let stringCols= (chosenCols==null)? "" : " Columns: "+chosenCols.toString();
    report_name= (report_name=="")? "All Funding Sources": report_name;
    console.log(report_name+stringCols+'.xlsx');
    wb.write(report_name+stringCols+'.xlsx', res);
    }
}

module.exports=ReportsController;