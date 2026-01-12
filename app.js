const departments = [
    {
        name: "Executive Management",
        employees: [
            { firstName: "Jane", lastName: "Doe" }, 
            { firstName: "Michael", lastName: "Jordan" }
        ]
    },
    {
        name: "Finance",
        employees: [
            { firstName: "Alice", lastName: "Johnson" },
            { firstName: "Bob", lastName: "Brown" }
        ]
    },
];

function renderDirectory() {
    const mainElement = document.getElementById('employee-container');

    departments.forEach(dept => {
        const deptSection = document.createElement('section');
        deptSection.classList.add('department');

        const deptTitle = document.createElement('h2');
        deptTitle.textContent = dept.name;
        deptSection.appendChild(deptTitle);

        const employeeList = document.createElement('ul');

        dept.employees.forEach(emp => {
            const listItem = document.createElement('li');
            const fullName = emp.lastName ? `${emp.firstName} ${emp.lastName}` : emp.firstName;
            listItem.textContent = fullName;
            employeeList.appendChild(listItem);
        });

        deptSection.appendChild(employeeList);
        mainElement.appendChild(deptSection);
    });
}

renderDirectory();