$( document ).ready(function() {
  var URL = window.URL || window.webkitURL;
  var displayMsg = function (msg, className){
      $('#message')[0].innerHTML = '<p class="'+className+'">' + msg + '</p>';;
  };
  if (!URL) {
    var notSupportedMsg = 'Your browser is not <a href="http://caniuse.com/bloburls">supported</a>!';
    displayMsg(notSupportedMsg, 'error');
    return;
  }

  $('#vidForm').submit(function(event) {
      event.preventDefault();
      var vInput = $('#vInput')[0];
      var sInput = $('#sInput')[0];
      // Check if video file has been selected
      if (vInput.files && vInput.files.length < 1) {
          displayMsg('Please select an input video file', 'error');
          return;    
      }
      // Get video file params
      var vFile = vInput.files[0];
      var vType = vFile.type;
      var vUrl = URL.createObjectURL(vFile);
      // Get subtitle params
      var sFile = "", sType = "", sUrl = "";
      if (sInput.files && sInput.files.length > 0) {
          sFile = sInput.files[0];
          sType = sFile.type;
          sUrl = URL.createObjectURL(sFile);
          // Append to video element
          var trackElem = '<track kind="captions" src="' + sUrl + '" scrlang="en" label="English" default>';
          $('#vidPlayer').append(trackElem);
      }
      // Try playing the video 
      try{
           _V_("vidPlayer").ready(function(){
               this.src({ 'type' : vType,
                          'src' : vUrl
                        });
               this.play();
               if (sUrl) {
                   $('#sAdjust').removeClass('hidden');
               }
           });
           displayMsg("Video loaded successfully, now you can full screen it and Chromecast it !!!", 'info');
       } catch(ex) {
           console.log(ex);
       }
  });

  $('#sIncrease').click(function(event) {
      var track = $('.vjs-text-track-display');
      var currSize = parseInt(track.css('font-size'), 10);
      var newSize = currSize + 5;
      track.css('font-size', newSize);
  });

  $('#sDecrease').click(function(event) {
      var track = $('.vjs-text-track-display');
      var currSize = parseInt(track.css('font-size'), 10);
      var newSize = currSize - 5;
      track.css('font-size', newSize);
  });
});
