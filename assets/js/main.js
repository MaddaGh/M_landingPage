/**
* Template Name: Techie
* Template URL: https://bootstrapmade.com/techie-free-skin-bootstrap-3/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


// CARDS

// listing vars here so they're in the global scope
var cards, nCards, cover, openContent, openContentText, pageIsOpen = false,
openContentImage, closeContent, windowWidth, windowHeight, currentCard;

// initiate the process
init();

function init() {
resize();
selectElements();
attachListeners();
}

// select all the elements in the DOM that are going to be used
function selectElements() {
cards = document.getElementsByClassName('card'),
console.log(cards)
nCards = cards.length,
console.log(nCards)
cover = document.getElementById('cover'),
openContent = document.getElementById('open-content'),
openContentText = document.getElementById('open-content-text'),
openContentImage = document.getElementById('open-content-image')
closeContent = document.getElementById('close-content');
}

/* Attaching three event listeners here:
- a click event listener for each card
- a click event listener to the close button
- a resize event listener on the window
*/
function attachListeners() {
for (var i = 0; i < nCards; i++) {
attachListenerToCard(i);
}
closeContent.addEventListener('click', onCloseClick);
window.addEventListener('resize', resize);
}

function attachListenerToCard(i) {
cards[i].addEventListener('click', function(e) { // the anonymous function function(e) is the event handler for the card click event
var card = getCardElement(e.target); // refers to the clicked element. This function (not defined in the snippet) likely finds and returns the closest card element if the click happens on a child element
onCardClick(card, i); // the card and its index
})
}

/* When a card is clicked */
function onCardClick(card, i) {
// set the current card
currentCard = card;
// add the 'clicked' class to the card, so it animates out
currentCard.className += ' clicked';
// animate the card 'cover' after a 500ms delay
setTimeout(function() {animateCoverUp(currentCard)}, 500);
// animate out the other cards
animateOtherCards(currentCard, true);
// add the open class to the page content
openContent.className += ' open';
}

/*
* This effect is created by taking a separate 'cover' div, placing
* it in the same position as the clicked card, and animating it to
* become the background of the opened 'page'.
* It looks like the card itself is animating in to the background,
* but doing it this way is more performant (because the cover div is
* absolutely positioned and has no children), and there's just less
* having to deal with z-index and other elements in the card
*/
function animateCoverUp(card) {
// get the position of the clicked card
var cardPosition = card.getBoundingClientRect(); // DOMRect object with values
// get the style of the clicked card
var cardStyle = getComputedStyle(card);

//set cover position and color
setCoverPosition(cardPosition);
setCoverColor(cardStyle);

// set cover to fill the window
scaleCoverToFillWindow(cardPosition);

// Get the label from the clicked card
console.log(card.children[1]);
console.log(card.children[1].textContent);
console.log(card.children[1].textContent.trim());
var cardLabel = card.children[1].textContent.trim();
console.log(cardLabel);

// Initialize paragraphText as an empty string
var paragraphText = '';

// Function to fetch JSON data and update the paragraphText
fetch('assets/testo.json')
    .then(response => response.json())
    .then(data => {
        // Find the object in the JSON array with the matching label
        var matchingArticle = data.find(item => item.label === cardLabel);

        // If a match is found, update the paragraphText with the matching label's value
        if (matchingArticle) {
            paragraphText = matchingArticle.label; // Set paragraphText to the label's value
        } else {
            // Handle case where no matching label is found
            console.error('No matching article found for label:', cardLabel);
            paragraphText = 'Content not found.';
      }

      // Update the content of the opened page with the paragraphText
      openContentText.innerHTML = `<h1>${card.children[2].textContent}</h1>${paragraphText}`;
      })
      .catch(error => {
          console.error('Error loading content:', error);
          openContentText.innerHTML = `<h1>${card.children[2].textContent}</h1><p>Error loading content.</p>`;
      });

// set the open content image
openContentImage.src = card.children[1].src;

setTimeout(function() {
// update the scroll position to 0 (so it is at the top of the 'opened' page)
//window.scroll(0, 0);
// set page to open
pageIsOpen = true;
}, 300);
}

function animateCoverBack(card) {
var cardPosition = card.getBoundingClientRect();
// the original card may be in a different position, because of scrolling, so the cover position needs to be reset before scaling back down
setCoverPosition(cardPosition);
scaleCoverToFillWindow(cardPosition);
// animate scale back to the card size and position
cover.style.transform = 'scaleX('+1+') scaleY('+1+') translate3d('+(0)+'px, '+(0)+'px, 0px)';
setTimeout(function() {
// set content back to empty
openContentText.innerHTML = '';
openContentImage.src = '';
// style the cover to 0x0 so it is hidden
cover.style.width = '0px';
cover.style.height = '0px';
pageIsOpen = false;
// remove the clicked class so the card animates back in
currentCard.className = currentCard.className.replace(' clicked', '');
}, 301);
}

