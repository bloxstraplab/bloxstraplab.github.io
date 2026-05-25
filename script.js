/**
 * Bloxstrap Lab - Interactive Technical UX Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Download Button Scroll Trigger
    const heroBtn = document.getElementById('heroDownloadBtn');
    const stickyWrapper = document.getElementById('stickyBtnWrapper');

    if (heroBtn && stickyWrapper) {
        window.addEventListener('scroll', () => {
            const rect = heroBtn.getBoundingClientRect();
            
            // If the hero button scrolls off the top of the viewport
            if (rect.bottom < 0) {
                stickyWrapper.classList.add('visible');
            } else {
                stickyWrapper.classList.remove('visible');
            }
        });
    }

    // 2. FastFlag Simulator Panel Logic
    const fpsRange = document.getElementById('fpsRange');
    const fpsVal = document.getElementById('fpsVal');
    const renderEngine = document.getElementById('renderEngine');
    const discordPresence = document.getElementById('discordPresence');
    const lowMemoryMode = document.getElementById('lowMemoryMode');
    
    const diagFPS = document.getElementById('diagFPS');
    const diagLatency = document.getElementById('diagLatency');
    const consoleOutput = document.getElementById('consoleOutput');

    function updateSimulator() {
        const targetFps = parseInt(fpsRange.value);
        fpsVal.textContent = `${targetFps} Hz`;

        // Simulate actual game client metrics based on flags
        let activeFps = targetFps;
        if (lowMemoryMode.checked) {
            activeFps = Math.round(targetFps * 0.98); // Slight optimization drop representation or actual performance stability
        }
        
        // Dynamic simulated FPS value with natural micro-fluctuations
        diagFPS.textContent = `${activeFps} FPS`;

        // Calculate latency in milliseconds (frame time + render engine modifiers)
        let frameTime = 1000 / activeFps;
        let latencyModifier = 1.0;
        
        if (renderEngine.checked) {
            latencyModifier -= 0.15; // DirectX Native drops input lag
        }
        if (lowMemoryMode.checked) {
            latencyModifier -= 0.05; // Buffer optimization reduces queue latency
        }
        
        let finalLatency = (frameTime * latencyModifier).toFixed(2);
        diagLatency.textContent = `${finalLatency} ms`;

        // Format simulated JSON ClientSettings FastFlags
        const fastFlagsObject = {
            "DFIntTaskSchedulerTargetFps": targetFps,
            "FFlagDebugGraphicsDisableD3D11": !renderEngine.checked,
            "FFlagDiscordRichPresenceActive": discordPresence.checked,
            "FIntMemoryLimitAllocationBuffer": lowMemoryMode.checked ? 1024 : 512,
            "FFlagUseModernInputQueue": true,
            "FIntRenderShadowCascadeCount": renderEngine.checked ? 4 : 2
        };

        consoleOutput.textContent = JSON.stringify(fastFlagsObject, null, 2);
    }

    if (fpsRange) {
        // Register event listeners for all controls
        fpsRange.addEventListener('input', updateSimulator);
        renderEngine.addEventListener('change', updateSimulator);
        discordPresence.addEventListener('change', updateSimulator);
        lowMemoryMode.addEventListener('change', updateSimulator);

        // Initial launch run
        updateSimulator();
    }

    // 3. FAQ Accordion Controls
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close any currently expanded item for clean accordion behavior
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Expand the clicked item if it was closed
            if (!isActive) {
                item.classList.add('active');
                // Calculate scrollHeight dynamically to enable perfect CSS transitions
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 4. Auto-update Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
