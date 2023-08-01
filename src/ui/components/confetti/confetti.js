import { config } from './confetti.config'

const defaults = { startVelocity: 30, spread: 360, ticks: 20, zIndex: 0, ...config };

function randomInRange (min, max) {
	return Math.random() * (max - min) + min;
}

function launchConfetti ({ durationInSecs } = { durationInSecs: 3 }) {
  const duration = durationInSecs * 1000
  const animationEnd = Date.now() + duration

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 20 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    );
  }, 250);
}

export { launchConfetti }

