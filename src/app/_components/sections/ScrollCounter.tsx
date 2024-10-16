'use client'

import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';


type TypeCounterProps = {
  title: string;
  value: number;
};

const ScrollCounter = ({ title, value }: TypeCounterProps) => {
  const [counterOn, setCounterOn] = useState(false);

  const handleScroll = () => {
    const element = document.getElementById('counterElement');
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Check if the element is in the viewport
      if (elementTop < windowHeight) {
        setCounterOn(true);
      } else {
        setCounterOn(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div  id="counterElement" className=''>
      {counterOn ? (
        <div className={`flex flex-col items-center gap-y-3 mb-3 mt-10 animate-fadeIn `}>
          <div className="inline-block mx-1 p-2 px-10 py-5 shadow-md bg-accent3 dark:bg-dark-accent3 rounded-lg cursor-pointer transition ease-in-out duration-500 hover:bg-second hover:scale-105 hover:shadow-3xl">
            <div className="flex cursor-default items-center justify-center gap-0 ">
              <div className="font-mono text-4xl leading-none ">
                <CountUp start={0} end={value} duration={2} delay={0} />
              </div>
              <div className="text-4xl flex items-center font-medium">+</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-xl md:text-2xl flex text-center md:text-left pl-3 text-slate-600 font-medium">
              {title}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-3 mb-3 mt-10">
          <div className="inline-block mx-1 p-2 px-10 py-5 shadow-md bg-accent3 dark:bg-dark-accent3 rounded-lg cursor-pointer transition ease-in-out duration-500 hover:bg-second hover:scale-105 hover:shadow-3xl">
            <div className="flex cursor-default items-center justify-center gap-0">
              <div className="font-mono text-4xl leading-none ">{/* <CountUp start={0} end={value} duration={2} delay={0} /> */}</div>
              <div className="text-4xl flex items-center font-medium">+</div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-xl md:text-2xl flex text-center md:text-left pl-3 text-slate-600 font-medium">
              {title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollCounter;
