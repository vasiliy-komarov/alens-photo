import {App} from '../../src/pages/main-page/app';

describe('the app', () => {
  it('says hello', () => {
    expect(new App().message).toBe('Hello World!');
  });
});
