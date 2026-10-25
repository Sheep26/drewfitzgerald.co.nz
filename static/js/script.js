const top_btn = document.getElementById('top_btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200)
        top_btn.classList.add('shown');
    else
        top_btn.classList.remove('shown');
});

function goHome() {
    window.location = "#top";
}