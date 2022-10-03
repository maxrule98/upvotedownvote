const upvoteBtn = document.querySelectorAll('[data-vote-type="upvote"]');
const downvoteBtn = document.querySelectorAll('[data-vote-type="downvote"]');

upvoteBtn.forEach(btn => {
    btn.addEventListener('change', (e) => {
        e.preventDefault();
        if (btn.checked) {
            console.log("Add upvote for " + btn.dataset.id);
            addUpvote(btn.dataset.id);
        }
        if (!btn.checked) {
            console.log("Remove upvote for " + btn.dataset.id);
            removeUpvote(btn.dataset.id);
        }
    })
})

downvoteBtn.forEach(btn => {
    btn.addEventListener('change', (e) => {
        e.preventDefault();
        if (btn.checked) {
            console.log("Add downvote for " + btn.dataset.id);
            addDownvote(btn.dataset.id);
        }
        if (!btn.checked) {
            console.log("Remove downvote for " + btn.dataset.id);
            removeDownvote(btn.dataset.id);
        }
    })
})

// Add
const addUpvote = async (id) => {
    let request = await fetch(`/api/v1/${id}/upvote/add`);
    let response = await request.json();
    console.log(response);
    let newUpvotes = response.upvotes;
    let downvotes = response.downvotes;
    console.log(newUpvotes, downvotes);
    document.querySelector(`[data-counter="${id}"]`).innerHTML = newUpvotes - downvotes
}

const addDownvote = async (id) => {
    let request = await fetch(`/api/v1/${id}/downvote/add`);
    let response = await request.json();
    console.log(response);
    let newUpvotes = response.upvotes;
    let downvotes = response.downvotes;
    console.log(newUpvotes, downvotes);
    document.querySelector(`[data-counter="${id}"]`).innerHTML = newUpvotes - downvotes
}

// Remove
const removeUpvote = async (id) => {
    let request = await fetch(`/api/v1/${id}/upvote/remove`);
    let response = await request.json();
    console.log(response);
    let newUpvotes = response.upvotes;
    let downvotes = response.downvotes;
    console.log(newUpvotes, downvotes);
    document.querySelector(`[data-counter="${id}"]`).innerHTML = newUpvotes - downvotes
}

const removeDownvote = async (id) => {
    let request = await fetch(`/api/v1/${id}/downvote/remove`);
    let response = await request.json();
    console.log(response);
    let newUpvotes = response.upvotes;
    let downvotes = response.downvotes;
    console.log(newUpvotes, downvotes);
    document.querySelector(`[data-counter="${id}"]`).innerHTML = newUpvotes - downvotes
}