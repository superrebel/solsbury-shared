window.addEventListener('load', (event) => {
    const headerHeight = getComputedStyle(document.body).getPropertyValue('--hh').trim();

    // HOME BIRD
    gsap.to('#SBbird', {
      right: 'auto',
      left: '46.3%',
      duration: 1,
      ease: 'power3.out',
    });

    // FOOTER BIRD --- START
    gsap.from('#golden-birdy', {
      x: '-100vw',
      scrollTrigger: {
        trigger: '#golden-birdy',
        start: 'top 70%',
      },
      duration: 0.6,
      ease: 'power1.inOut',
    });

    // PAGE HEADER
    gsap.to('.page-header', {
      '--move-overlay': '100vw',
      duration: 2,
      ease: 'power2.out',
    });

    const appearBirdTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#section-gradient-s',
        start: 'top 70%',
        toggleActions: 'play none none reset',
      },
    });
    appearBirdTL.from('#section-gradient-s-image', {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.inOut',
    });
    appearBirdTL.from('#appearBird', {
      x: '-100vw',
      duration: 0.6,
      ease: 'power1.inOut',
    });

    //usp list
    const lists = document.querySelectorAll('.usp-list, .w-richtext ul');
    lists.forEach((list) => {
      const listTL = gsap.timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top bottom',
          toggleActions: 'play none none none',
        },
      });
      // animate each li in the list using stagger
      listTL.from(list.querySelectorAll('li'), {
        opacity: 0,
        x:  '-50vw',
        duration: 0.5,
        ease: 'power1.inOut',
        stagger: 0.25,
      } );
    });

    // appearing texts
    const appearTexts = document.querySelectorAll('.w-richtext.appear > p');
    gsap.from(appearTexts, {  // ← direct array meegeven
      scrollTrigger: {
        trigger: appearTexts[0],  // of gebruik trigger per element
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.25,
    });

   
    // FORMS - START
    // default hide all [subject="custom"] elements
    const customElements = document.querySelectorAll('[field="custom"]');
    customElements.forEach((el) => (el.style.display = 'none'));
    // toggle visibility of [subject="custom"] elements on select
    const selects = document.querySelectorAll('select[has="custom"]');
    selects.forEach((select) => {
        select.addEventListener('change', function () {
            const selectedValue = this.value;
            if (selectedValue === 'custom') {
            // get parent element
            select.parentElement.querySelector('[field="custom"]').style.display = 'block';
            } else {
            select.parentElement.querySelector('[field="custom"]').style.display = 'none';
            }
        });
    });
    // hide all .action unless the #id matches the URL hash
    const actionElements = document.querySelectorAll('.action');
    actionElements.forEach((el) => (el.style.display = 'none'));
    const currentHash = window.location.hash;
    if (currentHash) {
        const targetElement = document.querySelector(`.action${currentHash}`);
        if (targetElement) {
          targetElement.style.display = 'block';
        }
    }
    // if anchor with .showForm is clicked, show the corresponding .action from its href
    const showFormButtons = document.querySelectorAll('.showform');
    showFormButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            actionElements.forEach((el) => (el.style.display = 'none'));
            const targetElement = document.querySelector(`.action${targetId}`);
            if (targetElement) {
            targetElement.style.display = 'block';
            }
        });
    });
    // FORMS - END


    const projects = document.getElementById('projectSplide');
    if( projects) {
        let projectsCarousel = new Splide(projects, {
        type: 'slide',
        pagination: false,
        arrows: true,
        perPage: 2,
        perMove: 1,
        gap: '2rem',
        autoplay: false,
        breakpoints: {
            767: {
            perPage: 1,
            },
        },
        });
      projectsCarousel.mount();
    }
    document.body.classList.add('ready');

    // dynamic year in coyright
    const yearEl = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    if (yearEl && currentYear) {
      yearEl.textContent = currentYear;
    }
});