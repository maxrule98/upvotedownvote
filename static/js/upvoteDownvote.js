const rows = document.querySelectorAll('[data-id]');
const voteBtns = document.querySelectorAll('[data-vote-type]');
const upvoteBtns = document.querySelectorAll('[data-vote-type="upvote"');
const downvoteBtns = document.querySelectorAll('[data-vote-type="downvote"');

rows.forEach(row => {
    // console.log(row.dataset.id);
    let btns = row.querySelectorAll('[data-vote-btn]');

    // console.log(upvoteBtns);
    // console.log(downvoteBtns);
    
    btns.forEach((btn, i) => {
        btn.addEventListener('change', (e) => {
            // Check if downvote buttons is checked, if so uncheck and remove downvote
            if(btn.dataset.voteBtn==='upvote' && btns[1].checked) {
                btns[1].checked=false;
                console.log(row.dataset.id);
                console.log(btns[1].dataset.voteBtn);
                doFetch(row.dataset.id, btns[1].dataset.voteBtn, 'remove')
            }
            
            if(btn.dataset.voteBtn==='downvote' && btns[0].checked) {
                btns[0].checked=false;
                console.log(row.dataset.id);
                console.log(btns[0].dataset.voteBtn);
                doFetch(row.dataset.id, btns[0].dataset.voteBtn, 'remove')
            }

            if (btn.checked) {
                doFetch(row.dataset.id, btn.dataset.voteBtn, 'add')
            } else {
                doFetch(row.dataset.id, btn.dataset.voteBtn, 'remove')
            }

            console.log(btn.dataset.voteBtn +': '+ btn.checked)
        })
    })
});

const doFetch = async (id, direction, type) => {
    let request = await fetch(`/api/v1/${id}/${direction}/${type}`);
    let response = await request.json();
    // console.log(response);

    document.querySelector(`[data-counter="${id}"]`).innerHTML = response.upvotes - response.downvotes
}
