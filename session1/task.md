# 🧾 Section 1: Mini Projects

---

## 🏥 Project 1: Hospital Emergency Triage System

### 🎯 Goal

Simulate how patients are handled in a hospital emergency system.

---

### 📦 Input

An array of patients:

Each patient has:

- `name`
- `severity` (1 → 5)
- `hasData` (true / false)
- `condition` → `"normal" | "critical"`

---

### ⚙️ Processing Rules

#### 1. Validate patient

- If `hasData === false`:
  - Skip patient
  - Add to `missingDataList`

---

#### 2. Priority rules

- If `condition === "critical"`:
  - Send directly to treatment list (`treatedImmediately`)

- Otherwise:
  - Sort by severity (highest first)

---

### 📤 Output

Return:

- treatedImmediately list
- normalTreated list (sorted by severity)
- missingDataList

---

---

# 💻 Section 2: Coding Problems

Solve the following using **loops and arrays only**:

---

## 1️⃣ Check if Array is Sorted

Write a function that checks if an array is sorted in ascending order.

---

## 2️⃣ Return Numbers Greater Than a Value

Write a function that returns all numbers greater than a given value.

---

## 3️⃣ Plus One (LeetCode)

Solve:
[https://leetcode.com/problems/plus-one/description/](https://leetcode.com/problems/plus-one/description/)

---

## 4️⃣ Remove Duplicates from Sorted Array (LeetCode)

Solve:
[https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/)

---
