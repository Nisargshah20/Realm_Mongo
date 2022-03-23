exports = function(changeEvent) {
  console.log(JSON.stringify(changeEvent));
  var fullDocument = changeEvent.fullDocument;
  var collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  var inc = 1;
  console.log(changeEvent.operationType);
  if(changeEvent.operationType == "delete") {
    fullDocument = changeEvent.fullDocumentBeforeChange;
    inc = -1;
  }
  collection.updateOne({ item_id: fullDocument.asin }, { $inc: {"wishlistCount":inc} }, {upsert: true});
};
