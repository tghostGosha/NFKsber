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

let selector = document.querySelectorAll('input[type="tel"]');

let im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);