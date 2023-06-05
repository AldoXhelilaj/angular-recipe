import { OnInit, Directive, ElementRef, Renderer2, HostListener } from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]'
})


export class BetterHighlightDirective implements OnInit {

    constructor(private elRef: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit(): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    }
    @HostListener('mouseenter') mouseenter() {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'red')
    }

    @HostListener('mouseleave') mouseleave() {
        this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    }
}