// Initialize
var canvas = document.getElementById('canvasMap');

// Included classes
var iface = new Interface(canvas);
var newRoad = new Road();

canvas.addEventListener('click', function(event) {
   console.log(iface);
   var cords = iface.getMouseCords(event);

   console.log('Log:', cords, newRoad);

   // If path is valid -> render it
   if(newRoad.start === false) {
      newRoad.start = cords;
      iface.showValidPath(newRoad);
      return;
   }
   if(newRoad.end === false && newRoad.start !== false) {
      newRoad.end = cords;
   }
   if(newRoad.end !== false && newRoad.start !== false && newRoad.valid === true) {
      console.log('lay');
      iface.hideValidPath();
      iface.layRoad(newRoad, {color: 'blue'});
      newRoad = new Road();
   }

}, false);
