import React, { Component } from 'react'

export class AdopterData extends Component {
  render() {
    return (
      
    <table>
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Pet Type</th>
          <th>Your Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>

      <tbody>
        {submittedData.map((item, index) => (
          <tr key={index}>
            <td>{item.petName}</td>
            <td>{item.petType}</td>
            <td>{item.yourName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
    
  }
}

export default AdopterData