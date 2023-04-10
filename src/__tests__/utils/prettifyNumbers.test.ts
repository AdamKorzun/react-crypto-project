import { prettifyNumber } from '../../utils/prettifyNumbers';

describe('prettifyNumber', () => {
  it('should return the input string when input is a string that cannot be converted to a number', () => {
    expect(prettifyNumber('foo')).toEqual('foo');
    expect(prettifyNumber('1foo')).toEqual('1foo');
    expect(prettifyNumber('foo1')).toEqual('foo1');
    expect(prettifyNumber('1.2.3')).toEqual('1.2.3');
  });

  it('should return the input number when input is a valid number within the maxLength', () => {
    expect(prettifyNumber(0)).toEqual('0');
    expect(prettifyNumber(123)).toEqual('123');
    expect(prettifyNumber(-123)).toEqual('-123');
    expect(prettifyNumber(999)).toEqual('1K');
    expect(prettifyNumber(-999)).toEqual('-1K');
    expect(prettifyNumber(999999)).toEqual('1M');
    expect(prettifyNumber(-999999)).toEqual('-1M');
  });

  it('should return a truncated number with the appropriate abbreviation when input exceeds the maxLength', () => {
    expect(prettifyNumber(1000)).toEqual('1K');
    expect(prettifyNumber(-1000)).toEqual('-1K');
    expect(prettifyNumber(12345)).toEqual('12.3K');
    expect(prettifyNumber(-12345)).toEqual('-12.3K');
    expect(prettifyNumber(123456789)).toEqual('123.5M');
    expect(prettifyNumber(-123456789)).toEqual('-123.5M');
    expect(prettifyNumber(123456789000)).toEqual('123.5B');
    expect(prettifyNumber(-123456789000)).toEqual('-123.5B');
    expect(prettifyNumber(123456789000000)).toEqual('123.5T');
    expect(prettifyNumber(-123456789000000)).toEqual('-123.5T');
    expect(prettifyNumber(123456789000000000)).toEqual('123.5Q');
    expect(prettifyNumber(-123456789000000000)).toEqual('-123.5Q');
  });
});
