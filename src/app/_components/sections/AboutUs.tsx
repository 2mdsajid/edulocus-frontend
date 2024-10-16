import React from 'react';

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="py-20 px-4 md:px-10 lg:px-20 xl:px-32 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
      <p className="text-lg text-gray-700 text-center leading-relaxed max-w-3xl mx-auto">
        We are an educational site run by dedicated students from various medical colleges, 
        committed to providing the most affordable MCQs tailored specifically for 
        PG/MD/MS entrance exams. Join us on your journey to success!
      </p>
    </div>
  );
};

export default AboutUs;
