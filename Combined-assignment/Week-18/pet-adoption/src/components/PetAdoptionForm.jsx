import React from 'react'

const PetAdoptionForm = ({
  petName,
  setPetName,

  petType,
  setPetType,

  yourName,
  setYourName,

  email,
  setEmail,

  phone,
  setPhone,

  errors,
  setErrors,

  handleSubmit,

  validatePetName,
  validatePetType,
  validateYourName,
  validateEmail,
  validatePhone,
}) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "10px",
          gap: "10px"
        }}
      >

        {/* Pet Name */}
        <div>Pet Name</div>

        <input
          type="text"
          value={petName}
          onChange={(e) => {
            setPetName(e.target.value)

            setErrors({
              ...errors,
              petName: validatePetName(e.target.value)
            })
          }}
        />

        {errors.petName && (
          <p style={{ color: "red", margin: 0 }}>
            {errors.petName}
          </p>
        )}


        {/* Pet Type */}
        <div>Pet Type</div>

         <select id="car-select" value={petType} onChange={(e) => {
            setPetType(e.target.value)

            setErrors({
              ...errors,
              petType: validatePetType(e.target.value)
            })
          }}>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Donkey">Donkey</option>
        </select>
        

        {errors.petType && (
          <p style={{ color: "red", margin: 0 }}>
            {errors.petType}
          </p>
        )}


        {/* Your Name */}
        <div>Your Name</div>

        <input
          type="text"
          value={yourName}
          onChange={(e) => {
            setYourName(e.target.value)

            setErrors({
              ...errors,
              yourName: validateYourName(e.target.value)
            })
          }}
        />

        {errors.yourName && (
          <p style={{ color: "red", margin: 0 }}>
            {errors.yourName}
          </p>
        )}


        {/* Email */}
        <div>Email</div>

        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)

            setErrors({
              ...errors,
              email: validateEmail(e.target.value)
            })
          }}
        />

        {errors.email && (
          <p style={{ color: "red", margin: 0 }}>
            {errors.email}
          </p>
        )}


        {/* Phone */}
        <div>Phone</div>

        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)

            setErrors({
              ...errors,
              phone: validatePhone(e.target.value)
            })
          }}
        />

        {errors.phone && (
          <p style={{ color: "red", margin: 0 }}>
            {errors.phone}
          </p>
        )}


        <button
          type="submit"
          style={{
            width: "100px",
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer"
          }}
        >
          Submit
        </button>

      </form>
    </div>
  )
}

export default PetAdoptionForm