import { AuditViewPage } from './app.po';

describe('audit-view App', function() {
  let page: AuditViewPage;

  beforeEach(() => {
    page = new AuditViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
