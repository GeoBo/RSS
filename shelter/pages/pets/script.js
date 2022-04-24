import {tns} from '../../assets/js/tiny-slider/tiny-slider.js';
//import pets from '../../assets/js/pets.json' assert {type: 'json'};
const url = '../../assets/js/pets.json'; 


document.addEventListener ("DOMContentLoaded", initScroll);

window.addEventListener ("load", function () {
    addMenuEvent ();    
    addResizeEvent ();    
});

let resizeTimer;

function addResizeEvent () {
    window.addEventListener(`resize`, () => {    
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout (()=> {
            createCardBlock ();
            //initSlider ();
            addModalEvent ();   
            fixModalHeight ();
            getScrollWidth ();
            //checkPets ();
        }, 100);
    });    
    let event = new Event("resize");
    window.dispatchEvent(event);
}

function initSlider () {
    const slider = tns ({
        container: '.our-friends__card-block',
        arrowKeys: true,
        //mouseDrag: true,
        controls: false,
        loop: false,
        items: 1,
        slideBy: 'page',
        speed: 600,
        responsive: {
          624: {
              items: 2,
          },
          1279: {
              items: 4,
          }
        }
    });

    initContols (slider);
}

// function checkPets () {
//     let petsColl = document.querySelectorAll ('.our-friends__name');

//     let pets = Array.from (petsColl);
//     let petName = []; 
//     petName = pets.map (pet => pet.textContent);
    
//     //console.log(removeRepeats (petName));
//     return removeRepeats (petName);
// }

// function removeRepeats(arr) {
//     arr = arr.reduce((acc, el) => {
//         acc[el] = (acc[el] || 0) + 1;
//         return acc;
//     }, {})
//     return arr;
// }

function initContols (slider) {
    
    let info = slider.getInfo();
    const controls = document.querySelector ('.pagination');

    const firstButton = controls.querySelector ('.pagination__first');
    const prevButton = controls.querySelector ('.pagination__prev');
    const pageCurrent = controls.querySelector ('.pagination__page');
    const nextButton = controls.querySelector ('.pagination__next');
    const lastButton = controls.querySelector ('.pagination__last');
    
    const updateNav = () => {
        info = slider.getInfo();
        if (pageCurrent.textContent == 1) {
            firstButton.classList.add ('disabled');
            prevButton.classList.add ('disabled');
        }
        else {
            firstButton.classList.remove ('disabled');
            prevButton.classList.remove ('disabled');
        }
        if (pageCurrent.textContent == info.pages) {
            nextButton.classList.add ('disabled');
            lastButton.classList.add ('disabled');
        }
        else {
            nextButton.classList.remove ('disabled');
            lastButton.classList.remove ('disabled');
        }
    };

    pageCurrent.textContent = info.navCurrentIndex + 1;
    updateNav();

    firstButton.addEventListener('click',() => {
        slider.goTo('first');
        info = slider.getInfo();
        pageCurrent.textContent = info.navCurrentIndex + 1;
        updateNav();
    })

    prevButton.addEventListener('click',() => {
        slider.goTo('prev');
        info = slider.getInfo();
        pageCurrent.textContent = info.navCurrentIndex + 1;
        updateNav();
    })

    nextButton.addEventListener('click',() =>{
        slider.goTo('next');
        info = slider.getInfo();
        pageCurrent.textContent = info.navCurrentIndex + 1;
        updateNav();
    })

    lastButton.addEventListener('click',() => {
        slider.goTo('last');
        info = slider.getInfo();
        pageCurrent.textContent = info.navCurrentIndex + 1;
        updateNav();
    });
}


async function createCardBlock () {
    const res = await fetch(url);
    const pets = await res.json();
    document.querySelector ('.our-friends__slider').innerHTML = '';
    const slider = document.querySelector ('.our-friends__slider');
    const cardBlock = document.createElement('div');
    cardBlock.className = 'our-friends__card-block';
    let cardBox = [];
    
    cardBox.length = 48;
    
    const createCard = (data) => {
        const card = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement ('h4');
        const button = document.createElement ('button');
        
        card.className = 'our-friends__card';     
        img.src = `../../assets/images/pets-${data.name.toLowerCase()}.png`;  
        img.className = 'our-friends__img'; 
        title.className = 'our-friends__name';
        title.textContent = data.name;     
        button.className = 'our-friends__button';
        button.textContent = 'Learn more';

        card.append(img);
        card.append(title);
        card.append(button);
        return card;
    }

    for (let i = 0; i < 8; i++) {  //48 питомцев по 6 раз каждый
        cardBox.fill(i,i*6,i*6+6);
    }

    cardBox = sortArray (cardBox);
    cardBox = cardBox.map ( i => createCard (pets[i]) );

    //console.log (cardBox.map (pet => pet.textContent));
    //console.log (removeRepeats (cardBox.map (pet => pet.textContent)));

    let petWrapCount;

    if (window.matchMedia("(max-width: 1279px)").matches) {
        petWrapCount = 3;
    } else {
        petWrapCount = 2;
    }

    for (let i = 0; i < 48 / petWrapCount; i++) {
        const wrap = document.createElement('div');
        wrap.className = 'our-friends__wrap';

        const sliderItem = document.createElement('div');
        sliderItem.className = 'our-friends__slider-item';

        for (let j = i*petWrapCount; j < i*petWrapCount + petWrapCount; j++) {
            //console.log(i, j);
            wrap.append(cardBox[j]);
        }

        sliderItem.append(wrap.cloneNode(true));
        cardBlock.append(sliderItem.cloneNode(true));
    }

    slider.append(cardBlock);
    initSlider ();
}

function sortArray (arr) {
    let res = [];
    let arrCopy = arr.slice();
    let count = 8;  
    let unique;

    if (window.matchMedia("(max-width: 624px)").matches) count = 3;
    else if (window.matchMedia("(max-width: 1279px)").matches) count = 6;

    const singleSort = () => {
        let temp = arrCopy.slice(0, count);  //8, 6, 3 от размера экрана
        if ([...new Set (temp)].length === count) { 
           res = res.concat(arrCopy.splice(0, count));
        }
        else shuffle (arrCopy);
    }

    while (arrCopy.length !== 0) {
        singleSort ();

        unique = [...new Set (arrCopy)].length;
        if (unique < count && unique != 0) {
            arrCopy = arr.slice();
            res = [];
        }
    }
    return res;
}

function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

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
