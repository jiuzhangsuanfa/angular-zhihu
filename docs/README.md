# 开发日志

## 1 启用 Angular Material 支持

```shell
ng add @angular/material
```

### 1.1 设置字体

```scss
$custom-typography: mat-typography-config(
  $font-family: '"Fira Code", "Microsoft Yahei", "PingFangSC-Regular", sans-serif',
  $display-4: mat-typography-level(112px, 112px, 300),
  $display-3: mat-typography-level(56px, 56px, 400),
  $display-2: mat-typography-level(45px, 48px, 400),
  $display-1: mat-typography-level(34px, 40px, 400),
  $headline: mat-typography-level(24px, 32px, 400),
  $title: mat-typography-level(20px, 32px, 500),
  $subheading-2: mat-typography-level(16px, 28px, 400),
  $subheading-1: mat-typography-level(14px, 24px, 400),
  $body-1: mat-typography-level(13px, 20px, 400),
  $body-2: mat-typography-level(13px, 24px, 500),
  $caption: mat-typography-level(10px, 20px, 400),
  $button: mat-typography-level(13px, 12px, 500),
  $input: mat-typography-level(inherit, 1.125, 400)
);
```

### 1.2 设置主题

```scss
@import '~@angular/material/theming';

$zhihu-primary: mat-palette($mat-blue);
$zhihu-accent : mat-palette($mat-pink, A200, A100, A400);
$zhihu-warn: mat-palette($mat-red);
$zhihu-theme: mat-light-theme((color: (primary: $zhihu-primary,
      accent: $zhihu-accent,
      warn: $zhihu-warn,
    )));
@include angular-material-theme($zhihu-theme);
```

### 1.3 设置下划线动画（可选）

```scss
a,
a:link,
a:active,
a:visited {
  position       : relative;
  color          : #3298db;
  text-decoration: none;
  transition     : color 0.3s ease-in-out;
}

a:hover {
  color: #0180d4;
}

a.animation::after {
  content: '';

  width   : 100%;
  height  : 0.05rem;
  position: absolute;
  bottom  : -0.05rem;
  left    : 0;

  background-color: currentColor;
  transform       : scaleX(0);
  transform-origin: left;
  transition      : all .35s;
}

a.animation:hover::after {
  transform       : scale(1);
  transform-origin: right;
}
```

## 2 配置 Router

### 2.1 创建 Routing Module

```shell
ng g m app-routing --flat
```

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 3 模块设计

### 3.1 问答模块

**创建 Module**

```shell
ng g m question --routing
```

```typescript
// src/app/app-routing.module.ts
const routes: Routes = [
  {
    path: 'question',
    loadChildren: () => import('./question/question.module')
      .then(({ QuestionModule }) => QuestionModule)
  },
];
```

**创建 API Service**

```shell
ng g s question/services/question-api
```

#### 3.1.1 问题列表 Component

##### 创建 Component

```shell
ng g c question/components/question-list
```

##### API 接口

```http
GET api/questions
```

#### 3.1.2 问题详情 Component

```http
GET api/questions/:id
```

##### 有意义提问 Action

```http
PUT api/votes?action=approve&question=<number>
```

取消

```http
DELETE api/votes?action=approve&question=<number>
```

##### 无意义提问 Action

```http
PUT api/votes?action=oppose&question=<number>
```

取消

```http
DELETE api/votes?action=oppose&question=<number>
```

#### 3.1.3 回答列表 Component

```shell
ng g c question/components/question-card
ng g c question/components/question-list
```

```http
GET api/answers?question=<number>
```

#### 3.1.4 问题编辑详情页 Component

```http
POST api/questions
```

### 3.2 回答模块

```shell
ng g m answer --routing && ng g c answer
```

#### 3.2.1 回答详情 Component

```http
GET api/answers/:id
```

**赞同回答 Action**

```http
PUT api/votes?action=approve&answer=<number>
```

**反对回答 Action**

```http
PUT api/votes?action=oppose&answer=<number>
```

#### 3.2.2 添加回答 Component

```http
POST api/answers?question=<number>
```

### 3.3 用户模块

```shell
ng g m user --routing && ng g c user
```

#### 3.3.1 用户详情

```http
GET api/users/:id
```

#### 3.3.2 修改用户信息

```http
PATCH api/users/:id
```

#### 3.3.3 登录用户

```http
POST api/signin
```

#### 3.3.4 注册用户

```http
POST api/signup
```

#### 3.3.5 注销登录

```http
DELETE api/signout
```

### 3.4 通用模块

#### 3.4.1 创建共享模块

```shell
ng g m common/modules/shared --flat
```

```typescript
// src/app/common/modules/shared.module.ts
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
  ],
})
export class SharedModule { }
```

#### 3.4.2 创建 Material Shared Module

```shell
ng g m common/modules/material --flat
```

```typescript
// src/app/common/modules/material.module.ts
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
/**
 * NgModule that includes all Material modules.
*/
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    // Material
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
})
export class MaterialModule { }

```

并在各个模块中导入。

#### 3.4.3 创建管道

```shell
ng g p common/pipes/readify/readify
```

```typescript
// src/app/common/pipes/readify.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'readify' })
export class ReadifyPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return '0';
    }
    if (value < 10000) {
      return Math.floor(value).toFixed(0);
    }
    if (value < 10000 * 10000) {
      return (Math.floor(value / 10000 * 10) / 10).toFixed(1).replace('.0', '') + ' 万';
    }
    return (Math.floor(value / 10000 / 10000 * 10) / 10).toFixed(1).replace('.0', '') + ' 亿';
  }

}
```

## 4 启用 Mock API Server

### 4.1 创建拦截器

```shell
ng g m common/modules/mock-api --flat
ng g interceptor common/interceptors/mock-api
```

```typescript
// src/app/common/interceptors/mock-api.interceptor.ts
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { asapScheduler, Observable, scheduled } from 'rxjs';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isDevMode()) {
      console.log(request);
      return scheduled([new HttpResponse({ body: {} })], asapScheduler);
    }
    return next.handle(request);
  }

}
```

```typescript
// src/app/common/modules/mock-api.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MockApiInterceptor } from '../interceptors/mock-api.interceptor';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MockApiInterceptor, multi: true },
  ]
})
export class MockApiModule { }
```

### 4.2 启用 Mockjs

```shell
npm i -S mockjs
npm i -D @types/mockjs
```

```typescript
import { mock } from 'mockjs';
```