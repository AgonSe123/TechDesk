document.addEventListener('DOMContentLoaded', () => {
    // Sample data - replace with real API calls
    const recentChats = [
        { user: "John Doe", message: "How to reset password?", status: "Resolved" },
        { user: "Jane Smith", message: "Order not delivered", status: "Pending" }
    ];

    const users = [
        { name: "Ensar Bexheti", email: "eb31776@seeu.edu.mk", role: "Admin" },
        { name: "Yllza Idrizi", email: "yi31622@seeu.edu.mk", role: "Support" }
    ];

    // Populate tables
    const populateTable = (data, tableBody) => {
        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.user || item.name}</td>
                <td>${item.message || item.email}</td>
                <td><span class="status-badge ${item.status?.toLowerCase() || ''}">${item.status || item.role}</span></td>
                <td>
                    <button class="action-btn btn-view">View</button>
                    ${item.role ? `<button class="action-btn btn-edit">Edit</button>` : ''}
                </td>
            </tr>
        `).join('');
    };

    populateTable(recentChats, document.querySelector('.recent-chats tbody'));
    populateTable(users, document.querySelector('.user-management tbody'));

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
});