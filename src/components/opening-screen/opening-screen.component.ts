import { Component, OnInit, signal, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-opening-screen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './opening-screen.component.html',
    styleUrls: ['./opening-screen.component.css']
})
export class OpeningScreenComponent implements OnInit {
    @Output() animationComplete = new EventEmitter<void>();

    // Animation States
    state = signal<'frozen' | 'flashing' | 'revealing' | 'finished'>('frozen');

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        this.startAnimationSequence();
    }

    private startAnimationSequence() {
        // Check for reduced motion preference
        const prefersReducedMotion = isPlatformBrowser(this.platformId) &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Shortened sequence for reduced motion (just a quick fade out)
            setTimeout(() => {
                this.state.set('finished');
                this.animationComplete.emit();
            }, 1000); // 1s static display then done
            return;
        }

        // Standard Animation Sequence
        // 1. Start in 'frozen' state (Pulse happens automatically via CSS)

        // 2. Trigger Flash after 1.5s
        setTimeout(() => {
            this.state.set('flashing');

            // 3. Trigger Ripple/Reveal shortly after flash starts (e.g., 0.5s later)
            setTimeout(() => {
                this.state.set('revealing');

                // 4. Cleanup/Finish after ripple completes (e.g., 1.5s duration)
                setTimeout(() => {
                    this.state.set('finished');
                    this.animationComplete.emit();
                }, 1500);

            }, 500);

        }, 1500);
    }
}
