// function (){}
function like(post_id) {
    $.ajax({
      url: `/articles/like/${post_id}`,
      type: 'POST',
      success: function(response) {
        let name_like = ".number-of-like-"+post_id
        let arr = response
        console.log("rrr",response);
        let count = response[1]
        $(`${name_like}`).text(count)
        // console.log(va.toString());
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }