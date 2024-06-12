import React from 'react';
import { Plus } from 'react-bootstrap-icons';

export default function Nav() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger" style={{ marginBottom: 20 }}>
      <div className="container-fluid">
        <a className="navbar-brand text-light fw-bold" href="#/">
          <img src="http://inventive-group.com/Images/Inventive-Group-Logo-Lower-4-Companies.png" alt="Inventive Group" height="50" className="image-mask"></img>
          Training Modules
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href={`#/`}>View All</a>
          </li>
          <li className="nav-item" style={{ marginLeft: 15 }}>
            <a className="btn btn-outline-light" href={`#/add`}>Add <Plus/></a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
