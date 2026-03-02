document.addEventListener('DOMContentLoaded', () => {
    const coursesSection = document.querySelector('.course-tiles');
    const courses = [
        { id: 'tijo', name: 'Testowanie i Jakość Oprogramowania' },
        { id: 'nisp', name: 'Narzędzia i Środowiska Programistyczne' },
        { id: 'ti', name: 'Technologia Informacyjna' }
    ];

    // Restore the selected course from local storage
    const savedCourse = localStorage.getItem('selectedCourse');

    // Clear existing tiles and replace with buttons
    coursesSection.innerHTML = '';

    courses.forEach(course => {
        const button = document.createElement('button');
        button.textContent = course.name;
        button.classList.add('glass-button');
        button.setAttribute('data-course', course.id);

        // Highlight the saved course
        if (savedCourse === course.id) {
            button.classList.add('selected');
        }

        // Add click event to the button
        button.addEventListener('click', () => {
            // Remove selection from all buttons
            document.querySelectorAll('.glass-button').forEach(btn => btn.classList.remove('selected'));

            // Highlight the selected button
            button.classList.add('selected');

            // Save the selected course to local storage
            localStorage.setItem('selectedCourse', course.id);

            // Generate the list of topics below the buttons
            const topicsContainer = document.getElementById('topics-container');
            topicsContainer.innerHTML = '';

            const topics = document.getElementById(course.id);
            if (topics) {
                const topicList = document.createElement('ul');
                Array.from(topics.querySelectorAll('li')).forEach(topic => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = topic.innerHTML;
                    topicList.appendChild(listItem);
                });
                topicsContainer.appendChild(topicList);
            }
        });

        coursesSection.appendChild(button);
    });

    // Create a container for topics
    const topicsContainer = document.createElement('div');
    topicsContainer.id = 'topics-container';
    coursesSection.parentNode.appendChild(topicsContainer);

    // Trigger click on the saved course to display its topics
    if (savedCourse) {
        document.querySelector(`.glass-button[data-course="${savedCourse}"]`).click();
    }
});