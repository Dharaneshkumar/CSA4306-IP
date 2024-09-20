// Function to navigate to a specific page
function navigateTo(page) {
    switch (page) {
        case 'home':
            window.location.href = 'index.html';
            break;
        case 'wallet':
            window.location.href = 'wallet.html';
            break;
        case 'bookings':
            window.location.href = 'bookings.html?tab=current';
            break;
        case 'help':
            window.location.href = 'help.html';
            break;
        case 'account':
            window.location.href = 'account.html';
            break;
        default:
            console.log('Page not found');
    }
}

// Function to handle navigation within the Account page
function showAccountSection(sectionId) {
    const sections = document.getElementsByClassName('account-content');
    
    // Hide all account sections
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}

// Event listener for the search form submission
document.getElementById('search-form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const fromCity = document.getElementById('from').value;
    const toCity = document.getElementById('to').value;
    const departureDate = document.getElementById('date').value;
    const busType = document.getElementById('bus-type').value;
    const departureTime = document.getElementById('departure-time').value;

    // Sample bus data for demonstration
    const buses = [
        { id: '1', from: 'Chennai', to: 'Ongole', type: 'ac', time: 'morning', date: '2024-09-25', details: 'Bus A' },
        { id: '2', from: 'Ongole', to: 'Hyderabad', type: 'non-ac', time: 'afternoon', date: '2024-09-26', details: 'Bus B' },
        { id: '3', from: 'Hyderabad', to: 'Coimbatore', type: 'sleeper', time: 'evening', date: '2024-09-27', details: 'Bus C' },
        { id: '4', from: 'Mysore', to: 'Trivandrum', type: 'ac', time: 'night', date: '2024-09-28', details: 'Bus D' },
        { id: '5', from: 'Madurai', to: 'Chennai', type: 'seater', time: 'morning', date: '2024-09-29', details: 'Bus E' },
        { id: '6', from: 'Ongole', to: 'Chennai', type: 'sleeper', time: 'night', date: '2024-09-29', details: 'Bus F' }
    ];

    // Filter buses based on user inputs
    const filteredBuses = buses.filter(bus => {
        return (
            bus.from === fromCity &&
            bus.to === toCity &&
            bus.date === departureDate &&
            (busType === 'all' || bus.type === busType) &&
            (departureTime === 'any' || bus.time === departureTime)
        );
    });

    // If buses are found, navigate to the bus details page with the selected bus ID
    if (filteredBuses.length > 0) {
        const firstBus = filteredBuses[0]; // Navigate to the first bus details for simplicity
        window.location.href = `bus-details.html?busId=${firstBus.id}`;
    } else {
        alert('No buses found.');
    }
});

// Function to display bus results on the results page
function displayBusResults(buses) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear any previous results

    if (buses.length === 0) {
        resultsDiv.innerHTML = '<p>No buses found.</p>';
        return;
    }

    buses.forEach(bus => {
        const busResult = document.createElement('div');
        busResult.classList.add('bus-result');
        busResult.innerHTML = `
            <p><strong>${bus.details}</strong></p>
            <p>${bus.from} to ${bus.to}</p>
            <p>${bus.type.toUpperCase()} - ${bus.time}</p>
            <p>Departure Date: ${bus.date}</p>
            <a href="bus-details.html?busId=${bus.id}">View Details</a>
        `;
        resultsDiv.appendChild(busResult);
    });
}

// Initialize the tab view on page load based on URL parameter (for pages with tabs)
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab') || 'current'; // Get 'tab' from URL or default to 'current'
    if (document.getElementsByClassName('tab-content').length > 0) {
        showTab(tab);
    }

    // Load bus details if on the bus-details page
    const busId = urlParams.get('busId');
    if (busId) {
        loadBusDetails(busId);
    }
});