function setCoverPosition(cardPosition) {
// style the cover so it is in exactly the same position as the card
cover.style.left = cardPosition.left + 'px';
cover.style.top = cardPosition.top + 'px';
cover.style.width = cardPosition.width + 'px';
cover.style.height = cardPosition.height + 'px';
}

function setCoverColor(cardStyle) {
// style the cover to be the same color as the card
cover.style.backgroundColor = cardStyle.backgroundColor;
}

function scaleCoverToFillWindow(cardPosition) {
// calculate the scale and position for the card to fill the page,
var scaleX = windowWidth / cardPosition.width;
var scaleY = windowHeight / cardPosition.height;
var offsetX = (windowWidth / 2 - cardPosition.width / 2 - cardPosition.left) / scaleX;
var offsetY = (windowHeight / 2 - cardPosition.height / 2 - cardPosition.top) / scaleY;
// set the transform on the cover - it will animate because of the transition set on it in the CSS
cover.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+') translate3d('+(offsetX)+'px, '+(offsetY)+'px, 0px)';
}

/* When the close is clicked */
function onCloseClick() {
// Store the current scroll position
var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
// remove the open class so the page content animates out
openContent.className = openContent.className.replace(' open', '');
// animate the cover back to the original position card and size
animateCoverBack(currentCard);
// animate in other cards
animateOtherCards(currentCard, false);
 // Restore the scroll position after animations are done
 setTimeout(function() {
  window.scrollTo(0, scrollTop);
}, 301); // Ensure this timeout matches the timeout in animateCoverBack
}

function animateOtherCards(card, out) {
var delay = 100;
for (var i = 0; i < nCards; i++) {
// animate cards on a stagger, 1 each 100ms
if (cards[i] === card) continue;
if (out) animateOutCard(cards[i], delay);
else animateInCard(cards[i], delay);
delay += 100;
}
}

// animations on individual cards (by adding/removing card names)
function animateOutCard(card, delay) {
setTimeout(function() {
card.className += ' out';
}, delay);
}

function animateInCard(card, delay) {
setTimeout(function() {
card.className = card.className.replace(' out', '');
}, delay);
}

// this function searches up the DOM tree until it reaches the card element that has been clicked
function getCardElement(el) {
if (el.className.indexOf('card ') > -1) return el;
else return getCardElement(el.parentElement);
}

// resize function - records the window width and height
function resize() {
if (pageIsOpen) {
// update position of cover
var cardPosition = currentCard.getBoundingClientRect();
setCoverPosition(cardPosition);
scaleCoverToFillWindow(cardPosition);
}
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
}

var paragraphText = '<p>Nel Counseling Immaginale l\'anima è il cuore pulsante del nostro essere, una dimensione che comunica attraverso le immagini che riflettono come specchi le nostre esperienze interiori più autentiche\.</p> <p>Ogni immagine è un portale per esplorare il nostro mondo interiore rivelando desideri, paure e aspirazioni che plasmano la nostra esistenza.</p><p>Attraverso il Counseling Immaginale accogliamo il richiamo dell\'anima e ci mettiamo in ascolto delle sue profonde verità, aprendo la porta alla trasformazione interiore.</p><p>Le immagini dell\'anima sono intrecciate con il nostro karma, il tessuto invisibile delle nostre vite passate e presenti. Attraverso il lavoro con queste immagini, possiamo scoprire i legami karmici che plasmano le nostre esperienze attuali, aprendo il cammino verso una maggiore consapevolezza e liberazione.</p><p>Nel tessuto della nostra esistenza si intrecciano i miti personali: racconti simbolici che riflettono le sfide e le opportunità della nostra vita.</p><p>Il mito ci offre una mappa per interpretare il significato più profondo delle nostre esperienze. Nel counseling immaginale esploriamo il mito che mettiamo sulla scena della vita vivendo, scoprendo le connessioni tra le nostre vite individuali e il grande racconto dell\'umanità, trovando significato e saggezza nei simboli e nelle storie che ci guidano.</p><p>Un processo fondamentale nel counseling immaginale è la pacificazione delle immagini, attraverso meditazioni, rituali e regressioni. Mediante il lavoro con gli antenati e quello archetipico con le carte dei Nat possiamo riconoscere e trasformare le immagini che ci causano disagio o conflitto, portandole ad uno stato armonico. Questo percorso ci permette di liberare energie bloccate e di promuovere il benessere psicofisico facilitando una maggiore integrazione delle esperienze emotive.</p><p>Inizia il tuo viaggio di esplorazione e trasformazione. Concediti il dono di vivere intensamente le tue emozioni, di abbracciare il richiamo dell\'anima e di trasformare il tuo karma attraverso il potere delle immagini e dei miti personali.</p><p>';
