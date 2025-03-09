'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes, 
  FaUserMd, 
  FaUserInjured 
} from 'react-icons/fa';

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: 'Dr. Arun',
      specialty: 'Cardiology',
      email: 'arun@hospital.com',
      phone: '+91 7878787878',
      rating: 4.8,
      patitentName:"Kamal",
      isEditing: false
    },
    {
      id: 2,
      name: 'Dr. Ashwin',
      specialty: 'Neurology',
      email: 'ashwin@hospital.com',
      phone: '+91 7878787878',
      rating: 4.7,
      patitentName:"Rajini",
      isEditing: false
    },
    {
      id: 3,
      name: 'Dr. Ravi',
      specialty: 'Neurology',
      email: 'ashwin@hospital.com',
      phone: '+91 7878787878',
      rating: 4.2,
      patitentName:"Rajini",
      isEditing: false
    },
    {
      id: 4,
      name: 'Dr. Gracious',
      specialty: 'Neurology',
      email: 'ashwin@hospital.com',
      phone: '+91 7878787878',
      rating: 4.6,
      patitentName:"Rajini",
      isEditing: false
    },
    {
      id: 5,
      name: 'Dr. Uthamavillan',
      specialty: 'Neurology',
      email: 'ashwin@hospital.com',
      phone: '+91 7878787878',
      rating: 4.6,
      patitentName:"Rajini",
      isEditing: false
    }
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Kamal',
      age: 45,
      condition: 'Hypertension',
      email: 'kamal@example.com',
      lastVisit: '2023-06-15',
      doctorAssigned:"Dr.Arun",
      isEditing: false,
    },
    {
      id: 2,
      name: 'Rajini',
      age: 32,
      condition: 'Diabetes',
      email: 'rajini@example.com',
      lastVisit: '2023-06-20',
      doctorAssigned:"Dr.Arun",
      isEditing: false,

    }
  ]);

  const [activeTab, setActiveTab] = useState('doctors');

  const handleEditToggle = (id, type) => {
    if (type === 'doctors') {
      setDoctors(doctors.map(doctor => 
        doctor.id === id 
          ? { ...doctor, isEditing: !doctor.isEditing }
          : doctor
      ));
    } else {
      setPatients(patients.map(patient => 
        patient.id === id 
          ? { ...patient, isEditing: !patient.isEditing }
          : patient
      ));
    }
  };

  const handleInputChange = (id, field, value, type) => {
    if (type === 'doctors') {
      setDoctors(doctors.map(doctor => 
        doctor.id === id 
          ? { ...doctor, [field]: value }
          : doctor
      ));
    } else {
      setPatients(patients.map(patient => 
        patient.id === id 
          ? { ...patient, [field]: value }
          : patient
      ));
    }
  };

  const handleDelete = (id, type) => {
    if (type === 'doctors') {
      setDoctors(doctors.filter(doctor => doctor.id !== id));
    } else {
      setPatients(patients.filter(patient => patient.id !== id));
    }
  };

  const renderDoctorsTable = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-2xl rounded-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center">
        <FaUserMd className="text-4xl text-white mr-4" />
        <h2 className="text-3xl font-bold text-white">Doctors Management</h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-black">Name</th>
            <th className="p-4 text-left text-black">Specialty</th>
            <th className="p-4 text-left text-black">Email</th>
            <th className="p-4 text-left text-black">Phone</th>
            <th className="p-4 text-left text-black">Rating</th>
            <th className="p-4 text-center text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr 
              key={doctor.id} 
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {doctor.isEditing ? (
                <>
                  <td className="p-4 text-black">
                    <input 
                      type="text" 
                      value={doctor.name}
                      onChange={(e) => handleInputChange(doctor.id, 'name', e.target.value, 'doctors')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="text" 
                      value={doctor.specialty}
                      onChange={(e) => handleInputChange(doctor.id, 'specialty', e.target.value, 'doctors')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="email" 
                      value={doctor.email}
                      onChange={(e) => handleInputChange(doctor.id, 'email', e.target.value, 'doctors')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="text" 
                      value={doctor.phone}
                      onChange={(e) => handleInputChange(doctor.id, 'phone', e.target.value, 'doctors')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4">
                    <input 
                      type="number" 
                      value={doctor.rating}
                      onChange={(e) => handleInputChange(doctor.id, 'rating', parseFloat(e.target.value), 'doctors')}
                      className="w-full p-2 border rounded text-black"
                      step="0.1"
                      min="0"
                      max="5"
                    />
                  </td>
                  <td className="p-4 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditToggle(doctor.id, 'doctors')}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaSave className="text-2xl" />
                    </button>
                    <button 
                      onClick={() => handleEditToggle(doctor.id, 'doctors')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="text-2xl" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-4 text-black">{doctor.name}</td>
                  <td className="p-4 text-black">{doctor.specialty}</td>
                  <td className="p-4 text-black">{doctor.email}</td>
                  <td className="p-4 text-black">{doctor.phone}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {doctor.rating}/5
                    </span>
                  </td>
                  <td className="p-4 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditToggle(doctor.id, 'doctors')}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="text-2xl" />
                    </button>
                    <button 
                      onClick={() => handleDelete(doctor.id, 'doctors')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="text-2xl" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );

  const renderPatientsTable = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-2xl rounded-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 flex items-center">
        <FaUserInjured className="text-4xl text-white mr-4" />
        <h2 className="text-3xl font-bold text-white">Patients Management</h2>
      </div>
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left text-black">Name</th>
            <th className="p-4 text-left text-black">Age</th>
            <th className="p-4 text-left text-black">Condition</th>
            <th className="p-4 text-left text-black">Email</th>
            <th className="p-4 text-left text-black">Last Visit</th>
            <th className="p-4 text-center text-black">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr 
              key={patient.id} 
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {patient.isEditing ? (
                <>
                  <td className="p-4 text-black">
                    <input 
                      type="text" 
                      value={patient.name}
                      onChange={(e) => handleInputChange(patient.id, 'name', e.target.value, 'patients')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="number" 
                      value={patient.age}
                      onChange={(e) => handleInputChange(patient.id, 'age', parseInt(e.target.value), 'patients')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="text" 
                      value={patient.condition}
                      onChange={(e) => handleInputChange(patient.id, 'condition', e.target.value, 'patients')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="email" 
                      value={patient.email}
                      onChange={(e) => handleInputChange(patient.id, 'email', e.target.value, 'patients')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 text-black">
                    <input 
                      type="date" 
                      value={patient.lastVisit}
                      onChange={(e) => handleInputChange(patient.id, 'lastVisit', e.target.value, 'patients')}
                      className="w-full p-2 border rounded text-black"
                    />
                  </td>
                  <td className="p-4 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditToggle(patient.id, 'patients')}
                      className="text-green-500 hover:text-green-700 text-black"
                    >
                      <FaSave className="text-2xl" />
                    </button>
                    <button 
                      onClick={() => handleEditToggle(patient.id, 'patients')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimes className="text-2xl" />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-4 text-black">{patient.name}</td>
                  <td className="p-4 text-black">{patient.age}</td>
                  <td className="p-4 text-black">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="p-4 text-black">{patient.email}</td>
                  <td className="p-4 text-black">{patient.lastVisit}</td>
                  <td className="p-4 flex justify-center space-x-2">
                    <button 
                      onClick={() => handleEditToggle(patient.id, 'patients')}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit className="text-2xl" />
                    </button>
                    <button 
                      onClick={() => handleDelete(patient.id, 'patients')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash className="text-2xl" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-center space-x-4"
      >
        <button
          onClick={() => setActiveTab('doctors')}
          className={`
            px-6 py-3 rounded-full font-bold transition-all
            ${activeTab === 'doctors' 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-blue-500 hover:bg-blue-50'}
          `}
        >
          Doctors
        </button>
        <button
          onClick={() => setActiveTab('patients')}
          className={`
            px-6 py-3 rounded-full font-bold transition-all
            ${activeTab === 'patients' 
              ? 'bg-green-500 text-white' 
              : 'bg-white text-green-500 hover:bg-green-50'}
          `}
        >
          Patients
        </button>
      </motion.div>

      <div className="max-w-full overflow-x-auto">
        {activeTab === 'doctors' ? renderDoctorsTable() : renderPatientsTable()}
      </div>
    </div>
  );
}
