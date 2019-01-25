const airtable= require('../models/airtable');
const es6bindall= require('es6bindall');
const async=require('async');
const createLinks=require('../controllers/helpers/createLinks')

class AppController{
    /**
     * Constructor for AppController.
     */
    constructor(){
        this.table="";
        es6bindall(this,["index","view","report","createFilter","filterField"]);
    }
    /**
     * Renders the index page.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * Index Page
     */
    index(req,res){
        airtable.viewAll(this.table,(function(err, set){
            if(err) throw err;
            res.render(this.table+'/index',{
                records: set,
                createLinks: createLinks.createClickableLinks
            });
        }).bind(this));
    }
    /**
     * 
     * Read Specific Row from team database
     * 
     */
    view(req,res){
        let id=req.params.id;
        airtable.getRecord(this.table,id,(function(err, set){
            res.render(this.table+'/view',{
                record: set,
                id: id
            });
        }).bind(this));
    }
    /**
     * Report Get Request
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    report(req,res){
        res.render(this.table+'/report',{
            table:this.table
        });
    }
    /**
     * Renders the dashboard
     * 
     * @param {*} req 
     * @param {*} res 
     */
    dashboard(req,res){
        // Search for name in EIR column for linked record and then do a search on it.
        let searchCondition='FIND("'+req.session.user["Username_Text"]+'",{User_Link})>=1';
        async.parallel({
            record: async.apply(airtable.filteredRecords, "eir", searchCondition)  
        },
        function(err,results){
            let eir=results.record[0].record
            console.log(eir);
            airtable.getFundingAmount(eir.Name_Text,function(err,set){
                res.render('index',{
                    records: set
                });
            });
        });
    }
    /**
     * Will list 
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    listField(req,res){
        let table= req.params.table;
        airtable.viewPrimaryKeys(table, function(err, set){
            if(err){
                res.send( {err: err} )
            }
            res.send(set);
        } );
    }
    /**
     * Filter record based on condition
     * 
     *  */ 
    filterField(req,res){
        let table= req.params.table;
        let body=req.body;
        let filter=this.createFilter(body);
        //filter='OR(FIND("1st Gear 2014.01",{Event_Link})>=1,FIND("!!! DO-NOT-DELETE",{Event_Link})>=1)';
        airtable.filteredRecords(table,filter, function(err, set){
            res.render(table+'/index',{
                records: set
            });
        });
    }


    /* Helper functions */
    /**
     * 
     * @param {JSON} body 
     * @returns {String}
     */
    createFilter(body){
        let condition=body["condition"];
        let filter=condition+"(";
        let arr_val="";
        for (var key in body) {
            if(key!="condition" && body[key]!="" &&  !(body[key] instanceof Array)){
            filter=filter+'SEARCH("'+body[key]+'",{'+key+'})>=1,';
            //filter=filter+'AND(FIND("'+body[key]+'",{'+key+'})>=1,FIND({'+key+'},"'+body[key]+'")>=1),';
            }
            else if(key!="condition" && body[key]!="" &&  (body[key] instanceof Array)){
                arr_val=body[key];
                filter=filter+condition+"(";
                for (var arr_key in arr_val){
                    filter=filter+'SEARCH("'+body[key][arr_key]+'",{'+key+'})>=1,';
                }
                filter=filter.substring(0, filter.length - 1);
                filter=filter+"),";
            }
        }
        filter=filter.substring(0, filter.length - 1);
        filter=filter+")";
        console.log(filter);
        return filter;
    }
    /**
     * 
     * @param {String} oldField 
     * @param {String} newField 
     * @param {JSON} set 
     * 
     * @param {String}
     * 
     */
    createFieldFilter(oldField,newField,set){
        let filter="OR(";
        let param="";
        for(var key in set){
            param=set[key]["record"][oldField];
            filter+=newField+'="'+param+'",';
        }
        filter=filter.substring(0, filter.length - 1);
        filter=filter+")";
        console.log(filter);
        return filter;
    }
}
      
module.exports=AppController;
