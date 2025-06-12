import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { NoteRepository } from './repositories/note.repository';
import { NoteService } from './services/note.service';
import { NotesController } from './controllers/notes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NoteRepository, NoteService],
})
export class NotesModule {}
