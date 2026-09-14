export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle?: string;
  abstract?: string;
  author?: string;
  publisher?: string;
  price?: number;
  currency?: string;
  numPages?: number;
  cover?: string;
  userId?: number;
  publishedAt?: string | null;
  coAuthors?: string[];
}
