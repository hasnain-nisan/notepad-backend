import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { GetAllNotesQueryDto } from '../dto/get-all-notes.dto';
import { PaginatedNotes } from '../interfaces/paginated-notes.interface';

export interface INoteService {
  findAllByUser(
    userId: string,
    query: GetAllNotesQueryDto,
  ): Promise<PaginatedNotes>;

  findOne(id: string, userId: string): Promise<Note>;

  create(createNoteDto: CreateNoteDto, userId: string): Promise<Note>;

  update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note>;

  remove(id: string, userId: string): Promise<void>;
}
