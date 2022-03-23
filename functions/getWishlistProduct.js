// This function is the endpoint's request handler.
exports = function(request,response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
    const {userId} = request.query;
    
    let query = {"user_id":parseInt(userId)}
    // Querying a mongodb service:
    const doc = context.services.get("mongodb-atlas").db("mongoshop").collection("wishlist");

    // Calling a function:
    let results = doc.find(query).toArray();
    // The return value of the function is sent as the response back to the client
    // when the "Respond with Result" setting is set.
    return  results;
};
