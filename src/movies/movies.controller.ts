import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    console.log('getAll API Call');
    return 'this will return all Movies.';
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    console.log(`get One. movie id: ${id}`);
    return `this get one(${id}) Movie.`;
  }

  @Post()
  create() {
    console.log('create movie.');
    return 'create movie.';
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    console.log(`remove movie info. id: ${id}`);
    return `remove movie info. id: ${id}`;
  }

  @Patch('/:id')
  update(@Param('id') id: string) {
    console.log(`update movie info. id: ${id}`);
    return `update movie info. id: ${id}`;
  }
}
