var timers = [];
      
      function animateGauges() {
        console.log('Animation of radial gauge');
          document.gauges.forEach(function(gauge) {
              timers.push(setInterval(function() {
                  var min = gauge.options.minValue - 20;
                  var max = gauge.options.maxValue + 20;
      
                  gauge.value = min + Math.random() * (max - min);
              }, gauge.animation.duration + 50));
          });
      }
      
      function stopGaugesAnimation() {
          timers.forEach(function(timer) {
              clearInterval(timer);
          });
      }