const airtable = require('../models/airtable');
const <%= model %> = require('../models/<%= table %>');
const async=require('async');
const es6bindall= require('es6bindall');
const AppController=require('../controllers/AppController');

class <%= model %>sController extends AppController{
    constructor(){
        super();
        this.table="<%= table %>";
        this.tableUrl="<%= tableUrl %>";
        this.model=<%= model %>;
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
            <% for(index in referencedColumnNames){ %>
            <%= referencedColumnNames[index][0] %>: async.apply(airtable.viewPrimaryKeys,"<%= referencedColumnNames[index][3] %>"),
            <% } %>
            },function(err,results){
            let <%= table %>=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(<%= table %>.referencedColumnNames,results);
            res.render('common/edit', {
                id: <%= table %>.id, 
                tableUrl: that.tableUrl,
                record: <%= table %>,
                inputColumns: <%= table %>.inputColumnNames,
                metadataColumns: <%= table %>.metadataColumnNames,
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
        let <%= table %>=new this.model(req.body,id);
        airtable.updateRecord(this.table,<%= table %>.toJson(),id,function(new_record){
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
            <% for(index in referencedColumnNames){ %>
            <%= referencedColumnNames[index][0] %>: async.apply(airtable.viewPrimaryKeys,"<%= referencedColumnNames[index][3] %>"),
            <% } %>
            },function(err,results){
            let <%= table %>=new that.model(results["record"],id);
            let referencedColumns=that.setDataReferencedColumns(<%= table %>.referencedColumnNames,results);
            res.render('common/add', {
                id: <%= table %>.id, 
                tableUrl: that.tableUrl,
                inputColumns: <%= table %>.inputColumnNames,
                metadataColumns: <%= table %>.metadataColumnNames,
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
        let <%= table %>=new this.model(req.body);
        airtable.createRecord(this.table,<%= table %>.toJson(),function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            req.params.id= new_record;
            next();
        });
    }
}

module.exports=<%= model %>sController;