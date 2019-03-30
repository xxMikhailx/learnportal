import { element, by, ElementFinder } from 'protractor';

export class TheoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-theory div table .btn-danger'));
    title = element.all(by.css('jhi-theory div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TheoryUpdatePage {
    pageTitle = element(by.id('jhi-theory-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    contentInput = element(by.id('field_content'));
    categorySelect = element(by.id('field_category'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async categorySelectLastOption() {
        await this.categorySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async categorySelectOption(option) {
        await this.categorySelect.sendKeys(option);
    }

    getCategorySelect(): ElementFinder {
        return this.categorySelect;
    }

    async getCategorySelectedOption() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class TheoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-theory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-theory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
