// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaskFindDataComponentsPage, /* TaskFindDataDeleteDialog, */ TaskFindDataUpdatePage } from './task-find-data.page-object';

const expect = chai.expect;

describe('TaskFindData e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskFindDataUpdatePage: TaskFindDataUpdatePage;
  let taskFindDataComponentsPage: TaskFindDataComponentsPage;
  /* let taskFindDataDeleteDialog: TaskFindDataDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TaskFindData', async () => {
    await navBarPage.goToEntity('task-find-data');
    taskFindDataComponentsPage = new TaskFindDataComponentsPage();
    await browser.wait(ec.visibilityOf(taskFindDataComponentsPage.title), 5000);
    expect(await taskFindDataComponentsPage.getTitle()).to.eq('learnportalApp.taskFindData.home.title');
  });

  it('should load create TaskFindData page', async () => {
    await taskFindDataComponentsPage.clickOnCreateButton();
    taskFindDataUpdatePage = new TaskFindDataUpdatePage();
    expect(await taskFindDataUpdatePage.getPageTitle()).to.eq('learnportalApp.taskFindData.home.createOrEditLabel');
    await taskFindDataUpdatePage.cancel();
  });

  /*  it('should create and save TaskFindData', async () => {
        const nbButtonsBeforeCreate = await taskFindDataComponentsPage.countDeleteButtons();

        await taskFindDataComponentsPage.clickOnCreateButton();
        await promise.all([
            taskFindDataUpdatePage.setContentInput('content'),
            taskFindDataUpdatePage.taskSelectLastOption(),
        ]);
        expect(await taskFindDataUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
        await taskFindDataUpdatePage.save();
        expect(await taskFindDataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await taskFindDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last TaskFindData', async () => {
        const nbButtonsBeforeDelete = await taskFindDataComponentsPage.countDeleteButtons();
        await taskFindDataComponentsPage.clickOnLastDeleteButton();

        taskFindDataDeleteDialog = new TaskFindDataDeleteDialog();
        expect(await taskFindDataDeleteDialog.getDialogTitle())
            .to.eq('learnportalApp.taskFindData.delete.question');
        await taskFindDataDeleteDialog.clickOnConfirmButton();

        expect(await taskFindDataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
