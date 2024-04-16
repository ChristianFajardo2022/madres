import React, { useState } from "react";
import data from "../data/colombia.json";

function DepartmentSelector() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [cities, setCities] = useState([]);

  const handleDepartmentChange = (event) => {
    const departmentName = event.target.value;
    setSelectedDepartment(departmentName);
    const department = data.find(
      (dept) => dept.departamento === departmentName
    );
    if (department) {
      setCities(department.ciudades);
    } else {
      setCities([]);
    }
  };

  return (
    <div>
      <select value={selectedDepartment} onChange={handleDepartmentChange}>
        <option value="">Seleccione un departamento</option>
        {data.map((department) => (
          <option key={department.id} value={department.departamento}>
            {department.departamento}
          </option>
        ))}
      </select>
      <select disabled={!selectedDepartment}>
        <option value="">Seleccione una ciudad</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DepartmentSelector;
