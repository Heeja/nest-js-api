import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies') // () 안의 문자열이 URL주소가 된다.
export class MoviesController {
  constructor(readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    console.log('getAll API Call');
    return this.movieService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Movie {
    console.log(`get One. movie id: ${id}`);
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() movieData) {
    console.log(`create movie. movieData: ${movieData}`);
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    console.log(`remove movie info. id: ${id}`);
    return this.movieService.deleteOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateData) {
    console.log(`update movie info. id: ${id}`);
    return this.movieService.updateOne(id, updateData);
  }
}
