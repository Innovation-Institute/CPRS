module.exports={
    setColumnNames: setColumnNames,
    setMetadata: setMetadata,
    setReferencedColumnNames: setReferencedColumnNames
}

/**
 * 
 * @param {ConcatArray} contents 
 */

function setColumnNames(contents){
    object={};
    for(x in contents){
        content=contents[x];
        object[content[0]]={
            "displayName": content[1],
            "type": content[2]
        }
    }
    return object;
}

/**
 * 
 * @param {ConcatArray} contents 
 * Example: {
  "Role_Select":
    {
      "displayName": "Role"
    }
  ,
  "Role_Within_Univ_Select":{
    "displayName": "Role within university"
  }
}
 */
function setMetadata(contents){
    object={};
    for(x in contents){
        content=contents[x];
        object[content[0]]={
            "displayName": content[1]
        }
    }
    return object;
}

/**
 * 
 * @param {ConcatArray} contents 
 * 
 * Example: Object: {
                "teams":{
                    "displayName": "Teams",
                    "columnName": "Team_Link",
                    "data": [{"id":"1313424242442","record":"hey"},{"id":"1313424242442","record":"hey"}]

                },
                "departmentCompanies":{
                    "displayName": "Department Company",
                    "columnName": "Department_Company_Link",
                    "table": "department_company",
                    "columnValueName": "Department_Company_Name",
                    "data": [{"id":"1313424242442","record":"hey"},{"id":"1313424242442","record":"hey"}]
                }
}
 */
function setReferencedColumnNames(contents){
    object={};
    for(x in contents){
        content=contents[x];
        object[content[0]]={
            "displayName": content[1],
            "columnName": content[2],
            "table": content[3],
            "columnValueName": content[4],
            "data": []
        }
    }
    return object;
}