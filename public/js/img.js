function uploadImg() {
    // Xử lý sự kiện khi người dùng nhấn nút upload
    $('#upload-form').submit(function(e) {
      e.preventDefault();
      var formData = new FormData($(this)[0]);
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
          $('#message').text('Upload success');
        },
        error: function() {
          $('#message').text('Upload error');
        }
      });
    });
  };