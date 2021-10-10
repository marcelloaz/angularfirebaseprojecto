import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { MatSidenav, MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

const SMALL_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('btn1', {static:false }) buttonIni: ElementRef;

  @ViewChild(MatAccordion,{static: false}) accordion: MatAccordion;

  private mediaMatcher: MediaQueryList =
           matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

    dir: string = 'ltr';


  constructor(
    zone: NgZone,
    private elementRef: ElementRef,
    private router: Router)
    {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }

  ngAfterViewInit() {
    this.StartText();
   }

  StartText(): void {
    const { nativeElement } = this.elementRef;
   // this.buttonIni.nativeElement.focus();
    const elements = nativeElement;
    var tl = gsap.timeline();
    tl.to(elements,  { duration: 2.5, ease: "back.out(1.7)", y: -500 });
    tl.from(elements, {duration: 2.8, opacity:0, scale:0, x:90, rotationX:280, transformOrigin:"0% 50% -30",  ease:"back", stagger: 0.01}, "+=0");
  }

  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  ngOnInit(): void {
    //this.StartText();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall())
        this.sidenav.close();
    })
  }

  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.sidenav.toggle().then(() => this.sidenav.toggle());
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
