// function (){}
function like(post_id) {
    $.ajax({
      url: `/articles/like/${post_id}`,
      type: 'POST',
      success: function(response) {
        let name_like = ".number-of-like-"+post_id
        let arr = response
        let va = arr.length
        $(`${name_like}`).text(va)
        console.log(va.toString());
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }