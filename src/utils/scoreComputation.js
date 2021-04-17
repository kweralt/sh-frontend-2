export default function computeScore(responseObject) {
    let categoryScores = [];

    responseObject.forEach((category) => {
        var weightage = category.weightage;
        var numberOfQuestions = category.questions.length;
        var rawScore = 0;

        category.questions.forEach((question) => {
            var answer = parseInt(question.value);

            if (answer === 0) { // Yes
                rawScore++;
            } else if (answer !== 1) { // NA
                numberOfQuestions--;
            }

        });

        categoryScores.push(weightage * rawScore / numberOfQuestions);
        
    });

    var totalScore = 0;

    categoryScores.forEach((score) => totalScore += score);

    return totalScore;
}