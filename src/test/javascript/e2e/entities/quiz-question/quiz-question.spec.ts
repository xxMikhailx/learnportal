/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuizQuestionComponentsPage, QuizQuestionDeleteDialog, QuizQuestionUpdatePage } from './quiz-question.page-object';

const expect = chai.expect;

describe('QuizQuestion e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let quizQuestionUpdatePage: QuizQuestionUpdatePage;
    let quizQuestionComponentsPage: QuizQuestionComponentsPage;
    let quizQuestionDeleteDialog: QuizQuestionDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load QuizQuestions', async () => {
        await navBarPage.goToEntity('quiz-question');
        quizQuestionComponentsPage = new QuizQuestionComponentsPage();
        await browser.wait(ec.visibilityOf(quizQuestionComponentsPage.title), 5000);
        expect(await quizQuestionComponentsPage.getTitle()).to.eq('learnportalApp.quizQuestion.home.title');
    });

    it('should load create QuizQuestion page', async () => {
        await quizQuestionComponentsPage.clickOnCreateButton();
        quizQuestionUpdatePage = new QuizQuestionUpdatePage();
        expect(await quizQuestionUpdatePage.getPageTitle()).to.eq('learnportalApp.quizQuestion.home.createOrEditLabel');
        await quizQuestionUpdatePage.cancel();
    });

    it('should create and save QuizQuestions', async () => {
        const nbButtonsBeforeCreate = await quizQuestionComponentsPage.countDeleteButtons();

        await quizQuestionComponentsPage.clickOnCreateButton();
        await promise.all([
            quizQuestionUpdatePage.setTextInput('text'),
            quizQuestionUpdatePage.setDescriptionInput('description'),
            quizQuestionUpdatePage.quizSelectLastOption()
        ]);
        expect(await quizQuestionUpdatePage.getTextInput()).to.eq('text');
        expect(await quizQuestionUpdatePage.getDescriptionInput()).to.eq('description');
        await quizQuestionUpdatePage.save();
        expect(await quizQuestionUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await quizQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last QuizQuestion', async () => {
        const nbButtonsBeforeDelete = await quizQuestionComponentsPage.countDeleteButtons();
        await quizQuestionComponentsPage.clickOnLastDeleteButton();

        quizQuestionDeleteDialog = new QuizQuestionDeleteDialog();
        expect(await quizQuestionDeleteDialog.getDialogTitle()).to.eq('learnportalApp.quizQuestion.delete.question');
        await quizQuestionDeleteDialog.clickOnConfirmButton();

        expect(await quizQuestionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
