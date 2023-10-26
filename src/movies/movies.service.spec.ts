import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('영화 정보 입력하기', () => {
      const before = service.getAll().length;
      const movieInfo = {
        name: '테스트용 영화정보',
        year: 2023,
        genres: ['Test'],
      };
      service.create(movieInfo);
      const after = service.getAll().length;

      expect(after).toBeGreaterThan(before); // after가 before보다 큰지 체크.
    });
  });

  describe('getAll', () => {
    it('영화 정보 가져오기', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // 기대값이 클래스(여기서는 Array)에 속하는지 체크.
    });

    it('한가지의 영화 정보를 가져오지 못할 때', () => {
      try {
        service.getAll();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('getOne', () => {
    it('영화 정보 한가지만 가져오기', () => {
      const movieInfo = {
        name: '테스트용 영화정보',
        year: 2023,
        genres: ['Test'],
      };
      service.create(movieInfo);

      const result = service.getOne(1);
      expect(result).toBeDefined(); // 값이 있는지 확인한다. (정확히는 undefined가 아닌지 체크)
    });

    it('한가지의 영화 정보를 가져오지 못할 때', () => {
      try {
        service.getOne(65536);
      } catch (e) {
        // 위의 65536번 영화정보를 가져오지 못하면 실행된다.
        expect(e).toBeInstanceOf(NotFoundException); // movies service에서 예외처리 형식을 그대로 사용하여 체크한다.
      }
    });
  });
  describe('update', () => {
    it('영화 정보 한가지만 수정하기', () => {
      const movieInfo = {
        name: '테스트용 영화정보',
        year: 2023,
        genres: ['Test'],
      };
      service.create(movieInfo);

      service.updateOne(1, { year: 2028 });
      const movie = service.getOne(1);
      expect(movie.year).toEqual(2028); // 변경 후 변경 값이 변경한 값과 같은지 체크.
    });

    it('한가지 영화 정보를 수정하지 못할 때', () => {
      try {
        service.updateOne(65536, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete', () => {
    it('영화 정보 하나만 삭제하기', () => {
      const movieInfo = {
        name: '테스트용 영화정보',
        year: 2023,
        genres: ['Test'],
      };
      service.create(movieInfo);

      const before = service.getAll().length;
      service.deleteOne(1);
      const after = service.getAll().length;
      expect(after).toBeLessThan(before); // 삭제 전 영화 정보 리스트가 삭제 후보다 작은지 체크.
    });

    it('한가지 영화 정보를 삭제하지 못할 때', () => {
      try {
        service.deleteOne(65536);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
