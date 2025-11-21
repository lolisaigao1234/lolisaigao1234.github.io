import { Component, ChangeDetectionStrategy, signal, effect, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('scroll', this.onScroll, { passive: true });
        this.onScroll(); // Initial check
      }
    });
  }

  onScroll = () => {
    this.isScrolled.set(window.scrollY > 10);
  }

  toggleMenu() {
    this.isMenuOpen.update(open => !open);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
