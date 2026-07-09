## 💼 Project 1: Mini Freelance Platform (GigLance CLI)

### 📌 Project Overview

You are tasked with building a Console-based Freelance Marketplace (similar to Upwork or Mostaql). This system will manage Freelancers, Clients, Projects, and Proposals while enforcing strict financial and structural rules using TypeScript's type safety and Object-Oriented Programming (OOP).

---

### 🛠️ Technical Requirements & Tasks

#### Task 1: Setup Enums and Type Aliases

* Create a `JobStatus` **Enum** with the following states: `Open`, `InProgress`, `Review`, `Completed`.
* Create a **Type Alias** named `Skill` that restricts values strictly to: `"TypeScript" | "NodeJS" | "React" | "UI/UX"`.

#### Task 2: Design the Data Structure (Interfaces)

* Create an `IUser` interface with `id`, `name`, and `email`.
* Create `IFreelancer` and `IClient` interfaces that **extend** `IUser`.
* `IFreelancer` must include an array of `skills` (using your Type Alias) and an `hourlyRate`.
* `IClient` must include a `budget`.


* Create an `IProject` interface containing project details, including a `clientId` and an optional `assignedFreelancerId`.

#### Task 3: Build the Platform Logic (OOP & Encapsulation)

* Create a `Proposal` class to handle bids made by freelancers on specific projects. Use the `readonly` modifier on properties to prevent data tampering after submission.
* Create a `PlatformManager` class.
* **Encapsulation:** Make the core data arrays (`freelancers`, `clients`, `projects`, `proposals`) **private**.
* **Static Properties:** Add a `static` property named `totalPlatformRevenue` to track the system's lifetime earnings.
* **Validation:** Write methods to add users and projects. Ensure that a client cannot be created with a negative budget (throw a runtime error if they do).
* **Business Logic:** Write methods to submit a proposal, assign a project to a freelancer (changing status to `InProgress`), and complete a project (calculating a **10% commission** added to the static platform revenue).



#### Task 4: Implement Reusability (Generics)

* Create a generic class called `FilterEngine<T>`.
* Implement a method `filterByProperty(items: T[], property: keyof T, value: any): T[]` that dynamically filters any array based on a given object key and value without repeating filter logic across the app.

---