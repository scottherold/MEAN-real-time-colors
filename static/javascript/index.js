$( () => {
    let previousColor = null; // save previous color on client!

    // <--- Socketing --->
    var socket = io(); // Constructs socket from index.ejs link and server 'connection'

    // ** initial connection **
    socket.on('initial_bg_color_update', data => {
        console.log(`the current color is ${data.color}`)
        $('#background').addClass(data.color); // updates the background with the current color
        previousColor = data.color; // sets previous color to current color sent from server
    });

    // ** color update **
    socket.on('bg_color_update', data => {
        console.log(`the current color is ${data.color}`)
        console.log(`the previous color was ${data.previousColor}`)
        $('#background').removeClass(previousColor); // removes the previous color class
        $('#background').addClass(data.color); // adds the currently selected color
        previousColor = data.color; // sets previous color to current color sent from server
    });

    // <--- AJAX --->
    $('button').click(function()  { // ES5 function must be used for 'this' to work
        socket.emit('update', {color: this.id});
    });
})