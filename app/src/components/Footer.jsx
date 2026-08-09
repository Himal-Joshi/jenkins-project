import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-topbar)', color: '#94A3B8', paddingTop: '80px', paddingBottom: '30px', borderTop: '1px solid rgba(99, 102, 241, 0.3)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '60px' }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--acem-indigo) 0%, var(--acem-violet) 100%)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.1rem',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                boxShadow: '0 0 14px rgba(99, 102, 241, 0.35)',
              }}>
                AC
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', margin: 0, lineHeight: 1 }}>ACEM</h3>
                <span style={{ fontSize: '0.7rem', color: 'var(--acem-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>Advanced College of Eng. & Mgmt</span>
              </div>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.6 }}>
              Established in 2000. Affiliated to Tribhuvan University. Dedicated to delivering technical leadership and engineering excellence in Nepal.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>Academic Degrees</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="#programs" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>B.E. Computer Engineering</a></li>
              <li><a href="#programs" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>B.E. Civil Engineering</a></li>
              <li><a href="#programs" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>B.E. Electrical Engineering</a></li>
              <li><a href="#programs" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>B.E. Electronics & Comm</a></li>
              <li><a href="#programs" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>BCA Program</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>Quick Portals</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem' }}>
              <li><a href="http://202.166.197.235:8084/MIS" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--acem-cyan)', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>MIS Student Login</a></li>
              <li><a href="#notices" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Notice Board</a></li>
              <li><a href="#research" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>AI Research Center</a></li>
              <li><a href="#admissions" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Admissions Guide</a></li>
              <li><a href="#contact" style={{ color: '#94A3B8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--acem-cyan)'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Campus Location</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '20px' }}>Campus Location</h4>
            <p style={{ fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <MapPin size={16} color="var(--acem-cyan)" /> Balkhu, Ring Road, Kathmandu, Nepal
            </p>
            <p style={{ fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Phone size={16} color="var(--acem-cyan)" /> +977-1-5234128
            </p>
            <p style={{ fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--acem-cyan)" /> info@acem.edu.np
            </p>
          </div>
        </div>

        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
          <p>© 2026 Advanced College of Engineering and Management (ACEM). All Rights Reserved.</p>
          <p>Affiliated with <strong style={{ color: '#FFFFFF' }}>Tribhuvan University (TU)</strong></p>
        </div>
      </div>
    </footer>
  );
}

