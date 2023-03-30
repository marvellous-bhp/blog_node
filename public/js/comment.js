function comment(post_id) {
    console.log("start");
    let cmt_name= '.comment-' + post_id
    console.log("name",cmt_name);
    let cmt = ($(cmt_name).val());
    console.log("val",cmt);
    $.ajax({
      url: `/cmt/${post_id}`,
      type: 'POST',
      data: {comment:cmt },
      // dataType : "json",
      success: function(response) {
        console.log(response);
        // console.log();
        let cmt_name= '.comment-group-' + response.article
        console.log("naa",$(`${cmt_name}`));
        console.log("nalll",response.text);
        let text = response.text
        $(`${cmt_name}`).append(`
        <div>
          <div class="user">
            <img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg"  width="40">
          </div>
          <textare >${text}</textarea>
        </div>`)
        console.log(1);
      },
      error: function(xhr, status, error) {
        console.log("er");
      }
    });
  }

