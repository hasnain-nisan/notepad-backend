import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '../repositories/note.repository';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';
import { GetAllNotesQueryDto } from '../dto/get-all-notes.dto';
import { PaginatedNotes } from '../interfaces/paginated-notes.interface';
import { INoteService } from '../interfaces/note-service.interface';

@Injectable()
export class NoteService implements INoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  async findAllByUser(
    userId: string,
    query: GetAllNotesQueryDto,
  ): Promise<PaginatedNotes> {
    const { page, limit, search } = query;
    return await this.noteRepository.findByUserIdPaginated(
      userId,
      page,
      limit,
      search,
    );
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.noteRepository.findByUserIdAndNoteId(userId, id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    return this.noteRepository.create({
      ...createNoteDto,
      userId,
    });
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    const note = await this.noteRepository.findByUserIdAndNoteId(userId, id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const updatedNote = await this.noteRepository.update(id, updateNoteDto);
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }

    return updatedNote;
  }

  async remove(id: string, userId: string): Promise<void> {
    const note = await this.noteRepository.findByUserIdAndNoteId(userId, id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const deleted = await this.noteRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Note not found');
    }
  }
}
