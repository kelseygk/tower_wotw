<!-- Quiz  -->

(function() {
    let journey = "";
    let currentStep = 0;

    const servicePageUrls = [
        ["Strategy Definition", "/strategy-definition"],
        ["Capabilities Mapping", "/capabilities-mapping"],
        ["Org + Workforce Design", "/org-workforce-design"],
        ["Change Management", "/change-management"],
        ["PMO + Governance", "/change-governance"],
        ["BPR + Special Projects", "/bpr-special-projects"],
    ];

    const quizData = [
        {
            id: 1,
            header: "Organizational Challenges",
            body: "Consider the primary challenge your organization is currently facing.",
            question: "Which of the following most closely reflects the challenge your organization faces?",
            options: [
                { value: "a Transformation", text: "To stay relevant and address our stakeholders' changing needs, we must build dramatically beyond what we already do well today." },
                { value: "a Turnaround", text: "Our organization is severely underperforming and we face substantial risk unless we build a stronger, more resilient core." },
                { value: "an Integration", text: "Work feels sticky and we're not getting the most out of what we have. An opportunity exists to improve the efficiency and effectiveness of our operations." },
                { value: "uncertain", text: "I'm not certain and/or my team isn't aligned." }
            ]
        },
        {
            id: 2,
            header: "Strategy and Objectives",
            body: "Let's assess your organization's strategic clarity.",
            question: "Have you clearly defined the objectives you need to drive against and the strategy for getting there?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
        {
            id: 3,
            header: "Capabilities and Investments",
            body: "Let's explore your understanding of organizational capabilities and investment priorities.",
            question: "Do you have a clear understanding of the capabilities you must possess and how to prioritize your investments?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
        {
            id: 4,
            header: "Organizational Structure and Skills",
            body: "Let's assess your understanding of your organization's structure and skill requirements.",
            question: "Do you have clarity on the amount of headcount you require, the skills it must possess, and how your org chart may need restructuring to support your strategy?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No, but we should" },
                { value: "uncertain", text: "I'm not sure" },
                { value: "not-concerned", text: "That's not something we're concerned about" }
            ]
        },
        {
            id: 5,
            header: "Strategy Execution Clarity",
            body: "Let's evaluate the clarity of your strategy execution within your organization.",
            question: "Do your internal teams have the clarity they need to execute on your strategy and its supporting change program?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
        {
            id: 6,
            header: "Change Management and Performance Tracking",
            body: "Let's assess your organization's capacity to manage change and track performance.",
            question: "Do you have the resources and processes in place to manage change, clear roadblocks, and track and report on performance gains?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
        {
            id: 7,
            header: "Management Practices and Human Capital Support",
            body: "Let's evaluate your team's need for support in implementing management best practices and human capital management.",
            question: "Does your team need help reducing bottlenecks and wasted motion via business process reengineering?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
      {     id: 8,
            header: "Management Practices and Human Capital Support",
            body: "Let's evaluate your team's need for support in implementing management best practices and human capital management.",
            question: "Does your team need hands-on support implementing management best practices (e.g., metrics systems) and with human capital management?",
            options: [
                { value: "yes", text: "Yes" },
                { value: "no", text: "No" },
                { value: "uncertain", text: "I'm not sure" }
            ]
        },
    ];

    function openDialog(e) {
        if (e) e.preventDefault();
        console.log('Opening dialog');
        document.documentElement.style.setProperty("--dialog-body-scroll-top", `${window.scrollY}px`);
        window.location.hash = "";
        resetQuiz();
        
      	let quizLightbox = document.getElementById('quizLightbox');
      	if (quizLightbox) {
 	      	quizLightbox.style.display = "grid";
          	quizLightbox.showModal();
      		showIntro();
        } else {
        	console.error('Quiz lightbox element not found');
        }
    }

    function closeDialog() {
        try {
            console.log('Closing dialog');
            const scrollYValue = document.documentElement.style.getPropertyValue("--dialog-body-scroll-top");
            document.documentElement.style.removeProperty("--dialog-body-scroll-top");
            const quizLightbox = document.getElementById('quizLightbox');
            if (quizLightbox) {
                quizLightbox.close();
                quizLightbox.style.display = 'none';
                // Ensure any overlay is removed
                const overlay = document.querySelector('.quiz-overlay');
                if (overlay) overlay.remove();
			}
            window.location.hash = "";
            //window.scrollTo(0, parseInt(scrollYValue) || 0);
            
            // Remove any global event listeners
            document.removeEventListener('click', globalClickHandler);
            
            // Ensure the page is interactive
            document.body.style.pointerEvents = 'auto';
        } catch (error) {
            console.error('Error in closeDialog:', error);
        }
    }

    function resetQuiz() {
        journey = "";
        currentStep = 0;
        const quizForm = document.getElementById('quizForm');
        if (quizForm) quizForm.reset();
        const quizIntro = document.getElementById('quizIntro');
        const quizContent = document.getElementById('quizContent');
        const result = document.getElementById('result');
        if (quizIntro) quizIntro.hidden = false;
        if (quizContent) quizContent.hidden = true;
        if (result) result.hidden = true;
    }

    function showIntro() {
        const quizIntro = document.getElementById('quizIntro');
        const quizContent = document.getElementById('quizContent');
        const result = document.getElementById('result');
        if (quizIntro) quizIntro.hidden = false;
        if (quizContent) quizContent.hidden = true;
        if (result) result.hidden = true;
    }

    function beginQuiz() {
        const quizIntro = document.getElementById('quizIntro');
        const quizContent = document.getElementById('quizContent');
        const result = document.getElementById('result');
        if (quizIntro) quizIntro.hidden = true;
        if (quizContent) quizContent.hidden = false;
        if (result) result.hidden = true;
        showStep(quizData[0]);
    }

    function showStep(stepData) {
        const stepHeader = document.getElementById('stepHeader');
        const stepBody = document.getElementById('stepBody');
        const stepAnswers = document.getElementById('stepAnswers');
        const progress = document.getElementById('progress');
        const backBtn = document.getElementById('backBtn');
        const quizContent = document.getElementById('quizContent');

        if (stepHeader) stepHeader.innerHTML = stepData.header;
        if (stepBody) stepBody.innerHTML = `<p>${stepData.body}</p><h3>${stepData.question}</h3>`;
        
        if (stepAnswers) {
            let answersHtml = '';
            stepData.options.forEach((option, index) => {
                answersHtml += `
                    <label class="slide__field">
                        <input type="radio" name="slide--question-${stepData.id}" value="${option.value}" required>
                        <span class="slide__field__label">${option.text}</span>
                    </label>
                `;
            });
            stepAnswers.innerHTML = answersHtml;
        }
        
        if (progress) progress.innerHTML = `Question ${currentStep + 1} of ${quizData.length}`;

        if (backBtn) backBtn.hidden = currentStep === 0;

        if (quizContent) quizContent.setAttribute('aria-label', `Question ${currentStep + 1}: ${stepData.question}`);
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const questionValue = formData.get(`slide--question-${quizData[currentStep].id}`);

        if (!questionValue) {
            alert('Please select an answer');
            return;
        }

        switch (currentStep) {
            case 0: handleQuestion1(questionValue); break;
            case 1: handleQuestion2(questionValue); break;
            case 2: handleQuestion3(questionValue); break;
            case 3: handleQuestion4(questionValue); break;
            case 4: handleQuestion5(questionValue); break;
            case 5: handleQuestion6(questionValue); break;
            case 6: handleQuestion7(questionValue); break;
            case 7: handleQuestion8(questionValue); break;
            default: console.log("Unexpected question index");
        }
    }

    function handleQuestion1(value) {
        switch (value) {
            case "a Transformation":
            case "a Turnaround":
            case "an Integration":
                journey = value;
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "uncertain":
                journey = "a Transformation";
                showResult(0);
                break;
        }
    }

    function handleQuestion2(value) {
        switch (value) {
            case "yes": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "no": case "uncertain": 
                showResult(0);
                break;
        }
    }

    function handleQuestion3(value) {
        switch (value) {
            case "yes": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "no": case "uncertain": 
                showResult(1);
                break;
        }
    }

    function handleQuestion4(value) {
        switch (value) {
            case "yes": case "not-concerned": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "no": case "uncertain": 
                showResult(2);
                break;
        }
    }

    function handleQuestion5(value) {
        switch (value) {
            case "yes": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "no": case "uncertain": 
                showResult(3);
                break;
        }
    }

    function handleQuestion6(value) {
        switch (value) {
            case "yes": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "no": case "uncertain": 
                showResult(4);
                break;
        }
    }

    function handleQuestion7(value) {
        switch (value) {
            case "yes": 
                showResult(5);
                break;
            case "no": 
                currentStep++;
                showStep(quizData[currentStep]);
                break;
            case "uncertain": 
                showResult(5);
                break;
        }
    }

    function handleQuestion8(value) {
        switch (value) {
            case "yes": case "uncertain": 
                showResult(5);
                break;
            case "no": 
                showNoMatch();
                break;
        }
    }

  function showResult(serviceIndex) {
        try {
            const [service, pathSuffix] = servicePageUrls[serviceIndex];
            
            // Convert journey string to URL-friendly format
            const journeyType = journey.toLowerCase()
                .replace('a ', '')
                .replace('an ', '')
                .trim();
            
            // Construct the full URL
            let url;
            if (service === "Strategy Definition") {
                url = new URL(pathSuffix, window.location.href);
            } else {
                url = new URL(`/services/${journeyType}${pathSuffix}`, window.location.href);
            }

            const quizContent = document.getElementById('quizContent');
            const result = document.getElementById('result');
            if (quizContent) quizContent.hidden = true;
            if (result) {
                result.hidden = false;
                result.innerHTML = `
                    <div class="slide__inner">
                        <h2 class="slide__heading">Understood.</h2>
                        <p>Thank you for your input. It looks like you're on <span class="slide__slot--journey">${journey.split(' ').map((word, index) => 
                            index === 0 ? word : `<strong>${word}</strong>`).join(' ')}</span> Journey,
                        and we recommend <span class="slide__slot--service">${service}</span> as the next step for your organization.</p>
                        <p>Click the Learn More button below to see how Tower Strategy Group can assist in this phase of your improvement.</p>
                        <div class="quiz-button-container"> 
                            <button id="retakeQuizBtn" class="slide__button">Retake Quiz</button> 
                            <a href="${url.toString()}" class="slide__button">Learn More</a>
                        </div>
                    </div>
                `;
                const retakeQuizBtn = document.getElementById('retakeQuizBtn');
                if (retakeQuizBtn) retakeQuizBtn.addEventListener('click', resetAndBeginQuiz);
            }
            
            document.body.style.pointerEvents = 'auto';
        } catch (error) {
            console.error('Error in showResult:', error);
        }
    }
            
            // Ensure the page is interactive
            document.body.style.pointerEvents = 'auto';
        } catch (error) {
            console.error('Error in showResult:', error);
        }
    }

    function showNoMatch() {
        try {
            const quizContent = document.getElementById('quizContent');
            const result = document.getElementById('result');
            if (quizContent) quizContent.hidden = true;
            if (result) {
                result.hidden = false;
                result.innerHTML = `
                    <div class="slide__inner">
                        <h2 class="slide__heading">Let's chat.</h2>
                        <p>Your needs may sit outside of our core services. Reach out to us for a one-on-one consultation to more precisely discuss and evaluate fit.
</p>
                        <div class="quiz-button-container">    <button id="retakeQuizBtn" class="slide__button">Retake Quiz</button>
                            <a href="/contact" class="slide__button">Contact Us</a>
  </div>
                    </div>
                `;
                const retakeQuizBtn = document.getElementById('retakeQuizBtn');
                if (retakeQuizBtn) retakeQuizBtn.addEventListener('click', resetAndBeginQuiz);
            }
            
            // Ensure the page is interactive
            document.body.style.pointerEvents = 'auto';
        } catch (error) {
            console.error('Error in showNoMatch:', error);
        }
    }

    function resetAndBeginQuiz() {
        resetQuiz();
beginQuiz();
    }

    function goBack() {
        if (currentStep > 0) {
            currentStep--;
            showStep(quizData[currentStep]);
        }
    }

    function globalClickHandler(event) {
        if (event.target && event.target.id === 'openQuizBtn') {
            openDialog(event);
        }
    }

    function attachEventListeners() {
        const closeQuizBtn = document.getElementById('closeQuizBtn');
        const beginQuizBtn = document.getElementById('beginQuizBtn');
        const quizForm = document.getElementById('quizForm');
        const quizLightbox = document.getElementById('quizLightbox');

        if (closeQuizBtn) closeQuizBtn.addEventListener('click', closeDialog);
        if (beginQuizBtn) beginQuizBtn.addEventListener('click', beginQuiz);
        if (quizForm) quizForm.addEventListener('submit', handleFormSubmit);

        if (quizLightbox) {
            quizLightbox.addEventListener('click', function(event) {
                if (event.target === quizLightbox) {
                    closeDialog();
                }
            });
        }
    }

    function initQuiz() {
        try {
            console.log('Initializing quiz');
            attachEventListeners();
            
            // Use a more specific approach for the open button
            const openQuizBtn = document.getElementById('openQuizBtn');
            if (openQuizBtn) {
                openQuizBtn.addEventListener('click', openDialog);
            } else {
                // Fallback to global listener if button doesn't exist yet
                document.addEventListener('click', globalClickHandler);
            }
        } catch (error) {
            console.error('Error in initQuiz:', error);
        }
    }

    // Run initQuiz on DOMContentLoaded and after a short delay
    document.addEventListener('DOMContentLoaded', initQuiz);
    setTimeout(initQuiz, 1000); // Run again after 1 second to ensure all elements are loaded

    // Make necessary functions globally accessible
    window.openDialog = openDialog;
    window.closeDialog = closeDialog;
    window.handleFormSubmit = handleFormSubmit;
    window.goBack = goBack;
})();
</script>
