import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TranslateLoader as SharedCoreTranslateLoader,
  TranslateModule as SharedCoreTranslateModule,
} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
export function HttpLoaderFactory(
  http: HttpClient,
  sourceModule?: string
): TranslateHttpLoader {
  const prefix = sourceModule
    ? `./assets/i18n/${sourceModule}/`
    : './assets/i18n/';

  console.log(prefix);
  return new TranslateHttpLoader(
    http,
    prefix,
    '.json?cacheBusting=' + new Date().getTime()
  );
}

@NgModule({
  imports: [
    CommonModule,
    SharedCoreTranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: SharedCoreTranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [SharedCoreTranslateModule],
  declarations: [],
})
export class TranslateModule {
  /**
   * Use in your root module to provide the TranslateService.
   */
  public static forRoot(
    defaultLanguage: string,
    languageOptions: any
  ): ModuleWithProviders<TranslateModule> {
    return {
      ngModule: TranslateModule,
      providers: [
        {
          provide: 'defaultLanguage',
          useFactory: () => defaultLanguage,
        },
        {
          provide: 'languageOptions',
          useValue: languageOptions,
        },
      ],
    };
  }

  /**
   * Use in none root modules to import directive|pipe.
   */
  public static forChild(
    sourceModule?: string
  ): ModuleWithProviders<TranslateModule> {
    return SharedCoreTranslateModule.forChild({
      loader: {
        provide: SharedCoreTranslateLoader,
        useFactory: (http: HttpClient) => HttpLoaderFactory(http, sourceModule),
        deps: [HttpClient],
      },
      extend: true,
      isolate: false,
    });
  }
}
