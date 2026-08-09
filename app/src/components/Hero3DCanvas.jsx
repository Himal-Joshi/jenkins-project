import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// ── Generates a soft circular glow sprite on a canvas ──────────────────────
function makeGlowTexture(color = '#ffffff', resolution = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = resolution;
  canvas.height = resolution;
  const ctx = canvas.getContext('2d');
  const half = resolution / 2;

  const grd = ctx.createRadialGradient(half, half, 0, half, half, half);
  grd.addColorStop(0.0, color);
  grd.addColorStop(0.2, color.replace('1)', '0.8)'));
  grd.addColorStop(0.5, color.replace('1)', '0.25)'));
  grd.addColorStop(1.0, 'rgba(0,0,0,0)');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, resolution, resolution);

  return new THREE.CanvasTexture(canvas);
}

// Simpler helper for named colours
function glow(r, g, b) {
  return makeGlowTexture(`rgba(${r},${g},${b},1)`);
}

export default function SpaceCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010208);

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 14);

    // ── Textures ─────────────────────────────────────────────────────────
    const texWhite  = glow(255, 255, 255);
    const texCyan   = glow(0,   229, 255);
    const texOrange = glow(255, 120, 30);
    const texViolet = glow(140, 60,  255);
    const texBlue   = glow(60,  100, 255);

    // ── Lighting ──────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0a0a2e, 3));

    const coreLight = new THREE.PointLight(0x6633ff, 30, 60);
    scene.add(coreLight);

    const rim1 = new THREE.PointLight(0x00e5ff, 12, 80);
    rim1.position.set(20, 10, -20);
    scene.add(rim1);

    const rim2 = new THREE.PointLight(0xff2266, 8, 60);
    rim2.position.set(-20, -10, 10);
    scene.add(rim2);

    // ── 1. DEEP STAR FIELD (round glowing dots) ───────────────────────────
    const starCount = 6000;
    const starPos   = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const r     = 250 + Math.random() * 600;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);
      starSizes[i] = 0.4 + Math.random() * 1.2;  // varied sizes
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('size',     new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      map:          texWhite,
      size:         1.8,
      sizeAttenuation: true,
      transparent:  true,
      opacity:      0.9,
      blending:     THREE.AdditiveBlending,
      depthWrite:   false,
      vertexColors: false,
    });

    scene.add(new THREE.Points(starGeo, starMat));

    // Close bright star cluster (a few big bright ones)
    const brightCount = 120;
    const brightPos   = new Float32Array(brightCount * 3);
    for (let i = 0; i < brightCount; i++) {
      const r     = 60 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      brightPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      brightPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      brightPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const brightGeo = new THREE.BufferGeometry();
    brightGeo.setAttribute('position', new THREE.BufferAttribute(brightPos, 3));
    const brightMat = new THREE.PointsMaterial({
      map: texWhite, size: 3.5, sizeAttenuation: true,
      transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(brightGeo, brightMat));

    // ── 2. NEBULA CLOUDS (additive round glows) ───────────────────────────
    const nebulaDefs = [
      { tex: texViolet, count: 900, minR: 14, maxR: 42, height: 8,  opacity: 0.22, size: 5 },
      { tex: texCyan,   count: 700, minR: 18, maxR: 48, height: 6,  opacity: 0.18, size: 4 },
      { tex: texBlue,   count: 600, minR: 22, maxR: 55, height: 12, opacity: 0.14, size: 6 },
    ];

    nebulaDefs.forEach(({ tex, count, minR, maxR, height, opacity, size }) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = minR + Math.random() * (maxR - minR);
        pos[i * 3]     = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * height;
        pos[i * 3 + 2] = Math.sin(a) * r;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        map: tex, size, sizeAttenuation: true,
        transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      scene.add(new THREE.Points(geo, mat));
    });

    // ── 3. BLACK HOLE CORE ────────────────────────────────────────────────
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Dark event horizon sphere
    coreGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(3.5, 64, 64),
      new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0, metalness: 1 })
    ));

    // Inner glow halo (back-face shell)
    coreGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(4.4, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x6633ff, transparent: true, opacity: 0.07,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
    ));
    coreGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(5.8, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x2200cc, transparent: true, opacity: 0.04,
        side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false,
      })
    ));

    // ── 4. ACCRETION DISK ─────────────────────────────────────────────────
    const diskGroup = new THREE.Group();
    diskGroup.rotation.x = Math.PI / 9;
    scene.add(diskGroup);

    [
      [4.5,  0.16, 0xff6600, 0.95],
      [5.4,  0.10, 0xffaa00, 0.75],
      [6.3,  0.07, 0xff4400, 0.60],
      [7.0,  0.04, 0xffdd00, 0.45],
    ].forEach(([r, tube, color, op]) => {
      diskGroup.add(new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 16, 240),
        new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: op,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      ));
    });

    // Glowing dust band along disk (round glowing particles)
    const diskDustCount = 2000;
    const diskDustPos   = new Float32Array(diskDustCount * 3);
    for (let i = 0; i < diskDustCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 3.8;
      diskDustPos[i * 3]     = Math.cos(a) * r;
      diskDustPos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      diskDustPos[i * 3 + 2] = Math.sin(a) * r;
    }
    const diskDustGeo = new THREE.BufferGeometry();
    diskDustGeo.setAttribute('position', new THREE.BufferAttribute(diskDustPos, 3));
    const diskDustMat = new THREE.PointsMaterial({
      map: texOrange, size: 0.55, sizeAttenuation: true,
      transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    diskGroup.add(new THREE.Points(diskDustGeo, diskDustMat));

    // ── 5. OUTER ORBITAL RINGS ────────────────────────────────────────────
    const ringMeshes = [
      [9,  0.025, 0x00e5ff, 0.50,  0.5,  0,    0   ],
      [11, 0.020, 0x6600ff, 0.40, -0.3,  0.8,  0   ],
      [13, 0.015, 0x00ccff, 0.30,  1.1,  0.3,  0.6 ],
      [8,  0.030, 0xff2266, 0.35,  0.2, -0.5,  1.2 ],
    ].map(([r, tube, color, op, rx, ry, rz]) => {
      const m = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 12, 200),
        new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: op,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      m.rotation.set(rx, ry, rz);
      scene.add(m);
      return m;
    });

    // ── 6. WIREFRAME CAGE ─────────────────────────────────────────────────
    const cage = new THREE.Mesh(
      new THREE.IcosahedronGeometry(6.8, 2),
      new THREE.MeshBasicMaterial({
        color: 0x4422ff, wireframe: true,
        transparent: true, opacity: 0.10,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(cage);

    // ── 7. ORBITING DUST PARTICLES (round) ────────────────────────────────
    const orbitCount   = 1400;
    const orbitPos     = new Float32Array(orbitCount * 3);
    const orbitAngles  = new Float32Array(orbitCount);
    const orbitRadii   = new Float32Array(orbitCount);
    const orbitHeights = new Float32Array(orbitCount);

    for (let i = 0; i < orbitCount; i++) {
      orbitAngles[i]  = Math.random() * Math.PI * 2;
      orbitRadii[i]   = 5 + Math.random() * 9;
      orbitHeights[i] = (Math.random() - 0.5) * 3;
    }
    const orbitGeo = new THREE.BufferGeometry();
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({
      map: texOrange, size: 0.18, sizeAttenuation: true,
      transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(orbitGeo, orbitMat));

    // ── 8. CYAN ENERGY SPARKS near core ───────────────────────────────────
    const sparkCount = 300;
    const sparkPos   = new Float32Array(sparkCount * 3);
    const sparkAngles= new Float32Array(sparkCount);
    const sparkRadii = new Float32Array(sparkCount);

    for (let i = 0; i < sparkCount; i++) {
      sparkAngles[i] = Math.random() * Math.PI * 2;
      sparkRadii[i]  = 3.5 + Math.random() * 2;
      sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    }
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      map: texCyan, size: 0.4, sizeAttenuation: true,
      transparent: true, opacity: 0.8,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(sparkGeo, sparkMat));

    // ── Mouse parallax ────────────────────────────────────────────────────
    let mx = 0, my = 0, tx = 0, ty = 0;
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ─────────────────────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse damping
      tx += (mx - tx) * 0.03;
      ty += (my - ty) * 0.03;

      // Core slow rotation
      coreGroup.rotation.y = t * 0.06 + tx * 0.3;
      coreGroup.rotation.x = ty * 0.2;

      // Accretion disk spin
      diskGroup.rotation.z = t * 0.16;

      // Outer rings drift
      ringMeshes.forEach((r, i) => {
        r.rotation.z += 0.0012 * (i % 2 === 0 ? 1 : -1);
        r.rotation.x += 0.0005;
      });

      // Cage slow tumble
      cage.rotation.y = t * 0.04;
      cage.rotation.x = t * 0.025;

      // Orbiting dust
      const orbitArr = orbitGeo.attributes.position.array;
      for (let i = 0; i < orbitCount; i++) {
        orbitAngles[i] += 0.0007 + i * 0.0000005;
        const r = orbitRadii[i];
        orbitArr[i * 3]     = Math.cos(orbitAngles[i]) * r;
        orbitArr[i * 3 + 1] = orbitHeights[i] + Math.sin(t * 0.3 + i) * 0.12;
        orbitArr[i * 3 + 2] = Math.sin(orbitAngles[i]) * r;
      }
      orbitGeo.attributes.position.needsUpdate = true;

      // Cyan sparks swirl
      const sparkArr = sparkGeo.attributes.position.array;
      for (let i = 0; i < sparkCount; i++) {
        sparkAngles[i] += 0.003 + i * 0.000005;
        const r = sparkRadii[i];
        sparkArr[i * 3]     = Math.cos(sparkAngles[i]) * r;
        sparkArr[i * 3 + 2] = Math.sin(sparkAngles[i]) * r;
      }
      sparkGeo.attributes.position.needsUpdate = true;

      // Camera parallax pan
      camera.position.x += (-tx * 2.5 - camera.position.x) * 0.03;
      camera.position.y += ( ty * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Core light heartbeat
      coreLight.intensity = 28 + Math.sin(t * 2.2) * 7;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose textures
      [texWhite, texCyan, texOrange, texViolet, texBlue].forEach(t => t.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}
