import { useState } from 'react'
import World from './World'
import { community, isConfigured } from './config'

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => <svg aria-hidden="true" viewBox="0 0 20 20" className={diagonal ? 'icon diagonal' : 'icon'}><path d={diagonal ? 'M5 15 15 5M6 5h9v9' : 'M3 10h13m-5-5 5 5-5 5'} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const faqs = [
    ['Do I need a raid team to join?', 'Not at all. Start with a hello, meet people, and find a group when you feel ready. New and returning players are welcome.'],
    ['When does the Firelands group play?', `${community.raidSchedule} · ${community.raidTimezone}. We’ll publish a time once the roster and time zones are known.`],
    ['Where do I find the server connection details?', 'The server team has not supplied a verified address or account link yet. We’ll add them here after they are confirmed. Avoid lookalike download and login links.'],
    ['Is this an official Blizzard website?', 'No. This is an independent, unofficial fan community and is not affiliated with or endorsed by Blizzard Entertainment.'],
  ]

  return <>
    <header className="header">
      <a className="brand" href="#top" aria-label="White Man Cataclysm home"><span className="brand-mark"><span /></span><span className="brand-name">WHITE MAN <i>CATACLYSM</i></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        <a href="#call" onClick={() => setMenuOpen(false)}>The call</a><a href="#gathering" onClick={() => setMenuOpen(false)}>The gathering</a><a href="#code" onClick={() => setMenuOpen(false)}>Our code</a>
        <a className="nav-cta" href="#join" onClick={() => setMenuOpen(false)}>Find your place <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <World />
        <div className="hero-vignette" />
        <div className="hero-content">
          <div className="eyebrow"><span className="pulse" /> {community.realmStatus}</div>
          <p className="pretitle">A new chapter begins in</p>
          <h1 id="hero-title">THE FIRE<br /><em>ISLANDS</em><span className="period">.</span></h1>
          <p className="hero-copy">A fresh Cataclysm Classic community.<br />Find your people. Take on Firelands together.</p>
          <div className="hero-actions"><a href="#join" className="button button-hot">Join the first roster <Arrow /></a><a href="#gathering" className="text-link">Explore the gathering <span>↓</span></a></div>
        </div>
        <div className="hero-caption"><span>01 / THE GATHERING</span><span>FIRELANDS · AZEROTH</span></div>
        <div className="scroll-cue"><span /> SCROLL TO DESCEND</div>
        <div className="hero-coordinate">21° 29′ N&nbsp; / &nbsp;THE SULFURON SPIRE</div>
      </section>

      <div className="ticker" aria-label="Community invitation"><div className="ticker-track"><span>GEAR UP TOGETHER</span><b>✳</b><span>FRESH START, OPEN DOOR</span><b>✳</b><span>FIRELANDS IS CALLING</span><b>✳</b><span>GEAR UP TOGETHER</span><b>✳</b><span>FRESH START, OPEN DOOR</span><b>✳</b><span>FIRELANDS IS CALLING</span><b>✳</b></div></div>

      <section className="intro section" id="call">
        <div className="section-index"><span>01</span><span>THE CALL</span></div>
        <div className="intro-main"><p className="kicker">A place to begin again</p><h2>There’s room<br />at the <em>table.</em></h2><p className="intro-copy">Maybe you’re here for your first raid. Maybe it’s been years since you heard a ready check. Either way, you don’t need perfect gear, a fixed schedule, or a premade crew to say hello.</p><a href="#join" className="underline-link">Make the first move <Arrow /></a></div>
        <aside className="note-card"><div className="note-icon">✳</div><span className="note-label">THE DOOR IS OPEN</span><p>Come to play. Stay to get to know the people behind the characters.</p><div className="note-rule" /><small>NO EXPERIENCE REQUIRED&nbsp; · &nbsp;YOUR PACE, YOURS</small></aside>
      </section>

      <section className="gathering section" id="gathering">
        <div className="section-index"><span>02</span><span>THE GATHERING</span></div>
        <div className="gathering-heading"><div><p className="kicker">Our first great adventure</p><h2>A raid worth<br /><em>showing up for.</em></h2></div><p className="gathering-intro">Firelands is the destination.<br />Finding your people is the beginning.</p></div>
        <div className="raid-card"><div className="raid-art"><div className="raid-sun" /><div className="raid-mountain m1" /><div className="raid-mountain m2" /><div className="raid-mountain m3" /><div className="raid-crack crack1" /><div className="raid-crack crack2" /><div className="raid-flare" /><span className="raid-art-label">SULFURON KEEP · 01</span><span className="raid-art-caption">AN INVITATION TO THE EDGE OF THE WORLD</span></div><div className="raid-info"><span className="status"><i /> FIRST ROSTER FORMING</span><h3>The Firelands<br /><em>Expedition</em></h3><p>Eight encounters. One team that’s glad you came. We’re gathering players who want to learn, contribute, and make the night fun along the way.</p><div className="raid-meta"><div><small>RAID NIGHT</small><strong>{community.raidSchedule}</strong></div><div><small>RECRUITING</small><strong>All roles · All experience</strong></div></div><a className="underline-link" href="#join">Save a place in the roster <Arrow /></a></div></div>
      </section>

      <section className="path section" id="join">
        <div className="section-index"><span>03</span><span>YOUR FIRST STEPS</span></div>
        <div className="path-head"><p className="kicker">No rush. No gatekeeping.</p><h2>Three steps.<br /><em>One good night.</em></h2></div>
        <div className="steps"><article className="step"><span className="step-no">01</span><div className="step-icon">✳</div><h3>Say hello</h3><p>Introduce yourself in the community space. A class, a role, or just “I’m curious” is plenty.</p><span className="step-tag">START ANYWHERE</span></article><article className="step"><span className="step-no">02</span><div className="step-icon">⌁</div><h3>Find your rhythm</h3><p>Meet the group, share your availability, and see which role feels right for you.</p><span className="step-tag">AT YOUR PACE</span></article><article className="step"><span className="step-no">03</span><div className="step-icon">↗</div><h3>Take the portal</h3><p>When the roster and verified server details are ready, we’ll share the next step clearly.</p><span className="step-tag">WHEN YOU’RE READY</span></article></div>
        <div className="join-bar"><div><span className="join-overline">THE ROSTER IS TAKING SHAPE</span><p>Be part of the beginning.</p></div>{isConfigured(community.discord) ? <a className="button button-hot" href={community.discord} target="_blank" rel="noreferrer">Join our Discord <Arrow diagonal /></a> : <a className="button button-hot" href="#details">Get the invite <Arrow /></a>}</div>
      </section>

      <section className="code-section section" id="code">
        <div className="section-index"><span>04</span><span>THE WAY WE PLAY</span></div>
        <div className="code-layout"><div><p className="kicker">A better kind of guild</p><h2>Good people<br />make <em>good raids.</em></h2><p className="code-lead">Our best loot is a group you look forward to seeing again. We keep the door open and the expectations clear.</p><a href="#join" className="underline-link">Join a community that means it <Arrow /></a></div><div className="code-list"><article><span>01</span><div><h3>Respect is the baseline</h3><p>No harassment, slurs, or pressure. Everyone deserves to feel welcome here.</p></div></article><article><span>02</span><div><h3>Real life comes first</h3><p>Schedules help us plan. They never matter more than the people behind them.</p></div></article><article><span>03</span><div><h3>Play fair, speak plainly</h3><p>Be honest about loot, roles, and expectations. Ask questions without making someone feel small.</p></div></article><article><span>04</span><div><h3>Look out for each other</h3><p>Report suspicious links or behavior. Never share passwords, payment details, or personal information in chat.</p></div></article></div></div>
      </section>

      <section className="faq section" id="faq"><div className="section-index"><span>05</span><span>GOOD TO KNOW</span></div><div className="faq-layout"><div><p className="kicker">The usual questions</p><h2>Before you<br /><em>step through.</em></h2></div><div className="faq-list">{faqs.map(([q, a], i) => <article className={openFaq === i ? 'faq-item active' : 'faq-item'} key={q}><button aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)}><span className="faq-number">0{i + 1}</span><span>{q}</span><b>{openFaq === i ? '−' : '+'}</b></button>{openFaq === i && <p>{a}</p>}</article>)}</div></div></section>

      <section className="details section" id="details"><span className="details-mark">✳</span><p className="kicker">A note before you go</p><h2>Good adventures<br />start with <em>good sense.</em></h2><p className="details-copy">This is an independent, unofficial fan community and is not affiliated with or endorsed by Blizzard Entertainment. Private servers can carry account, device, and legal risks. Research before you participate. This site does not collect account credentials.</p><div className="details-box"><span className="details-dot" /><div><strong>Server details are being verified.</strong><p>We’ll post the official community invitation and connection information here once the organizers confirm them. Please don’t download files or enter credentials from unverified links.</p></div></div><a className="button button-outline" href="#top">Back to the beginning <Arrow diagonal /></a></section>

      <section className="faq-foot"><span>THERE’S A PLACE FOR YOU HERE.</span><a href="#join">COME FIND IT <Arrow diagonal /></a></section>
    </main>

    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><span /></span><span className="brand-name">WHITE MAN <i>CATACLYSM</i></span></a><p>MADE FOR THE PEOPLE BEHIND THE CHARACTERS.</p><div><span>UNOFFICIAL FAN COMMUNITY</span><span>© 2026 · AZEROTH, WITH CARE</span></div></footer>
  </>
}

export default App
