var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keysLpufWnj63PasK'
});
var base = Airtable.base('apptesMGdnPGkPzGE');
module.exports= {
    base : base
}
