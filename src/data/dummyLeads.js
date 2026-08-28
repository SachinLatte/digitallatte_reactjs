const VALID_SAMPLE_PDF =
  "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9NZWRpYUJveFswIDAgNjEyIDc5Ml0vQ29udGVudHMgNCAwIFIvUmVzb3VyY2VzPDw+Pj4+ZW5kb2JqCjQgMCBvYmo8PC9MZW5ndGggNTE+PnN0cmVhbQpCVAovRjEgMTIgVGYKNzIgNzIwIFRECihoZWxsbyBkaWdpdGFsIGxhdHRlIHJlc3VtZSkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNQowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTggMDAwMDAgbiAKMDAwMDAwMDA2OSAwMDAwMCBuIAowMDAwMDAwMTI2IDAwMDAwIG4gCjAwMDAwMDAyMTkgMDAwMDAgbiAKdHJhaWxlcjw8L1NpemUgNS9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjMyMQolJUVPRg==";

export const DUMMY_CONTACTS = [
  {
    _id: "lead_contact_01",
    name: "Rahul Sharma",
    email: "rahul.sharma@techcorp.in",
    contact: "9820112345",
    message:
      "Looking for complete brand identity redesign and a high-performance Next.js web application for our upcoming B2B fintech startup.",
    sourcePage: "Contact Us",
    status: "New",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_contact_02",
    name: "Priya Patel",
    email: "priya@organics.com",
    contact: "9898067890",
    message:
      "Hi Digital Latte team, We want to run a 360-degree festive influencer marketing & social media ad campaign for our organic skincare brand.",
    sourcePage: "Our Expertise / Digital Marketing",
    status: "In Progress",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_contact_03",
    name: "Ankit Verma",
    email: "ankit.v@retailhub.in",
    contact: "9711234567",
    message:
      "We need SEO technical optimization and Google Ads strategy to scale e-commerce conversions for 500+ SKU catalog.",
    sourcePage: "Contact Us",
    status: "Contacted",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_contact_04",
    name: "Sneha Kulkarni",
    email: "sneha.k@designstudio.org",
    contact: "9845011223",
    message:
      "Inquiring about UI/UX design revamping and design system creation for our iOS & Android mobile application.",
    sourcePage: "Our Expertise / Design",
    status: "Archived",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_contact_05",
    name: "Vikram Mehta",
    email: "vikram@mehtagroup.com",
    contact: "9930088776",
    message:
      "We would like to discuss video production, TVC ad films, and brand photoshoots for our luxury real estate launch in Mumbai.",
    sourcePage: "Contact Us",
    status: "New",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

export const DUMMY_CAREERS = [
  {
    _id: "lead_career_01",
    name: "Sahil Deshmukh",
    email: "sahil.deshmukh@gmail.com",
    contact: "9819023456",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    resumeName: "Sahil_Frontend_Resume.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "4+ years of professional experience building responsive Next.js web applications, complex React hooks, Tailwind CSS layouts, and GSAP micro-animations.",
    status: "Reviewed",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_career_02",
    name: "Ananya Roy",
    email: "ananya.design@gmail.com",
    contact: "9723456789",
    jobId: "2",
    jobTitle: "Lead UI / UX Designer",
    resumeName: "Ananya_UIUX_Portfolio.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Passionate about creating human-centric digital experiences, user journeys, design systems, and interactive Figma prototypes. Excited to work with Digital Latte's creative team.",
    status: "Interview Scheduled",
    createdAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_career_03",
    name: "Rohan Gupta",
    email: "rohan.growth@gmail.com",
    contact: "9890123456",
    jobId: "3",
    jobTitle: "Performance Marketing Lead",
    resumeName: "Rohan_Growth_CV.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Managed $500k+ ad spend across Meta Ads and Google Search with 4.2x ROAS average. Experienced with CRO, attribution tracking, and GA4 analytics.",
    status: "Shortlisted",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_career_04",
    name: "Pooja Nair",
    email: "pooja.nair@outlook.com",
    contact: "9822345678",
    jobId: "4",
    jobTitle: "Creative Copywriter",
    resumeName: "Pooja_Content_Resume.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Creative storytelling, punchy ad copies, social media reels scripts, and SEO blog articles for lifestyle & tech brands.",
    status: "New",
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

export const DUMMY_RESUMES = [
  {
    _id: "lead_resume_01",
    name: "Aman Deep Singh",
    email: "aman.singh@gmail.com",
    contact: "9876543210",
    jobId: "0",
    jobTitle: "General Resume Submission",
    resumeName: "Aman_Fullstack_Resume.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Looking for general opportunities in Full Stack Web Development (MERN / Next.js / Node.js). Eager to contribute to creative client campaigns.",
    status: "New",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_resume_02",
    name: "Tanvi Sawant",
    email: "tanvi.sawant@yahoo.com",
    contact: "9820099887",
    jobId: "0",
    jobTitle: "General Resume Submission",
    resumeName: "Tanvi_Account_Executive_CV.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Experienced Client Servicing & Brand Account Manager with 3 years in agency management, pitching, and client relationship handling.",
    status: "Reviewed",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_resume_03",
    name: "Karan Johar",
    email: "karan.video@gmail.com",
    contact: "9811122334",
    jobId: "0",
    jobTitle: "General Resume Submission",
    resumeName: "Karan_Video_Editor_Showreel.pdf",
    resumeData: VALID_SAMPLE_PDF,
    coverNote:
      "Video editor and motion graphics artist specializing in Premiere Pro, After Effects, and 3D product animations.",
    status: "Shortlisted",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
  },
];

export const DUMMY_COMMENTS = [
  {
    _id: "lead_comment_01",
    name: "Arjun Kapoor",
    email: "arjun.k@marketingpros.in",
    comment:
      "Great insights on the new Instagram algorithm updates! The breakdown of Reels boost options vs organic carousel reach is spot on.",
    blogSlug: "instagram-adds-boost-option-for-reels",
    blogTitle: "Instagram Adds Boost Option for Reels",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_comment_02",
    name: "Divya Ramesh",
    email: "divya@brandpulse.co",
    comment:
      "LinkedIn carousels have been giving us 3x engagement compared to single image posts lately. Thanks for sharing this helpful analysis!",
    blogSlug: "linkedin-launches-carousel-option-for-post",
    blogTitle: "LinkedIn Launches Carousel Option for Post",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "lead_comment_03",
    name: "Gaurav Sen",
    email: "gaurav.sen@techleads.io",
    comment:
      "Could you please elaborate on how programmatic ad buying differs for B2B vs D2C brands in your next blog post?",
    blogSlug: "the-dirty-dozen",
    blogTitle: "The Dirty Dozen: Marketing Strategies",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
];
