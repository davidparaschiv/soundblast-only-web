const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelector('#year').textContent = new Date().getFullYear();

function drawFallback(container) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  container.appendChild(canvas);
  const resize = () => {
    const scale = window.devicePixelRatio || 1;
    const width = container.clientWidth;
    const height = container.clientHeight;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(scale, scale);
    context.clearRect(0, 0, width, height);
    [height * .36, height * .66].forEach((y, deck) => {
      context.strokeStyle = 'rgba(255,255,255,.12)';
      context.strokeRect(width * .08, y - 43, width * .86, 86);
      for (let index = 0; index < 38; index += 1) {
        const x = width * .24 + index * (width * .66 / 38);
        const barHeight = 12 + Math.abs(Math.sin(index * 1.7 + deck)) * 49;
        context.fillStyle = index < 4 ? '#ff5314' : 'rgba(255,255,255,.16)';
        context.fillRect(x, y - barHeight / 2, 4, barHeight);
      }
    });
  };
  resize();
  window.addEventListener('resize', resize);
}

function startVisualizer() {
  const container = document.querySelector('#phaser-stage');
  if (!window.Phaser) {
    drawFallback(container);
    return;
  }

  class WaveformScene extends Phaser.Scene {
    create() {
      this.phase = 0;
      this.bars = [];
      const deckY = [160, 320];
      const graphics = this.add.graphics();

      deckY.forEach((y, deck) => {
        graphics.fillStyle(0x15171a, .94);
        graphics.fillRoundedRect(35, y - 62, 650, 124, 12);
        graphics.lineStyle(1, 0xffffff, .11);
        graphics.strokeRoundedRect(35, y - 62, 650, 124, 12);
        graphics.lineStyle(2, deck === 0 ? 0xff5314 : 0x3df57a, .58);
        graphics.lineBetween(195, y, 650, y);

        for (let index = 0; index < 54; index += 1) {
          const x = 205 + index * 8.1;
          const bar = this.add.rectangle(x, y, 4, 30, index < 5 ? 0xff5314 : 0x5b5e65, index < 5 ? .9 : .38);
          this.bars.push({ node: bar, seed: index * .72 + deck * 1.9, deck });
        }
      });
    }

    update(_time, delta) {
      if (reducedMotion) return;
      this.phase += delta * .003;
      this.bars.forEach(({ node, seed, deck }) => {
        node.displayHeight = 15 + Math.abs(Math.sin(this.phase + seed) + Math.sin(this.phase * .54 + seed * .43)) * (23 + deck * 3);
      });
    }
  }

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: container,
    transparent: true,
    width: 720,
    height: 480,
    antialias: true,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: WaveformScene
  });
}

startVisualizer();
