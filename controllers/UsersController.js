const airtable = require('../models/airtable');
const User = require('../models/ii_user');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class UsersController extends AppController{
    constructor(){
        super();
        this.table="ii_user";
        this.tableUrl="ii_users";
        this.model=User;
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
            
            eir: async.apply(airtable.viewPrimaryKeys,"eir"),
            
            },function(err,results){
            let ii_user=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(ii_user.referencedColumnNames,results);
            res.render('common/edit', {
                id: ii_user.id, 
                tableUrl: that.tableUrl,
                record: ii_user,
                inputColumns: ii_user.inputColumnNames,
                metadataColumns: ii_user.metadataColumnNames,
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
        let ii_user=new this.model(req.body,id);
        airtable.updateRecord(this.table,ii_user.toJson(),id,function(new_record){
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
            
            eir: async.apply(airtable.viewPrimaryKeys,"eir"),
            
            },function(err,results){
            let ii_user=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(ii_user.referencedColumnNames,results);
            res.render('common/add', {
                id: ii_user.id, 
                tableUrl: that.tableUrl,
                inputColumns: ii_user.inputColumnNames,
                metadataColumns: ii_user.metadataColumnNames,
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
        let ii_user=new this.model(req.body);
        airtable.createRecord(this.table,ii_user.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=UsersController;