var query = "";
var name = "";
function loadShape() {
	//let it rain, clear it out
	allshapes = []
	window.paper.clear()
	console.log("Correct function called at least --> " + global_host + "loadrand")
	//now load
	$.post("http://"+global_host+"loadrand",
                    {data: []},
                    function( data ) {

                        //get the data
                        shapes = data["body"]["data"];
                        name = data["body"]["name"]

                        // for each element, create

                        for(var i = 0;shapes[i] != undefined ;i++) {
                        	var shapeStr = shapes[""+i].shape;
                        	var colorStr = shapes[""+i].color;
                        	var shapeVal = parseInt(shapeStr);
            				var colorVal = parseInt(colorStr);
            				var shapehook = CreateShape(shapeVal, colorVal, 833, 257);
            				shapehook.transform("...T"+shapes[""+i].dx+","+shapes[""+i].dy);
            				var rt = parseFloat(shapes[""+i].rotate);
            				shapehook.rotate(rt);
                        }
                        query = data["body"]["query"];

                        $("#debug").text("Is this a " +  query + "?");
                    },
                    "json");
}

var timerStart = -5;
var timer;
function timerTick() {
    var prepend = "";
    if(timerStart < 0) {
        console.log("Writing green background");
        $("#timer").css("background-color", "green");
        prepend = "Ready... <br/>";
        $("#timer").html(prepend + Math.abs(timerStart));
    } else {
        if(timerStart >= 5) {
            console.log("Writing red background");
            $("#timer").css("background-color", "red");
            prepend = "STOP <br/>";
            $("#timer").html(prepend);
        } else {
            prepend = "Go! <br/>";
            console.log("Writing yellow background");
            $("#timer").css("background-color", "yellow");
            $("#timer").html(prepend + Math.abs(timerStart));
        }
    }
    timerStart = timerStart + 1;

    if(timerStart <= 5) {
        timer = setTimeout(timerTick, 1000);
    }

}
function startTimer() {
    timerStart = -5;
    timer = setTimeout(timerTick, 1000);
}

function yesno(somebool) {
	if((somebool && name === query) ||
		(!somebool && name !== query)) {
		//CORRECT
		$("#debug").text("CORRECT");
	} else {
		//INCORRECT
		$("#debug").text("INCORRECT");
	}
}
