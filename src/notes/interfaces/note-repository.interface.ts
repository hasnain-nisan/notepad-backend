import { IRepository } from '../../common/interfaces/repository.interface';
import { Note } from '../entities/note.entity';
import { PaginatedNotes } from './paginated-notes.interface';

export interface INoteRepository extends IRepository<Note> {
  findByUserId(userId: string): Promise<Note[]>;
  findByUserIdAndNoteId(userId: string, noteId: string): Promise<Note | null>;
  findByUserIdPaginated(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginatedNotes>;
}
