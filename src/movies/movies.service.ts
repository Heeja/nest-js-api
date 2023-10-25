import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  // DB 연동없이 구현하기 때문에 캐시로 데이터를 가지게 한다. 서버가 닫히면 데이터가 사라진다.
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`영화 번호 ${id}를 찾을 수 없습니다.`); // NestJS에서 제공하는 예외처리.
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData) {
    console.log(movieData);
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateOne(id: number, updateData: UpdateMovieDto) {
    console.log(updateData);
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
