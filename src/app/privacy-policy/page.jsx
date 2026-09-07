import React from "react";
import ContactSection from "../components/common/ContactSection";

import { constructMetadata } from "@/utils/seo";

export const metadata = constructMetadata({
  title: "Digital Agency | Social Media Marketing | Privacy Policy",
  description:
    "Read the Privacy Policy for Digital Latte, a full-service creative digital marketing agency based in Mumbai, India.",
  url: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-grow flex flex-col w-full font-sans overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative w-full pt-[8%] pb-[4%] w769:py-16 w501:py-12 bg-[#ececec] text-[#16110f] select-none">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-left">
          <h1 className="text-[45px] w1601:text-[40px] w1281:text-[40px] w1025:text-[35px] w769:text-[30px] w480:text-[26px] text-[#181414] uppercase leading-[1.25] tracking-[1px] font-light">
            <strong className="font-bold">privacy</strong> policy
          </h1>
        </div>
      </section>

      {/* 2. Privacy Policy Content Section */}
      <section className="py-20 w769:py-14 w501:py-10 bg-white text-[#16110f]">
        <div className="w-[75%] w1470:w-[80%] w1281:w-[85%] w1101:w-[90%] w769:w-[92%] mx-auto text-left">
          
          {/* Section 1 */}
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#16110f] uppercase tracking-wide font-sans mb-4">
              Information We Collect
            </h2>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              We collect information that you provide us. To take advantage of certain portions of our Site (for example, to use our services or submit a job application), we may require that you furnish certain information. We collect information from you, such as your name, address, telephone number, e-mail address, when you voluntarily provide it to us.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              We may collect information passively. Information we collect from you may include aggregated information and demographic information, such as IP address, device information, screen resolution, operating system version, Internet browser, demographic data (for example your country), as well as information collected through the use of cookies and other similar technologies and by observing browser functions and the pages you access to facilitate your ongoing use of our Site.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              You may set your browser to block all cookies, including cookies associated with our Site, or to indicate when a cookie is being set by us. However, our services may not function properly if your cookies are disabled.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              We collect information about you from third parties. For example, our business partners may give us information about you. Social media platforms may also give us information about you.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light">
              We combine information. For example, we may combine information that we have collected offline with information we collect online. Or we may combine information we get from a third party with information we already have.
            </p>
          </div>

          {/* Section 2 */}
          <div className="mb-12">
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#16110f] uppercase tracking-wide font-sans mb-4">
              Our Use and Sharing of the Information
            </h2>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light">
              We may use information for the purpose for which it was provided (such as responding to your inquiries or in connection with a job application), to facilitate the use of our site, to improve our Site, for sharing with third parties (including our business partners, affiliates and third party services in connection with the Site’s operation), and for any other legal purpose.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-[24px] md:text-[28px] font-bold text-[#16110f] uppercase tracking-wide font-sans mb-4">
              Other Important Notices Regarding Our Privacy Practices
            </h2>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              The Policy does not address, and we are not responsible for, the privacy, information or other practices of any third parties, including without limitation any of our affiliates and any third party operating any site to which this Site contains a link. The inclusion of a link on the Site does not imply endorsement of the linked site by us or by our affiliates. Read other companies’ privacy policies carefully.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              <strong>Retention Period:</strong> We will retain your Personal Information for the period necessary to fulfill the purposes outlined in this Policy unless a longer retention period is required or permitted by law.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              <strong>Security:</strong> Unfortunately, no data transmission over the Internet or data storage system can be guaranteed to be 100% secure. We keep personal information as long as it is necessary or relevant for the practices described in this Policy. We also keep information as otherwise required by law.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light mb-6">
              <strong>Regarding the Use of the Site by Children:</strong> The Site is not directed to individuals under the age of thirteen (13), we do not knowingly collect information from children under 13. If you are a parent or legal guardian and think your child under 13 has given us information, you can contact us.
            </p>
            <p className="text-[#333333] text-[16px] md:text-[17px] leading-[1.85] font-libre font-light">
              <strong>Contacting Us:</strong> If you have any questions regarding this Privacy Policy, please contact us by email at{" "}
              <a
                href="mailto:ideas@digitallatte.in"
                className="text-[#ff9000] hover:underline font-medium transition-colors duration-300"
              >
                ideas@digitallatte.in
              </a>.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Global Contact Section */}
      <ContactSection />
    </main>
  );
}
