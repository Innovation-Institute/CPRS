const airtable = require('../models/airtable');
const checkInput=require('../controllers/components/checkInput');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class FundingsController extends AppController{
    constructor(){
        super();
        this.table="funding";
        this.metadataColumns= ["Funding_Class_Select","Calendar_Year_Select","FY_Select","Grant_Type_Select"];
        es6bindall(this,["index","view","edit","editPost","add","addPost","report","setMetadata","clearMetadata"]);
    }
    /**
     * Edit Get Request
     * 
     */

    edit(req, res){
        // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
        let id=req.params.id;
        let teams=[];
        let events=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
            record: async.apply(airtable.getRecord,this.table,id),
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            teams: async.apply(airtable.viewPrimaryKeys,"team")
            },function(err,results){
            res.render('funding/edit', {
            id: id, 
            table: "fundings",
            metadataColumns: metadataColumns,
            record: results["record"],
            events: results["events"],
            teams: results["teams"]
            });
        });
    }
    /**
     * 
     * Edit Post Request
     */

    editPost(req, res, next){
        let id=req.params.id;
        // Name_Text,Funding_Class_Select,Amount_Received_Text,Calendar_Year_Select,FY_Select,Budget_Request_Date_Text,Budget_Approval_Date_Text,Issue_Award_Letter_Date_Text,Recieved_Signed_Award_Letter_Date_Text,
        // Award_Begin_Date_Text,Award_End_Date,Grant_Type_Select,Grant_Information_Text,Grant_Number_Text,Internal_Award_Number_Text, Team_Link, Event_Link
        let updatedRecord={
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Funding_Class_Select": checkInput.checkSelect(req.body["Funding_Class_Select"]),
            "Amount_Received_Text": checkInput.checkNumber(req.body["Amount_Received_Text"]),
            "Calendar_Year_Select": checkInput.checkSelect(req.body["Calendar_Year_Select"]),
            "FY_Select": checkInput.checkSelect(req.body["FY_Select"]),
            "Budget_Request_Date_Text": checkInput.checkSelect(req.body["Budget_Request_Date_Text"]),
            "Budget_Approval_Date_Text": checkInput.checkSelect(req.body["Budget_Approval_Date_Text"]),
            "Issue_Award_Letter_Date_Text": checkInput.checkSelect(req.body["Issue_Award_Letter_Date_Text"]),
            "Received_Signed_Award_Letter_Date_Text": checkInput.checkSelect(req.body["Received_Signed_Award_Letter_Date_Text"]),
            "Award_Begin_Date_Text": checkInput.checkSelect(req.body["Award_Begin_Date_Text"]),
            "Award_End_Date": checkInput.checkSelect(req.body["Award_End_Date"]),
            "Grant_Type_Select": checkInput.checkSelect(req.body["Grant_Type_Select"]),
            "Grant_Information_Text": checkInput.checkText(req.body["Grant_Information_Text"]),
            "Grant_Number_Text": checkInput.checkNumber(req.body["Grant_Number_Text"]),
            "Internal_Award_Number_Text": checkInput.checkText(req.body["Internal_Award_Number_Text"]),
            "Team_Link": checkInput.checkLink(req.body["Team_Link"]),
            "Event_Link":  checkInput.checkLink(req.body["Event_Link"])
        };
        airtable.updateRecord(this.table,updatedRecord,id,function(new_record){
            /* res.redirect('/members/edit/'+id); */
            next();
        });
    }

    add(req, res){
        // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
        let id=req.params.id;
        let teams=[];
        let events=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            teams: async.apply(airtable.viewPrimaryKeys,"team")
            },function(err,results){
            res.render('funding/add', {
            table: "fundings",
            metadataColumns: metadataColumns,
            events: results["events"],
            teams: results["teams"]
            });
        });
    }

    addPost(req,res,next){
        let id=req.params.id;
        let newRecord={
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Funding_Class_Select": checkInput.checkSelect(req.body["Funding_Class_Select"]),
            "Amount_Received_Text": checkInput.checkNumber(req.body["Amount_Received_Text"]),
            "Calendar_Year_Select": checkInput.checkSelect(req.body["Calendar_Year_Select"]),
            "FY_Select": checkInput.checkSelect(req.body["FY_Select"]),
            "Budget_Request_Date_Text": checkInput.checkSelect(req.body["Budget_Request_Date_Text"]),
            "Budget_Approval_Date_Text": checkInput.checkSelect(req.body["Budget_Approval_Date_Text"]),
            "Issue_Award_Letter_Date_Text": checkInput.checkSelect(req.body["Issue_Award_Letter_Date_Text"]),
            "Received_Signed_Award_Letter_Date_Text": checkInput.checkSelect(req.body["Received_Signed_Award_Letter_Date_Text"]),
            "Award_Begin_Date_Text": checkInput.checkSelect(req.body["Award_Begin_Date_Text"]),
            "Award_End_Date": checkInput.checkSelect(req.body["Award_End_Date"]),
            "Grant_Type_Select": checkInput.checkSelect(req.body["Grant_Type_Select"]),
            "Grant_Information_Text": checkInput.checkText(req.body["Grant_Information_Text"]),
            "Grant_Number_Text": checkInput.checkNumber(req.body["Grant_Number_Text"]),
            "Internal_Award_Number_Text": checkInput.checkText(req.body["Internal_Award_Number_Text"]),
            "Team_Link": checkInput.checkLink(req.body["Team_Link"]),
            "Event_Link":  checkInput.checkLink(req.body["Event_Link"])
        };
        //let dateFields=["Budget_Request_Date_Text","Budget_Approval_Date_Text","Issue_Award_Letter_Date_Text","Recieved_Signed_Award_Letter_Date_Text","Award_Begin_Date_Text","Award_End_Date"];
        //newRecord=checkInput.checkDates(newRecord,dateFields);
        airtable.createRecord(this.table,newRecord,function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }

}

module.exports=FundingsController;