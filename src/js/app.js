import * as flsFunctions from "./modules/functions.js";
import $ from "jquery";

import { Inputmask } from "inputmask";
import Swiper, { Navigation, Pagination } from "swiper";
import JustValidate from "just-validate";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
import Choices from "choices.js";
import bootstrap from "bootstrap";
import datepickerFactory from "jquery-datepicker";

$(".filter-menu__item").on("click", function (event) {
  event.stopPropagation();
});

//========== Календарь кастомный

datepickerFactory($);

$(function () {
  $("#datepicker")
    .datepicker({
      showOn: "button",
      buttonImage: "/local/templates/main/static/img/icons/icons.svg#Calendar",
      buttonImageOnly: true,
      showOtherMonths: true,
      selectOtherMonths: true,
      // maxDate: "+0d",
      yearRange: "2010:+0",
      onSelect: function (dateText, inst) {
        var date = $(this).datepicker("getDate");
        date = jQuery.datepicker.formatDate("dd.mm.yy", date);
        data = "date=" + date + ",";
        $.ajax({
          type: "POST",
          url: "ajax_calendar",
          data: { date: date, id: 1795 },
          success: function (content) {
            var obj = jQuery.parseJSON(content);
            $.each(obj, function (i, item) {
              $(
                'table#currency_rate_table [data-charcode="' +
                  item.charcode +
                  '"]'
              ).text(item.currency);
            });
          },
        });
      },
    })
    .datepicker("setDate", new Date());
});
$.datepicker.regional["ru"] = {
  closeText: "Закрыть",
  prevText: "Предыдущий",
  nextText: "Следующий",
  currentText: "Сегодня",
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ],
  dayNamesShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
  dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  weekHeader: "Не",
  dateFormat: "dd.mm.yy",
  firstDay: 1,
  isRTL: false,
  showMonthAfterYear: false,
  yearSuffix: "",
};
$.datepicker.setDefaults($.datepicker.regional["ru"]);

//==============Модальные окна

function OpenModalWindow(el) {
  CloseModalWindow();
  let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
  let modal = $(".modal-block");
  document.body.style.overflowY = "hidden";
  document.body.style.paddingRight = paddingOffset;
  document.querySelector("header").style.paddingRight = paddingOffset;
  modal.addClass("open");
  el.show();
}

function CloseModalWindow() {
  let modal = $(".modal-block");
  let forms = $("form", modal);
  let formsBlocks = $(".modal-window-content > div", modal);
  document.body.style.paddingRight = "0";
  document.body.style.overflowY = "visible";
  document.querySelector("header").style.paddingRight = "0";
  modal.removeClass("open");
  forms.each(function () {
    this.reset();
  });
  formsBlocks.each(function () {
    $(this).hide();
  });
}
$('*[data-modal="#consultWithSpecialist"]').on("click", function (event) {
  event.preventDefault();
  OpenModalWindow($(".consult-modal"));
});
$('*[data-modal="#consult-earn"]').on("click", function (event) {
  event.preventDefault();
  OpenModalWindow($(".consult-earn"));
});

$('*[data-modal="#consult"]').on("click", function (event) {
  event.preventDefault();
  OpenModalWindow($(".main-consult-modal"));
});

$('*[data-modal="#modalCurrencyHistory"]').on("click", function (event) {
  event.preventDefault();
  OpenModalWindow($(".currency-history-modal"));
});

$(document).on("click", ".btn-close, .modal-bg", function () {
  CloseModalWindow();
});
$(document).on("click", ".modal-window", function (e) {
  document.body.style.overflowY = "visible";
  e.stopPropagation();
});
//================================================

//============Сортировка списка идей
$("#listSort ").on("click", function (event) {
  event.preventDefault();
  $(" #listSort").addClass("choisen");
  $("#mediumIconsSort").removeClass("choisen");
  $(".investment__ideas-body").addClass("hide");
  $(".investment__ideas-list").addClass("show");
});

$("#mediumIconsSort").on("click", function (event) {
  event.preventDefault();
  $("#mediumIconsSort").addClass("choisen");
  $("#listSort").removeClass("choisen");
  $(".investment__ideas-body").removeClass("hide");
  $(".investment__ideas-list").removeClass("show");
});

//===================================
///===========Choices конвертор валют======

const defaultSelect = (classNameEl) => {
  const element = document.getElementById(classNameEl);

  const choices = new Choices(element, {
    searchEnabled: false,
    position: "bottom",
    allowHTML: true,
  });
};
try {
  defaultSelect("currency");

  defaultSelect("currency-2");
} catch (error) {}

