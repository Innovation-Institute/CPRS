const airtable = require('../models/airtable');
const checkInput=require('../controllers/components/checkInput');
const async=require('async');
/**
 * Index Page, display airtable records
 * 
 */
exports.index = async function(req,res){
    table="member";
    airtable.viewAll(table,function(err, set){
        if(err) throw err;
        res.render('member/index',{
            records: set
        });
    });
}
/**
 * 
 * View Page, display specific record.
 * 
 */
exports.view = async function(req,res){
    table="member";
    id=req.params.id;
    airtable.getRecord(table,id,function(err, set){
        res.render('member/view',{
            record: set,
            id: id
        });
    });
}

/**
 * Edit Get Request
 * 
 */

exports.edit = async function(req, res){
    // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
    id=req.params.id;
    table="member";
    teams=[];
    departmentCompanies=[];
    async.parallel({
        record: async.apply(airtable.getRecord,table,id),
        departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
        teams: async.apply(airtable.viewPrimaryKeys,"team")
        },function(err,results){
        res.render('member/edit', {
        id: id, 
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

 exports.editPost= async function(req, res){
    id=req.params.id;
    table="member";
    updatedRecord={
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
    airtable.updateRecord(table,updatedRecord,id,function(new_record){
        /* res.redirect('/members/edit/'+id); */
        exports.view(req,res);
    });
 }

 exports.add = async function(req, res){
    // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
    id=req.params.id;
    table="member";
    teams=[];
    departmentCompanies=[];
    async.parallel({
        departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
        teams: async.apply(airtable.viewPrimaryKeys,"team")
        },function(err,results){
        console.log("Here");
        res.render('member/add', {
        departmentCompanies: results["departmentCompanies"],
        teams: results["teams"]
        });
    });
}

 exports.addPost = async function(req,res){
    id=req.params.id;
    table="member";
    newRecord={
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
    airtable.createRecord(table,newRecord,function(err,new_record){
        /* res.redirect('/teams/edit/'+id); */
        if(err) throw err;
        req.params.id= new_record;
        exports.view(req,res);
    });
 }