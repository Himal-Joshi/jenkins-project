import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Network, Wrench, Layers } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const labsData = [
  {
    icon: Bot,
    tag: 'AI Center',
    title: 'AI Research Center (AIRC)',
    description:
      'High-performance GPU cluster dedicated to Computer Vision, Large Language Models, and Nepali Natural Language Processing.',
    accent: 'var(--acem-cyan)',
  },
  {
    icon: Network,
    tag: 'Industry Link',
    title: 'CAILIC Collaborations',
    description:
      'Center for Academia-Industry Linkages creating direct industry internships, placement drives, and industrial R&D projects.',
    accent: 'var(--acem-orange)',
  },
  {
    icon: Wrench,
    tag: 'Robotics Hub',
    title: 'Robotics & Embedded Systems Lab',
    description:
      'Equipped with industrial 3D printers, ROS microcontrollers, sensor arrays, and autonomous drone testing platforms.',
    accent: 'var(--acem-violet)',
  },
  {
    icon: Layers,
    tag: 'Civil Testing',
    title: 'Material & Structural Facility',
    description:
      'ISO standard testing infrastructure for concrete compression, soil mechanics, asphalt quality, and earthquake resilience.',
    accent: 'var(--acem-indigo)',
  },
];

export default function ResearchLabs() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section-alt" id="research" ref={sectionRef}>
      <div className="container">
        <div className="section-header scroll-header">
          <span className="sub-title">Centers of Innovation</span>
          <h2 className="section-title">Research & Technical Infrastructure</h2>
          <p className="section-desc">
            State-of-the-art research laboratories and industry centers driving student innovation
            and technological breakthroughs.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '26px',
          }}
        >
          {labsData.map((lab, index) => {
            const IconComponent = lab.icon;
            return (
              <motion.div
                key={index}
                className="glass-panel scroll-card"
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative',
                  overflow: 'hidden',
                  willChange: 'transform',
                  border: `1px solid rgba(255,255,255,0.08)`,
                }}
                whileHover={{ y: -6, boxShadow: `0 0 25px ${lab.accent}30` }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '22px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-card-alt)',
                      border: `1px solid ${lab.accent}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: lab.accent,
                      boxShadow: `0 0 16px ${lab.accent}25`,
                    }}
                  >
                    <IconComponent size={25} />
                  </div>
                  <span className="badge-tag">{lab.tag}</span>
                </div>

                <h4
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    marginBottom: '12px',
                    color: 'var(--text-main)',
                  }}
                >
                  {lab.title}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {lab.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

