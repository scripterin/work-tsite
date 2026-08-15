'use client';

import { useEffect, useRef, useState } from 'react';

const ARTICLES = [
  {
    title: "Art. 1 — Confidențialitate",
    text: "Toate materialele, întrebările și informațiile prezentate în cadrul testelor sunt strict confidențiale. Este interzisă reproducerea, distribuirea sau publicarea conținutului sub orice formă.",
  },
  {
    title: "Art. 2 — Comportament în timpul testului",
    text: "Candidații sunt obligați să completeze testul individual, fără ajutor extern. Utilizarea surselor terțe sau comunicarea cu alte persoane în timpul testului atrage descalificarea imediată.",
  },
  {
    title: "Art. 3 — Codul de acces",
    text: "Codul de acces este personal și netransmisibil. Utilizarea unui cod aparținând altei persoane constituie o încălcare gravă și poate atrage sancțiuni disciplinare.",
  },
  {
    title: "Art. 4 — Rezultate și notare",
    text: "Rezultatele testului sunt înregistrate automat la momentul finalizării. Orice tentativă de manipulare a sistemului sau de falsificare a rezultatelor va fi raportată ierarhic.",
  },
  {
    title: "Art. 5 — Acceptarea regulamentului",
    text: "Prin apăsarea butonului de acceptare, confirmați că ați citit, înțeles și sunteți de acord cu toate prevederile prezentului regulament.",
  },
];

export default function RegulamentScreen({ onAccept }) {
  const [articles, setArticles] = useState([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let artIdx = 0;
    let charInSection = 0;
    let phase = 'title';
    let timeout;
    const rendered = [];

    function typeNext() {
      if (artIdx >= ARTICLES.length) {
        setDone(true);
        return;
      }
      const art = ARTICLES[artIdx];
      if (phase === 'title') {
        if (charInSection === 0) rendered.push({ title: '', text: '' });
        if (charInSection < art.title.length) {
          rendered[rendered.length - 1].title = art.title.slice(0, charInSection + 1);
          charInSection++;
          setArticles([...rendered]);
          if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          timeout = setTimeout(typeNext, 28);
        } else {
          charInSection = 0;
          phase = 'text';
          timeout = setTimeout(typeNext, 60);
        }
      } else {
        if (charInSection < art.text.length) {
          rendered[rendered.length - 1].text = art.text.slice(0, charInSection + 1);
          charInSection++;
          setArticles([...rendered]);
          if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          timeout = setTimeout(typeNext, 18);
        } else {
          charInSection = 0;
          phase = 'title';
          artIdx++;
          timeout = setTimeout(typeNext, 200);
        }
      }
    }

    const start = setTimeout(typeNext, 500);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, []);

  const handleAccept = () => {
    setExiting(true);
    setTimeout(onAccept, 650);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .reg-scroll::-webkit-scrollbar {
          display: none;
        }

        .cursor-blink {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #FF3B4E;
          margin-left: 2px;
          vertical-align: text-bottom;
          animation: cursorBlink 0.8s step-end infinite;
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .alert-pulse {
          animation: pulseRed 2s infinite;
        }

        @keyframes pulseRed {
          0% { box-shadow: 0 0 0 0 rgba(255, 59, 78, 0.35); }
          70% { box-shadow: 0 0 0 10px rgba(255, 59, 78, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 59, 78, 0); }
        }

        .accept-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #FF3B4E 0%, #bf002a 100%);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(255, 59, 78, 0.35);
          animation: fadeUp 0.4s ease both;
        }
        .accept-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(255, 59, 78, 0.5);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .reg-card-in {
          animation: cardIn 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'translateY(-24px)' : 'translateY(0)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        pointerEvents: exiting ? 'none' : 'auto',
        position: 'relative',
        zIndex: 2,
      }}>
        <div className="reg-card-in" style={{
          background: 'rgba(15, 10, 10, 0.72)',
          backdropFilter: 'blur(32px) saturate(140%)',
          WebkitBackdropFilter: 'blur(32px) saturate(140%)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 28,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 460,
          boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}>

          <div style={{ padding: '40px 36px 32px' }}>

            {/* --- AVERTIZARE --- */}
            <div className="alert-pulse" style={{
              background: 'rgba(255, 59, 78, 0.08)',
              border: '1px solid rgba(255, 59, 78, 0.25)',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              marginBottom: 28,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF3B4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  fontWeight: 600,
                  color: '#FF3B4E',
                  margin: 0,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  Atenție maximă
                </p>
                <p style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontSize: 12,
                  color: 'rgba(229,225,230,0.85)',
                  margin: '4px 0 0 0',
                  lineHeight: 1.4,
                }}>
                  NU schimbați fereastra sau apăsați <span style={{ color: '#FF3B4E', fontWeight: 600 }}>ALT+TAB</span> pe durata testului.
                </p>
              </div>
            </div>

            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.24em',
              color: '#E5BDBC',
              textTransform: 'uppercase',
            }}>
              Departamentul Medical FPlayT
            </span>

            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 38,
              letterSpacing: '-0.02em',
              color: '#E5E1E6',
              lineHeight: 1.1,
              margin: '10px 0 24px',
            }}>
              Regula<span style={{
                background: 'linear-gradient(135deg, #FF3B4E 0%, #bf002a 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>ment</span>
            </h1>

            <div style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: 24 }} />

            <div
              className="reg-scroll"
              ref={scrollRef}
              style={{
                maxHeight: 260,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                marginBottom: 28,
              }}
            >
              {articles.map((art, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    color: '#FF3B4E',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>
                    {art.title}
                  </div>
                  <div style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'rgba(229,225,230,0.65)',
                  }}>
                    {art.text}
                    {i === articles.length - 1 && !done && (
                      <span className="cursor-blink" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {done && (
              <button className="accept-btn" onClick={handleAccept}>
                Accept regulamentul
              </button>
            )}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '14px 36px',
            background: 'rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: '0.2em',
              color: 'rgba(229,225,230,0.35)',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              Departamentul Medical FPlayT
            </p>
          </div>
        </div>
      </div>
    </>
  );
}