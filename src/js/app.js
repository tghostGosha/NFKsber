import * as flsFunctions from "./modules/functions.js";
import $, { type } from "jquery"
import { Inputmask } from "inputmask";
import Swiper, { Navigation, Pagination } from 'swiper';
import JustValidate from 'just-validate';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';



Swiper.use([Navigation, Pagination])

flsFunctions.isWebp()
const burger = document.querySelector('.header-burger');
const greyBackground = document.querySelector('.grey-background-640px');
const nav = document.querySelector('.header__nav-app-list');

//==========Меняем svg на акардионе "тарифы" мобилка
$(".rates__accordion-button").on('click',function() {
  $(this).find("i").toggleClass("bi bi-plus-lg bi bi-dash-lg")
  console.log(i)
});

//==============================
$("#header-burger").on("click", function () {
  $(".header__nav-app-list").slideToggle("up");
  $(" .header-burger-marker, .header-burger").toggleClass("is-active");
  $("#window__account-app").hide(500);
});
$("#closeHeaderNavApp").on("click", function () {
  $(".header__nav-app-list").slideToggle();
});
$("#btnOpen").on("click", function () {
  $("#window__account-app").slideToggle("down")
  $(".header__nav-app-list").hide(500);
});
$("#closeWindowAccountApp").on("click", function () {
  $("#window__account-app").slideToggle();

});

$(".fa-search").on("click", function () {
  $(".wrap").toggle("drop");
  $(".wrap, .input, .fa").toggleClass("active");
});
//=========swiper hero=======
const heroSwiper = new Swiper('.hero-swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

//===========swiper ideas======
const ideasSwiper = new Swiper('.ideas-swiper', {
  modules: [Navigation, Pagination],
  slideClass: 'ideas__slide',
  // slidesPerView: 1,
  //     slidesPerGroup: 1,
  //     slidesPerColumn: 1,

  // spaceBetween: 16,
  // modifierClass: 'ideas-swiper-pagination',
  pagination: {
    el: '.ideas-swiper-pagination',
    clickable: true,
    bulletClass: 'ideas-swiper-pagination-bullet',
    horizontalClass: 'ideas-swiper-pagination-horizontal',
    bulletActiveClass: 'swiper-bullet-active'
  },
  navigation: {
    hideOnClick: true,
    clickable: true,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1070: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      centeredSlides: false,
      slidesPerColumn: 3,
      spaceBetween: 50
    },
    625: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      centeredSlides: false,
      slidesPerColumn: 2,
      spaceBetween: 16
    },
    324: {
      slidesPerView: "auto",
      centeredSlides: true,
      slidesPerGroup: 1,
      slidesPerColumn: 1,
      spaceBetween: 16
    }
  }
})

//====делаем первую букву  в Верхнем регистре
const regex = /[A-Za-z0-0]/;
let firstLetterToUpperCase = (className) => {
  const inputs = document.getElementsByClassName(className)


  for (let i = 0; i < inputs.length; ++i) {
    inputs[i].onblur = () => {
      // if (regex.test(inputs[i].value)) inputs[i].value='';
      if (inputs[i].value === '') return;

      let str = inputs[i].value
        .trim()
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      inputs[i].value = str[0].toUpperCase() + str.substr(1).toLowerCase()
    }
  }

}
firstLetterToUpperCase('form-control')



