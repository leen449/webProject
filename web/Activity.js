document.addEventListener("DOMContentLoaded", function () {
    // Sample kids stored in localStorage
    if (!localStorage.getItem('kids')) {
        // Default kids if none in localStorage
        localStorage.setItem('kids', JSON.stringify([{ name: "Ali" }, { name: "Sara" }, { name: "Omar" }]));
    }

    const kids = JSON.parse(localStorage.getItem('kids')); // Retrieve kids' names from localStorage
    const activities = [
        { id: 1, name: "Football", level: "Beginner", coach: "Coach Ahmad" },
        { id: 2, name: "Basketball", level: "Intermediate", coach: "Coach Layla" },
        { id: 3, name: "Swimming", level: "Advanced", coach: "Coach Fadi" },
        { id: 4, name: "Tennis", level: "Beginner", coach: "Coach Ahmad" },
        { id: 5, name: "Volleyball", level: "Intermediate", coach: "Coach Layla" },
        { id: 6, name: "Baseball", level: "Advanced", coach: "Coach Fadi" },
        { id: 7, name: "Cycling", level: "Beginner", coach: "Coach Ahmad" }
    ];

    // Populate the "Select Child" dropdown from localStorage
    const childSelect = document.getElementById("select-child");

    kids.forEach((kid, index) => {
        const option = document.createElement("option");
        option.value = index + 1; // Use the index+1 as the value (unique ID)
        option.textContent = kid.name; // Ensure the child's name is shown
        childSelect.appendChild(option);
    });

    // Populate the filter options for Coach and Prerequisite without duplicates
    const coachSelect = document.getElementById("select-coach");
    const levelSelect = document.querySelectorAll('input[name="prerequisites"]');

    // Populate Coach filter options
    const coaches = [...new Set(activities.map(activity => activity.coach))]; // Remove duplicates
    coaches.forEach(coach => {
        const option = document.createElement("option");
        option.value = coach;
        option.textContent = coach;
        coachSelect.appendChild(option);
    });

    // Function to filter activities based on selected filters
    const filterAndDisplayActivities = () => {
        const selectedChild = childSelect.value;
        const selectedCoach = coachSelect.value;
        const selectedLevel = document.querySelector('input[name="prerequisites"]:checked')?.value;

        const filteredActivities = activities.filter(activity => {
            return (
                (selectedCoach === "" || activity.coach === selectedCoach) &&
                (selectedLevel === "" || activity.level === selectedLevel)
            );
        });

        renderActivities(filteredActivities);
    };

    // Render filtered activities
    const renderActivities = (filteredActivities) => {
        const content = document.querySelector(".content");
        content.innerHTML = ""; // Clear previous activities

        if (filteredActivities.length === 0) {
            content.innerHTML = "<p>No activities found based on your filters.</p>";
            return;
        }

        filteredActivities.forEach(activity => {
            const activityDiv = document.createElement("div");
            activityDiv.classList.add("activity");
            activityDiv.innerHTML = `
                <h4>${activity.name}</h4>
                <p>Level: ${activity.level}</p>
                <p>Coach: ${activity.coach}</p>
                <button class="enroll-btn" data-activity-id="${activity.id}">Enroll</button>
            `;
            content.appendChild(activityDiv);
        });
    };

    // Add event listeners for filter changes
    childSelect.addEventListener("change", filterAndDisplayActivities);
    coachSelect.addEventListener("change", filterAndDisplayActivities);
    levelSelect.forEach(input => {
        input.addEventListener("change", filterAndDisplayActivities);
    });

    // Handle form submission
    const enrollmentForm = document.getElementById("enrollmentForm");
    enrollmentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const selectedChild = childSelect.value;
        const selectedCoach = coachSelect.value;
        const selectedLevel = document.querySelector('input[name="prerequisites"]:checked')?.value;
        const selectedActivity = activities.filter(activity => activity.coach === selectedCoach && activity.level === selectedLevel);

        // Validation checks
        if (!selectedChild) {
            alert("Please select a child.");
            return;
        }
        if (selectedActivity.length === 0) {
            alert("Please select an activity.");
            return;
        }

        // Display selected information
        const selectedKid = kids[selectedChild - 1].name; // Access the child's name from the kids array
        const activityInfo = selectedActivity.map(activity => `<li>${activity.name} (Coach: ${activity.coach})</li>`).join("");

        const enrollmentResults = document.getElementById("enrollmentResults");
        enrollmentResults.innerHTML = `
            <h3>Enrollment Information</h3>
            <p>Kid: ${selectedKid}</p>
            <ul>${activityInfo}</ul>
        `;

        // Show success modal
        const modal = document.getElementById("successModal");
        modal.style.display = "flex";

        const closeBtn = document.getElementById("closeModalBtn");
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };

        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);

        // Clear form
        enrollmentForm.reset();
        filterAndDisplayActivities();
    });

    // Initial activity render
    filterAndDisplayActivities();
});
