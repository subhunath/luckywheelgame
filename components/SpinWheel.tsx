import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import confetti from 'canvas-confetti';

type Props = {
  names: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
};

const SpinWheel: React.FC<Props> = ({ names, setNames }) => {
  const [open, setOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const wheelRef = useRef<SVGSVGElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const getColor = (index: number) => {
    return index % 2 === 0 ? 'orange' : 'white';
  };

  useEffect(() => {
    const svg = wheelRef.current;
    if (!svg) return;

    while (svg.firstChild) {
      svg.removeChild(svg.lastChild as Node);
    }

    const radius = 50;
    const sliceAngle = (2 * Math.PI) / names.length;

    names.forEach((name, index) => {
      const angle = index * sliceAngle;
      const x = 50 + radius * Math.sin(angle);
      const y = 50 - radius * Math.cos(angle);

      const slice = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      slice.setAttribute(
        'd',
        `M50,50 L${x},${y} A${radius},${radius} 0 0,1 ${
          50 + radius * Math.sin(angle + sliceAngle)
        },${50 - radius * Math.cos(angle + sliceAngle)} Z`
      );
      slice.setAttribute('fill', getColor(index));
      slice.setAttribute('stroke', 'black');
      slice.setAttribute('stroke-width', '0.5');
      svg.appendChild(slice);

      const textAngle = angle + sliceAngle / 2;
      const textX = 50 + (radius - 15) * Math.sin(textAngle);
      const textY = 50 - (radius - 15) * Math.cos(textAngle);

      const text = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      text.setAttribute('x', `${textX}`);
      text.setAttribute('y', `${textY}`);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('alignment-baseline', 'middle');
      text.setAttribute('fill', index % 2 === 0 ? 'white' : 'black');
      text.setAttribute('font-size', '3');
      text.setAttribute('transform', `rotate(90, ${textX}, ${textY})`);
      text.textContent = name;
      svg.appendChild(text);
    });
  }, [names]);

  const spinWheel = () => {
    if (!wheelRef.current || names.length < 2) return;

    setIsSpinning(true);

    const degree = Math.random() * 360 + 1440; // Calculate the random degree
    wheelRef.current.style.transition = 'transform 1.5s ease-out'; 
    wheelRef.current.style.transform = `rotateZ(-${degree}deg)`; // Rotate anticlockwise

    setTimeout(() => {
      if (!wheelRef.current) return;
      const adjustedAngle = degree % 360;
      const sliceAngle = 360 / names.length;
      const index = Math.floor((adjustedAngle) / sliceAngle); // Calculate the winning index

      setSelectedName(names[index]);
      setOpen(true); // Open the modal

      wheelRef.current.style.transition = 'none';
      wheelRef.current.style.transform = `rotateZ(-${adjustedAngle}deg)`;
      setIsSpinning(false);

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  };

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        selectedName={selectedName}
        setNames={setNames}
      />

      <div className="wheel-container relative">
        <svg
          viewBox="0 0 100 100"
          ref={wheelRef}
          className="wheel"
          style={{
            border: '2px solid white',
            borderRadius: '50%',
            width: '80%',
            height: '80%',
            margin: 'auto',
            transformStyle: 'preserve-3d',
          }}
        ></svg>
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0px',
            height: '20px',
            borderTop: '30px solid white',
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            zIndex: 2,
          }}
        ></div>
      </div>
      <div className="flex justify-center w-full mt-10">
        <button
          onClick={spinWheel}
          disabled={isSpinning || names.length < 2}
          className={`py-[4px] border-2 border-btngreen bg-btngreen text-white mt-2 px-10 rounded-2xl text-xl ${
            isSpinning || names.length < 2
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          Spin!
        </button>
      </div>
    </div>
  );
};

export default SpinWheel;
