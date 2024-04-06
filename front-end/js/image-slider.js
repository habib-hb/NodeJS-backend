// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }






let slideIndex = 1;
let intervalId; // Variable to hold the interval ID for automatic sliding

// Function to start automatic sliding
function startAutoSlide() {
    intervalId = setInterval(() => {
        plusSlides(1); // Move to the next slide automatically
    }, 2000); // Change slide every 3 seconds (adjust as needed)
}

// Function to stop automatic sliding
function stopAutoSlide() {
    clearInterval(intervalId);
}

// Function to initialize the slideshow
function initSlideShow() {
    showSlides(slideIndex);
    startAutoSlide(); // Start automatic sliding
}

// Next/previous controls
function plusSlides(n) {
    stopAutoSlide(); // Stop automatic sliding when manual navigation occurs
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    stopAutoSlide(); // Stop automatic sliding when manual navigation occurs
    showSlides(slideIndex = n);
}

// Function to display slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    startAutoSlide(); // Restart automatic sliding after manual navigation
}

// Initialize the slideshow
initSlideShow();