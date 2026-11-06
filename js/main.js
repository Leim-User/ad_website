
/*
  ADONAI SERVICES & TP
  Main JavaScript file

  Handles:
  1. Mobile navigation menu
  2. WhatsApp contact
  3. Email contact
  4. Automatic copyright year
  5. Active navigation link
*/

// ==========================================
// 1. WEBSITE CONFIGURATION
// ==========================================

const SITE_CONFIG = {
    whatsappNumber: "237XXXXXXXXX",
    // Example: 237677123456
    // Use international format without +, spaces or dashes.

    emailAddress: "votre-adresse@email.com",

    defaultMessage:
        "Bonjour, je souhaite obtenir des informations sur vos services et discuter d'un projet."
};


// ==========================================
// 2. INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // MOBILE NAVIGATION
    // ======================================

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Fermer le menu" : "Ouvrir le menu"
            );

        });

        // Close menu after clicking a navigation link

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // ======================================
    // WHATSAPP CONTACT
    // ======================================

    const whatsappLink = document.querySelector(".whatsapp-link");

    const whatsappReady =
        /^\d{10,15}$/.test(SITE_CONFIG.whatsappNumber) &&
        !SITE_CONFIG.whatsappNumber.includes("X");

    if (whatsappLink) {

        if (whatsappReady) {

            whatsappLink.href =
                `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.defaultMessage)}`;

            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";

        } else {

            whatsappLink.addEventListener("click", function (event) {

                event.preventDefault();

                alert(
                    "Le numéro WhatsApp du responsable doit encore être ajouté dans js/main.js."
                );

            });

        }

    }


    // ======================================
    // EMAIL CONTACT
    // ======================================

    const emailLink = document.querySelector(".email-link");

    const emailReady =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SITE_CONFIG.emailAddress) &&
        SITE_CONFIG.emailAddress !== "votre-adresse@email.com";

    if (emailLink) {

        if (emailReady) {

            emailLink.href =
                `mailto:${SITE_CONFIG.emailAddress}?subject=${encodeURIComponent("Demande d'information — ADONAI SERVICES & TP")}`;

        } else {

            emailLink.addEventListener("click", function (event) {

                event.preventDefault();

                alert(
                    "L'adresse e-mail du responsable doit encore être ajoutée dans js/main.js."
                );

            });

        }

    }


    // ======================================
    // AUTOMATIC COPYRIGHT YEAR
    // ======================================

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    // ======================================
    // ACTIVE NAVIGATION LINK
    // ======================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navLinks.forEach(function (link) {

                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );

                        });

                    }

                });

            },

            {
                rootMargin: "-35% 0px -55% 0px"
            }

        );

        sections.forEach(function (section) {

            observer.observe(section);

        });

    }

});
