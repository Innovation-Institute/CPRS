const airtable= require('../models/airtable');
const async=require('async');
const checkInput=require('../controllers/components/checkInput');
/** Separated all CRUD operations for Team Table */

/**
 * 
 */
exports.index = async function(req,res){
    table="team";
    airtable.viewAll(table,function(err, set){
        if(err) throw err;
        res.render('team/index',{
            records: set
        });
    });
}
/**
 * 
 * Read Specific Row from team database
 * 
 */
exports.view = async function(req,res){
    table="team";
    id=req.params.id;
    airtable.getRecord(table,id,function(err, set){
        res.render('team/view',{
            record: set,
            id: id
        });
    });
}

/**
 * 
 * Pipeline Reports
 * 
 */
exports.filteredReports = async function(req,res){
    table="team";
    id=req.params.id;
    airtable.getRecord(table,id,function(err, set){
        res.render('team/view',{
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
    id=req.params.id;
    table="team";
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
    record: async.apply(airtable.getRecord,table,id),
    department_companies: async.apply(airtable.viewPrimaryKeys,"department_company"),
    eirs: async.apply(airtable.viewPrimaryKeys,"eir"),
    events: async.apply(airtable.viewPrimaryKeys,"event"),
    fundings: async.apply(airtable.viewPrimaryKeys,"funding"),
    licensing_managers: async.apply(airtable.viewPrimaryKeys,"licensing_manager"),
    members: async.apply(airtable.viewPrimaryKeys,"member"),
    team_categories: async.apply(airtable.viewPrimaryKeys,"team_category"),
    teams: async.apply(airtable.viewPrimaryKeys,"team"),
    technologies: async.apply(airtable.viewPrimaryKeys,"technology")
    },function(err,results){
    res.render('team/edit', {
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

    /**
     * Edit Post Request
     * 
     */
    exports.editPost = async function(req, res){
        id= req.params.id;
        table="team";
        updatedRecord={
        "Name_Text": checkInput.checkText(req.body["Name_Text"]),
        "Description_Text": checkInput.checkText(req.body["Description_Text"]),
        "Former_Names_Text": checkInput.checkText(req.body["Former_Names_Text"]),
        "Portfolio_Stage_Select": checkInput.checkSelect(req.body["Portfolio_Stage_Select"]),
        "Portfolio_Sub_Stage_Select": checkInput.checkSelect(req.body["Portfolio_Sub_Stage_Select"]),
        "Case_Number_Text": checkInput.checkText(req.body["Case_Number_Text"]),
        "Technology_Description_Helper": checkInput.checkText(req.body["Technology_Description_Helper"]),
        "Notes_Text": checkInput.checkText(req.body["Notes_Text"]),
        "Team_Webpage_External": checkInput.checkText(req.body["Team_Webpage_External"]),
        "Milestones_Text": checkInput.checkText(req.body["Milestones_Text"]),
        "Supporting_Docs_External": checkInput.checkText(req.body["Supporting_Docs_External"]),
        "FY_Launch_Select": checkInput.checkSelect(req.body["FY_Launch_Select"]),
        "Eir_Link": checkInput.checkLink(req.body["Eir_Link"]),
        "Licensing_Manager_Link": checkInput.checkLink(req.body["Licensing_Manager_Link"]),
        "Event_Link": checkInput.checkLink(req.body["Event_Link"]),
        "Funding_Link": checkInput.checkLink(req.body["Funding_Link"]),
        "Member_Link": checkInput.checkLink(req.body["Member_Link"]),
        "Technology_Link": checkInput.checkLink(req.body["Technology_Link"]),
        "Team_Category_Link": checkInput.checkLink(req.body["Team_Category_Link"]),
        "1st_Place_Event_Helper": checkInput.checkLink(req.body["1st_Place_Event_Helper"]),
        "2nd_Place_Event_Helper": checkInput.checkLink(req.body["2nd_Place_Event_Helper"]),
        "3rd_Place_Event_Helper": checkInput.checkLink(req.body["3rd_Place_Event_Helper"])
        }
        airtable.updateRecord(table,updatedRecord,id,function(new_record){
            /* res.redirect('/teams/edit/'+id); */
            exports.view(req,res);
        });
    }

    /**
     * 
     * Add Get Request
     * 
     */
    exports.add = async function(req, res){
        table="team";
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
        department_companies: async.apply(airtable.viewPrimaryKeys,"department_company"),
        eirs: async.apply(airtable.viewPrimaryKeys,"eir"),
        events: async.apply(airtable.viewPrimaryKeys,"event"),
        fundings: async.apply(airtable.viewPrimaryKeys,"funding"),
        licensing_managers: async.apply(airtable.viewPrimaryKeys,"licensing_manager"),
        members: async.apply(airtable.viewPrimaryKeys,"member"),
        team_categories: async.apply(airtable.viewPrimaryKeys,"team_category"),
        teams: async.apply(airtable.viewPrimaryKeys,"team"),
        technologies: async.apply(airtable.viewPrimaryKeys,"technology")
        },function(err,results){
        res.render('team/add', {
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
        });
    }

    /**
     * 
     * Add Post Request
     */
    exports.addPost = async function(req,res){
            id= req.params.id;
            newRecord={
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Description_Text": checkInput.checkText(req.body["Description_Text"]),
            "Former_Names_Text": checkInput.checkText(req.body["Former_Names_Text"]),
            "Portfolio_Stage_Select": checkInput.checkSelect(req.body["Portfolio_Stage_Select"]),
            "Portfolio_Sub_Stage_Select": checkInput.checkSelect(req.body["Portfolio_Sub_Stage_Select"]),
            "Case_Number_Text": checkInput.checkText(req.body["Case_Number_Text"]),
            "Technology_Description_Helper": checkInput.checkText(req.body["Technology_Description_Helper"]),
            "Notes_Text": checkInput.checkText(req.body["Notes_Text"]),
            "Team_Webpage_External": checkInput.checkText(req.body["Team_Webpage_External"]),
            "Milestones_Text": checkInput.checkText(req.body["Milestones_Text"]),
            "Supporting_Docs_External": checkInput.checkText(req.body["Supporting_Docs_External"]),
            "FY_Launch_Select": checkInput.checkSelect(req.body["FY_Launch_Select"]),
            "Eir_Link": checkInput.checkLink(req.body["Eir_Link"]),
            "Licensing_Manager_Link": checkInput.checkLink(req.body["Licensing_Manager_Link"]),
            "Event_Link": checkInput.checkLink(req.body["Event_Link"]),
            "Funding_Link": checkInput.checkLink(req.body["Funding_Link"]),
            "Member_Link": checkInput.checkLink(req.body["Member_Link"]),
            "Technology_Link": checkInput.checkLink(req.body["Technology_Link"]),
            "Team_Category_Link": checkInput.checkLink(req.body["Team_Category_Link"]),
            "1st_Place_Event_Helper": checkInput.checkLink(req.body["1st_Place_Event_Helper"]),
            "2nd_Place_Event_Helper": checkInput.checkLink(req.body["2nd_Place_Event_Helper"]),
            "3rd_Place_Event_Helper": checkInput.checkLink(req.body["3rd_Place_Event_Helper"])
            }
            airtable.createRecord("team",newRecord,function(err,new_record){
                /* res.redirect('/teams/edit/'+id); */
                if(err) throw err;
                req.params.id= new_record;
                exports.view(req,res);
            });
    } 
    /**
     * 
     * Report Get Request (Shows parameters of report)
     * 
     */
    exports.report = async function(req,res){
        table="team";
        res.render('team/report',{
            table:table
        });
    }
    /**
     * 
     * Report Post Request (Runs the report)
     */
    exports.reportPost = async function(req,res){
        table="team";
        res.render('team/report',{
            table: table
        });
    }
