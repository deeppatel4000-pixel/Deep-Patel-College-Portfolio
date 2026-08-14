/* Marks the primary nav item for the section currently in view.
   Orientation only — nothing on this site waits for JavaScript to appear. */

(function () {
  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!links.length || !("IntersectionObserver" in window)) return;

  var byId = {};
  var sections = [];

  links.forEach(function (link) {
    var section = document.getElementById(link.getAttribute("href").slice(1));
    if (!section) return;
    byId[section.id] = link;
    sections.push(section);
  });

  function clear() {
    links.forEach(function (link) {
      link.removeAttribute("aria-current");
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        clear();
        byId[entry.target.id].setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
