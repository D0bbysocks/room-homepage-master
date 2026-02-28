const navButton = document.querySelector('.hero__nav-button');
const navMenu = document.querySelector('.nav__menu-container');
const heroHeader = document.querySelector('.hero__header');
const arrowButtonLeft = document.querySelector('#hero__arrow-button-left');
const arrowButtonRight = document.querySelector('#hero__arrow-button-right');
const navPrimaryMenu = document.querySelector('.nav__primary-menu');

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

  // Remove transition temporarily to move elements to starting position
  bgNext.style.transition = 'none';
  bgNext.style.transform = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

  textNext.style.transition = 'none';
  textNext.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';

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

  // Move both to their new positions (text goes opposite)
  bgCurrent.style.transform = direction === 'right' ? 'translateX(-100%)' : 'translateX(100%)';
  bgNext.style.transform = 'translateX(0)';

  textCurrent.style.transform = direction === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
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
    
    // Reset next to default hidden position
    bgNext.className = 'hero__bg hero__bg--next';
    bgNext.style.transform = 'translateX(100%)';

    renderSlideText(nextHeader, textCurrent);
    textCurrent.style.transform = 'translateX(0)';
    textNext.style.transform = 'translateX(100%)';

    currentHeader = nextHeader;
    isAnimating = false;
  }, 500); 
}


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

renderSlideText(1, textCurrent);