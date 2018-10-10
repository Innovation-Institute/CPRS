const team = require('../Model/team');
const member = require('../Model/member');
const all= require('../Model/all');
const async=require('async');

exports.listField = async function(req,res){
    table= req.params.table;
    all.viewPrimaryKeys(table, function(err, set){
        if(err){
            res.send( {err: err} )
        }
        res.send(set);
    } );
}