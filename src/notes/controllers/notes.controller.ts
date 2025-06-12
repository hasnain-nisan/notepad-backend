import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { NoteService } from '../services/note.service';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiMessage } from 'src/common/decorators/api-message.decorator';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.noteService.create(createNoteDto, req.user.id);
  }

  @Get()
  @ApiMessage('Fetched notes successfully')
  findAll(@Request() req: { user: { id: string } }) {
    return this.noteService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.noteService.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req: { user: { id: string } },
  ) {
    return this.noteService.update(id, updateNoteDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: { user: { id: string } }) {
    return this.noteService.remove(id, req.user.id);
  }
}
