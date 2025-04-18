import { convertToShortDateMonthDay } from "@/lib/utils";

export default function TitleHistory({ history = [] }: { history: any[] }) {
    console.log('=== HISTORY ===', history)
    return (
        <ol id="title-history"  className="relative border-s border-blue-400 dark:border-blue-700">
            {history.map(hist => (
                <li key={hist.date} className="mb-10 ms-4">
                    <div className="absolute w-3 h-3 bg-green-600 rounded-full mt-1.5 -start-1.5 border border-white dark:border-black dark:bg-green-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-green-600 dark:text-green-500">{convertToShortDateMonthDay(hist.date)}</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{hist.title}</h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Owned By: {hist.owner}</p>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Total Size (Ha): {hist.size}</p>
                    <div className="flex items-center">
                        <a target="_blank" href={hist.titleURL} className="mr-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-green-400 rounded-lg hover:bg-green-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">View Title <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg></a>
                        <a target="_blank" href={hist.locationURL} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-green-400 rounded-lg hover:bg-green-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">View Location <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg></a>
                    </div>
                </li>
            ))}
        </ol>
    )
}