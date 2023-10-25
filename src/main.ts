import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 검증을 통과한 뒤, 대상 객체에서 검증 규칙이 정의되어있지 않은 프로퍼티를 모두 제거해주는 옵션.
      forbidNonWhitelisted: true, // 대상 객체에 검증 규칙이 정의되어있지 않은 프로퍼티가 있으면 오류를 내게 하는 옵션.
      transform: true, // DTO 클래스에 따라 입력된 객체를 자동으로 타입변환 한다.
      forbidUnknownValues: true,
      // 프로퍼티에 검증 규칙이 정의되어있지 않은 클래스의 인스턴스나, plain object를 검증할 때 오류가 나게 만드는 옵션.
      // 공식 문서에서 강력히 권장하고 있다. - 프로퍼티에 규칙이 정해지지 않은 class 스키마나 object도 검증을 통과할 수 있기 때문이다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
