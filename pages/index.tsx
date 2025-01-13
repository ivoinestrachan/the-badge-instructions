import Image from "next/image";
import clown from "../assets/clown.jpg";
import { useState, useEffect } from "react";

const morseCode: Record<number, string> = {
  6: "-....",
  7: "--...",
  4: "....",
  5: ".....",
  0: "-----",
  3: "...--"
};

const morseColors: string[] = ['orange', 'green', 'red'];

const Index = () => {
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const numbers = ["6", "7", "4", "5", "0", "3"];

  useEffect(() => {
    if (isAnimating && currentSymbolIndex < morseCode[Number(numbers[currentNumberIndex])].length) {
      const timer = setTimeout(() => {
        setCurrentSymbolIndex(prev => prev + 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (currentSymbolIndex === morseCode[Number(numbers[currentNumberIndex])].length) {
      setIsAnimating(false);
    }
  }, [isAnimating, currentSymbolIndex, currentNumberIndex]);

  const renderMorseCircles = (num: number) => {
    const code = morseCode[num];
    const circles = [];

    for (let i = 0; i < code.length; i++) {
      const symbol = code[i];
      let color = morseColors[2]; 
      if (symbol === '.') {
        color = morseColors[1]; 
      } else if (symbol === '-') {
        color = morseColors[0]; 
      }
      const isCurrent = i === currentSymbolIndex;

      circles.push(
        <div
          key={i}
          className={`circle ${symbol === '.' ? 'dot' : 'dash'} ${color}`}
          style={{
            opacity: isCurrent ? 1 : 0,
            animation: isCurrent ? `blinkDot 0.5s forwards` : 'none',
          }}
        />
      );
    }
    return circles;
  };

  const startMorseSequence = () => {
    setIsAnimating(true);
    setCurrentSymbolIndex(0);
  };

  const showNextNumber = () => {
    if (currentNumberIndex < numbers.length - 1) {
      setCurrentNumberIndex(prev => prev + 1);
      setCurrentSymbolIndex(0);
      setIsAnimating(true);
    }
  };

  const replayCurrentNumber = () => {
    setCurrentSymbolIndex(0);
    setIsAnimating(true);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <a href="https://www.acsu.buffalo.edu/~maxwell/Fundamental_Morse.html" className="text-blue-500 underline text-[1.5rem]">Help?</a>
      <div className="flex justify-center items-center mt-10">
        <Image src={clown} alt="clown" width={300} height={300} />
      </div>

      <div className="flex justify-center items-center mt-20 text-2xl font-bold">
        This was tricky to code but i locked in!, I love you 
      </div>

      <div className="flex justify-center items-center space-x-4 mt-10">
        <div className="morse-group">
          {renderMorseCircles(Number(numbers[currentNumberIndex]))}
        </div>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={startMorseSequence}
        >
          Start Morse Sequence
        </button>

        <button
          className="mt-5 px-4 py-2 bg-green-500 text-white rounded"
          onClick={showNextNumber}
        >
          Show Next Number
        </button>

        <button
          className="mt-5 px-4 py-2 bg-yellow-500 text-white rounded"
          onClick={replayCurrentNumber}
        >
          Replay
        </button>
      </div>
    </div>
  );
};

export default Index;
