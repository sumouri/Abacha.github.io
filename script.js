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
});