var tablinks = document.getElementsByClassName("tablinks");
var tabcontents = document.getElementsByClassName("tabcontents");
function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("activelink");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("activelink");
    document.getElementById(tabname).classList.add("active-tab");
}
var sidemenu = document.getElementById("sidemenu");
function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

// Scroll Worklist Function
function scrollWorklist(direction) {
    const worklist = document.querySelector('.worklist');
    const workItems = document.querySelectorAll('.work');
    
    if (!worklist || workItems.length === 0) return;
    
    // Calculate scroll amount based on work item width + gap
    const workItemWidth = workItems[0].offsetWidth;
    const gap = 40; // gap between items
    const scrollAmount = workItemWidth + gap;
    
    if (direction === 'left') {
        worklist.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'right') {
        worklist.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Update navigation buttons after scroll
    setTimeout(updateNavButtons, 300);
}

// Update Navigation Buttons State
function updateNavButtons() {
    const worklist = document.querySelector('.worklist');
    const leftBtn = document.querySelector('.nav-btn.left');
    const rightBtn = document.querySelector('.nav-btn.right');
    
    if (!worklist || !leftBtn || !rightBtn) return;
    
    // Check if we can scroll left
    if (worklist.scrollLeft <= 0) {
        leftBtn.disabled = true;
        leftBtn.style.display = 'none'; // Hide left button when at start
    } else {
        leftBtn.disabled = false;
        leftBtn.style.display = 'flex';
    }
    
    // Check if we can scroll right
    const maxScroll = worklist.scrollWidth - worklist.clientWidth;
    if (worklist.scrollLeft >= maxScroll - 5) {
        rightBtn.disabled = true;
        rightBtn.style.display = 'none'; // Hide right button when at end
    } else {
        rightBtn.disabled = false;
        rightBtn.style.display = 'flex';
    }
}

// Privacy Banner Functions
function closePrivacyBanner(){
    var banner = document.querySelector('.privacy-banner');
    if(banner){
        banner.style.display = 'none';
        // Store in localStorage so it doesn't show again in this session
        localStorage.setItem('privacyBannerClosed', 'true');
    }
}

// Check if banner should be shown on page load
document.addEventListener('DOMContentLoaded', function() {
    var banner = document.querySelector('.privacy-banner');
    if(banner && localStorage.getItem('privacyBannerClosed') === 'true'){
        banner.style.display = 'none';
    }
    
    // Initialize navigation buttons
    updateNavButtons();
    
    // Add scroll event listener to worklist
    const worklist = document.querySelector('.worklist');
    if (worklist) {
        worklist.addEventListener('scroll', updateNavButtons);
        
        // Center the middle project on page load
        setTimeout(function() {
            centerMiddleProject();
        }, 100);
    }
    
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Function to center the middle project
function centerMiddleProject() {
    const worklist = document.querySelector('.worklist');
    const workItems = document.querySelectorAll('.work');
    
    if (!worklist || workItems.length === 0) return;
    
    // Calculate the center position
    const workItemWidth = workItems[0].offsetWidth;
    const gap = 40;
    const totalWidth = workItems.length * workItemWidth + (workItems.length - 1) * gap;
    const containerWidth = worklist.clientWidth;
    
    // Calculate scroll position to center the middle item
    const middleIndex = Math.floor(workItems.length / 2);
    const scrollToCenter = (middleIndex * workItemWidth + middleIndex * gap) - (containerWidth / 2) + (workItemWidth / 2);
    
    // Smooth scroll to center position
    worklist.scrollTo({
        left: Math.max(0, scrollToCenter),
        behavior: 'smooth'
    });
    
    // Update navigation buttons after centering
    setTimeout(updateNavButtons, 500);
}