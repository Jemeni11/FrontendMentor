# Frontend Mentor - Expenses chart component solution

This is a solution to the [Expenses chart component challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/expenses-chart-component-e7yJBUdjwt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the bar chart and hover over the individual bars to see the correct amounts for each day
- See the current day’s bar highlighted in a different colour to the other bars
- View the optimal layout for the content depending on their device’s screen size
- See hover states for all interactive elements on the page
- **Bonus**: Use the JSON data file provided to dynamically size the bars on the chart

### Links

- Solution URL: [GitHub](https://github.com/Jemeni11/FrontendMentor/tree/02-expenses-chart-component-main)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- JavaScript

### What I learned

> Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

Apparently, it's possible to pass arguments in html like I did below:
```html
<div class="column_container" onmouseover="openToolTip('mon')">
  <div class="column">
    <span id="mon" class="tooltip"></span>
  </div>
</div>
```
and they get handled by javascript

```js
function openToolTip(id) {
  let tooltipPopup = document.getElementById(id);
  data.map((i) => {
    if (i.day === id) {
      tooltipPopup.innerText = `$${i.amount}`;
      tooltipPopup.style.top =
        +tooltipPopup.parentElement.style.height.slice(0, -1) + 20 + "px";
      tooltipPopup.style.left =
        +tooltipPopup.parentElement.style.width.slice(0, -1) + 5 + "px";
    }
  });
  tooltipPopup.classList.toggle("show"); // toggle the tooltip
}
```


## Author

- Website - [Emmanuel Jemeni](https://www.your-site.com)
- Frontend Mentor - [@Jemeni11](https://www.frontendmentor.io/profile/Jemeni11)
- Twitter - [@Jemeni11_](https://www.twitter.com/jemeni11_)
