/**
 * User data structure
 * Used to transfer user statistics to backend
 */
export class User {
     firstName: string;
     lastName: string;
     email: string;
     pictureUrl: string;
     numQuestions: number;
     failPct: number;
     everFailPct: number;
     rarePct: number;
     passPct: number;
     random: boolean;
     testType: string;
}
