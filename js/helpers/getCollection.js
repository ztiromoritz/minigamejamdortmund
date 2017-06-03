//Gives a collection with the given name for a certain locale.
// Usage:
//    {{#each (getCollection 'entries')}}
//    {{#each (getCollection 'entries' locale='de')}}  //override the current locale
module.exports = function (name, options){

    const loc = options.hash['locale'] || this.locale || 'de';
    const key = name+'_'+loc;
    console.log('getCollection', /*collections*/ options.hash['locale'], this.locale, key);
    return this.collections[key];
}