//=====Input mask
const mask = event => {
  const { target, keyCode, type } = event;

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





//========Валидация формы открытия счета и маска================
//======маска телефон
const accountFormTel = document.getElementById('tel');
if (accountFormTel.type === 'tel') {
  accountFormTel.addEventListener('input', mask);
  accountFormTel.addEventListener('focus', mask);
  accountFormTel.addEventListener('blur', mask);
  accountFormTel.addEventListener('keydown', mask);
}
//======заглавная буква
firstLetterToUpperCase('account__form-input');
//=======Валидация
const validation = new JustValidate('#accountform', {
  errorFieldCssClass: 'is-invalid',
  errorLabelStyle: {
    fontSize: '14px',
    color: '#dc3545',
  },
  successFieldCssClass: 'is-valid',
  successLabelStyle: {
    fontSize: '14px',
    color: '#20b418',

  },
  successFieldStyle: {
    border: '1px solid #44953D',
  },
  focusInvalidField: true,
  lockForm: true,
});
validation
  .addField('#firstname', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Фамилия должна содержать не менее 3-х символов ',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
  ])
  .addField('#secondname', [
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'Имя должно содержать не менее 2-х символов ',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
  ])
  .addField('#surname', [
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Отчество должно содержать не менее 3-х символов ',
    },
    {
      rule: 'maxLength',
      value: 30,
    },
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
  ])
  .addField('#mail', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
    {
      rule: 'email',
      errorMessage: 'Не валидный Email',
    },
  ])
  .addField('#tel', [
    {
      rule: 'required',
      errorMessage: 'Обязательное поле',
    },
  ])
  .addField('#accountCheck', [
    {
      rule: 'required',
      errorMessage: 'Подтвердите',
    },
  ])
  // {
  //   successMessage: 'Силён! с первой попытки'
  // }
  .onSuccess((ev) => {
    ev.preventDefault();
    window.showNotification();
  });

// const getStocks = async function () {
//   const responce = await fetch(`https://zberopolis.ru/`);
//   const object = await responce.json();
//   console.log(object);
//   return object;
// };
// getStocks()

const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');

noUiSlider.create(slider1, {
  start: [0],
  connect: [true, false],
  range: {
    'min': 10000,
    'max': 400000
  },
  step: 10000,
  format: wNumb({
    decimals: 0,
    thousand: ' '
  }),
});
noUiSlider.create(slider2, {
  start: [0],
  connect: [true, false],
  range: {
    'min': 1,
    'max': 12
  },
  step: 1,
  format: wNumb({
    decimals: 0
  }),
});

let slider1Value = document.getElementById('slider1Value');
let slider2Value = document.getElementById('slider2Value');
let resultYears = document.getElementById('resultYears');
let resultTotalVnesenie = document.getElementById('resultTotalVnesenie');
let resultPercent = document.getElementById('resultPercent');
let vichet = document.getElementById('vichet')
let depositAmount
let years

const calc = (depositAmount, years) => {
  let deposit = Math.round(slider1.noUiSlider.get(true))
  resultTotalVnesenie.value = `${depositAmount * years}₽`;
  // resultPercent = Math.round(((result / (resultTotalVnesenie / 2)) - 1) * 1000 / years) / 10;

  vichet.value = Math.round((depositAmount * 0.13) * years) + '₽';
  console.log(deposit)
  // if (years <= 3.1) {
  //   years = 3;
  //   $("#years").val("3");
  // };

  // if (years >= 12) {
  //   years = 12;
  //   $("#years").val("10");
  // };
  let dohodDU = Math.round(deposit * 1.322)
  // let dohod = dohodDU + depositAmount
  console.log(dohodDU)
  // let totalDohodDU = Math.round((years * depositAmount + dohod) * 1.322)

  // console.log(totalDohodDU)


  // for (let i = 1; i < years + 1; i++) {
  //   depositAmount+=(depositAmount*13.22)
  //   console.log(depositAmount)
  // }



}
slider2.noUiSlider.on('update', function (values, handle) {
  years = Math.round(slider2.noUiSlider.get(true))

  if (years <= 4) {
    slider2Value.innerHTML = `${years} года`;
    resultYears.textContent = `Мои сбережения за ${years} года`

  } else {
    slider2Value.innerHTML = `${years} лет`;
    resultYears.textContent = `Мои сбережения за ${years} лет`

  }
  calc(years, depositAmount)
  return years
});

slider1.noUiSlider.on('update', function (values, handle) {
  slider1Value.innerHTML = `${values[handle]}₽`;
  depositAmount = Math.round(slider1.noUiSlider.get(true))

  calc(years, depositAmount)
  console.log(depositAmount)
  return depositAmount

});





// function addSpaces(nStr) {
//   nStr += '';
//   let x = nStr.split('.');
//   let x1 = x[0];
//   let x2 = x.length > 1 ? '.' + x[1] : '';
//   let rgx = /(\d+)(\d{3})/;
//   while (rgx.test(x1)) {
//     x1 = x1.replace(rgx, '$1' + ' ' + '$2');
//   }
//   return x1 + x2;
// }
