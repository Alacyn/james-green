import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { ArrowRight, X } from "lucide-react";
import { toast } from "sonner";
import { EASE } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const inputCls =
  "w-full border-b border-white/30 bg-transparent py-2 text-sm font-light text-[#F1E6D7] placeholder-white/40 outline-none transition-colors duration-300 focus:border-bronze-light";

export default function ExclusiveAccess() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", consent: false });

  useEffect(() => {
    if (sessionStorage.getItem("exclusive-access-dismissed")) return;
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    sessionStorage.setItem("exclusive-access-dismissed", "1");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

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
        consent: true,
      });
      toast.success("Thank you — James will connect with you personally.");
      close();
      setForm({ name: "", phone: "", email: "", consent: false });
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="exclusive-access-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-md overflow-y-auto border border-white/10 bg-[#221810] p-8 text-center sm:p-10"
          >
            <button
              data-testid="popup-close"
              onClick={close}
              aria-label="Close popup"
              className="absolute right-4 top-4 text-white/60 transition-colors duration-300 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-sans text-[10px] uppercase tracking-[0.42em] text-bronze-light">
              Private Inquiry
            </p>
            <h2 className="mt-4 font-sans text-xl font-light uppercase tracking-[0.25em] text-[#F1E6D7] sm:text-2xl">
              Begin Your Next Move
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/65">
              Buying, selling, building, or relocating? Begin with a conversation.
            </p>

            <form onSubmit={submit} className="mt-8 space-y-6 text-left">
              <input
                data-testid="popup-name"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
              <input
                data-testid="popup-phone"
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputCls}
              />
              <input
                data-testid="popup-email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
              />
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  data-testid="popup-consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-bronze"
                />
                <span className="text-[11px] font-light leading-relaxed text-white/55">
                  I agree to be contacted by James Green via call, email and text for
                  real estate services. To opt out, reply &ldquo;stop&rdquo; at any
                  time. Message and data rates may apply.
                </span>
              </label>
              <button
                data-testid="popup-submit"
                type="submit"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-3 bg-[#F1E6D7] py-4 font-sans text-[11px] uppercase tracking-[0.3em] text-ink transition-all duration-500 hover:bg-white disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Connect with James"}
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
