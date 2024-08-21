// Event Listener for form submission
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get input values from the form
    let studentName = document.getElementById("studentName").value;
    let studentID = document.getElementById("studentID").value;
    let emailID = document.getElementById("emailID").value;
    let contactNo = document.getElementById("contactNo").value;

    // Validate input fields
    if (!studentName || !studentID || !emailID || !contactNo) {
      alert("Please fill all the fields.");
      console.log("Validation failed: Some fields are empty.");
      return;
    }

    // Ensure contact number contains only numbers
    if (isNaN(contactNo)) {
      alert("Contact number must contain only numbers.");
      console.log(
        "Validation failed: Contact number contains non-numeric characters."
      );
      return;
    }

    // Ensure email ID is in the correct format
    if (!validateEmail(emailID)) {
      alert("Please enter a valid email address.");
      console.log("Validation failed: Invalid email address.");
      return;
    }

    // Create a student record object
    let studentRecord = {
      studentName,
      studentID,
      emailID,
      contactNo,
    };

    // Retrieve existing records from local storage or initialize an empty array
    let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
    // Add the new record to the array
    records.push(studentRecord);
    // Save the updated records array back to local storage
    localStorage.setItem("studentRecords", JSON.stringify(records));

    // Display the updated records
    displayRecords();
    // Reset the form fields
    this.reset();
  });

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Functionality to display records from local storage
function displayRecords() {
  // Retrieve records from local storage
  let records = JSON.parse(localStorage.getItem("studentRecords")) || [];
  let recordsTableBody = document.getElementById("recordsTableBody");
  let studentRecordsSection = document.getElementById("studentRecords");

  // Clear existing table rows
  recordsTableBody.innerHTML = "";

  // Check if there are any records
  if (records.length > 0) {
    // Show the student records section
    studentRecordsSection.style.display = "block";

    // Iterate through each record and create table rows
    records.forEach((record, index) => {
      let row = recordsTableBody.insertRow();
      row.insertCell(0).textContent = record.studentName;
      row.insertCell(1).textContent = record.studentID;
      row.insertCell(2).textContent = record.emailID;
      row.insertCell(3).textContent = record.contactNo;

      // Create action buttons for edit and delete
      let actionsCell = row.insertCell(4);
      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => editRecord(index));
      actionsCell.appendChild(editButton);

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteRecord(index));
      actionsCell.appendChild(deleteButton);
    });
  } else {
    // Hide the student records section if no records
    studentRecordsSection.style.display = "none";
  }
}

// Function to edit a record
function editRecord(index) {
  // Retrieve records from local storage
  let records = JSON.parse(localStorage.getItem("studentRecords"));
  let record = records[index];

  // Populate form fields with the record data
  document.getElementById("studentName").value = record.studentName;
  document.getElementById("studentID").value = record.studentID;
  document.getElementById("emailID").value = record.emailID;
  document.getElementById("contactNo").value = record.contactNo;

  // Remove the record from the array
  records.splice(index, 1);
  // Save the updated records array back to local storage
  localStorage.setItem("studentRecords", JSON.stringify(records));
  // Display the updated records
  displayRecords();
}

// Function to delete a record
function deleteRecord(index) {
  // Retrieve records from local storage
  let records = JSON.parse(localStorage.getItem("studentRecords"));
  // Remove the record from the array
  records.splice(index, 1);
  // Save the updated records array back to local storage
  localStorage.setItem("studentRecords", JSON.stringify(records));
  // Display the updated records
  displayRecords();
}

// Display records when the page loads
document.addEventListener("DOMContentLoaded", displayRecords);
