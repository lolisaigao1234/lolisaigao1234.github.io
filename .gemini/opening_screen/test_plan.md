# Opening Screen Test Plan

## 1. Static Structure & Design
| ID | Test Case | Expected Result | Edge Case / Notes |
|----|-----------|-----------------|-------------------|
| T1.1 | Render Component | Component renders full-screen (100vw/100vh) over content. | Ensure `z-index` is highest. |
| T1.2 | Frozen State Visual | Background is blurred (`backdrop-filter`), Prism is centered. | **Edge Case:** Safari support for `backdrop-filter` (may need vendor prefix or fallback). |
| T1.3 | Mobile Viewport | Prism scales appropriately on small screens (e.g., 375px width). | Ensure no horizontal scroll. |

## 2. Animation Mechanics
| ID | Test Case | Expected Result | Edge Case / Notes |
|----|-----------|-----------------|-------------------|
| T2.1 | Pulse Animation | Prism gently scales/glows in a loop. | Smooth 60fps, no jank. |
| T2.2 | Refraction Trigger | Flash occurs exactly at defined timestamp (e.g., 1.5s). | |
| T2.3 | Ripple Expansion | Mask expands radially, revealing content underneath. | **Edge Case:** High-DPI screens (Retina) rendering performance. |
| T2.4 | Sequence Completion | Animation completes fully in ~3.5s. | |

## 3. Integration & State
| ID | Test Case | Expected Result | Edge Case / Notes |
|----|-----------|-----------------|-------------------|
| T3.1 | App Load Integration | Screen appears immediately on app load. | **Edge Case:** Fast network (does it flash too quickly?) vs Slow network (does it stay?). |
| T3.2 | Removal from DOM | Component is removed or `display: none` after animation. | Verify no lingering click blockers. |
| T3.3 | Scroll Locking | Body scroll is locked (`overflow: hidden`) during animation. | **Edge Case:** User tries to scroll during intro. |

## 4. Accessibility & Edge Cases
| ID | Test Case | Expected Result | Edge Case / Notes |
|----|-----------|-----------------|-------------------|
| T4.1 | Reduced Motion | If `prefers-reduced-motion: reduce` is set, skip animation or show simple fade. | **Critical for A11y.** |
| T4.2 | Window Resize | Resizing window during animation doesn't break layout. | |
| T4.3 | JS Disabled | (If applicable) Fallback or content visible? | Angular requires JS, so likely just blank or loading text. |
