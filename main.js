/* Ashish Meena website scripts. No external libraries. */
(function () {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });

  // Photo gallery lightbox
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  document.querySelectorAll('.thumb').forEach(function (b) {
    b.addEventListener('click', function () {
      boxImg.src = b.dataset.full;
      boxImg.alt = b.dataset.alt || '';
      box.showModal();
    });
  });
  box.querySelector('.close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });

  // YouTube: loads the player only when clicked (faster page).
  // If the ID is still a placeholder (VIDEO_ID_x), open the channel instead.
  document.querySelectorAll('.video').forEach(function (v) {
    v.querySelector('button').addEventListener('click', function () {
      var id = v.dataset.id;
      if (!id || id.indexOf('VIDEO_ID') === 0) {
        window.open(v.dataset.channel, '_blank', 'noopener');
        return;
      }
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
      f.title = 'YouTube video player';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      v.innerHTML = '';
      v.appendChild(f);
    });
  });
})();
