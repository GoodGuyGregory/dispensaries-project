## Suggested Changes for this project..

This will assist with digestability


```js

db.strains.find().forEach(function(doc) {
    // check if there are strings and not undefined
    if (doc.Effects && typeof doc.Effects === 'string') {
        doc.Effects = doc.Effects.split(',');
    }
    if (doc.Flavor && typeof doc.Flavor === 'string') {
        doc.Flavor = doc.Flavor.split(',');
    }
    db.strains.updateOne(
        { _id: doc._id },
        { $set: { Effects: doc.Effects, Flavor: doc.Flavor } }
    );
});


```