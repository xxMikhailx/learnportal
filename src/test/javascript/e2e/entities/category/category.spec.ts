// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CategoryComponentsPage, CategoryDeleteDialog, CategoryUpdatePage } from './category.page-object';

const expect = chai.expect;

describe('Category e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let categoryUpdatePage: CategoryUpdatePage;
  let categoryComponentsPage: CategoryComponentsPage;
  let categoryDeleteDialog: CategoryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Categories', async () => {
    await navBarPage.goToEntity('category');
    categoryComponentsPage = new CategoryComponentsPage();
    await browser.wait(ec.visibilityOf(categoryComponentsPage.title), 5000);
    expect(await categoryComponentsPage.getTitle()).to.eq('learnportalApp.category.home.title');
  });

  it('should load create Category page', async () => {
    await categoryComponentsPage.clickOnCreateButton();
    categoryUpdatePage = new CategoryUpdatePage();
    expect(await categoryUpdatePage.getPageTitle()).to.eq('learnportalApp.category.home.createOrEditLabel');
    await categoryUpdatePage.cancel();
  });

  it('should create and save Categories', async () => {
    const nbButtonsBeforeCreate = await categoryComponentsPage.countDeleteButtons();

    await categoryComponentsPage.clickOnCreateButton();
    await promise.all([categoryUpdatePage.setShortNameInput('shortName'), categoryUpdatePage.setFullNameInput('fullName')]);
    expect(await categoryUpdatePage.getShortNameInput()).to.eq('shortName', 'Expected ShortName value to be equals to shortName');
    expect(await categoryUpdatePage.getFullNameInput()).to.eq('fullName', 'Expected FullName value to be equals to fullName');
    await categoryUpdatePage.save();
    expect(await categoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await categoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Category', async () => {
    const nbButtonsBeforeDelete = await categoryComponentsPage.countDeleteButtons();
    await categoryComponentsPage.clickOnLastDeleteButton();

    categoryDeleteDialog = new CategoryDeleteDialog();
    expect(await categoryDeleteDialog.getDialogTitle()).to.eq('learnportalApp.category.delete.question');
    await categoryDeleteDialog.clickOnConfirmButton();

    expect(await categoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
