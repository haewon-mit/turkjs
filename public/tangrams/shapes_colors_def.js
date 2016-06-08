/*! shapes and colors definition 2014-6-16
* @author ndepalma
* shapes_colors_def.js
* Licensed MIT */

//////////////////////////////////////////
// Global tracking of all shapes in the scene
//////////////////////////////////////////
var allshapes = [];

//////////////////////////////////////////
//Color Styles
// possible colors: green, blue, yellow, red
//////////////////////////////////////////

var bluestyle = {
	gradient: '90-#526c7a-#3399FF',
	stroke: '#3b4449',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var greenstyle = {
	//fill: '90-#339966-#009900',
	fill: '#009900',
	//background: linear-gradient(180deg, red, blue),
	stroke: '#3b4449',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var redstyle = {
	gradient: '90-#993300-#FF3300',
	stroke: '#3b4449',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var yellowstyle = {
	gradient: '90-#FF9900-#FFCC00',
	stroke: '#3b4449',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};

var dstyle = {
    //gradient: '90-#526c7a-#3399FF',
    //fill: '#ffffff',
    gradient: 'r(0.5, 0.5)#fff-rgba(82, 82, 82, 0.5)-rgba(65, 65, 65, 0.1)',
    opacity: 0.2,
    'stroke-width': 0,
    'stroke-linejoin': 'round',
    rotation: -90
};


var lgreenstyle = {
	//gradient: '90-#339966-#99CCB2',
	fill: "#99CCB2",
	stroke: '#ffffff',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var lredstyle = {
	//gradient: '90-#993300-#FF3300',
	fill: "#FF3300",
        stroke: '#ffffff',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var lyellowstyle = {
	//gradient: '90-#FF9900-#FFCC00',
        fill: "FFCC00",
        stroke: '#ffffff',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};
var lbluestyle = {
	//gradient: '90-#526c7a-#3399FF',
	fill: '#3399FF',
        stroke: '#ffffff',
	'stroke-width': 5,
	'stroke-linejoin': 'round',
	rotation: -90
};


///////
//every shape has a color, there are 5 possible shapes
///////

ColorEnum = {
	RED : 0,
	GREEN : 1,
	BLUE : 2,
	YELLOW : 3
}

//////////////////////////////////////////
// Shape Styles
//  size: tri/s/m/l, parallelogram, square
//////////////////////////////////////////

ShapeEnum = {
	SMALLTRI : 0,
	MEDIUMTRI : 1,
	LARGETRI : 2,
	SQUARE : 3,
	PARA : 4,
        CIRCLE : 5
}

//////////////////////////////////////////
// Constructor to make js object
//////////////////////////////////////////
function ShapeProto(color, shape, element) {
	this.color = color;
	this.shape = shape;
}


function calcRot (p1, p2) {
	var dy = p2.clientY - p1.clientY;
	var dx = p2.clientX - p1.clientX;

	return Math.atan2(dy, dx)
	// return rotationAngle
}

function select_shape(id) {
    var shape = allshapes[id];
    console.log("Flipping Select");
    //change color
    shape.selected = !shape.selected;
    switch(shape.clr) {
    case ColorEnum.RED:
	if (shape.selected)
	    shape.attr(lredstyle);
	else
	    shape.attr(redstyle);
	break;
    case ColorEnum.BLUE:
	if (shape.selected)
	    shape.attr(lbluestyle);
	else
	    shape.attr(bluestyle);
	break;
    case ColorEnum.GREEN:
	if (shape.selected)
	    //console.log("Light green");
	    shape.attr(lgreenstyle);
	else
	    //console.log("Green");
	    shape.attr(greenstyle);
	break;
    case ColorEnum.YELLOW:
	if (shape.selected)
	    shape.attr(lyellowstyle);
	else
	    shape.attr(yellowstyle);
	break;
    }
    //write to network

}

var lasttouchr;
//////////////////////////////////////////
// Helper function to draw and add to world
//////////////////////////////////////////
function CreateShape(proto, color, x, y, shouldrepeat) {
    shouldrepeat = typeof shouldrepeat !== 'undefined' ? shouldrepeat : true;
    // triangle is size 80
    // medium side is same side as hypotenus:
    //    sqrt(2*80^2) = 113.137 ~= 113

    // square same size as small triangle = 80
    // para long side same size as midtri = 113, angles are 80
    // large tri is sqrt(2*113^2) = 159.8 ~= 160;
    var allcolors = [redstyle, greenstyle, bluestyle, yellowstyle];
    var colorattr = allcolors[color];
    var shape = 0;
    switch (proto) {
	case ShapeEnum.SMALLTRI:
	    shape = window.paper.path("M "+x+" "+y+" l 0 80 l 80 0 z");
	    break;
	case ShapeEnum.MEDIUMTRI:
	    shape = window.paper.path("M "+x+" "+y+" l 0 113 l 113 0 z");
	    break;
	case ShapeEnum.LARGETRI:
	    shape = window.paper.path("M "+x+" "+y+" l 0 160 l 160 0 z");
	    break;
	case ShapeEnum.SQUARE:
	    shape = window.paper.path("M "+x+" "+y+" l 0 80 l 80 0 l 0 -80 z");
	    break;
	case ShapeEnum.PARA:
	    shape = window.paper.path("M "+x+" "+y+" l 0 113 l 56.5 -56.5 l 0 -113 z");
	    break;
        case ShapeEnum.CIRCLE:
            shape = window.paper.circle(x, y, 40);
            break;
	default:
	    console.log("wrong shape enum given to create:" + proto);
            allshapes.push(0);
            return 0;
    }
    shape.shp = proto;
    shape.clr = color;
    shape.attr(colorattr);
    if(can_move) {
        shape.drag(move, down, up);
    } else if (typeof can_select !== 'undefined' && can_select === true) {
        shape.drag(null, down, up);
    }
    // TEST

    shape.node.myhook = shape;
    shape.selected = false;
    //if(can_select === true) {
    shape.select = function() {
        select_shape(shape.node.id);
    };
    //}//

    shape.node.addEventListener('touchmove', function (event0 ) {
    	var str = "native len: " + event0.changedTouches.length;

    	if(event0.changedTouches.length > 1) {
    		// $("#debug").text("m:calcRot: " + calcRot(event0.changedTouches[0], event0.changedTouches[1]))
    		var thisone = calcRot(event0.changedTouches[0], event0.changedTouches[1]);
    		this.myhook.rotate(-(lasttouchr-thisone) * 180.0/3.1415);
	    lasttouchr = thisone;
    	} else {
    		// $("#debug").text("m:trans: " + 0 + " " + 1)
    		var dx = event0.changedTouches[0].pageX - mdown_x;
    		var dy = event0.changedTouches[0].pageY - mdown_y;
    		// var abs_x = mdown_x + dx;
		    // var abs_y = mdown_y + dy;
		     mdown_x = event0.changedTouches[0].pageX;
		     mdown_y = event0.changedTouches[0].pageY;



		    // $("#debug").text("m:trans: " + (this.myhook.matrix.e) + " " + (this.myhook.matrix.f))
		    this.myhook.transform("...T"+(dx)+","+(dy));

    	}
    	// $("#debug").text(str)
    	// $("#debug").text("touch move")
    }, false);

    shape.node.addEventListener('touchstart', function (event0 ) {
	var str = "native len: " + event0.changedTouches.length;
	if(event0.changedTouches.length > 1) {
	   // $("#debug").text("s:calcRot: " + calcRot(event0.changedTouches[0], event0.changedTouches[1]))
	   lasttouchr = 0;
        } else {
	   mdown_x = event0.changedTouches[0].pageX;
    	   mdown_y = event0.changedTouches[0].pageY;
	   // $("#debug").text("s:trans: " + mdown_x + " " + mdown_y)
        }
    }, false);

    // var myid = allshapes.length
    // shape.node.id = "id-"+myid;
    // var obj = document.getElementById('id');
    // document.
    shape.node.id = allshapes.length;
    allshapes.push(shape);
    if (shouldrepeat) {
	write_add(shape.node.id, proto, color, x, y);
    }

    return shape;
}

function CreateShape_defaults(proto, color) {
    return CreateShape(proto, color, 833, 257, false);
}

var updates = [];

function write_move(id, dx, dy) {
	var move = [parseInt(id)];
	move.push("m");
	move.push(dx);
	move.push(dy);

	updates.push(move);
}

function read_move(id, dx, dy) {
	allshapes[id].transform("...T"+(dx)+","+(dy));
}

function write_rotate(id, dr) {
	var rotate = [parseInt(id)];
	rotate.push("r");
	rotate.push(dr);
	updates.push(rotate);
}

function read_rotate(id, dr) {
	allshapes[id].rotate(-dr);
}

function write_add(id, shape, color, x, y) {
	var add = [parseInt(id)];
	add.push("a");
	add.push(shape);
	add.push(color);
	add.push(x);
	add.push(y);
	add.push(0);

	updates.push(add);
}

function read_add(id, shape, color, x, y) {
	CreateShape(shape, color, x, y, false);
}

function read_all(some_updates) {
	for (i = 0; i < some_updates.length; i++) {
		var update = some_updates[i];
		switch(update[1].charCodeAt(0)) {
			case "m".charCodeAt(0):
				read_move(update[0], update[2], update[3]);
				break;
			case "r".charCodeAt(0):
				read_rotate(update[0], update[2]);
				break;
			case "a".charCodeAt(0):
				read_add(update[0], update[2], update[3], update[4], update[5]);
				break;
			default:
				console.log("Bad update command");
		}
	}
}

function clearFrame() {
    allshapes = [];
    window.paper.clear();
}

function read_frame(frame) {
    clearFrame();
    console.log("Got number of shapes: " + frame.length);
    // First iterate through and get the shapes added
    for(i = 0;i < frame.length;i++) {
        var shape = Math.floor(frame[i]["shape"]);
        var color = Math.floor(frame[i]["color"]);
        var rot = frame[i]["rotate"];
        var pos = [Math.floor(frame[i]["dx"]), Math.floor(frame[i]["dy"])];

        console.log("got shape: " + shape);
        // add it
        shp = CreateShape_defaults(shape, color);

        // Then rotate them
//	write_rotate(this.node.id, -(dx-this.last_ru)/10.0);
        console.log("rotating: " + rot);
	shp.rotate(rot);

        // then translate theme

        // try to subtract off defaults if add is taken into account
        var x = pos[0];// - 833;
        var y = pos[1];// - 257;
        console.log("Translating: " + x + " , " + y);
	shp.transform("...T"+x+","+y);

   }

}

function get_selected() {
    selecteds = [];
    for(i = 0;i < allshapes.length;i++)
        if(allshapes[i].selected)
            selecteds.push(i);
    return selecteds;
}


function deictic(pos, r, t) {
    var cur_circle = window.paper.circle(pos[0], pos[1], r);
    cur_circle.attr(dstyle);
    setTimeout(function() {
        console.log("removing");
        cur_circle.remove();
        console.log("removed.");
    }, 1000*t);
}
