import * as flsFunctions from "./modules/functions.js";
import $ from "jquery"
import { Inputmask } from "inputmask";
import Swiper, { Navigation, Pagination } from 'swiper';
// import Inputmask from "inputmask.es6.js";
// import 'bootstrap';
Swiper.use([Navigation, Pagination])

flsFunctions.isWebp()


//=========swiper hero=======
const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerGroup: 1,
  spaceBetween: 50,
  loop: true,
  
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})

// let selector = document.querySelectorAll('input[type="tel"]');

// let im = new Inputmask("+7 (999) 999-99-99");
// im.mask(selector);

//====делаем первую букву  в Верхнем регистре
const regex = /[A-Za-z0-0]/;
const inputs = document.getElementsByClassName('form-control')

for (let i = 0; i < inputs.length; ++i) {
  inputs[i].onblur = () => {
    // if (regex.test(inputs[i].value)) inputs[i].value='';
    if(inputs[i].value === '') return;
  
    let str = inputs[i].value
    .trim()
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    inputs[i].value = str[0].toUpperCase() + str.substr(1).toLowerCase()
  }
}
//=====Input mask
const mask = event => {
  const {target, keyCode, type} = event;

  const pos = target.selectionStart;
  if (pos < 3) event.preventDefault();
  const matrix = '+7 (___) ___-__-__';
  let i = 0;
  const def = matrix.replace(/\D/g, '');
  const val = target.value.replace(/\D/g, '');
  let newValue = matrix.replace(/[_\d]/g,
    a => (i < val.length ? val[i++] || def[i] : a));
  i = newValue.indexOf('_');
  if (i !== -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg = matrix.substring(0, target.value.length).replace(/_+/g,
    (a) => `\\d{1,${a.length}}`).replace(/[+()]/g, '\\$&');
  reg = new RegExp(`^${reg}$`);
  if (!reg.test(target.value) || target.value.length < 5 ||
    keyCode > 47 && keyCode < 58) {
    target.value = newValue;
  }
  if (type === 'blur' && target.value.length < 5) target.value = '';
};

const input = document.getElementById('exampleFormControlInput');

if (input.type === 'tel') {
  input.addEventListener('input', mask);
  input.addEventListener('focus', mask);
  input.addEventListener('blur', mask);
  input.addEventListener('keydown', mask);
}


