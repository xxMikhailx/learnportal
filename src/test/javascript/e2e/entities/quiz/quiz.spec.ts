/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { QuizComponentsPage, QuizDeleteDialog, QuizUpdatePage } from './quiz.page-object';

const expect = chai.expect;

describe('Quiz e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let quizUpdatePage: QuizUpdatePage;
    let quizComponentsPage: QuizComponentsPage;
    let quizDeleteDialog: QuizDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Quizzes', async () => {
        await navBarPage.goToEntity('quiz');
        quizComponentsPage = new QuizComponentsPage();
        await browser.wait(ec.visibilityOf(quizComponentsPage.title), 5000);
        expect(await quizComponentsPage.getTitle()).to.eq('learnportalApp.quiz.home.title');
    });

    it('should load create Quiz page', async () => {
        await quizComponentsPage.clickOnCreateButton();
        quizUpdatePage = new QuizUpdatePage();
        expect(await quizUpdatePage.getPageTitle()).to.eq('learnportalApp.quiz.home.createOrEditLabel');
        await quizUpdatePage.cancel();
    });

    it('should create and save Quizzes', async () => {
        const nbButtonsBeforeCreate = await quizComponentsPage.countDeleteButtons();

        await quizComponentsPage.clickOnCreateButton();
        await promise.all([
            quizUpdatePage.setTitleInput('title'),
            quizUpdatePage.setDescriptionInput('description'),
            quizUpdatePage.categorySelectLastOption()
        ]);
        expect(await quizUpdatePage.getTitleInput()).to.eq('title');
        expect(await quizUpdatePage.getDescriptionInput()).to.eq('description');
        await quizUpdatePage.save();
        expect(await quizUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await quizComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Quiz', async () => {
        const nbButtonsBeforeDelete = await quizComponentsPage.countDeleteButtons();
        await quizComponentsPage.clickOnLastDeleteButton();

        quizDeleteDialog = new QuizDeleteDialog();
        expect(await quizDeleteDialog.getDialogTitle()).to.eq('learnportalApp.quiz.delete.question');
        await quizDeleteDialog.clickOnConfirmButton();

        expect(await quizComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
