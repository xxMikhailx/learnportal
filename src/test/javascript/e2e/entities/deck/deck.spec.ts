/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeckComponentsPage, DeckDeleteDialog, DeckUpdatePage } from './deck.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Deck e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let deckUpdatePage: DeckUpdatePage;
    let deckComponentsPage: DeckComponentsPage;
    let deckDeleteDialog: DeckDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Decks', async () => {
        await navBarPage.goToEntity('deck');
        deckComponentsPage = new DeckComponentsPage();
        await browser.wait(ec.visibilityOf(deckComponentsPage.title), 5000);
        expect(await deckComponentsPage.getTitle()).to.eq('learnportalApp.deck.home.title');
    });

    it('should load create Deck page', async () => {
        await deckComponentsPage.clickOnCreateButton();
        deckUpdatePage = new DeckUpdatePage();
        expect(await deckUpdatePage.getPageTitle()).to.eq('learnportalApp.deck.home.createOrEditLabel');
        await deckUpdatePage.cancel();
    });

    it('should create and save Decks', async () => {
        const nbButtonsBeforeCreate = await deckComponentsPage.countDeleteButtons();

        await deckComponentsPage.clickOnCreateButton();
        await promise.all([
            deckUpdatePage.setTitleInput('title'),
            deckUpdatePage.setDescriptionInput('description'),
            deckUpdatePage.setDeckInput(absolutePath),
            deckUpdatePage.categorySelectLastOption()
        ]);
        expect(await deckUpdatePage.getTitleInput()).to.eq('title');
        expect(await deckUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await deckUpdatePage.getDeckInput()).to.endsWith(fileNameToUpload);
        await deckUpdatePage.save();
        expect(await deckUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await deckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Deck', async () => {
        const nbButtonsBeforeDelete = await deckComponentsPage.countDeleteButtons();
        await deckComponentsPage.clickOnLastDeleteButton();

        deckDeleteDialog = new DeckDeleteDialog();
        expect(await deckDeleteDialog.getDialogTitle()).to.eq('learnportalApp.deck.delete.question');
        await deckDeleteDialog.clickOnConfirmButton();

        expect(await deckComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
