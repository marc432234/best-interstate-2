import OptimizedImage from "./OptimizedImage";
import { IMAGE_SIZES } from "@/lib/image-sizes";

const LOGO = "/assets/images/BEST-INTERSTATE-MOVING-AND-STORAGE_Logo-V2.png";

const movingSolutions = [
  { href: "/packing/", label: "Packing + Unpacking" },
  { href: "/temporary-storage/", label: "Temporary Storage" },
  { href: "/piano-transportation/", label: "Piano Transportation" },
  { href: "/boxes-and-moving-supplies/", label: "Boxes + Moving Supplies" },
  { href: "/broadband-services/", label: "Broadband Services" },
  { href: "/custom-crating/", label: "Custom Crating" },
  { href: "/moving-insurance/", label: "Moving Insurance" },
];

const movingServices = [
  { href: "/residential-moving/", label: "Residential Moving" },
  {
    href: "/commercial-business-moving/",
    label: "Commercial + Business Moving",
  },
  { href: "/corporate-relocation/", label: "Corporate Relocation" },
  { href: "/auto-transportation/", label: "Auto Transportation" },
  { href: "/moving-insurance/", label: "Moving Insurance" },
];

const directory = [
  { href: "/service-areas/", label: "Service Areas" },
  { href: "/moving-calculator/", label: "Moving Calculator" },
  { href: "/best-benefits/", label: "Best Benefits" },
  { href: "/reviews/", label: "Reviews" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About Us" },
  { href: "/contact/", label: "Contact Us" },
];

export default function Footer() {
  return (
    <div className="footer mt-24 sm:mt-28 md:mt-32 lg:mt-40">
      <div className="container">
        <div className="footerCtaCard relative z-20 mx-auto flex w-full flex-col items-center justify-center rounded-[10px] bg-[#0045B5] px-5 py-6 text-center sm:px-6 sm:py-8">
          <h2
            className="mb-5 text-[1.15rem] font-bold leading-tight tracking-tight sm:text-[1.35rem] md:text-[24px]"
            style={{ color: "#ffffff" }}
          >
            Did you have any question? Get your instant free quote now
          </h2>
          <a
            href="tel:8666403952"
            className="flex w-full items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-[15px] font-bold transition-colors hover:bg-gray-50 hover:text-[#003b99] sm:w-auto sm:px-6 md:text-[18px]"
            style={{ backgroundColor: "#ffffff", color: "#0045B5" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              width="20"
              height="20"
              style={{ color: "#0045B5" }}
            >
              <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
            </svg>
            Call us - 866-640-3952
          </a>
        </div>
        <div className="footerColsWrapper">
          <div className="footerCol">
            <div className="footerLogoWrapper" style={{ marginBottom: 30 }}>
              <a href="/">
                <OptimizedImage
                  src={LOGO}
                  alt="Best Interstate Moving + Storage"
                  width={240}
                  height={80}
                  sizes={IMAGE_SIZES.footerLogo}
                  style={{
                    height: 60,
                    width: "auto",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </a>
            </div>
            <div className="footerTrustBadges">
              <a
                href="https://moveadvisor.com/movers/best-interstate-moving-and-storage-6372"
                target="_blank"
                rel="noopener"
              >
                <OptimizedImage
                  src="/assets/images/footer-img1.png"
                  alt="MyMovingReviews"
                  width={109}
                  height={57}
                  sizes={IMAGE_SIZES.trustBadge}
                />
              </a>
              <a href="#!" target="_blank" rel="noopener">
                <OptimizedImage
                  src="/assets/images/footer-img2.png"
                  alt="Trustwave"
                  width={105}
                  height={52}
                  sizes={IMAGE_SIZES.trustBadge}
                />
              </a>
            </div>
            <div
              className="footerAddress"
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 14,
                lineHeight: 1.6,
                marginTop: 24,
                maxWidth: 440,
              }}
            >
              2598 E. Sunrise Blvd. Suite 2104
              <br />
              Fort Lauderdale, FL 33304
            </div>
          </div>
          <div className="footerCol">
            <h3>MOVING SOLUTIONS</h3>
            <ul>
              {movingSolutions.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footerCol">
            <h3>MOVING SERVICES</h3>
            <ul>
              {movingServices.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footerCol">
            <h3>DIRECTORY</h3>
            <ul>
              {directory.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
        <hr className="footerSeparator" />
        <div className="footerBottomLegal">
          <div className="footerDisclaimer">
            <h4>Disclaimer</h4>
            <p>
              *Disclaimer: Best Interstate Moving + Storage, is a lead generator,
              not a motor carrier or moving company. We do not own moving trucks,
              handle moves directly, or act as a carrier. Instead, we connect you
              with licensed moving companies in our network who can assist with
              your relocation needs. Our role is to provide information, offer
              quotes based on your moving details, and help you find a suitable
              carrier. We may follow up on your move and assist with any service
              or claims questions, but all moving services are provided by
              independent carriers. By submitting your contact information, you
              agree that Best Interstate Moving + Storage and its partners may
              contact you via phone, text, or automated means, including if your
              number is on a Do Not Call list. Your consent is not required to
              make a purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