try {
  const countrySelect = document.querySelector("#currency-detail");
  const countryChoices = new Choices(countrySelect, {
    searchEnabled: false,
    position: "bottom",
    placeholder: true,
    allowHTML: true,
    classNames: {
      containerOuter: "country-choices",
      containerInner: "countries-wrapper",
      list: "currency__list",
      listDropdown: "countries-list-dropdown",
      item: "currency__item",
      itemSelectable: "currency__item--selectable",
    },
  });
} catch (error) {}

//=====================
Swiper.use([Navigation, Pagination]);

//======включаем создание WEbp ====
flsFunctions.isWebp();
//======включаем создание ===
const burger = document.querySelector(".header-burger");
const greyBackground = document.querySelector(".grey-background-640px");
const nav = document.querySelector(".header__nav-app-list");

//==========Меняем svg на акардионе "тарифы" мобилка
$(".rates__accordion-button").on("click", function () {
  $(this).find("i").toggleClass("bi bi-plus-lg bi bi-dash-lg");
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
  $("#window__account-app").slideToggle("down");
  $(".header__nav-app-list").hide(500);
});
$("#closeWindowAccountApp").on("click", function () {
  $("#window__account-app").slideToggle();
});
//=========Search=======
$(".fa-search").on("click", function () {
  $(".wrap").toggle("drop");
  $(
    ".nav-search, .search-form , #closeSearch, .search-btn, .search-form-input, .search-line"
  ).toggleClass("active");
  $("#headerSearch").focus();
});
$("#closeSearch").on("click", function () {
  $(
    ".nav-search, .search-form , #closeSearch, .search-btn, .search-form-input, .search-line"
  ).toggleClass("active");
});
//=========swiper hero=======
const heroSwiper = new Swiper(".hero-swiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerGroup: 1,
  spaceBetween: 32,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//=============Появление Header при скролле
let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector(".header");

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;
const containHeight = () => header.classList.contains("header-hide");

window.addEventListener("scroll", () => {
  if (
    scrollPosition() > lastScroll &&
    !containHeight() &&
    scrollPosition() > defaultOffset
  ) {
    header.classList.add("header-hide");
    // header.style.boxShadow = '0px -2px 5px rgb(0 0 0 / 69%)';
  } else if (scrollPosition() < lastScroll && containHeight()) {
    header.classList.remove("header-hide");
  }

  lastScroll = scrollPosition();
});

//=============Добавление плашки в таблице при скролле
let rs = document.querySelector(".shadow-on-scroll-hide"),
  ss = document.querySelector(".tab-pane-shadow");
window.onscroll = function () {
  !(function () {
    try {
      document.documentElement.scrollTop > 710 &&
      document.documentElement.scrollTop - rs.offsetHeight < 2600 &&
      window.innerWidth > 1176 &&
      ss.classList.contains("active")
        ? (rs.classList.remove("shadow-on-scroll-hide"),
          rs.classList.add("shadow-on-scroll"))
        : (rs.classList.add("shadow-on-scroll-hide"),
          rs.classList.remove("shadow-on-scroll"));
    } catch (e) {}
  })();
};

//===========swiper ideas======
const ideasSwiper = new Swiper(".ideas-swiper", {
  modules: [Navigation, Pagination],
  slideClass: "ideas__slide",
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerColumn: 1,

  // spaceBetween: 16,
  // modifierClass: 'ideas-swiper-pagination',
  pagination: {
    el: ".ideas-swiper-pagination",
    clickable: true,
    bulletClass: "ideas-swiper-pagination-bullet",
    horizontalClass: "ideas-swiper-pagination-horizontal",
    bulletActiveClass: "swiper-bullet-active",
  },
  navigation: {
    hideOnClick: true,
    clickable: true,
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1176: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      centeredSlides: false,
      slidesPerColumn: 3,
      spaceBetween: 32,
    },
    595: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      centeredSlides: false,
      slidesPerColumn: 2,
      spaceBetween: 16,
    },

    324: {
      slidesPerView: "auto",
      centeredSlides: true,
      slidesPerGroup: 1,
      slidesPerColumn: 1,
      spaceBetween: 16,
    },
  },
});

