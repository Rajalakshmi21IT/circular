document.addEventListener('DOMContentLoaded', () => {
    const circularContent = localStorage.getItem('circularContent');
    document.getElementById('circular-content').innerHTML = circularContent;
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('circular-content')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const border = 20; // 2 cm border in mm

        const availableWidth = pdfWidth - 2 * border;
        const availableHeight = pdfHeight - 2 * border;

        const imgWidth = availableWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let x = border;
        let y = border;

        if (imgHeight > availableHeight) {
            const scalingFactor = availableHeight / imgHeight;
            imgWidth = imgWidth * scalingFactor;
            imgHeight = availableHeight;
            x = (pdfWidth - imgWidth) / 2;
        } else {
            y = (pdfHeight - imgHeight) / 2;
        }

        doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        doc.save('circular.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}
