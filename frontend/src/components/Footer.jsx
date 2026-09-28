import { Instagram, Facebook, Youtube } from "lucide-react";
import { Reveal, scrollToId } from "./Reveal";

const NAV = [
  { label: "Home", href: "top" },
  { label: "About", href: "#about" },
  { label: "Buy", href: "#featured" },
  { label: "Sell", href: "#network" },
  { label: "Contact", href: "#connect" },
];

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.654 8.978 3.63 12c.024 3.022.677 5.496 2.012 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.175 1.694-3.833 1.76-1.137.053-2.246-.236-3.135-.811-1.038-.674-1.658-1.716-1.746-2.933-.085-1.198.351-2.315 1.228-3.145.849-.804 2.039-1.265 3.353-1.294 1.014-.023 1.88.059 2.572.18.131-1.091-.163-1.948-.655-2.536-.5-.593-1.258-.906-2.175-.912h-.014c-.8 0-1.89.248-2.556 1.377l-1.748-1.06c.898-1.507 2.493-2.488 4.315-2.507h.016c1.618.014 2.986.53 3.955 1.491.954.945 1.461 2.274 1.475 3.845.005.312.003.617-.003.923q.532.286.993.653c1.32 1.03 2.043 2.536 2.093 4.354.063 2.303-1.043 4.44-3.033 5.86-1.847 1.323-4.005 1.574-6.096 1.59z" />
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/jamesagreenrealestate", testid: "footer-social-instagram", icon: <Instagram className="h-4 w-4" /> },
  { label: "Facebook", href: "https://www.facebook.com/share/1DtRHJMvWu/?mibextid=wwXIfr", testid: "footer-social-facebook", icon: <Facebook className="h-4 w-4" /> },
  { label: "YouTube", href: "https://www.youtube.com/@JamesAGreenRealEstate", testid: "footer-social-youtube", icon: <Youtube className="h-4 w-4" /> },
  { label: "TikTok", href: "https://www.tiktok.com/@jamesagreenrealestate", testid: "footer-social-tiktok", icon: <TikTokIcon /> },
  { label: "Threads", href: "https://www.threads.com/@jamesagreenrealestate", testid: "footer-social-threads", icon: <ThreadsIcon /> },
];

const COMPLIANCE = [
  { label: "Texas Real Estate Commission Consumer Protection Notice", href: "https://www.trec.texas.gov/sites/default/files/pdf-forms/1-4.pdf", testid: "footer-trec-consumer-protection" },
  { label: "Texas Real Estate Commission Information About Brokerage Services", href: "https://www.trec.texas.gov/sites/default/files/pdf-forms/1-0.pdf", testid: "footer-trec-iabs" },
  { label: "TREC", href: "https://www.trec.texas.gov", testid: "footer-trec-link" },
];

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="bg-[#221810] text-[#F1E6D7]">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal y={24}>
              <p className="font-serif text-2xl uppercase tracking-[0.18em]">James Green</p>
              <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.42em] text-bronze-light">
                Global Real Estate Advisor
              </p>
              <div className="mt-7 space-y-1.5 text-sm font-light text-white/75">
                <p>
                  <a data-testid="footer-email-link" href="mailto:JamesAGreen@eXpRealty.com" className="transition-colors hover:text-bronze-light">
                    JamesAGreen@eXpRealty.com
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a data-testid="footer-phone-link" href="tel:9728768030" className="transition-colors hover:text-bronze-light">
                    972.876.8030
                  </a>
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    data-testid={s.testid}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center border border-white/30 text-white/80 transition-all duration-300 hover:border-bronze-light hover:bg-bronze-light/10 hover:text-bronze-light"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3 lg:col-start-8">
            <Reveal y={24} delay={0.1}>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light">Office</p>
              <div className="mt-6 space-y-1.5 text-sm font-light leading-relaxed text-white/75">
                <p>15950 Dallas Pkwy</p>
                <p>Suite 400</p>
                <p>Dallas, TX 75248</p>
                <p className="pt-3">eXp Realty, LLC &middot; Office: (888) 519-7431</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal y={24} delay={0.2}>
              <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-bronze-light">Compliance</p>
              <ul className="mt-6 space-y-4 text-sm font-light leading-relaxed text-white/75">
                {COMPLIANCE.map((c) => (
                  <li key={c.testid}>
                    <a
                      data-testid={c.testid}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-bronze-light"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <p className="max-w-xl text-xs font-light leading-relaxed text-white/45">
                All information is deemed reliable but not guaranteed and should be
                independently reviewed and verified. Equal Housing Opportunity.
              </p>
              <p className="text-xs font-light text-white/45">
                &copy; 2026 James Green. Dallas &middot; Fort Worth &middot; North Texas
              </p>
            </div>
            <img src="/images/exp-luxury-white.webp" alt="eXp Luxury" className="h-7 w-auto shrink-0 sm:h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
