document.getElementById("register-form").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const createUserDto = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        userName: document.getElementById("user-name").value,
        email: document.getElementById("email-register").value,
        password: document.getElementById("password-register").value,
        role: document.querySelector('input[name="role"]:checked').value 
    };

    try {
        const response = await fetch('https://your-backend-url/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
