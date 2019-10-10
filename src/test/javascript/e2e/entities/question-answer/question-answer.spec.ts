// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { QuestionAnswerComponentsPage, /* QuestionAnswerDeleteDialog, */ QuestionAnswerUpdatePage } from './question-answer.page-object';

const expect = chai.expect;

describe('QuestionAnswer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let questionAnswerUpdatePage: QuestionAnswerUpdatePage;
  let questionAnswerComponentsPage: QuestionAnswerComponentsPage;
  /* let questionAnswerDeleteDialog: QuestionAnswerDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load QuestionAnswers', async () => {
    await navBarPage.goToEntity('question-answer');
    questionAnswerComponentsPage = new QuestionAnswerComponentsPage();
    await browser.wait(ec.visibilityOf(questionAnswerComponentsPage.title), 5000);
    expect(await questionAnswerComponentsPage.getTitle()).to.eq('learnportalApp.questionAnswer.home.title');
  });

  it('should load create QuestionAnswer page', async () => {
    await questionAnswerComponentsPage.clickOnCreateButton();
    questionAnswerUpdatePage = new QuestionAnswerUpdatePage();
    expect(await questionAnswerUpdatePage.getPageTitle()).to.eq('learnportalApp.questionAnswer.home.createOrEditLabel');
    await questionAnswerUpdatePage.cancel();
  });

  /*  it('should create and save QuestionAnswers', async () => {
        const nbButtonsBeforeCreate = await questionAnswerComponentsPage.countDeleteButtons();

        await questionAnswerComponentsPage.clickOnCreateButton();
        await promise.all([
            questionAnswerUpdatePage.setTextInput('text'),
            questionAnswerUpdatePage.questionSelectLastOption(),
        ]);
        expect(await questionAnswerUpdatePage.getTextInput()).to.eq('text', 'Expected Text value to be equals to text');
        const selectedCorrect = questionAnswerUpdatePage.getCorrectInput();
        if (await selectedCorrect.isSelected()) {
            await questionAnswerUpdatePage.getCorrectInput().click();
            expect(await questionAnswerUpdatePage.getCorrectInput().isSelected(), 'Expected correct not to be selected').to.be.false;
        } else {
            await questionAnswerUpdatePage.getCorrectInput().click();
            expect(await questionAnswerUpdatePage.getCorrectInput().isSelected(), 'Expected correct to be selected').to.be.true;
        }
        await questionAnswerUpdatePage.save();
        expect(await questionAnswerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await questionAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last QuestionAnswer', async () => {
        const nbButtonsBeforeDelete = await questionAnswerComponentsPage.countDeleteButtons();
        await questionAnswerComponentsPage.clickOnLastDeleteButton();

        questionAnswerDeleteDialog = new QuestionAnswerDeleteDialog();
        expect(await questionAnswerDeleteDialog.getDialogTitle())
            .to.eq('learnportalApp.questionAnswer.delete.question');
        await questionAnswerDeleteDialog.clickOnConfirmButton();

        expect(await questionAnswerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
