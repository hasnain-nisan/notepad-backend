import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { INoteRepository } from '../interfaces/note-repository.interface';
import { PaginatedNotes } from '../interfaces/paginated-notes.interface';

@Injectable()
export class NoteRepository implements INoteRepository {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({
      relations: ['user'],
    });
  }

  async findById(id: string): Promise<Note | null> {
    return this.noteRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUserId(userId: string): Promise<Note[]> {
    return this.noteRepository.find({
      where: { userId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findByUserIdAndNoteId(
    userId: string,
    noteId: string,
  ): Promise<Note | null> {
    return this.noteRepository.findOne({
      where: { id: noteId, userId },
    });
  }

  async create(noteData: Partial<Note>): Promise<Note> {
    const note = this.noteRepository.create(noteData);
    return this.noteRepository.save(note);
  }

  async update(id: string, noteData: Partial<Note>): Promise<Note | null> {
    await this.noteRepository.update(id, noteData);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.noteRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async findByUserIdPaginated(
    userId: string,
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginatedNotes> {
    // Set up the filtering conditions
    const where: Record<string, any> = { userId };
    if (search) {
      // Use the Like operator for partial matching on title.
      where.title = Like(`%${search}%`);
    }

    // Find both notes and total count supporting pagination.
    const [items, total] = await this.noteRepository.findAndCount({
      where,
      order: { updatedAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
