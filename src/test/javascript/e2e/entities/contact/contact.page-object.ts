import { element, by, ElementFinder } from 'protractor';

export class ContactComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-contact div table .btn-danger'));
  title = element.all(by.css('jhi-contact div h2#page-heading span')).first();

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

export class ContactUpdatePage {
  pageTitle = element(by.id('jhi-contact-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  textInput = element(by.id('field_text'));
  descriptionInput = element(by.id('field_description'));
  contactTypeSelect = element(by.id('field_contactType'));
  mainPageSelect = element(by.id('field_mainPage'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTextInput(text) {
    await this.textInput.sendKeys(text);
  }

  async getTextInput() {
    return await this.textInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setContactTypeSelect(contactType) {
    await this.contactTypeSelect.sendKeys(contactType);
  }

  async getContactTypeSelect() {
    return await this.contactTypeSelect.element(by.css('option:checked')).getText();
  }

  async contactTypeSelectLastOption(timeout?: number) {
    await this.contactTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mainPageSelectLastOption(timeout?: number) {
    await this.mainPageSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async mainPageSelectOption(option) {
    await this.mainPageSelect.sendKeys(option);
  }

  getMainPageSelect(): ElementFinder {
    return this.mainPageSelect;
  }

  async getMainPageSelectedOption() {
    return await this.mainPageSelect.element(by.css('option:checked')).getText();
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

export class ContactDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-contact-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-contact'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
