// function (){}
function like(post_id) {
    $.ajax({
      url: `/articles/like/${post_id}`,
      type: 'POST',
      success: function(response) {
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }