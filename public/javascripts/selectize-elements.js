function expandSelect(val,id){
    curr_id='#'+id;
console.log(curr_id);
$.post( "/list/"+val, function( data ) {
  console.log(data);
  var $select = $(curr_id).selectize({
    maxItems: null,
    valueField: 'name',
    labelField: 'name',
    searchField: 'name',
    options: data,
    create: false
});
});
}

function expandMetadataSelect(val,id){
    curr_id='#'+id;
console.log(curr_id);
$.get( "/"+val+"s/meta/view/"+id, function( data ) {
  console.log(data);
  var $select = $(curr_id).selectize({
    maxItems: null,
    valueField: 'value',
    labelField: 'value',
    searchField: 'text', // both text and value have the same value
    options: data,
    create: false
});
});

}

/*var options = [];
$.each(data.platforms, function()
{
    options.push({
        id: this.id,
        title: this.name,
        url: "hhtp://site.com/"+this.slug
    });
});*/