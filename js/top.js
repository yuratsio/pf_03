'use strict'
window.addEventListener('DOMContentLoaded', () => {
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
    // アクティブになっているタブの高さを再取得
    const newsTab = document.querySelector('.news__tab');
    const newsTabActive = document.querySelector('.news__list--active');
    newsTab.style.height = newsTabActive.clientHeight + 'px';
  });
});
