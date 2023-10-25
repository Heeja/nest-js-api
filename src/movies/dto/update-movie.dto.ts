import { PartialType } from '@nestjs/mapped-types';
// import { IsString, IsNumber } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// extends 를 사용하여 기존 create dto를 재사용한다.
// partialType: DTO 변환을 돕는다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  //   @IsString()
  //   readonly name?: string;
  //   @IsNumber()
  //   readonly year?: number;
  //   @IsString({ each: true })
  //   readonly actor?: string[];
  //   @IsString({ each: true })
  //   readonly genres?: string[];
  //   @IsString({ each: true })
  //   readonly streaming?: string[];
}
