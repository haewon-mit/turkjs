var reportloaded;
// Still working on collision detection for ALL shapes
$(function() {
    if(!reportloaded) {
        // Initialize Raphael
        window.paper = new Raphael(document.getElementById('canvas_container'), 1000, 1000);

        // For all the buttons, cancel the default behavior
        $( "input[type=submit], a, button" ).button().click(function( event ) {
            event.preventDefault();
        });

        // Initialize the Network layer
        initNetworkOS(true);
        $( "#radioReport" ).buttonset();

        $("#radioSelect").toggle();
        $("#pix_container").toggle();

        reportloaded = true;
    }
});

function next_level(selected_list) {

    //Turn them all into a JSON object
    var jsonvers = JSON.stringify(selected_list);

    //SHIP IT OFF
    if(pix_on) {
        var imdat = $("#pix_container").data().wPaint.getImage();
        $.post("http://"+global_host+"nextimg",  {im: imdat}, function( data ) {
            console.log("Ping back!");
        }, "json");
    } else {
        $.post("http://"+global_host+"next", {data: jsonvers},function( data ) {
            console.log("Ping back!");
        }, "json");
    }
}


$("#picker").change(function(){
    catch_image_handler( this );
});


$("#saveState").click(function() {
    console.log("NEXT");
    // iterate through all shapes and find which ones are selected
    var i = 0;
    var tosend = [];
    for (i = 0 ; i < allshapes.length;i++) {
        var shape = allshapes[i];
        if(shape.selected) {
            tosend.push(i);
        }
    }
    next_level(tosend);
    // disable the savestate button, reset the stage
    clearFrame();
    $('#pix_container').wPaint('clear');
});

var pix_on = false;
$("#radio1R").click(function() {
    if(pix_on) {
        pix_on = false;
        $("#pix_container").toggle();
    }
});


$("#radio2R").click(function() {
    if(!pix_on) {
        pix_on = true;
        $("#pix_container").toggle();
    }
});

$("#clearButton").click(function() {
    $('#pix_container').wPaint('clear');
});
