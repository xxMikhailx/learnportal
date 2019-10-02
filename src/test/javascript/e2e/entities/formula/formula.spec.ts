/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FormulaComponentsPage, FormulaDeleteDialog, FormulaUpdatePage } from './formula.page-object';

const expect = chai.expect;

describe('Formula e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let formulaUpdatePage: FormulaUpdatePage;
    let formulaComponentsPage: FormulaComponentsPage;
    let formulaDeleteDialog: FormulaDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Formulas', async () => {
        await navBarPage.goToEntity('formula');
        formulaComponentsPage = new FormulaComponentsPage();
        await browser.wait(ec.visibilityOf(formulaComponentsPage.title), 5000);
        expect(await formulaComponentsPage.getTitle()).to.eq('learnportalApp.formula.home.title');
    });

    it('should load create Formula page', async () => {
        await formulaComponentsPage.clickOnCreateButton();
        formulaUpdatePage = new FormulaUpdatePage();
        expect(await formulaUpdatePage.getPageTitle()).to.eq('learnportalApp.formula.home.createOrEditLabel');
        await formulaUpdatePage.cancel();
    });

    it('should create and save Formulas', async () => {
        const nbButtonsBeforeCreate = await formulaComponentsPage.countDeleteButtons();

        await formulaComponentsPage.clickOnCreateButton();
        await promise.all([
            formulaUpdatePage.setTitleInput('title'),
            formulaUpdatePage.setDescriptionInput('description'),
            formulaUpdatePage.setEquationInput('equation'),
            formulaUpdatePage.categorySelectLastOption()
        ]);
        expect(await formulaUpdatePage.getTitleInput()).to.eq('title');
        expect(await formulaUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await formulaUpdatePage.getEquationInput()).to.eq('equation');
        await formulaUpdatePage.save();
        expect(await formulaUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await formulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Formula', async () => {
        const nbButtonsBeforeDelete = await formulaComponentsPage.countDeleteButtons();
        await formulaComponentsPage.clickOnLastDeleteButton();

        formulaDeleteDialog = new FormulaDeleteDialog();
        expect(await formulaDeleteDialog.getDialogTitle()).to.eq('learnportalApp.formula.delete.question');
        await formulaDeleteDialog.clickOnConfirmButton();

        expect(await formulaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
