const favoriteButton = document.querySelector("#favoriteButton");
const markAsCompleteButton = document.querySelector("#markAsCompleteButton");

favoriteButton.addEventListener('click', markFavorite);
markAsCompleteButton.addEventListener('click', markComplete);

async function markFavorite() {
    const exerciseId = this.dataset.id;

    try {
        await fetch('/markFavorite', {
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
