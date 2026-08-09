import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Cpu, Building2, Zap, Radio, Rocket, Search, ArrowRight, Clock, GraduationCap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const programsData = [
  {
    id: 'comp',
    title: 'B.E. Computer Engineering',
    category: 'engineering',
    icon: Cpu,
    tuBadge: 'TU / IOE',
    description: 'Specialized degree in Artificial Intelligence, Software Engineering, Database Systems, Cloud Infrastructure, and Microprocessors.',
    duration: '4 Years (8 Semesters)',
    degree: 'Bachelor of Engineering',
    color: 'var(--acem-cyan)'
  },
  {
    id: 'civil',
    title: 'B.E. Civil Engineering',
    category: 'engineering',
    icon: Building2,
    tuBadge: 'TU / IOE',
    description: 'Comprehensive education in Structural Engineering, Hydropower Systems, Highway Infrastructure, and Soil Mechanics.',
    duration: '4 Years (8 Semesters)',
    degree: 'Bachelor of Engineering',
    color: 'var(--acem-orange)'
  },
  {
    id: 'elec',
    title: 'B.E. Electrical Engineering',
    category: 'engineering',
    icon: Zap,
    tuBadge: 'TU / IOE',
    description: 'Advanced curriculum covering Power Systems, Smart Grids, High Voltage Automation, and Renewable Energy Integration.',
    duration: '4 Years (8 Semesters)',
    degree: 'Bachelor of Engineering',
    color: 'var(--acem-indigo)'
  },
  {
    id: 'electronics',
    title: 'B.E. Electronics & Communication',
    category: 'engineering',
    icon: Radio,
    tuBadge: 'TU / IOE',
    description: 'Covers 5G Telecommunications, Embedded Systems, Internet of Things (IoT), VLSI Design, and Signal Processing.',
    duration: '4 Years (8 Semesters)',
    degree: 'Bachelor of Engineering',
    color: 'var(--acem-violet)'
  },
  {
    id: 'bca',
    title: 'Bachelor in Computer Application (BCA)',
    category: 'it',
    icon: Rocket,
    tuBadge: 'TU / FOHSS',
    description: 'Modern software degree focusing on Full-Stack Web Development, Mobile Apps, Cybersecurity, and Data Analytics.',
    duration: '4 Years (8 Semesters)',
    degree: 'Bachelor Degree',
    color: '#EC4899'
  }
];

export default function Programs({ onSelectProgram }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useScrollReveal();

  const filteredPrograms = programsData.filter((prog) => {
    const matchesCategory = activeTab === 'all' || prog.category === activeTab;
    const matchesSearch =
      prog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section" id="programs" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header scroll-header">
          <span className="sub-title">Undergraduate Degrees</span>
          <h2 className="section-title">Tribhuvan University Programs</h2>
          <p className="section-desc">
            Structured 4-year degree programs equipping students with solid theoretical foundations
            and state-of-the-art laboratory skills.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '10px',
              background: 'var(--bg-card-alt)',
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }}
          >
            {[
              { key: 'all', label: 'All Programs' },
              { key: 'engineering', label: 'Engineering (IOE)' },
              { key: 'it', label: 'IT & Computer Apps' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '9px 20px', fontSize: '0.88rem', fontFamily: 'var(--font-mono)' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '290px' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--acem-cyan)',
              }}
            />
            <input
              type="text"
              placeholder="Search programs (e.g. AI, Civil, Web)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                transition: 'var(--transition)',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
          }}
        >
          <AnimatePresence>
            {filteredPrograms.map((program) => {
              const IconComp = program.icon;
              return (
                <motion.div
                  key={program.id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel scroll-card"
                  style={{
                    padding: '30px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    willChange: 'transform',
                  }}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                >
                  {/* Accent top glowing bar */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: program.color,
                      boxShadow: `0 0 12px ${program.color}`,
                    }}
                  />

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                      }}
                    >
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: 'var(--radius-md)',
                          background: 'var(--bg-card-alt)',
                          border: `1px solid ${program.color}35`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: program.color,
                          boxShadow: `0 0 14px ${program.color}25`,
                        }}
                      >
                        <IconComp size={26} />
                      </div>
                      <span className="badge-tu">{program.tuBadge}</span>
                    </div>

                    <h3
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '12px',
                        color: 'var(--text-main)',
                      }}
                    >
                      {program.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.92rem',
                        color: 'var(--text-muted)',
                        marginBottom: '24px',
                        lineHeight: 1.65,
                      }}
                    >
                      {program.description}
                    </p>
                  </div>

                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem',
                        color: 'var(--text-sub)',
                        marginBottom: '20px',
                        paddingTop: '16px',
                        borderTop: '1px solid var(--border-color)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <Clock size={14} color="var(--acem-cyan)" /> {program.duration}
                      </span>
                      <span
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <GraduationCap size={14} color="var(--acem-cyan)" />{' '}
                        {program.degree}
                      </span>
                    </div>

                    <button
                      className="btn btn-outline"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                      onClick={() => onSelectProgram(program.title)}
                    >
                      <span>View Specifications</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

