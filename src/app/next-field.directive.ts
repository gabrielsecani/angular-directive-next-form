import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { UnaryFunction } from 'rxjs';

@Directive({
  selector: '[appNextField]'
})
export class NextFieldDirective {
  constructor(private el: ElementRef) {}
  @Input() maxlength = 0;
  @Input('appNextField') nextFieldId = '';
  @Input() nextFieldWhen: UnaryFunction<ElementRef, boolean> = el => {
    const nat = el.nativeElement;
    return nat.value && nat.value.length == nat.maxLength;
  };

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

  getNearParentSelector(element: any, selector: string) {
    const n = element.querySelector(selector);
    if (n) return n;
    return this.getNearParentSelector(element.parentElement, selector);
  }

  focusNext() {
    let element: any;
    debugger;
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
