import { defineCollection, z } from 'astro:content';

// Settings collection
const settingsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    businessName: z.string(),
    siteName: z.string(),
    phone: z.string(),
    email: z.string(),
    streetAddress: z.string(),
    suite: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    mapsUrl: z.string(),
    hours: z.object({
      openDays: z.string(),
      openTime: z.string(),
      closeTime: z.string(),
      closedDays: z.string(),
    }),
  }),
});

// Home page collections
const homeCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      credentials: z.string(),
      title: z.string(),
      subtitle: z.string(),
      primaryButtonText: z.string(),
      primaryButtonLink: z.string(),
      secondaryButtonText: z.string(),
      secondaryButtonLink: z.string(),
    }),
    // Intro
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      text: z.string(),
    }),
    // Conditions
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      subheading: z.string(),
      cards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })),
    }),
    // Office
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      paragraph1: z.string(),
      paragraph2: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
    }),
    // Featured testimonial
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      quote: z.string(),
      author: z.string(),
      buttonText: z.string(),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      primaryButtonText: z.string(),
      secondaryButtonText: z.string(),
    }),
  ]),
});

// About page collection
const aboutCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
    }),
    // Bio
    z.object({
      heading: z.string(),
      paragraphs: z.array(z.string()),
    }),
    // Timeline
    z.object({
      sectionHeading: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    }),
    // Specialties
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      subheading: z.string(),
      cards: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    }),
    // Publications
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
      buttonLink: z.string(),
    }),
    // Testimonials on about page
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      items: z.array(z.object({
        quote: z.string(),
        author: z.string(),
      })),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
  ]),
});

// Services collection (individual services)
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    icon: z.string(),
  }),
});

// Services page content
const servicesPageCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
      introText: z.string(),
    }),
    // What to expect
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
  ]),
});

// FAQ collection (individual questions)
const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    order: z.number(),
  }),
});

// FAQ page content
const faqPageCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
    }),
    // Conditions
    z.object({
      categories: z.array(z.object({
        name: z.string(),
        conditions: z.array(z.string()),
      })),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
  ]),
});

// Testimonials collection
const testimonialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    excerpt: z.string(),
    category: z.enum(['featured', 'fertility', 'pain', 'chronic', 'allergies', 'stress', 'general']),
    order: z.number().optional(),
  }),
});

// Testimonials page content
const testimonialsPageCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
    }),
    // Categories
    z.object({
      categories: z.array(z.object({
        id: z.string(),
        title: z.string(),
      })),
    }),
    // Disclaimer
    z.object({
      text: z.string(),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
  ]),
});

// New client forms page
const newClientFormsCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
    }),
    // Intro
    z.object({
      introText: z.string(),
      cancellationPolicy: z.string(),
    }),
    // Forms
    z.object({
      forms: z.array(z.object({
        title: z.string(),
        description: z.string(),
        filePath: z.string(),
      })),
    }),
    // What to bring
    z.object({
      heading: z.string(),
      items: z.array(z.string()),
    }),
    // Preparation
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
      steps: z.array(z.object({
        title: z.string(),
        description: z.string(),
      })),
    }),
    // CTA
    z.object({
      heading: z.string(),
      text: z.string(),
      buttonText: z.string(),
    }),
  ]),
});

// Contact page
const contactCollection = defineCollection({
  type: 'data',
  schema: z.union([
    // Hero
    z.object({
      sectionLabel: z.string(),
      title: z.string(),
      subtitle: z.string(),
    }),
    // Form
    z.object({
      heading: z.string(),
      introText: z.string(),
      submitButtonText: z.string(),
    }),
    // Info
    z.object({
      heading: z.string(),
      introText: z.string(),
    }),
    // Gallery
    z.object({
      sectionLabel: z.string(),
      heading: z.string(),
    }),
  ]),
});

export const collections = {
  settings: settingsCollection,
  home: homeCollection,
  about: aboutCollection,
  services: servicesCollection,
  'services-page': servicesPageCollection,
  faq: faqCollection,
  'faq-page': faqPageCollection,
  testimonials: testimonialsCollection,
  'testimonials-page': testimonialsPageCollection,
  'new-client-forms': newClientFormsCollection,
  contact: contactCollection,
};
