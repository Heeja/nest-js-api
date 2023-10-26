import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // beforeEach 일 때, 매번 어플리케이션을 새로 생성되며 캐시데이터가 초기화 되었다. 이를 beforeAll로 수정.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      // 테스트에서도 pipe를 설정해야한다.
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        forbidUnknownValues: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome Movie API(NestJS).');
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
      // 데이터가 없을 것이기 때문에 기대값을 빈배열([])을 입력했다.
    });

    it('POST 201', () => {
      const movieInfo = {
        name: '삭제하려고 추가하는 영화',
        year: 2028,
        actor: ['아무개'],
        genres: ['미스테리'],
        streaming: ['myTelevition'],
      };

      return request(app.getHttpServer())
        .post('/movies')
        .send(movieInfo)
        .expect(201);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  // URL은 string 형식이다. 아래 :id를 string으로 인식하기 때문에 ValidationPipe를 통해 transform 하였다.
  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/65536').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ year: 2023 })
        .expect(200);
    });
    it('PATCH 400', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ other: 'qpdjlasjd' })
        .expect(400);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
