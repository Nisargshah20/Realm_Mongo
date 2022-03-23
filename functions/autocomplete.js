exports = function(request, response){
  var collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  let textStr = request.query.textStr
  let pipeline = [{
      $search: {
          index: 'autocomplete',
          autocomplete: {
              query: textStr,
              path: 'name'
          }
      }
  }, {
      $project: {
          name: 1
      }
  }, {
      $limit: 10
  }]
  const respBody  = collection.aggregate(pipeline)
  return respBody
};