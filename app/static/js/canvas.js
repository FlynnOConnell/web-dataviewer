$( document ).ready(function() {

   function createCanvas() {
    var canvas = document.getElementById("inputCanvas");
    canvas.context = canvas.getContext('2d');
    return canvas;
  }

  function init() {
    var canvas = createCanvas();
    var ctx = canvas.context;
    ctx.fillCircle = function(x, y, radius, drawColor) {
      this.fillStyle = drawColor;
      this.beginPath();
      this.moveTo(x, y);
      this.arc(x, y, radius, 0, Math.PI * 2, false);
      this.fill();
    };
    ctx.clearTo = function(fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fillRect(0, 0, ctx.width, ctx.height);
    };
    ctx.clearTo(fillColor);

    canvas.onmousemove = function(e) {
      if (!canvas.isDrawing) {
        return;
      }
      var x = e.pageX - this.offsetLeft;
      var y = e.pageY - this.offsetTop;
      var radius = 10;
      var fillColor = drawColor;
      ctx.fillCircle(x, y, radius, drawColor);
    };
    canvas.onmousedown = function(e) {
      canvas.isDrawing = true;
    };
    canvas.onmouseup = function(e) {
      canvas.isDrawing = false;
    };
  }

  var container = document.getElementById('canvas');
  init(container);
  var fillColor = "#ddd"
  var drawColor = 'rgb(163,33,33)';

  function clearCanvas() {
    var canvas = document.getElementById("inputCanvas");
    var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function getData() {
    var canvas = document.getElementById("inputCanvas");
    var imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var outputData = []
    for (var i = 0; i < data.length; i += 4) {
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      outputData.push(brightness);
    }
    $.post("/postmethod", {
      canvas_data: JSON.stringify(outputData)
    }, function (err, req, resp) {
      $("#graph").attr("src", "data:image/png;base64," + resp.responseText);
    });
  }

  $( "#clearButton" ).click(function(){
    clearCanvas();
  });

  $( "#sendButton" ).click(function(){
    getData();
  });
});
