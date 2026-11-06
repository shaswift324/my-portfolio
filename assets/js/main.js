// Mobile navigation toggle
(function () {
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setOpen(false);
  });
})();

// Projects carousel (arrows on both sides)
(function () {
  var carousel = document.getElementById("projCarousel");
  var track = document.getElementById("projTrack");
  if (!carousel || !track) return;

  var prev = carousel.querySelector(".prev");
  var next = carousel.querySelector(".next");

  // Distance to scroll = one card + the gap between cards
  function step() {
    var card = track.querySelector(".project");
    if (!card) return track.clientWidth;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  // Disable arrows at the ends; hide them when every project already fits
  function update() {
    var max = track.scrollWidth - track.clientWidth;
    carousel.classList.toggle("no-scroll", max <= 2);
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;
  }

  prev.addEventListener("click", function () {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });
  next.addEventListener("click", function () {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  // Left / Right arrow keys when the track is focused
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); next.click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); prev.click(); }
  });

  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
  update();
})();
