// ================== DOCUMENT READY ==================
$(document).ready(function () {

  // ================== BANNER SLIDER ==================
  $('.banner-slider').slick({
    dots: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true
  });

  // ================== BRAND ROW ONE ==================
  $('.brand-row-one').slick({
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    rtl: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 7 } },
      { breakpoint: 756, settings: { slidesToShow: 5 } },
      { breakpoint: 576, settings: { slidesToShow: 3 } }
    ]
  });

  // ================== BRAND ROW TWO ==================
  $('.brand-row-two').slick({
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    rtl: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 7 } },
      { breakpoint: 756, settings: { slidesToShow: 5 } },
      { breakpoint: 576, settings: { slidesToShow: 3 } }
    ]
  });

  // ================== SLIDER FOUR ==================
  $('.slider-four').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 756, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } }
    ]
  });

  // ================== TAB SLIDER ==================
  $('.tab-slider').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    infinite: false,
    arrows: true,
    variableWidth: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 7 } },
      { breakpoint: 756, settings: { slidesToShow: 5 } },
      { breakpoint: 576, settings: { slidesToShow: 3 } }
    ]
  });

  // ================== PRICE RANGE FILL COLOR ==================
  const range = document.getElementById("priceRange");

  function updateFill() {
    const percent = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.backgroundSize = percent + "% 100%";
  }

  if (range) {
    range.addEventListener("input", updateFill);
    updateFill();
  }

  // ================== FILE UPLOAD HANDLING ==================
  $("#uploadBox").on("click", function () {
    $("#csvInput").click();
  });

  $("#csvInput").on("change", function () {
    let file = this.files[0];
    if (!file) return;

    $("#fileProgress").removeClass("d-none");
    $("#fileName").text(file.name);
    $("#fileSize").text(" • " + (file.size / 1024 / 1024).toFixed(2) + " MB");

    simulateProgress();
  });

  $("#removeFile").on("click", function () {
    $("#fileProgress").addClass("d-none");
    $("#progressBar").css("width", "0%");
    $("#progressText").text("0%");
    $("#csvInput").val("");
  });

  // ================== SUBMIT BUTTON ==================
  $("#submitBtn").on("click", function () {

    let itemCodes = $("#itemCode").val().trim();
    let file = $("#csvInput")[0].files[0];

    if (!file && itemCodes === "") {
      alert("Please upload CSV OR enter item codes.");
      return;
    }

    const modalEl = document.getElementById("bulkQuoteModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    $("#itemCode").val("");
    $("#csvInput").val("");
    $("#fileProgress").addClass("d-none");
    $("#progressBar").css("width", "0%");
    $("#progressText").text("0%");

    setTimeout(() => {
      const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl);
      toast.show();
    }, 300);
  });

  // ================== MOBILE FILTER PANEL (FIXED) ==================
  const openBtn = document.getElementById("openFilters");
  const panel = document.getElementById("filtersPanel");
  const overlay = document.getElementById("filtersOverlay");
  const closeBtn = document.querySelector(".close-filters");

  if (openBtn && panel && overlay && closeBtn) {
    openBtn.addEventListener("click", () => {
      panel.classList.add("open");
      overlay.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
      panel.classList.remove("open");
      overlay.classList.remove("show");
    });

    overlay.addEventListener("click", () => {
      panel.classList.remove("open");
      overlay.classList.remove("show");
    });
  }

}); // END document.ready



// ================== PROGRESS ANIMATION ==================
function simulateProgress() {
  let width = 0;
  let bar = document.getElementById("progressBar");
  let text = document.getElementById("progressText");

  let interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      return;
    }
    width += 5;
    bar.style.width = width + "%";
    text.textContent = width + "%";
  }, 150);
}



// ================== COUNTER ANIMATION ==================
(function () {
  const counters = document.querySelectorAll(".stat-number");
  const duration = 2000;

  const formatNumber = (n) => (n >= 1000 ? Math.round(n / 1000) + "k" : n);

  const runCounters = () => {
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      counters.forEach((el) => {
        const target = +el.getAttribute("data-target");
        const value = Math.floor(progress * target);
        el.textContent =
          value >= target
            ? (target >= 1000 ? formatNumber(target) + "+" : target + "+")
            : (value >= 1000 ? formatNumber(value) : value);
      });

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        runCounters();
        counters.forEach((c) => obs.unobserve(c));
      }
    },
    { threshold: 0.3 }
  );

  counters.forEach((c) => observer.observe(c));
})();

$('button[data-bs-toggle="tab"]').on('show.bs.tab', function (e) {
  $('.tab-slider .nav-link').removeClass('active');
  $(e.target).addClass('active');
});

$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function () {
  $('.tab-slider').slick('setPosition');
});
