class Person {
  #email;
  #id;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (typeof value !== "string" || !value.includes("@")) {
      throw new Error("Email must be a valid email address.");
    }
    this.#email = value;
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error("ID must be a positive integer.");
    }
    this.#id = value;
  }

  describeRole() {
    return `${this.name} is a school member.`;
  }
}

class Principal extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.members = [];
  }

  addMember(member) {
    if (!(member instanceof Person)) {
      throw new Error("Only school members can be added.");
    }

    this.members.push(member);
    console.log(`${member.name} was added by ${this.name}.`);
    return this.members;
  }

  removeMember(id) {
    this.members = this.members.filter((member) => member.id !== id);
    console.log(`Member with ID ${id} was removed by ${this.name}.`);
    return this.members;
  }

  listMembers() {
    return this.members.map((member) => `${member.name} (${member.constructor.name})`);
  }

  describeRole() {
    return `${this.name} is the principal and manages the school.`;
  }
}

class Teacher extends Person {
  constructor(name, email, id, subject) {
    super(name, email, id);
    this.subject = subject;
    this.grades = [];
  }

  gradeStudent(student, grade) {
    if (!(student instanceof Student)) {
      throw new Error("Only students can be graded.");
    }

    this.grades.push({ studentName: student.name, grade });
    console.log(`${this.name} graded ${student.name} with ${grade}.`);
    return this.grades;
  }

  listGrades() {
    return this.grades;
  }

  describeRole() {
    return `${this.name} teaches ${this.subject}.`;
  }
}

class Student extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.enrolledSubjects = [];
  }

  enrollInSubject(subject) {
    if (!subject) {
      throw new Error("Subject name is required.");
    }

    this.enrolledSubjects.push(subject);
    console.log(`${this.name} enrolled in ${subject}.`);
    return this.enrolledSubjects;
  }

  viewEnrolledSubjects() {
    return this.enrolledSubjects;
  }

  describeRole() {
    return `${this.name} is a student learning at the school.`;
  }
}

const principal = new Principal("Mr. Ali", "ali@school.com", 1);
const teacher = new Teacher("Ms. Sara", "sara@school.com", 2, "Math");
const student = new Student("Omar", "omar@school.com", 3);

principal.addMember(teacher);
principal.addMember(student);
teacher.gradeStudent(student, 95);
student.enrollInSubject("Math");
student.enrollInSubject("Physics");

principal.removeMember(2);

const members = [principal, teacher, student];
console.log("\nSchool members:");
members.forEach((member) => console.log(member.describeRole()));

console.log("\nCurrent school members:");
console.log(principal.listMembers());
console.log("\nTeacher grades:");
console.log(teacher.listGrades());
console.log("\nStudent subjects:");
console.log(student.viewEnrolledSubjects());
