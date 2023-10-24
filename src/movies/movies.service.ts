import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  // DB 연동없이 구현하기 때문에 캐시로 데이터를 가지게 한다. 서버가 닫히면 데이터가 사라진다.
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === +id); // 문자열 앞에 +를 입력하면 숫자일 경우 숫자로 형식이 바뀐다.
    if (!movie) {
      throw new NotFoundException(`영화 번호 ${id}를 찾을 수 없습니다.`); // NestJS에서 제공하는 예외처리.
    }
    return movie;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateOne(id: string, updateData: Movie) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
