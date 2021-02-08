import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { HOST as host } from 'src/app/common/constants';
import { ResourceType } from 'src/app/common/interfaces';
import { join } from 'src/app/common/utils';
import Vditor from 'vditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {

  @Input('placeholder') placeholder = '在这里输入正文内容';

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  private vditor!: Vditor;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log(this.editor);
    this.vditor = new Vditor(this.editor.nativeElement, {
      undoDelay: 100,
      width: 'auto',
      height: 'auto',
      placeholder: this.placeholder,
      mode: 'ir',
      value: undefined,
      theme: 'classic',
      icon: 'material',
      toolbar: [
        'headings',
        'bold',
        'italic',
        'strike',
        'list',
        '|',
        'link',
        'upload',
      ],
      toolbarConfig: {
        pin: true,
      },
      counter: {
        enable: true,
        type: 'markdown',
      },
      cache: {
        enable: false,
      },
      preview: {
        hljs: {
          enable: true,
          style: 'github',
          lineNumber: true,
        },
        // actions: [],
      },
      hint: {
        extend: [],
      },
      upload: {
        url: join({ host, segments: [ResourceType.IMAGES] }),
        format: this.format.bind(this),
        error: this.error.bind(this),
      },
      after: () => { },
    });
  }

  format(files: File[], responseText: string): string {
    console.log(files, responseText);
    return '';
  }

  error(message: string): void {
    console.error(message);
  }

}