//====делаем первую букву  в Верхнем регистре
const regex = /[A-Za-z0-0]/;
let firstLetterToUpperCase = (className) => {
  const inputs = document.getElementsByClassName(className);

  for (let i = 0; i < inputs.length; ++i) {
    inputs[i].onblur = () => {
      // if (regex.test(inputs[i].value)) inputs[i].value='';
      if (inputs[i].value === "") return;

      let str = inputs[i].value
        .trim()
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .replace(/\s+/g, " ")
        .trim();
      inputs[i].value = str[0].toUpperCase() + str.substr(1).toLowerCase();
    };
  }
};
firstLetterToUpperCase("form-control");

//=====Input mask
const mask = (event) => {
  const { target, keyCode, type } = event;

  const pos = target.selectionStart;
  if (pos < 3) event.preventDefault();
  const matrix = "+7 (___) ___-__-__";
  let i = 0;
  const def = matrix.replace(/\D/g, "");
  const val = target.value.replace(/\D/g, "");
  let newValue = matrix.replace(/[_\d]/g, (a) =>
    i < val.length ? val[i++] || def[i] : a
  );
  i = newValue.indexOf("_");
  if (i !== -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg = matrix
    .substring(0, target.value.length)
    .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
    .replace(/[+()]/g, "\\$&");
  reg = new RegExp(`^${reg}$`);
  if (
    !reg.test(target.value) ||
    target.value.length < 5 ||
    (keyCode > 47 && keyCode < 58)
  ) {
    target.value = newValue;
  }
  if (type === "blur" && target.value.length < 5) target.value = "";
};

const input = document.getElementById("exampleFormControlInput");

if (input.type === "tel") {
  input.addEventListener("input", mask);
  input.addEventListener("focus", mask);
  input.addEventListener("blur", mask);
  input.addEventListener("keydown", mask);
}

//========Валидация формы открытия счета и маска================
//======маска телефон
try {
  const accountFormTel = document.getElementById("tel");
  if (accountFormTel.type === "tel") {
    accountFormTel.addEventListener("input", mask);
    accountFormTel.addEventListener("focus", mask);
    accountFormTel.addEventListener("blur", mask);
    accountFormTel.addEventListener("keydown", mask);
  }
} catch (error) {}

//======заглавная буква
try {
  firstLetterToUpperCase("account__form-input");
} catch (error) {}

//=======Валидация
try {
  const validation = new JustValidate("#accountform", {
    errorFieldCssClass: "is-invalid",
    errorLabelStyle: {
      fontSize: "14px",
      color: "#dc3545",
    },
    successFieldCssClass: "is-valid",
    successLabelStyle: {
      fontSize: "14px",
      color: "#20b418",
    },
    successFieldStyle: {
      border: "1px solid #44953D",
    },
    focusInvalidField: true,
    lockForm: true,
  });
  validation
    .addField("#firstname", [
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Фамилия должна содержать не менее 3-х символов ",
      },
      {
        rule: "maxLength",
        value: 30,
      },
      {
        rule: "required",
        errorMessage: "Обязательное поле",
      },
    ])
    .addField("#secondname", [
      {
        rule: "minLength",
        value: 2,
        errorMessage: "Имя должно содержать не менее 2-х символов ",
      },
      {
        rule: "maxLength",
        value: 30,
      },
      {
        rule: "required",
        errorMessage: "Обязательное поле",
      },
    ])
    .addField("#surname", [
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Отчество должно содержать не менее 3-х символов ",
      },
      {
        rule: "maxLength",
        value: 30,
      },
      {
        rule: "required",
        errorMessage: "Обязательное поле",
      },
    ])
    .addField("#mail", [
      {
        rule: "required",
        errorMessage: "Обязательное поле",
      },
      {
        rule: "email",
        errorMessage: "Не валидный Email",
      },
    ])
    .addField("#tel", [
      {
        rule: "required",
        errorMessage: "Обязательное поле",
      },
    ])
    .addField("#accountCheck", [
      {
        rule: "required",
        errorMessage: "Подтвердите",
      },
    ])
    // {
    //   successMessage: 'Силён! с первой попытки'
    // }
    .onSuccess((ev) => {
      ev.preventDefault();
      window.showNotification();
    });
} catch (error) {}

