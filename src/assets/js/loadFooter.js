document.addEventListener("DOMContentLoaded", function() {
    fetch('src/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
});