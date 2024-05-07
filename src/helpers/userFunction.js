export const userFunction = (setError, setUserData, urlServer) => {
  // Obtener el  customer_id desde localStorage
  const storedData = localStorage.getItem("formData");
  if (!storedData) {
    setError("No user data in localStorage.");
    return;
  }
  const { customer_id } = JSON.parse(storedData);

  if (!customer_id) {
    setError(" customer_id not found in local storage.");
    return;
  }

  fetch(
    `${urlServer}/get-user-data?customer_id=${encodeURIComponent(customer_id)}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        setUserData(data.data);
      } else {
        setError("Error fetching data: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Network error:", error);
      setError("Network error: " + error.message);
    });
};
