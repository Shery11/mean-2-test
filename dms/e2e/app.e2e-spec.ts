import { DmsPage } from './app.po';

describe('dms App', () => {
  let page: DmsPage;

  beforeEach(() => {
    page = new DmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
