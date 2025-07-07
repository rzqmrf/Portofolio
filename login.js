 document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const validUsers = [
                { username: "admin", password: "123" },
            ];

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const isValidUser = validUsers.some(user => user.username === username && user.password === password);

            if (isValidUser) {
                alert("otwwwww");
                window.location.href = "admin.html";
            } else {
                alert("salah coyyyy");
            }
        });