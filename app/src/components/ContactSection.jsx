import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', email: '', phone: '', program: '', message: '' });
    }, 4000);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px' }}>
          {/* Contact Details Card */}
          <div>
            <span className="sub-title">Campus Contact</span>
            <h2 className="section-title">Get in Touch with Us</h2>
            <p className="section-desc" style={{ marginBottom: '32px' }}>
              Our admissions desk in Balkhu is open Sunday to Friday, 9:00 AM to 4:00 PM.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-alt)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--acem-cyan)',
                  flexShrink: 0,
                  boxShadow: '0 0 14px rgba(6, 182, 212, 0.2)',
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Campus Location</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Balkhu, Ring Road, Kathmandu, Nepal</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-alt)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--acem-cyan)',
                  flexShrink: 0,
                  boxShadow: '0 0 14px rgba(6, 182, 212, 0.2)',
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Telephone Numbers</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>+977-1-5234128 / +977-1-5234288</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-card-alt)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--acem-cyan)',
                  flexShrink: 0,
                  boxShadow: '0 0 14px rgba(6, 182, 212, 0.2)',
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem' }}>Official Email</strong>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>info@acem.edu.np | admissions@acem.edu.np</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '36px', borderRadius: 'var(--radius-lg)' }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-main)' }}>
              Send Admission Inquiry
            </h3>

            {submitted ? (
              <div style={{ background: 'rgba(6, 182, 212, 0.12)', border: '1px solid var(--acem-cyan)', padding: '24px', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-main)' }}>
                <CheckCircle2 size={42} color="var(--acem-cyan)" style={{ margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Inquiry Submitted Successfully!</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>Thank you for reaching out to ACEM. Our admissions office will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', transition: 'var(--transition)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Program of Interest</label>
                  <select
                    required
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', transition: 'var(--transition)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  >
                    <option value="">Select Degree Program</option>
                    <option value="B.E. Computer Engineering">B.E. Computer Engineering</option>
                    <option value="B.E. Civil Engineering">B.E. Civil Engineering</option>
                    <option value="B.E. Electrical Engineering">B.E. Electrical Engineering</option>
                    <option value="B.E. Electronics & Comm">B.E. Electronics & Communication</option>
                    <option value="BCA">Bachelor in Computer Application (BCA)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>Inquiry Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about entrance exams, fee structure, scholarships..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: '100%', padding: '11px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', outline: 'none', resize: 'vertical', transition: 'var(--transition)' }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--acem-cyan)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '6px' }}>
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

