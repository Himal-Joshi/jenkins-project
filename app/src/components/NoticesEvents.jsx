import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const notices = [
  {
    day: '15',
    month: 'AUG',
    title: 'IOE Entrance Examination Guidelines 2083',
    description:
      'Important instructions for B.E. entrance examinees affiliated with Tribhuvan University.',
  },
  {
    day: '08',
    month: 'AUG',
    title: 'National STEAM Materials Design Winners',
    description:
      'ACEM students secured 1st position in national level engineering design showcase.',
  },
  {
    day: '01',
    month: 'AUG',
    title: 'Semester Internal Assessment Routine',
    description:
      'Mid-term evaluation routine for 2nd and 4th semester B.E. and BCA students.',
  },
];

const events = [
  {
    day: '22',
    month: 'AUG',
    title: 'Hack-ACEM 2026: 36-Hour Hackathon',
    description:
      'Organized by ACEM IT Club in collaboration with leading tech companies in Nepal.',
  },
  {
    day: '18',
    month: 'AUG',
    title: 'RoboWars Arena Championship 5.0',
    description: 'Inter-college robotics tournament hosted by ACEM Robotics Club.',
  },
  {
    day: '10',
    month: 'AUG',
    title: 'Civil Expressway Site Inspection',
    description:
      'Field visit to Fast-Track Highway project for final year Civil engineering students.',
  },
];

export default function NoticesEvents({ onSelectNotice }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="section" id="notices" ref={sectionRef}>
      <div className="container">
        <div className="section-header scroll-header">
          <span className="sub-title">Updates & Campus Life</span>
          <h2 className="section-title">Notices & Events</h2>
          <p className="section-desc">
            Stay informed with official college notices, upcoming hackathons, field visits, and
            student club activities.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Notices Panel */}
          <motion.div
            className="glass-panel scroll-card"
            style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={22} color="var(--acem-cyan)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  College Notice Board
                </h3>
              </div>
              <span className="badge-tu" style={{ fontSize: '0.68rem' }}>
                Official Updates
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {notices.map((notice, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectNotice(notice.title)}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card-alt)';
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-md)',
                      background: 'linear-gradient(135deg, var(--acem-indigo) 0%, var(--acem-indigo-dark) 100%)',
                      color: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 14px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                      {notice.day}
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--acem-cyan)', fontFamily: 'var(--font-mono)' }}>
                      {notice.month}
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {notice.title} <ChevronRight size={14} color="var(--acem-cyan)" />
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                      {notice.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Events Panel */}
          <motion.div
            className="glass-panel scroll-card"
            style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={22} color="var(--acem-indigo)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  Events & Student Life
                </h3>
              </div>
              <span className="badge-tag" style={{ fontSize: '0.68rem' }}>
                Campus Clubs
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {events.map((evt, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid transparent',
                    transition: 'var(--transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg-card-alt)';
                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      color: 'var(--acem-cyan)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>
                      {evt.day}
                    </span>
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{evt.month}</span>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        marginBottom: '4px',
                      }}
                    >
                      {evt.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0 }}>
                      {evt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

