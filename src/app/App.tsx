function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      category: "LEARN",
      title: "A better way to learn.",
      text: "Keep lectures, chapter notes, books and study resources in one organised learning space.",
      image: "https://images.unsplash.com/photo-1769794371055-54436b54577e?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Books, laptop and study materials on a desk",
      icon: BookOpen,
      link: "/login",
    },
    {
      number: "02",
      category: "UNDERSTAND",
      title: "Think beyond the textbook.",
      text: "Explore difficult concepts, ask questions and get guided explanations with the AI Teacher.",
      image: "https://images.unsplash.com/photo-1758611971270-89ce7ed506e1?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Student working at a laptop and taking notes",
      icon: Brain,
      link: "/login",
    },
    {
      number: "03",
      category: "PRACTISE",
      title: "Turn knowledge into marks.",
      text: "Prepare with tests, DPPs, PYQs and mock exam practice. Review your mistakes and improve.",
      image: "https://images.unsplash.com/photo-1759984782211-3a02ca78e6ac?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Student writing notes at a study desk",
      icon: Target,
      link: "/login",
    },
    {
      number: "04",
      category: "IMPROVE",
      title: "See your progress clearly.",
      text: "Understand your preparation through syllabus tracking, performance insights and revision planning.",
      image: "https://images.unsplash.com/photo-1769794371055-54436b54577e?auto=format&fit=crop&w=1200&q=85",
      imageAlt: "Organised study desk with books and notes",
      icon: BarChart3,
      link: "/login",
    },
  ];

  const faqs = [
    {
      q: "Who is JEE 360 made for?",
      a: "JEE 360 is designed for Class 11, Class 12 and dropper students preparing for JEE Main, JEE Advanced or NEET.",
    },
    {
      q: "How do I create my account?",
      a: "Click Continue with Google, sign in with your Google account and complete your student profile.",
    },
    {
      q: "Is JEE 360 free?",
      a: "JEE 360 is being developed with a zero-cost approach. Features will be introduced gradually as they are completed.",
    },
    {
      q: "Can I use JEE 360 on my phone?",
      a: "Yes. The homepage is designed to adapt to desktop, tablet and mobile screens.",
    },
  ];

  return (
    <div className="lux-home">
      <style>{`
        .lux-home {
          --lux-bg: #0b0b0a;
          --lux-panel: #141412;
          --lux-paper: #eee8dc;
          --lux-muted: #a49d91;
          --lux-line: rgba(238,232,220,.16);
          --lux-accent: #b69b7b;
          min-height: 100vh;
          overflow: hidden;
          background: var(--lux-bg);
          color: var(--lux-paper);
          font-family: Inter, "Helvetica Neue", Arial, sans-serif;
          position: relative;
          isolation: isolate;
        }

        .lux-home, .lux-home * { box-sizing: border-box; }
        .lux-home button, .lux-home a { -webkit-tap-highlight-color: transparent; }
        .lux-wrap { width: min(1320px, calc(100% - 76px)); margin: 0 auto; }

        .lux-nav {
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border-bottom: 1px solid var(--lux-line);
        }

        .lux-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--lux-paper);
          text-decoration: none;
        }

        .lux-brand-mark {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(238,232,220,.55);
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: 21px;
          transform: rotate(-8deg);
        }

        .lux-brand-name {
          font-size: 15px;
          font-weight: 850;
          letter-spacing: 2.8px;
        }

        .lux-brand-sub {
          display: block;
          margin-top: 4px;
          color: var(--lux-muted);
          font-size: 8px;
          letter-spacing: 2px;
        }

        .lux-nav-links {
          display: flex;
          align-items: center;
          gap: 31px;
        }

        .lux-nav-links a {
          color: #c4bdb1;
          font-size: 11px;
          text-decoration: none;
          transition: color .2s ease;
        }

        .lux-nav-links a:hover { color: white; }

        .lux-nav-cta, .lux-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          min-height: 47px;
          padding: 0 20px;
          border: 1px solid var(--lux-paper);
          border-radius: 0;
          background: var(--lux-paper);
          color: #11110f;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          text-decoration: none;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .25s, color .25s, transform .25s;
        }

        .lux-nav-cta:hover, .lux-button:hover {
          transform: translateY(-3px);
          background: transparent;
          color: var(--lux-paper);
        }

        .lux-button-outline {
          border-color: rgba(238,232,220,.45);
          background: transparent;
          color: var(--lux-paper);
        }

        .lux-button-outline:hover {
          border-color: var(--lux-paper);
          background: var(--lux-paper);
          color: #11110f;
        }

        .lux-hero {
          min-height: 710px;
          display: grid;
          grid-template-columns: 1.02fr .98fr;
          align-items: center;
          gap: 7%;
          padding: 78px 0 90px;
        }

        .lux-overline {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--lux-accent);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2.6px;
          text-transform: uppercase;
        }

        .lux-overline:before {
          content: "";
          width: 35px;
          height: 1px;
          background: var(--lux-accent);
        }

        .lux-hero h1 {
          max-width: 740px;
          margin: 27px 0 24px;
          color: var(--lux-paper);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(58px, 7.4vw, 105px);
          font-weight: 400;
          letter-spacing: -5.5px;
          line-height: .98;
        }

        .lux-hero h1 em {
          color: var(--lux-accent);
          font-weight: 400;
        }

        .lux-hero-copy {
          max-width: 480px;
          color: #aaa397;
          font-size: 14px;
          line-height: 1.95;
        }

        .lux-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 32px;
        }

        .lux-hero-foot {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 42px;
          color: #8e887e;
          font-size: 9px;
          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        .lux-hero-foot span:first-child {
          width: 28px;
          height: 1px;
          background: var(--lux-accent);
        }

        .lux-hero-visual {
          min-width: 0;
          position: relative;
          perspective: 1200px;
          padding: 0 12px 22px 0;
        }

        .lux-hero-frame {
          position: relative;
          height: min(570px, 53vw);
          min-height: 410px;
          overflow: hidden;
          background: #26231e;
          border: 1px solid rgba(238,232,220,.22);
          box-shadow: 24px 26px 0 rgba(182,155,123,.10);
          transform: rotateY(-5deg) rotateX(2deg);
          transition: transform .7s cubic-bezier(.2,.7,.2,1);
        }

        .lux-hero-visual:hover .lux-hero-frame {
          transform: rotateY(0deg) rotateX(0deg) translateY(-5px);
        }

        .lux-hero-frame img,
        .lux-hero-frame video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .lux-hero-frame img { filter: saturate(.62) brightness(.72); }
        .lux-hero-frame video { z-index: 1; opacity: .82; }

        .lux-hero-frame:after {
          content: "";
          position: absolute;
          z-index: 2;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.12) 45%, rgba(0,0,0,.78));
          pointer-events: none;
        }

        .lux-image-caption {
          position: absolute;
          z-index: 3;
          left: 27px;
          right: 27px;
          bottom: 26px;
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 15px;
        }

        .lux-image-caption strong {
          display: block;
          max-width: 260px;
          font-family: Georgia, serif;
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 400;
          line-height: 1.1;
        }

        .lux-image-caption small {
          display: block;
          margin-bottom: 9px;
          color: #d5c5ae;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .lux-image-index {
          color: #e7dfd2;
          font-family: Georgia, serif;
          font-size: 38px;
        }

        .lux-side-note {
          position: absolute;
          top: 20px;
          right: -21px;
          writing-mode: vertical-rl;
          color: #9b9284;
          font-size: 8px;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .lux-photo-stamp {
          position: absolute;
          z-index: 4;
          top: 28px;
          left: -28px;
          width: 84px;
          height: 84px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(238,232,220,.55);
          border-radius: 50%;
          background: #11110f;
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: 12px;
          line-height: 1.3;
          text-align: center;
          animation: lux-stamp 12s linear infinite;
        }

        @keyframes lux-stamp {
          to { transform: rotate(360deg); }
        }

        .lux-marquee {
          overflow: hidden;
          border-top: 1px solid var(--lux-line);
          border-bottom: 1px solid var(--lux-line);
          padding: 17px 0;
        }

        .lux-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 35px;
          animation: lux-marquee 32s linear infinite;
        }

        .lux-marquee-track span {
          color: #b8afa1;
          font-family: Georgia, serif;
          font-size: 17px;
          font-style: italic;
          white-space: nowrap;
        }

        .lux-marquee-track i {
          color: var(--lux-accent);
          font-size: 13px;
          font-style: normal;
        }

        @keyframes lux-marquee {
          to { transform: translateX(-50%); }
        }

        .lux-section {
          padding: 115px 0;
          border-bottom: 1px solid var(--lux-line);
        }

        .lux-section-heading {
          max-width: 760px;
          margin-bottom: 48px;
        }

        .lux-section-heading h2 {
          margin: 20px 0 15px;
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: clamp(39px, 5.2vw, 68px);
          font-weight: 400;
          letter-spacing: -2.8px;
          line-height: 1.04;
        }

        .lux-section-heading p {
          max-width: 570px;
          color: var(--lux-muted);
          font-size: 13px;
          line-height: 1.9;
        }

        .lux-feature-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .lux-feature-card {
          min-width: 0;
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          min-height: 260px;
          overflow: hidden;
          border: 1px solid var(--lux-line);
          background: var(--lux-panel);
          text-decoration: none;
          color: inherit;
          transition: transform .35s, border-color .35s;
        }

        .lux-feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(182,155,123,.7);
        }

        .lux-feature-image {
          min-height: 100%;
          overflow: hidden;
          background: #25221d;
        }

        .lux-feature-image img {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          filter: saturate(.55) brightness(.75);
          transition: transform .8s, filter .8s;
        }

        .lux-feature-card:hover .lux-feature-image img {
          transform: scale(1.07);
          filter: saturate(.85) brightness(.9);
        }

        .lux-feature-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 25px;
        }

        .lux-feature-number {
          color: var(--lux-accent);
          font-family: Georgia, serif;
          font-size: 13px;
        }

        .lux-feature-copy small {
          color: #8f887d;
          font-size: 8px;
          letter-spacing: 2px;
        }

        .lux-feature-copy h3 {
          margin: 12px 0 10px;
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: clamp(23px, 2.3vw, 32px);
          font-weight: 400;
          line-height: 1.08;
        }

        .lux-feature-copy p {
          margin: 0;
          color: var(--lux-muted);
          font-size: 10px;
          line-height: 1.8;
        }

        .lux-feature-arrow {
          margin-top: 19px;
          color: var(--lux-accent);
          transition: transform .25s;
        }

        .lux-feature-card:hover .lux-feature-arrow { transform: translate(5px,-5px); }

        .lux-subjects {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid var(--lux-line);
          border-bottom: 1px solid var(--lux-line);
        }

        .lux-subject {
          padding: 27px 20px;
          border-right: 1px solid var(--lux-line);
          transition: background .25s;
        }

        .lux-subject:last-child { border-right: 0; }
        .lux-subject:hover { background: rgba(238,232,220,.045); }

        .lux-subject span {
          color: var(--lux-accent);
          font-family: Georgia, serif;
          font-size: 12px;
        }

        .lux-subject h3 {
          margin: 13px 0 7px;
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: 25px;
          font-weight: 400;
        }

        .lux-subject p {
          margin: 0;
          color: var(--lux-muted);
          font-size: 9px;
          line-height: 1.7;
        }

        .lux-journey {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 10%;
          align-items: start;
        }

        .lux-journey-title {
          position: sticky;
          top: 30px;
        }

        .lux-journey-title h2 {
          margin: 20px 0;
          font-family: Georgia, serif;
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 400;
          letter-spacing: -2px;
          line-height: 1.02;
        }

        .lux-journey-title p {
          color: var(--lux-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .lux-step {
          display: grid;
          grid-template-columns: 55px 1fr;
          gap: 20px;
          padding: 27px 0;
          border-bottom: 1px solid var(--lux-line);
        }

        .lux-step:first-child { border-top: 1px solid var(--lux-line); }

        .lux-step-num {
          color: var(--lux-accent);
          font-family: Georgia, serif;
          font-size: 18px;
        }

        .lux-step h3 {
          margin: 0 0 8px;
          font-family: Georgia, serif;
          font-size: 25px;
          font-weight: 400;
        }

        .lux-step p {
          max-width: 480px;
          margin: 0;
          color: var(--lux-muted);
          font-size: 11px;
          line-height: 1.8;
        }

        .lux-photo-band {
          position: relative;
          min-height: 390px;
          overflow: hidden;
          display: flex;
          align-items: end;
          padding: 38px;
          background: #25221d;
        }

        .lux-photo-band img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(.45) brightness(.5);
          transition: transform 1.1s;
        }

        .lux-photo-band:hover img { transform: scale(1.035); }

        .lux-photo-band:after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,rgba(0,0,0,.7),rgba(0,0,0,.08));
        }

        .lux-photo-band-content {
          position: relative;
          z-index: 1;
          max-width: 620px;
        }

        .lux-photo-band-content h2 {
          margin: 18px 0;
          font-family: Georgia, serif;
          font-size: clamp(37px, 5.5vw, 70px);
          font-weight: 400;
          line-height: 1;
          letter-spacing: -2px;
        }

        .lux-photo-band-content p {
          max-width: 430px;
          color: #d0c7b9;
          font-size: 12px;
          line-height: 1.8;
        }

        .lux-faq {
          max-width: 850px;
          margin: 0 auto;
          border-top: 1px solid var(--lux-line);
        }

        .lux-faq details { border-bottom: 1px solid var(--lux-line); }

        .lux-faq summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 22px 0;
          color: var(--lux-paper);
          font-family: Georgia, serif;
          font-size: 19px;
          cursor: pointer;
          list-style: none;
        }

        .lux-faq summary::-webkit-details-marker { display: none; }
        .lux-faq summary:after {
          content: "+";
          color: var(--lux-accent);
          font-family: Arial, sans-serif;
          font-size: 22px;
        }
        .lux-faq details[open] summary:after { content: "−"; }

        .lux-faq p {
          max-width: 700px;
          margin: -4px 0 23px;
          color: var(--lux-muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .lux-final {
          position: relative;
          overflow: hidden;
          margin: 105px 0 75px;
          padding: 85px 35px;
          border: 1px solid var(--lux-line);
          text-align: center;
          background:
            radial-gradient(ellipse at 50% 120%, rgba(182,155,123,.16), transparent 60%),
            #11110f;
        }

        .lux-final h2 {
          max-width: 850px;
          margin: 23px auto 17px;
          font-family: Georgia, serif;
          font-size: clamp(42px, 6vw, 76px);
          font-weight: 400;
          letter-spacing: -3px;
          line-height: 1;
        }

        .lux-final p {
          margin: 0 auto 28px;
          color: var(--lux-muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .lux-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 25px 0 35px;
          border-top: 1px solid var(--lux-line);
          color: #827c72;
          font-size: 9px;
          letter-spacing: .7px;
        }

        .lux-footer strong {
          color: var(--lux-paper);
          letter-spacing: 2px;
        }

        @media (max-width: 900px) {
          .lux-wrap { width: min(100% - 44px, 1320px); }
          .lux-hero { grid-template-columns: 1fr 1fr; gap: 4%; }
          .lux-hero h1 { font-size: clamp(55px, 8vw, 78px); }
          .lux-feature-card { grid-template-columns: 1fr; }
          .lux-feature-image img { height: 190px; min-height: 190px; }
          .lux-feature-copy { min-height: 220px; }
          .lux-journey { gap: 6%; }
        }

        @media (max-width: 650px) {
          .lux-wrap { width: calc(100% - 34px); }
          .lux-nav { height: 72px; }
          .lux-nav-links { display: none; }
          .lux-nav-cta { min-height: 40px; padding: 0 11px; font-size: 8px; }
          .lux-brand-mark { width: 34px; height: 34px; }
          .lux-brand-name { font-size: 13px; }
          .lux-hero {
            min-height: auto;
            grid-template-columns: 1fr;
            gap: 42px;
            padding: 64px 0 70px;
          }
          .lux-hero h1 { max-width: 520px; font-size: clamp(55px, 15vw, 82px); letter-spacing: -3px; }
          .lux-hero-copy { font-size: 12px; }
          .lux-hero-foot { margin-top: 27px; }
          .lux-hero-frame { height: 440px; min-height: 0; transform: none; }
          .lux-photo-stamp { left: -9px; width: 70px; height: 70px; }
          .lux-side-note { right: -13px; }
          .lux-section { padding: 76px 0; }
          .lux-section-heading h2 { font-size: 46px; }
          .lux-feature-grid { grid-template-columns: 1fr; }
          .lux-feature-card { grid-template-columns: .9fr 1.1fr; min-height: 225px; }
          .lux-feature-image img { height: 100%; min-height: 225px; }
          .lux-feature-copy { min-height: 225px; padding: 17px; }
          .lux-feature-copy h3 { font-size: 24px; }
          .lux-feature-copy p { font-size: 9px; }
          .lux-subjects { grid-template-columns: repeat(2,1fr); }
          .lux-subject:nth-child(2) { border-right: 0; }
          .lux-subject:nth-child(-n+2) { border-bottom: 1px solid var(--lux-line); }
          .lux-journey { grid-template-columns: 1fr; gap: 30px; }
          .lux-journey-title { position: static; }
          .lux-photo-band { min-height: 360px; padding: 25px; }
          .lux-final { margin: 70px 0 50px; padding: 60px 20px; }
          .lux-final h2 { font-size: 48px; }
          .lux-footer { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 390px) {
          .lux-hero-frame { height: 370px; }
          .lux-feature-card { grid-template-columns: 1fr; }
          .lux-feature-image img { height: 180px; min-height: 180px; }
          .lux-feature-copy { min-height: 205px; }
          .lux-button { padding: 0 13px; font-size: 9px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lux-stamp, .lux-marquee-track { animation: none !important; }
          .lux-home * { scroll-behavior: auto !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="lux-wrap">
        <nav className="lux-nav">
          <a className="lux-brand" href="#" aria-label="JEE 360 home">
            <span className="lux-brand-mark">3</span>
            <span>
              <span className="lux-brand-name">JEE 360</span>
              <span className="lux-brand-sub">THE ART OF PREPARATION</span>
            </span>
          </a>

          <div className="lux-nav-links">
            <a href="#lux-experience">Experience</a>
            <a href="#lux-subjects">Subjects</a>
            <a href="#lux-journey">Your journey</a>
            <a href="#lux-faq">FAQ</a>
          </div>

          <button className="lux-nav-cta" onClick={() => navigate("/login")}>
            Continue with Google <ArrowRight size={14} />
          </button>
        </nav>

        <section className="lux-hero">
          <div className="lux-hero-copy-wrap">
            <div className="lux-overline">A new perspective on preparation</div>
            <h1>
              Make your ambition a <em>daily practice.</em>
            </h1>
            <p className="lux-hero-copy">
              Your goals deserve more than scattered notes and endless tabs.
              Bring learning, practice and progress into one thoughtful space
              built around your JEE and NEET journey.
            </p>

            <div className="lux-hero-actions">
              <button className="lux-button" onClick={() => navigate("/login")}>
                Begin your journey <ArrowRight size={15} />
              </button>
              <a className="lux-button lux-button-outline" href="#lux-experience">
                Discover JEE 360 <ChevronRight size={15} />
              </a>
            </div>

            <div className="lux-hero-foot">
              <span />
              <span>For the curious. The consistent. The ambitious.</span>
            </div>
          </div>

          <div className="lux-hero-visual">
            <div className="lux-photo-stamp">FOCUS<br/>OVER<br/>NOISE</div>
            <div className="lux-hero-frame">
              <img
                src="https://images.unsplash.com/photo-1769794371055-54436b54577e?auto=format&fit=crop&w=1600&q=85"
                alt="A carefully arranged late-night study desk"
                fetchPriority="high"
              />
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1769794371055-54436b54577e?auto=format&fit=crop&w=1600&q=85"
              >
                <source src="/media/hero-study.mp4" type="video/mp4" />
              </video>
              <div className="lux-image-caption">
                <div>
                  <small>THE JEE 360 EXPERIENCE</small>
                  <strong>Every detail. One direction.</strong>
                </div>
                <span className="lux-image-index">01</span>
              </div>
            </div>
            <div className="lux-side-note">A space to become better, every day</div>
          </div>
        </section>

        <div className="lux-marquee" aria-label="JEE 360 learning philosophy">
          <div className="lux-marquee-track">
            {Array.from({ length: 2 }).map((_, index) => (
              <React.Fragment key={index}>
                <span>Learn with intention</span><i>✳</i>
                <span>Practice with purpose</span><i>✳</i>
                <span>Measure your growth</span><i>✳</i>
                <span>Make consistency your edge</span><i>✳</i>
              </React.Fragment>
            ))}
          </div>
        </div>













        
