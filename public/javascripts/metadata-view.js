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
for(x in metadataColumns){
                console.log(`#${metadataColumns[x]}`);
                let currElem=metadataColumns[x];
                funcs[currElem] = view.bind(this,currElem)
                console.log(currElem);
        }
for(x in metadataColumns){
        funcs[metadataColumns[x]]();
}