/////===============Калькулятор ИИС==================
function slowScroll(id) {
  var offset = 0;
  $("html, body").animate(
    {
      scrollTop: $(id).offset().top - offset,
    },
    100
  );
  return false;
}
//=======Прокрутка к калькулятору
$("#trustCalcBtn").on("click", function (event) {
  event.preventDefault();
  $("#brokersService, #brokers-service").removeClass("active");
  $("#trustManagement, #trust-management").addClass("active");
  slowScroll("#trustManagement");
});
$("#brokerCalcBtn").on("click", function (event) {
  event.preventDefault();
  $("#trustManagement, #trust-management").removeClass("active");
  $("#brokersService, #brokers-service").addClass("active");
  slowScroll("#brokersService");
});
/////===============инициализация калькулятора==================


const calcIndividualAccountInit = (calcValue, minValue, maxValue, stepValue) => {
  let min = parseInt(minValue)
  let max = parseInt(maxValue)
  let step = parseInt(stepValue)
  noUiSlider.create(calcValue, {
    start: [0],
    connect: [true, false],
    range: {
      min: min,
      max: max,
    },
    step: step,
    format: wNumb({
      decimals: 0,
      thousand: " ",
    }),
  });
};

let brokerSum = document.querySelector('[data-calc="brokerSum"]');
let brokerDuration = document.querySelector('[data-calc="brokerDuration"]');
let trustSum = document.querySelector('[data-calc="trustSum"]');
let trustDuration = document.querySelector('[data-calc="trustDuration"]');
let valueDuration = document.querySelectorAll('[data-calc="valueDuration"]');

/////===============события калькулятора==================
const calcIndividualAccountEvent = (calcSum, calcYears) => {
  calcYears.noUiSlider.on("update", function (values, handle) {
    // years = Math.round(calcYears.noUiSlider.get(true));
    valueDuration.forEach((el) => {
      if (values > 1 && values <= 4 ) {
        el.textContent = `${values[handle]} года`;

        resultYears.textContent = `Мои сбережения за ${values} года`;
      } else if (values == 1){
        el.textContent = `${values[handle]} год`;

        resultYears.textContent = `Мои сбережения за ${values} год`;
      } else{
        el.textContent = `${values[handle]} лет`;
        resultYears.textContent = `Мои сбережения за ${values} лет`;
      }
    });

    calc(years, depositAmount);
    return years;
  });

  calcSum.noUiSlider.on("update", function (values, handle) {
    valueSum.forEach((el) => {
      el.innerHTML = `${values[handle]}₽`;
    });
    // valueSum.innerHTML = `${values[handle]}₽`;
    depositAmount = Math.round(calcSum.noUiSlider.get(true));

    calc(years, depositAmount);
    return depositAmount;
  });
};

let valueSum = document.querySelectorAll('[data-calc="valueSum"]');

let resultYears = document.querySelector('[data-calc="resultYears"]');
let resultTotalVnesenie = document.querySelector(
  '[data-calc="resultTotalVnesenie"]'
);
let resultPercent = document.querySelector('[data-calc="resultPercent"]');
let resultNetIncome = document.querySelector('[data-calc="resultNetIncome"]');
let vichet = document.querySelector('[data-calc="resultVichet"]');
let resultNdfl = document.querySelector('[data-calc="resultNdfl"]');
let depositAmount;
let years;

const calc = (depositAmount, years) => {
  let deposit = Math.round(brokerSum.noUiSlider.get(true));
  resultTotalVnesenie.value = `${depositAmount * years}₽`;
  // resultPercent = Math.round(((result / (resultTotalVnesenie / 2)) - 1) * 1000 / years) / 10;

  vichet.value = Math.round(depositAmount * 0.13 * years) + "₽";
  // if (years <= 3.1) {
  //   years = 3;
  //   $("#years").val("3");
  // };

  // if (years >= 12) {
  //   years = 12;
  //   $("#years").val("10");
  // };

};
let initMinYear = document.querySelector('.total__years').getAttribute('init-min');
let initMaxYear = document.querySelector('.total__years').getAttribute('init-max');
let initStepYear = document.querySelector('.total__years').getAttribute('init-step');
let initMinSum = document.querySelector('.total__sum').getAttribute('init-min');
let initMaxSum = document.querySelector('.total__sum').getAttribute('init-max');
let initStepSum = document.querySelector('.total__sum').getAttribute('init-step');
try {

  calcIndividualAccountInit(brokerSum, initMinSum, initMaxSum, initStepSum);
  calcIndividualAccountInit(brokerDuration, initMinYear, initMaxYear, initStepYear);

} catch (err) {}

try {
  calcIndividualAccountEvent(brokerSum, brokerDuration);
  calcIndividualAccountEvent(trustSum, trustDuration);
} catch (err) {}
