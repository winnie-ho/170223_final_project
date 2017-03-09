var dbHandler = function(){

}

dbHandler.prototype = {
	callDB: function(urlSpec, word, callback){

	var url = "http://localhost:5000/" + urlSpec;
  var request = new XMLHttpRequest();
  request.open(word, url);
  request.setRequestHeader("content-type", "application/json");
  request.withCredentials = true;
    request.onload = function(){
     	if(request.status === 200){
        var data = JSON.parse(request.responseText);
        console.log("data DB HANDLER", data);
        console.log("HELLO FROM INSIDE THE DB HANDLER")
        callback(data);
      } else {
        console.log("Uh oh you're not logged in!")
        browserHistory.goBack();
      }
    }
    request.send(null);
	}
}
;
module.exports = dbHandler;