document.addEventListener("DOMContentLoaded", () => {
    const coursesContainer = document.getElementById("courses-container");
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
  
    // Check if we are on the index.html page
    if (window.location.pathname.includes("index.html") && coursesContainer) {
      // Display existing courses on the home page
      storedCourses.forEach((course, index) => displayCourse(course, index));
    }
  
    // Function to display a course
    function displayCourse(course, index) {
      const courseCard = document.createElement("div");
      courseCard.className = "course-card";
      courseCard.innerHTML = `
      <img style="height:150px;width:269px;" 
      src="${course.img}" alt="${course.name}">
        <h3>${course.name}</h3>
        <p><strong>Code:</strong> ${course.code}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Topics:</strong> ${course.topics.join(", ")}</p>
        <button class="delete-course">Delete</button>
        <button class="edit-course">Edit</button>
      `;
      // Delete button functionality
      const deleteButton = courseCard.querySelector(".delete-course");
      deleteButton.addEventListener("click", () => {
        storedCourses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(storedCourses));
        courseCard.remove();
        
      });

       // Edit button functionality
       const editButton = courseCard.querySelector(".edit-course");
       editButton.addEventListener("click", () => {
         localStorage.setItem("editingCourseIndex", index); // Save index to localStorage
         localStorage.setItem("editingCourseDetails", JSON.stringify(course)); // Save course details
         window.location.href = "edit-course.html"; // Redirect to edit page
       });
  
    
      coursesContainer.appendChild(courseCard);
    }

    
     
  
  
    // Add course functionality
    const addCourseForm = document.getElementById("add-course-form");
    if (addCourseForm) {
      addCourseForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Get values from the form
        const newCourse = {
          img: document.getElementById("course-img").value,
          name: document.getElementById("course-name").value,
          code: document.getElementById("course-code").value,
          credits: document.getElementById("course-credits").value,
          topics: document.getElementById("course-topics").value.split(",").map(t => t.trim()),
        };
  
        // Add new course to the array and localStorage
        storedCourses.push(newCourse);
        localStorage.setItem("courses", JSON.stringify(storedCourses));
  
        // Redirect to the home page
        window.location.href = "index.html";
      });
    }
  

    
  });
