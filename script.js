document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
    const usersTable = document.getElementById('users-table');
    const users = []; // Array to store user data

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = registrationForm.elements['name'].value;
        const email = registrationForm.elements['email'].value;
        const age = registrationForm.elements['age'].value;

        if (name && email && age) {
            const user = {
                name: name,
                email: email,
                age: age
            };
            addUserToTable(user);
            users.push(user);
            registrationForm.reset();
        } else {
            alert('All fields must be filled!');
        }
    });

    function addUserToTable(user) {
        const currentYear = new Date().getFullYear();
        const yearOfBirth = currentYear - parseInt(user.age);

        const newRow = usersTable.insertRow();
        newRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${yearOfBirth}</td>
            <td>
                <button class="update-btn">Update</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;

        const deleteBtn = newRow.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            usersTable.deleteRow(newRow.rowIndex);
            const index = users.indexOf(user);
            if (index !== -1) {
                users.splice(index, 1);
            }
        });

        const updateBtn = newRow.querySelector('.update-btn');
        updateBtn.addEventListener('click', function() {
            const newName = prompt('Type in a new name and surname:', user.name);
            const newEmail = prompt('Type a new e-mail:', user.email);
            const newAge = prompt('Type a new age:', user.age);

            if (newName && newEmail && newAge) {
                user.name = newName;
                user.email = newEmail;
                user.age = newAge;

                const newYearOfBirth = currentYear - parseInt(newAge);
                newRow.innerHTML = `
                    <td>${newName}</td>
                    <td>${newEmail}</td>
                    <td>${newYearOfBirth}</td>
                    <td>
                        <button class="update-btn">Update</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;
            } else {
                alert('All fields must be filled!');
            }
        });
    }

    // Function to display existing users when the page loads
    function displayUsers() {
        users.forEach(function(user) {
            addUserToTable(user);
        });
    }

    // Call function to display existing users
    displayUsers();
});

