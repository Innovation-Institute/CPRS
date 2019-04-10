const airtable = require('../models/airtable');
const Team = require('../models/team');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');
const createLinks=require('../controllers/helpers/createLinks');

class TeamsController extends AppController{
    constructor(){
        super();
        this.table="team";
        this.tableUrl="teams";
        this.model=Team;
        es6bindall(this,["index","pipelineReport","memberReport","view","edit","editPost","add","addPost","report","setDataReferencedColumns"]);
    }

    pipelineReport(req,res){
        let table= this.table;
        let filter='Portfolio_Stage_Select="Pipeline"';
        airtable.filteredRecords(table,filter, function(err, set){
            res.render(table+'/pipeline',{
                records: set,
                createLinks: createLinks.createClickableLinks
            });
        });
    }

    memberReport(req,res){
        airtable.viewAll(this.table,(function(err, set){
            if(err) throw err;
            res.render(this.table+'/memberFields',{
                records: set,
                createLinks: createLinks.createClickableLinks
            });
        }).bind(this));
    }
    
    /**
     * Loads the key-value pairs, the record and renders the edit page.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    edit(req, res){
        let id=req.params.id;
        let that=this;
        async.parallel({
            record: async.apply(airtable.getRecord,this.table,id),
            
            eirs: async.apply(airtable.viewPrimaryKeys,"eir"),
            
            licensingManagers: async.apply(airtable.viewPrimaryKeys,"licensing_manager"),
            
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            
            fundings: async.apply(airtable.viewPrimaryKeys,"funding"),
            
            members: async.apply(airtable.viewPrimaryKeys,"member"),
            
            teamCategories: async.apply(airtable.viewPrimaryKeys,"team_category"),
            
            },function(err,results){
            let team=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(team.referencedColumnNames,results);
            res.render('team/edit', {
                id: team.id, 
                tableUrl: that.tableUrl,
                record: team,
                inputColumns: team.inputColumnNames,
                metadataColumns: team.metadataColumnNames,
                referencedColumns: referencedColumns
            });
        });
    }
    /**
     * Edits an existing airtable record.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next
     * 
     */
    editPost(req, res, next){
        let id=req.params.id;
        let team=new this.model(req.body,id);
        airtable.updateRecord(this.table,team.toJson(),id,function(new_record){
            /* res.redirect('/members/edit/'+id); */
            next();
        });
    }

    /**
     * Loads the key-value pairs and renders the add page.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     */
    add(req, res){
        // "","Last_Name_Text","First_Name_Text","Role_Select","Role_Within_Univ_Select","Phone_Text","Email_Text","Gender_Select","Non_White_Select","Disability_Select","Veteran_Select","Non_National_Select","Last_Served","Underrepresented_Member","Comments_Text","Personal_Website_External","Year_First_Participated_Select","4th_Gear_Role_Select","Team_Name","Department_Company_Name","Event_Name"
        let id=req.params.id;
        let that=this;
        async.parallel({
            
            eirs: async.apply(airtable.viewPrimaryKeys,"eir"),
            
            licensingManagers: async.apply(airtable.viewPrimaryKeys,"licensing_manager"),
            
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            
            fundings: async.apply(airtable.viewPrimaryKeys,"funding"),
            
            members: async.apply(airtable.viewPrimaryKeys,"member"),
            
            teamCategories: async.apply(airtable.viewPrimaryKeys,"team_category"),
            
            },function(err,results){
            let team=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(team.referencedColumnNames,results);
            res.render('team/add', {
                id: team.id, 
                tableUrl: that.tableUrl,
                inputColumns: team.inputColumnNames,
                metadataColumns: team.metadataColumnNames,
                referencedColumns: referencedColumns
            });
        });
    }

    /**
     * Creates a new airtable record.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next
     * 
     */
    addPost(req,res,next){
        let id=req.params.id;
        let team=new this.model(req.body);
        airtable.createRecord(this.table,team.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=TeamsController;