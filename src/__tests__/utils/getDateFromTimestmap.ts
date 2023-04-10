import getDate from '../../utils/getDateFromTimestamp';

describe('getDate', () => {
  it('returns formatted date when given a valid timestamp', () => {
    const timestamp = '1618055400000'; // April 10, 2021
    const formattedDate = getDate(timestamp);
    const expected = new Date(timestamp).toLocaleDateString();

    expect(formattedDate).toBe(expected);
  });

  it('returns original label when given an invalid timestamp', () => {
    const label = 'Invalid timestamp';
    const formattedDate = getDate(label);
    expect(formattedDate).toBe(label);
  });
});
