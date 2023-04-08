function start_comment(){
  // console.log($(this).closest('div'));
  $(".comment-form").css("display","block");
  // CKEDITOR.replace( 'comment-ckedit' );
}

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
        console.log("nalll",response);
        let text = response.text
        $(`${cmt_name}`).append(`
        <div class = "cmt-${response._id}">
          <div class="d-flex ">
           <div class="user">
             <img class="rounded-circle" src="data:image/${response.User.avatar.contentType};base64,
             ${response.User.avatar.data.toString('base64')}"  width="40">
           </div>
          <div> ${text} </div>
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

  function start_edit(cmt_id){
    let cmt_class_name = ".cmt-" +  cmt_id;
    let cmt_content_name = ".cmt-content-" +  cmt_id;
    let cmt_text = $(`${cmt_content_name}`).text()
    $(`${cmt_content_name}`).css("display","none");
    $(`${cmt_class_name}`).append(`
    <form class="comment-form" style="display: block" >
      <div class="d-flex flex-row align-items-start">

        <textarea id="txt-${cmt_id}" class="form-control ml-1 shadow-none textarea comment-${cmt_id}-edit" >
          ${cmt_text}
        </textarea>

      </div>
      
      <div class="mt-2 text-right">
        <button class="btn btn-primary btn-sm shadow-none" type="submit" onclick="edit_comment('${cmt_id}')">Edit comment</button>
        <button class="btn btn-outline-primary btn-sm ml-1 shadow-none">Cancel</button>
      </div>
    </form>`)
    console.log(cmt_text);

  }

  function edit_comment(cmt_id) {
    console.log("start edit");
    let name_edit = ".comment-"+cmt_id+"-edit"
    let cmt_text =  $(`${name_edit}`).val()
    console.log("valfff",cmt_text);

    // console.log("name",cmt_name);
    // let cmt = ($(cmt_name).val());
    // console.log("val",cmt);
    $.ajax({
      url: `/cmt/${cmt_id}/edit`,
      type: 'POST',
      data: {text: cmt_text },
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

