// function (){}
function like(post_id) {
    $.ajax({
      url: `/articles/like/${post_id}`,
      type: 'GET',
      success: function(response) {
        let name_like = ".number-of-like-"+post_id
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

  function like_cmt(cmt_id) {
    $.ajax({
      url: `/cmt/${cmt_id}/like`,
      type: 'GET',
      success: function(response) {
        let name_like = ".number-of-like-"+cmt_id
        console.log("rrrcmt",response);
        let count = response[1]
        $(`${name_like}`).text(count)
        // console.log(va.toString());
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }