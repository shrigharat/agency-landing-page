const darkModeQuery = window.matchMedia('(prefers-color-scheme:dark)');

const darkModeToggle = document.querySelector('a.dark-mode-toggle');
const darkModeLabel = darkModeToggle.querySelector('span');

const body = document.querySelector('body');

const menuToggle = document.querySelector('a.menu-toggle');
const sideMenuLabel = menuToggle.querySelector('span');


const updateDarkMode = function() {
    if(darkModeQuery.matches) {
        darkModeLabel.innerHTML = 'Light Mode';
        body.classList.add('dark-mode');
        gsap.to('g.toggle', {x: 43});
    } else {
        darkModeLabel.innerHTML = 'Dark Mode';
        body.classList.remove('dark-mode');
        gsap.to('g.toggle', {x: 19});
    }
}

darkModeToggle.addEventListener('click', (e) => { 
    if(body.classList.contains('dark-mode')) {
        darkModeLabel.innerHTML = 'Dark Mode';
        gsap.to('g.toggle', {x: 19});
    } else {
        darkModeLabel.innerHTML = 'Light Mode';
        gsap.to('g.toggle', {x: 43});
    }

    const wiperTimeline = gsap.timeline();

    wiperTimeline
        .set('div.wipe', { height: 0, top: 0 })
        .to('div.wipe', { height: '100%' })
        .add(() => {
            body.classList.toggle('dark-mode');
        })
        .to('div.wipe', { height: 0, top: '100%' })
})

menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');

    if(body.classList.contains('menu-open')) {
        sideMenuLabel.innerHTML = 'Close';

        gsap.to('.burger-mid', { width: 0 });
        gsap.to('.burger-top', { rotation: 45, transformOrigin: '50% 50%', y: 8 });
        gsap.to('.burger-bottom', { rotation: -45, transformOrigin: '50% 50%', y: -8 });
    } else {
        sideMenuLabel.innerHTML = 'Menu';
        gsap.to('.burger-mid', { width: '28' });
        gsap.to('.burger-top', { rotation: 0, y: 0 });
        gsap.to('.burger-bottom', { rotation: 0, y: 0 });
    }
})




updateDarkMode();

darkModeQuery.addListener(() => {
    updateDarkMode();
});

const spiralTimeline = gsap.timeline({
    repeat: -1
});

spiralTimeline
    .set('svg.spiral rect', {
        rotation: 0,
        transformOrigin: "50%, 50%" 
    })
    .set('svg.spiral rect:nth-child(1)', {
        rotation: 15
    })
    .set('svg.spiral rect:nth-child(3)', {
        rotation: -15
    })
    .to('svg.spiral rect', { 
        rotation: "+=90", 
        transformOrigin: "50%, 50%",
        duration: 4,
        stagger: -0.25
    })