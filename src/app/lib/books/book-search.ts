// Prepared search helper. In the exercise you only *use* these functions - the
// point is the directive, not re-implementing string matching.
//
// The parameter type is a structural subset (not `Book`) on purpose: the `Book`
// shape changes a few times later in the workshop (typed interface -> valibot),
// and this helper stays stable regardless.
type SearchableBook = { title?: string; author?: string };

const SEARCHABLE_FIELDS = ['title', 'author'] as const;

/**
 * `true` when `term` (case-insensitive, trimmed) appears in the book's title
 * or author. An empty term matches every book.
 */
export function bookMatchesSearchTerm(book: SearchableBook, term: string): boolean {
  const needle = term.trim().toLowerCase();

  if (!needle) {
    return true;
  }

  return SEARCHABLE_FIELDS.some(field =>
    (book[field] ?? '').toLowerCase().includes(needle)
  );
}

export interface TextSegment {
  text: string;
  isMatch: boolean;
}

/**
 * Splits `text` into consecutive segments and flags the ones that match `term`.
 * Lets a template render highlights without regular expressions.
 */
export function splitBySearchTerm(text: string, term: string): TextSegment[] {
  const needle = term.trim().toLowerCase();

  if (!needle || !text) {
    return [{ text, isMatch: false }];
  }

  const segments: TextSegment[] = [];
  const haystack = text.toLowerCase();
  let start = 0;

  for (let index = haystack.indexOf(needle); index !== -1; index = haystack.indexOf(needle, start)) {
    if (index > start) {
      segments.push({ text: text.slice(start, index), isMatch: false });
    }

    segments.push({ text: text.slice(index, index + needle.length), isMatch: true });
    start = index + needle.length;
  }

  if (start < text.length) {
    segments.push({ text: text.slice(start), isMatch: false });
  }

  return segments;
}
