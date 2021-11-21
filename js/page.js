'use strict'

window.addEventListener('DOMContentLoaded', () => {
  // ==============================
  // common
  // ==============================
  const headerHeight = document.querySelector('#header').clientHeight;

  // ==============================
  // subvisual
  // ==============================
  // ヘッダー分のpadding topを指定
  const subvisual = document.querySelector('.subvisual');
  subvisual.style.marginTop = headerHeight + 'px';
  
  // ==============================
  // content
  // ==============================
  const contentTexts = document.querySelectorAll('.content__text-wrapper');
  const contents = document.querySelectorAll('.content__description');
  contents.forEach((content, index) => {
    contentMarginBottom(content, index);
  });
  
  // contentのmarginを指定する
  function contentMarginBottom(content, index) {
    const windowWidth = window.innerWidth;
    if(windowWidth < 1024) {
      content.style.marginBottom = contentTexts[index].clientHeight + 'px';
    } else {
      content.style.marginBottom = contentTexts[index].clientHeight - 160 + 'px';
    }
  }


  // ==============================
  // window resize
  // ==============================
  window.addEventListener('resize', () => {
    const subvisual = document.querySelector('.subvisual');
    subvisual.style.marginTop = headerHeight + 'px';

    contents.forEach((content, index) => {
      contentMarginBottom(content, index);
    });
  });

});
