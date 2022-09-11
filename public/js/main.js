const todoItem = document.querySelector(".not")

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markFavorite)
})
document.querySelector('.not').addEventListener('click', markFavorite)

async function markFavorite(){
    const todoId = this.attributes[4].value
    
    try{
        const response = await fetch('/markFavorite', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
