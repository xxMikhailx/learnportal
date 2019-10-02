import { element, by, ElementFinder } from 'protractor';

export class TaskGivenDataComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-task-given-data div table .btn-danger'));
    title = element.all(by.css('jhi-task-given-data div h2#page-heading span')).first();

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

export class TaskGivenDataUpdatePage {
    pageTitle = element(by.id('jhi-task-given-data-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    contentInput = element(by.id('field_content'));
    taskSelect = element(by.id('field_task'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async taskSelectLastOption() {
        await this.taskSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async taskSelectOption(option) {
        await this.taskSelect.sendKeys(option);
    }

    getTaskSelect(): ElementFinder {
        return this.taskSelect;
    }

    async getTaskSelectedOption() {
        return this.taskSelect.element(by.css('option:checked')).getText();
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

export class TaskGivenDataDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-taskGivenData-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-taskGivenData'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
