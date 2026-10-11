(function (global) {
    function createRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getHint(secretNumber, guess) {
        if (guess === secretNumber) {
            return 'correct';
        }

        return guess < secretNumber ? 'too low' : 'too high';
    }

    const MIN_NUMBER = 1;
    const MAX_NUMBER = 100;

    if (typeof document !== 'undefined') {
        let secretNumber = createRandomNumber(MIN_NUMBER, MAX_NUMBER);
        let attempts = 0;

        const form = document.getElementById('guess-form');
        const input = document.getElementById('guess-input');
        const message = document.getElementById('message');
        const attemptsDisplay = document.getElementById('attempts');
        const resetButton = document.getElementById('reset-btn');

        function setMessage(text) {
            message.textContent = text;
        }

        function resetGame() {
            secretNumber = createRandomNumber(MIN_NUMBER, MAX_NUMBER);
            attempts = 0;
            attemptsDisplay.textContent = `Attempts: ${attempts}`;
            input.value = '';
            input.disabled = false;
            form.querySelector('button[type="submit"]').disabled = false;
            setMessage('Start guessing!');
            input.focus();
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const guess = Number(input.value);

            if (!Number.isInteger(guess) || guess < MIN_NUMBER || guess > MAX_NUMBER) {
                setMessage(`Please enter a whole number from ${MIN_NUMBER} to ${MAX_NUMBER}.`);
                return;
            }

            attempts += 1;
            attemptsDisplay.textContent = `Attempts: ${attempts}`;

            const hint = getHint(secretNumber, guess);

            if (hint === 'correct') {
                setMessage(`Correct! You guessed the number in ${attempts} attempts.`);
                input.disabled = true;
                form.querySelector('button[type="submit"]').disabled = true;
                return;
            }

            setMessage(
                hint === 'too low'
                    ? 'Too low! Try a higher number.'
                    : 'Too high! Try a lower number.'
            );
        });

        resetButton.addEventListener('click', resetGame);
    }

    const api = { createRandomNumber, getHint };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    global.GameLogic = api;
})(typeof window !== 'undefined' ? window : globalThis);
