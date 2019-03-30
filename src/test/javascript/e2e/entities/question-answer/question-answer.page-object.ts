import { element, by, ElementFinder } from 'protractor';

export class QuestionAnswerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-question-answer div table .btn-danger'));
    title = element.all(by.css('jhi-question-answer div h2#page-heading span')).first();

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

export class QuestionAnswerUpdatePage {
    pageTitle = element(by.id('jhi-question-answer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    textInput = element(by.id('field_text'));
    correctInput = element(by.id('field_correct'));
    questionSelect = element(by.id('field_question'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTextInput(text) {
        await this.textInput.sendKeys(text);
    }

    async getTextInput() {
        return this.textInput.getAttribute('value');
    }

    getCorrectInput() {
        return this.correctInput;
    }

    async questionSelectLastOption() {
        await this.questionSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async questionSelectOption(option) {
        await this.questionSelect.sendKeys(option);
    }

    getQuestionSelect(): ElementFinder {
        return this.questionSelect;
    }

    async getQuestionSelectedOption() {
        return this.questionSelect.element(by.css('option:checked')).getText();
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

export class QuestionAnswerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-questionAnswer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-questionAnswer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
