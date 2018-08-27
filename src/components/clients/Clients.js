import React, { Component } from "react";

class Clients extends Component {
  render() {
    const Clients = [
      {
        id: "1",
        lastName: "Nguyen",
        firstName: "Van A",
        phone: "111-111-1111",
        email: "nguyenvana@gmail.com",
        balance: "30"
      }
    ];

    if (Clients) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6" />
          </div>
        </div>
      );
    } else {
      return <h1>Loading ...</h1>;
    }
  }
}

export default Clients;
