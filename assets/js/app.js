const header = document.querySelector("header");
const activeMenu = document.querySelector(".menu-res");
const menuMobile = document.querySelector(".menu-mobile");
const cursorInner = document.querySelector(".cursor-inner");
const cursorOuter = document.querySelector(".cursor-outer");
const niceSelect = document.querySelectorAll(".nice-select");

let scrollProgress = document.querySelector(".progress");
let scrollInterval;

function clickProgress() {
  document.documentElement.scrollTop -= 50;
}

scrollProgress.addEventListener("click", () => {
  scrollInterval = setInterval(clickProgress, 5);
});

window.addEventListener("scroll", function () {
  if (this.scrollY > 50) {
    header.classList.add("sticky");

    scrollProgress.classList.add("scroll");
    let pos = document.documentElement.scrollTop;
    let calcHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);

    scrollProgress.style.background = `conic-gradient(#00a3ff ${scrollValue}% ,rgb(13,13,18) ${scrollValue}%)`;
  } else {
    header.classList.remove("sticky");

    scrollProgress.classList.remove("scroll");
  }

  if (document.documentElement.scrollTop <= 0) clearInterval(scrollInterval);
});

activeMenu.addEventListener("click", function (e) {
  menuMobile.classList.add("active");
});
menuMobile.addEventListener("click", function (e) {
  if (e.target.matches(".menu-mobile .right")) {
    menuMobile.classList.remove("active");
  } else if (e.target.matches(".logo .close")) {
    menuMobile.classList.remove("active");
  }
});
// Slider

$(document).ready(function () {
  $(".slider").slick({
    arrows: false,
    dots: true,
  });
  $(".live-slider").slick({
    dots: false,
    arrows: true,
    infinite: true,
    // speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  $(".slick-prev").html('<i class="fa-regular fa-arrow-left"></i>');
  $(".slick-next").html('<i class="fa-regular fa-arrow-right"></i>');
});

// Mouse events
window.addEventListener("mousemove", function (e) {
  let x = e.clientX;
  let y = e.clientY;

  cursorInner.style.visibility = "visible";
  cursorOuter.style.visibility = "visible";
  cursorInner.style.transform = "translate(" + x + "px, " + y + "px)";
  cursorOuter.style.transform = "translate(" + x + "px, " + y + "px)";
});

[...niceSelect].forEach((item) =>
  item.addEventListener("click", function (e) {
    this.classList.toggle("open");
  })
);
[...document.querySelectorAll(".nice-select .list")].forEach((item) =>
  item.addEventListener("click", function (e) {
    console.log(e.target);
    item.parentNode.childNodes[1].textContent = e.target.textContent;

    [...document.querySelectorAll(".nice-select .option")].forEach((item) =>
      item.classList.remove("active")
    );
    e.target.classList.add("active");
  })
);

window.addEventListener("click", (e) => {
  [...niceSelect].forEach((item) => {
    if (!item.contains(e.target)) {
      item.classList.remove("open");
    }
  });
});

// Count down
window.addEventListener("load", function () {
  const daysText = document.querySelectorAll(".days ");
  const hoursText = document.querySelectorAll(".hours ");
  const minutesText = document.querySelectorAll(".minutes ");
  const secondsText = document.querySelectorAll(".seconds ");
  function countdown(date) {
    const endDate = new Date(date).getTime();
    let curentDate = new Date().getTime();
    if (isNaN(endDate) || endDate - curentDate <= 0) return;
    setInterval(function () {
      caculate();
    }, 1000);
    function caculate() {
      let day, hour, minute, second;
      const now = new Date();
      const starDate = now.getTime();
      let timeRemaining = parseInt((endDate - starDate) / 1000);
      if (timeRemaining > 0) {
        day = parseInt(timeRemaining / 86400);
        timeRemaining = timeRemaining % 86400;
        hour = parseInt(timeRemaining / 3600);
        timeRemaining = timeRemaining % 3600;
        minute = parseInt(timeRemaining / 60);
        timeRemaining = timeRemaining % 60;
        second = parseInt(timeRemaining);
        [...daysText].forEach(
          (item) => (item.textContent = `0${day}`.slice(-2))
        );
        [...hoursText].forEach(
          (item) => (item.textContent = `0${hour}`.slice(-2))
        );
        [...minutesText].forEach(
          (item) => (item.textContent = `0${minute}`.slice(-2))
        );
        [...secondsText].forEach(
          (item) => (item.textContent = `0${second}`.slice(-2))
        );
      } else {
        return;
      }
    }
  }
  countdown("Thu Oct 20 2023 23:57:10 GMT+0700 (Indochina Time)");
});
