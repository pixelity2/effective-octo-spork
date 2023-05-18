$(document).ready(function() {
  var slideIndex = 0;
  showSlides();
  
  function showSlides() {
    var slides = $(".slide");
    slides.hide();
    slideIndex++;
    
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    
    slides.eq(slideIndex - 1).fadeIn(1000);
    setTimeout(showSlides, 2000); // Change slide every 2 seconds (adjust as needed)
  }
});

//Newsletter
var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)