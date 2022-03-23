exports = function(request, response){
  var textStr = ""
  var categories = []
  var marketplaces = []
  if(typeof request.body !== 'undefined'){
    bodyStr = EJSON.parse(request.body.text())
    textStr = bodyStr.textStr
    categories = bodyStr.categories
    marketplaces = bodyStr.marketplaces
  } else {
    textStr = request.query.textStr
  }
  console.log(textStr)
  console.log(request)
  var collection = context.services.get("mongodb-atlas").db("mongoshop").collection("products");
  let pipeline = ''
  if(typeof categories !== 'undefined' && categories.length > 0 && typeof marketplaces !== 'undefined' && marketplaces.length > 0){
    pipeline = [{
      $search: {
          index: 'productSearch',
          compound: {
              filter: [{
                      text: {
                          query: categories,
                          path: 'category'
                      }
                  },
                  {
                      text: {
                          query: marketplaces,
                          path: 'marketplace'
                      }
                  }
              ],
              must: {
                  text: {
                      query: textStr,
                      path: 'name',
                      fuzzy: {
                          prefixLength: 2
                      }
                  }
              },
              score : {
                "function": {
                  "multiply": [
                      {
                          "score": "relevance"
                      },
                      {
                          "path": {
                              "value": "sponsored",
                              "undefined": 1
                          }
                      }
                  ]
                }
              }
          }
      }
  },{
    $project: {
        name: 1,
        item_id: 1,
        main_description: 1,
        price: 1,
        marketplace: 1,
        category: 1,
        sponsored: 1,
        country: 1,
        main_image_url: 1,
        wishlistCount: 1
    }
  },
  { $limit : 12 }]
  } else {
    pipeline = [{
      $search: {
          index: 'productSearch',
          compound: {
              must: {
                  text: {
                      query: textStr,
                      path: 'name',
                      fuzzy: {
                          prefixLength: 2
                      }
                  }
              },
              score : {
                "function": {
                  "multiply": [
                      {
                          "score": "relevance"
                      },
                      {
                          "path": {
                              "value": "sponsored",
                              "undefined": 1
                          }
                      }
                  ]
                }
              }
          }
      }
  },{
    $project: {
        name: 1,
        item_id: 1,
        main_description: 1,
        price: 1,
        marketplace: 1,
        category: 1,
        sponsored: 1,
        country: 1,
        main_image_url: 1,
        wishlistCount: 1
    }
  }, { $limit : 12 }]
  }
  const respBody  = collection.aggregate(pipeline)
  return respBody
};