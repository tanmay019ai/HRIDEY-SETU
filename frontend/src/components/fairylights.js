import  { useEffect } from 'react';
import '../styles/divineTheme.css'; // make sure this contains .fairy-light class

function FairyLights() {
  useEffect(() => {
    const container = document.body;
    const lights = [];

    for (let i = 0; i < 30; i++) {
      const light = document.createElement("div");
      light.className = "fairy-light";
      light.style.top = `${Math.random() * window.innerHeight}px`;
      light.style.left = `${Math.random() * window.innerWidth}px`;
      light.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(light);
      lights.push(light);
    }

    return () => {
      lights.forEach((light) => container.removeChild(light));
    };
  }, []);

  return null;
}

export default FairyLights;
