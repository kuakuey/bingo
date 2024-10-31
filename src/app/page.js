"use client";
import { useState } from "react";

export default function Home() {
  const [bingoNumber, setBingoNumber] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]); // Array para guardar todos los números generados
  const [showFullScreen, setShowFullScreen] = useState(false); // Estado para mostrar el número en pantalla completa

  const generateBingoNumber = () => {
    // Si ya se han generado todos los números, salir de la función
    if (generatedNumbers.length >= 75) {
      document.getElementById("btnGenerar").style.display = "none";
      return;
    }

    let newBingoNumber;

    do {
      const number = Math.floor(Math.random() * 75) + 1; // Número aleatorio entre 1 y 75
      let letter;

      // Asigna la letra de acuerdo con el número
      if (number <= 15) {
        letter = "B";
      } else if (number <= 30) {
        letter = "I";
      } else if (number <= 45) {
        letter = "N";
      } else if (number <= 60) {
        letter = "G";
      } else {
        letter = "O";
      }

      newBingoNumber = `${letter}${number}`;
    } while (generatedNumbers.includes(newBingoNumber)); // Repite hasta que el número no esté en el array

    setBingoNumber(newBingoNumber);

    // Guarda el nuevo número en el array de números generados
    setGeneratedNumbers((prevNumbers) => [...prevNumbers, newBingoNumber]);

    // Muestra el número en pantalla completa
    setShowFullScreen(true);

    // Cierra la pantalla completa automáticamente después de 2 segundos
    setTimeout(() => {
      setShowFullScreen(false);
    }, 2000); // 2000 ms = 2 segundos
  };

  // Función para reiniciar el juego
  const resetGame = () => {
    setBingoNumber("");
    setGeneratedNumbers([]);
    document.getElementById("btnGenerar").style.display = "block";
  };

  return (
    <div>
      {/* Muestra los números generados */}
      <div className="text-center px-[5vw] flex flex-col">
        <h3 className="font-black text-5xl p-4 text-green-400 uppercase">Bingo</h3>
        <div></div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] auto-rows-[4rem] gap-6 bg-blue-100 h-[85vh] p-8">
          {generatedNumbers.map((num, index) => (
            <span
              key={index}
              className="text-5xl font-black select-none hover:scale-125 transition-all flex items-center justify-center"
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Pantalla completa para mostrar el número generado */}
      {showFullScreen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          className="font-black text-[25vw] select-none cursor-wait"
        >
          {bingoNumber}
        </div>
      )}

      {/* Botón para generar un número nuevo */}
      <button
        id="btnGenerar"
        className="bg-green-400 w-[10vw] text-3xl hover:scale-[2] rounded-full aspect-square font-black font-mono absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] transition-all text-white uppercase"
        onClick={generateBingoNumber}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-[5rem] w-full" viewBox="0 0 48 48"><path fill="white" stroke="white" stroke-linejoin="round" stroke-width="0" d="M30 4H18v14H4v12h14v14h12V30h14V18H30z"/></svg>
      </button>

      {/* Botón para reiniciar el juego */}
      <button
        className="bg-red-500 w-[10vw] text-3xl rounded-full aspect-square font-black font-mono absolute bottom-0 left-0 translate-x-[-20%] translate-y-[20%] transition-all  hover:scale-110 hover:text-white"
        onClick={resetGame}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-[5rem] w-full" viewBox="0 0 20 20"><path fill="white" d="M15.65 4.35A8 8 0 1 0 17.4 13h-2.22a6 6 0 1 1-1-7.22L11 9h7V2z"/></svg>
      </button>
    </div>
  );
}
