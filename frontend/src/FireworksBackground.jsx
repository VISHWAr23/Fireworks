import React, { useEffect, useRef } from 'react';

export default function FireworksBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Festive Diwali Color Palettes
    const colorPalettes = [
      ['#ff0055', '#ff5500', '#ffcc00', '#ffffff'], // Flame Red & Gold
      ['#00f0ff', '#7000ff', '#ff00d4', '#ffffff'], // Neon Purple & Cyan
      ['#00ff66', '#00e5ff', '#ffff00', '#ffffff'], // Emerald Sparkler Green
      ['#ffd700', '#ffaa00', '#ff3300', '#ffe680'], // Pure Diwali Gold
      ['#ff3399', '#9933ff', '#33ccff', '#ffffff'], // Multi-Color Sky Shot
      ['#ff1744', '#f50057', '#d500f9', '#ffffff'], // Royal Ruby & Magenta
      ['#00e676', '#76ff03', '#ffea00', '#ffffff'], // Electric Lime & Gold
    ];

    const fireworks = [];
    const particles = [];

    class Rocket {
      constructor(startX, startY, targetX, targetY) {
        this.x = startX !== undefined ? startX : width * 0.12 + Math.random() * (width * 0.76);
        this.y = startY !== undefined ? startY : height + 15;
        this.targetX = targetX !== undefined ? targetX : width * 0.08 + Math.random() * (width * 0.84);
        this.targetY = targetY !== undefined ? targetY : height * 0.06 + Math.random() * (height * 0.44);
        this.speed = 10 + Math.random() * 6;
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        this.trail = [];
        this.trailLength = 10;
        this.exploded = false;
        this.size = 3.5 + Math.random() * 2;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 1 });
        if (this.trail.length > this.trailLength) this.trail.shift();
        for (let t of this.trail) t.alpha -= 0.1;

        this.x += this.vx;
        this.y += this.vy;

        // Apex detonation
        if (this.vy < 0 && this.y <= this.targetY) {
          this.explode();
        }
      }

      explode() {
        this.exploded = true;
        // Big cracker explosion: 45 to 70 shimmering sparks (balanced for 60-120fps performance)
        const particleCount = 45 + Math.floor(Math.random() * 25);

        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.palette));
        }

        // Shockwave expansion ring
        for (let i = 0; i < 14; i++) {
          particles.push(new ShockwaveSpark(this.x, this.y, this.palette[0]));
        }
      }

      draw() {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < this.trail.length; i++) {
          const pt = this.trail[i];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, this.size * (i / this.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 210, 100, ${Math.max(0, pt.alpha)})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }
    }

    class Particle {
      constructor(x, y, palette) {
        this.x = x;
        this.y = y;
        this.palette = palette;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 9;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.friction = 0.955;
        this.gravity = 0.12;
        this.alpha = 1;
        this.decay = 0.012 + Math.random() * 0.015;
        this.size = 2 + Math.random() * 3;
        this.flicker = Math.random() > 0.4;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.size = Math.max(0.2, this.size * 0.985);
      }

      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.flicker && Math.random() > 0.35 ? this.alpha * 0.6 : this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    class ShockwaveSpark {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = 7 + Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.028;
        this.size = 2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.93;
        this.y *= 0.93;
        this.alpha -= this.decay;
      }
      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const launchInstantBlast = (targetX, targetY) => {
      const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const count = 40 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(targetX, targetY, palette));
      }
      for (let i = 0; i < 14; i++) {
        particles.push(new ShockwaveSpark(targetX, targetY, palette[0]));
      }
    };

    const handleWindowClick = (e) => {
      if (e.target.closest('button, input, a, [role="button"], .no-firework')) return;
      launchInstantBlast(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleWindowClick);

    let lastLaunch = 0;

    const animate = (timestamp) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (timestamp - lastLaunch > 850 + Math.random() * 700) {
        // Cap active rockets to avoid particle buildup
        if (fireworks.length < 3) {
          fireworks.push(new Rocket());
        }
        lastLaunch = timestamp;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.update();
        fw.draw();
        if (fw.exploded) {
          fireworks.splice(i, 1);
        }
      }

      // Hard limit on particles for smooth 60fps on lower-end devices
      if (particles.length > 250) {
        particles.splice(0, particles.length - 250);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.92 }}
    />
  );
}
