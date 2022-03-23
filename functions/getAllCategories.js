exports = function(request, response){
  var collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  let pipeline = [{
    $group: {
        _id: 'uniqueCategories',
        uniqueCategory: {
            $addToSet: '$category'
        }
    }
  }]
  const respBody  = collection.aggregate(pipeline)
  return respBody
};