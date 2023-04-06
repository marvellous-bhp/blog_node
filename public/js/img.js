const imageForm = $('#imageForm');
const resultDiv = $('#result');

imageForm.on('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(imageForm[0]);

  $.ajax({
    url: '/api/image/upload',
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    success: function(data) {
      resultDiv.text(`Image uploaded: ${data.filename}`);
    },
    error: function(error) {
      resultDiv.text(`Error uploading image: ${error.message}`);
    }
  });
});
