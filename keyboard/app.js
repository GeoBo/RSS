import keysNames from './assets/js/keys_names.js';

class Keyboard {

  constructor (lang = 'en') {
    this.lang = lang;
  }

  init() {
    let keyboard ;
    let wrapper;
    let keyRow;
    let keyBtn;
    let keyName;
    let display;
    let screen;
    let textarea;
    let frame;
  
    wrapper = document.createElement('div')
    wrapper.classList.add('wrapper');
    
    display = document.createElement('section');
    display.classList.add('display');
    
    screen = document.createElement('div');
    screen.classList.add('screen');

    frame = document.createElement('div');
    frame.classList.add('frame');

    textarea = document.createElement('textarea');
    textarea.classList.add('textarea');
    textarea.setAttribute("spellcheck", "false");
    textarea.setAttribute("placeholder", "RSS Virtual Keyboard\nWindows 10\nen/ru: left ctrl + alt");
    
    frame.append(textarea);   
    screen.append(frame);   
    display.append(screen);
    wrapper.append(display);
    document.body.prepend(wrapper);

    keyboard = document.createElement('section');
    keyboard.classList.add('keyboard');
    wrapper.append(keyboard);

    this.lang = getLocalStorage ();

    keysNames.forEach(row => {
        keyRow = document.createElement('div');
        keyRow.classList.add('keyRow');
        row.forEach(key => {
            keyBtn = document.createElement('div');
            keyBtn.classList.add('key');
            keyName = Object.keys(key)[0];
            keyBtn.classList.add(keyName);   
            if(this.lang == 'en') {
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
              keyBtn.innerHTML = `<span class="en hidden">
                <span class="caseDown hidden">${key[keyName].en.caseDown}</span>
                <span class="caseUp hidden">${key[keyName].en.caseUp}</span>
              </span>
              <span class="ru">
                <span class="caseDown">${key[keyName].ru.caseDown}</span>
                <span class="caseUp hidden">${key[keyName].ru.caseUp}</span>
              </span>`
          }
            keyRow.append(keyBtn);
        });
        keyboard.append(keyRow);
    });
    
    function getLocalStorage () {
        if (localStorage.getItem ('lang')) {
            return localStorage.getItem ('lang');
        }
        else return 'en';
    }
 
    this.initListener();
  }

