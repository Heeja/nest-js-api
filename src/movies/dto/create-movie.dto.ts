import { Optional } from '@nestjs/common';
import { IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly actor: string[];

  @Optional()
  // ⬆️ 값이 존재할 경우에는 아래@IsString() 데코레이터에 의한 문자열 체크가 실행되고, 값이 존재하지 않을 경우에는 유효성 검사를 하는 다른 데코레이터들의 기능이 작동하지 않는다.
  @IsString({ each: true })
  readonly genres: string[];

  @IsString({ each: true })
  readonly streaming: string[];
}
