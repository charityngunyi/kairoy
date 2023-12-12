// user.model.ts
export interface Profile {
  did: number;
  firstName: string;
  lastName: string;
  picture: string; // URL to the profile picture
  phoneNumber: string;
  email: string;
  socialLinks: string[]; // Array of social media links
  portfolioSamples: string[]; // Array of URLs to portfolio samples
  preferences: string; // You can define a more detailed preferences structure
}

// content.model.ts
export interface Content {
  id: number;
  author: string;
  type: ContentType; // Enum or string representing the content type (Article, Picture, Video, Music, Art, Culture, ShortStory)
  data: string; // URL or data specific to the content type
  status: ContentStatus; // Enum or string representing the content status (Draft, Published, etc.)
}

export enum ContentType {
  Article = 'Article',
  Picture = 'Picture',
  Video = 'Video',
  Music = 'Music',
  Art = 'Art',
  Culture = 'Culture',
  ShortStory = 'ShortStory',
}

export enum ContentStatus {
  Draft = 'Draft',
  Published = 'Published',
  Archived = 'Archived',
}

// community.model.ts
export interface Community {
  id: number;
  name: string;
  members: number[]; // Array of user IDs
}

// monetization.model.ts
export interface Monetization {
  user: string;
  methods: MonetizationMethod[]; // Array of monetization methods
  paymentAccounts: string[]; // Array of linked payment accounts
}

export interface MonetizationMethod {
  name: string;
  description: string;
}

// learning.model.ts
export interface LearningResource {
  id: number;
  title: string;
  type: LearningResourceType; // Enum or string representing the resource type
  content: string; // URL or content specific to the resource type
}

export enum LearningResourceType {
  Workshop = 'Workshop',
  EducationalContent = 'EducationalContent',
}

// analytics.model.ts
export interface Analytics {
  user: string;
  performanceMetrics: PerformanceMetrics;
  audienceEngagement: AudienceEngagement;
}

export interface PerformanceMetrics {
  views: number;
  likes: number;
  shares: number;
}

export interface AudienceEngagement {
  comments: number;
  collaborations: number;
}
