document.addEventListener('DOMContentLoaded', () => {
    // Avatar upload preview
    document.getElementById('avatar-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const avatarIcon = document.getElementById('avatar-icon');
                avatarIcon.style.display = 'none';
                
                const avatarPreview = document.querySelector('.avatar-preview');
                if (avatarPreview.querySelector('img')) {
                    avatarPreview.querySelector('img').src = event.target.result;
                } else {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    avatarPreview.prepend(img);
                }
            }
            reader.readAsDataURL(file);
        }
    });

    // Form submission
    document.getElementById('profile-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value || undefined
        };

        // Here you would typically send to your backend
        console.log('Updating profile:', formData);
        alert('Profile updated successfully!');
    });

    // Sample activity data
    const activities = [
        { action: "Logged in", time: "10 minutes ago" },
        { action: "Updated profile", time: "2 days ago" }
    ];

    document.getElementById('activity-list').innerHTML = activities.map(activity => `
        <li>
            <span>${activity.action}</span>
            <span class="activity-time">${activity.time}</span>
        </li>
    `).join('');

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
});