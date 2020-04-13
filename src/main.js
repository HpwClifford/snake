$(document).ready(function() {
  const apple = new Apple($('#board'));
  const head = new Head($('#board'), apple);
  
  $('body').on('keydown', function(e) {
    if (e.keyCode === 37) {
      head.setDirection('left');
    } else if (e.keyCode === 38) {
      head.setDirection('up');
    } else if (e.keyCode === 39) {
      head.setDirection('right');
    } else if (e.keyCode === 40) {
      head.setDirection('down');
    }
  });
});
