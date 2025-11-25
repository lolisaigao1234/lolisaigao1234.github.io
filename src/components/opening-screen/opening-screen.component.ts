import { Component, OnInit, OnDestroy, signal, computed, Output, EventEmitter, Inject, PLATFORM_ID, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export type AnimationState = 'frozen' | 'flashing' | 'revealing' | 'finished';

@Component({
    selector: 'app-opening-screen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './opening-screen.component.html',
    styleUrls: ['./opening-screen.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpeningScreenComponent implements OnInit, OnDestroy {
    @Output() animationComplete = new EventEmitter<void>();

    // Animation State Signal
    state = signal<AnimationState>('frozen');

    // Timer references for cleanup
    private flashTimer: ReturnType<typeof setTimeout> | null = null;
    private revealTimer: ReturnType<typeof setTimeout> | null = null;
    private finishTimer: ReturnType<typeof setTimeout> | null = null;

    // =============================================
    // Computed Properties (Methods for Template)
    // =============================================

    /** Returns true when in the initial pulsing/frozen state */
    isPulsing = computed(() => this.state() === 'frozen');

    /** Returns true during the flash animation */
    isFlashing = computed(() => this.state() === 'flashing');

    /** Returns true during the reveal/ripple animation */
    isRevealing = computed(() => this.state() === 'revealing');

    /** Returns true when animation sequence is complete */
    isComplete = computed(() => this.state() === 'finished');

    /** Returns true when background should fade (during reveal or complete) */
    shouldFadeBackground = computed(() =>
        this.state() === 'revealing' || this.state() === 'finished'
    );

    /** Returns true when the opening screen should be hidden */
    shouldHide = computed(() => this.state() === 'finished');

    /** Host binding for animation-complete class */
    @HostBinding('class.animation-complete')
    get hostComplete(): boolean {
        return this.state() === 'finished';
    }

    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit(): void {
        this.startAnimationSequence();
    }

    ngOnDestroy(): void {
        this.clearAllTimers();
    }

    // =============================================
    // Public Methods
    // =============================================

    /**
     * Skip the animation and immediately complete.
     * Called when user clicks or presses enter/space.
     */
    skipAnimation(): void {
        this.clearAllTimers();
        this.state.set('finished');
        this.animationComplete.emit();
    }

    // =============================================
    // Private Methods
    // =============================================

    private startAnimationSequence(): void {
        // Check for reduced motion preference
        const prefersReducedMotion = isPlatformBrowser(this.platformId) &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            // Shortened sequence for reduced motion (just a quick fade out)
            this.finishTimer = setTimeout(() => {
                this.state.set('finished');
                this.animationComplete.emit();
            }, 800);
            return;
        }

        // Standard Animation Sequence
        // 1. Start in 'frozen' state (Pulse happens automatically via CSS)

        // 2. Trigger Flash after 1.5s
        this.flashTimer = setTimeout(() => {
            this.state.set('flashing');

            // 3. Trigger Ripple/Reveal shortly after flash starts (0.5s later)
            this.revealTimer = setTimeout(() => {
                this.state.set('revealing');

                // 4. Cleanup/Finish after ripple completes (1.5s duration)
                this.finishTimer = setTimeout(() => {
                    this.state.set('finished');
                    this.animationComplete.emit();
                }, 1500);

            }, 500);

        }, 1500);
    }

    private clearAllTimers(): void {
        if (this.flashTimer) {
            clearTimeout(this.flashTimer);
            this.flashTimer = null;
        }
        if (this.revealTimer) {
            clearTimeout(this.revealTimer);
            this.revealTimer = null;
        }
        if (this.finishTimer) {
            clearTimeout(this.finishTimer);
            this.finishTimer = null;
        }
    }
}