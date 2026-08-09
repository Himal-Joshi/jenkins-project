import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass, ArrowDownRight } from 'lucide-react';

const programmes = [
  'B.E. Computer Engineering',
  'B.E. Civil Engineering',
  'B.E. Electrical Engineering',
  'B.E. Electronics & Comm',
  'Bachelor in Computer Application',
];

/* ── Tiny helper: animated counting number ──────────────────────────────── */
function CountUp({ to, suffix = '', duration = 2000 }) {
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    const end = parseInt(to, 10);
    if (isNaN(end)) { if (ref.current) ref.current.textContent = to; return; }
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      if (ref.current) ref.current.textContent = start + suffix;
      if (start >= end) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [to, suffix, duration]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Particle canvas ─────────────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;
    const particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.35,
        dy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.1,
        color: Math.random() > 0.5 ? '99,102,241' : '6,182,212',
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fill();
      });
      // draw connection lines
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(99,102,241,${0.07 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

export default function Hero({ onOpenTour, onOpenAdmission }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity    = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        background: 'linear-gradient(160deg, #050C1A 0%, #060E20 45%, #0B1326 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Particle field ── */}
      <ParticleField />

      {/* ── Radial glow orbs ── */}
      <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'70vw', height:'70vw', maxWidth:900,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)',
        filter:'blur(60px)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'-10%', left:'-8%', width:'55vw', height:'55vw', maxWidth:700,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(6,182,212,0.13) 0%, transparent 65%)',
        filter:'blur(60px)', pointerEvents:'none', zIndex:0 }} />
      {/* Violet accent */}
      <div style={{ position:'absolute', top:'35%', left:'42%', width:'30vw', height:'30vw', maxWidth:400,
        borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)',
        filter:'blur(40px)', pointerEvents:'none', zIndex:0 }} />

      {/* ── Subtle grid overlay ── */}
      <div style={{ position:'absolute', inset:0, zIndex:0,
        backgroundImage:'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize:'60px 60px', pointerEvents:'none' }} />

      {/* ─────────────────────────────────────────────
          MAIN CONTENT
      ───────────────────────────────────────────── */}
      <motion.div
        style={{ y: headlineY, opacity, position:'relative', zIndex:1,
          flex:1, display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 0 60px' }}
      >
        <div className="container">

          {/* Top label row */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7 }}
            style={{ display:'flex', alignItems:'center', gap:16, marginBottom:36 }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:8,
              background:'rgba(99,102,241,0.1)', border:'1px solid rgba(99,102,241,0.25)',
              padding:'6px 14px', borderRadius:999, backdropFilter:'blur(12px)' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#10B981',
                boxShadow:'0 0 8px rgba(16,185,129,0.9)', flexShrink:0,
                animation:'pulse-ring 1.8s infinite' }} />
              <span style={{ fontSize:'0.72rem', fontFamily:'var(--font-mono)', fontWeight:700,
                color:'#CBD5E1', letterSpacing:'0.10em', textTransform:'uppercase' }}>
                Kathmandu&nbsp;·&nbsp;Established 2000&nbsp;·&nbsp;IOE Affiliated
              </span>
            </div>
            <div style={{ height:1, flex:1, maxWidth:120,
              background:'linear-gradient(90deg,rgba(99,102,241,0.5),transparent)' }} />
          </motion.div>

          {/* ── GIANT HEADLINE ── */}
          <div style={{ overflow:'hidden', marginBottom:6 }}>
            <motion.h1
              initial={{ y:'105%' }}
              animate={{ y:'0%' }}
              transition={{ duration:1.0, ease:[0.16,1,0.3,1] }}
              style={{
                fontSize:'clamp(3.2rem,9.5vw,9rem)',
                fontWeight:900, lineHeight:0.92,
                letterSpacing:'-0.045em',
                color:'#FFFFFF',
                fontFamily:'var(--font-primary)',
                textTransform:'uppercase',
                userSelect:'none',
              }}
            >
              Engineer
            </motion.h1>
          </div>

          <div style={{ display:'flex', alignItems:'flex-end', gap:'clamp(12px,2vw,36px)', marginBottom:6, flexWrap:'wrap' }}>
            <div style={{ overflow:'hidden' }}>
              <motion.h1
                initial={{ y:'105%' }}
                animate={{ y:'0%' }}
                transition={{ duration:1.0, delay:0.08, ease:[0.16,1,0.3,1] }}
                style={{
                  fontSize:'clamp(3.2rem,9.5vw,9rem)',
                  fontWeight:900, lineHeight:0.92,
                  letterSpacing:'-0.045em',
                  background:'linear-gradient(110deg, #06B6D4 0%, #6366F1 50%, #8B5CF6 100%)',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  fontFamily:'var(--font-primary)',
                  textTransform:'uppercase',
                  userSelect:'none',
                  display:'inline-block',
                }}
              >
                The Future
              </motion.h1>
            </div>

            {/* Circular rotating badge */}
            <motion.div
              initial={{ opacity:0, scale:0.6, rotate:-20 }}
              animate={{ opacity:1, scale:1, rotate:0 }}
              transition={{ duration:0.8, delay:0.5 }}
              style={{ position:'relative', width:'clamp(80px,10vw,120px)', height:'clamp(80px,10vw,120px)',
                flexShrink:0, marginBottom:8 }}
            >
              <svg viewBox="0 0 100 100" style={{ width:'100%', height:'100%', animation:'spin-slow 18s linear infinite' }}>
                <defs>
                  <path id="circle-text" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="0.5" strokeDasharray="4 6" />
                <text fontSize="9.5" fontFamily="JetBrains Mono" fontWeight="600" letterSpacing="2" fill="#6366F1">
                  <textPath href="#circle-text">ACEM · BALKHU · IOE · TU · NEPAL ·</textPath>
                </text>
                <circle cx="50" cy="50" r="24"
                  fill="rgba(99,102,241,0.12)"
                  stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
                <text x="50" y="47" textAnchor="middle" fontFamily="var(--font-primary)" fontSize="12" fontWeight="900" fill="white">EST</text>
                <text x="50" y="61" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" fill="#06B6D4">2000</text>
              </svg>
            </motion.div>
          </div>

          {/* ── Subline row: description + CTA ── */}
          <motion.div
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.6 }}
            style={{ display:'flex', alignItems:'flex-start', gap:48, flexWrap:'wrap', marginTop:40 }}
          >
            <p style={{ fontSize:'clamp(0.95rem,1.3vw,1.15rem)', color:'#94A3B8',
              lineHeight:1.75, maxWidth:440, fontWeight:400 }}>
              Premier technical education &amp; AI research at Balkhu, Kathmandu —
              training Nepal's next generation of engineers and innovators for{' '}
              <span style={{ color:'#CBD5E1', fontWeight:600 }}>24+ years</span>.
            </p>

            <div style={{ display:'flex', gap:14, flexWrap:'wrap', alignItems:'center' }}>
              <motion.a
                href="#programs"
                className="btn btn-primary"
                style={{ padding:'15px 32px', fontSize:'1rem', borderRadius:'var(--radius-md)' }}
                whileHover={{ scale:1.04 }}
                whileTap={{ scale:0.97 }}
              >
                Explore Programs <ArrowRight size={18} />
              </motion.a>
              <motion.button
                className="btn btn-outline"
                onClick={onOpenTour}
                style={{ padding:'15px 32px', fontSize:'1rem' }}
                whileHover={{ scale:1.04 }}
                whileTap={{ scale:0.97 }}
              >
                <Compass size={18} color="var(--acem-cyan)" /> Campus Tour
              </motion.button>
            </div>
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity:0, y:28 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.8, delay:0.85 }}
            style={{ display:'flex', gap:'clamp(20px,4vw,60px)', marginTop:56, flexWrap:'wrap' }}
          >
            {[
              { val:'2500', suf:'+', label:'Alumni Worldwide' },
              { val:'98',   suf:'%', label:'Placement Rate' },
              { val:'5',    suf:'',  label:'Degree Programs' },
              { val:'24',   suf:'+', label:'Years of Excellence' },
            ].map(({ val, suf, label }) => (
              <div key={label}>
                <div style={{
                  fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:900,
                  fontFamily:'var(--font-primary)', letterSpacing:'-0.04em',
                  background:'linear-gradient(135deg,#FFFFFF 30%,rgba(255,255,255,0.55))',
                  WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
                  lineHeight:1,
                }}>
                  <CountUp to={val} suffix={suf} duration={1800} />
                </div>
                <div style={{ fontSize:'0.78rem', color:'#64748B', fontFamily:'var(--font-mono)',
                  letterSpacing:'0.08em', textTransform:'uppercase', marginTop:6, fontWeight:600 }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:1.8 }}
        style={{ position:'absolute', bottom:32, right:40, zIndex:2,
          display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
      >
        <span style={{ fontSize:'0.65rem', fontFamily:'var(--font-mono)', color:'#475569',
          letterSpacing:'0.12em', textTransform:'uppercase', writingMode:'vertical-rl' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y:[0,8,0] }}
          transition={{ repeat:Infinity, duration:1.6, ease:'easeInOut' }}
        >
          <ArrowDownRight size={18} color="rgba(99,102,241,0.6)" />
        </motion.div>
      </motion.div>

      {/* ── Programmes scrolling marquee bar ── */}
      <div style={{ position:'relative', zIndex:2,
        borderTop:'1px solid rgba(99,102,241,0.18)',
        background:'rgba(5,12,26,0.9)',
        backdropFilter:'blur(20px)',
        padding:'14px 0',
        overflow:'hidden',
      }}>
        <div style={{ display:'inline-flex', gap:0, animation:'marquee-ltr 28s linear infinite', whiteSpace:'nowrap' }}>
          {[...programmes, ...programmes, ...programmes].map((p, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:10, paddingRight:48 }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--acem-cyan)',
                flexShrink:0, opacity:0.7 }} />
              <span style={{ fontSize:'0.82rem', fontFamily:'var(--font-mono)',
                fontWeight:600, color:'#94A3B8', letterSpacing:'0.06em', textTransform:'uppercase' }}>
                {p}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

