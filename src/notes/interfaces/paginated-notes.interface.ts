import { Note } from '../entities/note.entity';

export interface PaginatedNotes {
  items: Note[]; // The list of notes in the current page.
  total: number; // The total number of notes matching the criteria.
  currentPage: number; // The current page number.
  totalPages: number; // The total number of available pages.
}
