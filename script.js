const bar = document.getElementById('bar');
// ...existing code...

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
