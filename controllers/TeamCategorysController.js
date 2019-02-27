const airtable = require('../models/airtable');
const team_category = require('../models/team_category');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class TeamCategorysController extends AppController{
    constructor(){
        super();
        this.table="team_category";
        this.tableUrl="team_categorys";
        this.model=team_category;
        es6bindall(this,["index","view","edit","editPost","add","addPost","report","setDataReferencedColumns"]);
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
            
            teams: async.apply(airtable.viewPrimaryKeys,"team"),
            
            },function(err,results){
            let team_category=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(team_category.referencedColumnNames,results);
            res.render('common/edit', {
                id: team_category.id, 
                tableUrl: that.tableUrl,
                record: team_category,
                inputColumns: team_category.inputColumnNames,
                metadataColumns: team_category.metadataColumnNames,
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
        let team_category=new that.model(req.body,id);
        airtable.updateRecord(this.table,team_category.toJson(),id,function(new_record){
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
            
            teams: async.apply(airtable.viewPrimaryKeys,"team"),
            
            },function(err,results){
            let team_category=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(team_category.referencedColumnNames,results);
            res.render('common/add', {
                id: team_category.id, 
                tableUrl: that.tableUrl,
                inputColumns: team_category.inputColumnNames,
                metadataColumns: team_category.metadataColumnNames,
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
        let team_category=new that.model(req.body);
        airtable.createRecord(this.table,team_category.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=TeamCategorysController;