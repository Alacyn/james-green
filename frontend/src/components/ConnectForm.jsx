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
  dreNumber: "",
  totalSales: "",
};

const FIELDS = [
  { name: "firstName", placeholder: "First Name *", type: "text", required: true, testid: "input-first-name" },
  { name: "lastName", placeholder: "Last Name *", type: "text", required: true, testid: "input-last-name" },
  { name: "email", placeholder: "Email *", type: "email", required: true, testid: "input-email" },
  { name: "phone", placeholder: "Phone *", type: "tel", required: true, testid: "input-phone" },
  { name: "dreNumber", placeholder: "DRE# *", type: "text", required: true, testid: "input-dre-number" },
  { name: "totalSales", placeholder: "Total Sales", type: "text", required: false, testid: "input-total-sales" },
];

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
      toast.success("Thank you — our team will be in touch shortly.");
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
              Find Your <span className="italic text-bronze-light">Place</span>
            </h2>
            <span className="mt-9 block h-px w-24 bg-bronze-light" />
            <p className="mt-9 text-lg font-light leading-relaxed text-white/70 sm:text-xl">
              Elevate your career with a top-performing luxury real estate team in
              Southern California. Gain access to exclusive listings, cutting-edge
              marketing, and unparalleled industry support to take your business to
              the next level.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 space-y-3">
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/40">
                Prefer to call?
              </p>
              <a
                data-testid="connect-phone-link"
                href="tel:4242497162"
                className="font-serif text-3xl font-light text-white transition-colors duration-300 hover:text-bronze-light sm:text-4xl"
              >
                (424) 249-7162
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.1} y={50}>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.name} className={f.name === "email" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`connect-${f.name}`} className="sr-only">
                    {f.placeholder.replace(" *", "")}
                  </label>
                  <input
                    id={`connect-${f.name}`}
                    data-testid={f.testid}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={set(f.name)}
                    className="lux-input"
                  />
                </div>
              ))}

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
                    I agree to be contacted by Aaron Kirman Group via call, email, and
                    text for real estate services. To opt out, you can reply
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
                  {loading ? "Submitting" : "Submit"}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
