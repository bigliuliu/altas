import { mkConfig, generateCsv, download } from "export-to-csv";

export default function DownloadCSV(data: any[], report: string) {

    try {

        // mkConfig merges your options with the defaults
        // and returns WithDefaults<ConfigOptions>
        const csvConfig = mkConfig({
            useKeysAsHeaders: true,
            filename: generateCSVFileName(report)
        });


        // Generates the CSV output string based on the configurations and data
        const csv = generateCsv(csvConfig)(data);

        // download the csv
        download(csvConfig)(csv);

    } catch (error) {
        console.log(error)
    }

}


function generateCSVFileName(name: string): string {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return `${name}_${currentDate}`;
}



