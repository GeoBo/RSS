document.addEventListener ("DOMContentLoaded", initScroll);

window.addEventListener("load", function () {
    addMenuEvent ();
    getScrollWidth ();
    window.addEventListener("resize", getScrollWidth);
});


function getScrollWidth () {
    document.body.style.setProperty (
        "--scrollbar-width",
        `${window.innerWidth - document.body.clientWidth}px`
    );
}

function addMenuEvent () {
    const body = document.querySelector ("body");
    const button = document.querySelector (".header__menu-btn");
    const navList = document.querySelector (".nav__list");
    const overlay = document.querySelector (".overlay");
    const logo = document.querySelector (".logo");

    const toggleMenu = () => {
        if (navList.classList.contains ("open")) {
            overlay.setAttribute ("aria-hidden", "true");
        } 
        else overlay.setAttribute ("aria-hidden", "");

        button.classList.toggle ("active");
        navList.classList.toggle ("open");
        body.classList.toggle ("no-scroll");
        logo.classList.toggle ("top");
    };

    const closeMenuLink = (event) => {
        if (event.target.classList.contains("nav__link")) {
            closeMenu();
        }
    };

    const closeMenu = () => {
        body.classList.remove ("no-scroll");
        button.classList.remove ("active");
        navList.classList.remove ("open");
        logo.classList.remove ("top");
        overlay.setAttribute ("aria-hidden", "true");
    };

    button.addEventListener ("click", toggleMenu);
    navList.addEventListener ("click", closeMenuLink);
    overlay.addEventListener ("click", closeMenu);

    //window.addEventListener("resize", closeMenu);
}

function initScroll () {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (window.location.hash && isChrome) {
      setTimeout(function () {
          let hash = window.location.hash;
          window.location.hash = "";
          window.location.hash = hash;
      }, 300);
  }
}
