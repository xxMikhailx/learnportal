import { element, by, ElementFinder } from 'protractor';

export class TaskComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-task div table .btn-danger'));
    title = element.all(by.css('jhi-task div h2#page-heading span')).first();

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

export class TaskUpdatePage {
    pageTitle = element(by.id('jhi-task-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    shortDescriptionInput = element(by.id('field_shortDescription'));
    taskDescriptionInput = element(by.id('field_taskDescription'));
    solutionInput = element(by.id('field_solution'));
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

    async setShortDescriptionInput(shortDescription) {
        await this.shortDescriptionInput.sendKeys(shortDescription);
    }

    async getShortDescriptionInput() {
        return this.shortDescriptionInput.getAttribute('value');
    }

    async setTaskDescriptionInput(taskDescription) {
        await this.taskDescriptionInput.sendKeys(taskDescription);
    }

    async getTaskDescriptionInput() {
        return this.taskDescriptionInput.getAttribute('value');
    }

    async setSolutionInput(solution) {
        await this.solutionInput.sendKeys(solution);
    }

    async getSolutionInput() {
        return this.solutionInput.getAttribute('value');
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

export class TaskDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-task-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-task'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
