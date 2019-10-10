// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TaskComponentsPage, /* TaskDeleteDialog, */ TaskUpdatePage } from './task.page-object';

const expect = chai.expect;

describe('Task e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskUpdatePage: TaskUpdatePage;
  let taskComponentsPage: TaskComponentsPage;
  /* let taskDeleteDialog: TaskDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tasks', async () => {
    await navBarPage.goToEntity('task');
    taskComponentsPage = new TaskComponentsPage();
    await browser.wait(ec.visibilityOf(taskComponentsPage.title), 5000);
    expect(await taskComponentsPage.getTitle()).to.eq('learnportalApp.task.home.title');
  });

  it('should load create Task page', async () => {
    await taskComponentsPage.clickOnCreateButton();
    taskUpdatePage = new TaskUpdatePage();
    expect(await taskUpdatePage.getPageTitle()).to.eq('learnportalApp.task.home.createOrEditLabel');
    await taskUpdatePage.cancel();
  });

  /*  it('should create and save Tasks', async () => {
        const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();

        await taskComponentsPage.clickOnCreateButton();
        await promise.all([
            taskUpdatePage.setTitleInput('title'),
            taskUpdatePage.setShortDescriptionInput('shortDescription'),
            taskUpdatePage.setTaskDescriptionInput('taskDescription'),
            taskUpdatePage.setSolutionInput('solution'),
            taskUpdatePage.categorySelectLastOption(),
        ]);
        expect(await taskUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
        expect(await taskUpdatePage.getShortDescriptionInput()).to.eq('shortDescription', 'Expected ShortDescription value to be equals to shortDescription');
        expect(await taskUpdatePage.getTaskDescriptionInput()).to.eq('taskDescription', 'Expected TaskDescription value to be equals to taskDescription');
        expect(await taskUpdatePage.getSolutionInput()).to.eq('solution', 'Expected Solution value to be equals to solution');
        await taskUpdatePage.save();
        expect(await taskUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Task', async () => {
        const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
        await taskComponentsPage.clickOnLastDeleteButton();

        taskDeleteDialog = new TaskDeleteDialog();
        expect(await taskDeleteDialog.getDialogTitle())
            .to.eq('learnportalApp.task.delete.question');
        await taskDeleteDialog.clickOnConfirmButton();

        expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