  initListener() {  
    const activeKeys = {};
    let keyboard = document.querySelector('.keyboard');
    let textarea = document.querySelector('.textarea');  
    let lang = this.lang;
    let letterCase = 'caseDown';
    let lastMouseDown;
    let allKeys = keyboard.querySelectorAll('.key');
    let noRepeatKeys = ['ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft','CapsLock'];

    window.addEventListener ('keydown', (e) => {keyDown(e)});
    window.addEventListener ('keyup', (e) => {keyUp(e)});
    keyboard.addEventListener ('mousedown', (e) => {mouseRepeater(e)});
    keyboard.addEventListener ('mouseup', (e) => {mouseUp(e)});
    window.addEventListener('beforeunload', setLocalStorage);

    let intervalRepeat;
    let timeoutRepeat;

    function mouseRepeater(e) {
        let keyBtn;
        let btnCode;

        if(e.which != 1) return;
        keyBtn = e.target;
        
        if (!keyBtn.classList.contains('key')) keyBtn = keyBtn.closest('.key');
        if (!keyBtn || !keyBtn.classList.contains('key')) return false;
             
        btnCode = keyBtn.className.split(' ').find(i => i != 'key'&& i != 'active');        

        if (btnCode in activeKeys) return;
        activeKeys[btnCode] = true;
        
        lastMouseDown = btnCode;
        mouseDown (e, keyBtn, btnCode);
        
        if(noRepeatKeys.includes(btnCode)) return;
        timeoutRepeat = setTimeout (function (e) {
            intervalRepeat = setInterval (function (e) {
                mouseDown (e, keyBtn, btnCode);
            }, 50);
        }, 500);      
    }
 
    function keyDown (e) {
        let key;
        let btnText;

        if (e.code in activeKeys && noRepeatKeys.includes(e.code)) return;
		activeKeys[e.code] = true;
        
		key = keyboard.querySelector(`.${e.code}`);
		if (!key) return;

        e.preventDefault(); //Только для нарисованных клавиш
		if (e.code == "CapsLock") key.classList.toggle ('active');
        else key.classList.add ('active');		
		textarea.focus();
		if ("ControlLeft" in activeKeys && "AltLeft" in activeKeys) { //Смена языка
			if (lang == 'en') lang = 'ru';
			else lang = 'en';	
            
            changeBtn ();
		}
		else if (e.code == "ShiftLeft" || e.code == "ShiftRight" || e.code == "CapsLock") {
            if (letterCase == 'caseDown') letterCase = 'caseUp';
            else letterCase = 'caseDown';     
            changeBtn ();
        }
        else if (e.code == "Backspace") {
            removeText ();
        }
        else if (e.code == "Delete") {
            removeText ('right');
        }
        else if (e.code == "Enter") {
            insertText ('\n');
        }
        else if (e.code == "Tab") {
            //insertText ('\t');
            insertText ('    ');
        }
        else if (e.code == "Space") {
            insertText (' ');
        }
        else if (e.code == "ControlLeft" || e.code == "ControlRight" || e.code == "MetaLeft" ||
                 e.code == "AltLeft" || e.code == "AltRight") {
            return;
        }
        else if (e.code == "ArrowLeft" || e.code == "ArrowRight" ||
                 e.code == "ArrowUp" || e.code == "ArrowDown") {
            moveCursor (e.code);
            textarea.focus();
        }
        else {
            btnText = key.querySelector('span :not(.hidden)').textContent;
            insertText (btnText);
        }	
    }

    function keyUp (e) {
        let key;

        delete activeKeys[e.code];
		key = keyboard.querySelector(`.${e.code}`);

		if (key && e.code != "CapsLock") key.classList.remove ('active');
		
		if(e.code == "ShiftLeft" || e.code == "ShiftRight") { //смена регистра
			if (letterCase == 'caseDown') letterCase = 'caseUp';
			else letterCase = 'caseDown';
            changeBtn ();       
		}
    }

    function changeBtn () {
        let langs;
        let letters;
        console.log(lang);
        allKeys.forEach (keyBtn => {               
            langs = [...keyBtn.children];
            if(!langs || !langs.length) return;
            langs.forEach (langItem => {
                if (langItem.classList.contains (lang)) {
                    langItem.classList.remove ('hidden');
                    letters = [...langItem.children];
                    letters.forEach (letter => {
                        if (letter.classList.contains (letterCase)) letter.classList.remove ('hidden');
                        else letter.classList.add ('hidden');
                    })
                }
                else {
                    langItem.classList.add ('hidden');
                    letters = [...langItem.children];
                    letters.forEach (letter => {
                        letter.classList.add ('hidden');
                    })
                }
            });	
        });
    }

    function mouseUp (e) {	
        if(e.which != 1) return;
        if(lastMouseDown) delete activeKeys[lastMouseDown];  
        if (lastMouseDown == "ShiftLeft" || lastMouseDown == "ShiftRight") {
            if (letterCase == 'caseDown') letterCase = 'caseUp';
            else letterCase = 'caseDown';       
            changeBtn ();
        }        
        textarea.focus();
        clearTimeout(timeoutRepeat);
        clearInterval(intervalRepeat);
    }

    function mouseDown (e, keyBtn, btnCode) {		
        let btnText;
        textarea.focus();
        if (btnCode == "Backspace") {
            removeText ();
        }
        else if (btnCode == "Delete") {
            removeText ('right');
        }
        else if (btnCode == "Enter") {
            insertText ('\n');
        }
        else if (btnCode == "Tab") {
            //insertText ('\t');
            insertText ('    ');
        }
        else if (btnCode == "Space") {
            insertText (' ');
        }
        else if (btnCode == "ShiftLeft" || btnCode == "ShiftRight" || btnCode == "CapsLock") {
            if (letterCase == 'caseDown') letterCase = 'caseUp';
            else letterCase = 'caseDown';
            
            if(btnCode == "CapsLock") keyBtn.classList.toggle('active');
            changeBtn ();
        }
        else if (btnCode == "ControlLeft" || btnCode == "ControlRight" || btnCode == "MetaLeft" ||
                 btnCode == "AltLeft" || btnCode == "AltRight") {
            return;
        }
        else if (btnCode == "ArrowLeft" || btnCode == "ArrowRight" 
        || btnCode == "ArrowUp" || btnCode == "ArrowDown") {
            moveCursor (btnCode);
        }
        else {
            btnText = keyBtn.querySelector('span :not(.hidden)').textContent;
            insertText (btnText);
        }
    }

    function getStrWithEnters () {	
        //textarea.style.whiteSpace = "normal"; 
        if (textarea.wrap) {
            textarea.setAttribute("wrap", "off");
        }
        else {
            textarea.setAttribute("wrap", "off");
            let newArea = textarea.cloneNode (true);
            newArea.value = textarea.value;
            textarea.parentNode.replaceChild (newArea, textarea);
            textarea = newArea;
        }
    
        let strRawValue = textarea.value;
        textarea.value = "";
        let nEmptyWidth = textarea.scrollWidth;
    
        function testBreak (strTest) {
            textarea.value = strTest;
            return textarea.scrollWidth > nEmptyWidth;
        }
        
        function findNextBreakLength (strSource, nLeft, nRight) {
            let nCurrent;
            if (typeof(nLeft) == 'undefined') {
                nLeft = 0;
                nRight = -1;
                nCurrent = 64;
            }
            else {
                if (nRight == -1)
                    nCurrent = nLeft * 2;
                else if (nRight - nLeft <= 1)
                    return Math.max(2, nRight);
                else
                    nCurrent = nLeft + (nRight - nLeft) / 2;
            }
            let strTest = strSource.substr(0, nCurrent);
            let bLonger = testBreak(strTest);
            if(bLonger)
                nRight = nCurrent;
            else
            {
                if(nCurrent >= strSource.length)
                    return null;
                nLeft = nCurrent;
            }
            return findNextBreakLength(strSource, nLeft, nRight);
        }
    
        let i = 0, j;
        let strNewValue = "";
        while (i < strRawValue.length) {
            let breakOffset = findNextBreakLength(strRawValue.substr(i));
            if (breakOffset === null) {
                strNewValue += strRawValue.substr(i);
                break;
            }
            let nLineLength = breakOffset - 1;
            for (j = nLineLength - 1; j >= 0; j--) {
                let curChar = strRawValue.charAt(i + j);
                if (curChar == ' ' || curChar == '-' || curChar == '+') {
                    nLineLength = j + 1;
                    break;
                }
            }
            strNewValue += strRawValue.substr(i, nLineLength) + "\n";
            i += nLineLength;
        }
        
        textarea.value = strNewValue;
        textarea.setAttribute("wrap", "");
        return strNewValue;
    }

    function moveCursor (direction) {
        let start;
        let end; 
        start = textarea.selectionStart;
        end = textarea.selectionEnd;    
        if (direction == "ArrowLeft" ) {
            if(start != end) textarea.selectionEnd = start
            else if(end) textarea.selectionEnd = end -1;         
        }
        else if(direction == "ArrowRight" ) {
            if(start != end) textarea.selectionStart = end;
            else if(start < textarea.value.length) textarea.selectionStart = start +1;
        }
        else if(direction == "ArrowDown" ) {          
            cursorDown ();
        }
        else if(direction == "ArrowUp" ) {          
            cursorUp ();
        }
        //textarea.style.whiteSpace = "break-spaces";
    }    

    function cursorDown(){
        let posEnters; 
        let posCursor = textarea.selectionEnd;
        let posCursorNew;
        let lenNextMax; 
        let prevTextLen = textarea.value.length; 
        let valueWithBreaks = getStrWithEnters ();  //Символов становится больше
        posCursor += valueWithBreaks.length - prevTextLen;

        posEnters = Array.from(valueWithBreaks.split('').entries()).filter(i => i[1] == "\n").map(i => i[0]);
        if (!posEnters || !posEnters.length) {
            [textarea.selectionStart, textarea.selectionEnd] = [posCursor,posCursor];
            return;
        }
  
        textarea.focus();
        for (let i = posEnters.length -1; i >= -1; i--) { //последня строка не интересует        
            if (i == -1) {         
                posCursorNew =  posCursor + (posEnters[i+1] || 0) + 1;
                lenNextMax = posEnters[i+2];  
                
                if(posCursorNew > lenNextMax) posCursorNew = lenNextMax;
                [textarea.selectionStart, textarea.selectionEnd] = [posCursorNew,posCursorNew];
            }
            else if (posEnters[i] < posCursor ) {
                if(!posEnters[i+1]) { 
                    [textarea.selectionStart, textarea.selectionEnd] = [posCursor,posCursor]
                    return;
                }
                posCursorNew = posCursor - posEnters[i] + posEnters[i+1]; //нужно учесть символы переноса i
                lenNextMax = posEnters[i+2]; 
                if (posCursorNew > lenNextMax) posCursorNew = lenNextMax;
                [textarea.selectionStart, textarea.selectionEnd] = [posCursorNew,posCursorNew];
                return;
            }	
        }
    }

    function cursorUp(){
        let posEnters; 
        let posCursor = textarea.selectionEnd;
        let posCursorNew;
        let lenPrevMax; 
        let prevTextLen = textarea.value.length;
        let valueWithBreaks = getStrWithEnters ();
        posCursor += valueWithBreaks.length - prevTextLen;

        posEnters = Array.from(valueWithBreaks.split('').entries()).filter(i => i[1] == "\n").map(i => i[0]);
        if (!posEnters || !posEnters.length) {
            [textarea.selectionStart, textarea.selectionEnd] = [posCursor,posCursor];
            return;
        }
  
        for (let i = 0; i <= posEnters.length; i++) { //последня строка не интересует        
            if (i == posEnters.length) {         
                if (i == 1) posCursorNew =  posCursor - posEnters[i-1] + (posEnters[i-2] || 0) -1;
                else posCursorNew = posCursor - posEnters[i-1] + (posEnters[i-2] || 0); 
                lenPrevMax = posEnters[i-1];  
                if(posCursorNew > lenPrevMax) posCursorNew = lenPrevMax;
                [textarea.selectionStart, textarea.selectionEnd] = [posCursorNew,posCursorNew]
            }
            else if (posEnters[i] >= posCursor ) {
                if(!posEnters[i-1]) {
                    [textarea.selectionStart, textarea.selectionEnd] = [posCursor,posCursor];
                    return;
                }
                if (i == 1) posCursorNew = posCursor - posEnters[i-1] + (posEnters[i-2] || 0) -i; 
                else posCursorNew = posCursor - posEnters[i-1] + (posEnters[i-2] || 0); 
                lenPrevMax = posEnters[i-1]; 
                if(posCursorNew > lenPrevMax) posCursorNew = lenPrevMax;
                [textarea.selectionStart, textarea.selectionEnd] = [posCursorNew,posCursorNew];
                return;
            }	
        }
    }

    function removeText (direction = 'left') {
        let start;
        let end; 
        let beforeSelection;
        let afterSelection;
        start = textarea.selectionStart;
        end = textarea.selectionEnd;    

        if (start == end) {
            if (direction == 'left') start--;
            else end++;
        }

        beforeSelection = textarea.value.substring(0, start);
        afterSelection = textarea.value.substring(end);
        textarea.value = beforeSelection + afterSelection;
        if (!end) return;
        if (start == end) {
            textarea.selectionEnd = end - 1;
        }
        else {
            textarea.selectionEnd = start;
        }
    }

    function insertText (text) {
        const start = textarea.selectionStart;
        const beforeSelection = textarea.value.substring(0, start);
        const end = textarea.selectionEnd;
        const afterSelection = textarea.value.substring(end);
        textarea.value = beforeSelection + text + afterSelection;
        if (start == end) {
            textarea.selectionEnd = end + text.length; //Сместить на длину вставки
        }
        else textarea.selectionEnd = end;
    }
    
    function setLocalStorage() {
        localStorage.setItem ('lang', lang);
    }
  }
}

const vKey = new Keyboard();
vKey.init();