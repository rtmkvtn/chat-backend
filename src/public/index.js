const loginButton = document.querySelector('.nav__button');
const messagesArea = document.querySelector('.messages-area');
const postButton = document.querySelector('.input__button');
const popup = document.querySelector('.popup');
import popupTemplates from './utils/popupContent.js';
const registerPopup = popupTemplates.register;

console.log(popupTemplates);

const makeContentForDOM = (templ) => {
  const element = document.createElement('div');
  element.insertAdjacentHTML('beforeend', templ.trim(''));
  return element.firstChild;
};

//register popup
loginButton.addEventListener('click', (evt) => {
  const content = makeContentForDOM(popupTemplates.register);
  popup.appendChild(content);
  popup.classList.add('popup_is-opened');
  document.querySelector('.popup__close').addEventListener('click', () => {
    popup.innerHTML = '';
    popup.classList.remove('popup_is-opened');
  });
});

postButton.addEventListener('click', (evt) => {
  event.preventDefault;
});
