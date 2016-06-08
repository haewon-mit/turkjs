/*! mouse UI definitions 2014-6-16
* @author ndepalma
* mouse_defs.js
* Licensed MIT */

//////////////////////////////////////////
// Global variables for last x/y mouse pos
// and when went down
//////////////////////////////////////////
var last_x_, last_y_;
var mdown_x = 0, mdown_y = 0;


//////////////////////////////////////////
// Down specifier - figure out if rotating or moving
//////////////////////////////////////////
var down = function (id, e) {
    mdown_x = this.matrix.e;
    mdown_y = this.matrix.f;
    this.last_ru = 0;
    
    //determine if moving or rotating
    if (window.event.shiftKey )
		this.shift = true;
    else
		this.shift = false;
}, 

//////////////////////////////////////////
// Move specifier - figure out behavior expected - rotate or translate
//////////////////////////////////////////
move = function (dx, dy) {
    //successful move if no collisions
    if (!allCollision()) {
 	//if rotating
	if (this.shift) {
	    this.rotate((dx-this.last_ru)/10.0);
	    
	    if (allCollision()) {
		this.rotate(-(dx-this.last_ru)/10.0);
	    } else {
		write_rotate(this.node.id, -(dx-this.last_ru)/10.0);
		this.last_ru = dx;
	    }
	} else {
	    //just a translation
	    var abs_x = mdown_x + dx;
	    var abs_y = mdown_y + dy;
	    var last_x = this.matrix.e;
	    var last_y = this.matrix.f;
		    
	    this.transform("...T"+(abs_x-last_x)+","+(abs_y-last_y));
	    //test the next position just in case collision too. 
	    //otherwise, keep where it was so I don't get the shape stuck
	    if (allCollision()) {
		var abs_x = mdown_x + last_x_;
		var abs_y = mdown_y + last_y_;
		var last_x = this.matrix.e;
		var last_y = this.matrix.f;
		this.transform("...T"+(abs_x-last_x)+","+(abs_y-last_y));
	    } else {
		write_move(this.node.id, (abs_x-last_x), (abs_y-last_y));
		last_x_ = dx;
		last_y_ = dy;
	    }
	}
    } else {
	console.log("please god stop"); // something went horribly wrong
    }
}, 

//////////////////////////////////////////
// Up does nothing
//////////////////////////////////////////
up = function () {
    var x = this.matrix.e;
    var y = this.matrix.f;
    
    var dx = mdown_x - x;
    var dy = mdown_y - y;
    if (dx < 3 && dy < 3) {
	this.select();
    }

    };


var touchst = function(event) {

}