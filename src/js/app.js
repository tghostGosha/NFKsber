import * as flsFunctions from "./modules/functions.js";
import $, { type } from "jquery"
import { Inputmask } from "inputmask";
import Swiper, { Navigation, Pagination } from 'swiper';
import JustValidate from 'just-validate';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';


Swiper.use([Navigation, Pagination])

flsFunctions.isWebp()


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
  slidesPerView: 3,
  slidesPerColumn: 3,
  slidesPerGroup: 3,
  spaceBetween: 50,
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
    'min': 3,
    'max': 10
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
let count
let years

slider2.noUiSlider.on('update', function (values, handle) {
  years = slider2.noUiSlider.get(true)
  if (years <= 4) {
    slider2Value.innerHTML = `${years} года`;
    resultYears.textContent = `Мои сбережения за ${years} года`
    
  } else {
    slider2Value.innerHTML = `${years} лет`;
    resultYears.textContent = `Мои сбережения за ${years} лет`
    
  }
  console.log(years)
  return years
});

slider1.noUiSlider.on('update', function (values, handle) {
  count = Math.round(slider1.noUiSlider.get(true))
  slider1Value.innerHTML = `${count}₽`;
  console.log(count)
  
  return count
});

console.log(count)
console.log(years)

// resultTotalVnesenie = new Number(0)
// resultTotalVnesenie.textContent = Math.round(valueSlider1 * valueSlider2);

// console.log(resultTotalVnesenie)

// $(document).ready(function() {
//   // Optimalisation: Store the references outside the event handler:
//   let $window = $(window);
//   let $pane = $('#pane1');

//   function checkWidth() {
//     let windowsize = $window.width();
//     if (windowsize < 800) {
//       $('.advantage .b-section-info__text').css('background','none');
//       //$('.advantage .b-section-info__text:nth-child').css('background','none');
//     }
//     else{
//       $('.advantage .b-section-info__text').eq(0).css('background','url(../img/arrow-left.png) no-repeat top center');
//       $('.advantage .b-section-info__text').eq(1).css('background','url(../img/arrow-right.png) no-repeat top center');
//     }
//   }
//   // Execute on load
//   checkWidth();
//   // Bind event listener
//   $(window).resize(checkWidth);


//   $(".b-pricing-info__item.f-pricing-info__item").click(function(){
//     $(".b-pricing-info__item.f-pricing-info__item").removeClass("active");
//     $(this).addClass("active");

//     let newTitle = $(this).parent().parent().find(".title").find("h2").text();
//     console.log ('newTitle '+newTitle);

//     let newPercent = $(this).attr("percent");
//     let newPercentText = $(this).attr("percentText");

//     let newCapitalize = $(this).attr("capitalize");

//     console.log ('newCapitalize '+newCapitalize);

//     if(newCapitalize!=1){
//       $("ins.capitalize").addClass("hide");
//       $(".ndfl").addClass("hide");
//     } else {
//       $("ins.capitalize").removeClass("hide");
//       $(".ndfl").removeClass("hide");
//     }

//     $("#percent").attr("val",newPercent);
//     $("#percentText").html(newPercentText);
//     $("#name").text(newTitle)
//     $("span.name").text(newTitle)
//     $("span.name").attr("name",newTitle);
//     $(".form form textarea").text("Меня интересует ИИС "+newTitle+". Прошу связаться со мной...")
//     calc(newCapitalize);
//   })
// });

// function scrollToForm(){
// window.scrollTo(0, $("#formScroll").offset().top-50);	
// }

// function calc() {

//   // $(".SliderUnits.s400").html("<i></i><i></i><i></i><i></i>");
//   // $(".SliderUnits.sYears").html("<i></i><i></i><i></i><i></i><i></i><i></i><i></i>");

//   // var capitalize = new Number($(".f-pricing-info__item.active").attr("capitalize"))

//   let result = new Number(0);

//   var dohodDU = new Number(0);
//   var totalDohodDU = new Number(0);

//   var start = new Number($("#start").val());

//   var years = new Number($("#years").val());

//   if (start <= 10001) {
//     start = 10000;
//     $("#start").val("10000");
//   };

//   if (start >= 400001) {
//     start = 400000;
//     $("#start").val("400000");
//   };

//   if (years <= 3.1) {
//     years = 3;
//     $("#years").val("3");
//   };

//   if (years >= 10) {
//     years = 10;
//     $("#years").val("10");
//   };

//   let vichet = new Number($("#vichet").attr("val"));
//   let percent = new Number($("#percent").attr("val"));


//   percent = new Number(percent / 100 + 1);
//   let percent2 = (percent * 10000 - 10000) / 10000;
//   vichet = vichet / 100;

//   let vichetTotal = Math.round(vichet * start * years);


//   //var thisPercent = new Number(resultPercent/100+1);
//   let prevResult = new Number(0);

//   // 0 = Брокерский, 1 = Накопительный
//   //if(capitalize==0){
//   //var result = Math.round((start*(vichet+percent))*years);
//   for (let i = 1; i < years + 1; i++) {

//     let prev = new Number(i - 1);
//     if (prev < 0) { prev = 0 };

//     dohodDU = (start + prevResult) * percent2;
//     totalDohodDU = totalDohodDU + dohodDU;

//     result = Math.round((prevResult + start) + dohodDU);
//     prevResult = result;

//     console.log('start ' + start + ',prevResult ' + prevResult + ',percent2 ' + percent2 + ',result ' + result);

//   }

//   // if (capitalize == 1) {
//   //   ndfl = Math.round((totalDohodDU - 0.001 * (start * years + dohodDU)) * 0.13);
//   //   //ndfl =  (result-(start*years)-vichetTotal)*0.13
//   //   result = result - ndfl;
//   // }


//   result = Math.round(result + vichetTotal);
//   let resultPercentMoney = Math.round(result - vichetTotal - (start * years));


//   percent = Math.round(resultPercentMoney - vichet)

//   //var resultPercent = Math.round(((result/(resultTotalVnesenie/2))-1)*1000/years)/10;

//   let param = result / resultTotalVnesenie;
//   param = param.toFixed(4);
//   console.log(param);
//   param = (param - 1).toFixed(4);
//   let resultPercent = param * 100;
//   resultPercent = resultPercent.toFixed(2);

//   resultTotalVnesenie = addSpaces(resultTotalVnesenie);
//   //resultPercent = addSpaces(resultPercent);
//   ndfl = addSpaces(ndfl);
//   vichetTotal = addSpaces(vichetTotal);
//   percent = addSpaces(percent);
//   result = addSpaces(result);

//   $("#vichet").html(vichetTotal + '<i class="fa fa-rub"></i>');
//   $("#ndfl").html(ndfl + '<i class="fa fa-rub"></i>');
//   $("#percent").html(percent + '<i class="fa fa-rub"></i>');
//   $("#result").html(result + '<i class="fa fa-rub"></i>');
//   $("#resultTotalVnesenie").html(resultTotalVnesenie + '<i class="fa fa-rub"></i>');
//   $("#resultPercent").html(resultPercent + '%');
//   $("#resultYears").html(years);


// }
// if(capitalize==1){
//   for (var i = 0; i < years; i++) {
//      result = Math.round((result+start)*percent);
//      //alert(start*vichet)
//   }
//   result =  Math.round(result+vichetTotal);
// }

// меняем 3 года, 5 лет
// if(years > 4){
//   $("ins.years").text("лет");
// }
// if(years < 5){
//   $("ins.years").text("года");
// }





function addSpaces(nStr) {
  nStr += '';
  let x = nStr.split('.');
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ' ' + '$2');
  }
  return x1 + x2;
}
