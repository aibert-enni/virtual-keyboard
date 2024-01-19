/* eslint-disable quote-props */
/* eslint-disable object-property-newline */
/* eslint-disable no-dupe-keys */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
// /* eslint-disable no-underscore-dangle */
// function createElement(elementName, className) {
//   const element = document.createElement(elementName);
//   element.classList.add(...className.split(' '));
//   return element;
// }

// function createKeyButton(keyClassName, keySymbol, keyUpperSymbol) {
//   const key = createElement('div', keyClassName);
//   const mainSymbol = createElement('p', `key-${keySymbol} main-symbol`);
//   const secondSymbol = createElement('p', `key-${keyUpperSymbol} second-symbol`);
//   key.append(mainSymbol, secondSymbol);
//   mainSymbol.textContent = keySymbol;
//   secondSymbol.textContent = keyUpperSymbol;
//   return key;
// }

// const body = document.querySelector('body');

// const wrapper = createElement('div', 'container');
// body.prepend(wrapper);

// const textBox = createElement('textarea', 'textBox');
// wrapper.append(textBox);

// const keyboard = createElement('div', 'keyboard');
// wrapper.append(keyboard);

const keyboard = {
  elements: {
    wrapper: null,
    main: null,
    textArea: null,
    keysContainer: null,
  },
  properties: {
    shift: false,
    capslock: false,
    control: false,
    language: null,
    keyLayout: {
      'english': [
        ['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['backspace', ''],
        ['tab', ''], ['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|'], ['del', 'delete'],
        ['capslock', ''], ['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ["'", '"'], ['enter', ''],
        ['shift', ''], ['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?'], ['↑', 'arrowup'], ['Shift', ''],
        ['ctrl', 'control'], ['win', ''], ['alt', ''], ['spacebar', ''], ['alt', ''], ['ctrl', ''], ['←', 'arrowleft'], ['↓', 'arrowdown'], ['→', 'arrowright'],
      ],
      'russian': [
        ['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+'], ['backspace', ''],
        ['tab', ''], ['й', 'Й'], ['ц', 'Ц'], ['у', 'У'], ['к', 'К'], ['е', 'Е'], ['н', 'Н'], ['г', 'Г'], ['ш', 'Ш'], ['щ', 'Щ'], ['з', 'З'], ['х', 'Х'], ['ъ', 'Ъ'], ['\\', '|'], ['del', 'delete'],
        ['capslock', ''], ['ф', 'Ф'], ['ы', 'Ы'], ['в', 'В'], ['а', 'А'], ['п', 'П'], ['р', 'р'], ['о', 'О'], ['л', 'Л'], ['д', 'Д'], ['ж', 'Ж'], ['э', 'Э'], ['enter', ''],
        ['shift', ''], ['я', 'Я'], ['ч', 'Ч'], ['с', 'С'], ['м', 'М'], ['и', 'И'], ['т', 'Т'], ['ь', 'Ь'], ['б', 'Б'], ['ю', 'Ю'], ['/', '?'], ['↑', 'arrowup'], ['Shift', ''],
        ['ctrl', 'control'], ['win', ''], ['alt', ''], ['spacebar', ''], ['alt', ''], ['ctrl', ''], ['←', 'arrowleft'], ['↓', 'arrowdown'], ['→', 'arrowright'],
      ],
    },
  },
  init() {
    // set Language from local storage
    if (localStorage.length < 1) localStorage.setItem('language', 'english');
    this.properties.language = localStorage.getItem('language');

    // create elements
    this.elements.wrapper = this._createElement('div', 'container');
    this.elements.textArea = this._createElement('textarea', 'textBox');
    this.elements.main = this._createElement('div', 'keyboard');

    // add to dom
    this.elements.wrapper.appendChild(this.elements.textArea);
    document.body.prepend(this.elements.wrapper);

    // functions
    this._keyBoardListener();
    this._createKeys(this.properties.language);
  },

  _createElement(elementName, className) {
    const element = document.createElement(elementName);
    element.classList.add(...className.split(' '));
    return element;
  },

  _createKeys(language) {
    this.elements.keysContainer = this._createElement('div', 'keyboard__keys');
    this.elements.wrapper.appendChild(this.elements.main).appendChild(this.elements.keysContainer);
    const fragment = document.createDocumentFragment();

    this.properties.keyLayout[language].forEach((keyPair) => {
      const key = keyPair[0];
      const keyElement = document.createElement('button');
      const insertLineBreak = ['backspace', 'del', 'enter', 'Shift', 'shiftRight'].indexOf(key) !== -1;

      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.textContent = key;
      keyElement.classList.add(`key-${key}`, `key-${keyPair[1]}`);

      keyElement.addEventListener('click', () => {
        keyElement.animate([{ boxShadow: '0 5px #666', transform: 'translateY(4px)' }], { duration: 100 });
      });

      switch (key) {
        case 'backspace':
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent = this.elements.textArea.textContent.substring(0, this.elements.textArea.textContent.length - 1);
          });
          break;
        case 'capslock':
          keyElement.addEventListener('click', () => {
            this._toogleCapsLock();
          });
          break;
        case 'tab':
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent += '    ';
          });
          break;
        case 'ctrl':
          keyElement.addEventListener('click', () => {
            this.properties.control = !this.properties.control;
          });
          break;
        case 'enter':
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent += '\n';
          });
          break;
        case 'shift':
          keyElement.addEventListener('click', () => {
            this.properties.shift = !this.properties.shift;
          });
          break;
        case 'del':
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent = '';
          });
          break;
        case 'spacebar':
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent += ' ';
          });
          break;
        case 'alt':
          keyElement.addEventListener('click', () => {
            this._shiftHotkeys(key);
          });
          break;
        default:
          keyElement.addEventListener('click', () => {
            this.elements.textArea.textContent += this.properties.capslock ? keyPair[1] : key;
            if (this.properties.shift) this.properties.shift = false;
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (insertLineBreak) fragment.appendChild(document.createElement('br'));
    });

    this.elements.keysContainer.appendChild(fragment);
  },

  _keyBoardListener() {
    const body = document.querySelector('body');
    body.addEventListener('keydown', (event) => {
      this.elements.textArea.focus();
      const element = document.getElementsByClassName(`key-${event.key.toLowerCase()}`)[0];
      element.click();
      if (event.key === 'shift') {
        this.properties.shift = true;
        this._shiftHotkeys();
      }
    });
  },

  _toogleCapsLock() {
    this.properties.capslock = !this.properties.capslock;
  },

  _shiftHotkeys(key) {
    if (this.properties.shift) {
      if (key === 'alt') {
        this.properties.language = this.properties.language === 'english' ? 'russian' : 'english';
        localStorage.setItem('language', this.properties.language);
        this.elements.keysContainer.remove();
        this._createKeys(this.properties.language);
      }
    }
    this.properties.shift = false;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// let isShift = false;
// let isCapslock = false;
// let isControl = false;
// const languages = ['english', 'russian'];

// function buttonInteraction(button) {
//   switch (button.firstChild.textContent) {
//     case 'Spacebar':
//       button.addEventListener('click', () => {
//         textBox.textContent += ' ';
//       });
//       break;
//     case 'Shift':
//       button.addEventListener('click', () => {
//         isShift = !isShift;
//       });
//       break;
//     case 'CapsLock':
//       button.addEventListener('click', () => {
//         isCapslock = !isCapslock;
//       });
//       break;
//     case 'Tab':
//       button.addEventListener('click', () => {
//         textBox.textContent += '    ';
//       });
//       break;
//     case 'Control':
//       button.addEventListener('click', () => {
//         isControl = !isControl;
//       });
//       break;
//     case 'Alt':
//       button.addEventListener('click', () => {
//         if (isShift === true) {
//           la
//         }
//       });
//     default:
//       break;
//   }
// }

// const keys = [
//   // eslint-disable-next-line indent
//     [[ '`', '~'], [ '1', '!'], [ '2', '@'], [ '3', '#'], [ '4', '$'], [ '5', '%'], [ '6', '^'], [ '7', '&'], [ '8', '*'], [ '9', '('], [ '0', ')'], [ '-', '_'], [ '=', '+'], [ 'Backspace', '']],
//   [[ 'Tab', ''], [ 'q', 'Q'], [ 'w', 'W'], [ 'e', 'E'], [ 'r', 'R'], [ 't', 'T'], [ 'y', 'Y'], [ 'u', 'U'], [ 'i', 'I'], [ 'o', 'O'], [ 'p', 'P'], [ '[', '{'], [ ']', '}'], [ 'Del', '']],
//   [[ 'CapsLock', ''], [ 'a', 'A'], [ 's', 'S'], [ 'd', 'D'], [ 'f', 'F'], [ 'g', 'G'], [ 'h', 'H'], [ 'j', 'J'], [ 'k', 'K'], [ 'l', 'L'], [ ';', ':'], [ "'", '"'], [ 'Enter', '']],
//   [[ 'Shift', '', 'Shift'], [ 'z', 'Z'], [ 'x', 'X'], [ 'c', 'C'], [ 'v', 'V'], [ 'b', 'B'], [ 'n', 'N'], [ 'm', 'M'], [ ',', '<'], [ '.', '>'], [ '/', '?'], [ '↑', '', 'ArrowUp'], [ 'Shift', '', 'Shift']],
//   [[ 'Ctrl', '', 'Control'], [ 'Win', '', 'Win'], [ 'Alt', '', 'Alt'], [ 'Spacebar', '', 'Spacebar'], [ 'Alt', '', 'Alt'], [ 'Ctrl', '', 'Control'], [ '←', '', 'ArrowLeft'], [ '↓', '', 'ArrowDown'], [ '→', '', 'ArrowRight']],
// ];

// for (let i = 0; i < keys.length; i += 1) {
//   const line = createElement('div', `line-${i + 1} line`);
//   keyboard.append(line);
//   for (let l = 0; l < keys[i].length; l += 1) {
//     const element = keys[i][l];
//     let button;
//     if (element.length > 3) {
//       button = createKeyButton(`key-${element[3]} ${element[0]}-key key`, element[1], element[2]);
//     } else {
//       button = createKeyButton(`${element[0]}-key key`, element[1], element[2]);
//     }
//     button.addEventListener('click', () => {
//       textBox.textContent += button.firstChild.textContent;
//     });
//     line.append(button);
//   }
// }

// const keysElements = document.getElementsByClassName('key');

// [...keysElements].forEach((element) => {
//   element.addEventListener('click', () => {
//     element.animate([{ boxShadow: '0 5px #666', transform: 'translateY(4px)' }], { duration: 100 });
//   });
// });

// body.addEventListener('keydown', (event) => {
//   const element = document.getElementsByClassName(`key-${event.key}`)[0];

//   // press animation
//   if (event.key == ' ') {
//     document.getElementsByClassName('key-Spacebar')[0].animate([{ boxShadow: '0 5px #666', transform: 'translateY(4px)' }], { duration: 100 });
//   } else if (element.classList.contains('function-key')) {
//     element.animate([{ boxShadow: '0 5px #666', transform: 'translateY(4px)' }], { duration: 100 });
//   } else {
//     element.parentElement.animate([{ boxShadow: '0 5px #666', transform: 'translateY(4px)' }], { duration: 100 });
//   }
// });
