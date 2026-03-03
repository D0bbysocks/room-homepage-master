# Frontend Mentor - Room homepage solution

This is a solution to the [Room homepage challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/room-homepage-BtdBY_ENq). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate the slider using either their mouse/trackpad or keyboard

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [https://d0bbysocks.github.io/room-homepage-master/](https://d0bbysocks.github.io/room-homepage-master/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

In this project, I deepened my knowledge of building complex carousels. Instead of standard slide effects, I experimented with moving `div` elements dynamically in and out of the viewport.

The core challenge was synchronizing the sliding states between the image section (`hero__bg`) and the text section (`hero__text`). I used duplicate classes (`--current` and `--next`) to handle the incoming and outgoing structural positions using CSS transforms.

```css
.hero__bg--current {
  transform: translateX(0);
}

.hero__bg--next {
  transform: translateX(100%);
}
```

### Continued development

In retrospect, I spent a significant amount of time orchestrating complex timing and positional logic using JavaScript. Moving forward, I want to explore whether relying more heavily on pure CSS (like native scroll snapping, `@keyframes`, and better state handling via pseudo-classes) could result in a smoother flow and less imperative JavaScript code. Finding the perfect balance between CSS representation and JS logic is definitely my goal for upcoming challenges.

## Author

- Frontend Mentor - [@D0bbysocks](https://www.frontendmentor.io/profile/D0bbysocks)
