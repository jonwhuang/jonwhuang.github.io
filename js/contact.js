$(document).ready(function(){
  $('.contact-form').on('submit', function(e){
    e.preventDefault();
    $.ajax({
      url: '//formspree.io/jonwhuang@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      beforeSend: function() {
        $('.contact .content-text').css('padding-top', '0px');
        $('.contact-form').css('margin-top', '0px');
        $('.contact-form').find('.alert--success').remove();
        $('.contact-form').prepend('<div class="alert alert--loading">Sending message…</div>');
      }
    }).done(function(response){
      $('.contact-form').trigger('reset');
      $('.contact-form').find('.alert--loading').remove();
      $('.contact-form').prepend('<div class="alert alert--success">Message sent!</div>');
    });
  });
});
