import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main
        className="bg-homebg xl:h-screen h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533134486753-c833f0ed4866?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="bg-none my-2 h-full relative xl:max-w-7xl xl:mx-auto">
          <div className="w-full h-full flex flex-col justify-center items-center align-middle relative z-20 px-1">
            <h1
              className="text-5xl md:text-8xl xl:text-9xl uppercase text-white banner--text--purple"
              style={{
                textShadow: `
                  1px 1px 0 #000,
                  2px 2px 0 #000,
                  3px 3px 0 #000,
                  4px 4px 0 #000,
                  5px 5px 0 #000,
                  6px 6px 0 #000,
                  7px 7px 0 #000,
                  8px 8px 0 #000,
                  9px 9px 0 #000,
                  10px 10px 0 #000
                `,
              }}
            >
              Lucky Wheel
            </h1>
            <Link href={'/luckydraw'}>
              <button
                className="animate-pulse py-[4px] font-semibold border-2 border-btngreen bg-btngreen text-white mt-10 w-[300px] rounded-2xl text-xl"
                style={{
                  boxShadow: `
                    1px 1px 0 #000,
                    2px 2px 0 #000,
                    3px 3px 0 #000,
                    4px 4px 0 #000,
                    5px 5px 0 #000,
                    6px 6px 0 #000,
                    7px 7px 0 #000,
                    8px 8px 0 #000,
                    9px 9px 0 #000,
                    10px 10px 0 #000
                  `,
                }}
              >
                Lucky Draw
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
