import React, { useState } from 'react';
import { X, CheckCircle2, Compass, GraduationCap, Info } from 'lucide-react';

export function AdmissionModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', program: 'B.E. Computer' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(6, 14, 32, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '32px', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color="var(--acem-cyan)" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Registration Received!</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Our academic admissions counselor will call you within 24 hours.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <GraduationCap size={24} color="var(--acem-cyan)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Online Admission Registration</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Register your details to receive early counseling & official prospectus.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', transition: 'var(--transition)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', transition: 'var(--transition)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Preferred Program</label>
                <select
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', transition: 'var(--transition)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                >
                  <option value="B.E. Computer">B.E. Computer Engineering</option>
                  <option value="B.E. Civil">B.E. Civil Engineering</option>
                  <option value="B.E. Electrical">B.E. Electrical Engineering</option>
                  <option value="B.E. Electronics">B.E. Electronics & Communication</option>
                  <option value="BCA">Bachelor in Computer Application (BCA)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                Submit Registration
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function TourModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(6, 14, 32, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '32px', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <Compass size={26} color="var(--acem-cyan)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>Virtual Campus Tour</h3>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
          ACEM Balkhu campus features AI Research Center (AIRC), Central Library, Civil Workshop, Hydraulics Lab, and Electronics Workstations.
        </p>

        <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '18px', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '24px' }}>
          <strong style={{ display: 'block', color: 'var(--acem-cyan)', fontSize: '0.94rem', fontFamily: 'var(--font-mono)' }}>Guided Campus Walkthrough</strong>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Sunday to Friday | 9:00 AM - 4:00 PM at Balkhu, Ring Road, Kathmandu.</span>
        </div>

        <button className="btn btn-secondary" onClick={onClose} style={{ width: '100%' }}>
          Close Window
        </button>
      </div>
    </div>
  );
}

export function SpecificationModal({ isOpen, title, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      background: 'rgba(6, 14, 32, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '32px', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Info size={24} color="var(--acem-cyan)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>{title || 'Details'}</h3>
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          <p><strong>Affiliation:</strong> Tribhuvan University (TU - IOE / FOHSS)</p>
          <p><strong>Duration:</strong> 4 Years (8 Semesters)</p>
          <p><strong>Eligibility:</strong> +2 Science / A-Level with Physics, Chemistry & Mathematics (Min C grade / 45%) and IOE entrance exam qualification rank.</p>
          <p><strong>Key Career Paths:</strong> Software Architect, AI Engineer, Structural Specialist, Power Grid Consultant, Telecommunications Engineer.</p>
        </div>

        <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
          Close Details
        </button>
      </div>
    </div>
  );
}

