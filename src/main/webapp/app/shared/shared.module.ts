import { NgModule } from '@angular/core';
import { LearnportalSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';
import { CategoryComponent } from 'app/entities/category/category.component';
import { TheoryComponent } from 'app/entities/theory/theory.component';
import { FormulaComponent } from 'app/entities/formula/formula.component';
import { QuizComponent } from 'app/entities/quiz/quiz.component';
import { TaskComponent } from 'app/entities/task/task.component';
import { DeckComponent } from 'app/entities/deck/deck.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { RecommendedLinksComponent } from './common/recommended-links/recommended-links.component';

@NgModule({
  imports: [RouterModule, LearnportalSharedLibsModule, RichTextEditorAllModule],
  declarations: [
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    SafeHtmlPipe,
    CategoryComponent,
    TheoryComponent,
    FormulaComponent,
    QuizComponent,
    TaskComponent,
    DeckComponent,
    RecommendedLinksComponent
  ],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    LearnportalSharedLibsModule,
    RichTextEditorAllModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    SafeHtmlPipe,
    HasAnyAuthorityDirective,
    CategoryComponent,
    TheoryComponent,
    FormulaComponent,
    QuizComponent,
    TaskComponent,
    DeckComponent,
    RecommendedLinksComponent
  ]
})
export class LearnportalSharedModule {}
