'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShieldCheck, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/utils';
import { artworks } from '@/data/artworks';

export default function CartAndCheckoutPage() {
  const { cart, removeFromCart, subtotal, clearCart, showToast, addToCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State for Checkout Details
  const [formData, setFormData] = useState({
    fullName: 'Swanith Kumar',
    phone: '+91 98765 43210',
    email: 'swanith@example.com',
    address: 'H.No. 4-151, Prasadam Padu, NH-5',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    pincode: '520007',
    notes: 'Please arrange white-glove art handling delivery with wooden crate.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'upi' | 'card'>('bank');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRefNumber, setOrderRefNumber] = useState('');

  // If cart is empty on first mount, populate with reference default items
  // (Royal Serenity + The Conversation as seen in the client mockup)
  useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      const item1 = artworks.find((a) => a.slug === 'royal-serenity');
      const item2 = artworks.find((a) => a.slug === 'the-conversation');
      if (item1) addToCart(item1);
      if (item2) addToCart(item2);
    }
  }, [cart.length, orderComplete, addToCart]);

  const shippingCost = step >= 2 ? 2000 : 0;
  const grandTotal = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `RA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRefNumber(ref);
    setOrderComplete(true);
    clearCart();
    showToast('Your art acquisition reservation has been secured.');
  };

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex flex-col">
      <Navbar isHeroBelowVariant={false} />

      <main className="flex-grow pt-24 sm:pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-center mb-10">
            <div className="flex items-center space-x-4 sm:space-x-8 text-xs font-sans uppercase tracking-widest">
              {/* Step 1: Cart */}
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 ${
                  step === 1 ? 'text-[#073B2E] font-semibold' : 'text-[#25251F]/60'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 1
                      ? 'bg-[#C6A15B] text-[#05291F] font-bold'
                      : 'border border-[#C6A15B]/50 text-[#073B2E]'
                  }`}
                >
                  1
                </span>
                <span>Cart</span>
              </button>

              <span className="text-[#C6A15B]/40">——</span>

              {/* Step 2: Delivery Details */}
              <button
                onClick={() => {
                  if (cart.length > 0) setStep(2);
                }}
                className={`flex items-center gap-2 ${
                  step === 2 ? 'text-[#073B2E] font-semibold' : 'text-[#25251F]/60'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 2
                      ? 'bg-[#C6A15B] text-[#05291F] font-bold'
                      : 'border border-[#C6A15B]/50 text-[#25251F]/60'
                  }`}
                >
                  2
                </span>
                <span>Details</span>
              </button>

              <span className="text-[#C6A15B]/40">——</span>

              {/* Step 3: Payment */}
              <button
                onClick={() => {
                  if (cart.length > 0) setStep(3);
                }}
                className={`flex items-center gap-2 ${
                  step === 3 ? 'text-[#073B2E] font-semibold' : 'text-[#25251F]/60'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step === 3
                      ? 'bg-[#C6A15B] text-[#05291F] font-bold'
                      : 'border border-[#C6A15B]/50 text-[#25251F]/60'
                  }`}
                >
                  3
                </span>
                <span>Payment</span>
              </button>
            </div>
          </div>

          {/* ORDER SUCCESS SCREEN */}
          {orderComplete ? (
            <div className="bg-white border border-[#C6A15B] p-8 sm:p-14 rounded-xs text-center max-w-2xl mx-auto shadow-lg space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-[#073B2E]/10 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C6A15B] font-medium block mb-2">
                  CONGRATULATIONS
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#25251F] font-normal">
                  Your Art Acquisition is Confirmed
                </h1>
                <p className="text-xs text-[#25251F]/70 font-mono mt-2">
                  Acquisition Dossier: #{orderRefNumber}
                </p>
              </div>

              <div className="p-4 bg-[#F6F0E4]/60 border border-[#C6A15B]/20 rounded-xs text-left text-xs text-[#25251F]/80 space-y-2">
                <p>
                  <strong>Recipient:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
                <p>
                  <strong>Authentication:</strong> Signed physical Certificate of Authenticity is packaged alongside the artwork in museum-grade timber crates.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <Link
                  href="/artworks"
                  className="px-6 py-3 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-widest font-semibold rounded-xs shadow-sm"
                >
                  Explore More Masterpieces
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 border border-[#073B2E] text-[#073B2E] text-xs uppercase tracking-widest font-semibold rounded-xs hover:bg-[#073B2E]/5"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: CART VIEW (Matches client mockup) */}
              {step === 1 && (
                <div>
                  <div className="mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl text-[#25251F] font-normal">
                      Your Cart
                    </h1>
                    <p className="text-xs text-[#25251F]/60 uppercase tracking-widest font-sans mt-1">
                      Review your selected artworks before checkout.
                    </p>
                  </div>

                  {cart.length === 0 ? (
                    <div className="bg-white border border-[#C6A15B]/20 p-12 text-center rounded-xs space-y-4 shadow-xs">
                      <p className="font-serif text-2xl text-[#25251F]">
                        Your private acquisition cart is empty.
                      </p>
                      <p className="text-xs text-[#25251F]/60 max-w-md mx-auto">
                        Discover one-of-a-kind original paintings curated from India&apos;s celebrated masters.
                      </p>
                      <Link
                        href="/artworks"
                        className="inline-block px-6 py-3 bg-[#073B2E] text-[#F6F0E4] text-xs uppercase tracking-widest rounded-xs hover:bg-[#0A4F3C]"
                      >
                        Explore Artworks
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Left: Cart Table */}
                      <div className="lg:col-span-8 bg-white border border-[#C6A15B]/20 p-6 rounded-xs shadow-xs">
                        <div className="hidden sm:grid grid-cols-12 text-[11px] uppercase tracking-wider text-[#25251F]/50 pb-3 border-b border-[#C6A15B]/20 font-medium">
                          <span className="col-span-3">Artwork</span>
                          <span className="col-span-6">Details</span>
                          <span className="col-span-3 text-right">Price</span>
                        </div>

                        <div className="divide-y divide-[#C6A15B]/15">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                            >
                              {/* Artwork Image */}
                              <div className="sm:col-span-3">
                                <Link
                                  href={`/artworks/${item.slug}`}
                                  className="relative block aspect-[4/3] w-full max-w-[140px] rounded-xs overflow-hidden border border-[#C6A15B]/20"
                                >
                                  <Image
                                    src={item.thumbnail}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                </Link>
                              </div>

                              {/* Details */}
                              <div className="sm:col-span-6 space-y-1">
                                <Link
                                  href={`/artworks/${item.slug}`}
                                  className="font-serif text-lg text-[#25251F] hover:text-[#073B2E] font-medium block"
                                >
                                  {item.title}
                                </Link>
                                <p className="text-xs text-[#25251F]/70 font-sans">
                                  By {item.artistName}
                                </p>
                                <p className="text-[11px] text-[#25251F]/50 font-light">
                                  {item.medium} • {item.dimensions}
                                </p>
                                <span className="inline-block text-[10px] text-[#C6A15B] uppercase tracking-wider font-medium">
                                  Original Piece (Qty: 1)
                                </span>
                              </div>

                              {/* Price & Delete */}
                              <div className="sm:col-span-3 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                                <span className="font-serif text-base font-semibold text-[#073B2E]">
                                  {item.priceDisplay}
                                </span>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  aria-label={`Remove ${item.title}`}
                                  className="text-[#25251F]/40 hover:text-red-700 transition-colors p-1"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-[#C6A15B]/20">
                          <Link
                            href="/artworks"
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#073B2E] hover:text-[#C6A15B] font-medium"
                          >
                            <span>Continue Shopping</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>

                      {/* Right: Order Summary */}
                      <div className="lg:col-span-4 bg-white border border-[#C6A15B]/20 p-6 rounded-xs shadow-xs h-fit space-y-6">
                        <h2 className="font-serif text-xl text-[#25251F] font-medium pb-3 border-b border-[#C6A15B]/20">
                          Order Summary
                        </h2>

                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between text-[#25251F]/80">
                            <span>Subtotal ({cart.length} items)</span>
                            <span className="font-serif text-sm font-semibold text-[#25251F]">
                              {formatINR(subtotal)}
                            </span>
                          </div>

                          <div className="flex justify-between text-[#25251F]/80">
                            <span>Shipping</span>
                            <span className="text-[#25251F]/50 italic">
                              To be calculated
                            </span>
                          </div>

                          <div className="pt-3 border-t border-[#C6A15B]/20 flex justify-between items-baseline">
                            <span className="font-serif text-base font-medium text-[#25251F]">
                              Total
                            </span>
                            <span className="font-serif text-2xl font-bold text-[#073B2E]">
                              {formatINR(subtotal)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setStep(2)}
                          className="w-full py-4 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-sm shadow-md"
                        >
                          <span>Proceed to Checkout</span>
                          <ArrowRight size={15} className="text-[#C6A15B]" />
                        </button>

                        <div className="flex items-center gap-2 text-[11px] text-[#25251F]/60 justify-center">
                          <Lock size={12} className="text-[#C6A15B]" />
                          <span>Encrypted Museum Escrow Guarantee</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: DELIVERY DETAILS (Matches client mockup) */}
              {step === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: 1. Delivery Details Form */}
                  <div className="lg:col-span-8 bg-white border border-[#C6A15B]/20 p-6 sm:p-8 rounded-xs shadow-xs space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
                      <h2 className="font-serif text-2xl text-[#25251F] font-normal">
                        1. Delivery Details
                      </h2>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-[#073B2E] flex items-center gap-1 hover:text-[#C6A15B]"
                      >
                        <ArrowLeft size={13} />
                        <span>Back to Cart</span>
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setStep(3);
                      }}
                      className="space-y-4 text-xs"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                            Full Name *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.fullName}
                            onChange={(e) =>
                              setFormData({ ...formData, fullName: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                          />
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                            Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                        />
                      </div>

                      <div>
                        <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                          Address *
                        </label>
                        <input
                          required
                          type="text"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                            City *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                          />
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                            State *
                          </label>
                          <select
                            value={formData.state}
                            onChange={(e) =>
                              setFormData({ ...formData, state: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                          >
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Telangana">Telangana</option>
                          </select>
                        </div>

                        <div>
                          <label className="block uppercase tracking-wider text-[#25251F]/70 mb-1 font-medium">
                            Pincode *
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.pincode}
                            onChange={(e) =>
                              setFormData({ ...formData, pincode: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#F6F0E4]/40 border border-[#C6A15B]/30 rounded-xs focus:outline-none focus:border-[#073B2E]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#073B2E] hover:bg-[#0A4F3C] text-[#F6F0E4] text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 rounded-sm shadow-md mt-6"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight size={15} className="text-[#C6A15B]" />
                      </button>
                    </form>
                  </div>

                  {/* Right: 2. Order Summary */}
                  <div className="lg:col-span-4 bg-white border border-[#C6A15B]/20 p-6 rounded-xs shadow-xs h-fit space-y-6">
                    <h2 className="font-serif text-xl text-[#25251F] font-medium pb-3 border-b border-[#C6A15B]/20">
                      2. Order Summary
                    </h2>

                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="w-14 h-14 relative rounded-xs overflow-hidden border border-[#C6A15B]/20 flex-shrink-0">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <p className="font-serif text-sm font-medium text-[#25251F] truncate">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-[#25251F]/60">
                              {item.medium}
                            </p>
                          </div>
                          <span className="font-serif text-xs font-semibold text-[#073B2E]">
                            {item.priceDisplay}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-[#C6A15B]/20 text-xs">
                      <div className="flex justify-between text-[#25251F]/80">
                        <span>Subtotal</span>
                        <span className="font-serif">{formatINR(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[#25251F]/80">
                        <span>Insured Art Courier</span>
                        <span className="font-serif">₹2,000</span>
                      </div>
                      <div className="pt-2 border-t border-[#C6A15B]/20 flex justify-between font-serif text-base font-bold text-[#073B2E]">
                        <span>Total</span>
                        <span>{formatINR(grandTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {step === 3 && (
                <div className="max-w-2xl mx-auto bg-white border border-[#C6A15B]/25 p-8 rounded-xs shadow-xs space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
                    <h2 className="font-serif text-2xl text-[#25251F] font-normal">
                      3. Select Payment Method
                    </h2>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-[#073B2E] flex items-center gap-1 hover:text-[#C6A15B]"
                    >
                      <ArrowLeft size={13} />
                      <span>Back to Details</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-4 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                        paymentMethod === 'bank'
                          ? 'border-[#073B2E] bg-[#073B2E]/5'
                          : 'border-[#C6A15B]/20 hover:border-[#C6A15B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'bank'}
                          onChange={() => setPaymentMethod('bank')}
                          className="accent-[#073B2E]"
                        />
                        <div>
                          <p className="font-serif text-sm font-medium text-[#25251F]">
                            Direct Bank Wire / RTGS (Recommended for High Value Art)
                          </p>
                          <p className="text-[11px] text-[#25251F]/60">
                            Receive official escrow bank credentials for wire transfer.
                          </p>
                        </div>
                      </div>
                    </label>

                    <label
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                        paymentMethod === 'upi'
                          ? 'border-[#073B2E] bg-[#073B2E]/5'
                          : 'border-[#C6A15B]/20 hover:border-[#C6A15B]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="pay"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="accent-[#073B2E]"
                        />
                        <div>
                          <p className="font-serif text-sm font-medium text-[#25251F]">
                            UPI / QR Code Transfer
                          </p>
                          <p className="text-[11px] text-[#25251F]/60">
                            Instant verification via BHIM, Google Pay, or PhonePe.
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 bg-[#F6F0E4]/60 border border-[#C6A15B]/20 rounded-xs flex items-center justify-between text-xs">
                    <span>Total Amount Payable:</span>
                    <span className="font-serif text-xl font-bold text-[#073B2E]">
                      {formatINR(grandTotal)}
                    </span>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full py-4 bg-[#C6A15B] hover:bg-[#D9BD7A] text-[#05291F] text-xs uppercase tracking-[0.15em] font-bold rounded-sm shadow-md transition-all duration-300"
                  >
                    Place Acquisition Reservation Order
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
