import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue, remove, push } from "firebase/database";
import './ManageMedicines.css'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
// Medicine Management Component
const MedicineManager = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();
  const [medicines, setMedicines] = useState([]);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [times, setTimes] = useState('');
  const [duration, setDuration] = useState('');
  const [editMedicineId, setEditMedicineId] = useState(null);

  useEffect(() => {
    if (user) {
      const medicinesRef = ref(db, 'users/' + user.uid + '/medicines');
      onValue(medicinesRef, (snapshot) => {
        const data = snapshot.val();
        const medicineArray = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) : [];
        setMedicines(medicineArray);
      });
    }
  }, [db, user]);

  // Function to handle the medicine form submission (add or update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicineName || !dosage || !times || !duration) {
      alert("All fields are required");
      return;
    }

    if (editMedicineId) {
      // Update existing medicine entry
      const medicineRef = ref(db, 'users/' + user.uid + '/medicines/' + editMedicineId);
      set(medicineRef, {
        name: medicineName,
        dosage,
        times,
        duration,
      }).then(() => {
        setEditMedicineId(null); // Reset edit mode
        clearForm();
      });
    } else {
      // Add new medicine entry using push()
      const medicinesRef = ref(db, 'users/' + user.uid + '/medicines');
      const newMedicineRef = push(medicinesRef);  // Corrected push
      set(newMedicineRef, {
        name: medicineName,
        dosage,
        times,
        duration,
      }).then(() => {
        clearForm();
      });
    }
  };


  // Function to handle editing a medicine
  const handleEdit = (id) => {
    const medicine = medicines.find(med => med.id === id);
    setMedicineName(medicine.name);
    setDosage(medicine.dosage);
    setTimes(medicine.times);
    setDuration(medicine.duration);
    setEditMedicineId(id);
  };

  // Function to handle deleting a medicine
  const handleDelete = (id) => {
    const medicineRef = ref(db, 'users/' + user.uid + '/medicines/' + id);
    remove(medicineRef).then(() => {
      alert("Medicine deleted");
    });
  };

  // Clear form after submit
  const clearForm = () => {
    setMedicineName('');
    setDosage('');
    setTimes('');
    setDuration('');
  };

  return (
    <div className="manage-medicines-container">
      <h2>{editMedicineId ? "Edit Medicine" : "Add Medicine"}</h2>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px',}}>
  ← Back to Dashboard
</button>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Medicine Name</label>
          <input 
            type="text" 
            value={medicineName} 
            onChange={(e) => setMedicineName(e.target.value)} 
            placeholder="Enter Medicine Name"
          />
        </div>
        <div>
          <label>Dosage</label>
          <input 
            type="text" 
            value={dosage} 
            onChange={(e) => setDosage(e.target.value)} 
            placeholder="Enter Dosage"
          />
        </div>
        <div>
          <label>Times (e.g., 8:00 AM, 2:00 PM)</label>
          <input 
            type="text" 
            value={times} 
            onChange={(e) => setTimes(e.target.value)} 
            placeholder="Enter Times"
          />
        </div>
        <div>
          <label>Duration (e.g., 7 days)</label>
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            placeholder="Enter Duration"
          />
        </div>
        <button type="submit">{editMedicineId ? "Update Medicine" : "Add Medicine"}</button>
      </form>

      <h3>Medicine List</h3>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.id}>
            <div>
              <strong>{medicine.name}</strong> - {medicine.dosage} - {medicine.times} - {medicine.duration}
              <button onClick={() => handleEdit(medicine.id)}>Edit</button>
              <button onClick={() => handleDelete(medicine.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineManager;
