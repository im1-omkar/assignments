import { useState } from 'react';
import Header from './components/Header';
import PetAdoptionForm from './components/PetAdoptionForm';
import "./myApp.css";

const App = () => {

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [yourName, setYourName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [submittedData, setSubmittedData] = useState(null);


  // Error state
  const [errors, setErrors] = useState({});

  // Validation Functions
  function validatePetName(name) {
    if (name.trim().length < 3) {
      return "Pet name must be at least 3 characters";
    }
    return "";
  }

  function validatePetType(type) {
    if (type.trim().length < 3) {
      return "Pet type must be at least 3 characters";
    }
    return "";
  }

  function validateYourName(name) {
    if (name.trim().length < 3) {
      return "Your name must be at least 3 characters";
    }
    return "";
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Invalid email address";
    }

    return "";
  }

  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number!";
    }

    return "";
  }

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      petName: validatePetName(petName),
      petType: validatePetType(petType),
      yourName: validateYourName(yourName),
      email: validateEmail(email),
      phone: validatePhone(phone),
    };

    setErrors(newErrors);

    // Check if any error exists
    const hasErrors = Object.values(newErrors).some(
      (error) => error !== ""
    );

    if (hasErrors) {
      return;
    }

    // Success
    console.log({
      petName,
      petType,
      yourName,
      email,
      phone,
    });

    setSubmittedData([
      ...submittedData,
      {
        petName,
        petType,
        yourName,
        email,
        phone,
      }
    ]);
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        display : "flex",
        flexDirection:"column"
      }}
    >
      <Header message={"Pet Adoption Form"} />
      submittedData ? <PetAdoptionForm 
          petName={petName}
          setPetName={setPetName}

          petType={petType}
          setPetType={setPetType}

          yourName={yourName}
          setYourName={setYourName}

          email={email}
          setEmail={setEmail}

          phone={phone}
          setPhone={setPhone}

          errors={errors}
          setErrors={setErrors}

          handleSubmit={handleSubmit}

          validatePetName={validatePetName}
          validatePetType={validatePetType}
          validateYourName={validateYourName}
          validateEmail={validateEmail}
          validatePhone={validatePhone}
      
      />
      : <PetTable submittedData={submittedData} />
    </div>
  );
};

export default App;
