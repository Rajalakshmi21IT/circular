function generateHolidayCircular() {
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    const fromDateValue = new Date(fromDateInput.value);
    const toDateValue = toDateInput.value ? new Date(toDateInput.value) : null;

    let daysValue;
    let pluralDays = "";

    if (!toDateValue) {
        daysValue = 1;
        pluralDays = daysValue > 1 ? "s" : ""; // Check if plural is needed
    } else {
        if (toDateValue <= fromDateValue) {
            alert('The "To Date" must be after the "From Date".');
            return;
        }

        const timeDifference = toDateValue.getTime() - fromDateValue.getTime();
        daysValue = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
        pluralDays = daysValue > 1 ? "s" : ""; // Check if plural is needed
    }

    let circularContent = `
        <div style="font-family: 'Times New Roman', Times, serif; padding: 20px; border: 1px solid #ddd; max-width: 800px; margin: 50px auto;">
            <h2 style="text-align: center;">National Engineering College</h2>
            <h3 style="text-align: center; margin-bottom: 100px;">Holiday Circular</h3>
            <p><strong>Date: ${new Date().toLocaleDateString()}</strong></p>
            <p><strong style="margin-bottom: 60px;">Number of Days: ${daysValue}</strong></p>
            <p style="margin-bottom: 60px;"></p>`;

    if (daysValue === 1) {
        circularContent += `
            <p>This circular is issued to announce a holiday on <strong>${fromDateValue.toLocaleDateString()}</strong>.</p>`;
    } else {
        circularContent += `
            <p>This circular is issued to announce holiday${pluralDays} from <strong>${fromDateValue.toLocaleDateString()}</strong> to <strong>${toDateValue.toLocaleDateString()}</strong>.</p>`;
    }

    circularContent += `
            <p>We wish you a pleasant holiday${pluralDays}. Please make necessary arrangements accordingly.</p>
            <p>Enjoy your break and return refreshed!</p>
            <p style="margin-top: 140px; text-align: right;">
                Best regards,<br>
                <strong>Principal</strong><br>
                <strong>National Engineering College</strong>
            </p>
        </div>`;

    localStorage.setItem('circularContent', circularContent);
    window.location.href = 'circular.html';
}
