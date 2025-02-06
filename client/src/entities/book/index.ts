export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre?: string;
  coverImage?: string;
  description?: string;
}

export type BookInput = Omit<Book, "id">

export type BookField = keyof BookInput;

export type BookInputType = "text" | "date" | "textarea";

export type BookFieldProps = "label" | "required" | "type" | "rules" | "additional";

export const BookMeta: { fields: Record<BookField, Partial<Record<BookFieldProps, any>>> } = {
  fields: {
    title: { label: "Title", required: true, type: "text", rules: [] },
    author: { label: "Author", required: true, type: "text", rules: [] },
    year: { label: "Publish year", required: true, type: "date", rules: [{ type: "number", min: 0, max: new Date().getFullYear(), message: "Enter a valid year" }] },
    genre: { label: "Genre", required: false, type: "text", rules: [] },
    description: { label: "Description", required: false, type: "textarea", rules: [], additional: true },
    coverImage: { label: "Cover image (URL)", required: false, type: "text", rules: [] },
  } as const
};

