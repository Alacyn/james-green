import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const EMPTY = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  interest: "",
  message: "",
};

const INTERESTS = ["Buying", "Selling", "Buying & Selling", "Relocation", "Other"];

export default function ConnectForm() {
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.post(`${API}/connect`, { ...form, consent });
      toast.success("Thank you — James will be in touch shortly.");
      setForm(EMPTY);
      setConsent(false);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section data-testid="career-connect-form" id="connect" className="bg-coal">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-20 lg:px-16 lg:py-40">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow light>Connect</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.02] sm:text-5xl">
              Begin a <span className="italic text-bronze-light">Conversation</span>
            </h2>
            <span className="mt-9 block h-px w-24 bg-bronze-light" />
            <p className="mt-9 text-lg font-light leading-relaxed text-white/70 sm:text-xl">
              Tell James a little about your goals — buying, selling, or relocating in
              the Dallas-Fort Worth area — and he will personally follow up to talk
              through your next steps.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 space-y-2">
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/40">
                Prefer to reach out directly?
              </p>
              <a
                data-testid="connect-phone-link"
                href="tel:9728768030"
                className="block font-serif text-3xl font-light text-white transition-colors duration-300 hover:text-bronze-light sm:text-4xl"
              >
                972.876.8030
              </a>
              <a
                data-testid="connect-email-link"
                href="mailto:JamesAGreen@eXpRealty.com"
                className="block text-sm font-light text-white/60 transition-colors duration-300 hover:text-bronze-light"
              >
                JamesAGreen@eXpRealty.com
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1} y={50}>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <label htmlFor="connect-firstName" className="sr-only">First Name</label>
                <input
                  id="connect-firstName"
                  data-testid="input-first-name"
                  type="text"
                  required
                  placeholder="First Name *"
                  value={form.firstName}
                  onChange={set("firstName")}
                  className="lux-input"
                />
              </div>
              <div>
                <label htmlFor="connect-lastName" className="sr-only">Last Name</label>
                <input
                  id="connect-lastName"
                  data-testid="input-last-name"
                  type="text"
                  required
                  placeholder="Last Name *"
                  value={form.lastName}
                  onChange={set("lastName")}
                  className="lux-input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="connect-email" className="sr-only">Email</label>
                <input
                  id="connect-email"
                  data-testid="input-email"
                  type="email"
                  required
                  placeholder="Email *"
                  value={form.email}
                  onChange={set("email")}
                  className="lux-input"
                />
              </div>
              <div>
                <label htmlFor="connect-phone" className="sr-only">Phone</label>
                <input
                  id="connect-phone"
                  data-testid="input-phone"
                  type="tel"
                  required
                  placeholder="Phone *"
                  value={form.phone}
                  onChange={set("phone")}
                  className="lux-input"
                />
              </div>
              <div>
                <label htmlFor="connect-interest" className="sr-only">I'm interested in</label>
                <select
                  id="connect-interest"
                  data-testid="input-interest"
                  required
                  value={form.interest}
                  onChange={set("interest")}
                  className="lux-input cursor-pointer"
                >
                  <option value="" disabled className="bg-coal text-white/50">
                    I&rsquo;m interested in...
                  </option>
                  {INTERESTS.map((o) => (
                    <option key={o} value={o} className="bg-coal text-white">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="connect-message" className="sr-only">Message</label>
                <textarea
                  id="connect-message"
                  data-testid="input-message"
                  rows={3}
                  placeholder="Message"
                  value={form.message}
                  onChange={set("message")}
                  className="lux-input resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label data-testid="consent-checkbox-label" className="flex cursor-pointer items-start gap-3 text-left">
                  <input
                    data-testid="consent-checkbox"
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 cursor-pointer appearance-none border border-white/40 bg-transparent transition-colors checked:border-bronze-light checked:bg-bronze-light"
                  />
                  <span className="text-xs font-light leading-relaxed text-white/50">
                    I agree to be contacted by James Green via call, email, and text
                    for real estate services. To opt out, you can reply
                    &lsquo;stop&rsquo; at any time or reply &lsquo;help&rsquo; for
                    assistance. Message and data rates may apply. Message frequency may
                    vary.
                  </span>
                </label>
              </div>

              <div className="sm:col-span-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  data-testid="submit-connect-form"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 bg-[#F1E6D7] px-10 py-4 font-sans text-xs uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-bronze-light disabled:opacity-60 sm:w-auto"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Sending" : "Begin a Conversation"}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
