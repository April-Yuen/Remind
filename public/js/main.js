// const { response } = require("express");

const favoriteButton = document.querySelector(".notfavoriteButton");
const notFavoriteButton = document.querySelector(".favoriteButton")
const markAsCompleteButton = document.querySelector("#markAsCompleteButton");

if (favoriteButton){
    favoriteButton.addEventListener('click', markFavorite);
}else{
    notFavoriteButton.addEventListener("click", notFavorite)
}
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

async function notFavorite(){
    const exerciseId = this.dataset.id
    console.log(exerciseId)
    try {
        const response = await fetch('/markNotFavorite', {
            method: 'put',
            headers: {'Content-type': 'application/json'}, 
            body: JSON.stringify({
                'exerciseId': exerciseId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.log(error)
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
