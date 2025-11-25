import { Component, OnInit, OnDestroy, signal, computed, Output, EventEmitter, Inject, PLATFORM_ID, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export type AnimationState = 'frozen' | 'flashing' | 'revealing' | 'finished';

@Component({
    selector: 'app-opening-screen',
    standalone: true,
    imports: [CommonModule],
    template: `
<!--
  Opening Screen Animation Component

  A full-screen overlay that displays an animated prism effect before
  revealing the main application content underneath.
-->
<div class="opening-screen-container" [class.is-revealing]="isRevealing()" [class.is-complete]="isComplete()"
    [attr.aria-hidden]="true" role="presentation" (click)="skipAnimation()" (keydown.enter)="skipAnimation()"
    (keydown.space)="skipAnimation()" tabindex="0">
    <!-- Background Overlay with Blur -->
    <div class="background-overlay" [class.fade-out]="shouldFadeBackground()"></div>

    <!-- Gradient Overlay -->
    <div class="gradient-overlay" [class.fade-out]="shouldFadeBackground()"></div>

    <!-- Prism Animation Container -->
    <div class="prism-wrapper" [class.scale-out]="isRevealing()">
        <!-- The Prism Element -->
        <div class="prism" [class.is-pulsing]="isPulsing()" [class.is-flashing]="isFlashing()">
            <!-- Outer Glass Shell -->
            <div class="prism-shell"></div>

            <!-- Inner Refraction Layer -->
            <div class="prism-refraction"></div>

            <!-- Core Glow -->
            <div class="prism-core">
                <div class="prism-core-inner"></div>
            </div>

            <!-- Flash Burst Effect -->
            <div class="prism-flash" *ngIf="isFlashing()"></div>
        </div>

        <!-- Optional: Loading Text -->
        <p class="loading-text" *ngIf="isPulsing()">
            <span class="loading-text-inner">Loading</span>
            <span class="loading-dots">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
            </span>
        </p>
    </div>

    <!-- Ripple Reveal Effect -->
    <div class="ripple-reveal" *ngIf="isRevealing()"></div>

    <!-- Skip hint -->
    <p class="skip-hint" *ngIf="isPulsing()">
        Click anywhere to skip
    </p>
</div>
    `,
    styles: [`
/* ============================================
   Opening Screen Component Styles
   ============================================ */

:host {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: auto;
}

:host(.animation-complete) {
    display: none;
    pointer-events: none;
}

/* ============================================
   Container
   ============================================ */

.opening-screen-container {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
    transition: opacity 0.5s ease-out;
}

.opening-screen-container.is-complete {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
}

/* ============================================
   Background Layers
   ============================================ */

.background-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.85);
    /* slate-900 with opacity */
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transition: opacity 0.7s ease-out;
}

.background-overlay.fade-out {
    opacity: 0;
}

.gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg,
            transparent 0%,
            rgba(15, 23, 42, 0.6) 50%,
            rgba(15, 23, 42, 0.9) 100%);
    pointer-events: none;
    transition: opacity 0.7s ease-out;
}

.gradient-overlay.fade-out {
    opacity: 0;
}

/* ============================================
   Prism Container
   ============================================ */

.prism-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    transition:
        transform 0.7s cubic-bezier(0.4, 0, 0.2, 1),
        opacity 0.7s ease-out;
}

.prism-wrapper.scale-out {
    transform: scale(1.5);
    opacity: 0;
}

/* ============================================
   The Prism
   ============================================ */

.prism {
    position: relative;
    width: 8rem;
    height: 8rem;
    will-change: transform, filter;
}

/* Outer Glass Shell */
.prism-shell {
    position: absolute;
    inset: 0;
    transform: rotate(45deg);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
        0 0 50px rgba(255, 255, 255, 0.05),
        inset 0 0 30px rgba(255, 255, 255, 0.02);
}

/* Inner Refraction Layer */
.prism-refraction {
    position: absolute;
    inset: 1rem;
    transform: rotate(45deg);
    border-radius: 0.75rem;
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 100%);
    mix-blend-mode: overlay;
}

/* Core Glow */
.prism-core {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.prism-core-inner {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: rgba(34, 211, 238, 0.2);
    /* cyan-400 */
    filter: blur(20px);
}

/* Flash Effect */
.prism-flash {
    position: absolute;
    inset: 0;
    transform: rotate(45deg);
    border-radius: 1rem;
    background: white;
    mix-blend-mode: overlay;
    animation: flash-burst 0.8s ease-out forwards;
}

/* ============================================
   Pulse Animation
   ============================================ */

.prism.is-pulsing {
    animation: prism-pulse 3s ease-in-out infinite;
}

@keyframes prism-pulse {

    0%,
    100% {
        transform: scale(1);
        filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.2));
    }

    50% {
        transform: scale(1.05);
        filter: drop-shadow(0 0 40px rgba(34, 211, 238, 0.4));
    }
}

/* ============================================
   Flash Animation
   ============================================ */

.prism.is-flashing {
    animation: none;
    /* Stop pulsing during flash */
}

@keyframes flash-burst {
    0% {
        opacity: 0;
        transform: rotate(45deg) scale(0.8);
    }

    25% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: rotate(45deg) scale(2);
    }
}

/* ============================================
   Ripple Reveal Effect
   ============================================ */

.ripple-reveal {
    position: absolute;
    inset: 0;
    background: transparent;
    pointer-events: none;
    animation: ripple-expand 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    will-change: clip-path;
}

@keyframes ripple-expand {
    0% {
        clip-path: circle(0% at 50% 50%);
        background: rgba(34, 211, 238, 0.1);
    }

    50% {
        background: rgba(34, 211, 238, 0.05);
    }

    100% {
        clip-path: circle(150% at 50% 50%);
        background: transparent;
    }
}

/* ============================================
   Loading Text
   ============================================ */

.loading-text {
    color: rgba(148, 163, 184, 0.8);
    /* slate-400 */
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.loading-text-inner {
    opacity: 0.8;
}

.loading-dots {
    display: flex;
    gap: 0.125rem;
}

.loading-dots .dot {
    animation: dot-bounce 1.4s ease-in-out infinite;
}

.loading-dots .dot:nth-child(1) {
    animation-delay: 0s;
}

.loading-dots .dot:nth-child(2) {
    animation-delay: 0.2s;
}

.loading-dots .dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes dot-bounce {

    0%,
    80%,
    100% {
        opacity: 0.4;
        transform: translateY(0);
    }

    40% {
        opacity: 1;
        transform: translateY(-4px);
    }
}

/* ============================================
   Skip Hint
   ============================================ */

.skip-hint {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(148, 163, 184, 0.4);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    animation: fade-in 2s ease-out forwards;
    animation-delay: 1s;
    opacity: 0;
}

@keyframes fade-in {
    to {
        opacity: 1;
    }
}

/* ============================================
   Reduced Motion Support
   ============================================ */

@media (prefers-reduced-motion: reduce) {

    .prism,
    .prism.is-pulsing,
    .prism.is-flashing,
    .prism-flash,
    .ripple-reveal,
    .prism-wrapper,
    .loading-dots .dot {
        animation: none !important;
        transition: opacity 0.3s ease-out !important;
    }

    .opening-screen-container {
        transition: opacity 0.5s ease-out;
    }

    .opening-screen-container.is-complete {
        opacity: 0;
    }

    /* Simple fade for reduced motion */
    :host {
        transition: opacity 0.5s ease-out;
    }
}

/* ============================================
   Mobile Responsive
   ============================================ */

@media (max-width: 640px) {
    .prism {
        width: 6rem;
        height: 6rem;
    }

    .prism-refraction {
        inset: 0.75rem;
    }

    .prism-core-inner {
        width: 3rem;
        height: 3rem;
    }

    .loading-text {
        font-size: 0.75rem;
    }

    .skip-hint {
        font-size: 0.625rem;
        bottom: 1.5rem;
    }
}

/* ============================================
   High DPI / Retina Optimization
   ============================================ */

@media (-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {

    .prism-shell,
    .prism-refraction {
        /* Use hardware acceleration for smooth rendering */
        transform: rotate(45deg) translateZ(0);
    }
}
    `],
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