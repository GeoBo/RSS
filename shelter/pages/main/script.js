
import {tns} from '../../assets/tiny-slider/tiny-slider.js';

const slider = tns({
  container: '.our-friends__card-block',
  prevButton: '.our-friends__btn-left',
  nextButton: '.our-friends__btn-right',
  items: 1,
  slideBy: 'page',
  nav: false,
  gutter: 0,
  speed: 600,
  responsive: {
    767: {
        gutter: 30,
        items: 2
    },
    1080: {
        items: 3,
        gutter: 0,
    }
  }
});

document.addEventListener ("DOMContentLoaded", initScroll);

window.addEventListener("load", function () {
    addMenuEvent ();
    addScrollEvent ();
    addModalEvent (); 
});


function addModalEvent () {
    const cardBlock = document.querySelector (".our-friends__card-block");
    const modal = document.querySelector (".modal");
    const closeBtn = document.querySelector (".modal__close-btn");

    const showPet = (e) => {
        if (e.target.closest('div').classList.contains("our-friends__card")) {       
            modal.setAttribute ("aria-hidden", "");
        }
    }

    const hidePet = (e) => {
        if (e.target.classList.contains ("modal")) {
            modal.setAttribute ("aria-hidden", "true");
        } 
    }

    const closeModal = (e) => {
        modal.setAttribute ("aria-hidden", "true");
    }

    cardBlock.addEventListener("click", showPet);
    modal.addEventListener("click", hidePet);
    closeBtn.addEventListener("click", closeModal);  
}

function addScrollEvent () {
    getScrollWidth ();
    window.addEventListener("resize", getScrollWidth);
}

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
    const header = document.querySelector (".header");
    

    const toggleMenu = () => {
        if (header.classList.contains ("menu")) {
            overlay.setAttribute ("aria-hidden", "true");
        } 
        else overlay.setAttribute ("aria-hidden", "");
        
        button.classList.toggle ("active");
        header.classList.toggle ("menu");
        body.classList.toggle ("no-scroll");
    };

    const closeMenuLink = (event) => {
        if (event.target.classList.contains("nav__link")) {
            closeMenu();
        }
    };

    const closeMenu = () => {
        body.classList.remove ("no-scroll");
        button.classList.remove ("active");
        header.classList.remove ("menu");
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
