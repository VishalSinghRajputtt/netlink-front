   document.addEventListener("DOMContentLoaded", () => {

        // ============================================================
        // 1. SIDEBAR MANAGEMENT
        // ============================================================
        const menuBtn = document.getElementById('menuToggleBtn');
        const togglerIcon = document.getElementById('togglerIcon');
        const sidebar = document.getElementById('mobileSidebar');
        const closeBtn = document.getElementById('closeSidebarBtn');
        const overlay = document.getElementById('sidebarOverlay');
        const body = document.body;

        function openSidebar() {
            if (menuBtn) menuBtn.classList.add('open');
            if (togglerIcon) togglerIcon.className = 'fas fa-times toggler-icon';
            if (sidebar) sidebar.classList.add('open');
            body.classList.add('sidebar-open');
        }

        function closeSidebar() {
            if (menuBtn) menuBtn.classList.remove('open');
            if (togglerIcon) togglerIcon.className = 'fas fa-bars toggler-icon';
            if (sidebar) sidebar.classList.remove('open');
            body.classList.remove('sidebar-open');
        }

        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (sidebar && sidebar.classList.contains('open')) {
                    closeSidebar();
                } else {
                    openSidebar();
                }
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });


        // ============================================================
        // 2. HERO TYPEWRITER EFFECT
        // ============================================================
        const stringSet = [
            "Custom IT Solutions",
            "Shopify Development",
            "WordPress Design",
            "SMM Services",
            "Custom CRM & CMS"
        ];
        let setIndex = 0;
        let globalTimer;
        const dynamicEl = document.getElementById('dynamicText');

        function runTyper() {
            if (!dynamicEl) return;
            let letters = stringSet[setIndex].split('');
            let currentText = '';

            function writeLoop() {
                if (letters.length > 0) {
                    currentText += letters.shift();
                    dynamicEl.innerHTML = currentText;
                    globalTimer = setTimeout(writeLoop, 90);
                } else {
                    setTimeout(runDeleter, 2000);
                }
            }
            writeLoop();
        }

        function runDeleter() {
            if (!dynamicEl) return;
            let current = dynamicEl.innerHTML;
            let letters = current.split('');

            function deleteLoop() {
                if (letters.length > 0) {
                    letters.pop();
                    dynamicEl.innerHTML = letters.join('');
                    globalTimer = setTimeout(deleteLoop, 50);
                } else {
                    setIndex = (stringSet.length > (setIndex + 1)) ? (setIndex + 1) : 0;
                    setTimeout(runTyper, 400);
                }
            }
            deleteLoop();
        }

        // Safe initiation on trigger window load parameters
        if (dynamicEl) {
            runTyper();
        }


        // ============================================================
        // 3. SNAKE-BOX AGILE PROCESS CONTROLLER
        // ============================================================
        const snakeBoxNodes = document.querySelectorAll('.snake-node-item');
        const screenViewPanels = document.querySelectorAll('.active-panel-view');
        const dynamicProgressLine = document.querySelector('.active-progress-path');

        let currentActiveIdx = 0;
        let systemLoopTimer;
        const boxesCount = snakeBoxNodes.length;
        const progressStrokeOffsetsMap = [2400, 2050, 1620, 1200, 780, 360];

        function syncSnakeBoxComponentDOM(targetIdx) {
            if (boxesCount === 0) return;
            
            snakeBoxNodes.forEach(node => node.classList.remove('active'));
            screenViewPanels.forEach(panel => panel.classList.add('d-none'));

            snakeBoxNodes[targetIdx].classList.add('active');

            const selectedPanelTargetId = `panel-step-${snakeBoxNodes[targetIdx].getAttribute('data-step')}`;
            const targetElementNode = document.getElementById(selectedPanelTargetId);
            if (targetElementNode) {
                targetElementNode.classList.remove('d-none');
            }

            if (dynamicProgressLine) {
                dynamicProgressLine.style.strokeDashoffset = progressStrokeOffsetsMap[targetIdx];
            }
        }

        function launchAutomatedTimelineCycle() {
            if (boxesCount === 0) return;
            systemLoopTimer = setInterval(() => {
                currentActiveIdx = (currentActiveIdx + 1) % boxesCount;
                syncSnakeBoxComponentDOM(currentActiveIdx);
            }, 4000);
        }

        if (boxesCount > 0) {
            snakeBoxNodes.forEach((node, idx) => {
                node.addEventListener('click', () => {
                    clearInterval(systemLoopTimer);
                    currentActiveIdx = idx;
                    syncSnakeBoxComponentDOM(currentActiveIdx);
                    launchAutomatedTimelineCycle();
                });
            });

            syncSnakeBoxComponentDOM(0);
            launchAutomatedTimelineCycle();
        }


        // ============================================================
        // 4. CIRCULAR PROGRESS COUNTERS (SUCCESS STORIES)
        // ============================================================
        const loopsProgressCanvases = document.querySelectorAll('.circular-progress-canvas');
        
        loopsProgressCanvases.forEach(canvas => {
            const finalMetricValue = parseInt(canvas.getAttribute('data-value'), 10);
            if (!isNaN(finalMetricValue)) {
                const radialDegreeValue = (finalMetricValue / 100) * 360;
                canvas.style.setProperty('--progress-angle', `${radialDegreeValue}deg`);
            }
        });


        // ============================================================
        // 5. TESTIMONIAL VIEWPORT REVEAL LOGIC
        // ============================================================
        const reviewTriggersNodes = document.querySelectorAll('.avatar-circle-node');
        const testimonialTargetPanels = document.querySelectorAll('.testimonial-active-panel-view');

        reviewTriggersNodes.forEach(avatarTrigger => {
            avatarTrigger.addEventListener('click', () => {
                reviewTriggersNodes.forEach(node => node.classList.remove('active'));
                testimonialTargetPanels.forEach(panel => panel.classList.add('d-none'));

                avatarTrigger.classList.add('active');
                
                const chosenTargetIndexId = `review-panel-${avatarTrigger.getAttribute('data-testimonial')}`;
                const panelDomTargetNode = document.getElementById(chosenTargetIndexId);
                if (panelDomTargetNode) {
                    panelDomTargetNode.classList.remove('d-none');
                }
            });
        });

    });