document.addEventListener ("DOMContentLoaded", initScroll);

function initScroll () {
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  if (window.location.hash && isChrome) {
      setTimeout(function () {
          let hash = window.location.hash;
          window.location.hash = "";
          window.location.hash = hash;
      }, 300);
  }
}
