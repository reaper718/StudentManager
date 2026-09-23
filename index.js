document.addEventListener("DOMContentLoaded", initialize);

const API_URL ="https://crudcrud.com/api/43eee7dc8dd34455b75c3fbe96d6cd89/studentData";

function initialize() {

    axios.get(API_URL)
        .then((res) => {

            for (let i = 0; i < res.data.length; i++) {
                display(res.data[i]);
            }

            document.querySelector(".student-count").textContent =
                res.data.length;
        })
        .catch(err => console.log(err));
}

function handleFormSubmit(event) {
    event.preventDefault();

    const studentDetails = {
        name: event.target.name.value,
        phone: event.target.phone.value,
        address: event.target.address.value
    };

    const editId = sessionStorage.getItem("editId");

    // -------------------------
    // UPDATE STUDENT
    // -------------------------
    if (editId) {

        axios.put(`${API_URL}/${editId}`, studentDetails)
            .then((res) => {

                console.log("Student updated");

                // Find existing li
                const li = document.getElementById(editId);

                // Update displayed information
                const expenseInfo = li.querySelector("div");

                expenseInfo.innerHTML = `
                    <strong>${studentDetails.name}</strong>
                    <span class="ms-3">${studentDetails.phone}</span>
                    <span class="badge bg-secondary ms-3">
                        ${studentDetails.address}
                    </span>
                `;

                // Clear edit mode
                sessionStorage.removeItem("editId");

                // Change button back
                document.querySelector("button[type=submit]").textContent =
                    "Add Student";

                // Clear form
                event.target.reset();
            })
            .catch((err) => {
                console.log("Update error:", err);
            });

    }

    // -------------------------
    // ADD STUDENT
    // -------------------------
    else {

        axios.post(API_URL, studentDetails)
            .then((res) => {

                console.log("Student added:", res.data);

                display(res.data);

                // Update count
                const stuCount =
                    document.querySelector(".student-count");

                stuCount.textContent =
                    document.querySelectorAll("#studentList li").length;

                // Clear form
                event.target.reset();
            })
            .catch((err) => {
                console.log("Add error:", err);
            });
    }
}

// use this function to display user on screen
function display(data) {
    console.log(data);
    const ul = document.querySelector("#studentList");
    const li = document.createElement("li");

    li.className =
        "list-group-item d-flex justify-content-between align-items-center";

    li.id = data._id;

    const studentInfo = document.createElement("div");

    studentInfo.innerHTML = `
        <strong>${data.name}</strong>
        <span class="ms-3">${data.phone}</span>
        <span class="badge bg-secondary ms-3">${data.address}</span>
    `;

    li.appendChild(studentInfo);

    const buttons = document.createElement("div");

    // Delete button
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm me-2";

    deleteButton.addEventListener(
        "click",
        () => deleteData(data._id, li)
    );


    // Edit button
    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";
    editBtn.className = "btn btn-warning btn-sm";

    editBtn.addEventListener(
        "click",
        () => editData(data)
    );


    buttons.appendChild(deleteButton);
    buttons.appendChild(editBtn);

    li.appendChild(buttons);

    ul.appendChild(li);
}

// use this function to delete the user details
function deleteData(id, li) {
    console.log(id);
    axios.delete(`${API_URL}/${id}`)
        .then((res) => {
            console.log("Student deleted:", res.data);

            // Remove from DOM only after successful deletion
            li.remove();

            // Update student count
            const stuCount = document.querySelector(".student-count");
            stuCount.textContent =
                document.querySelectorAll("#studentList li").length;
        })
        .catch((err) => {
            console.log("Delete error:", err);
        });
}


// use this function to update user details
function editData(data) {

    // Put existing student data into form
    document.querySelector("#name").value = data.name;
    document.querySelector("#phone").value = data.phone;
    document.querySelector("#address").value = data.address;

    // Store ID temporarily
    sessionStorage.setItem("editId", data._id);

    // Change button text
    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.textContent = "Update";
}

function update(studentList, editId, studentDetails) {
    for (let i = 0; i < studentList.length; i++) {
        if (studentList[i].id == editId) {
            studentList[i].expense = studentDetails.expense;
            studentList[i].description = studentDetails.description;
            studentList[i].category = studentDetails.category;
        }
    }

    const li = document.getElementById(editId);

    li.firstChild.textContent = studentDetails.expense + " " + studentDetails.description + " " + studentDetails.category;

    sessionStorage.removeItem("editId");

    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.textContent = "submit";

}

// module.exports = handleFormSubmit