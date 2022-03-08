console.log("JS LOADED");

const url = 'https://jsonplaceholder.typicode.com/posts'


const run = async () => {
    const request = await fetch(url)
    const response = await request.json()
    
    const mainStuff = document.querySelector('#mainContent')
    console.log(response);

    response.forEach(el => {
        const template = `
        <section class='relative bg-gray-300 p-5'>
            <a href="/project/${el.id}" class="absolute w-full h-full left-0 top-0"></a>
            <h3>${el.title}</h3>
        </section>
        `
        mainStuff.insertAdjacentHTML('beforeend',template)
    });
}

run()