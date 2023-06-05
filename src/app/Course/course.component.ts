import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent {
  showMore = false;

  learningItems = [
    {
      title: 'Python Fundamentals:',
      description:
        'Understand the basics of Python programming, including variables, data types, control flow, functions, and file handling.',
    },
    {
      title: 'Data Structures and Algorithms:',
      description:
        'Explore various data structures such as lists, dictionaries, sets, and tuples, and learn how to implement and utilize them effectively.',
    },
    {
      title: 'Object-Oriented Programming (OOP):',
      description:
        'Master the principles of OOP in Python, including classes, inheritance,        encapsulation, and polymorphism. Build robust code.',
    },
    {
      title: 'File Handling and Input/Output: ',
      description:
        'Learn how to read from and write to files, handle exceptions, and work with input/output operations in Python.',
    },
    {
      title: 'Python Fundamentals:',
      description:
        'Understand the basics of Python programming, including variables, data types, control flow, functions, and file handling.',
    },
    {
      title: 'Data Structures and Algorithms:',
      description:
        'Explore various data structures such as lists, dictionaries, sets, and tuples, and learn how to implement and utilize them effectively.',
    },
    {
      title: 'Object-Oriented Programming (OOP):',
      description:
        'Master the principles of OOP in Python, including classes, inheritance,        encapsulation, and polymorphism. Build robust code.',
    },
    {
      title: 'File Handling and Input/Output: ',
      description:
        'Learn how to read from and write to files, handle exceptions, and work with input/output operations in Python.',
    },
  ];

  whoEnrollItems = [
    'Beginners who want to learn Python from scratch and build a strong foundation in programming.',

    'Intermediate Python developers looking to enhance their skills, deepen their understanding of Python concepts, and explore advanced topics.',

    'Professionals or students seeking to add Python to their skill set for data analysis, web development, automation, or other applications.',
  ];

  courseRequirments = [
    {
      title: 'Basic Computer Skills:',
      description:
        'Familiarity with using a computer, navigating the file system, and performing basic tasks such as file management and software installation.',
    },
    {
      title: 'Internet Access:',
      description:
        'A stable internet connection is required to access course materials, participate in online exercises, and engage with the learning community.',
    },
    {
      title: 'A Passion for Learning:',
      description:
        'A strong desire to learn and explore the Python programming language, as well as a willingness to dedicate time and effort to practice coding and complete assignments.',
    },
  ];

  getRows() {
    const result = [];
    for (let i = 0; i < this.learningItems.length; i += 2) {
      result.push(this.learningItems.slice(i, i + 2));
    }
    return result;
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }
}
