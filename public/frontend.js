"use strict";

//Make socket connection
var socket = io.connect('')
//var socket = io.connect('http://localhost:3000');

var clipboard = new Clipboard('.btn');

//Copy and cut functions with clipboard.js library
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);

    //Send data over to server
    socket.emit('copied', {
      copy: e.text
    });

    e.clearSelection();
});

clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});

//Listen for events
socket.on('copied', function(data){
      console.log("clipboard data available: "+data.copy);

      $('.clipboardData').click(function () {
        console.log(data);
        var text = data.copy;
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
      });
});



$(".paste").click(function() {
  var result = '',
       clipboard = $('.textarea').val('').select();
   if (document.execCommand('paste')) {
       result = clipboard.val();
   }
   clipboard.val('');
   return result;
});
