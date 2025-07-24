import React from 'react';

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="py-20 px-4 md:px-10 lg:px-20 xl:px-32 bg-color8 text-white">
      <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
      <p className="text-lg  text-center leading-relaxed max-w-3xl mx-auto">
        We are an educational site run by dedicated students from various medical colleges, 
        committed to providing the most affordable MCQs tailored specifically for CEE UG, Nursing & 
        PG/MD/MS entrance exams. Join us on your journey to success!
      </p>
    </div>
  );
};

export default AboutUs;
