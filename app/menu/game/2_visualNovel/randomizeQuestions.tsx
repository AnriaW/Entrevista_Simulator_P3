import { categories, categoriesKeys } from './categories';

const randomNumber = (max: number): number => {
    return Math.floor(Math.random() * (max));
};

const randomKey = (keys: string[]): string => {
    return keys[Math.floor(Math.random() * keys.length)];
};

function getRandomQuestionInList(questionsList: string[]) {
    return questionsList[randomNumber(questionsList.length)];
}

function getQuestions(qtt: number) {
    const questions: string[] = [];

    for (let i = 0; i < qtt; i++) {
        const categorie = randomKey(categoriesKeys);

        questions.push(
            categorie + ':\n' +
            getRandomQuestionInList(
                categories[categorie]
            )
        );
    }

    return questions;
}

export default getQuestions;