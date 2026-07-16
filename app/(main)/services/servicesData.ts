import type { LucideIcon } from 'lucide-react';
import {
  BookOpen, BrainCircuit, CalendarDays, Camera, Clapperboard, ClipboardList,
  Crosshair, Fingerprint, FlaskConical, Glasses, LayoutDashboard, LayoutTemplate,
  Leaf, Mail, Map, Megaphone, MousePointerClick, Newspaper, Palette, PenTool,
  PieChart, RefreshCw, Search, SearchCheck, Shapes, Share2, ShieldAlert,
  ShoppingCart, Smartphone, Sparkles, Target, TrendingUp, Users, Video, Workflow,
} from 'lucide-react';

export interface ServiceOffering {
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface ServiceProcessStep {
  step: string;
  description: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  number: string;
  title: string;
  /** One-line teaser shown on the services index rows */
  teaser: string;
  description: string;
  image: string;
  /** Accent color used for badges, hovers and CTAs */
  color: string;
  /** Short keyword chips shown on the index rows */
  chips: string[];
  offeringsTitle: string;
  offerings: ServiceOffering[];
  process: ServiceProcessStep[];
  /** Portfolio categories used to surface related work on the detail page */
  portfolioCategories: string[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

/** Accent colors that need dark text on top of them */
const LIGHT_COLORS = ['#E9C369', '#F4A261'];

export function getServiceCtaTextColor(color: string): string {
  return LIGHT_COLORS.includes(color) ? '#1a1a1a' : '#ffffff';
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

/** Previous / next services for detail-page footer navigation */
export function getAdjacentServices(slug: string): { prev: ServiceItem | null; next: ServiceItem | null } {
  const index = services.findIndex((service) => service.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? services[index - 1] : null,
    next: index < services.length - 1 ? services[index + 1] : null,
  };
}

export const services: ServiceItem[] = [
  {
    id: 1,
    slug: 'branding-identity',
    number: '01',
    title: 'Branding & Identity Development',
    teaser: 'Iconic identities that help you stand out, stay consistent, and connect deeply.',
    description:
      'We uncover your true brand essence, craft iconic designs, and build cohesive identities that resonate. From logo creation to full rebranding, we position you to stand out, stay consistent, and connect deeply with your audience.',
    image: '/assets/images/services/branding.png',
    color: '#299D8F',
    chips: ['Logo Design', 'Brand Guidelines', 'Rebranding'],
    offeringsTitle: 'Brand Services',
    offerings: [
      { name: 'Brand reflection', description: 'Unearthing your true brand essence and story', icon: Fingerprint },
      { name: 'Brand Guidelines', description: 'Developing consistent visual and verbal identity', icon: BookOpen },
      { name: 'Logo Designing', description: "Timeless logos that reflect brand's identity", icon: PenTool },
      { name: 'Brand Positioning', description: 'Defining unique place in the market', icon: Target },
      { name: 'Rebranding', description: 'Revitalizing brand feel without losing its soul', icon: RefreshCw },
    ],
    process: [
      { step: 'Discover', description: 'We dig into your story, values, audience, and market to unearth what makes your brand truly yours.' },
      { step: 'Define', description: 'We shape a clear positioning and brand strategy that carves out your unique place in the market.' },
      { step: 'Design', description: 'We craft the identity — logo, palette, typography, and voice — into one cohesive system.' },
      { step: 'Deliver', description: 'We hand over complete guidelines and roll the identity out across every touchpoint.' },
    ],
    portfolioCategories: ['Branding'],
    meta: {
      title: 'Branding & Identity Design Agency in UAE | 3R Creative',
      description:
        'Luxury branding and identity design in UAE — logo design, brand guidelines, positioning, and rebranding for jewelry, gold refinery, and precious metal businesses.',
      keywords: [
        'Brand identity design services',
        'Brand strategy agency',
        'Rebranding services',
        'Luxury brand identity design UAE',
        'Logo design Dubai',
        'Gold refinery branding',
        'Jewelry industry brand identity',
      ],
    },
  },
  {
    id: 2,
    slug: 'storytelling-content-creation',
    number: '02',
    title: 'Storytelling and Content Creation',
    teaser: 'Powerful narratives that build emotional connections and lasting impact.',
    description:
      "At 3RCreative, we turn your brand's voice into powerful stories that captivate and inspire. Through strategic content creation — from words to visuals — we craft narratives that build emotional connections, spark engagement, and drive lasting impact.",
    image: '/assets/images/services/story-telling.png',
    color: '#E9C369',
    chips: ['Brand Narrative', 'Content Strategy', 'Visual Storytelling'],
    offeringsTitle: 'Design Process',
    offerings: [
      { name: 'Story Identification', description: 'Finding your authentic brand narrative', icon: Search },
      { name: 'Story Distribution', description: 'Story for the right audience through right channels', icon: Share2 },
      { name: 'Content Refinement', description: 'Message is clear, authentic, and engaging', icon: Sparkles },
      { name: 'Visual Storytelling', description: 'Creating visual contents that resonate emotion', icon: Clapperboard },
    ],
    process: [
      { step: 'Listen', description: 'We immerse ourselves in your brand and audience to find the story only you can tell.' },
      { step: 'Shape', description: 'We refine that story into a clear narrative arc with messaging that feels authentic.' },
      { step: 'Create', description: 'We produce the words and visuals — articles, campaigns, and content that carry the story.' },
      { step: 'Amplify', description: 'We distribute the story through the right channels to reach the right audience.' },
    ],
    portfolioCategories: ['Branding', 'SMM'],
    meta: {
      title: 'Brand Storytelling & Content Creation Agency in UAE | 3R Creative',
      description:
        'Strategic storytelling and content creation in UAE — brand narratives, content strategy, and visual storytelling that spark engagement and drive lasting impact.',
      keywords: [
        'Strategic storytelling for businesses',
        'Content creation agency UAE',
        'Brand narrative development',
        'Visual storytelling services',
        'Content strategy Dubai',
        'Luxury brand storytelling',
      ],
    },
  },
  {
    id: 3,
    slug: 'digital-marketing',
    number: '03',
    title: 'Digital Marketing',
    teaser: 'Data-driven campaigns that spark engagement, build loyalty, and drive growth.',
    description:
      "We amplify your brand's presence across digital landscapes with smart, data-driven strategies. From social media to SEO, we craft campaigns that spark engagement, build loyalty, and drive real growth.",
    image: '/assets/images/services/digital-marketing.png',
    color: '#F4A261',
    chips: ['SEO', 'Social Media', 'PPC'],
    offeringsTitle: 'Marketing Services',
    offerings: [
      { name: 'Search Engine Optimization (SEO)', description: 'Making your brand discoverable online.', icon: SearchCheck },
      { name: 'Social Media Marketing', description: 'Connecting through authentic, engaging campaigns', icon: Megaphone },
      { name: 'Pay-Per-Click (PPC) Advertising', description: 'Running targeted ads for measurable results.', icon: MousePointerClick },
      { name: 'Email Campaigns', description: 'Crafting personalized, impactful email journeys.', icon: Mail },
      { name: 'Influencer Marketing', description: "Influencers who align with your brand's story.", icon: Users },
    ],
    process: [
      { step: 'Audit', description: 'We analyze your current presence, audience, and competitors to find the biggest opportunities.' },
      { step: 'Strategize', description: 'We build a channel mix — SEO, social, paid, email — matched to your goals and budget.' },
      { step: 'Launch', description: 'We execute campaigns with sharp creative and precise targeting across every channel.' },
      { step: 'Optimize', description: 'We track, test, and refine continuously so performance keeps compounding.' },
    ],
    portfolioCategories: ['SMM'],
    meta: {
      title: 'Digital Marketing Agency in UAE | SEO, Social Media & PPC | 3R Creative',
      description:
        'Data-driven digital marketing in UAE — SEO, social media marketing, PPC, email, and influencer campaigns for luxury jewelry and precious metal brands.',
      keywords: [
        'Digital marketing agency UAE',
        'SEO services Dubai',
        'Social media marketing UAE',
        'PPC advertising agency',
        'Jewelry marketing Dubai',
        'Digital growth strategy',
      ],
    },
  },
  {
    id: 4,
    slug: 'web-digital-experiences',
    number: '04',
    title: 'Web and Digital Experiences',
    teaser: 'Seamless digital experiences that connect, convert, and delight.',
    description:
      'We design seamless digital experiences that are as intuitive as they are impactful. From engaging websites to interactive platforms, we merge design and technology to create user journeys that connect, convert, and delight.',
    image: '/assets/images/services/web-experience.png',
    color: '#299D8F',
    chips: ['Web Development', 'UI/UX Design', 'E-Commerce'],
    offeringsTitle: 'Development Stack',
    offerings: [
      { name: 'E-Commerce Solutions', description: 'Seamless shopping experiences for your customers.', icon: ShoppingCart },
      { name: 'Website Design and Development', description: 'Intuitive and visually appealing websites to reflect brand', icon: LayoutTemplate },
      { name: 'UI/UX Design', description: 'Every digital touchpoint is meaningful and intuitive.', icon: Palette },
      { name: 'Mobile App Development', description: "Apps that resonate with your audience's needs.", icon: Smartphone },
    ],
    process: [
      { step: 'Map', description: 'We define user journeys, content architecture, and the experience your audience expects.' },
      { step: 'Design', description: 'We craft intuitive, on-brand interfaces where every touchpoint feels deliberate.' },
      { step: 'Build', description: 'We develop fast, responsive, and reliable products with modern technology.' },
      { step: 'Refine', description: 'We test with real users, polish the details, and keep improving after launch.' },
    ],
    portfolioCategories: ['Web Design', 'Web Development'],
    meta: {
      title: 'Website Design & Development Agency in UAE | 3R Creative',
      description:
        'Web design and development in UAE — luxury websites, e-commerce, UI/UX design, and mobile apps that turn digital experiences into conversions.',
      keywords: [
        'Web design and development',
        'Digital experience design',
        'E-commerce website UAE',
        'UI UX design agency Dubai',
        'Luxury website design',
        'Mobile app development UAE',
      ],
    },
  },
  {
    id: 5,
    slug: 'performance-marketing-analytics',
    number: '05',
    title: 'Performance Marketing and Analytics',
    teaser: 'Creativity with precision — every campaign optimized for real-world impact.',
    description:
      "We combine creativity with precision to drive results. Our performance marketing approach ensures every campaign is optimized for real-world impact—whether it's clicks, conversions, or customer loyalty.",
    image: '/assets/images/services/performance-marketing-analysis.png',
    color: '#E76F51',
    chips: ['CRO', 'A/B Testing', 'Dashboards'],
    offeringsTitle: 'Analytics Services',
    offerings: [
      { name: 'Conversion Rate Optimization (CRO)', description: 'Maximizing the impact of your website and campaigns.', icon: TrendingUp },
      { name: 'A/B Testing', description: 'Refining messaging and visuals for best results.', icon: FlaskConical },
      { name: 'Performance Dashboards', description: 'Actionable insights through analytics.', icon: LayoutDashboard },
    ],
    process: [
      { step: 'Measure', description: 'We set up clean tracking so every click, lead, and sale is attributed correctly.' },
      { step: 'Hypothesize', description: 'We identify friction points and form data-backed hypotheses on what to improve.' },
      { step: 'Test', description: 'We run structured A/B tests on messaging, visuals, and journeys to prove what works.' },
      { step: 'Scale', description: 'We double down on winners and report results through live performance dashboards.' },
    ],
    portfolioCategories: ['SMM'],
    meta: {
      title: 'Performance Marketing & Analytics Services in UAE | 3R Creative',
      description:
        'Performance marketing in UAE — conversion rate optimization, A/B testing, and analytics dashboards that turn campaigns into measurable growth.',
      keywords: [
        'Performance marketing services',
        'Marketing analytics agency',
        'Conversion rate optimization UAE',
        'A/B testing services',
        'High-conversion digital marketing',
      ],
    },
  },
  {
    id: 6,
    slug: 'creative-services',
    number: '06',
    title: 'Creative Services',
    teaser: 'Bold, purpose-driven visuals rooted in clarity and authenticity.',
    description:
      'We craft bold, purpose-driven visuals that speak directly to your audience. Whether through striking design, compelling photography, or cinematic videography, our creative work is rooted in clarity and authenticity.',
    image: '/assets/images/services/creative-services.png',
    color: '#299D8F',
    chips: ['Graphic Design', 'Photography', 'Video Production'],
    offeringsTitle: 'Creative Work',
    offerings: [
      { name: 'Graphic Design', description: 'We create visuals that stand out.', icon: Shapes },
      { name: 'Photography', description: 'Capturing the essence of brand, product, or service.', icon: Camera },
      { name: 'Video Production', description: 'Crafting compelling videos that tell your story.', icon: Video },
    ],
    process: [
      { step: 'Brief', description: 'We align on the message, audience, and mood the creative needs to carry.' },
      { step: 'Concept', description: 'We develop visual directions and moodboards until the idea clicks.' },
      { step: 'Produce', description: 'We design, shoot, and film with craft — from studio product shots to cinematic video.' },
      { step: 'Polish', description: 'We edit, retouch, and format everything for the channels where it will live.' },
    ],
    portfolioCategories: ['Branding', 'SMM'],
    meta: {
      title: 'Graphic Design, Photography & Video Production in UAE | 3R Creative',
      description:
        'Creative services in UAE — graphic design, product photography, and cinematic video production for luxury jewelry and precious metal brands.',
      keywords: [
        'Graphic design agency UAE',
        'Product photography Dubai',
        'Video production UAE',
        'Luxury jewelry photography',
        'Creative agency UAE',
      ],
    },
  },
  {
    id: 7,
    slug: 'public-relations-outreach',
    number: '07',
    title: 'Public Relations and Outreach',
    teaser: 'The right message, in front of the right audience — strategically and authentically.',
    description:
      'We help you craft the right message and get it in front of the right audience—strategically, authentically, and impactfully.',
    image: '/assets/images/services/public-relations.png',
    color: '#E9C369',
    chips: ['Media Relations', 'Event Marketing', 'Crisis Management'],
    offeringsTitle: 'PR Services',
    offerings: [
      { name: 'Media Relations', description: 'Amplifying your story through press coverage.', icon: Newspaper },
      { name: 'Event Marketing', description: 'Memorable in-person or virtual brand experiences', icon: CalendarDays },
      { name: 'Crisis Management', description: "Protecting brand's reputation during challenging times.", icon: ShieldAlert },
    ],
    process: [
      { step: 'Position', description: 'We define the message and angles that make your story newsworthy.' },
      { step: 'Connect', description: 'We reach the journalists, outlets, and communities that matter to your audience.' },
      { step: 'Activate', description: 'We launch press outreach, events, and experiences that put your brand in the spotlight.' },
      { step: 'Protect', description: 'We monitor sentiment and stand ready to safeguard your reputation when it counts.' },
    ],
    portfolioCategories: [],
    meta: {
      title: 'Public Relations & Outreach Agency in UAE | 3R Creative',
      description:
        'PR and outreach in UAE — media relations, event marketing, and crisis management that put your brand story in front of the right audience.',
      keywords: [
        'Public relations agency UAE',
        'Media relations Dubai',
        'Event marketing UAE',
        'Crisis management services',
        'Brand outreach agency',
      ],
    },
  },
  {
    id: 8,
    slug: 'strategy-consulting',
    number: '08',
    title: 'Strategy and Consulting',
    teaser: 'Insight-driven strategy and expert consulting for strong brand foundations.',
    description:
      "We help brands build strong foundations through insight-driven strategy and expert consulting. Whether you're launching, evolving, or repositioning, we craft strategies that align with your mission.",
    image: '/assets/images/services/strategy-and-consulting.png',
    color: '#F4A261',
    chips: ['Market Research', 'Brand Strategy', 'Competitor Analysis'],
    offeringsTitle: 'Ad Strategies',
    offerings: [
      { name: 'Market Research', description: 'Understanding your audience and competitors.', icon: PieChart },
      { name: 'Brand and Digital Strategy', description: 'Developing actionable roadmaps for brand success.', icon: Map },
      { name: 'Competitor Analysis', description: 'Identifying opportunities to set your brand apart.', icon: Crosshair },
    ],
    process: [
      { step: 'Research', description: 'We study your market, audience, and competitors to ground every decision in evidence.' },
      { step: 'Diagnose', description: 'We pinpoint where your brand stands today and where the real opportunities lie.' },
      { step: 'Plan', description: 'We build an actionable roadmap — positioning, channels, and priorities — aligned to your mission.' },
      { step: 'Guide', description: 'We stay alongside you as consultants, adjusting the strategy as your brand evolves.' },
    ],
    portfolioCategories: ['Branding'],
    meta: {
      title: 'Brand Strategy & Consulting Agency in UAE | 3R Creative',
      description:
        'Strategy and consulting in UAE — market research, brand and digital strategy, and competitor analysis to build strong foundations for growth.',
      keywords: [
        'Brand strategy agency',
        'Strategic brand positioning',
        'Market research UAE',
        'Business consultancy Dubai',
        'Competitor analysis services',
      ],
    },
  },
  {
    id: 9,
    slug: 'technology-integration',
    number: '09',
    title: 'Technology Integration',
    teaser: 'Emerging technology that streamlines operations and unlocks smarter engagement.',
    description:
      'We help brands harness the power of emerging technology to streamline operations, elevate experiences, and unlock smarter engagement.',
    image: '/assets/images/services/technology-integration.png',
    color: '#299D8F',
    chips: ['CRM & Automation', 'AI Solutions', 'AR/VR'],
    offeringsTitle: 'Tech Solutions',
    offerings: [
      { name: 'CRM and Automation', description: 'Implementing tools to streamline customer relationships.', icon: Workflow },
      { name: 'AR/VR Experiences', description: 'Crafting immersive experiences for brand.', icon: Glasses },
      { name: 'AI Solutions', description: 'Leveraging AI for personalization and smarter campaigns', icon: BrainCircuit },
    ],
    process: [
      { step: 'Assess', description: 'We map your workflows and customer journey to find where technology adds the most value.' },
      { step: 'Select', description: 'We choose the right stack — CRM, automation, AI, or immersive tech — for your goals.' },
      { step: 'Integrate', description: 'We implement and connect the tools so they work seamlessly with how you operate.' },
      { step: 'Evolve', description: 'We train your team and keep tuning the setup as your business grows.' },
    ],
    portfolioCategories: ['Web Development'],
    meta: {
      title: 'CRM, AI & Technology Integration Services in UAE | 3R Creative',
      description:
        'Technology integration in UAE — CRM and automation, AI solutions, and AR/VR experiences that streamline operations and elevate engagement.',
      keywords: [
        'CRM implementation UAE',
        'Marketing automation services',
        'AI solutions for business',
        'AR VR experiences Dubai',
        'Technology consulting UAE',
      ],
    },
  },
  {
    id: 10,
    slug: 'sustainability-social-impact',
    number: '10',
    title: 'Sustainability and Social Impact Branding',
    teaser: "Purpose-driven campaigns that communicate your brand's commitment authentically.",
    description:
      "We craft purpose-driven campaigns that authentically communicate your brand's commitment to environmental sustainability and social responsibility.",
    image: '/assets/images/services/sustainability.png',
    color: '#E76F51',
    chips: ['Sustainable Storytelling', 'Impact Reporting'],
    offeringsTitle: 'Sustainable Practices',
    offerings: [
      { name: 'Sustainable Storytelling', description: "Impactful stories that reflect your brand's sustainable purpose.", icon: Leaf },
      { name: 'Impact Reporting & Transparency', description: 'Engage modern consumers where it matters.', icon: ClipboardList },
    ],
    process: [
      { step: 'Ground', description: 'We audit your real sustainability practices so every claim is authentic and defensible.' },
      { step: 'Frame', description: 'We shape your commitments into a purpose narrative that resonates with modern consumers.' },
      { step: 'Communicate', description: 'We create campaigns and reports that share your impact with clarity and transparency.' },
      { step: 'Sustain', description: 'We keep the story honest and current as your initiatives grow.' },
    ],
    portfolioCategories: [],
    meta: {
      title: 'Sustainability & Social Impact Branding in UAE | 3R Creative',
      description:
        'Sustainability branding in UAE — purpose-driven campaigns, sustainable storytelling, and impact reporting that communicate your commitment authentically.',
      keywords: [
        'Sustainable branding agency UAE',
        'Social impact branding',
        'Purpose-driven marketing',
        'Sustainability storytelling',
        'Impact reporting services',
      ],
    },
  },
];
