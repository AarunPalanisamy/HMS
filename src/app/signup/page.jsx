'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaHospital, 
  FaStethoscope,
  FaHeartbeat,
  FaRulerVertical,
  FaWeight 
} from 'react-icons/fa';

export default function Signup() {
  const router = useRouter();
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    // Common fields
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    medicalLicense: '',
    specialization: '',
    
    age: '',
    gender: '',
    height: '',
    weight: '',
    bmi: '',
    bloodPressure: {
      systolic: '',
      diastolic: ''
    },
    bloodSugar: '',
    sleepCycle: '',
    medicalHistory: '',
    medications: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate BMI if height and weight are entered
    if (name === 'height' || name === 'weight') {
      calculateBMI();
    }
  };

  const calculateBMI = () => {
    const height = parseFloat(formData.height) / 100; // convert to meters
    const weight = parseFloat(formData.weight);
    
    if (height > 0 && weight > 0) {
      const calculatedBMI = (weight / (height * height)).toFixed(2);
      setFormData(prev => ({
        ...prev,
        bmi: calculatedBMI
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (userType === 'doctor') {
      if (!formData.medicalLicense) newErrors.medicalLicense = 'Medical License is required';
      if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    }

    if (userType === 'patient') {
      if (!formData.age) newErrors.age = 'Age is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.height) newErrors.height = 'Height is required';
      if (!formData.weight) newErrors.weight = 'Weight is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    console.log("handle submit",e);
    axios.post('http://localhost:3000/register/doctor',{
        "name": formData.firstName,
        "email": formData.email,
        "contact": "",
        "password": formData.password,
        "designation": formData.specialization,
        "role": "doctor"
    })
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        userType,
        ...formData
      };

      console.log('Signup Data:', submissionData);
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 space-y-6"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Create Your Account
          </h1>
        </div>

        {!userType && (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setUserType('patient')}
              className="bg-blue-500 text-black py-4 rounded-lg hover:bg-blue-600 transition"
            >
              Patient Registration
            </button>
            <button 
              onClick={() => setUserType('doctor')}
              className="bg-purple-500 text-black py-4 rounded-lg hover:bg-purple-600 transition"
            >
              Doctor Registration
            </button>
          </div>
        )}

        {userType && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-black">First Name</label>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
                {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-black">E-Mail</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded text-black"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
            </div>

            {userType === 'doctor' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-black">Password</label>
                  <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded text-black"
                  />
                  {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-black">Specialization</label>
                  <select 
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded text-black"
                  >
                    <option value="">Select Specialization</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                  </select>
                  {errors.specialization && <p className="text-red-500">{errors.specialization}</p>}
                </div>
              </div>
            )}

            {/* Patient Specific Fields */}
            {userType === 'patient' && (
              <>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-black">Age</label>
                    <input 
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                    />
                    {errors.age && <p className="text-red-500">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-black">Gender</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                    >
                      <option value="">Select Gender</option>
                      <option value="male text-black">Male</option>
                      <option value="female text-black">Female</option>
                      <option value="other text-black">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-black">Blood Sugar</label>
                    <input 
                      type="text"
                      name="bloodSugar"
                      value={formData.bloodSugar}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                      placeholder="mg/dL"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-black">Height (cm)</label>
                    <input 
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                    />
                    {errors.height && <p className="text-red-500">{errors.height}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-black">Weight (kg)</label>
                    <input 
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                    />
                    {errors.weight && <p className="text-red-500">{errors.weight}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-black">BMI</label>
                    <input 
                      type="text"
                      name="bmi"
                      value={formData.bmi}
                      readOnly
                      className="w-full p-2 border rounded text-black bg-gray-100"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-black">Blood Pressure</label>
                    <div className="flex gap-2">
                      <input 
                        type="number"
                        name="bloodPressure.systolic"
                        value={formData.bloodPressure.systolic}
                        onChange={handleInputChange}
                        placeholder="Systolic"
                        className="w-full p-2 border rounded text-black"
                      />
                      <input 
                        type="number"
                        name="bloodPressure.diastolic"
                        value={formData.bloodPressure.diastolic}
                        onChange={handleInputChange}
                        placeholder="Diastolic"
                        className="w-full p-2 border rounded text-black"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-black">Sleep Cycle (hours)</label>
                    <input 
                      type="number"
                      name="sleepCycle"
                      value={formData.sleepCycle}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded text-black"
                    />
                  </div>
                </div>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-black py-3 rounded-lg hover:opacity-90 transition duration-300 font-bold mt-4"
            >
              Create Account
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
