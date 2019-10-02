// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaskGivenDataComponentsPage, TaskGivenDataDeleteDialog, TaskGivenDataUpdatePage } from './task-given-data.page-object';

const expect = chai.expect;

describe('TaskGivenData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskGivenDataUpdatePage: TaskGivenDataUpdatePage;
  let taskGivenDataComponentsPage: TaskGivenDataComponentsPage;
  let taskGivenDataDeleteDialog: TaskGivenDataDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TaskGivenData', async () => {
    await navBarPage.goToEntity('task-given-data');
    taskGivenDataComponentsPage = new TaskGivenDataComponentsPage();
    await browser.wait(ec.visibilityOf(taskGivenDataComponentsPage.title), 5000);
    expect(await taskGivenDataComponentsPage.getTitle()).to.eq('learnportalApp.taskGivenData.home.title');
  });

  it('should load create TaskGivenData page', async () => {
    await taskGivenDataComponentsPage.clickOnCreateButton();
    taskGivenDataUpdatePage = new TaskGivenDataUpdatePage();
    expect(await taskGivenDataUpdatePage.getPageTitle()).to.eq('learnportalApp.taskGivenData.home.createOrEditLabel');
    await taskGivenDataUpdatePage.cancel();
  });

  it('should create and save TaskGivenData', async () => {
    const nbButtonsBeforeCreate = await taskGivenDataComponentsPage.countDeleteButtons();

    await taskGivenDataComponentsPage.clickOnCreateButton();
    await promise.all([taskGivenDataUpdatePage.setContentInput('content'), taskGivenDataUpdatePage.taskSelectLastOption()]);
    expect(await taskGivenDataUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    await taskGivenDataUpdatePage.save();
    expect(await taskGivenDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await taskGivenDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TaskGivenData', async () => {
    const nbButtonsBeforeDelete = await taskGivenDataComponentsPage.countDeleteButtons();
    await taskGivenDataComponentsPage.clickOnLastDeleteButton();

    taskGivenDataDeleteDialog = new TaskGivenDataDeleteDialog();
    expect(await taskGivenDataDeleteDialog.getDialogTitle()).to.eq('learnportalApp.taskGivenData.delete.question');
    await taskGivenDataDeleteDialog.clickOnConfirmButton();

    expect(await taskGivenDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
