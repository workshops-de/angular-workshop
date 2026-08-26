import * as v from 'valibot';

const BookSchema = v.object({
  isbn: v.pipe(v.string()),
  title: v.pipe(v.string()),
  author: v.optional(v.pipe(v.string(), v.nonEmpty())),
  abstract: v.pipe(v.string()),
  cover: v.optional(v.pipe(v.string(), v.url()))
});

export const BooksCollectionSchema = v.array(BookSchema);
export type Book = v.InferOutput<typeof BookSchema>;
