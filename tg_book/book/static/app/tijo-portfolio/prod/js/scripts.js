function validateForm(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const messageBox = document.getElementById('messageBox');
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email || !email.match(emailPattern)) {
        messageBox.textContent = 'Proszę podać poprawny adres e-mail!';
        messageBox.style.color = '#900';
        return;
    }
    if (!message || message.length > 200) {
        messageBox.textContent = 'Treść wiadomości nie może być pusta i musi mieć maksymalnie 200 znaków!';
        messageBox.style.color = '#900';
        return;
    }

    messageBox.textContent = 'Dziękujemy za przesłanie wiadomości. Odpowiemy do Państwa jak najszybciej :-)';
    messageBox.style.color = '#090';
}
