document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const userName = document.getElementById("user-name").value;
    const email = document.getElementById("email-register").value;
    const password = document.getElementById("password-register").value;
    const role = document.querySelector('input[name="role"]:checked')?.value;

    if (!firstName || !lastName || !userName || !email || !password || !role) {
        alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
        return; 
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
    }

    if (password.length < 6) {
        alert("Şifreniz en az 6 karakter olmalıdır.");
        return;
    }

    const createUserDto = { firstName, lastName, userName, email, password, role };

    try {
        const response = await fetch('https://your-backend-url/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createUserDto)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Kayıt başarılı! Kullanıcı oluşturuldu.");
            showLoginForm();  
        } else {
            const errorData = await response.json();
            alert(`Hata: ${errorData.message || 'Bir hata oluştu!'}`);
        }
    } catch (error) {
        alert("Bir hata oluştu: " + error.message);
    }
});

document.getElementById("login-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    if (!email || !password) {
        alert("Lütfen e-posta ve şifrenizi girin.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("Lütfen geçerli bir e-posta adresi girin.");
        return;
    }

    const loginDto = { email, password };

    try {
        const response = await fetch('https://your-backend-url/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginDto)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Giriş başarılı!");
            localStorage.setItem('authToken', data.token);  
            window.location.href = "home.html";  
        } else {
            const errorData = await response.json();
            alert(`Hata: ${errorData.message || 'Giriş başarısız!'}`);
        }
    } catch (error) {
        alert("Bir hata oluştu: " + error.message);
    }
});
