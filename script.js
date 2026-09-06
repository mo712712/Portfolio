/* =========================================================
   SELECTORS
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const navContent =
    document.getElementById("navContent");

const navLinks =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("main section[id]");

const revealElements =
    document.querySelectorAll(".reveal");

const progressBars =
    document.querySelectorAll(".skill-progress-value");


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

    if (!menuButton || !navContent) {
        return;
    }

    navContent.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton.innerHTML =
        '<i class="fa-solid fa-xmark"></i>';
}


function closeMenu() {

    if (!menuButton || !navContent) {
        return;
    }

    navContent.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.innerHTML =
        '<i class="fa-solid fa-bars"></i>';
}


if (menuButton && navContent) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navContent.classList.contains("open");

            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }
        }
    );
}


/* =========================================================
   CLOSE NAV AFTER CLICK
========================================================= */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (window.innerWidth <= 880) {

                closeMenu();

            }
        }
    );
});


/* =========================================================
   RESET NAV ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 880) {

            closeMenu();

        }
    }
);


/* =========================================================
   REVEAL ELEMENTS
========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(
                                entry.target
                            );
                    }
                }
            );
        },

        {
            threshold: 0.1,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );
    }
);


/* =========================================================
   SKILLS PROGRESS - RUN ONCE
========================================================= */

const skillsObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(
                entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const bar =
                        entry.target;

                    const progress =
                        bar.getAttribute(
                            "data-progress"
                        );

                    if (!progress) {
                        return;
                    }

                    /* Set final percentage */
                    bar.style.width =
                        progress + "%";

                    /* Stop observing after first animation */
                    observer.unobserve(bar);
                }
            );
        },

        {
            threshold: 0.25
        }
    );


progressBars.forEach(
    bar => {

        /* Start from zero */
        bar.style.width = "0%";

        skillsObserver.observe(
            bar
        );
    }
);


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

function updateActiveNavigation() {

    const currentPosition =
        window.scrollY + 160;

    let activeSection = "";

    sections.forEach(
        section => {

            const top =
                section.offsetTop;

            const bottom =
                top +
                section.offsetHeight;

            if (
                currentPosition >= top &&
                currentPosition < bottom
            ) {

                activeSection =
                    section.id;
            }
        }
    );


    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute("href") ===
                `#${activeSection}`
            ) {

                link.classList.add(
                    "active"
                );
            }
        }
    );
}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            id
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const header =
                        document.querySelector(
                            ".header"
                        );

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"
                    });
                }
            );
        }
    );


/* =========================================================
   INITIAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateActiveNavigation();

    }
);


/* =========================================================
   DATA ANALYST TYPEWRITER
========================================================= */

const typingRole =
    document.getElementById("typingRole");

const roleText =
    "Data Analyst";

let roleIndex = 0;

let isDeleting = false;


function typeRole() {

    if (!typingRole) {
        return;
    }

    if (!isDeleting) {

        typingRole.textContent =
            roleText.substring(
                0,
                roleIndex + 1
            );

        roleIndex++;

        if (
            roleIndex ===
            roleText.length
        ) {

            isDeleting = true;

            setTimeout(
                typeRole,
                1600
            );

            return;
        }

        setTimeout(
            typeRole,
            110
        );

    } else {

        typingRole.textContent =
            roleText.substring(
                0,
                roleIndex - 1
            );

        roleIndex--;

        if (roleIndex === 0) {

            isDeleting = false;

            setTimeout(
                typeRole,
                500
            );

            return;
        }

        setTimeout(
            typeRole,
            65
        );
    }
}


setTimeout(
    typeRole,
    500
);