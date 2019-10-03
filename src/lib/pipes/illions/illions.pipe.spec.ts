import { IllionsPipe } from './illions.pipe';

describe('IllionsPipe', () => {
  let pipe: IllionsPipe;

  beforeEach(() => {
    pipe = new IllionsPipe();
  });

  test('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('is NaN function working', () => {
    expect(pipe.transform(NaN, 1)).toEqual('');
  });

  test('pipe not fails', () => {
    expect(pipe.transform(2, 1)).toEqual('$2');
    expect(pipe.transform(23, 1)).toEqual('$23');
    expect(pipe.transform(234, 1)).toEqual('$234');
    expect(pipe.transform(2345, 1)).toEqual('$2.3k');
    expect(pipe.transform(23456, 1)).toEqual('$23.5k');
    expect(pipe.transform(234567, 1)).toEqual('$234.6k');
    expect(pipe.transform(2345678, 1)).toEqual('$2.3M');
    expect(pipe.transform(23456789, 1)).toEqual('$23.5M');
    expect(pipe.transform(234567890, 1)).toEqual('$234.6M');
    expect(pipe.transform(2345678901, 1)).toEqual('$2.3B');
    expect(pipe.transform(23456789012, 1)).toEqual('$23.5B');
    expect(pipe.transform(234567890123, 1)).toEqual('$234.6B');
    expect(pipe.transform(2345678901234, 1)).toEqual('$2.3T');
    expect(pipe.transform(23456789012345, 1)).toEqual('$23.5T');
    expect(pipe.transform(234567890123456, 1)).toEqual('$234.6T');
    expect(pipe.transform(2345678901234567, 1)).toEqual('$2.3Q');
    expect(pipe.transform(23456789012345678, 1)).toEqual('$23.5Q');
    expect(pipe.transform(234567890123456789, 1)).toEqual('$234.6Q');
    expect(pipe.transform(2345678, 2)).toEqual('$2.35M');
    expect(pipe.transform(234567890123, 2)).toEqual('$234.57B');
    expect(pipe.transform(2345678, 3)).toEqual('$2.346M');
    expect(pipe.transform(234567890123, 3)).toEqual('$234.568B');
  });
});
