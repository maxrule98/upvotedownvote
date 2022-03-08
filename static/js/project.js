
const url = `https://jsonplaceholder.typicode.com/posts/${id}`


const run = async () => {
    const request = await fetch(url)
    const response = await request.json()
    
    const mainStuff = document.querySelector('#mainContent')
    console.log(response);

    const template = `
    <section class='relative bg-gray-300 p-5'>
        <h3>${response.title}</h3>
        <hr class="py-5">
        <p>
        ${response.body}
        </p>
    </section>
    `
    mainStuff.insertAdjacentHTML('beforeend',template)
}

run()