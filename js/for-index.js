
// http://h2ham.seesaa.net/article/305452745.html
$('#btn').on({
    'mouseenter': function(){
      $(this).find('#img1').stop(true, true).slideDown(7000);
    },
    'mouseleave': function(){
      $(this).find('#img1').stop(true, true).slideUp(7000);
    },

  });

