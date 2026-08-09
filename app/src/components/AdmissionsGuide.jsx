import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, Edit3, Award, UserCheck } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const steps = [
  {
    num: '01',
    icon: FileCheck,
    title: 'IOE Entrance Exam',
    desc: 'Appear and qualify in the Tribhuvan University IOE entrance examination.',
  },
  {
    num: '02',
    icon: Edit3,
    title: 'Application Submission',
    desc: 'Fill out the application form online or visit the Balkhu campus desk.',
  },
  {
    num: '03',
    icon: Award,
    title: 'Merit Counseling',
    desc: 'Attend merit list counseling and academic document verification.',
  },
  {
    num: '04',
    icon: UserCheck,
    title: 'Enrollment',
    desc: 'Complete fee payment, receive your ACEM student ID, and join orientation.',
  },
];

export default function AdmissionsGuide() {
  const sectionRef = useScrollReveal();

  return (
    <section className="section section-alt" id="admissions" ref={sectionRef}>
      <div className="container">
        <div className="section-header scroll-header">
          <span className="sub-title">Admission Process</span>
          <h2 className="section-title">4 Steps to Join ACEM</h2>
          <p className="section-desc">
            Follow our straightforward guide to apply for Tribhuvan University B.E. and BCA
            programs.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <motion.div
                key={idx}
                className="glass-panel scroll-card"
                style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative',
                  willChange: 'transform',
                }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-glow)' }}
              >
                {/* Step Number watermark */}
                <div
                  style={{
                    fontSize: '2.8rem',
                    fontWeight: 800,
                    color: 'rgba(99, 102, 241, 0.12)',
                    position: 'absolute',
                    top: '14px',
                    right: '18px',
                    lineHeight: 1,
                    fontFamily: 'var(--font-mono)',
                    userSelect: 'none',
                  }}
                >
                  {step.num}
                </div>

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--acem-indigo) 0%, var(--acem-indigo-dark) 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    boxShadow: '0 0 16px rgba(99, 102, 241, 0.35)',
                  }}
                >
                  <IconComp size={23} />
                </div>

                <h4
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: 'var(--text-main)',
                  }}
                >
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

