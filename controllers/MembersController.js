const airtable = require('../models/airtable');
const checkInput=require('../controllers/components/checkInput');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class MembersController extends AppController{
    constructor(){
        super();
        this.table="member";
        this.metadataColumns=["Role_Select","Role_Within_Univ_Select","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Year_First_Participated_Select","4th_Gear_Role_Select"]
        es6bindall(this,["index","view","edit","editPost","add","addPost","report"]);
    }
    /**
     * Edit Get Request
     * 
     */

    edit(req, res){
        // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
        let id=req.params.id;
        let teams=[];
        let departmentCompanies=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
            record: async.apply(airtable.getRecord,this.table,id),
            departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
            teams: async.apply(airtable.viewPrimaryKeys,"team")
            },function(err,results){
            res.render('member/edit', {
            id: id, 
            metadataColumns: metadataColumns,
            table: "members",
            record: results["record"],
            departmentCompanies: results["departmentCompanies"],
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
        let updatedRecord={
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Last_Name_Text": checkInput.checkText(req.body["Last_Name_Text"]),
            "First_Name_Text": checkInput.checkText(req.body["First_Name_Text"]),
            "Role_Select": checkInput.checkSelect(req.body["Role_Select"]),
            "Role_Within_Univ_Select": checkInput.checkSelect(req.body["Role_Within_Univ_Select"]),
            "Role_Within_Univ_Select": checkInput.checkSelect(req.body["Role_Within_Univ_Select"]),
            "Phone_Text": checkInput.checkText(req.body["Phone_Text"]),
            "Email_Text": checkInput.checkText(req.body["Email_Text"]),
            "Gender_Select": checkInput.checkSelect(req.body["Gender_Select"]),
            "Non_White_Select": checkInput.checkSelect(req.body["Non_White_Select"]),
            "Disability_Select": checkInput.checkSelect(req.body["Disability_Select"]),
            "Veteran_Select": checkInput.checkSelect(req.body["Veteran_Select"]),
            "Non_National_Select": checkInput.checkSelect(req.body["Non_National_Select"]),
            "Last_Served": checkInput.checkText(req.body["Last_Served"]),
            "Comments_Text": checkInput.checkText(req.body["Comments_Text"]),
            "Personal_Website_External": checkInput.checkText(req.body["Personal_Website_External"]),
            "Year_First_Participated_Select": checkInput.checkSelect(req.body["Year_First_Participated_Select"]),
            "4th_Gear_Role_Select":  checkInput.checkSelect(req.body["4th_Gear_Role_Select"]),
            "Team_Link": checkInput.checkLink(req.body["Team_Link"]),
            "Department_Company_Link": checkInput.checkLink(req.body["Department_Company_Link"])
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
        let departmentCompanies=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
            departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
            teams: async.apply(airtable.viewPrimaryKeys,"team")
            },function(err,results){
            res.render('member/add', {
            metadataColumns: metadataColumns,
            table: "members",
            departmentCompanies: results["departmentCompanies"],
            teams: results["teams"]
            });
        });
    }

    addPost(req,res,next){
        let id=req.params.id;
        let newRecord={
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Last_Name_Text": checkInput.checkText(req.body["Last_Name_Text"]),
            "First_Name_Text": checkInput.checkText(req.body["First_Name_Text"]),
            "Role_Select": checkInput.checkSelect(req.body["Role_Select"]),
            "Role_Within_Univ_Select": checkInput.checkSelect(req.body["Role_Within_Univ_Select"]),
            "Role_Within_Univ_Select": checkInput.checkSelect(req.body["Role_Within_Univ_Select"]),
            "Phone_Text": checkInput.checkText(req.body["Phone_Text"]),
            "Email_Text": checkInput.checkText(req.body["Email_Text"]),
            "Gender_Select": checkInput.checkSelect(req.body["Gender_Select"]),
            "Non_White_Select": checkInput.checkSelect(req.body["Non_White_Select"]),
            "Disability_Select": checkInput.checkSelect(req.body["Disability_Select"]),
            "Veteran_Select": checkInput.checkSelect(req.body["Veteran_Select"]),
            "Non_National_Select": checkInput.checkSelect(req.body["Non_National_Select"]),
            "Last_Served": checkInput.checkText(req.body["Last_Served"]),
            "Comments_Text": checkInput.checkText(req.body["Comments_Text"]),
            "Personal_Website_External": checkInput.checkText(req.body["Personal_Website_External"]),
            "Year_First_Participated_Select": checkInput.checkSelect(req.body["Year_First_Participated_Select"]),
            "4th_Gear_Role_Select":  checkInput.checkSelect(req.body["4th_Gear_Role_Select"]),
            "Team_Link": checkInput.checkLink(req.body["Team_Link"]),
            "Department_Company_Link": checkInput.checkLink(req.body["Department_Company_Link"])
        };
        airtable.createRecord(this.table,newRecord,function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}
module.exports=MembersController;