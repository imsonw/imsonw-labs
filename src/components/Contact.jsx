import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, MapPin, Phone, Download, Send, CheckCircle } from 'lucide-react';

// Custom SVG Icons because some lucide versions do not export brand icons
const Github = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const { t, language } = useApp();
  
  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate sending message API
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Resume Data
  const resumeData = {
    skills: [
      "iOS: Swift, SwiftUI, UIKit, Core Data/Location, ARKit",
      "Flutter/Dart & React Native",
      "State Management: BLoC, Riverpod, Redux, GetX",
      "Clean Architecture, SOLID, Repository Pattern",
      "Security: Keychain/Keystore, SSL Pinning, Encryption",
      "AI/LLM: OpenAI, Gemini, Prompt Engineering"
    ],
    experience: [
      {
        role: "Mobile Developer",
        company: "Webkom Studio",
        period: "02/2025 - Present",
        bullets: {
          vi: [
            "Thiết kế kiến trúc livestream RTMP đa nền tảng (TikTok, YouTube, Twitch) và thay Player WebView bằng module Native, loại bỏ nghẽn hiệu năng khi phát trực tiếp.",
            "Xây dựng các luồng core e-commerce: giỏ hàng, thanh toán, flash sale và theo dõi đơn hàng."
          ],
          en: [
            "Architected a multi-platform RTMP livestream pipeline (TikTok, YouTube, Twitch) and replaced the WebView player with a native module, removing production streaming bottlenecks.",
            "Built core e-commerce flows including cart, checkout, flash sales, and order tracking."
          ]
        }
      },
      {
        role: "Mobile Developer",
        company: "Soteco",
        period: "09/2023 - 01/2025",
        bullets: {
          vi: [
            "Chuyển dịch kiến trúc từ GetX sang BLoC/Riverpod theo chuẩn Clean Architecture & SOLID, giảm 30% tỷ lệ lỗi.",
            "Tích hợp OpenAI & Gemini API xây dựng chatbot/tìm kiếm thông minh, duy trì độ phủ test trên 70%."
          ],
          en: [
            "Migrated architecture from GetX to BLoC/Riverpod under Clean Architecture & SOLID, cutting the bug rate by 30%.",
            "Integrated OpenAI & Gemini APIs to build smart search and chatbot features, maintaining 70%+ test coverage."
          ]
        }
      },
      {
        role: "Mobile Developer",
        company: "Hill Tech",
        period: "06/2021 - 08/2023",
        bullets: {
          vi: [
            "Phát triển ví blockchain phi tập trung theo mô hình Super App/Mini App trên Flutter & React Native.",
            "Xây dựng module Native xác thực chữ ký số, ngăn chặn Mini App bị giả mạo trước khi thực thi."
          ],
          en: [
            "Built a decentralized blockchain wallet using a Super App/Mini App architecture on Flutter & React Native.",
            "Developed a native signature-verification module blocking tampered Mini Apps before execution."
          ]
        }
      },
      {
        role: "iOS Developer",
        company: "Axon Active Vietnam",
        period: "06/2018 - 05/2021",
        bullets: {
          vi: [
            "Xây dựng ứng dụng du lịch & bản đồ Native iOS (Swift/UIKit) cho thị trường Thụy Sĩ, tích hợp Core Location, MapKit, ARKit.",
            "Loại bỏ rò rỉ bộ nhớ và tối ưu hiệu năng bằng Xcode Instruments."
          ],
          en: [
            "Built native iOS travel & navigation apps (Swift/UIKit) for the Swiss market, integrating Core Location, MapKit, and ARKit.",
            "Eliminated memory leaks and optimized performance using Xcode Instruments."
          ]
        }
      }
    ]
  };

  return (
    <section className="section container" style={{ paddingTop: '8rem' }}>
      
      {/* Contact Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }} className="no-print">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t('contactTitle')}</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: '4rem' }}>
        
        {/* Contact Form */}
        <div className="glass-panel no-print" style={{ padding: '2rem' }}>
          {isSuccess ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              gap: '1rem',
              color: '#10b981'
            }}>
              <CheckCircle size={48} />
              <h3 style={{ color: '#10b981' }}>{t('contactSuccess')}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactName')}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactEmail')}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {t('contactMessage')}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    padding: '0.75rem 1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}
              >
                {isSending ? (
                  <span>{t('contactSending')}</span>
                ) : (
                  <>
                    <span>{t('contactSend')}</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact info and Resume Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Quick Info */}
          <div className="glass-panel no-print" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{t('contactInfo')}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Email</span>
                  <a href="mailto:ngocsoncmu@gmail.com" style={{ fontWeight: 500, fontSize: '0.95rem' }}>ngocsoncmu@gmail.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phone</span>
                  <a href="tel:+84397442858" style={{ fontWeight: 500, fontSize: '0.95rem' }}>0397.442.858</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--badge-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-secondary)' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('contactLocation')}</span>
                  <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Da Nang, Vietnam</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                <Linkedin size={18} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '8px' }}>
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Printable Resume PDF trigger */}
          <div className="glass-panel no-print" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Interactive Digital Resume</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Click below to print a professionally formatted single-page paper copy of my resume.
            </p>
            <button
              onClick={handlePrint}
              className="btn btn-primary"
              style={{ width: '100%', gap: '0.5rem' }}
            >
              <Download size={18} />
              <span>{t('contactResume')}</span>
            </button>
          </div>

        </div>

      </div>

      {/* PDF Target: CV / Resume (Displayed on print, or styled nicely in container) */}
      <div id="resume-sheet" className="glass-panel" style={{
        padding: '3rem',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}>
        {/* CV Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>NGUYEN NGOC SON</h1>
            <h3 style={{ color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.25rem' }}>Mobile Developer</h3>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'block', marginTop: '0.5rem' }}>
              Da Nang, Vietnam | ngocsoncmu@gmail.com | 0397.442.858
            </span>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span>Bachelor's Degree, Computer Science</span><br />
            <span>Software Engineering, GPA 3.19/4</span><br />
            <span>10/2014 - 03/2018</span>
          </div>
        </div>

        {/* CV Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Summary */}
          <div>
            <h4 style={{ textTransform: 'uppercase', color: 'var(--accent-secondary)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
              Professional Summary
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Mobile Developer with 8+ years across iOS (Swift/SwiftUI), Flutter, and React Native, delivering cross-platform apps end-to-end — from architecture to App Store publishing — for startups and international clients. Strong in Clean Architecture, state management, and AI/API integration, with experience mentoring junior developers in remote, cross-cultural Agile teams.
            </p>
          </div>

          {/* Skills Grid */}
          <div>
            <h4 style={{ textTransform: 'uppercase', color: 'var(--accent-secondary)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
              Technical Expertise
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
              {resumeData.skills.map((skill, index) => (
                <div key={index} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h4 style={{ textTransform: 'uppercase', color: 'var(--accent-secondary)', fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>
              Work History
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {resumeData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{exp.role}</span>
                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.9rem' }}>{exp.period}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {exp.company}
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {exp.bullets[language].map((bullet, index) => (
                      <li key={index} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {styleAdjusterForPrint()}
    </section>
  );
}

// Embedded print stylesheet that only targets printable section
function styleAdjusterForPrint() {
  return (
    <style>{`
      @media print {
        #resume-sheet {
          position: absolute;
          top: 0;
          left: 0;
          width: 100% !important;
          max-width: 100% !important;
          padding: 0 !important;
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
      }
    `}</style>
  );
}
