const airtable= require('../models/airtable');
const async=require('async');
const es6bindall= require('es6bindall');
const checkInput=require('../controllers/components/checkInput');
const AppController=require('../controllers/AppController');
/** Separated all CRUD operations for Team Table */

class TeamsController extends AppController{
    constructor(){
        super();
        this.table="team";
        this.metadataColumns=["Portfolio_Stage_Select","Portfolio_Sub_Stage_Select","FY_Launch_Select"];
        es6bindall(this,["index","view","filteredReports","edit","editPost","add","addPost","report"]);
    }

    /**
     * 
     * Pipeline Reports
     * 
     */
    filteredReports(req,res){
        let id=req.params.id;
        airtable.getRecord(this.table,id,function(err, set){
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
    edit(req, res){
        let id=req.params.id;
        let department_companies=[];
        let eirs=[];
        let events=[];
        let fundings=[];
        let licensing_managers=[];
        let members=[];
        let team_categories=[];
        let teams=[];
        let technologies=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
        record: async.apply(airtable.getRecord,this.table,id),
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
        metadataColumns: metadataColumns,
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
    editPost(req, res, next){
        let id= req.params.id;
        let updatedRecord={
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
        airtable.updateRecord(this.table,updatedRecord,id,function(new_record){
            next();
        });
    }

    /**
     * 
     * Add Get Request
     * 
     */
    add(req, res){
        console.log(this.metadataColumns);
        let department_companies=[];
        let eirs=[];
        let events=[];
        let fundings=[];
        let licensing_managers=[];
        let members=[];
        let team_categories=[];
        let teams=[];
        let technologies=[];
        let metadataColumns=this.metadataColumns;
        async.parallel({
        department_companies: async.apply(airtable.viewPrimaryKeys,"department_company"),
        eirs: async.apply(airtable.viewPrimaryKeys,"eir"),
        events: async.apply(airtable.viewPrimaryKeys,"event"),
        fundings: async.apply(airtable.viewPrimaryKeys,"funding"),
        licensing_managers: async.apply(airtable.viewPrimaryKeys,"licensing_manager"),
        members: async.apply(airtable.viewPrimaryKeys,"member"),
        team_categories: async.apply(airtable.viewPrimaryKeys,"team_category"),
        teams: async.apply(airtable.viewPrimaryKeys,"team"),
        technologies: async.apply(airtable.viewPrimaryKeys,"technology"),
        metadataColumns: async.constant(metadataColumns)
        },function(err,results){
        res.render('team/add', {
        metadataColumns: metadataColumns,
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
     * Add Post Request
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next
     */
    addPost(req,res,next){
            let id= req.params.id;
            let newRecord={
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
            airtable.createRecord(this.table,newRecord,function(err,new_record){
                /* res.redirect('/teams/edit/'+id); */
                if(err) throw err;
                req.params.id= new_record;
                next();
            });
    } 
}

module.exports=TeamsController;