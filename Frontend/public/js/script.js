function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': "TUe90207acada738849d59d3b440cd4dd21d247031029244997b3d6244064983132274571c0d08883c983abaa49d57fc02"
        },
        body: JSON.stringify({ UserName: username, PassWord: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === true) {
            fetch('http://localhost:8080/api/student/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: data.username,
                    type: data.type,
                    engName: data.displayname_en,
                    email: data.email,
                    faculty: data.faculty
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Login successful and Student data added.');
            })
            .catch(error => {
                console.error('Error adding student data:', error);
                alert('Error: ไม่สามารถเพิ่มข้อมูลนักศึกษาได้');
            });
        } else {
            alert('Error: ไม่สามารถ Login ได้สำเร็จ');  // แสดงข้อความเมื่อ login ไม่สำเร็จ
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('Error: ไม่สามารถ Login ได้สำเร็จ');  // แสดงข้อความเมื่อเกิดข้อผิดพลาดในการเชื่อมต่อ
    });
}