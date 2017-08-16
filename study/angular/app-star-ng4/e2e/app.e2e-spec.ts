import { AppStarNg4Page } from './app.po';

describe('app-star-ng4 App', () => {
  let page: AppStarNg4Page;

  beforeEach(() => {
    page = new AppStarNg4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
