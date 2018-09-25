var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keym5eCUcyBiIupFJ'
});
var base = Airtable.base('apptesMGdnPGkPzGE');
module.exports= {
    base : base
}