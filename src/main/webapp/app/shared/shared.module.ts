import { NgModule } from '@angular/core';
import { LearnportalSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { JhiAlertComponent } from './alert/alert.component';
import { JhiAlertErrorComponent } from './alert/alert-error.component';
import { JhiLoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from 'app/pipes/safe-html.pipe';

@NgModule({
  imports: [RouterModule, LearnportalSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, JhiAlertComponent, JhiAlertErrorComponent, JhiLoginModalComponent, HasAnyAuthorityDirective, SafeHtmlPipe],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    LearnportalSharedLibsModule,
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    SafeHtmlPipe
  ]
})
export class LearnportalSharedModule {}
