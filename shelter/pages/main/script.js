
import {tns} from '../../assets/js/tiny-slider/tiny-slider.js';
//import pets from '../../assets/js/pets.json' assert {type: 'json'};
const url = '../../assets/js/pets.json'; 

// async function getData() {
//     const res = await fetch(url);
//     const data = await res.json();
//     //console.log(data);
//     return data;
// }

//let pets = getData();

const slider = tns({
  container: '.our-friends__card-block',
  prevButton: '.our-friends__btn-left',
  nextButton: '.our-friends__btn-right',
  items: 1,
  slideBy: 'page',
  arrowKeys: true,
  nav: false,
  gutter: 0,
  speed: 400,
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
    window.addEventListener(`resize`, fixModalHeight); 
});


function fixModalHeight () {
    const modalWindow = document.querySelector('.modal__window');
    const modalContent = document.querySelector('.modal__content');
    const modalWrapper = document.querySelector('.modal__wrapper');
    const contentPadding = 20;
    const contentHeight = modalContent.offsetHeight;
    modalWindow.style.height = '';
    if (modalWrapper.offsetHeight < contentHeight - 6) modalWindow.style.height = contentHeight + contentPadding +'px';
}


async function addModalEvent () {

    const res = await fetch(url);
    const pets = await res.json();

    const body = document.querySelector ("body");
    const cardBlock = document.querySelector (".our-friends__card-block");
    const modal = document.querySelector (".modal");
    const closeBtn = document.querySelector (".modal__close-btn");

    const showPet = (e) => {
        const petCard = e.target.closest('div');
        if (petCard.classList.contains("our-friends__card")) {       
            const petName = petCard.querySelector('.our-friends__name').textContent;
            const pet = getPetInfo (petName);
            updateModal(pet);
            modal.setAttribute ("aria-hidden", "");
            fixModalHeight ();
            body.classList.add ("scroll-off");
            document.documentElement.classList.add ("scroll-off");
        }
    }

    const updateModal = (data) => {
        const img = modal.querySelector (".modal__img");
        const title = modal.querySelector (".modal__title");
        const subtitle = modal.querySelector (".modal__subtitle");
        const desc = modal.querySelector (".modal__desc");
        const list = modal.querySelector (".modal__list");

        img.src = `../../assets/images/pets-${data.name.toLowerCase()}.png`;
        title.textContent = data.name;
        subtitle.textContent = `${data.type} - ${data.breed}`;
        desc.textContent = data.description;
        list.innerHTML = `<li class="modal__item"><b>Age:</b> ${data.age}</li>
                          <li class="modal__item"><b>Inoculations:</b> ${data.inoculations.join(', ')}</li>
                          <li class="modal__item"><b>Diseases:</b> ${data.diseases.join(', ')}</li>
                          <li class="modal__item"><b>Parasites:</b> ${data.parasites.join(', ')}</li>`;
    }

    const getPetInfo = (name) => {
        return pets.filter (pet => pet['name'] == name)[0];
    }

    const hidePet = (e) => {
        if (e.target.classList.contains ("modal")) {         
            modal.setAttribute ("aria-hidden", "true");
            body.classList.remove ("scroll-off");
            document.documentElement.classList.remove ("scroll-off");
        } 
    }

    const closeModal = (e) => {
        modal.setAttribute ("aria-hidden", "true");
        body.classList.remove ("scroll-off");
        document.documentElement.classList.remove ("scroll-off");
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

    let testDiv = document.createElement('div');
    testDiv.style.overflowY = 'scroll';
    testDiv.style.width = '50px';
    testDiv.style.height = '50px';
    document.body.append(testDiv);
    let scrollWidth = testDiv.offsetWidth - testDiv.clientWidth;
    testDiv.remove();

    document.documentElement.style.setProperty (
        "--scrollbar-width",
        `${scrollWidth}px`
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
