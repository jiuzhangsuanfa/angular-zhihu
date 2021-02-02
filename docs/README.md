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

并在各个模块中导入。
