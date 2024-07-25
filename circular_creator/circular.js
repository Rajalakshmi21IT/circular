function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('circular-content'), { scale: 1 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // PDF dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Image dimensions
        const imgWidth = pdfWidth;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        let yOffset = 0;
        if (imgHeight > pdfHeight) {
            const scaleFactor = pdfHeight / imgHeight;
            imgWidth *= scaleFactor;
            imgHeight = pdfHeight;
            yOffset = 0;
        } else {
            yOffset = (pdfHeight - imgHeight) / 2;
        }

        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        pdf.save('circular.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    });
}
