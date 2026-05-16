const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

document.addEventListener("DOMContentLoaded", function() {
    const allList = document.querySelector('.course-list.all');
    const cseList = document.querySelector('.course-list.cse');
    const wddList = document.querySelector('.course-list.wdd');
    const sections = document.querySelectorAll('.course');
    const buttons = document.querySelectorAll('.filter-btn');

    function createCourseItem(course) {
        const li = document.createElement('li');
        li.className = 'course-item';
        if (course.completed) li.classList.add('completed');

        const title = document.createElement('div');
        title.innerHTML = `<strong>${course.subject} ${course.number} — ${course.title}</strong>`;

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = `${course.credits} credits • ${course.technology.join(', ')}`;

        const desc = document.createElement('p');
        desc.className = 'desc';
        desc.textContent = course.description;

        const status = document.createElement('div');
        status.className = 'status';
        status.textContent = course.completed ? 'Completed' : 'Incomplete';

        li.appendChild(title);
        li.appendChild(meta);
        li.appendChild(status);
        return li;
    }

    function renderInto(listEl, items) {
        listEl.innerHTML = '';
        if (items.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'course-item';
            empty.textContent = 'No courses to display.';
            listEl.appendChild(empty);
            return;
        }
        items.forEach(c => listEl.appendChild(createCourseItem(c)));
    }

    // render each section independently so structure remains in HTML
    renderInto(allList, courses);
    renderInto(cseList, courses.filter(c => c.subject === 'CSE'));
    renderInto(wddList, courses.filter(c => c.subject === 'WDD'));

    function showFilter(filter) {
        sections.forEach(sec => {
            if (filter === 'ALL') {
                if (sec.id === 'section-all') {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            } else {
                const subject = sec.id ? sec.id.replace('section-','').toUpperCase() : 'ALL';
                if (subject === filter) {
                    sec.classList.remove('hidden');
                } else {
                    sec.classList.add('hidden');
                }
            }
        });
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.id ? btn.id.replace('filter-','').toUpperCase() : 'ALL';
            showFilter(filter);
        });
    });

    // initial state
    showFilter('ALL');
});