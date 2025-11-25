import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { vi } from 'vitest';
import { OpeningScreenComponent, AnimationState } from './opening-screen.component';

/**
 * Comprehensive Unit Tests for OpeningScreenComponent
 * 
 * Test Categories:
 * 1. Component Creation & Initialization
 * 2. Animation State Transitions
 * 3. Timing & Sequencing
 * 4. Event Emission
 * 5. Reduced Motion Accessibility
 * 6. Skip Animation Functionality
 * 7. Cleanup & Memory Management
 * 8. Template Bindings
 */
describe('OpeningScreenComponent', () => {
    let component: OpeningScreenComponent;
    let fixture: ComponentFixture<OpeningScreenComponent>;

    // Helper to create component with specific platform
    const createComponent = async (platformId: string = 'browser') => {
        await TestBed.configureTestingModule({
            imports: [OpeningScreenComponent],
            providers: [
                { provide: PLATFORM_ID, useValue: platformId }
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(OpeningScreenComponent);
        component = fixture.componentInstance;
    };

    afterEach(() => {
        if (fixture) {
            fixture.destroy();
        }
    });

    // =============================================
    // 1. Component Creation & Initialization
    // =============================================
    describe('Component Creation', () => {
        beforeEach(async () => await createComponent());

        it('should create the component', () => {
            expect(component).toBeTruthy();
        });

        it('should initialize with frozen state before ngOnInit', () => {
            // Before ngOnInit is called
            expect(component.state()).toBe('frozen');
        });

        it('should have animationComplete output defined', () => {
            expect(component.animationComplete).toBeDefined();
        });
    });

    // =============================================
    // 2. Animation State Transitions
    // =============================================
    describe('Animation State Transitions', () => {
        beforeEach(async () => await createComponent());

        it('should remain in frozen state on init', fakeAsync(() => {
            fixture.detectChanges(); // Triggers ngOnInit

            expect(component.state()).toBe('frozen');
        }));

        it('should transition from pulsing to flashing after 1500ms', fakeAsync(() => {
            fixture.detectChanges();
            expect(component.state()).toBe('frozen');

            tick(1500);
            expect(component.state()).toBe('flashing');

            flush(); // Clean up remaining timers
        }));

        it('should transition from flashing to revealing after 2000ms total', fakeAsync(() => {
            fixture.detectChanges();

            tick(2000);
            expect(component.state()).toBe('revealing');

            flush();
        }));

        it('should transition to complete after 3500ms total', fakeAsync(() => {
            fixture.detectChanges();

            tick(3500);
            expect(component.state()).toBe('finished');

            flush();
        }));

        it('should follow the complete state sequence', fakeAsync(() => {
            const stateHistory: AnimationState[] = [];

            fixture.detectChanges();
            stateHistory.push(component.state());

            tick(1500);
            stateHistory.push(component.state());

            tick(500); // 2000ms total
            stateHistory.push(component.state());

            tick(1500); // 3500ms total
            stateHistory.push(component.state());

            expect(stateHistory).toEqual(['frozen', 'flashing', 'revealing', 'finished']);

            flush();
        }));
    });

    // =============================================
    // 3. Timing & Sequencing
    // =============================================
    describe('Animation Timing', () => {
        beforeEach(async () => await createComponent());

        it('should not be flashing at 1499ms', fakeAsync(() => {
            fixture.detectChanges();

            tick(1499);
            expect(component.state()).toBe('frozen');
            expect(component.isFlashing()).toBe(false);

            flush();
        }));

        it('should be flashing at exactly 1500ms', fakeAsync(() => {
            fixture.detectChanges();

            tick(1500);
            expect(component.state()).toBe('flashing');
            expect(component.isFlashing()).toBe(true);

            flush();
        }));

        it('should have total animation duration of 3500ms', fakeAsync(() => {
            fixture.detectChanges();

            tick(3499);
            expect(component.isComplete()).toBe(false);

            tick(1);
            expect(component.isComplete()).toBe(true);

            flush();
        }));
    });

    // =============================================
    // 4. Event Emission
    // =============================================
    describe('Event Emission', () => {
        beforeEach(async () => await createComponent());

        it('should emit animationComplete when animation finishes', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(3500);

            expect(completeSpy).toHaveBeenCalledTimes(1);

            flush();
        }));

        it('should not emit animationComplete before completion', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(3000);

            expect(completeSpy).not.toHaveBeenCalled();

            flush();
        }));

        it('should emit exactly once', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(5000); // Wait extra time

            expect(completeSpy).toHaveBeenCalledTimes(1);

            flush();
        }));
    });

    // =============================================
    // 5. Reduced Motion Accessibility
    // =============================================
    describe('Reduced Motion Preference', () => {
        it('should complete quickly when reduced motion is preferred', fakeAsync(async () => {
            // Mock matchMedia to return reduced motion preference
            const originalMatchMedia = window.matchMedia;
            window.matchMedia = vi.fn().mockReturnValue({
                matches: true,
                media: '(prefers-reduced-motion: reduce)',
                addEventListener: () => { },
                removeEventListener: () => { }
            } as unknown as MediaQueryList);

            await createComponent('browser');

            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();

            // Should complete within 800ms for reduced motion
            tick(800);
            expect(component.isComplete()).toBe(true);
            expect(completeSpy).toHaveBeenCalledTimes(1);

            // Restore original
            window.matchMedia = originalMatchMedia;

            flush();
        }));

        it('should skip flashing state with reduced motion', fakeAsync(async () => {
            const originalMatchMedia = window.matchMedia;
            window.matchMedia = vi.fn().mockReturnValue({
                matches: true,
                media: '(prefers-reduced-motion: reduce)',
                addEventListener: () => { },
                removeEventListener: () => { }
            } as unknown as MediaQueryList);

            await createComponent('browser');
            fixture.detectChanges();

            // Check state never becomes 'flashing'
            tick(400);
            expect(component.isFlashing()).toBe(false);

            tick(500);
            expect(component.isComplete()).toBe(true);

            window.matchMedia = originalMatchMedia;
            flush();
        }));
    });

    // =============================================
    // 6. Skip Animation Functionality
    // =============================================
    describe('Skip Animation', () => {
        beforeEach(async () => await createComponent());

        it('should immediately complete when skipAnimation is called', fakeAsync(() => {
            fixture.detectChanges();

            tick(500); // Midway through animation
            expect(component.isComplete()).toBe(false);

            component.skipAnimation();

            expect(component.isComplete()).toBe(true);
            expect(component.state()).toBe('finished');

            flush();
        }));

        it('should emit animationComplete when skipped', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(100);

            component.skipAnimation();

            expect(completeSpy).toHaveBeenCalledTimes(1);

            flush();
        }));

        it('should cancel pending timers when skipped', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(100);

            component.skipAnimation();

            // Fast forward past original animation time
            tick(5000);

            // Should still only be called once (from skip, not from timer)
            expect(completeSpy).toHaveBeenCalledTimes(1);

            flush();
        }));
    });

    // =============================================
    // 7. Cleanup & Memory Management
    // =============================================
    describe('Cleanup', () => {
        beforeEach(async () => await createComponent());

        it('should clear timers on destroy', fakeAsync(() => {
            const completeSpy = vi.fn();
            component.animationComplete.subscribe(completeSpy);

            fixture.detectChanges();
            tick(100);

            // Destroy component before animation completes
            component.ngOnDestroy();

            // Fast forward past animation time
            tick(5000);

            // Event should not have been emitted
            expect(completeSpy).not.toHaveBeenCalled();

            flush();
        }));

        it('should handle multiple destroy calls gracefully', () => {
            fixture.detectChanges();

            // Should not throw
            expect(() => {
                component.ngOnDestroy();
                component.ngOnDestroy();
            }).not.toThrow();
        });
    });

    // =============================================
    // 8. Computed Properties
    // =============================================
    describe('Computed Properties', () => {
        beforeEach(async () => await createComponent());

        it('should correctly compute isPulsing', fakeAsync(() => {
            fixture.detectChanges();

            expect(component.isPulsing()).toBe(true);
            expect(component.isFlashing()).toBe(false);
            expect(component.isRevealing()).toBe(false);
            expect(component.isComplete()).toBe(false);

            flush();
        }));

        it('should correctly compute isFlashing', fakeAsync(() => {
            fixture.detectChanges();
            tick(1500);

            expect(component.isPulsing()).toBe(false);
            expect(component.isFlashing()).toBe(true);
            expect(component.isRevealing()).toBe(false);
            expect(component.isComplete()).toBe(false);

            flush();
        }));

        it('should correctly compute isRevealing', fakeAsync(() => {
            fixture.detectChanges();
            tick(2000);

            expect(component.isPulsing()).toBe(false);
            expect(component.isFlashing()).toBe(false);
            expect(component.isRevealing()).toBe(true);
            expect(component.isComplete()).toBe(false);

            flush();
        }));

        it('should correctly compute shouldFadeBackground during revealing', fakeAsync(() => {
            fixture.detectChanges();

            expect(component.shouldFadeBackground()).toBe(false);

            tick(2000);
            expect(component.shouldFadeBackground()).toBe(true);

            tick(1500);
            expect(component.shouldFadeBackground()).toBe(true); // Still true when complete

            flush();
        }));

        it('should correctly compute shouldHide when complete', fakeAsync(() => {
            fixture.detectChanges();

            expect(component.shouldHide()).toBe(false);

            tick(3500);
            expect(component.shouldHide()).toBe(true);

            flush();
        }));
    });

    // =============================================
    // 9. SSR Safety
    // =============================================
    describe('Server-Side Rendering Safety', () => {
        it('should handle server platform without errors', fakeAsync(async () => {
            await createComponent('server');

            // Should not throw when window.matchMedia is not available
            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();

            // Should still complete animation
            tick(3500);
            expect(component.isComplete()).toBe(true);

            flush();
        }));
    });

    // =============================================
    // 10. Host Binding
    // =============================================
    describe('Host Binding', () => {
        beforeEach(async () => await createComponent());

        it('should not have animation-complete class initially', fakeAsync(() => {
            fixture.detectChanges();

            expect(component.hostComplete).toBe(false);

            flush();
        }));

        it('should have animation-complete class when complete', fakeAsync(() => {
            fixture.detectChanges();
            tick(3500);

            expect(component.hostComplete).toBe(true);

            flush();
        }));
    });
});

/**
 * Integration Tests with Parent Component
 */
describe('OpeningScreenComponent Integration', () => {
    // These would test the component within the context of AppComponent
    // For now, we verify the contract is correct

    it('should have correct output signature', () => {
        TestBed.configureTestingModule({
            imports: [OpeningScreenComponent]
        });
        const fixture = TestBed.createComponent(OpeningScreenComponent);
        const component = fixture.componentInstance;

        expect(component.animationComplete.observed).toBe(false);

        // Subscribe and verify
        let emitted = false;
        component.animationComplete.subscribe(() => {
            emitted = true;
        });

        expect(component.animationComplete.observed).toBe(true);

        fixture.destroy();
    });
});