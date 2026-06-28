const patients = [
  {
    name: "Ahmed",
    severity: 3,
    hasData: true,
    condition: "normal",
  },
  {
    name: "Ali",
    severity: 5,
    hasData: false,
    condition: "critical",
  },
  {
    name: "Sara",
    severity: 4,
    hasData: true,
    condition: "critical",
  },
  {
    name: "Mona",
    severity: 2,
    hasData: true,
    condition: "normal",
  },
];

function hospitalTriage(patients) {
  const treatedImmediately = [];
  const normalTreated = [];
  const missingDataList = [];

  // Process patients
  for (let i = 0; i < patients.length; i++) {
    const patient = patients[i];

    // Missing data
    if (!patient.hasData) {
      missingDataList.push(patient);
      continue;
    }

    // Critical patient
    if (patient.condition === "critical") {
      treatedImmediately.push(patient);
    } else {
      normalTreated.push(patient);
    }
  }

  // Sort normal patients by severity (highest first)
  for (let i = 0; i < normalTreated.length - 1; i++) {
    for (let j = 0; j < normalTreated.length - 1 - i; j++) {
      if (normalTreated[j].severity < normalTreated[j + 1].severity) {
        const temp = normalTreated[j];
        normalTreated[j] = normalTreated[j + 1];
        normalTreated[j + 1] = temp;
      }
    }
  }

  return {
    treatedImmediately,
    normalTreated,
    missingDataList,
  };
}

const result = hospitalTriage(patients);

console.log(result.treatedImmediately);
console.log(result.normalTreated);
console.log(result.missingDataList);
