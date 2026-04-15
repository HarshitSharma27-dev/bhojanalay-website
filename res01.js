// ==========================================
// 1. PRELOADER LOGIC (Updated for 2.5s delay)
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Force a 2.5 second (2500 milliseconds) delay so the logo is clearly visible
    setTimeout(() => {
        // Adding the class triggers the CSS fade-out transition
        preloader.classList.add('preloader-hidden');
        
        // Completely remove it from the screen after the 0.6s fade completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
        
    }, 2000); // <-- 2000ms = 2 seconds
});

// ==========================================
// 2. SCROLL TRANSPARENCY LOGIC
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled'); 
  } else {
    navbar.classList.remove('scrolled'); 
  }
});

// ==========================================
// 3. HAMBURGER MOBILE MENU LOGIC
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active'); 
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ==========================================
// 4. RESERVATION MODAL & FORM SUBMISSION
// ==========================================
const reserveBtns = document.querySelectorAll('.reserve-btn'); 
const modal = document.getElementById('reservation-modal');
const cancelBtn = document.getElementById('cancel-btn');
const reservationForm = document.getElementById('reservation-form'); 

reserveBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    if(btn.tagName.toLowerCase() === 'a') {
        e.preventDefault(); 
    }
    modal.classList.add('active'); 
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

cancelBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('active');
  }
});

// Form Submit Logic
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    alert("Success! Your table has been booked. We look forward to seeing you.");
    
    reservationForm.reset();
    modal.classList.remove('active');
});

// ==========================================
// 5. GALLERY SLIDER & TOUCH SUPPORT LOGIC
// ==========================================
const track = document.getElementById('slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

function updateSliderPosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex === slides.length - 1) { currentIndex = 0; } 
  else { currentIndex++; }
  updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex === 0) { currentIndex = slides.length - 1; } 
  else { currentIndex--; }
  updateSliderPosition();
});

let startX = 0;
let currentX = 0;
let isDragging = false;

track.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (event) => {
  if (!isDragging) return;
  currentX = event.touches[0].clientX;
});

track.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  
  let swipeDistance = startX - currentX;
  
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance > 0) {
      if (currentIndex === slides.length - 1) { currentIndex = 0; } 
      else { currentIndex++; }
    } else {
      if (currentIndex === 0) { currentIndex = slides.length - 1; } 
      else { currentIndex--; }
    }
    updateSliderPosition();
  }
});

// ==========================================
// 6. INTERACTIVE MENU REVEAL LOGIC
// ==========================================
const viewMenuBtn = document.getElementById('view-menu-btn');
const navMenuLink = document.getElementById('nav-menu-link');
const menuDisplay = document.getElementById('menu-display');

function toggleMenu(event) {
    event.preventDefault(); 
    
    menuDisplay.classList.toggle('active');
    
    if (menuDisplay.classList.contains('active')) {
        viewMenuBtn.innerHTML = 'Close Menu &#10006;';
        viewMenuBtn.style.backgroundColor = '#e74c3c'; 
        viewMenuBtn.style.color = 'white';
        
        menuDisplay.scrollIntoView({ behavior: 'smooth' });
    } else {
        viewMenuBtn.innerHTML = 'View Menu';
        viewMenuBtn.style.backgroundColor = 'white';
        viewMenuBtn.style.color = '#333';
        
        document.querySelector('.cta-section').scrollIntoView({ behavior: 'smooth' });
    }
}

viewMenuBtn.addEventListener('click', toggleMenu);
navMenuLink.addEventListener('click', (e) => {
    if (!menuDisplay.classList.contains('active')) {
        toggleMenu(e);
    } else {
        e.preventDefault();
        menuDisplay.scrollIntoView({ behavior: 'smooth' });
    }
});