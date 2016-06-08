function load_wPaint(attach_to) {
    $.fn.wPaint.defaults = {
        path:            'wPaint/',                // set absolute path for images and cursors
        theme:           'standard classic', // set theme
        autoScaleImage:  true,               // auto scale images to size of canvas (fg and bg)
        autoCenterImage: true,               // auto center images (fg and bg, default is left/top corner)
        menuHandle:      true,               // setting to false will means menus cannot be dragged around
        menuOrientation: 'horizontal',       // menu alignment (horizontal,vertical)
        menuOffsetLeft:  5,                  // left offset of primary menu
        menuOffsetTop:   5,                  // top offset of primary menu
        bg:              null,               // set bg on init
        image:           null,               // set image on init
        imageStretch:    false,              // stretch smaller images to full canvans dimensions
        onShapeDown:     null,               // callback for draw down event
        onShapeMove:     null,               // callback for draw move event
        onShapeUp:       null                // callback for draw up event
    };

    // extend cursors
    $.extend($.fn.wPaint.cursors, {
        pencil: 'url("/plugins/main/img/cursor-pencil.png") 0 11.99, default',
    });

    // extend defaults
    $.extend($.fn.wPaint.defaults, {
        mode:        'pencil',  // set mode
        lineWidth:   '30',       // starting line width
        fillStyle:   '#FFFFFF', // starting fill style
        strokeStyle: '#FFFFFF'  // start stroke style
    });

    // init wPaint
    $('#' + attach_to).wPaint({
        menuOffsetLeft: -35,
        menuOffsetTop: -50,
        saveImg: saveImg,
        loadImgBg: loadImgBg,
        loadImgFg: loadImgFg
    });

    // We're done!
    console.log("WPAINT LOADED");
}
