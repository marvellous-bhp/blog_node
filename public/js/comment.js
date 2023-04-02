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
        <div class = "cmt-${response._id}">
          <div class="d-flex ">
          <div class="user">
            <img class="rounded-circle" src="https://i.imgur.com/RpzrMR2.jpg"  width="40">
          </div>
          <input value = "${text}" disabled>
            <div class="dropdown">
            <a class="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              </svg>
            </a>
          
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" onclick="edit_comment('${response._id}')" >Edit</button></li>
              <li><button class="dropdown-item" onclick="del_comment('${response._id}')">Delete</button></li>
            </ul>
            </div>
          </div>
        </div>
        `)
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

  function del_comment(cmt_id) {
    console.log("start");

    // console.log("name",cmt_name);
    // let cmt = ($(cmt_name).val());
    // console.log("val",cmt);
    $.ajax({
      url: `/cmt/${cmt_id}/del`,
      type: 'POST',
      // data: {comment:cmt },
      // dataType : "json",
      success: function(response) {
        let cmt = ".cmt-"+ cmt_id 
        $(`${cmt}`).css("display","none")

        console.log(145);
      },
      error: function(xhr, status, error) {
        console.log("er");
      }
    });
  }

