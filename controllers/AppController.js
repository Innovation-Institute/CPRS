const airtable= require('../models/airtable');
const es6bindall= require('es6bindall');
const async=require('async');
const createLinks=require('../controllers/helpers/createLinks');
const redis=require('redis')
const redisClient=require('../controllers/connections/RedisConnect');

class AppController{
    /**
     * Constructor for AppController.
     */
    constructor(){
        this.table="";
        es6bindall(this,["index","view","report","createFilter","filterField","setMetadata","clearMetadata","addMetadata","getMetadata","indexMetadata","deleteMetadata","setDataReferencedColumns"]);
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
            let model= new this.model();
            res.render('common/view',{
                id: id,
                record: set,
                tableUrl: this.tableUrl,
                referencedColumns: model.referencedColumnNames,
                inputColumns: model.inputColumnNames,
                metadataColumns: model.metadataColumnNames,
                createLinks: createLinks.createClickableLinks
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
        let referencedColumnNames= new this.model().referencedColumnNames;
        res.render('common/report',{
            referencedColumnNames: referencedColumnNames,
            table: this.table
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
                records: set,
                createLinks: createLinks.createClickableLinks
            });
        });
    }
    /**
     * 
     * @param {request} req 
     * @param {response} res 
     */
    getMetadata(req,res){
        redisClient.smembers(`${this.table}_${req.params.fieldName}`, function(err, reply) {
            console.log(reply); 
            if(err) res.send(err);
            let myOptions=reply.sort();
            myOptions = myOptions.map(function(value) {
                return {
                    text: value,
                    value: value
                };
            });
            res.json(myOptions);
        });
    }
    /**
     * 
     * Sometimes the database wouldn't be using a metadata value,
     * you could use this api to add the data then.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    addMetadata(req,res){
        redisClient.sadd(`${this.table}_${req.body.fieldName}`,req.body.fieldValue, function(err, reply) {
                console.log(reply); 
                if(err) res.send(err);
                res.send("Successful")
            });
    }
    /**
     * Clear existing Metadata in Redis, so as to add new 
     * data. There would be an expiry before I send it to 
     * prod but this would still be run, as a user may also 
     * require the cache to be re-run in case any new 
     * meta-data is added and fail-safe.
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {next} next 
     */

    clearMetadata(req,res,next){
        let model=new this.model();
        let metadataColumnNames=model.metadataColumnNames;
        async.eachOfSeries(metadataColumnNames, (function (field, key, callback) {
            console.log(`The key: ${key} for value: ${field}`); 
            redisClient.del(`${this.table}_${key}`, function(err, reply) {
                    console.log(reply); //prints 2
                    callback();
                });
        }).bind(this), 
            function (err) {
            if (err) console.error(err.message);
            // configs is now a map of JSON data
            next();
        });
    }
    /**
     * Set the MetaData.
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    setMetadata(req,res){
        let model=new this.model();
        let metadataColumnNames=model.metadataColumnNames;
        async.eachOfSeries(metadataColumnNames, (function (field, key, callback) {
            console.log(`The key: ${key} for value: ${field}`); 
            airtable.viewMetadataColumn(this.table,key,(function(err,values){
                if (err) console.error(err.message);
                values.unshift(`${this.table}_${key}`);
                redisClient.sadd(values, function(err, reply) {
                    console.log(reply); //prints 2
                    callback();
                });
            }).bind(this))
        }).bind(this), 
            function (err) {
            if (err) console.error(err.message);
            // configs is now a map of JSON data
            res.send("Complete");
        });
    }
    /**
     * Delete Specific value from a field
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    deleteMetadata(req,res){
        redisClient.srem(`${this.table}_${req.params.fieldName}`,req.params.fieldValue, function(err, reply) {
            console.log(reply); 
            if(err) res.send(err);
            if(reply==1){
                res.send(`Successfully removed ${req.params.fieldValue} from ${req.params.fieldName}`);
            }
            else{
                res.send("Unable to find such a value");
            }
        });
    }
    
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    indexMetadata(req,res){
        let myOptions=[];
        let model=new this.model();
        let metadataColumnNames=model.metadataColumnNames;
        for(var key in metadataColumnNames){
            myOptions.push(key);
        }
        myOptions = myOptions.map(function(value) {
            return {
                text: value,
                value: value
            };
        });
        res.render('metadata',{
            table: this.table,
            columns: myOptions
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
    /**
     * 
     * When an add or edit form is called we will need to
     * pass in the data to the referenced columns so it could 
     * appear as options.
     * 
     * @param {Object} referencedColumnNames 
     * @param {Array} results 
     * 
     */
    setDataReferencedColumns(referencedColumns,results){
        let key;
        for(key in referencedColumns){
            referencedColumns[key].data=results[key];
        }
        return referencedColumns;
    }
    /** 
    getMetadataKeys(){
        let myOptions=[];
        for(var key in this.model.metadataColumnNames){
            myOptions.push(key);
        }
        myOptions = myOptions.map(function(value) {
            return {
                text: value,
                value: value
            };
        });
    }*/
    
}

      
module.exports=AppController;
