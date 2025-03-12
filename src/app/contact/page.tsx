"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Placeholder for backend submission logic
    console.log("Submitted Data:", formData);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-800 flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Contact Us</h1>
      <p className="max-w-3xl text-center text-black text-lg mb-10">
        We would love to hear from you! Feel free to reach out with any questions, suggestions, or feedback.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-amber-500 p-8 rounded-2xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-800 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-800 font-medium mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>

      {isSubmitted && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg">
          Thank you for reaching out!We will get back to you soon.
        </div>
      )}

      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-semibold text-black mb-4">Get In Touch</h2>
        <p className="text-black mb-4">
          📍 Visit us at: <strong>123 Food Street, Karachi, Pakistan</strong>
        </p>
        <p className="text-black mb-4">
          📞 Call us: <strong>(+92) 123-456-7890</strong>
        </p>
        <p className="text-black mb-4">
          ✉️ Email us: <strong>support@zaiqaexpress.com</strong>
        </p>
      </div>
    </div>
  );
}