// Function to load and display bus details
function loadBusDetails(busId) {
    // Sample bus data for demonstration
    const buses = [
        { id: '1', from: 'Chennai', to: 'Ongole', type: 'ac', time: 'morning', date: '2024-09-25', details: 'Bus A', seats: { female: 10, male: 15 } },
        { id: '2', from: 'Ongole', to: 'Hyderabad', type: 'non-ac', time: 'afternoon', date: '2024-09-26', details: 'Bus B', seats: { female: 8, male: 12 } },
        { id: '3', from: 'Hyderabad', to: 'Coimbatore', type: 'sleeper', time: 'evening', date: '2024-09-27', details: 'Bus C', seats: { female: 5, male: 10 } },
        { id: '4', from: 'Mysore', to: 'Trivandrum', type: 'ac', time: 'night', date: '2024-09-28', details: 'Bus D', seats: { female: 12, male: 18 } },
        { id: '5', from: 'Madurai', to: 'Chennai', type: 'seater', time: 'morning', date: '2024-09-29', details: 'Bus E', seats: { female: 7, male: 10 } },
        { id: '6', from: 'Ongole', to: 'Chennai', type: 'sleeper', time: 'night', date: '2024-09-29', details: 'Bus F', seats: { female: 6, male: 11 } }
    ];

    const bus = buses.find(b => b.id === busId);
    const detailsDiv = document.getElementById('bus-details');
    if (bus && detailsDiv) {
        detailsDiv.innerHTML = `
            <h2>${bus.details}</h2>
            <p>${bus.from} to ${bus.to}</p>
            <p>${bus.type.toUpperCase()} - ${bus.time}</p>
            <p>Departure Date: ${bus.date}</p>
            <p>Available Female Seats: ${bus.seats.female}</p>
            <p>Available Male Seats: ${bus.seats.male}</p>
            <!-- Add more details and seat selection here -->
        `;
    } else {
        console.error('Bus details not found.');
    }
}

// Function to track bus location (update URL or map integration as needed)
function trackBus() {
    const mapUrl = 'https://www.google.com/maps?q=bus+location'; // Example URL
    window.open(mapUrl, '_blank');
}

// Function to chat with support (redirect to chat support page or service)
function chatWithUs() {
    const phoneNumber = '6281666988';
    const message = encodeURIComponent('Hello, I need assistance with my bus booking.'); // Pre-filled message
    const smsUrl = `sms:${phoneNumber}?body=${message}`;
    window.location.href = smsUrl;
}

// Function to call support
function callSupport() {
    const phoneNumber = '6281666988';
    window.location.href = `tel:${phoneNumber}`;
}

// Function to show tab content
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Update active tab button
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
}

// Event listener for payment button
document.getElementById('pay-button').addEventListener('click', function() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (!isNaN(amount) && amount > 0) {
        processPayment(amount);
    } else {
        alert('Please enter a valid amount.');
    }
});

// Function to process payment
function processPayment(amount) {
    // Simulate payment processing (you would replace this with actual payment API calls)
    alert(`Processing payment of ₹${amount}`);
    // Simulate successful payment
    setTimeout(() => {
        alert('Payment successful!');
        // Here you can store the booking information in your database
        storeBooking({ amount });
        navigateTo('bookings'); // Redirect to bookings page after payment
    }, 2000);
}

// Function to store booking
function storeBooking(bookingDetails) {
    // Here you would save the booking details to your database
    console.log('Booking stored:', bookingDetails);
}
// Function to download the ticket
function downloadTicket(bookingId) {
    const ticketData = `
        Booking ID: ${bookingId}
        From: Ongole
        Destination: Chennai
        Date: September 29, 2024
        Status: Confirmed
    `;
    
    const blob = new Blob([ticketData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ticket_${bookingId}.txt`;
    link.click();
}

// Function to view the ticket on a new page
function viewTicket(bookingId) {
    const ticketData = `
        <h2>Ticket Details</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>From:</strong> Ongole</p>
        <p><strong>Destination:</strong> Chennai</p>
        <p><strong>Date:</strong> September 29, 2024</p>
        <p><strong>Status:</strong> Confirmed</p>
    `;

    const ticketWindow = window.open('', '_blank');
    ticketWindow.document.write(`
        <html>
        <head><title>Ticket Details</title></head>
        <body>${ticketData}</body>
        </html>
    `);
    ticketWindow.document.close();
}
