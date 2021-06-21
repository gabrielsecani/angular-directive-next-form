import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  NgModule
} from '@angular/core';
import { UnaryFunction } from 'rxjs';

@Directive({
  selector: '[appNextField]'
})
export class NextFieldDirective {
  constructor(private el: ElementRef) {}
  @Input('appNextField') nextFieldId = '';
  @Input() nextFieldWhen: UnaryFunction<ElementRef, boolean> =
    NextFieldDirective.MaxLengthValidator;

  public static MaxLengthValidator(el: ElementRef): boolean {
    const nat = el.nativeElement;
    return nat.value && nat.value.length == nat.maxLength;
  }

  @HostListener('keyup') OnKeyUp() {
    if (!this.nextFieldWhen) {
      throw Error(
        'Element ' +
          this.el +
          ' does not have a function on attribute [nextFieldWhen].'
      );
    }

    if (this.el) {
      if (this.nextFieldWhen(this.el)) {
        this.focusNext();
      }
    }
  }

  private getNearParentSelector(element: any, selector: string) {
    const n = element.querySelector(selector);
    if (n) return n;
    return this.getNearParentSelector(element.parentElement, selector);
  }

  private focusNext() {
    let element: any;
    if (this.nextFieldId) {
      element = this.getNearParentSelector(
        this.el.nativeElement,
        this.nextFieldId
      );
    } else {
      element = this.el.nativeElement.nextElementSibling;
    }
    console.log('checkFocus', element);
    if (element) {
      element.focus();
    }
  }
}

@NgModule({
  imports: [],
  declarations: [NextFieldDirective],
  exports: [NextFieldDirective]
})
export class NextFieldDirectiveModule {}
