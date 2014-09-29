/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */

var dataStorage = {results: []};

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = [200,201,404];


  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  // response.writeHead(statusCode, headers);

  //Create some dummy data to test Get Request
  // var dummyMessage = {username: "James", text: "test message", roomname: "lobby"};
  // var results = [dummyMessage];

  if (request.method === "GET" && request.url === "/classes/messages") {
    response.writeHead(statusCode[0], headers);
    response.write(JSON.stringify(dataStorage));
    console.log("Data sent GET response: " + JSON.stringify(dataStorage));
  }
  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  if (request.method === "POST" && request.url === "/classes/messages") {
    response.writeHead(statusCode[1], headers);
    request.on('data', function(data){
      dataStorage.results.push(JSON.parse(data));
      console.log("after post, the data object holds: " + dataStorage.results);
    })
  }
    // response.write(JSON.stringify(data));
    //
  if (request.url !== "/classes/messages") {
    response.writeHead(statusCode[2], headers);
  }

  response.end();
};

/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;
