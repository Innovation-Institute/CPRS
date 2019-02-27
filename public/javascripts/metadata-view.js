var funcs = [];
function view(currElem){
        console.log(currElem)
        $.get( `/${table}/meta/view/${currElem}`, function( data ) {
                console.log(data)
                $(`#${currElem}`).selectize({
                options: data
                });
        });
}
for(key in metadataColumns){
                console.log(`#${JSON.stringify(metadataColumns)}`);
                let currElem=key;
                funcs[currElem] = view.bind(this,currElem)
                console.log(currElem);
        }
for(key in metadataColumns){
        funcs[key]();
}