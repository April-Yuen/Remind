// const { response } = require("express");

const favoriteButton = document.querySelector(".favoriteButton");
const notFavoriteButton = document.querySelector(".notFavoriteButton")
const markAsCompleteButton = document.querySelector("#markAsCompleteButton");

favoriteButton.addEventListener('click', markFavorite);
markAsCompleteButton.addEventListener('click', markComplete);

async function markFavorite() {
    const exerciseId = this.dataset.id;
    console.log(exerciseId)

    try {
        await fetch('/markFavorite', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'exerciseId' : exerciseId
            })
        });

        const data = await response.json()
        console.log(data)
        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function markComplete() {
    const exerciseId = this.dataset.id;

    try {
        await fetch('/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                exerciseId
            })
        });

        window.location.reload();
    } catch (err) {
        console.log(err);
    }
}
