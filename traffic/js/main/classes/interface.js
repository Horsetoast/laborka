var Interface = function(canvas) {

   var _interface = this;
   var canvas = canvas;
   var ctx = canvas.getContext('2d');
   var lastState = {};

   this.getCanvasCords = function(el) {
     var xPosition = 0;
     var yPosition = 0;

     while (el) {
       if (el.tagName == 'BODY') {
         // deal with browser quirks with body/window/document and page scroll
         var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
         var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

         xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
         yPosition += (el.offsetTop - yScrollPos + el.clientTop);
       } else {
         xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
         yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
       }

       el = el.offsetParent;
     }
     return {
       x: xPosition,
       y: yPosition
     };
   }

   this.getMouseCords = function(event) {
      var canvasCords = _interface.getCanvasCords(canvas);
      return {
         x: event.clientX - canvasCords.x,
         y: event.clientY - canvasCords.y
      };
   }

   this.layRoad = function(road, params = {}) {
      ctx.beginPath();
      if(typeof params.color !== "undefined") {
         ctx.strokeStyle = params.color;
      }
      if(typeof params.lineWidth !== "undefined") {
         ctx.lineWidth = params.lineWidth;
      }
      ctx.moveTo(road.start.x, road.start.y);
      ctx.lineTo(road.end.x, road.end.y);
      ctx.stroke();
      ctx.closePath();
   }


   this.showValidPath = function(road) {
      // Save state
      lastState = ctx.getImageData(0,0,canvas.width,canvas.height);

      canvas.addEventListener('mousemove', outlining = function(event) {
         var mouseCords = _interface.getMouseCords(event);
         road.end = {};
         road.end.x = mouseCords.x;
         road.end.y = mouseCords.y;

         var roadAngle = Math.atan2(road.start.y - road.end.y, road.start.x - road.end.x) * 180 / Math.PI;
         var diffX = road.end.x - road.start.x;
         var diffY = road.end.y - road.start.y;
         var length = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

         // Restore state (clean path to redraw a new one). If proposed path is invalid, return false
         ctx.putImageData(lastState, 0, 0);
         // console.log('mouse X: ', mouseCords.x);
         console.log('road X: ', road.start.x);
         console.log('road Y: ', road.start.y);

         // snapping to symmetrical angles and validity check
         if(Math.abs(mouseCords.x - road.start.x) < 10) {
            road.end.x = road.start.x;
            road.valid = true;
            _interface.layRoad(road, {color: 'green', lineWidth: 10});
         }
         else if(Math.abs(mouseCords.y - road.start.y) < 10) {
            road.end.y = road.start.y;
            road.valid = true;
            _interface.layRoad(road, {color: 'green', lineWidth: 10});
         }
         else if(Math.abs(Math.abs(diffX) - Math.abs(diffY)) < 10) {
            if(diffX > 0) {
               if(diffY > 0) {
                  road.end.y = road.start.y + diffX;
               }
               else {
                  road.end.y = road.start.y - diffX;
               }
            }
            else {
               if(diffY < 0) {
                  road.end.y = road.start.y + diffX;
               }
               else {
                  road.end.y = road.start.y - diffX;
               }
            }
            road.valid = true;
            _interface.layRoad(road, {color: 'green', lineWidth: 10});
         }
         else {
            road.valid = false;
            _interface.layRoad(road, {color: 'red', lineWidth: 10});
         }
         // console.log('angle: ', roadAngle);
         // console.log('length: ', length);
         console.log(road.end.x, road.end.y);
         console.log('diffX: ', diffX);
      }, false);
   }

   this.hideValidPath = function() {
      canvas.removeEventListener('mousemove', outlining, false);
      ctx.putImageData(lastState, 0, 0);
   }

}
