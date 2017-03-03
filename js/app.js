"use strict";angular.module("app",["duParallax","ngAnimate","smoothScroll"]);
"use strict";angular.module("app").directive("slider",["$timeout","$interval",function(e,t){return{restrict:"AE",replace:!0,scope:{objects:"="},link:function(n,r,c){n.currentIndex=0,n.currentTriggerIndex=0,n.fadeOut=!1,n.showSlide=function(t){n.fadeOut=!0,n.currentTriggerIndex=t,e(function(){n.fadeOut=!1,n.currentIndex=t},300)},n.cancelCircuit=function(){t.cancel(n.circuit)},n.circuit=t(function(){n.currentIndex<n.objects.length-1?n.showSlide(n.currentIndex+1):n.showSlide(0)},7e3)},templateUrl:"app/templates/labSlider.html"}}]);
"use strict";angular.module("app").controller("MainCtrl",["$scope","parallaxHelper","$timeout","$http",function(e,a,t,o){e.formData={},e.formSent=!1,e.isActive=!1,e.animatingBurger={},e.pxPipe=a.createAnimator(.2),e.pxXS=a.createAnimator(.02),e.pxXSR=a.createAnimator(-.02),e.pxS=a.createAnimator(.1),e.pxM=a.createAnimator(.3),e.pxSuper=a.createAnimator(.7),e.pxResist=a.createAnimator(-.6),e.test="Hello!",e.svgs={welcomeLab:"img/welcome_lab.svg",logo:"img/logo_default.svg",logoSmall:"img/logo_small_solid.svg",laborkaPipeline:"img/laborka_piping.svg",hamburger:"img/hamburger.svg",hamburgerClosed:"img/hamburger_closed.svg",transportabot:"img/transportabot.svg"},e.animatePortfolioBox=function(e){e.removeClass("anim-def-state"),e.addClass("anim-new-state")},e.animateTransportabot=function(){var e=angular.element(document.getElementById("transportabot-1"));e.addClass("anim-new-state"),t(function(){e.removeClass("anim-new-state"),e.addClass("anim-def-state")},7e3)},e.sendEmail=function(){var a=e.formData;e.formSending=!0,o.post("../api/index.php?location=send_email",a).then(function(a){"success"===a.data.code&&(e.formData={},e.formSent=!0),e.formSending=!1,console.log(a)},function(a){e.formSending=!1,console.log(a)})},e.toggleMenu=function(){var a=e.animatingBurger;"undefined"!=typeof a.state&&a.state!==!1||(a.state=!0,e.isActive=!e.isActive,t(function(){a.state=!1},1e3))}}]);
"use strict";angular.module("app").controller("LabSliderCtrl",["$scope",function(e){e.objects=[{src:"img/responsive_lab.svg",id:"responsive-lab",title:"Fluid design and SEO friendly",text:"Charged with positive energy, our elements respond to all devices. We use design thinking in every step of our process to ensure your websites have no side effects. Built with AngularJS or React."},{src:"img/cms_lab.svg",id:"cms-lab",title:"Better, faster, stronger",text:"Talking about code and performance here. We pay attention to kilobytes and loading time by making the best use of Gulp.js and Webpack."}]}]);