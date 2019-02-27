const airtable = require('../models/airtable');
const department_company = require('../models/department_company');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class DepartmentCompanysController extends AppController{
    constructor(){
        super();
        this.table="department_company";
        this.tableUrl="department_companys";
        this.model=department_company;
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
            
            members: async.apply(airtable.viewPrimaryKeys,"member"),
            
            },function(err,results){
            let department_company=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(department_company.referencedColumnNames,results);
            res.render('common/edit', {
                id: department_company.id, 
                tableUrl: that.tableUrl,
                record: department_company,
                inputColumns: department_company.inputColumnNames,
                metadataColumns: department_company.metadataColumnNames,
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
        let department_company=new this.model(req.body,id);
        airtable.updateRecord(this.table,department_company.toJson(),id,function(new_record){
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
            
            members: async.apply(airtable.viewPrimaryKeys,"member"),
            
            },function(err,results){
            let department_company=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(department_company.referencedColumnNames,results);
            res.render('common/add', {
                id: department_company.id, 
                tableUrl: that.tableUrl,
                inputColumns: department_company.inputColumnNames,
                metadataColumns: department_company.metadataColumnNames,
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
        let department_company=new this.model(req.body);
        airtable.createRecord(this.table,department_company.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=DepartmentCompanysController;