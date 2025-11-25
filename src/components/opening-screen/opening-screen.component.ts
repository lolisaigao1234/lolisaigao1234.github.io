import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-opening-screen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './opening-screen.component.html',
    styleUrls: ['./opening-screen.component.css']
})
export class OpeningScreenComponent implements OnInit {
    // Animation States
    state = signal<'frozen' | 'flashing' | 'revealing' | 'finished'>('frozen');

    ngOnInit() {
        this.startAnimationSequence();
    }

    private startAnimationSequence() {
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
                }, 1500);

            }, 500);

        }, 1500);
    }
}
