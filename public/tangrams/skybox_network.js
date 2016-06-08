/*! networking definitions for skybox interfacing 2014-6-16
* This includes websockets and POST functions
*
* @author ndepalma
* skybox_network.js
* Licensed MIT */

//////////////////////////////////////////
// Global Host
//////////////////////////////////////////

// which server to point to - localhost for debugging
var default_port = 8080;
var global_name = document.domain + ":" + default_port;
var global_host = global_name+"/"; // for testing
//var global_host = "nimbus.media.mit.edu/servlets/obj-collect-1.0-SNAPSHOT-standalone/"; // for deployment
var ws_connection;

var room_num;
var has_ui;
var UID;

function initNetworkOS(OS) {
    var f_response = function( data ) {
        room_num = data["room-num"];
        has_ui = data["UI-available"];
        UID = data["UID"];
        //can_move = data["can-move"];
        connectWSLive(UID, room_num);
    };
    if(OS)
        $.get("http://" +global_host+"askforroom", {O: true}, f_response, "json");
    else
        $.get("http://" +global_host+"askforroom", {S: true}, f_response, "json");
}

//function initNetwork() {
//    connectWSLive();
//}
function sendUpdates() {
    //if updates and connection open
    if (ws_connection.readyState < WebSocket.CLOSING) {
	//var x = (Math.random()*5);
	//var y = (Math.random()*5);
	//var r = (Math.random()*10);
	//var move = [1];
	//move = move.concat("m");
	//move = move.concat(x);
	//move = move.concat(y);
	//var rot = [2 \r r];
	//var tosend = [move];
	if (updates.length > 0) {
	    var stringed = JSON.stringify(updates);
	    console.log("Outing: " + stringed);
	    ws_connection.send(stringed);
	    updates = [];
	}
    }
}

//connect websocket and hold the connection to match state
function connectWSLive(_uid, _room_num) {
    try {
        console.log("Opening websocket");
        ws_connection = new WebSocket('ws://'+ global_host + 'attachroom?UID='+_uid+'&room-num='+_room_num);

        ws_connection.onopen = function(){
            /*Send a small message to the console once the connection is established */
            console.log('Connection open!');
        }
	ws_connection.onclose = function(){
	   console.log('Connection closed');
	}
	ws_connection.onerror = function(error){
	   console.log('Error detected: ' + error.message);
	}
	ws_connection.onmessage = function(e){
	    var server_message = e.data;
	    //console.log("msg: " + server_message);
            //jsob = jQuery.parseJSON( server_message );

            jsob =eval("(" +  server_message + ")");
            //console.log("JSOB: " + JSON.stringify(jsob));
            if(jsob == null) {
                console.log("Returning null for some reason?");
                return;
            }

            if("answer" in jsob) {
                console.log("Found an answer");
                // is an answer
                if(typeof(can_see_answer) != "undefined" && can_see_answer) {
                    if("image" in jsob) {
                        console.log("Got Image!");
                        set_image(jsob.image);
                    } else {
                        theanswer = JSON.parse(jsob.answer);
                        var j = 0;
                        for(j = 0;j < theanswer.length;j++) {
                            var toselect = theanswer[j];
                            var num = parseInt(toselect);
                            select_shape(num);
                        }
                        set_image("");
                    }
                }
            } else if("frame" in jsob) {
                console.log("Got frame");
                read_frame(jsob.frame);
                startTimer();
            } else if("ask" in jsob) {
                console.log("Ask request: " + jsob.ask);
                if(typeof(can_ask) != "undefined" && can_ask && jsob.ask == 1) {
                    console.log("I should ask!");
                    ask_for_foreground(true);
                }
            } else if("rdebug" in jsob) {
                rdebug = jsob.rdebug;
                console.log("Debug: " + rdebug.x);
                rx = rdebug.x * $(document).width() - 150 + "px";
                ry = (1.0-rdebug.y) * $(document).height() - 150 + "px";
                if(typeof($("#rspotlight")) != "undefined") {
                    $("#rspotlight").css("left", rx)
                    $("#rspotlight").css("top", ry)
                }
            } else {
                //console.log("ELSE");
	        read_all(jsob);
            }
	}
	var id = setInterval(sendUpdates, 1000);
    }
    catch(err) {
        console.log(" websocket fail!");
    }
}



//////////////////////////////////////////
// Turn internal representation into usable JSON
//////////////////////////////////////////
function SHAPEStoJSON(shapes) {
    //just use a list comprehension
    return shapes.map(
    	// map all the shapes into JSON compatible rep
	function(element) {
	    //turn element into JSON
	    return {
		shape: element.shp,
		color: element.clr,
                dx: element.transform().toString().split("T").map(function (ele) {return ele.split("r")[0]}).map(function(ele) {return ele.split(",")[0]}).slice(1).map(parseFloat).reduce(function (prev,ele) {return prev+ele}),
                dy: element.transform().toString().split("T").map(function (ele) {return ele.split("r")[0]}).map(function(ele) {return ele.split(",")[1]}).slice(1).map(parseFloat).reduce(function (prev,ele) {return prev+ele}),
                rotate: element.matrix.split().rotate
	    }
	}
    );
}


//////////////////////////////////////////
// Helper to save all shapes in the scene
//////////////////////////////////////////
function getAllShapes() {
    return SHAPEStoJSON(allshapes);
}


//////////////////////////////////////////
// Main _SEND_ button
//////////////////////////////////////////
function snap(shapes) {

	//Turn them all into a JSON object
    var jsonvers = getAllShapes();

    var objname = $("#objname").val();

  	//SHIP IT OFF
    $.post("http://"+global_host+"save", {data: jsonvers, name: objname}, function( data ) {
         console.log("Ping back!");
    }, "json");
}


//////////////////////////////////////////
// Helper to save all shapes in the scene
//////////////////////////////////////////
function getAllShapes() {
    return SHAPEStoJSON(allshapes);
}


//////////////////////////////////////////
// Check for a new version function
//////////////////////////////////////////
function check_new_vers() {
    //console.log("Checking for new version...");
    $.post("http://"+global_host+"check_new_vers",
        {data: []},
        function( data ) {
            //console.log("Version: " + data["version"])
            //console.log("Check again: " + data["checkagain"] + "s")

            if(cur_version < data["version"]) {
                console.log("Reload!!!!")
                location.reload(true)
            }
        },
        "json");
}
