import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import html2canvas from 'html2canvas'
import axios from 'axios'
import JSZip from 'jszip'
import { getCoordinatesFromLink, getCurrentDateTime } from './utils'

// Helper function to download a file from a URL
const downloadFileFromUrl = async (url: string): Promise<Blob> => {
    const response = await axios.get(url, { responseType: 'blob' });
    return response.data;
};

// Helper function to generate the main property report PDF
const generatePropertyReport = async (data: any, requestor = "") => {
    const doc = new jsPDF();

    // Add company logo
    try {
        const logoData = await axios.get('/img/logo.png', { responseType: 'blob' });
        const logoBase64 = await convertBlobToBase64(logoData.data) as string;
        const logoWidth = 40;
        const logoHeight = 20;
        const startX = 14;
        doc.addImage(logoBase64, 'PNG', startX, 10, logoWidth, logoHeight);
        doc.setFont('Helvetica');
        doc.setFontSize(10);
        doc.setTextColor(0, 100, 0);
        doc.text('Towards a community of transparency and trust', startX + logoWidth + 5, 20);
    } catch (error) {
        console.error('Error loading logo:', error);
    }

    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 30, doc.internal.pageSize.getWidth() - 14, 30);

    // Document Title
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0, 100, 0);
    doc.text('LAND PROPERTY SEARCH RESULTS',
        doc.internal.pageSize.getWidth() / 2, 35,
        { align: 'center' });

    // Property Details Table
    const tableData = [
        ['TITLE NUMBER', data.property.titleLR],
        ['PROPERTY ALIAS', data.property.propertyAlias.toUpperCase()],
        ['COUNTY / REGISTRATION SECTION', `${data.property.county.toUpperCase()} / ${data.property.registrationSection.toUpperCase()}`],
        ['BLOCK NO. / PARCEL NO.', `${data.property.blockNumber.toUpperCase()} / ${data.property.parcelNumber.toUpperCase()}`],
        ['SIZE', `${data.property.sizeHa.toUpperCase()} HA`],
        ['TITLE TYPE', data.property.leaseType.toUpperCase()],
        ['USER TYPE', data.property.userType.toUpperCase()],
        ['GEO-COORDINATES', data.property.propertyCoordinate],
        ['ENCUMBRANCES', data.encumbrances.length],
        ['OWNER', data.property.ownerName.toUpperCase()],
        ['ACQUISITION DATE', data.property.acquisitionDate],
        ['ACQUISITION TYPE', data.property.acquistionType === 'commercial' ?
            'COMMERCIAL PURCHASE' : data.property.acquistionType.toUpperCase()],
        ['BLOCKCHAIN HASH', data.property.transactionUrl],
        ['DISPUTES', data.disputes.length],
        ['MOTHER TITLE', data.property.motherTitle.toUpperCase()],
        ['SEARCH DATE', getCurrentDateTime()]
    ];

    autoTable(doc, {
        body: tableData,
        theme: 'grid',
        styles: {
            fontSize: 8,
            cellPadding: 2,
            lineColor: [200, 200, 200],
            lineWidth: 0.5,
            textColor: [0, 100, 0]
        },
        margin: { top: 45 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 80 },
            1: { cellWidth: 'auto' }
        },
    });

    // Add search requestor and other content
    doc.setFontSize(11);
    doc.text(`Search request for ${requestor}`, 14, doc.internal.pageSize.getWidth() - 5);
    // Add disclaimer
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'italic');
    const disclaimer = `Disclaimer: These results are based on a database of verified land ownership records by Atlas. 
    Whilst Atlas has taken every precaution to ascertain the authenticity of the results, the client is advised to 
    benchmark these results with those obtained from the respective public land registry.`;
    doc.text(disclaimer, 14, doc.internal.pageSize.getWidth() + 10, {
        maxWidth: doc.internal.pageSize.getWidth() - 28,
    });
    // Add company information
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    const companyInfo = [
        'Contacts',
        'Atlas Blockchain Solutions KE',
        'Caxton House, Kenyatta Avenue',
        'P.O. Box 51101 – 00200',
        'info@atlas-ke.net'
    ];
    let yOffset = doc.internal.pageSize.getHeight() - 40; // Start 40 units from the bottom
    companyInfo.forEach((line) => {
        doc.text(line, 14, yOffset);
        yOffset += 5; // Move down 5 units for the next line
    });

    // Property Images Page
    doc.addPage();

    try {
        const imageResponse = await axios.get(data.property.propertyImage, { responseType: 'blob' });
        const imageBase64 = await convertBlobToBase64(imageResponse.data) as string;
        doc.addImage(imageBase64, 'JPEG', 10, 20, 190, 100);
    } catch (error) {
        console.error('Error loading property image:', error);
    }

    try {
        const { lat, lng } = getCoordinatesFromLink(data.property.propertyCoordinate);
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=600x450&markers=color:red%7C${lat},${lng}&maptype=satellite&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
        doc.addImage(mapUrl, 'JPEG', 10, 130, 190, 100);
        doc.textWithLink('View on Google Maps', 10, 240, { url: data.property.propertyCoordinate });
    } catch (error) {
        console.error('Error loading map:', error);
    }

    // Transfer History Page
    doc.addPage();
    doc.text('Property Transfer History', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const timelineContainer = document.getElementById('transfer-history');
    if (timelineContainer) {
        try {
            const canvas = await html2canvas(timelineContainer, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff'
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - (2 * margin);
            const maxHeight = pageHeight - 60;
            const scaleWidth = maxWidth / canvas.width;
            const scaleHeight = maxHeight / canvas.height;
            const scale = Math.min(scaleWidth, scaleHeight);
            const finalWidth = canvas.width * scale;
            const finalHeight = canvas.height * scale;
            const xPos = (pageWidth - finalWidth) / 2;
            const timelineImage = canvas.toDataURL('image/png');
            doc.addImage(timelineImage, 'PNG', xPos, 40, finalWidth, finalHeight);
        } catch (error) {
            console.error('Error generating transfer history:', error);
        }
    }

    // Title History Page
    doc.addPage();
    doc.text('Property Title History', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const titleTimeline = document.getElementById('title-history');
    if (titleTimeline) {
        try {
            const canvas = await html2canvas(titleTimeline, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: '#ffffff'
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxWidth = pageWidth - (2 * margin);
            const maxHeight = pageHeight - 60;
            const scaleWidth = maxWidth / canvas.width;
            const scaleHeight = maxHeight / canvas.height;
            const scale = Math.min(scaleWidth, scaleHeight);
            const finalWidth = canvas.width * scale;
            const finalHeight = canvas.height * scale;
            const xPos = (pageWidth - finalWidth) / 2;
            const timelineImage = canvas.toDataURL('image/png');
            doc.addImage(timelineImage, 'PNG', xPos, 40, finalWidth, finalHeight);
        } catch (error) {
            console.error('Error generating transfer history:', error);
        }
    }

    // Add footer to all pages
    const pageCount = (doc.internal as unknown as { getNumberOfPages: () => number }).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Copyright © Atlas Blockchain Ltd',
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' });
    }

    return doc;
};

// Helper function to convert Blob to Base64
const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Generate filename with timestamp
const generateFilename = (prefix: string, extension: string): string => {
    const timestamp = new Date().toISOString().slice(0, 10);
    return `${prefix}_${timestamp}.${extension}`;
};

// Main export function that handles the generation and zipping of all documents
export const generateAndZipDocuments = async (
    data: any,
    requestor = ""
) => {
    try {
        // Create new ZIP file
        const zip = new JSZip();

        // Generate main property report
        const mainReport = await generatePropertyReport(data, requestor);
        zip.file(generateFilename('atlas_search_results', 'pdf'), mainReport.output('blob'));

        // Download title deed if available
        if (data.property.propertyTitleDeed) {
            const titleDeed = await downloadFileFromUrl(data.property.propertyTitleDeed);
            const extension = titleDeed.type.includes('pdf') ? 'pdf' : 'jpg';
            zip.file(generateFilename('title_deed', extension), titleDeed);
        }

        // Download commission results if available
        if (data.commission?.length > 0) {
            const commissionResults = await downloadFileFromUrl(data.commission[0]?.attachment);
            const extension = commissionResults.type.includes('pdf') ? 'pdf' : 'jpg';
            zip.file(generateFilename('registry_results', extension), commissionResults);
        }

        // Generate and download the zip file
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = generateFilename('atlas_property_documents', 'zip');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(zipUrl);

    } catch (error) {
        console.error('Error generating documents:', error);
        throw error;
    }
};