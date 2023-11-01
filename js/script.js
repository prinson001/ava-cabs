const h1 = document.querySelector(".heading-primary");

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

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

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

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

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

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

/////////////////////////////////////////////////////////////////////
//ANIMATION INTERSECTION OBSERVER

const options = {
  root: null,
  threshold: 0,
  rootMargin: "0px 0px -20px 0px",
};
const animationObserver = new IntersectionObserver(
  (entries, animationObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return; //guard case
      entry.target.classList.toggle(
        entry.target.getAttribute("data-animation_class")
      );
      animationObserver.unobserve(entry.target);
    });
  },
  options
);
const j = document.querySelector(".subheading");
const llll = document.querySelector(".heading-secondary");
const k = document.querySelector(".service-container");
const jj = document.querySelector(".about-heading");
const jjj = document.querySelectorAll(".about-para");
const cards = document.querySelectorAll('.service-card');
const testimonail_heading = document.querySelector('.testi-subheading');
const contactHeading = document.querySelector('.contact-subheading');
const contactSubHeading = document.querySelector('.contact-us-text');
const arr = [];
cards.forEach((e)=>{
  arr.push(e);
});
jjj.forEach((e)=>{
  arr.push(e);
});
arr.push(testimonail_heading);
arr.push(contactHeading);
arr.push(contactSubHeading);
arr.push(llll);
arr.push(k);
arr.push(j);
arr.push(jj);
arr.forEach((a) => {
  animationObserver.observe(a);
});

/////////////////////////////////////////////////////////////////////
//EMAIL SERVICE

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
  const serviceID = "service_e9pi0zh";
  const templateID = "template_pxnqn9e";

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
      alert("Your message sent successfully!!");
    })
    .catch((err) => console.log(err));
}

// /////////////////////////////////////////////////////////////////
// IMAGE OPTIMAZATION

const images = document.querySelectorAll('img');
console.log(images);
imageObserverOptions={
  threshold:0,
  root:null,
  rootMargin:'0px'
}
const imageObserver = new IntersectionObserver((entries , imageObserver)=>{
  entries.forEach(e=>{
    if(! e.isIntersecting) return ;
    if(! e.target.src.includes('compressed')) return;
    e.target.src = e.target.src.replace('-compressed','');
    e.target.addEventListener('load' , function(){
        e.target.classList.remove('blur');
    })
    imageObserver.unobserve(e.target);
  });
},imageObserverOptions);

images.forEach((e)=>{
  imageObserver.observe(e);
})