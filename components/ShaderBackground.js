'use client';

export default function ShaderBackground() {
  return (
    <>
      <style jsx global>{`
        @keyframes gradientDrift {
          0%   { background-position: 50% 40%, 15% 85%; }
          33%  { background-position: 60% 50%, 25% 75%; }
          66%  { background-position: 45% 35%, 10% 90%; }
          100% { background-position: 50% 40%, 15% 85%; }
        }

        .shader-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background-color: #140505;
          background-image:
            radial-gradient(circle at 50% 40%, rgba(230, 45, 50, 1) 0%, rgba(170, 25, 30, 0.85) 35%, rgba(60, 10, 12, 0.4) 60%, rgba(20, 5, 5, 0) 85%),
            radial-gradient(circle at 15% 85%, rgba(190, 30, 35, 0.7) 0%, rgba(40, 8, 10, 0) 60%);
          background-size: 260% 260%, 220% 220%;
          animation: gradientDrift 24s ease-in-out infinite;
        }

        .shader-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>
      <div className="shader-bg" />
    </>
  );
}