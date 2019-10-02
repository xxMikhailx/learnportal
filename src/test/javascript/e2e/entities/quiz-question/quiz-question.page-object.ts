import { element, by, ElementFinder } from 'protractor';

export class QuizQuestionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-quiz-question div table .btn-danger'));
  title = element.all(by.css('jhi-quiz-question div h2#page-heading span')).first();

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

export class QuizQuestionUpdatePage {
  pageTitle = element(by.id('jhi-quiz-question-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  textInput = element(by.id('field_text'));
  descriptionInput = element(by.id('field_description'));
  quizSelect = element(by.id('field_quiz'));

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

  async quizSelectLastOption(timeout?: number) {
    await this.quizSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async quizSelectOption(option) {
    await this.quizSelect.sendKeys(option);
  }

  getQuizSelect(): ElementFinder {
    return this.quizSelect;
  }

  async getQuizSelectedOption() {
    return await this.quizSelect.element(by.css('option:checked')).getText();
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

export class QuizQuestionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-quizQuestion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-quizQuestion'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
