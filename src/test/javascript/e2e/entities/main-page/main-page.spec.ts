// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MainPageComponentsPage, MainPageDeleteDialog, MainPageUpdatePage } from './main-page.page-object';

const expect = chai.expect;

describe('MainPage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let mainPageUpdatePage: MainPageUpdatePage;
  let mainPageComponentsPage: MainPageComponentsPage;
  let mainPageDeleteDialog: MainPageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load MainPages', async () => {
    await navBarPage.goToEntity('main-page');
    mainPageComponentsPage = new MainPageComponentsPage();
    await browser.wait(ec.visibilityOf(mainPageComponentsPage.title), 5000);
    expect(await mainPageComponentsPage.getTitle()).to.eq('learnportalApp.mainPage.home.title');
  });

  it('should load create MainPage page', async () => {
    await mainPageComponentsPage.clickOnCreateButton();
    mainPageUpdatePage = new MainPageUpdatePage();
    expect(await mainPageUpdatePage.getPageTitle()).to.eq('learnportalApp.mainPage.home.createOrEditLabel');
    await mainPageUpdatePage.cancel();
  });

  it('should create and save MainPages', async () => {
    const nbButtonsBeforeCreate = await mainPageComponentsPage.countDeleteButtons();

    await mainPageComponentsPage.clickOnCreateButton();
    await promise.all([mainPageUpdatePage.setContentInput('content'), mainPageUpdatePage.setMottoInput('motto')]);
    expect(await mainPageUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await mainPageUpdatePage.getMottoInput()).to.eq('motto', 'Expected Motto value to be equals to motto');
    await mainPageUpdatePage.save();
    expect(await mainPageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await mainPageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last MainPage', async () => {
    const nbButtonsBeforeDelete = await mainPageComponentsPage.countDeleteButtons();
    await mainPageComponentsPage.clickOnLastDeleteButton();

    mainPageDeleteDialog = new MainPageDeleteDialog();
    expect(await mainPageDeleteDialog.getDialogTitle()).to.eq('learnportalApp.mainPage.delete.question');
    await mainPageDeleteDialog.clickOnConfirmButton();

    expect(await mainPageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
