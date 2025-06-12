import { IRepository } from '../../common/interfaces/repository.interface';
import { Note } from '../entities/note.entity';

export interface INoteRepository extends IRepository<Note> {
  findByUserId(userId: string): Promise<Note[]>;
  findByUserIdAndNoteId(userId: string, noteId: string): Promise<Note | null>;
}
