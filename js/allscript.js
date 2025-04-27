const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    let count = 0;
    const increment = Math.ceil(target / 100); // You can tweak this for speed

    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = `$${count.toLocaleString()}${suffix}`;
        setTimeout(update, 20);
      } else {
        counter.innerText = `$${target.toLocaleString()}${suffix}`;
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    observer.observe(counter);
  });
  
   const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');
  const navbar = document.getElementById('navbar');

  let menuOpen = false;

  function toggleMenu(state) {
    menuOpen = state ?? !menuOpen;

    menuToggle.classList.toggle('menu-open', menuOpen);
    mobileMenu.classList.toggle('translate-x-full', !menuOpen);
    overlay.classList.toggle('hidden', !menuOpen);
  }

  menuToggle.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  const closeMenuBtn = document.getElementById('closeMenu');

closeMenuBtn.addEventListener('click', () => toggleMenu(false));


  // Scroll effect for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.remove('bg-transparent', 'text-white');
      navbar.classList.add('bg-white', 'shadow-md', 'text-gray');
    } else {
      navbar.classList.remove('bg-white', 'shadow-md', 'text-white');
      navbar.classList.add('bg-transparent', 'text-white');
    }
  });
 