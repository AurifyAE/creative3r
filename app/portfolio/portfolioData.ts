export interface ContentItem {
  label?: string;
  text: string;
  subLabel?: string;
  subItems?: string[];
}

export interface ContentSection {
  title?: string;
  /** Single-paragraph body */
  body?: string;
  /** Multi-paragraph body — each string renders as its own <p> */
  paragraphs?: string[];
  items?: ContentItem[];
  images?: string[];
  type?: 'default' | 'logo' | 'scope' | 'bullets' | 'impact';
}

export interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  images?: string[];
  description: string;
  category: string;
  year: string;
  client?: string;
  services?: string[];
  sections?: ContentSection[];
}

export const portfolioItems: PortfolioItem[] = [

  /* ─── 1. Blue Diamond ──────────────────────────────────────── */
  {
    id: 1,
    title: 'Blue Diamond',
    image: '/assets/images/portfolio/bluediamond/blue-diamond-homepage.jpeg',
    images: [
      '/assets/images/portfolio/bluediamond/blue-diamond-homepage.jpeg',
      '/assets/images/portfolio/bluediamond/blue-diamond-all-collections.jpeg',
    ],
    description:
      'Blue Diamond Jewellery is a luxury jewellery franchise representing high-end Italian brands, offering finely crafted diamond and precious stone pieces that blend timeless elegance with modern sophistication.',
    category: 'Web Design',
    year: '2024',
    client: 'Blue Diamond',
    services: ['UI/UX Design', 'Website Development', 'SEO'],
    sections: [
      {
        title: 'The Challenge',
        paragraphs: [
          'Our challenge was to translate this premium, international identity into a seamless digital experience - creating an e-commerce website that feels as refined as the collections it represents. We focused on presenting multiple luxury brands cohesively, ensuring intuitive navigation, and balancing rich visuals with smooth performance across devices. Every detail was designed to reflect trust, sophistication, and exclusivity.',
          'The result is a sleek, elegant website that brings a curated Italian luxury jewellery experience to the digital space.',
        ],
        type: 'default',
      },
    ],
  },

  /* ─── 2. BlackMamba Real Estate ──────────────────────────── */
  {
    id: 2,
    title: 'BlackMamba Real Estate',
    image: '/assets/images/portfolio/blackmamba/blackmamba-portfolio.jpeg',
    images: [
      '/assets/images/portfolio/blackmamba/blackmamba-portfolio.jpeg',
    ],
    description:
      'Blackmamba Real Estate came to us with a bold vision - to position itself as a premium, broker-free real estate brand offering seamless access to luxury furnished residences and short-stay properties in the UAE.',
    category: 'Branding',
    year: '2024',
    client: 'BlackMamba Real Estate',
    services: ['UI/UX Design', 'Website Development', 'SMM', 'SEO', 'Branding'],
    sections: [
      {
        title: 'The Challenge',
        paragraphs: [
          'The challenge was to translate this disruptive model into a refined, high-end brand presence while building trust in a market traditionally driven by agents and intermediaries.',
          'We needed to create a cohesive identity across logo, website, social media, and SEO - one that felt elegant, minimal, and effortless, while clearly communicating a frictionless, direct-to-client experience in a highly competitive luxury real estate landscape.',
        ],
        type: 'default',
      },
      {
        title: 'About the Logo',
        body: 'The Blackmamba logo embodies luxury, precision, and exclusivity, inspired by the agility and elegance of the black mamba snake. Its sleek, minimalist design and black palette reflect sophistication and authority, symbolizing the brand\'s promise of a direct, frictionless, and elite real estate experience in the UAE.',
        images: ['/assets/images/portfolio/project-2.webp'],
        type: 'logo',
      },
    ],
  },

  /* ─── 3. Siramamba Refinery ───────────────────────────────── */
  {
    id: 3,
    title: 'Siramamba Refinery',
    image: '/assets/images/portfolio/project-3.webp',
    images: [
      '/assets/images/portfolio/project-3.webp',
      '/assets/images/portfolio/project-5.webp',
      '/assets/images/portfolio/project-7.webp',
    ],
    description:
      'Siramamba is a gold and precious metal refinery in the UAE, specialising in producing high-purity gold and metals for investment, trading, and industrial use. The brand combines precision, quality, and trust, meeting international standards.',
    category: 'Web Development',
    year: '2023',
    client: 'Siramamba Refinery',
    services: ['UI/UX Design', 'Website Development', 'SEO'],
    sections: [
      {
        title: 'The Challenge',
        body: 'We needed to create a website that reflected industrial expertise with a premium feel. Key challenges included:',
        items: [
          { text: 'Conveying complex refining processes clearly and visually.' },
          { text: 'Balancing technical precision with brand trust and elegance.' },
          { text: 'Showcasing services and certifications in a clean, accessible layout.' },
          { text: 'Ensuring a consistent, responsive experience across devices.' },
        ],
        type: 'bullets',
      },
      {
        body: 'Alongside the website, we implemented a targeted SEO strategy for 3 months period, optimizing for key industry keywords. As a result, the site now ranks on the first page for several high-value gold refining and precious metal search terms, increasing visibility among investors and B2B clients.',
        type: 'default',
      },
    ],
  },

  /* ─── 4. Promise Gold Refinery ───────────────────────────── */
  {
    id: 4,
    title: 'Promise Gold Refinery',
    image: '/assets/images/portfolio/project-4.webp',
    images: [
      '/assets/images/portfolio/project-4.webp',
      '/assets/images/portfolio/project-1.webp',
      '/assets/images/portfolio/project-8.webp',
    ],
    description:
      'Promise Gold Refinery is a UAE-based precious metals refinery, specializing in high-purity gold and silver, built on trust, precision, and global standards.',
    category: 'Web Development',
    year: '2023',
    client: 'Promise Gold Refinery',
    services: ['UI/UX Design', 'Website Development', 'Photoshoot'],
    sections: [
      {
        title: 'The Challenge',
        body: 'We transformed a technical, industrial business into a premium digital experience:',
        items: [
          { text: 'Elevating complex refining processes into a clear, elegant narrative.' },
          { text: 'Creating a consistent visual language through photoshoot and image editing.' },
          { text: 'Structuring content for clarity and intuitive navigation.' },
          { text: 'Designing the site to reflect credibility, quality, and trust.' },
        ],
        type: 'bullets',
      },
      {
        title: 'The Result',
        body: 'The result is a sleek, visually-driven website that communicates Promise Gold Refinery\'s expertise and premium positioning.',
        images: ['/assets/images/portfolio/project-4.webp'],
        type: 'default',
      },
    ],
  },

  /* ─── 5. Signature Jewellery ──────────────────────────────── */
  {
    id: 5,
    title: 'Signature Jewellery',
    image: '/assets/images/portfolio/project-5.webp',
    images: [
      '/assets/images/portfolio/project-5.webp',
      '/assets/images/portfolio/project-3.webp',
      '/assets/images/portfolio/project-1.webp',
    ],
    description:
      'We built Signature Jewellery\'s Instagram from scratch, refining their brand story, tagline, and colors for a premium, cohesive social presence. Within just 4 months, our strategy helped the account reach 30,000 people, showcasing their craftsmanship, bridal collections, and gemstone pieces. The result is a visually elegant feed that amplifies brand awareness and connects with a luxury audience.',
    category: 'SMM',
    year: '2024',
    client: 'Signature Jewellery',
    services: ['SMM', 'Video', '3D Rendering', 'CGI Videos'],
    sections: [
      {
        title: 'Social Media Strategy & Growth',
        body: 'We took Signature Jewellery\'s Instagram from scratch, refining their brand identity and building a visually elegant presence for their premium jewellery in Abu Dhabi. Their feed highlights custom pieces, bridal collections, and gemstone showcases, reflecting the brand\'s craftsmanship and luxury positioning.',
        type: 'default',
      },
      {
        title: 'What We Did',
        items: [
          {
            label: 'Brand Refinement',
            text: 'Tweaked their story, suggested a new tagline, and defined brand colors for a cohesive social presence.',
          },
          {
            label: 'Content Strategy & Execution',
            text: 'Created a curated mix of reels, carousel posts, and product highlights to engage and educate the audience.',
          },
          {
            label: 'Audience Reach & Engagement',
            text: 'Within 4 months, our strategy helped the account reach 30,000 people, increasing visibility and brand awareness.',
          },
          {
            label: 'Story-Driven Visuals',
            text: 'Posts were designed to convey heritage, quality, and exclusivity, connecting the brand with a premium audience.',
          },
        ],
        type: 'scope',
      },
      {
        title: 'The Result',
        body: 'The result is an Instagram feed that showcases Signature Jewellery\'s elegance while expanding its digital presence and audience reach.',
        type: 'default',
      },
    ],
  },

  /* ─── 6. Suntech Group ────────────────────────────────────── */
  {
    id: 6,
    title: 'Suntech Group',
    image: '/assets/images/portfolio/project-6.webp',
    images: [
      '/assets/images/portfolio/project-6.webp',
      '/assets/images/portfolio/project-2.webp',
      '/assets/images/portfolio/project-4.webp',
    ],
    description:
      'Suntech Group delivers advanced ERP and business solutions, helping jewellery businesses streamline operations and scale efficiently. Suntech Group partnered with us to elevate their brand presence through a cohesive visual and communication strategy. The goal was to position the company as a forward-thinking, professional, and credible organization across both digital and offline platforms.',
    category: 'SMM',
    year: '2023',
    client: 'Suntech Group',
    services: ['Corporate Video', 'Photoshoot', 'Headshot Photography', 'PR Creatives', 'Offline Marketing'],
    sections: [
      {
        title: 'Objectives',
        items: [
          { text: 'Build a strong corporate identity through high-quality visual storytelling.' },
          { text: 'Establish consistency across all brand touchpoints.' },
          { text: 'Enhance credibility through professional representation of leadership and team.' },
          { text: 'Support marketing and PR efforts with impactful creative assets.' },
        ],
        type: 'bullets',
      },
      {
        title: 'Scope of Work',
        items: [
          {
            label: '1. Corporate Video Production',
            text: 'We conceptualized and produced a premium corporate video that captures Suntech Group\'s vision, values, and operational excellence. The video was designed to communicate trust, innovation, and scale, making it suitable for presentations, digital platforms, and client engagements.',
            subLabel: 'Key Highlights',
            subItems: [
              'Story-driven narrative aligned with brand positioning.',
              'Cinematic visuals showcasing operations and leadership.',
              'Professional voiceover and editing for a polished finish.',
            ],
          },
          {
            label: '2. Corporate Photoshoot (Team & Workplace)',
            text: 'A comprehensive photoshoot was conducted to document the company\'s environment, culture, and workforce. The visuals were crafted to reflect professionalism, collaboration, and authenticity.',
            subLabel: 'Deliverables',
            subItems: [
              'Team interaction shots.',
              'Workplace and infrastructure visuals.',
              'Brand-aligned lifestyle imagery.',
            ],
          },
          {
            label: '3. Individual Headshot Photography',
            text: 'We executed a series of high-end headshot sessions for all team members, ensuring a consistent and refined look across the organization.',
            subLabel: 'Approach',
            subItems: [
              'Uniform lighting and background for brand consistency.',
              'Direction to capture confident and approachable expressions.',
              'Optimized for website, LinkedIn, and PR usage.',
            ],
          },
          {
            label: '4. PR & Advertisement Creative Support',
            text: 'We supported Suntech Group with PR-focused creatives tailored for advertisements and brand visibility campaigns.',
            subLabel: 'Includes',
            subItems: [
              'Ad creatives designed for maximum visual impact.',
              'Messaging aligned with brand voice and positioning.',
              'Ready-to-publish assets for media placements.',
            ],
          },
          {
            label: '5. Offline Marketing Collaterals',
            text: 'To strengthen physical brand presence, we designed and delivered offline marketing materials that reflect the company\'s premium identity.',
            subLabel: 'Deliverables',
            subItems: [
              'Brochures and company profiles.',
              'Event and exhibition materials.',
              'Print-ready designs maintaining brand consistency.',
            ],
          },
        ],
        type: 'scope',
      },
      {
        title: 'Outcome',
        body: 'The collaboration resulted in a unified and elevated brand presence for Suntech Group. With a strong library of visual and marketing assets, the company is now equipped to communicate its value proposition more effectively across all channels.',
        type: 'default',
      },
      {
        title: 'Impact',
        items: [
          { text: 'Enhanced brand perception and professionalism.' },
          { text: 'Improved client engagement through high-quality visuals.' },
          { text: 'Consistent identity across digital and offline platforms.' },
          { text: 'Stronger positioning in PR and marketing initiatives.' },
        ],
        type: 'impact',
      },
      {
        title: 'What We Delivered',
        items: [
          { label: 'Corporate Video', text: 'A cinematic brand film capturing their vision, operations, and credibility.' },
          { label: 'Corporate Photoshoot', text: 'Professional workplace and team visuals reflecting culture and scale.' },
          { label: 'Headshot Photography', text: 'Consistent, high-quality individual portraits for leadership and team.' },
          { label: 'PR & Ad Creatives', text: 'Impactful visuals designed for brand visibility and media placements.' },
          { label: 'Offline Marketing', text: 'Brochures, company profiles, and print collaterals aligned with brand identity.' },
        ],
        type: 'scope',
      },
    ],
  },

  /* ─── 7. Mac N Ro Capital ────────────────────────────────── */
  {
    id: 7,
    title: 'Mac N Ro Capital',
    image: '/assets/images/portfolio/mac&ro/mac&ro-homepage.jpeg',
    images: [
      '/assets/images/portfolio/mac&ro/mac&ro-homepage.jpeg',
      // '/assets/images/portfolio/mac&ro/mac&ro-all-collections.jpeg',
    ],
    description:
      'Mac N Ro Capital is a financial services firm specializing in gold trading, metal accounts, and related investment services, catering to clients who seek secure and transparent access to precious metal markets.',
    category: 'Web Design',
    year: '2024',
    client: 'Mac N Ro Capital',
    services: ['UI/UX Design', 'Website Development'],
    sections: [
      {
        title: 'The Challenge',
        body: 'When Mac N Ro Capital approached us, they had a strong business vision but lacked a digital identity that reflected their expertise and professionalism. Their core challenges included:',
        items: [
          { text: 'No cohesive online presence to communicate credibility in a competitive financial space.' },
          { text: 'Limited visibility of key services like metal trading and investment access.' },
          { text: 'A need for an interface that works seamlessly across web and mobile screens.' },
        ],
        type: 'bullets',
      },
      {
        title: 'Our Approach',
        body: 'We crafted the Mac N Ro Capital website with a user-first experience by following a structured process:',
        items: [
          {
            label: 'Discovery & Strategy',
            text: 'We began by understanding their business model and target users — investors, traders, and institutional clients — to define the website\'s content and navigation clearly.',
          },
          {
            label: 'Design & UX',
            text: 'Focus was on a clean, trustworthy design with strong visual hierarchy — ensuring important services are highlighted, and visitors immediately understand who Mac N Ro Capital is and what they offer.',
          },
          {
            label: 'Responsive Development',
            text: 'Built the site from scratch with modern responsive design so it looks and performs beautifully on desktops, tablets, and mobile devices.',
          },
          {
            label: 'Content Clarity',
            text: 'We structured content around key offerings, ensuring complex financial products are presented in a simple, engaging way that builds trust.',
          },
        ],
        type: 'scope',
      },
      {
        title: 'Problems Solved',
        items: [
          { text: 'Translated complex financial services into clear service pages accessible to a broad audience.' },
          { text: 'Provided a professional digital presence that aligns with the company\'s brand and industry expectations.' },
          { text: 'Delivered a mobile-friendly, fast loading website to support improved search visibility and accessibility.' },
        ],
        type: 'bullets',
      },
      {
        title: 'Outcome',
        body: 'The result is a modern, intuitive website that strengthens Mac N Ro Capital\'s online authority, enhances user trust, and supports future growth in digital marketing and engagement.',
        type: 'default',
      },
    ],
  },

  /* ─── 8. Faqeesh Jewellery ───────────────────────────────── */
  {
    id: 8,
    title: 'Faqeesh Jewellery',
    image: '/assets/images/portfolio/project-8.webp',
    images: [
      '/assets/images/portfolio/project-8.webp',
      '/assets/images/portfolio/project-6.webp',
      '/assets/images/portfolio/project-2.webp',
    ],
    description:
      'Faqeesh Jewellery is a premium Arabic-focused jewellery brand based in Abu Dhabi, catering to clients looking for high-quality gold and diamond pieces online. We designed a premium Arabic-first e-commerce platform for Faqeesh Jewellery in Abu Dhabi. The site features a custom layout, live gold rate integration, and a user-friendly shopping experience, while giving the client full control over product management. Bringing luxury jewellery online with precision and real-time pricing.',
    category: 'E-commerce',
    year: '2023',
    client: 'Faqeesh Jewellery',
    services: ['UI/UX Design', 'Website Development', 'E-commerce'],
    sections: [
      {
        title: 'The Challenge',
        body: 'The client wanted an e-commerce platform tailored for the Arabic-speaking audience while providing real-time gold pricing. Key challenges included:',
        items: [
          { text: 'Ensuring Arabic language support with proper right-to-left layout.' },
          { text: 'Displaying live gold rates integrated with product pricing.' },
          { text: 'Creating a user-friendly shopping experience that reflects the luxury brand.' },
        ],
        type: 'bullets',
      },
      {
        title: 'Our Approach',
        items: [
          { text: 'Designed a custom website layout optimized for Arabic users, balancing aesthetics with usability.' },
          { text: 'Integrated a live gold rate system to automatically update pricing on the website.' },
          { text: 'Developed the e-commerce framework, while enabling the client to manage products, inventory, and orders independently.' },
        ],
        type: 'bullets',
      },
      {
        title: 'Outcome',
        items: [
          { text: 'Delivered a responsive, Arabic-first e-commerce platform reflecting the premium brand identity.' },
          { text: 'Enabled real-time pricing for gold products, improving transparency and customer trust.' },
          { text: 'Client now has full control over daily operations while leveraging a professional, brand-aligned website.' },
        ],
        type: 'impact',
      },
    ],
  },
];
