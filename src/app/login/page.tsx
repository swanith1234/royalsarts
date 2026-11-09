'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyRound, Mail, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useCart();

  const [identifier, setIdentifier] = useState('swanith@example.com');
  const [step, setStep] = useState<'input' | 'otp' | 'success'>('input');
  const [otp, setOtp] = useState(['5', '8', '2', '4', '', '']);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      showToast(`One-time security access code sent to ${identifier}`);
    }, 600);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      showToast('Authenticated as Royal Art Private Collector.');
      setTimeout(() => {
        router.push('/artworks');
      }, 1500);
    }, 700);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow pt-24 sm:pt-32 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-[#C6A15B]/30 p-8 sm:p-10 rounded-xs shadow-lg relative">
          {/* Logo Badge at Top */}
          <div className="text-center mb-8">
            <div className="w-16 h-20 relative mx-auto mb-3">
              <Image
                src="/assets/royal-art-logo.png"
                alt="Royal Art"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#25251F] font-normal">
              Collector Portal
            </h1>
            <p className="text-xs text-[#25251F]/60 uppercase tracking-widest font-sans mt-1">
              Private Art Acquisition & Provenance Registry
            </p>
          </div>

          {step === 'input' && (
            <form onSubmit={handleSendOTP} className="space-y-5 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#25251F]/70 mb-2 font-medium">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your registered email or phone"
                    className="w-full pl-9 pr-3.5 py-3 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs text-[#25251F] text-xs focus:outline-none focus:border-[#073B2E]"
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#25251F]/60">
                <Shield size={14} className="text-[#C6A15B] flex-shrink-0" />
                <span>Passwordless authentication via 6-digit cryptographic OTP.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 rounded-xs shadow-md transition-all duration-300"
              >
                {loading ? (
                  <span>Generating Code...</span>
                ) : (
                  <>
                    <span>Request Access Code</span>
                    <ArrowRight size={14} className="text-[#C6A15B]" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#25251F]/60">
                  New collector? Accessing your first acquisition automatically registers your private vault.
                </p>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleVerifyOTP} className="space-y-6 text-xs animate-fade-in">
              <div className="text-center">
                <p className="text-xs text-[#25251F]/70">
                  Enter the verification code dispatched to:
                </p>
                <p className="font-semibold text-[#073B2E] mt-0.5">{identifier}</p>
              </div>

              {/* 6 Digit OTP Input Grid */}
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center font-serif text-xl border border-[#C6A15B]/40 bg-[#F6F0E4]/40 rounded-xs focus:outline-none focus:border-[#073B2E] text-[#073B2E]"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.15em] font-bold rounded-xs shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <KeyRound size={15} />
                    <span>Verify & Enter Gallery</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#25251F]/60 pt-2 border-t border-[#C6A15B]/20">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="hover:text-[#073B2E] underline"
                >
                  Change identifier
                </button>
                <button
                  type="button"
                  onClick={() => showToast('New access code generated and resent.')}
                  className="hover:text-[#C6A15B]"
                >
                  Resend code (0:45)
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-6 space-y-4 animate-scale-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-serif text-2xl text-[#25251F]">
                Welcome Back, Collector
              </h2>
              <p className="text-xs text-[#25251F]/70">
                Redirecting to your curated private salon...
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
