// --- NEW: SPLASH SCREEN LOGIC ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.querySelector('.main-container');

    // Total time the splash screen is visible (in milliseconds)
    const splashDuration = 3000; // 3 seconds

    setTimeout(() => {
        // Start fading out the splash screen
        splashScreen.classList.add('hidden');

        // Start fading in the main content
        mainContent.classList.add('visible');
    }, splashDuration);
});


// --- MAIN FORM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    //
    // >>>>>>>>>> THIS IS THE UPDATED jobData OBJECT <<<<<<<<<<
    //
    const jobData = {
        'Hardware Team': {
            summary: 'Work on designing and building physical electronic circuits, prototyping with microcontrollers, and bringing ideas to life through hardware.',
            link: 'https://docs.google.com/document/d/YOUR_HARDWARE_JD_LINK_HERE' // <-- PASTE YOUR LINK
        },
        'Software Team': {
            summary: 'Focus on algorithms, competitive programming, and building the logic that powers our most innovative projects. A great place for problem solvers.',
            link: 'https://docs.google.com/document/d/YOUR_SOFTWARE_JD_LINK_HERE' // <-- PASTE YOUR LINK
        },
        'Marketing Team': {
            summary: 'Become the voice of Gelectra. You will manage our social media, create engaging campaigns, and connect with sponsors and collaborators.',
            link: 'https://docs.google.com/document/d/YOUR_MARKETING_JD_LINK_HERE' // <-- PASTE YOUR LINK
        },
        'Creative Team': {
            summary: 'The visual architects of our brand. You will be responsible for designing stunning posters, videos, and all visual content that represents Gelectra.',
            link: 'https://docs.google.com/document/d/YOUR_CREATIVE_JD_LINK_HERE' // <-- PASTE YOUR LINK
        },
        'Content Team': {
            summary: 'The storytellers of the club. You will craft compelling narratives, write articles, and create scripts for our projects and social media.',
            link: 'https://docs.google.com/document/d/YOUR_CONTENT_JD_LINK_HERE' // <-- PASTE YOUR LINK
        },
        'Web Development Team': {
            summary: 'Builders of our digital home. You will develop and maintain the club\'s website and web-based applications using modern technologies.',
            link: 'https://docs.google.com/document/d/YOUR_WEBDEV_JD_LINK_HERE' // <-- PASTE YOUR LINK
        }
    };

    const questionData = {
        'Marketing Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'Suggest one creative idea to promote a technical event on campus.',
            'How would you convince students to participate in our events?',
            'If given a very low budget, how would you market an event effectively?'
        ],
        'Content Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'What type of content do you personally enjoy reading or watching the most (blogs, stories, reels, news, etc.)? Why?',
            'Write a short caption (2–3 lines) for a recruitment poster to attract students.',
            'How would you explain a technical event to someone from a non-technical background in simple words?'
        ],
        'Creative Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'Which tools/software do you use for design/video editing?',
            'If asked to design a poster for an event in 1 hour, how would you approach it?',
            'Share one idea to make our posters/graphics stand out from other clubs.'
        ],
        'Hardware Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'Have you ever worked on hardware projects (Arduino, Raspberry Pi, circuits)? If yes, mention briefly.',
            'Explain one simple hardware idea you would like to build if given resources.',
            'Which excites you more: learning new hardware skills or applying existing ones to solve problems?'
        ],
        'Software Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'Have you ever worked on coding projects (apps, websites, automations, etc.)? If yes, mention briefly.',
            'Explain one simple software idea you would like to build if given resources.',
            'Which excites you more: learning new coding skills or applying existing ones to solve problems?'
        ],
        'Web Development Team': [
            'What motivated you to join G-Electra, and what do you expect to gain by being a part of the club?',
            'Which skills or strengths do you feel you can contribute to the club?',
            'How much time can you dedicate to club activities in a week, considering your academics?',
            'Have you ever worked with web technologies (HTML, CSS, JavaScript, or frameworks)? If yes, mention briefly.',
            'What feature would you like to add if you were building a website for G-Electra?',
            'Do you prefer focusing more on front-end design (UI/UX) or back-end logic (databases, server-side)? Why?'
        ]
    };


    let formData = {};
    const steps = document.querySelectorAll('.form-step');
    const loader = document.getElementById('loader');
    const formStep1 = document.getElementById('form-step1');
    const emailInput = document.getElementById('email');
    const step1Error = document.getElementById('step1-error');
    const domainOptions = document.getElementById('domain-options');
    const jobDescBox = document.getElementById('job-description-box');
    const suitsMeCheckbox = document.getElementById('suitsMe');
    const nextStep2Btn = document.getElementById('next-step2');
    const prevStep2Btn = document.getElementById('prev-step2');
    const step2Error = document.getElementById('step2-error');
    const formStep3 = document.getElementById('form-step3');
    const questionsContainer = document.getElementById('questions-container');
    const questionsTitle = document.getElementById('questions-title');
    const prevStep3Btn = document.getElementById('prev-step3');
    const thankYouMessage = document.getElementById('thank-you-message');

    const showStep = (stepNumber) => {
        steps.forEach((step, index) => {
            step.classList.toggle('active-step', index + 1 === stepNumber);
        });
    };

    // Find this block in your script.js and ensure it is correct
    formStep1.addEventListener('submit', (e) => {
        e.preventDefault();
        step1Error.style.display = 'none';
        const validDomains = ['@gitam.in', '@student.gitam.edu', '@gitam.edu'];
        if (!validDomains.some(domain => emailInput.value.endsWith(domain))) {
            step1Error.textContent = 'Please use a valid GITAM email address.';
            step1Error.style.display = 'block';
            return;
        }
        // Store data from Step 1
        formData.name = document.getElementById('name').value;
        formData.phone = document.getElementById('phone').value;
        formData.regNo = document.getElementById('regNo').value;
        formData.email = document.getElementById('email').value;
        formData.year = document.getElementById('year').value;
        // THIS LINE IS CRUCIAL
        formData.branch = document.getElementById('branch').value;
        formData.school = document.getElementById('school').value;
        showStep(2);
    });

    Object.keys(jobData).forEach(domain => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'domain-btn';
        button.textContent = domain;
        button.dataset.domain = domain;
        domainOptions.appendChild(button);
    });

    //
    // >>>>>>>>>> THIS IS THE UPDATED EVENT LISTENER FOR THE JD BOX <<<<<<<<<<
    //
    domainOptions.addEventListener('click', (e) => {
        if (e.target.classList.contains('domain-btn')) {
            document.querySelectorAll('.domain-btn').forEach(btn => btn.classList.remove('selected'));
            e.target.classList.add('selected');

            const selectedDomain = e.target.dataset.domain;
            formData.domain = selectedDomain;

            const domainInfo = jobData[selectedDomain];

            jobDescBox.innerHTML = ''; // Clear previous content

            const heading = document.createElement('h3');
            heading.className = 'jd-title';
            heading.textContent = `Interested in ${selectedDomain.toUpperCase()}???`;
            jobDescBox.appendChild(heading);

            const summaryP = document.createElement('p');
            summaryP.textContent = domainInfo.summary;
            jobDescBox.appendChild(summaryP);

            const jdLink = document.createElement('a');
            jdLink.href = domainInfo.link;
            jdLink.textContent = 'View Complete JD';
            jdLink.className = 'jd-button';
            jdLink.target = '_blank';
            jdLink.rel = 'noopener noreferrer';
            jobDescBox.appendChild(jdLink);

            jobDescBox.style.display = 'block';
        }
    });

    nextStep2Btn.addEventListener('click', () => {
        step2Error.style.display = 'none';
        if (!formData.domain) {
            step2Error.textContent = 'Please select a domain.';
            step2Error.style.display = 'block';
            return;
        }
        if (!suitsMeCheckbox.checked) {
            step2Error.textContent = 'Please confirm this role suits you by checking the box.';
            step2Error.style.display = 'block';
            return;
        }
        generateQuestions(formData.domain);
        showStep(3);
    });
    prevStep2Btn.addEventListener('click', () => showStep(1));

    const generateQuestions = (domain) => {
        questionsTitle.textContent = `${domain} Application`;
        questionsContainer.innerHTML = '';
        const questions = questionData[domain];
        questions.forEach((q, index) => {
            const block = document.createElement('div');
            block.className = 'question-block';
            block.innerHTML = `<label for="q${index + 1}">Question ${index + 1}: ${q}</label><textarea id="q${index + 1}" class="input-field" required></textarea>`;
            questionsContainer.appendChild(block);
        });
    };

    formStep3.addEventListener('submit', async (e) => {
        e.preventDefault();
        formData.answers = {};
        const textareas = questionsContainer.querySelectorAll('textarea');
        textareas.forEach((textarea, index) => {
            formData.answers[`q${index + 1}`] = textarea.value;
        });
        loader.style.display = 'flex';

        try {
            const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzQ4UEyFXe2qFvDBt9qrvAhgXtWbSR5YCe-sh8dDWmy3Pj_cNN2QTfjRysaslQnGiqv-g/exec";

            await fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                redirect: 'follow'
            });

            loader.style.display = 'none';
            thankYouMessage.textContent = `Thank you for applying, ${formData.name}!`;
            showStep(4);

        } catch (error) {
            loader.style.display = 'none';
            console.error("Network Error:", error);
            alert("An error occurred while submitting. Please try again.");
        }
    });
    prevStep3Btn.addEventListener('click', () => showStep(2));
});


//const CLIENT_ID = '1071851313355-3m8so543978ankm4iq83rkegc0qkq828.apps.googleusercontent.com';
//const SPREADSHEET_ID = '1Ry5D4dYzn73g7-OxZZNm_q3XVEdINL5_jtRgB7SF6ck';
