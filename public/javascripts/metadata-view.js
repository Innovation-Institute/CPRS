var funcs = [];
function teamView(currElem){
        console.log(currElem)
        $.get( `/teams/meta/view/${currElem}`, function( data ) {
                console.log(data)
                $(`#${currElem}`).selectize({
                options: data
                });
        });
        }
for(x in metadataColumns){
                console.log(`#${metadataColumns[x]}`);
                let currElem=metadataColumns[x];
                funcs[currElem] = teamView.bind(this,currElem)
                console.log(currElem);
        }
for(x in metadataColumns){
        funcs[metadataColumns[x]]();
}