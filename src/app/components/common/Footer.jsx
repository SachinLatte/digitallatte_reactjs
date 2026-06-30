"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaRegUser,
  FaPhone,
  FaRegEnvelope,
  FaRegComments,
} from "react-icons/fa6";

export default function Footer() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [year, setYear] = useState(2026);

  const words = ["Digital", "Strategy", "Business", "Creative", "Ideas"];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Text changing typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 400); // Wait for fade out to complete before changing word
    }, 1900); // 1.5s display + 0.4s fade transition
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneKeyPress = (e) => {
    // Restrict to digits only
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple frontend validations
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^[0-9]{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be a valid 10-digit number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email must be a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock successful submit
    setIsSubmitted(true);
    setFormData({ name: "", contact: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. Say Hello Contact Section */}
      <section
        id="say_hello"
        className="say_hello w-full bg-[#16110f] text-white py-20 md:py-28 px-6 sm:px-12 md:px-16 lg:px-24"
      >
        <div className="max-w-[1700px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left Box */}
            <div className="say_hello_main_left flex flex-col justify-start w-full">
              <h4 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black capitalize tracking-[2px] leading-[1.1] md:leading-[102px] mb-8 text-left">
                Let's Talk <br />
                <span
                  className={`text-white transition-opacity duration-300 block ${visible ? "opacity-100" : "opacity-0"}`}
                >
                  {words[wordIndex]}
                </span>
              </h4>

              <h5 className="text-white text-base sm:text-lg md:text-xl font-normal tracking-[1px] mb-10 text-left">
                Let's discuss your project at{" "}
                <a
                  href="mailto:ideas@digitallatte.in"
                  className="text-[#ff9000] hover:underline font-semibold transition-colors duration-300"
                >
                  ideas@digitallatte.in
                </a>
              </h5>

              <ul className="social_media flex items-center space-x-2">
                <li>
                  <a
                    href="https://www.facebook.com/AgencyDigitalLatte"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/Digitallatte"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/digital-latte/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/digitallatte/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Box */}
            <div className="say_hello_main_right w-full flex flex-col justify-center">
              {isSubmitted ? (
                <div className="thank_msg_body bg-neutral-950/40 border border-neutral-900 p-8 sm:p-10 rounded-2xl w-full text-left">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#ff9000] mb-4 uppercase tracking-wider">
                    Thank you for getting in touch!
                  </h2>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed font-libre">
                    We will get back to you soon. In the meantime,
                    <br />
                    you can explore our{" "}
                    <Link
                      href="/case-studies"
                      className="text-[#ff9000] underline font-medium hover:text-[#e07f2a] transition-colors duration-300"
                    >
                      Digital Marketing case studies
                    </Link>{" "}
                    <br />
                    or update yourself with the latest from the world of <br />
                    digital through our{" "}
                    <Link
                      href="/blog"
                      className="text-[#ff9000] underline font-medium hover:text-[#e07f2a] transition-colors duration-300"
                    >
                      blog.
                    </Link>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="contact-agile">
                    {/* Name Field */}
                    <div className="contact-form">
                      <label htmlFor="name-input">
                        <FaRegUser className="text-lg text-white" />
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name*"
                        required
                        className="font-libre"
                      />
                      {errors.name && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Contact & Email Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                      {/* Phone Field */}
                      <div className="contact-form">
                        <label htmlFor="contact-input">
                          <FaPhone className="text-lg text-white" />
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact-input"
                          value={formData.contact}
                          onKeyPress={handlePhoneKeyPress}
                          onChange={handleInputChange}
                          maxLength={10}
                          placeholder="Contact*"
                          required
                          className="font-libre"
                        />
                        {errors.contact && (
                          <span className="text-red-500 text-xs mt-1 block">
                            {errors.contact}
                          </span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div className="contact-form">
                        <label htmlFor="email-input">
                          <FaRegEnvelope className="text-lg text-white" />
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email-input"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email*"
                          required
                          className="font-libre"
                        />
                        {errors.email && (
                          <span className="text-red-500 text-xs mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="contact-form">
                      <label htmlFor="message-input">
                        <FaRegComments className="text-lg text-white" />
                      </label>
                      <input
                        type="text"
                        name="message"
                        id="message-input"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Message*"
                        required
                        className="font-libre"
                      />
                      {errors.message && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Section */}
                    <div className="send-button text-right mt-6">
                      <input
                        type="submit"
                        value="Send Message"
                        className="cursor-pointer font-sans"
                      />
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Footer Section */}
      <footer className="w-full bg-white text-[#181414] py-8 px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Footer Logo */}
          <div className="footer_logo flex-shrink-0">
            <Link href="/">
              <img
                src="/img/footer_logo.png"
                alt="Digital Latte Logo"
                className="h-16 object-contain"
              />
            </Link>
          </div>

          {/* Footer Nav links */}
          <div className="footer_navigations w-full md:w-auto">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-end items-center gap-4 sm:gap-6 lg:gap-15">
              <li>
                <Link
                  href="/our-expertise/digital-services"
                  className="hover:text-[#e07f2a] transition duration-300 text-sm font-semibold tracking-wide uppercase"
                >
                  Digital Marketing Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/design-services"
                  className="hover:text-[#e07f2a] transition duration-300 text-sm font-semibold tracking-wide uppercase"
                >
                  Design Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/web-development-services"
                  className="hover:text-[#e07f2a] transition duration-300 text-sm font-semibold tracking-wide uppercase"
                >
                  Web Development Services
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/digital-services/social-media-marketing"
                  className="hover:text-[#e07f2a] transition duration-300 text-sm font-semibold tracking-wide uppercase"
                >
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link
                  href="/our-expertise/digital-services/search-engine-optimization-seo"
                  className="hover:text-[#e07f2a] transition duration-300 text-sm font-semibold tracking-wide uppercase"
                >
                  Search Engine Optimization
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyrights and Privacy Policy */}
        <div className="max-w-[1420px] mx-auto   pt-6  text-center copyrights w-full">
          <p className="text-neutral-500 text-[12px] font-libre">
            Copyright <span>{year}</span>. Digital Latte -{" "}
            <Link
              href="/"
              className="hover:text-[#e07f2a] text-[#181414] font-medium transition-colors duration-300"
            >
              Best Digital Agency Mumbai, India
            </Link>
            . All rights are reserved.{" "}
            <Link
              href="/privacy-policy"
              className="hover:text-[#e07f2a] text-neutral-500 font-medium ml-1 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
