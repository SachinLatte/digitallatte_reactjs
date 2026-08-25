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

const WORDS = ["Digital", "Strategy", "Business", "Creative", "Ideas"];

export default function ContactSection({ title, subtitle, theme = "dark" }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
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

  // Text changing typing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
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
    <section
      id="say_hello"
      className="w-full bg-[#16110f] text-white py-20 md:py-28 w992:py-15 w769:py-10 w501:py-5 px-24 w1101:px-13 w501:px-5"
    >
      <div className="max-w-[1700px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 w1281:gap-5">
          {/* Left Box */}
          <div className="flex flex-col justify-start w-full">
            <h4 className="font-libre text-white lg:text-[75px] w1470:text-[60px] font-black capitalize tracking-[2px] leading-[102px] w1536:leading-[80px] mb-8 text-left">
              Let&apos;s Talk <br />
              <span
                className={`text-white transition-opacity duration-300 block ${visible ? "opacity-100" : "opacity-0"}`}
              >
                {WORDS[wordIndex]}
              </span>
            </h4>

            <h5 className="text-white text-[20px] w1367:text-[18px] font-normal tracking-[1px] mb-10 text-left">
              Let&apos;s discuss your project at{" "}
              <a
                href="mailto:ideas@digitallatte.in"
                className="text-[#ff9000] hover:underline font-semibold transition-colors duration-300"
              >
                ideas@digitallatte.in
              </a>
            </h5>

            <ul className="flex items-center space-x-2" style={{ "--hover-cup": `url('${basePath}/img/hover-cup.png')` }}>
              <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                <a
                  href="https://www.facebook.com/AgencyDigitalLatte"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                <a
                  href="https://twitter.com/Digitallatte"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter"
                  className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                >
                  <FaTwitter />
                </a>
              </li>
              <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                <a
                  href="https://www.linkedin.com/company/digital-latte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="group inline-flex items-center justify-center m-0 w-[62px] h-[62px] transition-all duration-300 ease-in-out hover:bg-[image:var(--hover-cup)] hover:bg-contain hover:bg-center hover:bg-no-repeat">
                <a
                  href="https://www.instagram.com/digitallatte/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="flex items-center justify-center w-[54px] h-[54px] rounded-full text-[#675b57] text-[26px] transition-all duration-300 ease-in-out group-hover:text-[#ff9000]"
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
                    href="/digital-marketing-blog"
                    className="text-[#ff9000] underline font-medium hover:text-[#e07f2a] transition-colors duration-300"
                  >
                    blog.
                  </Link>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="text-left w-full pl-8 pr-2 py-4 md:pb-8 md:pl-12 w991:pl-6 md:pr-0 relative">
                  {/* Name Field */}
                  <div className="relative mb-10">
                    <label
                      htmlFor="name-input"
                      className="absolute -left-6 top-5 text-white"
                    >
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
                      className="w-full bg-transparent border-b border-white text-[#ff9000] placeholder-[#ff9000] placeholder-opacity-100 text-[16px] w1367:text-[15px] pt-[15px] pb-[6px] px-0 mt-[2px] outline-none focus:outline-none font-sans"
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
                    <div className="relative mb-10">
                      <label
                        htmlFor="contact-input"
                        className="absolute -left-6 top-5 text-white"
                      >
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
                        className="w-full bg-transparent  border-b border-white text-[#ff9000] placeholder-[#ff9000] placeholder-opacity-100 text-[16px] w1367:text-[15px] pt-[15px] pb-[6px] px-0 mt-[2px] outline-none focus:outline-none font-sans"
                      />
                      {errors.contact && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.contact}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative mb-10">
                      <label
                        htmlFor="email-input"
                        className="absolute -left-6 top-5 text-white"
                      >
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
                        className="w-full bg-transparent border-b border-white text-[#ff9000] placeholder-[#ff9000] placeholder-opacity-100 text-base pt-[15px] pb-[6px] px-0 mt-[2px] outline-none focus:outline-none font-sans"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative mb-10">
                    <label
                      htmlFor="message-input"
                      className="absolute -left-6 top-5 text-white"
                    >
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
                      className="w-full bg-transparent  border-b border-white text-[#ff9000] placeholder-[#ff9000] placeholder-opacity-100 text-base pt-[15px] pb-[6px] px-0 mt-[2px] outline-none focus:outline-none font-sans"
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Section */}
                  <div className="send-button text-right w992:text-left mt-6">
                    <input
                      type="submit"
                      value="Send Message"
                      className="cursor-pointer font-sans py-2.5 px-[30px] text-[#16110f] text-[15px] border-none outline-none focus:outline-none uppercase tracking-[1px] bg-white transition-all duration-300 rounded-[35px] font-bold hover:bg-[#e07f2a] hover:text-white"
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
