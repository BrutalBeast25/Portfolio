// ============================================================
// MANIVANNAN S – Portfolio JS
// Typed roles | Turbine telemetry trace | Nav | Hamburger | Form
// ============================================================

/* ── Typing role line ── */
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
const roles = ['Data Engineer', 'Data Analyst', 'AI & Machine Learning Engineer '];
const typed = document.getElementById('typed-designation');
if (typed) {
  if (still) {
    typed.textContent = roles[0];
  } else {
    let r = 0, c = 0, del = false;
    (function tick() {
      const word = roles[r];
      typed.textContent = word.slice(0, c);
      if (!del && c === word.length) { del = true; return setTimeout(tick, 1400); }
      if (del && c === 0) { del = false; r = (r + 1) % roles.length; }
      c += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    })();
  }
}

/* ── Live telemetry trace ── */
const trace = document.getElementById('trace'), fill = document.getElementById('traceFill');
const kw = document.getElementById('kw'), ws = document.getElementById('ws');
if (trace && fill) {
  const N = 60, data = Array.from({ length: N }, (_, i) => 40 + 18 * Math.sin(i / 6));
  let t = N;
  const draw = () => {
    const pts = data.map((v, i) => [i * (400 / (N - 1)), 65 - v * 0.6]);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    trace.setAttribute('d', d);
    fill.setAttribute('d', d + ' L400 70 L0 70Z');
  };
  const step = () => {
    t++;
    const v = 45 + 20 * Math.sin(t / 7) + 8 * Math.sin(t / 2.3) + (Math.random() - .5) * 5;
    data.push(v); data.shift();
    kw.textContent = Math.round(900 + v * 22).toLocaleString('en-IN') + ' kW';
    ws.textContent = (5 + v / 10).toFixed(1) + ' m/s';
    draw();
  };
  draw();
  if (!still) setInterval(step, 400);
}

/* ── Navbar Scroll Effect ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

/* ── Active Nav Link ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id)
          link.classList.add('active');
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── Hamburger Menu ── */
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('mobile-open');
  });

  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('mobile-open');
    });
  });
}

/* ── Contact Form — mailto ── */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    // Build mailto link so the message opens in user's email client
    const to = 'mani02051999@gmail.com';
    const mailSubject = encodeURIComponent(subject || `Portfolio contact from ${name}`);
    const body = encodeURIComponent(
      `Hi Manivannan,\n\nName: ${name}\nEmail: ${email}\n\n${message}\n\nSent via portfolio contact form.`
    );
    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${body}`;

    // Visual feedback
    const btn = contactForm.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    btn.textContent = '✓ Opening your email client…';
    btn.style.background = 'linear-gradient(135deg, #16a34a, #15803d)';
    setTimeout(() => {
      btn.textContent = origText;
      btn.style.background = '';
      contactForm.reset();
    }, 3500);
  });
}
