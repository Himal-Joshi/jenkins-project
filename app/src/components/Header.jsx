import React, { useState, useEffect } from 'react';
import {
  MapPin, Phone, Mail, ExternalLink,
  Sun, Moon, Menu, X, GraduationCap
} from 'lucide-react';

export default function Header({ theme, toggleTheme, onOpenAdmission }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Home',        href: '#hero'       },
    { label: 'Programs',    href: '#programs'    },
    { label: 'Research',    href: '#research'    },
    { label: 'Notices',     href: '#notices'     },
    { label: 'Admissions',  href: '#admissions'  },
    { label: 'Contact',     href: '#contact'     },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: scrolled ? 'var(--shadow-lg)' : 'none',
      transition: 'var(--transition)',
    }}>
      {/* ── Top Utility Bar ── */}
      <div style={{
        background: 'var(--bg-topbar)', color: '#CBD5E1',
        fontSize: '0.78rem', padding: '7px 0',
        borderBottom: '1px solid rgba(99, 102, 241, 0.25)',
      }}>
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '10px',
        }}>
          {/* Left info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot" />
              <span className="badge-tu">TU Affiliated</span>
            </div>
            <a href="#contact" className="top-link">
              <MapPin size={13} color="var(--acem-cyan)" /> Balkhu, Ring Road, Kathmandu
            </a>
            <a href="tel:+97715234128" className="top-link">
              <Phone size={13} color="var(--acem-cyan)" /> +977-1-5234128
            </a>
            <a href="mailto:info@acem.edu.np" className="top-link">
              <Mail size={13} color="var(--acem-cyan)" /> info@acem.edu.np
            </a>
          </div>

          {/* Right links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <a
              href="http://202.166.197.235:8084/MIS"
              target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--acem-cyan)', textDecoration: 'none', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem',
                fontFamily: 'var(--font-mono)' }}
            >
              <ExternalLink size={13} /> MIS Portal
            </a>
            <a href="#notices"    className="top-link">Notice Board</a>
            <a href="#admissions" className="top-link">Admissions 2083</a>
          </div>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav style={{
        background: 'var(--bg-nav)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        transition: 'var(--transition)',
      }}>
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: '72px',
        }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--acem-indigo) 0%, var(--acem-violet) 100%)',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '1.15rem', fontFamily: 'var(--font-primary)',
              border: '1.5px solid rgba(6, 182, 212, 0.4)', flexShrink: 0,
              boxShadow: '0 0 16px rgba(99, 102, 241, 0.35)',
            }}>AC</div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)',
                fontFamily: 'var(--font-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                ACEM
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--acem-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                Advanced College of Engineering & Mgmt
              </div>
            </div>
          </a>

          {/* Desktop links */}
          <ul style={{ display: 'flex', gap: '28px', listStyle: 'none', margin: 0 }}
              className="nav-desktop-links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} style={{
                  textDecoration: 'none', color: 'var(--text-main)',
                  fontWeight: 600, fontSize: '0.92rem',
                  fontFamily: 'var(--font-primary)',
                  transition: 'color 0.2s, text-shadow 0.2s',
                }}
                  onMouseEnter={e => {
                    e.target.style.color = 'var(--acem-cyan)';
                    e.target.style.textShadow = '0 0 12px rgba(6, 182, 212, 0.4)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.color = 'var(--text-main)';
                    e.target.style.textShadow = 'none';
                  }}
                >{label}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleTheme}
              style={{
                width: '38px', height: '38px', borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card-alt)', border: '1px solid var(--border-color)',
                color: 'var(--text-main)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
              title="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun size={16} color="#FFD700" />
                : <Moon size={16} color="var(--acem-blue)" />}
            </button>

            <button className="btn btn-primary" onClick={onOpenAdmission}
              style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
              <GraduationCap size={16} /> Apply Online
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="nav-hamburger"
              style={{
                background: 'transparent', border: 'none',
                color: 'var(--text-main)', cursor: 'pointer', display: 'none',
              }}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="nav-mobile-menu" style={{
            background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)',
            padding: '16px 24px 24px',
          }}>
            {navLinks.map(({ label, href }) => (
              <a key={href} href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '10px 0',
                  textDecoration: 'none', color: 'var(--text-main)',
                  fontWeight: 600, borderBottom: '1px solid var(--border-color)',
                }}
              >{label}</a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
