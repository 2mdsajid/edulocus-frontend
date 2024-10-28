import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
    return (
        <div className="min-h-[80vh] flex flex-col bg-color1 py-16 px-4 md:px-10 lg:px-20 xl:px-32">
            <div>
                <h2 className='text-4xl mb-4 text-center font-extrabold tracking-wider text-purple-800 font-pt-serif'>
                    Get In Touch
                </h2>
                <p className='text-xl text-center font-normal max-w-3xl mx-auto mb-12 text-gray-600'>
                    Your queries, questions, feedbacks! we are waiting to hear from you.
                </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row">
                <div className="lg:w-1/2 flex items-center justify-center bg-accent3">
                    <img
                        src="/contact.jpg" // Replace with your image path
                        alt="Contact Us"
                        width={400} // Adjust based on your image
                        height={400} // Adjust based on your image
                        className="object-cover w-[80%] mx-auto"
                    />
                </div>
                <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start justify-center p-10">
                    <form className="w-full ">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <Input id="name" type="text" placeholder="Your Name" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <Input id="email" type="email" placeholder="Your Email" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                Message
                            </label>
                            <Textarea id="message" placeholder="Your Message" required rows={4} />
                        </div>
                        <Button type="submit" className="w-full bg-accent hover:bg-dark-accent text-white font-semibold py-2 rounded">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
