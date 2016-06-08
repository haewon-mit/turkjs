wp = ["tangramReports.html", "tangramS.html"];
//wp = [];
ptr = 0;

window.onload = function() {
    // clear the window
    if(wp.length > 0)
        $("#containdiv").html("");
    for(i = 0;i < wp.length;i++) {
        // Add a div
        var newDivName = "div"+i;
        var newHTML = $("#containdiv").html() +
                "<div id=\""+newDivName+"\" style=\"z-index: " + i + ";\">" +
                '<object type="text/html" data="'+wp[i] +'" ></object>' +
                "</div>";
        $("#containdiv").html(newHTML);
    }
}

function nextview() {
    if(wp.length > 0) {
        $("#div"+ptr).css('z-index', ptr);
        ptr = (ptr + 1) % wp.length;
        $("#div"+ptr).css('z-index', wp.length);
    }
}

function setview(i) {
    if(wp.length > 0 && i < wp.length) {
        $("#div"+ptr).css('z-index', ptr);
        ptr = i;
        $("#div"+ptr).css('z-index', wp.length);
    }
}
