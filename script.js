// 1. Data for the calendar
const months = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

let currentMonthIndex = 0; // Starting at January
const year = 2026;

// 2. Select HTML elements
const monthLabel = document.getElementById('monthLabel');
const calendarGrid = document.getElementById('calendarGrid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 3. Function to render the calendar
function renderCalendar(monthIdx) {
    // Clear previous days
    calendarGrid.innerHTML = "";
    
    // Update labels
    monthLabel.innerText = months[monthIdx];

    // Get the first day of the month (0 = Sunday, 1 = Monday...)
    // We want Mon-Sun, so we adjust the calculation
    let firstDay = new Date(year, monthIdx, 1).getDay();
    // Adjust so Monday is 0 and Sunday is 6
    let startingPoint = (firstDay === 0) ? 6 : firstDay - 1;

    // Get total days in current month
    let daysInMonth = new Date(year, monthIdx + 1, 0).getDate();

    // Create empty slots for days of previous month
    for (let i = 0; i < startingPoint; i++) {
        const emptyDiv = document.createElement('div');
        calendarGrid.appendChild(emptyDiv);
    }

    // Create actual day numbers
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerText = day;

        // Bonus: Highlight today if the real-world date matches
        const today = new Date();
        if (today.getDate() === day && 
            today.getMonth() === monthIdx && 
            today.getFullYear() === year) {
            dayDiv.classList.add('today');
        }

        calendarGrid.appendChild(dayDiv);
    }
}

// 4. Navigation Logic
prevBtn.addEventListener('click', () => {
    currentMonthIndex--;
    if (currentMonthIndex < 0) currentMonthIndex = 11;
    renderCalendar(currentMonthIndex);
});

nextBtn.addEventListener('click', () => {
    currentMonthIndex++;
    if (currentMonthIndex > 11) currentMonthIndex = 0;
    renderCalendar(currentMonthIndex);
});

// Initial call to show January on page load
renderCalendar(currentMonthIndex);