"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 2200;

function makeTargets(): Float32Array[] {
  const chaos = new Float32Array(COUNT * 3);
  const frame = new Float32Array(COUNT * 3);
  const grid = new Float32Array(COUNT * 3);
  const point = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    chaos[i * 3] = (Math.random() - 0.5) * 22;
    chaos[i * 3 + 1] = (Math.random() - 0.5) * 12;
    chaos[i * 3 + 2] = (Math.random() - 0.5) * 10;

    const edge = Math.floor(Math.random() * 12);
    const t = Math.random() * 2 - 1;
    const S = 4.2;
    const e = [
      [t, -1, -1], [t, 1, -1], [t, -1, 1], [t, 1, 1],
      [-1, t, -1], [1, t, -1], [-1, t, 1], [1, t, 1],
      [-1, -1, t], [1, -1, t], [-1, 1, t], [1, 1, t],
    ][edge];
    frame[i * 3] = e[0] * S;
    frame[i * 3 + 1] = e[1] * S * 0.7;
    frame[i * 3 + 2] = e[2] * S * 0.6;

    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 3.4;
    grid[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    grid[i * 3 + 1] = r * Math.cos(phi) * 0.85;
    grid[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    point[i * 3] = (Math.random() - 0.5) * 0.25;
    point[i * 3 + 1] = (Math.random() - 0.5) * 0.25;
    point[i * 3 + 2] = (Math.random() - 0.5) * 0.25;
  }
  return [chaos, frame, grid, point];
}

function makeTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(126, 162, 255, 1)");
  g.addColorStop(0.4, "rgba(77, 124, 255, 0.55)");
  g.addColorStop(1, "rgba(77, 124, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

type Props = { progressRef: React.MutableRefObject<number> };

export default function ProcessScene({ progressRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55, mount.clientWidth / mount.clientHeight, 0.1, 100
    );
    camera.position.z = mount.clientWidth < 768 ? 15 : 11;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const [chaos, frame, grid, point] = makeTargets();
    const targets = [chaos, frame, grid, point];
    const pos = new Float32Array(chaos);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      map: makeTexture(),
      size: 0.09,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const p = Math.min(0.9999, Math.max(0, progressRef.current));
      const seg = p * 3;
      const idx = Math.floor(seg);
      const t = seg - idx;
      const ease = t * t * (3 - 2 * t);
      const a = targets[idx];
      const b = targets[idx + 1];

      const time = clock.getElapsedTime();
      for (let i = 0; i < COUNT * 3; i += 3) {
        const wobble = Math.sin(time * 0.8 + i) * 0.04;
        pos[i] = a[i] + (b[i] - a[i]) * ease + wobble;
        pos[i + 1] = a[i + 1] + (b[i + 1] - a[i + 1]) * ease + wobble;
        pos[i + 2] = a[i + 2] + (b[i + 2] - a[i + 2]) * ease;
      }
      geo.attributes.position.needsUpdate = true;
      pts.rotation.y = time * 0.05 + p * 2.2;

      const flash = p > 0.94 ? (p - 0.94) / 0.06 : 0;
      mat.size = 0.09 + flash * 0.35;
      mat.opacity = 0.9 + flash * 0.1;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
