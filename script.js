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
        'Software Team': ['Describe a challenging programming problem you have solved.', 'Which programming language are you most comfortable with and why?', 'What is your experience with version control systems like Git?', 'What kind of software projects are you passionate about building?'],
        'Hardware Team': ['Have you worked with microcontrollers before? Describe a project.', 'What is your understanding of basic electronic components?', 'How would you approach debugging a circuit that isn\'t working?', 'What hardware project would you be excited to build with a team?'],
        'Marketing Team': ['How would you promote a club event to maximize student attendance?', 'Describe a successful social media campaign you admire. What made it effective?', 'What strategies would you use to find potential sponsors for the club?', 'How do you measure the success of a marketing campaign?'],
        'Creative Team': ['What design software are you proficient in (e.g., Photoshop, Canva, Figma)?', 'Describe a design project you are proud of. What was your process?', 'How do you approach creating a visual identity for a new project or event?', 'Where do you find inspiration for your creative work?'],
        'Content Team': ['What type of content do you most enjoy creating (e.g., articles, scripts, social media posts)?', 'Provide an example of how you would explain a complex technical topic in simple terms.', 'How do you ensure your writing is engaging and error-free?', 'What is your process for researching a new topic to write about?'],
        'Web Development Team': ['Describe your experience with HTML, CSS, and JavaScript.', 'Have you worked with any web frameworks (like React, Vue, Angular)? If so, which ones?', 'What is the purpose of a REST API in web development?', 'Describe a web project you have built or contributed to.']
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
