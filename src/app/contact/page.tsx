'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { useCart } from '@/context/CartContext';

export default function ContactPage() {
  const { showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Private Viewing',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Thank you. A senior curator will contact you within 24 hours.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow">
        <PageHero
          title="Get in Touch"
          subtitle="Our curatorial team and client advisors are available for private consultations, artwork enquiries, and artist submissions."
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact Us' },
          ]}
        />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Channels & Advisory (approx 5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-[11px] tracking-[0.25em] text-[#C6A15B] uppercase font-sans font-medium block mb-2">
                  CURATORIAL ADVISORY
                </span>
                <h2 className="font-serif text-3xl text-[#25251F] font-normal">
                  Connect with Royal Art
                </h2>
                <p className="font-sans text-sm text-[#25251F]/75 mt-3 leading-relaxed font-light">
                  Whether you are seeking advice on initiating an art collection, requesting high-resolution condition reports, or arranging private viewings, we look forward to assisting you.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <div className="p-5 bg-white border border-[#C6A15B]/25 rounded-xs flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#25251F]">
                      Email Enquiries
                    </h4>
                    <p className="text-xs text-[#25251F]/60 mt-0.5">
                      Client Advisory: <a href="mailto:hello@royalart.com" className="text-[#073B2E] font-medium hover:underline">hello@royalart.com</a>
                    </p>
                    <p className="text-xs text-[#25251F]/60">
                      Curations: <a href="mailto:curator@royalart.com" className="text-[#073B2E] font-medium hover:underline">curator@royalart.com</a>
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#C6A15B]/25 rounded-xs flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#25251F]">
                      Direct Telephone
                    </h4>
                    <p className="text-xs text-[#25251F]/60 mt-0.5">
                      Headquarters: <a href="tel:+919876543210" className="text-[#073B2E] font-medium">+91 98765 43210</a>
                    </p>
                    <p className="text-xs text-[#25251F]/60">
                      Private Collector Desk: +91 98765 43211
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-[#C6A15B]/25 rounded-xs flex items-start gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-[#073B2E]/5 border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#25251F]">
                      Gallery Flagship
                    </h4>
                    <p className="text-xs text-[#25251F]/70 mt-0.5 leading-relaxed">
                      Royal Art Gallery Pavilion, Lavelle Road, Shanthala Nagar, Bangalore, Karnataka 560001, India
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#05291F] text-[#F6F0E4] rounded-xs border border-[#C6A15B]/30 flex items-center gap-3 text-xs">
                  <Clock size={16} className="text-[#C6A15B]" />
                  <span>Gallery Viewing Hours: Tuesday – Sunday, 11:00 AM – 7:30 PM IST</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form (approx 7 cols) */}
            <div className="lg:col-span-7 bg-white border border-[#C6A15B]/25 p-8 sm:p-12 rounded-xs shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#073B2E]/10 border border-[#C6A15B] text-[#073B2E] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} className="text-[#073B2E]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#25251F]">
                    Message Transmitted
                  </h3>
                  <p className="text-xs text-[#25251F]/70 max-w-sm mx-auto leading-relaxed font-light">
                    Thank you, {formData.name}. Your enquiry has been routed to our private curatorial team. You will receive an advisory response shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Private Viewing',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-wider rounded-xs hover:bg-[#0A4F3C]"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div>
                    <h3 className="font-serif text-2xl text-[#25251F] font-normal mb-1">
                      Curatorial Consultation Form
                    </h3>
                    <p className="text-xs text-[#25251F]/60">
                      All communications are strictly confidential.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Smt. Radhika Oberoi"
                        className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#25251F]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="collector@domain.com"
                        className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#25251F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1.5 font-medium">
                        Contact Telephone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 ..."
                        className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#25251F]"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1.5 font-medium">
                        Inquiry Nature
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#25251F]"
                      >
                        <option value="Private Viewing">Private Gallery Viewing</option>
                        <option value="Artwork Acquisition">Artwork Acquisition Query</option>
                        <option value="Custom Commission">Artist Commission Request</option>
                        <option value="Corporate Collection">Corporate Art Advisory</option>
                        <option value="Artist Representation">Artist Representation Submission</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1.5 font-medium">
                      Message & Requirements *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your specific artwork of interest, space dimensions, or curatorial requirements..."
                      className="w-full px-3.5 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#25251F]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-sm shadow-md"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Curatorial Request</span>
                        <Send size={14} className="text-[#C6A15B]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
