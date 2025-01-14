// Ödeme formunu al
document.getElementById("paymentForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Formun otomatik olarak gönderilmesini engelle

    // Formdan verileri al
    const amount = document.querySelector('span.fw-bold').innerText.split('₺')[1];  // Ödeme miktarını alıyoruz
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("cardNumber").value.replace(/\s+/g, ''); // Kart numarasını al
    const expiryDate = document.getElementById("expiryDate").value;  // Son kullanma tarihini al
    const cvv = document.getElementById("cvv").value;  // CVV'yi al

    // Form doğrulaması
    if (!cardName || !cardNumber || !expiryDate || !cvv) {
        alert("Lütfen tüm alanları doldurduğunuzdan emin olun.");
        return;
    }

    // Ödeme verisini DTO'ya çevir
    const paymentRequest = {
        amount,
        cardName,
        cardNumber,
        expiryDate,
        cvv
    };

    try {
        const response = await fetch('https://your-backend-url/api/payments/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentRequest)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Ödeme başarılı! " + data);
            // Başarılı ödeme sonrası yapılacak yönlendirme veya işlem
            window.location.href = "success.html";  // Ödeme başarılıysa başka bir sayfaya yönlendirebilirsiniz
        } else {
            const errorData = await response.json();
            alert(`Hata: ${errorData.message || 'Ödeme işlemi sırasında bir hata oluştu!'}`);
        }
    } catch (error) {
        alert("Bir hata oluştu: " + error.message);
    }
});
