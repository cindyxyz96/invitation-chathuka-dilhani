import { useEffect, useRef, useState } from 'react';
import './index.css';
import './App.css';

/* ─── Helpers ───────────────────────────────────────────── */
function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ─── Floating Petals ───────────────────────────────────── */
function Petals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    emoji: ['🌸', '🌹', '✿', '❀', '🌺'][i % 5],
    left: `${(i * 8.3) % 100}%`,
    delay: `${i * 0.8}s`,
    duration: `${8 + (i % 4) * 2}s`,
    size: `${1 + (i % 3) * 0.3}rem`,
  }));
  return (
    <>
      {petals.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: '-50px',
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}

/* ─── Navbar ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <a href="#hero" className="navbar-brand">C &amp; D</a>
      <ul className="navbar-links">
        {[['#story', 'Our Story'], ['#countdown', 'Countdown'], ['#venue', 'Venue']].map(([href, label]) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = '/images/hero_bg.jpg';
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero invitation">
      <div className={`hero-bg ${bgLoaded ? 'loaded' : ''}`} role="img" aria-label="Romantic floral background" />
      <div className="hero-overlay" />
      <Petals />
      <div className="hero-content">
        <p className="hero-eyebrow animate-fadeInUp delay-100">You are cordially invited to celebrate</p>
        <h1 className="hero-names animate-fadeInUp delay-300">
          Chathuka
          <span className="ampersand">&amp;</span>
          Dilhani
        </h1>
        <div className="hero-date-badge animate-fadeInUp delay-500">
          <span>Wednesday</span>
          <span className="dot" />
          <span>2nd September 2026</span>
          <span className="dot" />
          <span>12:00 PM – 3:30 PM</span>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ─── Story ─────────────────────────────────────────────── */
function Story() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <section className="story-section" id="story" ref={ref} aria-label="Our story">
      <p className={`section-label ${visible ? 'animate-fadeInUp' : 'opacity-0'}`}>Our Love Story</p>
      <h2 className={`section-heading ${visible ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
        Eleven Years of <em>Love &amp; Laughter</em>
      </h2>
      <p className={`section-subtext ${visible ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
        What began as a beautiful connection has grown into a love story that fills every room it enters.
      </p>

      {/* 11 Years badge row */}
      <div className={`years-badge-row ${visible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
        <div className="years-badge">
          <span className="years-number">11</span>
          <span className="years-text">Years<br />of Love</span>
        </div>
        <div className="years-divider" />
        <div className="years-stats">
          <div className="years-stat">
            <span className="stat-number">💍</span>
            <span className="stat-label">Engaged</span>
          </div>
          <div className="years-stat">
            <span className="stat-number">🌍</span>
            <span className="stat-label">Adventures</span>
          </div>
          <div className="years-stat">
            <span className="stat-number">♾️</span>
            <span className="stat-label">Forever</span>
          </div>
        </div>
      </div>

      <div className="story-grid">
        <div className={`story-image-wrap ${visible ? 'animate-slideLeft delay-400' : 'opacity-0'}`}>
          <img
            src="/images/couple_photo.jpg"
            alt="Chathuka and Dilhani together"
            className="story-image"
            loading="lazy"
          />
          <div className="story-image-badge">
            <span className="year">2026</span>
            <span className="label">Forever</span>
          </div>
        </div>
        <div className={`story-text ${visible ? 'animate-slideRight delay-500' : 'opacity-0'}`}>
          <blockquote className="quote">
            "In all the world, there is no heart for me like yours."
          </blockquote>
          <p>
            When two souls found each other, everything changed. What started as a quiet, beautiful friendship blossomed slowly into a love that neither of them could imagine living without. Through the seasons, through the milestones big and small, Chathuka and Dilhani have stood by each other's side with unwavering love and devotion.
          </p>
          <p>
            Endless laughter echoing through the house. Countless adventures, new mornings and cozy evenings, building dreams and turning them into reality, one day at a time.
          </p>
          <p>
            And now, after all those beautiful years, they are ready to make it official — to say to the world what their hearts have always known. ✨
          </p>
          <p className="story-signature">Chathuka &amp; Dilhani</p>
        </div>
      </div>
    </section>
  );
}

/* ─── Countdown ─────────────────────────────────────────── */
function useCountdown(targetDate) {
  const [time, setTime] = useState(() => calcTime(targetDate));
  function calcTime(target) {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000) / 60000),
      secs:  Math.floor((diff % 60000) / 1000),
    };
  }
  useEffect(() => {
    const id = setInterval(() => setTime(calcTime(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function Countdown() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const { days, hours, mins, secs } = useCountdown('2026-09-02T12:00:00');
  const blocks = [
    { value: days,  label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: mins,  label: 'Minutes' },
    { value: secs,  label: 'Seconds' },
  ];
  return (
    <section className="countdown-section" id="countdown" ref={ref} aria-label="Countdown to event">
      <p className={`section-label ${visible ? 'animate-fadeInUp' : 'opacity-0'}`}>The Big Day</p>
      <h2 className={`section-heading ${visible ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
        Counting Down to <em className="gold-shimmer">Forever</em>
      </h2>
      <p className={`section-subtext ${visible ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
        Wednesday, 2nd September 2026 · 12:00 PM – 3:30 PM
      </p>
      <div className={`countdown-grid ${visible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
        {blocks.flatMap((b, i) => {
          const items = [
            <div className="countdown-block" key={b.label}>
              <div className="countdown-number">{String(b.value).padStart(2, '0')}</div>
              <div className="countdown-label">{b.label}</div>
            </div>,
          ];
          if (i < blocks.length - 1) {
            items.push(
              <div className="countdown-separator" key={`sep-${i}`}>
                <span>:</span>
              </div>
            );
          }
          return items;
        })}
      </div>
    </section>
  );
}

/* ─── Venue ─────────────────────────────────────────────── */
// Venue location from: https://maps.app.goo.gl/PwnQVzABrGX3jKfP6
// Coordinates: 7.040072, 79.9260445
const GOOGLE_MAPS_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3959.737782943087!2d79.9260445!3d7.040072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMDInMjQuMyJOIDc5wrA5NicxNS41IkU!5e0!3m2!1sen!2slk!4v1724138400000!5m2!1sen!2slk';
const GOOGLE_MAPS_SHARE_URL = 'https://maps.app.goo.gl/PwnQVzABrGX3jKfP6';


function Venue() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <section className="venue-section" id="venue" ref={ref} aria-label="Venue information">
      <p className={`section-label ${visible ? 'animate-fadeInUp' : 'opacity-0'}`}>Where to Find Us</p>
      <h2 className={`section-heading ${visible ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}>
        Join Us at <em>Home</em>
      </h2>
      <p className={`section-subtext ${visible ? 'animate-fadeInUp delay-200' : 'opacity-0'}`}>
        An intimate celebration surrounded by the people we love most.
      </p>

      <div className={`venue-map-wrap ${visible ? 'animate-fadeInUp delay-300' : 'opacity-0'}`}>
        {/* Event detail pills above the map */}
        <div className="venue-pills">
          <div className="venue-pill">
            <span>📅</span>
            <span>Wednesday, 2nd September 2026</span>
          </div>
          <div className="venue-pill">
            <span>⏰</span>
            <span>12:00 PM – 3:30 PM</span>
          </div>
          <div className="venue-pill">
            <span>🏡</span>
            <span>Home · Intimate Celebration</span>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="map-frame-wrap">
          <iframe
            id="venue-map"
            title="Venue location on Google Maps"
            src={GOOGLE_MAPS_EMBED_SRC}
            width="100%"
            height="460"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-pin-label">
            <span>📍</span>
            <span>Exact address shared with invited guests</span>
          </div>
        </div>

        <a
          href={GOOGLE_MAPS_SHARE_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', textDecoration: 'none', margin: '0 auto' }}
          id="venue-map-btn"
        >
          <span>📍</span>
          <span>Open in Google Maps</span>
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer" aria-label="Footer">
      <div className="divider" style={{ maxWidth: '200px', margin: '0 auto 40px' }}>
        <div className="divider-line" style={{ background: 'linear-gradient(to right, transparent, rgba(183,110,121,0.4), transparent)' }} />
        <div className="divider-diamond" />
        <div className="divider-line" style={{ background: 'linear-gradient(to right, transparent, rgba(183,110,121,0.4), transparent)' }} />
      </div>
      <p className="footer-names">Chathuka &amp; Dilhani</p>
      <p className="footer-tagline">2nd September 2026 · Home Celebration</p>
      <ul className="footer-links">
        {[['#hero', 'Home'], ['#story', 'Our Story'], ['#countdown', 'Countdown'], ['#venue', 'Venue']].map(([href, label]) => (
          <li key={href}><a href={href}>{label}</a></li>
        ))}
      </ul>
      <p className="footer-copy">
        Made with <span className="footer-heart">♥</span> for our engagement celebration
      </p>
    </footer>
  );
}

/* ─── Music Player ──────────────────────────────────────── */
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  // Show button only after audio can play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onCanPlay = () => setReady(true);
    audio.addEventListener('canplaythrough', onCanPlay);
    return () => audio.removeEventListener('canplaythrough', onCanPlay);
  }, []);

  // Attempt to play immediately on mount, and fallback to interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryPlay = () => {
      if (playing) return;
      audio.play().then(() => setPlaying(true)).catch(() => {
        // Browser blocked autoplay, wait for user interaction
      });
    };

    // Try immediately
    tryPlay();

    // Fallback: start on the visitor's very first interaction anywhere on the page
    document.addEventListener('click',      tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('keydown',    tryPlay, { once: true });
    return () => {
      document.removeEventListener('click',      tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown',    tryPlay);
    };
  }, [playing]);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      {/* 🎵 Drop your romantic MP3 at: public/audio/romantic.mp3 */}
      <audio ref={audioRef} src="/audio/romantic.mp3" loop preload="auto" autoPlay />
      <button
        className={`music-btn ${playing ? 'playing' : ''} ${ready ? 'visible' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        id="music-toggle-btn"
        title={playing ? 'Pause music' : 'Play romantic music'}
      >
        {playing ? (
          <span className="music-waves" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </span>
        ) : (
          <span className="music-note" aria-hidden="true">♪</span>
        )}
        <span className="music-tooltip">{playing ? 'Pause music' : 'Play music'}</span>
      </button>
    </>
  );
}

/* ─── Welcome Screen ────────────────────────────────────── */
function WelcomeScreen({ onEnter }) {
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 800); // Wait for fade out
  };

  return (
    <div className={`welcome-screen ${exiting ? 'exiting' : ''}`}>
      <div className="welcome-bg" />
      <div className="welcome-content">
        <p className="hero-eyebrow">You're Invited</p>
        <h2 className="welcome-names">Chathuka &amp; Dilhani</h2>
        <p className="welcome-date">2nd September 2026</p>
        <button className="btn-primary welcome-btn" onClick={handleEnter}>
          <span>💌</span>
          <span>Open Invitation</span>
        </button>
      </div>
    </div>
  );
}

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      {!entered && <WelcomeScreen onEnter={() => setEntered(true)} />}
      <div className={`app-content ${entered ? 'entered' : ''}`}>
        <Navbar />
        <main>
          <Hero />
          <Story />
          <Countdown />
          <Venue />
        </main>
        <Footer />
        <MusicPlayer />
      </div>
    </>
  );
}
