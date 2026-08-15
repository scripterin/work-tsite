'use client';

import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(syncSize);
      observer.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = v_texCoord;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // fundal aproape negru, cald
    vec3 bg = vec3(0.035, 0.02, 0.025);

    // centrul mare de lumina rosie, care se plimba lent
    vec2 center1 = vec2(0.15 * sin(u_time * 0.15), 0.1 * cos(u_time * 0.12));
    float d1 = length(p - center1);
    float glow1 = smoothstep(1.05, 0.0, d1);

    // al doilea nucleu, mai cald/portocaliu, care se plimba diferit
    vec2 center2 = vec2(0.3 * cos(u_time * 0.1) - 0.15, -0.25 * sin(u_time * 0.08));
    float d2 = length(p - center2);
    float glow2 = smoothstep(0.9, 0.0, d2);

    vec3 crimson = vec3(0.75, 0.09, 0.14);   // rosu-crimson intens
    vec3 warm    = vec3(0.95, 0.25, 0.18);   // nucleu cald, aproape de centru

    vec3 color = bg;
    color = mix(color, crimson, glow1 * 0.95);
    color = mix(color, warm, pow(glow2, 2.0) * 0.5);

    // hot-spot suplimentar in centrul compus, ca in imaginea de referinta
    float centerGlow = smoothstep(1.1, 0.0, length(p));
    color = mix(color, warm, pow(centerGlow, 3.0) * 0.35);

    // noise foarte fin, doar textura, nu zgomot vizibil
    float noise = (random(uv * 300.0 + fract(u_time)) - 0.5) * 0.03;
    color += noise;

    gl_FragColor = vec4(color, 1.0);
}`;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let frameId;
    function render(t) {
      if (typeof ResizeObserver === 'undefined') syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(render);
    }
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        display: 'block',
      }}
    />
  );
}