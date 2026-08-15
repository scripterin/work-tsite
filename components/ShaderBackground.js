'use client';

export default function ShaderBackground() {
  return (
    <>
      <style jsx global>{`
        @keyframes gradientDrift {
          0%   { background-position: 60% 35%, 20% 80%; }
          33%  { background-position: 70% 45%, 30% 70%; }
          66%  { background-position: 55% 30%, 15% 85%; }
          100% { background-position: 60% 35%, 20% 80%; }
        }

        .shader-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          background-color: #0a0605;
          background-image:
            radial-gradient(circle at 60% 35%, rgba(224, 40, 45, 0.95) 0%, rgba(150, 20, 25, 0.55) 30%, rgba(20, 6, 6, 0) 65%),
            radial-gradient(circle at 20% 80%, rgba(180, 25, 30, 0.5) 0%, rgba(20, 6, 6, 0) 55%);
          background-size: 180% 180%, 160% 160%;
          animation: gradientDrift 22s ease-in-out infinite;
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