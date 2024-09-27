$(document).ready(function(){
    const searchBtn = document.querySelector("#search-button");
    const searchTerm = document.querySelector("#Search-input");
    const results = document.querySelector("#results");

    searchBtn.addEventListener("click", function() {
    fetch("https://pixabay.com/api/?key=46083050-7574d7593e9ac678777336876&q=" + searchTerm.value + "&image_type=photo")
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
          var i=0;
        results.innerHTML = "";
        data.hits.forEach(function(image) {
            results.innerHTML +="<div class=\"col\">"+
                "<div class=\"card shadow-sm\">"+
                    "<img class=\"bd-placeholder-img card-img-top\" width=\"100%\" height=\"225\" src=\""+image.webformatURL+"\" alt=\"Tress Lake Sunrise\">"+
                    "<input type=\"text\" id=\"owner_"+i+"\" style=\"display:none\" value=\"Check the beautiful image clicked by "+image.user+"\"/>"+
                    "<input type=\"text\" id=\"image_"+i+"\" style=\"display:none\" value=\""+image.largeImageURL+"\"/>"+
                    "<input type=\"text\" id=\"desc_"+i+"\" style=\"display:none\" value=\""+image.tags+"\"/>"+  
                    "<div class=\"card-body\">"+
                        "<p class=\"card-text\">"+image.tags+"</p>"+ 
                        "<div class=\"d-flex justify-content-between align-items-center\">"+
                            "<div class=\"btn-group\">"+
                                "<button type=\"button\" onclick=\"openModal(this)\" class=\"btn btn-sm btn-danger\" pic=\""+image.id+"\">View</button>"+
                                "<button type=\"button\" class=\"btn btn-sm btn-warning\" onclick=\"downloadImage(this)\" download=\""+image.previewURL+"\">Download</button>"+
                                "<button type=\"button\" class=\"btn btn-sm btn-success\" onclick=\"shareImage("+i+")\" >Share</button>"+
                            "</div>"+
                        "</div>"+ 
                    "</div>"+
                "</div>"+
            "</div>"
            
        });
        }).catch(error => {
            alert(`<p>Failed to fetch images: ${error.message}</p>`);
        });;
    });
      
  $("#search-button").click();
      
     
  });

function shareImage(count) {
    if (navigator.share) {
        navigator.share({
            title: $("#desc_"+count).val(),
            text: $("#owner_"+count).val(),
            url:$("#image_"+count).val(), 
        })
        .then(() => console.log('Image shared successfully'))
        .catch((error) => console.error('Error sharing the image:', error));
    } else {
        alert('Sharing not supported on this browser.');
    }
}


function downloadImage(element){
  var url = ($(element).attr("download"));

  const link = document.createElement('a');
          link.href = url;
          link.download = 'img.jpg';
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

  };

  
  function openModal(element){
    var id = $(element).attr("pic");
    $("#modalPic").attr("src","");
    $("#info").text("");

    fetch("https://pixabay.com/api/?key=46083050-7574d7593e9ac678777336876&id=" + id + "&image_type=photo")
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        data.hits.forEach(function(image) {
            $("#modalPic").attr("src",image.largeImageURL);
            $("#info").text(image.tags);
        });
        })
        .catch((error) => console.error('Error sharing the image:', error));

    setTimeout(function(){$('#exampleModal').modal('show');},500);    
    
  };