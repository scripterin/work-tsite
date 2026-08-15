'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  const user = session.user;
  const username = user.username || user.name || 'utilizator';
  const avatar = user.avatar || user.image;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 28px',
      }}
    >
      {/* Brand mic, stânga */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF3B4E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: '0.18em',
            color: 'rgba(229,225,230,0.4)',
            textTransform: 'uppercase',
          }}
        >
          Dep. Medical
        </span>
      </div>

      {/* Chip utilizator, dreapta */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 14px 6px 6px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={30}
            height={30}
            className="rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%' }}
          />
        ) : (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255,59,78,0.25) 0%, rgba(191,0,42,0.2) 100%)',
              border: '1px solid rgba(255,59,78,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: '#FF3B4E',
            }}
          >
            {username.charAt(0).toUpperCase()}
          </div>
        )}

        <span
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontSize: 12.5,
            fontWeight: 500,
            color: 'rgba(229,225,230,0.75)',
            letterSpacing: '0.01em',
          }}
        >
          @{username}
        </span>
      </div>
    </nav>
  );
}