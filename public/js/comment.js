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
        <div class="d-flex">
          <div class="user">
            <img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg"  width="40">
          </div>
          <textare >${text}</textarea>
          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              
            </a>
          
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" onclick="edit_comment('${response._id}')" >Edit</button></li>
              <li><button class="dropdown-item" href="#">Delete</button></li>
            </ul>
          </div>
        </div>`)
        console.log(1);
      },
      error: function(xhr, status, error) {
        console.log("er");
      }
    });
  }


  function edit_comment(cmt_id) {
    console.log("start");

    // console.log("name",cmt_name);
    // let cmt = ($(cmt_name).val());
    // console.log("val",cmt);
    $.ajax({
      url: `/cmt/${cmt_id}/edit`,
      type: 'POST',
      // data: {comment:cmt },
      // dataType : "json",
      success: function(response) {
        console.log(response);

        console.log(145);
      },
      error: function(xhr, status, error) {
        console.log("er");
      }
    });
  }

