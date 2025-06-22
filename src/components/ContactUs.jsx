import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Footer from "./Footer";

const ContactUs = () => {
  document.title = "SCSDB | Contact Us";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // Replace this with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  return (
    <div className="w-full h-full">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between mb-10">
        <Link></Link>
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>{" "}
          Contact Us
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
        </div>
      </div>

      {/* Contact Content */}
      <div className="w-full max-w-4xl mx-auto px-5">
        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-zinc-300 mb-6">Get in Touch</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            Welcome to SCSDB - your ultimate destination for movies and TV shows database. 
            We're powered by The Movie Database (TMDB) API to bring you the most comprehensive 
            and up-to-date entertainment information.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-zinc-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-zinc-300 mb-6">Send us a Message</h3>
            
            {submitStatus === "success" && (
              <div className="bg-green-600 text-white p-3 rounded mb-6">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="bg-red-600 text-white p-3 rounded mb-6">
                Something went wrong. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-zinc-400 mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 
                           focus:outline-none focus:border-[#6556CD] focus:ring-1 focus:ring-[#6556CD] 
                           transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-zinc-400 mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 
                           focus:outline-none focus:border-[#6556CD] focus:ring-1 focus:ring-[#6556CD] 
                           transition-colors"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-zinc-400 mb-2 font-medium">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 
                           focus:outline-none focus:border-[#6556CD] focus:ring-1 focus:ring-[#6556CD] 
                           transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature">Feature Request</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-zinc-400 mb-2 font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-300 
                           focus:outline-none focus:border-[#6556CD] focus:ring-1 focus:ring-[#6556CD] 
                           transition-colors resize-vertical"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6556CD] hover:bg-[#5a4bb8] text-white font-semibold py-3 px-6 
                         rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* About TMDB */}
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-zinc-300 mb-4 flex items-center">
                <i className="ri-movie-line text-[#6556CD] mr-3"></i>
                About Our Data
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                All movie and TV show data is provided by The Movie Database (TMDB), 
                a community-driven database that's been the go-to source for entertainment 
                metadata since 2008.
              </p>
            </div>

            {/* Quick Links */}
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-zinc-300 mb-4 flex items-center">
                <i className="ri-links-line text-[#6556CD] mr-3"></i>
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 hover:text-[#6556CD] transition-colors"
                >
                  <i className="ri-external-link-line mr-2"></i>
                  The Movie Database (TMDB)
                </a>
                <a
                  href="https://www.themoviedb.org/documentation/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-zinc-400 hover:text-[#6556CD] transition-colors"
                >
                  <i className="ri-code-line mr-2"></i>
                  TMDB API Documentation
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-zinc-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-zinc-300 mb-4 flex items-center">
                <i className="ri-question-line text-[#6556CD] mr-3"></i>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-zinc-300 font-medium mb-1">How often is the data updated?</h4>
                  <p className="text-zinc-400 text-sm">
                    Our database is updated daily with the latest information from TMDB.
                  </p>
                </div>
                <div>
                  <h4 className="text-zinc-300 font-medium mb-1">Can I request a specific movie or show?</h4>
                  <p className="text-zinc-400 text-sm">
                    All content comes from TMDB. You can contribute to TMDB to add missing content.
                  </p>
                </div>
                <div>
                  <h4 className="text-zinc-300 font-medium mb-1">Is SCSDB free to use?</h4>
                  <p className="text-zinc-400 text-sm">
                    Yes! SCSDB is completely free to use for all movie and TV show enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-zinc-500 text-sm">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default ContactUs;