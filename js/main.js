'use strict';

window.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // common
  // ==============================
  const body = document.querySelector('body');
  const header = document.querySelector('#header');

  // ==============================
  // scroll event
  // ==============================
  // ページトップからスクロール時にヘッダーを変更する
  window.addEventListener('scroll', () =>{
    const topY = window.pageYOffset;
    if(topY === 0) {
      header.classList.add('header--top');
    } else {
      header.classList.remove('header--top');
    }
  });
  // ==============================
  // fade in
  // ==============================
  const fadeInTargets = document.querySelectorAll('.js-fade-in');
  const options = {
    threshold: .2,
  }
  const observer = new IntersectionObserver(callback, options);
  fadeInTargets.forEach(fadeInTarget => {
    observer.observe(fadeInTarget);
  });
  // 配列で渡ってきたターゲットにアクティブクラスをつける
  function callback(entries, obs) {
    entries.forEach(entry => {
      // 交錯していない場合はリターンを返す
      if(!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('js-fade-in--active');
      // 一度交錯したものは監視対象から外す
      obs.unobserve(entry.target);
    });
  }
  // ==============================
  // smooth scroll
  // ==============================
  const ankerLinks = document.querySelectorAll('a[href^="#"]');
  ankerLinks.forEach(ankerLink => {
    ankerLink.addEventListener('click', (e) => {
      e.preventDefault();
      const elementTop = window.pageYOffset + document.querySelector(ankerLink.hash).getBoundingClientRect().top;
      const headerHeight = header.clientHeight;
      window.scroll({
        top: elementTop - headerHeight,
        behavior: "smooth",
      });
    });
  });
  // ==============================
  // hamburger menu
  // ==============================
  const hamburgerButton = document.querySelector('.header__sm-hamburger');
  const headerSm = document.querySelector('.header__sm');
  const hamburgerSlide = document.querySelector('.header__sm-slide'); 
  
  // ボタンクリックによるメニューの開閉
  // スマホメニューが開いている時はスクロールを制限
  hamburgerButton.addEventListener('click', () => {

    // ヘッダーの高さ分スマホメニュー上部の余白をとる
    const headerHeight = header.clientHeight;
    hamburgerSlide.style.paddingTop = headerHeight + 30 + 'px';

    headerSm.classList.toggle('header__sm--open');
    if(headerSm.classList.contains('header__sm--open')) {
      body.style.overflowY = 'hidden';
      return;
    }
    body.style.overflowY = 'auto';
  });
  
  // メニューの余白クリック時でも閉じるようにする
  hamburgerSlide.addEventListener('click', () => {
    headerSm.classList.remove('header__sm--open');
    body.style.overflowY = 'auto';
  });

  // ==============================
  // reserve form
  // ==============================
  const reserveButtons = document.querySelectorAll('.reserve-button');
  const reserveMask = document.querySelector('.mask')
  const reserveForm = document.querySelector('.reserve-form');
  const closeButton = document.querySelector('.reserve-form__close-button');

  // ボタンクリックによる予約フォームの開閉
  // 予約フォームが開いている時はスクロールを制限
  reserveButtons.forEach(reserveButton => {
    reserveButton.addEventListener('click', () => {
      reserveForm.classList.add('reserve-form--active');
      reserveMask.classList.add('mask--active');
      body.style.overflowY = 'hidden';
    });
  });

  // ボタンまたは余白をクリック時に予約フォームを閉じる
  reserveMask.addEventListener('click', () => {
    closeForm();
  });
  closeButton.addEventListener('click', () => {
    closeForm();
  });

  // 予約フォームを閉じる関数
  function closeForm() {
    reserveForm.classList.remove('reserve-form--active');
    reserveMask.classList.remove('mask--active');
    body.style.overflowY = 'auto';
  }
  // ==============================
  // calender
  // ==============================
  const calender = document.querySelector('#calender');
  const config = {
    minDate: 'today',
    mode: 'range',
  }
  const fp = flatpickr(calender, config);
  
  // ==============================
  // feature hover
  // ==============================
  const featureButtons = document.querySelectorAll('.feature__item-button');
  const featureImg = document.querySelectorAll('.feature__item-img');

  // ボタンに対応した画像のアニメーションを実行
  featureButtons.forEach((featureButton, index) => {
    featureButton.addEventListener('mouseenter', () => {
      featureImg[index].classList.add('feature__item-img--hover');
    });

    featureButton.addEventListener('mouseleave', () => {
      featureImg[index].classList.remove('feature__item-img--hover');
    });
  });
  // ==============================
  // news tab
  // ==============================
  const newsTabTitles = document.querySelectorAll('.news__tab-title');
  const newsContents = document.querySelectorAll('.news__list');
  const newsTab = document.querySelector('.news__tab');

  newsTabTitles.forEach(newsTabTitle => {
    newsTabTitle.addEventListener('click', () => {
      // タブタイトルからアクティブクラスを外す
      newsTabTitles.forEach(newsTabTitle => {
        newsTabTitle.classList.remove('news__tab-title--active');
      });
      // クリックされたタイトルにアクティブクラスをつける
      newsTabTitle.classList.add('news__tab-title--active');
      
      // クリックしたタイトルに応じたタブの表示
      newsContents.forEach(newsContent => {
        newsContent.classList.remove('news__list--active');
        const targetTabContent = document.querySelector('#' + newsTabTitle.dataset.id);
        targetTabContent.classList.add('news__list--active'); 
        
        // タブの高さを取得
        const newsTab = document.querySelector('.news__tab');
        newsTab.style.height = targetTabContent.clientHeight + 'px';
      });
    });
  });

  // タブの高さの初期表示
  newsTab.style.height = newsContents[0].clientHeight + 'px';

  // ==============================
  // window resize
  // ==============================
  window.addEventListener('resize', () => {
    // スマホメニューのヘッダー分の余白再取得
    const headerHeight = header.clientHeight;
    hamburgerSlide.style.paddingTop = headerHeight + 40 + 'px';


    // アクティブになっているタブの高さを再取得
    const newsTab = document.querySelector('.news__tab');
    const newsTabActive = document.querySelector('.news__list--active');
    newsTab.style.height = newsTabActive.clientHeight + 'px';
  });

  // タブレットサイズに広がった時にリロードする（スマホメニュー開時のオーバーフロー指定を解除する）
  const reloadBreakPoint = 767;
  let resizeFlag;
  if(reloadBreakPoint < window.innerWidth) {
    resizeFlag = false;
  } else {
    resizeFlag = true;
  }
  resizeWindow();

  function resizeWindow() {
    window.addEventListener('resize', () => {
      if(reloadBreakPoint < window.innerWidth && resizeFlag) {
        window.location.reload();
        resizeFlag = false;
      } else if(reloadBreakPoint >= window.innerWidth && !(resizeFlag)) {
        resizeFlag = true;
      }
    });
  }
});
