var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'API_KEY'
});
var base = Airtable.base('AIRTABLE_BASE');
module.exports= {
    base : base
}
