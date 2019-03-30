/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TheoryComponentsPage, TheoryDeleteDialog, TheoryUpdatePage } from './theory.page-object';

const expect = chai.expect;

describe('Theory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let theoryUpdatePage: TheoryUpdatePage;
    let theoryComponentsPage: TheoryComponentsPage;
    let theoryDeleteDialog: TheoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Theories', async () => {
        await navBarPage.goToEntity('theory');
        theoryComponentsPage = new TheoryComponentsPage();
        await browser.wait(ec.visibilityOf(theoryComponentsPage.title), 5000);
        expect(await theoryComponentsPage.getTitle()).to.eq('learnportalApp.theory.home.title');
    });

    it('should load create Theory page', async () => {
        await theoryComponentsPage.clickOnCreateButton();
        theoryUpdatePage = new TheoryUpdatePage();
        expect(await theoryUpdatePage.getPageTitle()).to.eq('learnportalApp.theory.home.createOrEditLabel');
        await theoryUpdatePage.cancel();
    });

    it('should create and save Theories', async () => {
        const nbButtonsBeforeCreate = await theoryComponentsPage.countDeleteButtons();

        await theoryComponentsPage.clickOnCreateButton();
        await promise.all([
            theoryUpdatePage.setTitleInput('title'),
            theoryUpdatePage.setDescriptionInput('description'),
            theoryUpdatePage.setContentInput('content'),
            theoryUpdatePage.categorySelectLastOption()
        ]);
        expect(await theoryUpdatePage.getTitleInput()).to.eq('title');
        expect(await theoryUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await theoryUpdatePage.getContentInput()).to.eq('content');
        await theoryUpdatePage.save();
        expect(await theoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await theoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Theory', async () => {
        const nbButtonsBeforeDelete = await theoryComponentsPage.countDeleteButtons();
        await theoryComponentsPage.clickOnLastDeleteButton();

        theoryDeleteDialog = new TheoryDeleteDialog();
        expect(await theoryDeleteDialog.getDialogTitle()).to.eq('learnportalApp.theory.delete.question');
        await theoryDeleteDialog.clickOnConfirmButton();

        expect(await theoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
