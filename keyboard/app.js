import keysNames from './assets/js/keys_names.js';

class Keyboard {

  init() {
    let keyboard ;
    let wrapper;
    let keyRow;
    let keyBtn;
    let keyName;
    let display;
    let style;
    let screen;
    let textarea;

    wrapper = document.createElement('div')
    wrapper.classList.add('wrapper');
    
    display = document.createElement('section');
    display.classList.add('display');
    
    screen = document.createElement('div');
    screen.classList.add('screen');

    textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    //textarea.setAttribute("autofocus", "autofocus");
    //textarea.setAttribute("disabled", "disabled");
    // textarea.setAttribute("readonly", "readonly");
    

    textarea.setAttribute("placeholder", "RS Virtual Keyboard\nWindows 10\nen/ru: left ctrl + alt");
    
    screen.append(textarea);   
    display.append(screen);
    wrapper.append(display);
    document.body.append(wrapper);

    keyboard = document.createElement('section');
    keyboard.classList.add('keyboard');
    wrapper.append(keyboard);

    keysNames.forEach(row => {
        keyRow = document.createElement('div');
        keyRow.classList.add('keyRow');
        row.forEach(key => {
            keyBtn = document.createElement('div');
            keyBtn.classList.add('key');
            keyName = Object.keys(key);
            keyBtn.classList.add(keyName);   
            if(key[keyName]) {
                keyBtn.innerHTML = `<span class="en">
                  <span class="caseDown">${key[keyName].en.caseDown}</span>
                  <span class="caseUp hidden">${key[keyName].en.caseUp}</span>
                </span>
                <span class="ru hidden">
                  <span class="caseDown hidden">${key[keyName].ru.caseDown}</span>
                  <span class="caseUp hidden">${key[keyName].ru.caseUp}</span>
                </span>`
            }
            else {
              keyBtn.innerHTML = `<span class="en">
                <span class="caseDown">${keyName}</span>
                <span class="caseUp hidden">${keyName}</span>
              </span>
              <span class="ru hidden">
                <span class="caseDown hidden">${keyName}</span>
                <span class="caseUp hidden">${keyName}</span>
              </span>`
          }
            keyRow.append(keyBtn);
        });
        keyboard.append(keyRow);
    });
    
    style = document.createElement('link');
    style.href = 'style.css';
    style.rel = 'stylesheet';
    document.head.append(style);
    document.title = 'RS Virtual Keyboard';
    this.initListener();
  }

  initListener() {
      let keyboard = document.querySelector('.keyboard');
      let textarea = document.querySelector('.textarea');

      window.addEventListener("keypress", onkeypress);
      window.addEventListener("keydown", onkeydown);
      // textarea.addEventListener("focus", oninput);
      // textarea.addEventListener("blur", oninput);
      // textarea.addEventListener("input", oninput);

      function onkeypress(e){
          //console.log('!!!');
          textarea.focus();
          //e.preventDefault();  
          //if(!e.target.classList.contains('key')) return false;
          //let value = String.fromCharCode(e.keyCode);
          // textarea.textContent += value;
          //let end = textarea.selectionEnd;
          
          //textarea.selectionEnd = end;
      }
      
      function onkeydown(e){
          if(e.keyCode === 8){ // если нажат Backspace 
              let length = textarea.textContent.length;
              textarea.textContent = textarea.textContent.substring(0, length-1);
          }     
      }

      function oninput(e){
        console.log('!!!');
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
  }
}

const vKey = new Keyboard;
vKey.init();

// console.log (keysNames);

// function createKeyboard(st) {  //shift, en, ru

// }