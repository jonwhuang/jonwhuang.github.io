$(document).ready(function(){
  bindListeners();
})

var bindListeners = function(){
  $('#slider ul.slides')
    .on('mouseenter', 'li.flex-active-slide img', showVisitBtn)
    .on('mouseleave', 'li.flex-active-slide img', hideVisitBtn);

  $('#slider ul.slides').on('mouseenter', '.overlay-text', showVisitBtn);
}

var showVisitBtn = function(){
  $('.overlay-text').show();
}

var hideVisitBtn = function(){
  $('.overlay-text').hide();
}
