const navButton = document.querySelector('.hero__nav-button');
const navMenu = document.querySelector('.nav__menu-container');
const heroHeader = document.querySelector('.hero__header');
const arrowButtonLeft = document.querySelector('#hero__arrow-button-left');
const arrowButtonRight = document.querySelector('#hero__arrow-button-right');
const navPrimaryMenu = document.querySelector('.nav__primary-menu');
const backdrop = document.querySelector('.backdrop');

let currentHeader = 1;
const headerClasses = {
  1: 'hero__header-first',
  2: 'hero__header-second',
  3: 'hero__header-third'
};

navButton.addEventListener('click', () => {
    const isExpanded = navButton.ariaExpanded === 'true';
  
    navButton.ariaExpanded = !isExpanded;
    navMenu.dataset.visible = !isExpanded;
    navPrimaryMenu.hidden = isExpanded;
    backdrop.hidden = isExpanded;
  });


const bgCurrent = document.querySelector('.hero__bg--current');
const bgNext = document.querySelector('.hero__bg--next');
const textCurrent = document.querySelector('.hero__text--current');
const textNext = document.querySelector('.hero__text--next');

let isAnimating = false;

function changeHeroHeader(direction) {
  if (isAnimating) return;
  
  let nextHeader = currentHeader;
  
  if (direction === 'left') nextHeader--;
  if (direction === 'right') nextHeader++;

  if (nextHeader > 3) nextHeader = 1;
  if (nextHeader < 1) nextHeader = 3;

  renderSlideText(nextHeader, textNext);

  isAnimating = true;

  const isMobile = !mqDesktop.matches;

  // OUTGOING: Where the current element goes to
  const bgOut = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
  // INCOMING: Where the next element comes from
  const bgIn = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  const textOut = isMobile 
    ? (direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)') // Opposite of BG on mobile
    : bgOut; // Same as BG on desktop

  const textIn = isMobile
    ? (direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)') // Opposite of BG on mobile
    : bgIn; // Same as BG on desktop

  // Remove transition temporarily to move next elements to STARTING position
  bgNext.style.transition = 'none';
  bgNext.style.transform = bgIn;

  textNext.style.transition = 'none';
  textNext.style.transform = textIn;

  // Set the correct image class for next
  bgNext.className = `hero__bg hero__bg--next ${headerClasses[nextHeader]}`;

  // Force a reflow so the browser registers the starting positions
  void bgNext.offsetWidth;
  void textNext.offsetWidth;

  // Re-enable transitions
  bgCurrent.style.transition = 'transform 0.5s ease-in-out';
  bgNext.style.transition = 'transform 0.5s ease-in-out';
  textCurrent.style.transition = 'transform 0.5s ease-in-out';
  textNext.style.transition = 'transform 0.5s ease-in-out';

  // GO TO TARGET POSITIONS
  // BG
  bgCurrent.style.transform = bgOut;
  bgNext.style.transform = 'translateX(0)';

  // TEXT
  textCurrent.style.transform = textOut;
  textNext.style.transform = 'translateX(0)';

  // Clean up after transition
  setTimeout(() => {
    // Reset currents and transforms without animation
    bgCurrent.style.transition = 'none';
    bgNext.style.transition = 'none';
    textCurrent.style.transition = 'none';
    textNext.style.transition = 'none';

    // The new image becomes current
    bgCurrent.className = `hero__bg hero__bg--current ${headerClasses[nextHeader]}`;
    bgCurrent.style.transform = 'translateX(0)';
    
    // Reset next to default hidden position (could be either side, we just push it out of view)
    bgNext.className = 'hero__bg hero__bg--next';
    bgNext.style.transform = 'translateX(100%)';

    renderSlideText(nextHeader, textCurrent);
    textCurrent.style.transform = 'translateX(0)';
    textNext.style.transform = 'translateX(100%)';

    currentHeader = nextHeader;
    isAnimating = false;
  }, 500); 
}


const textContainer = document.querySelector('.hero__text-container');

function lockHeroTextHeight() {
  
  textContainer.style.height = 'auto';

  const h1 = textCurrent.offsetHeight;
  const h2 = textNext.offsetHeight;
  const max = Math.max(h1, h2);

  textContainer.style.height = `${max}px`;
}


const mqDesktop = window.matchMedia('(min-width: 1024px)');

function syncNavForViewport() {
  if (mqDesktop.matches) {
    // Desktop: immer sichtbar
    navPrimaryMenu.hidden = false;
    navMenu.dataset.visible = true;

    navButton.ariaExpanded = 'true'; // optional, damit State konsistent ist
  } else {
    // Mobile: Startzustand zu (oder wie du willst)
    navPrimaryMenu.hidden = true;
    navMenu.dataset.visible = false;
    navButton.ariaExpanded = 'false';
  }
}

mqDesktop.addEventListener('change', syncNavForViewport);
window.addEventListener('load', syncNavForViewport);



function renderSlideText(index, targetEl) {
  const tpl = document.querySelector(`#slide-${index}`);
  if (!tpl) return;

  // Ersetzt den kompletten Inhalt des Targets mit dem Template-Inhalt
  targetEl.replaceChildren(tpl.content.cloneNode(true));
}

arrowButtonLeft.addEventListener('click', () => {
  changeHeroHeader('left');
});

arrowButtonRight.addEventListener('click', () => {
  changeHeroHeader('right');
});

window.addEventListener('load', lockHeroTextHeight);
window.addEventListener('resize', lockHeroTextHeight);
document.fonts?.ready?.then(lockHeroTextHeight);




renderSlideText(1, textCurrent);
lockHeroTextHeight();

renderSlideText(1, textCurrent);