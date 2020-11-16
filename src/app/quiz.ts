/**
 * Quiz data structure
 * Used to transfer quiz statistics to backend
 */
 export class Quiz {
    id: string;
    numQuestions: number;
    numFail: number;
    numPass: number;

    everFailPct: number;
    failPct: number;
    rarePct: number;
    passPct: number;

    totalPass: number;
    totalFail: number;
    totalRare: number;
}
