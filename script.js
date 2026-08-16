// Animate skill bars
const bars = document.querySelectorAll(".progress");

function animateSkills() {
    bars.forEach(bar => {
        const width = bar.getAttribute("data-width");
        const rect = bar.getBoundingClientRect();

        if (rect.top < window.innerHeight - 50) {
            bar.style.width = width;
        }
    });
}

window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);


// ===== Typing Effect =====
const typingSpan = document.querySelector(".typing");

const text = "Data Analyst";
let index = 0;
let isDeleting = false;

const typingSpeed = 150;
const deletingSpeed = 80;
const waitAfterFinish = 1000;
const waitAfterDelete = 500;

function typeLoop() {
    if (!typingSpan) return;

    if (!isDeleting) {
        typingSpan.textContent = text.substring(0, index + 1);
        index++;

        if (index === text.length) {
            isDeleting = true;
            setTimeout(typeLoop, waitAfterFinish);
            return;
        }

        setTimeout(typeLoop, typingSpeed);
    } else {
        typingSpan.textContent = text.substring(0, index - 1);
        index--;

        if (index === 0) {
            isDeleting = false;
            setTimeout(typeLoop, waitAfterDelete);
            return;
        }

        setTimeout(typeLoop, deletingSpeed);
    }
}

window.addEventListener("DOMContentLoaded", typeLoop);

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });
}