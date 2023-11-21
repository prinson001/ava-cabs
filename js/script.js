const h1 = document.querySelector(".heading-primary");

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (!href.startsWith("#")) {
      location.href = href;
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

const options = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -20px 0px",
};
const animationObserver = new IntersectionObserver(
  (entries, animationObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.toggle(
        entry.target.getAttribute("data-animation_class")
      );
      animationObserver.unobserve(entry.target);
    });
  },
  options
);
const aboutSectionParas = document.querySelectorAll(".about-para");
const ServiceCards = document.querySelectorAll(".service-card");
const arr = [
  document.querySelector(".service-subheading"),
  document.querySelector(".service-heading"),
  document.querySelector(".about-heading"),
  document.querySelector(".testi-subheading"),
  document.querySelector(".contact-subheading"),
  document.querySelector(".contact-us-text"),
];
ServiceCards.forEach((e) => {
  arr.push(e);
});
aboutSectionParas.forEach((e) => {
  arr.push(e);
});
arr.forEach((a) => {
  animationObserver.observe(a);
});

function sendMail(e) {
  e.preventDefault();
  var params = {
    name: document.getElementById("full-name").value,
    number: document.getElementById("number").value,
    email: document.getElementById("email").value,
    start_date: document.getElementById("start-date").value,
    end_date: document.getElementById("end-date").value,
    place: document.getElementById("place").value,
  };
  const serviceID = "service_ir9cbzj";
  const templateID = "template_r7x2gbo";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("full-name").value = "";
      document.getElementById("number").value = "";
      document.getElementById("start-date").value = "";
      document.getElementById("end-date").value = "";
      document.getElementById("email").value = "";
      document.getElementById("place").value = "";
      console.log(res);
      alert(
        "Your message sent successfully!!(We will contact you back via mail or via call)"
      );
    })
    .catch((err) => console.log(err));
}

const images = document.querySelectorAll("img");
console.log(images);
imageObserverOptions = {
  threshold: 0,
  root: null,
  rootMargin: "0px",
};
const imageObserver = new IntersectionObserver((entries, imageObserver) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    if (!e.target.src.lastIndexOf("compressed") === -1) return;
    e.target.src = e.target.src.replace("-compressed", "");
    e.target.addEventListener("load", function () {
      e.target.classList.remove("blur");
    });
    imageObserver.unobserve(e.target);
  });
}, imageObserverOptions);

images.forEach((e) => {
  imageObserver.observe(e);
});
