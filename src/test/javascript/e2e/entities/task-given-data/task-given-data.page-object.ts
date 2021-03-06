import { element, by, ElementFinder } from 'protractor';

export class TaskGivenDataComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-task-given-data div table .btn-danger'));
  title = element.all(by.css('jhi-task-given-data div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
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
    return await this.contentInput.getAttribute('value');
  }

  async taskSelectLastOption(timeout?: number) {
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
    return await this.taskSelect.element(by.css('option:checked')).getText();
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
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

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
