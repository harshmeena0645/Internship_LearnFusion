document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const dob = new Date(document.getElementById('dob').value);
    const now = new Date();
    
    if (isNaN(dob.getTime())) {
        document.getElementById('result').textContent = 'Please enter a valid date of birth.';
    } else if (dob > now) {
        document.getElementById('result').textContent = 'Invalid date of birth.';
    } else {
        const age = calculateFullAge(dob, now);
        document.getElementById('result').textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
    }
});

document.getElementById('ageBetweenDatesForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const startDate = new Date(document.getElementById('startDate').value);
    const endDate = new Date(document.getElementById('endDate').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        document.getElementById('resultBetweenDates').textContent = 'Please enter valid dates.';
    } else if (startDate > endDate) {
        document.getElementById('resultBetweenDates').textContent = 'The start date cannot be after the end date.';
    } else {
        const age = calculateFullAge(startDate, endDate);
        document.getElementById('resultBetweenDates').textContent = `The duration between the dates is ${age.years} years, ${age.months} months, and ${age.days} days.`;
    }
});

function calculateFullAge(dob, now) {
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}
