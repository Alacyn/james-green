import { useState } from "react";
import axios from "axios";
import { ArrowRight, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Reveal, EASE } from "@/components/Reveal";
import { motion } from "framer-motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = ["Buying", "Selling", "New Construction", "Relocating", "Investing"];

const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const inputCls =
  "w-full border-b bg-transparent py-2.5 text-base font-light text-[#F1E6D7] placeholder-white/35 outline-none transition-colors duration-300 focus:border-bronze-light";
const inputTone = (hasError) => (hasError ? " border-red-300/70" : " border-white/30");

const labelCls = "block font-sans text-[10px] uppercase tracking-[0.32em] text-bronze-light";
const errorCls = "mt-1.5 text-[11px] font-light text-red-300";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", consent: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) next.phone = "Please enter a valid phone number.";
    if (!EMAIL_RE.test(form.email.trim())) next.email = "Please enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please check the highlighted fields.");
      return;
    }
    if (!form.consent) {
      toast.error("Please agree to be contacted so James can reach out.");
      return;
    }
    setSubmitting(true);
    try {
      const [first, ...rest] = form.name.trim().split(/\s+/);
      await axios.post(`${API}/connect`, {
        firstName: first,
        lastName: rest.join(" "),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dreNumber: "",
        message: "",
        interests: form.interest ? [form.interest] : [],
        consent: true,
        source: "contact page",
      });
      toast.success("Thank you — James will connect with you personally.");
      setForm({ name: "", phone: "", email: "", interest: "", consent: false });
      setErrors({});
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="min-h-screen bg-[#221810] font-sans text-[#F1E6D7] antialiased">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-36 sm:pt-44">
        <Reveal y={24}>
          <p className="text-center font-sans text-[10px] uppercase tracking-[0.42em] text-bronze-light sm:text-xs">
            Private Inquiry
          </p>
          <h1 className="mt-6 text-center font-sans text-3xl font-light uppercase tracking-[0.25em] sm:text-5xl">
            Let&rsquo;s Plan Your Move.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-center text-sm font-light leading-relaxed text-white/70 sm:text-base">
            For those considering a purchase, a sale, or a private real estate
            opportunity &mdash; connect with James for thoughtful guidance and
            discerning representation across Dallas&ndash;Fort Worth.
          </p>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
        >
          <form data-testid="contact-form" onSubmit={submit} className="mt-16" noValidate>
            <div className="space-y-9">
              <div>
                <label htmlFor="contact-name" className={labelCls}>
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  data-testid="contact-name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  aria-invalid={!!errors.name}
                  className={inputCls + inputTone(errors.name)}
                />
                {errors.name && <p className={errorCls}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelCls}>
                  Phone *
                </label>
                <input
                  id="contact-phone"
                  data-testid="contact-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  aria-invalid={!!errors.phone}
                  className={inputCls + inputTone(errors.phone)}
                />
                {errors.phone && <p className={errorCls}>{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="contact-email" className={labelCls}>
                  Email *
                </label>
                <input
                  id="contact-email"
                  data-testid="contact-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  aria-invalid={!!errors.email}
                  className={inputCls + inputTone(errors.email)}
                />
                {errors.email && <p className={errorCls}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="contact-interest" className={labelCls}>
                  Interested In
                </label>
                <div className="relative">
                  <select
                    id="contact-interest"
                    data-testid="contact-interest"
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className={`${inputCls} cursor-pointer appearance-none pr-8`}
                  >
                    <option value="" className="bg-[#221810]">
                      Select one
                    </option>
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#221810]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                  />
                </div>
              </div>
            </div>

            <label className="mt-10 flex cursor-pointer items-start gap-2.5">
              <input
                data-testid="contact-consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
              />
              <span className="text-[11px] font-light leading-snug text-white/55">
                I agree to be contacted by James Green via call, email and text for
                real estate services. To opt out, reply &ldquo;stop&rdquo; at any time.
                Message and data rates may apply.
              </span>
            </label>

            <button
              data-testid="contact-submit"
              type="submit"
              disabled={submitting}
              className="group mt-9 flex w-full items-center justify-center gap-3 bg-[#F1E6D7] py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-white disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Begin the Conversation"}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
        >
          <div className="mt-20">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#F1E6D7]">James Green</p>
            <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-bronze-light">
              Global Real Estate Advisor
            </p>
            <div className="mt-6 space-y-1 text-xs font-light text-white/60">
              <p>
                <a
                  data-testid="contact-email-link"
                  href="mailto:JamesAGreen@eXpRealty.com"
                  className="transition-colors duration-300 hover:text-white"
                >
                  JamesAGreen@eXpRealty.com
                </a>
              </p>
              <p>
                <a
                  data-testid="contact-phone-link"
                  href="tel:9728768030"
                  className="transition-colors duration-300 hover:text-white"
                >
                  972.876.8030
                </a>
              </p>
            </div>
            <p className="mx-auto mt-10 max-w-xl text-[10px] font-light leading-relaxed text-white/40">
              All information is deemed reliable but not guaranteed and should be
              independently reviewed and verified. Equal Housing Opportunity.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
