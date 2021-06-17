const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});


const badgeEl= document.querySelector('header .badges');

//버튼을 누르면 맨 위로 올라가는 코드 1
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배찌 요소 숨기기
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0, //투명해지는 옵션 0은 없어지기
      display: 'none'
    });
    //버튼 보이기!
    gsap.to(toTopEl, .7, {
      x: 0
    });

  } else { 
    //배찌 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1, //투명해지는 옵션 1은 다시 생김
      display: 'block'
    });
    //버튼 숨기기!
    gsap.to(toTopEl, .7, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 몇초에 한번씩 실행되는지 시간을 입력한다 ex. 300 = 0.3초)


//버튼을 누르면 맨 위로 올라가는 코드2
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0  //cdn에서 긁어온 flug in이 있어야 제대로 작동함
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  //gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});


// new Swiper(선택자, 옵션) 위에서 아래로 슬라이드 움직이기
// 구글에 swiperjs를 검색해서 사용할것
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
  // autoplay로 계속해서 슬라이드가 넘어가지만 loop가 true값으로서 4->1로 다시 반복재생될 수 있음
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수 3개
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  // autoplay: {
  //   delay: 5000 //5초
  // }
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자의 페이지 번호 요소 제어 가능 여부
  },
  //navigation이라는 옵션을 통해 요소를 선택할 수 있도록 정보를 입력함
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // 보여지고 있다 / 숨겨지고 있다 x
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion //!가 있는 값을 반대로 만들어주라는 뜻 isHidePromotion값이 false라면 true로 변환시켜주는 역할
  if (isHidePromotion) {
    // 숨김 처리! - true
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리! - false
    promotionEl.classList.remove('hide');
  }
});
//이건 css의 .notice .promotion에서 시각적으로 조정이 가능함


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
//아이콘이 둥둥 떠있게 만드는 애니메이션 구현
function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션)
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { //옵션
      y: size,
      repeat: -1,
      yoyo: true,     //repeat이랑 yoyo가 애니메이션 반복시키는 중요한 요소임!! 중요!!
      ease: Power1.easeInOut, //gsap easing에서 power1을 통해 애니메이션이 자연스럽게 구동되도록 함
      delay: random(0, delay) //완전 멈췄다가 1초 있다가 애니메이션 시작함
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

//화면에 나오면 감시가 되어서 F12창에 show가 뜨게끔 만드는 코드

 //요소가 화면에 보여짐 여부에 따른 요소 관리
// 관리할 요소들 검색!
const spyEls = document.querySelectorAll('section.scroll-spy');
// 요소들 반복 처리!
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
    })
    .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
    .addTo(new ScrollMagic.Controller()); // 컨트롤러에 장면을 할당(필수!)
});


//연도마다 숫자가 변경되는 코드
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();  //textContent는 글자내용들의 값을 알아내거나 값을 지정하는 용도로 사용됨 

