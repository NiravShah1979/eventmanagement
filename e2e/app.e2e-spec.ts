import { SamplerestaurantPage } from './app.po';

describe('samplerestaurant App', () => {
  let page: SamplerestaurantPage;

  beforeEach(() => {
    page = new SamplerestaurantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
