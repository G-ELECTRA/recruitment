/* =================== CONFIGURATION =================== */
const CLIENT_ID = '1071851313355-3m8so543978ankm4iq83rkegc0qkq828.apps.googleusercontent.com'; 
const SPREADSHEET_ID = '1Ry5D4dYzn73g7-OxZZNm_q3XVEdINL5_jtRgB7SF6ck';
const ADMIN_EMAILS = [
    'gelectra@gitam.edu', 
    'another.admin@student.gitam.edu'
];
// You need an API Key for this modern approach. Go to Cloud Console -> APIs & Services -> Credentials -> Create Credentials -> API Key
const API_KEY = 'AIzaSyBRMGIZW8NDarA2QigqQcas86fTJrP_GCs';
/* ================= END CONFIGURATION ================= */


// --- NO NEED TO EDIT BELOW THIS LINE ---
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/userinfo.email";

let tokenClient;
let gapiInited = false;
let gisInited = false;

const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const authButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');

authButton.style.visibility = 'hidden';
signoutButton.style.visibility = 'hidden';
authButton.onclick = handleAuthClick;
signoutButton.onclick = handleSignoutClick;

// Add this with the other button listeners near the top of admin.js

// Add this with the other button listeners near the top of admin.js

const refreshButton = document.getElementById('refresh_button');
refreshButton.onclick = async () => {
    // Give user feedback that data is loading
    refreshButton.textContent = 'Refreshing...';
    refreshButton.disabled = true;

    // Re-run the function that fetches data and redraws the charts
    await loadSheetData();

    // Reset the button state
    refreshButton.textContent = 'Refresh Data';
    refreshButton.disabled = false;
};

function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
    try {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: DISCOVERY_DOCS,
        });
        gapiInited = true;
        maybeEnableButtons();
    } catch (err) {
        console.error("Error initializing GAPI client:", err);
        alert("Could not initialize Google API Client. Check API Key and console for errors.");
    }
}

function gisLoaded() {
    try {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // Will be defined fresh on each click
        });
        gisInited = true;
        maybeEnableButtons();
    } catch (err) {
        console.error("Error initializing GIS client:", err);
        alert("Could not initialize Google Sign-In. Check Client ID and console for errors.");
    }
}

function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        authButton.style.visibility = 'visible';
    }
}

function handleAuthClick() {
    tokenClient.callback = async (tokenResponse) => {
        if (tokenResponse.error) {
            console.error(tokenResponse.error);
            return;
        }

        // The user is signed in, now check if they are an admin
        await checkUserAndLoadDashboard();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select an account and grant consent if they haven't done so yet
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for returning users
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

async function checkUserAndLoadDashboard() {
     try {
        // We can't use gapi.client.people anymore. The modern way is to use a different endpoint.
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${gapi.client.getToken().access_token}`
            }
        });
        const userInfo = await response.json();
        const userEmail = userInfo.email.toLowerCase();
        
        if (ADMIN_EMAILS.includes(userEmail)) {
            loginScreen.style.display = 'none';
            dashboardScreen.style.display = 'block';
            signoutButton.style.visibility = 'visible';
            loadSheetData();
        } else {
            alert('Access Denied. This Google account is not authorized.');
            handleSignoutClick();
        }
    } catch (err) {
        console.error("Error checking user email:", err);
        alert("Could not verify your email address. Please try again.");
    }
}

function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token, () => {
            gapi.client.setToken('');
            loginScreen.style.display = 'block';
            dashboardScreen.style.display = 'none';
            signoutButton.style.visibility = 'hidden';
        });
    }
}

async function loadSheetData() {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Master Data!A2:I',
        });
        const rows = response.result.values || [];
        if (rows.length === 0) {
            alert("No data found in the 'Master Data' sheet. Please make sure applications have been submitted.");
            return;
        }
        processDataAndRenderCharts(rows);
    } catch (err) {
        console.error(err);
        alert('An error occurred while fetching data from the sheet. Check the console for more details.');
    }
}

// Replace the entire old function with this new one
function processDataAndRenderCharts(rows) {
    //
    // >>>>>>>>>> THIS IS THE FIX <<<<<<<<<<
    // Filter out any rows that don't have a value in the first column (Timestamp)
    const filteredRows = rows.filter(row => row && row[0]);
    //
    // >>>>>>>>>>>>>>> END OF FIX <<<<<<<<<<<<<<<
    //

    // Now, use the filteredRows array for all calculations
    document.getElementById('total-applicants').textContent = filteredRows.length;

    const yearCounts = {}, branchCounts = {}, domainCounts = {};
    
    // Make sure this loop uses filteredRows
    filteredRows.forEach(row => {
        // Column indexes (0-based): Year is 5 (F), Branch is 6 (G), Domain is 8 (I)
        const year = row[5] || 'N/A';
        const branch = row[6] || 'N/A';
        const domain = row[8] || 'N/A';

        yearCounts[year] = (yearCounts[year] || 0) + 1;
        branchCounts[branch] = (branchCounts[branch] || 0) + 1;
        domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });

    if (window.myCharts) { Object.values(window.myCharts).forEach(chart => chart.destroy()); }
    window.myCharts = {};
    
    window.myCharts.yearChart = new Chart(document.getElementById('year-chart'), { type: 'pie', data: { labels: Object.keys(yearCounts), datasets: [{ data: Object.values(yearCounts), backgroundColor: ['#f3a73c', '#ffb84d', '#4a5568', '#94a3b8'] }] } });
    window.myCharts.branchChart = new Chart(document.getElementById('branch-chart'), { type: 'doughnut', data: { labels: Object.keys(branchCounts), datasets: [{ data: Object.values(branchCounts), backgroundColor: ['#f3a73c', '#ffb84d', '#e2e8f0', '#94a3b8', '#4a5568', '#2d3748', '#1a202c'] }] } });
    window.myCharts.domainChart = new Chart(document.getElementById('domain-chart'), { type: 'bar', data: { labels: Object.keys(domainCounts), datasets: [{ label: 'Applicants', data: Object.values(domainCounts), backgroundColor: '#f3a73c' }] }, options: { scales: { y: { beginAtZero: true, ticks: { color: '#e2e8f0' } }, x: { ticks: { color: '#e2e8f0' } } }, plugins: { legend: { display: false } } } });
}
