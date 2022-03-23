exports = function(arg){
  var collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  collection.updateMany({}, {$set: {'wishlistCount': 0}});
};