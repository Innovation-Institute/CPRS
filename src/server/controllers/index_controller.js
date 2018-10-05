const team = require('../models/team');
const member = require('../models/member');
const all= require('../models/all');
const async=require('async');


exports.edit = async function(req, res){
    id=req.params.id;
    department_companies=[];
    eirs=[];
    events=[];
    fundings=[];
    licensing_managers=[];
    members=[];
    team_categories=[];
    teams=[];
    technologies=[];
    async.parallel({
    record: async.apply(all.getRecord,"team",id),
    department_companies: async.apply(all.viewPrimaryKeys,"department_company"),
    eirs: async.apply(all.viewPrimaryKeys,"eir"),
    events: async.apply(all.viewPrimaryKeys,"event"),
    fundings: async.apply(all.viewPrimaryKeys,"funding"),
    licensing_managers: async.apply(all.viewPrimaryKeys,"licensing_manager"),
    members: async.apply(all.viewPrimaryKeys,"member"),
    team_categories: async.apply(all.viewPrimaryKeys,"team_category"),
    teams: async.apply(all.viewPrimaryKeys,"team"),
    technologies: async.apply(all.viewPrimaryKeys,"technology")
    },function(err,results){
    console.log("Here");
    res.render('index', {
    id: id, 
    record: results["record"],
    department_companies: results["department_companies"],
    eirs: results["eirs"],
    events: results["events"],
    fundings: results["fundings"],
    licensing_managers: results["licensing_managers"],
    members: results["members"],
    team_categories: results["team_categories"],
    teams: results["teams"],
    technologies: results["technologies"]
    });
    }
    );
    }

    exports.edit_post = async function(req, res){
        id= req.params.id;
        updated_record={
        "Name_Text": checkText(req.body["Name_Text"]),
        "Description_Text": checkText(req.body["Description_Text"]),
        "Former_Names_Text": checkText(req.body["Former_Names_Text"]),
        "Portfolio_Stage_Select": checkSelect(req.body["Portfolio_Stage_Select"]),
        "Portfolio_Sub_Stage_Select": checkSelect(req.body["Portfolio_Sub_Stage_Select"]),
        "Case_Number_Text": checkText(req.body["Case_Number_Text"]),
        "Technology_Description_Helper": checkText(req.body["Technology_Description_Helper"]),
        "Notes_Text": checkText(req.body["Notes_Text"]),
        "Team_Webpage_External": checkText(req.body["Team_Webpage_External"]),
        "Milestones_Text": checkText(req.body["Milestones_Text"]),
        "Supporting_Docs_External": checkText(req.body["Supporting_Docs_External"]),
        "FY_Launch_Select": checkSelect(req.body["FY_Launch_Select"]),
        "Eir_Link": checkLink(req.body["Eir_Link"]),
        "Licensing_Manager_Link": checkLink(req.body["Licensing_Manager_Link"]),
        "Event_Link": checkLink(req.body["Event_Link"]),
        "Funding_Link": checkLink(req.body["Funding_Link"]),
        "Member_Link": checkLink(req.body["Member_Link"]),
        "Technology_Link": checkLink(req.body["Technology_Link"]),
        "Team_Category_Link": checkLink(req.body["Team_Category_Link"]),
        "1st_Place_Event_Helper": checkLink(req.body["1st_Place_Event_Helper"]),
        "2nd_Place_Event_Helper": checkLink(req.body["2nd_Place_Event_Helper"]),
        "3rd_Place_Event_Helper": checkLink(req.body["3rd_Place_Event_Helper"])
        }
        //console.log(new_record["Name_Text"]);
        team.updateRecord(updated_record,id,function(new_record){
            res.redirect('/edit/'+id);
        });
        
    }

    function checkText(val){
        if(val == null){
            val='';
            return val;
        }
        return val;
    }
    function checkSelect(val){
        if(val === ''){
            val=null;
            return val;
        }
        return val;
    }

    function checkLink(val){
        if (val instanceof Array) {
            return val;
        } else if(typeof val == 'string' || val instanceof String) {
          val= [ val ];
          return val;
        } else {
            val = [];
            return val;
        }
    }