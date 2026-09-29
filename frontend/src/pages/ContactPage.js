import { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INTERESTS = ["Buying", "Selling", "New Construction", "Relocating", "Investing"];

const inputCls =
  "w-full border-b border-white/30 bg-transparent py-2 text-sm font-light text-[#F1E6D7] placeholder-white/40 outline-none transition-colors duration-300 focus:border-bronze-light";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", consent: false });
  const [interests, setInterests] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (opt) =>
    setInterests((prev) => (prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt]));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please fill in your name, phone, and email.");
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
        message: form.message.trim(),
        interests,
        consent: true,
      });
      toast.success("Thank you — James will connect with you personally.");
      setForm({ name: "", phone: "", email: "", message: "", consent: false });
      setInterests([]);
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page" className="relative min-h-screen bg-[#221810] font-sans text-[#F1E6D7] antialiased">
      <img
        src="/images/berylline-6.jpg"
        alt=""
        aria-hidden="true"
        className="fixed inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="fixed inset-0 bg-[#16100C]/70" aria-hidden="true" />

      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center sm:pt-44">
          <Reveal y={24}>
            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-bronze-light sm:text-xs">
              Private Inquiry
            </p>
            <h1 className="mt-5 font-sans text-2xl font-light uppercase tracking-[0.3em] sm:text-4xl">
              Let&rsquo;s Plan Your Move
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm font-light leading-relaxed text-white/65 sm:text-base">
              For those considering a purchase, a sale, or a private real estate
              opportunity &mdash; connect with James for thoughtful guidance and discerning
              representation across Dallas&ndash;Fort Worth.
            </p>
          </Reveal>

          <Reveal delay={0.15} y={30}>
            <form
              data-testid="contact-form"
              onSubmit={submit}
              className="mx-auto mt-12 max-w-xl border border-white/15 bg-[#221810]/70 p-6 text-left shadow-2xl backdrop-blur-xl sm:p-8"
            >
              <div className="space-y-4">
                <input
                  data-testid="contact-name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  data-testid="contact-phone"
                  type="tel"
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                />
                <input
                  data-testid="contact-email"
                  type="email"
                  placeholder="Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputCls}
                />
              </div>

              <p className="mt-7 font-sans text-[10px] uppercase tracking-[0.3em] text-white/60">
                Interested In
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    data-testid={`contact-interest-${opt.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => toggleInterest(opt)}
                    className={`border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                      interests.includes(opt)
                        ? "border-bronze-light bg-bronze/20 text-[#F1E6D7]"
                        : "border-white/25 text-white/60 hover:border-white/50 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <textarea
                data-testid="contact-message"
                rows={3}
                placeholder="Tell James a little about what you're considering (optional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} mt-7 resize-none`}
              />

              <label className="mt-7 flex cursor-pointer items-start gap-2.5">
                <input
                  data-testid="contact-consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
                />
                <span className="text-[11px] font-light leading-snug text-white/55">
                  I agree to be contacted by James Green via call, email and text for
                  real estate services. To opt out, reply &ldquo;stop&rdquo; at any
                  time. Message and data rates may apply.
                </span>
              </label>

              <button
                data-testid="contact-submit"
                type="submit"
                disabled={submitting}
                className="group mt-8 flex w-full items-center justify-center gap-3 bg-[#F1E6D7] py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-white disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Begin the Conversation"}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16">
              <p className="font-sans text-sm uppercase tracking-[0.3em] text-[#F1E6D7]">James Green</p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.3em] text-bronze-light">
                Global Real Estate Advisor
              </p>
              <div className="mt-6 space-y-1 text-xs font-light text-white/60">
                <p>eXp Realty, LLC &middot; Office: (888) 519-7431</p>
                <p>
                  <a
                    data-testid="contact-email-link"
                    href="mailto:JamesAGreen@eXpRealty.com"
                    className="transition-colors duration-300 hover:text-white"
                  >
                    JamesAGreen@eXpRealty.com
                  </a>
                  {" "}&middot;{" "}
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
          </Reveal>
        </main>
      </div>
    </div>
  );
}
