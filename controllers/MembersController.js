const airtable = require('../models/airtable');
const Member = require('../models/member');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class MembersController extends AppController{
    constructor(){
        super();
        this.table="member";
        this.tableUrl="members";
        this.model=Member;
        es6bindall(this,["index","view","edit","editPost","add","addPost","report","setDataReferencedColumns"]);
    }
    /**
     * Report Get Request
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    report(req,res){
        let model= new this.model();
        res.render('member/report',{
            referencedColumnNames: model.referencedColumnNames,
            metadataColumnNames: model.metadataColumnNames,
            table: this.table
        });
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
            
            departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
            
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            
            },function(err,results){
            let member=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(member.referencedColumnNames,results);
            res.render('common/edit', {
                id: member.id, 
                tableUrl: that.tableUrl,
                record: member,
                inputColumns: member.inputColumnNames,
                metadataColumns: member.metadataColumnNames,
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
        let member=new this.model(req.body,id);
        airtable.updateRecord(this.table,member.toJson(),id,function(new_record){
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
            
            departmentCompanies: async.apply(airtable.viewPrimaryKeys,"department_company"),
            
            events: async.apply(airtable.viewPrimaryKeys,"event"),
            
            },function(err,results){
            let member=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(member.referencedColumnNames,results);
            res.render('common/add', {
                id: member.id, 
                tableUrl: that.tableUrl,
                inputColumns: member.inputColumnNames,
                metadataColumns: member.metadataColumnNames,
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
        let member=new this.model(req.body);
        airtable.createRecord(this.table,member.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=MembersController;