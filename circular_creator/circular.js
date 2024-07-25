function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('circular-content')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        let imgHeight = canvas.height * imgWidth / canvas.width;

        let yOffset = 0;
        if (imgHeight > pdfHeight) {
            const scaleFactor = pdfHeight / imgHeight;
            imgWidth = pdfWidth * scaleFactor;
            imgHeight = pdfHeight;
            yOffset = 0;
        } else {
            yOffset = (pdfHeight - imgHeight) / 2;
        }

        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        pdf.save('circular.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}
