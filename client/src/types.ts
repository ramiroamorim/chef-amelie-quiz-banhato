export interface ImageItem {
  src: string;
  alt: string;
}

export interface TextBlock {
  content: string;
  highlight?: boolean;
}

export interface Option {
  value: string;
  label: string;
}

export interface QuizStepType {
  name: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageGrid?: ImageItem[];
  textBlocks?: TextBlock[];
  options?: Option[];
  buttonText?: string;
}

export interface TestimonialType {
  message: string;
  time: string;
  image?: string;
  imageAlt?: string;
}
