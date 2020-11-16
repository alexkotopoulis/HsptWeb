/**
 * Word data structure
 * Used to transfer word statistics from and to backend
 */
 export class Word {
    word: string;
    meaning: string;
    category: number;
    totalPass: number;
    totalFail: number;
}
