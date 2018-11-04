// utilities
let get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

let getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  let i = 0;
  let txt = `sceptre tasks new
            [Entry mode; press return to save and advance; press Cmd+C to quit without saving]

            ? Task Title: hello world
            ? Task Body: I need to make a better example
            Task Added ✅
            `;
  let speed = 50;

  function typeItOut() {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// toggle tabs on codeblock
window.addEventListener("load", function () {
  // get all tab_containers in the document
  let tabContainers = getAll(".tab__container");

  // bind click event to each tab container
  for (let i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // each click event is scoped to the tab_container
  function tabClick(event) {
    let scope = event.currentTarget.parentNode;
    let clickedTab = event.target;
    let tabs = getAll('.tab', scope);
    let panes = getAll('.tab__pane', scope);
    let activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // remove all active tab classes
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    // remove all active pane classes
    for (let i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // apply active classes on desired tab and pane
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//in page scrolling for documentaiton page
let btns = getAll('.js-btn');
let sections = getAll('.js-section');

function setActiveLink(event) {
  // remove all active tab classes
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  // for (let i = 0; i<btns.length; i++) {
  //   btns[i].addEventListener('click', function(event) {
  //     smoothScrollTo(sections[i], event);
  //   });
  // }
  btns[0].addEventListener('click', function (event) {
    smoothScrollTo(sections[0], event);
  });

  btns[1].addEventListener('click', function (event) {
    smoothScrollTo(sections[1], event);
  });

  btns[2].addEventListener('click', function (event) {
    smoothScrollTo(sections[2], event);
  });

  btns[3].addEventListener('click', function (event) {
    smoothScrollTo(sections[3], event);
  });
}

// fix menu to page-top once user starts scrolling
window.addEventListener('scroll', function () {
  let docNav = get('.doc__nav > ul');

  if (docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
let topNav = get('.menu');
let icon = get('.toggle');

window.addEventListener('load', function () {
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});
