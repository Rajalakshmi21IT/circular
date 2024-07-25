function downloadPDF() {
    const { jsPDF } = window.jspdf;

    html2canvas(document.getElementById('circular-content')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let x = 0;
        let y = (pdfHeight - imgHeight) / 2;

        if (imgHeight > pdfHeight) {
            const scalingFactor = pdfHeight / imgHeight;
            imgWidth *= scalingFactor;
            imgHeight = pdfHeight;
            y = 0;
        }

        doc.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        doc.save('circular.pdf');
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
}
