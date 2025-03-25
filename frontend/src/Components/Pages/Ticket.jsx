// import React, { useState } from 'react';

// function Ticket() {
//   const [tickets, setTickets] = useState([
//     {
//       id: 1,
//       name: 'Website Redesign',
//       assignedTo: 'John Doe',
//       assignedBy: 'Jane Smith',
//       client: 'Acme Corp',
//       type: 'Design',
//       status: 'Open',
//       priority: 'High',
//       createdAt: '2023-05-15'
//     },
//     {
//       id: 2,
//       name: 'API Integration',
//       assignedTo: 'Mike Johnson',
//       assignedBy: 'Sarah Williams',
//       client: 'Tech Solutions',
//       type: 'Development',
//       status: 'In Progress',
//       priority: 'Medium',
//       createdAt: '2023-05-10'
//     },
//     {
//       id: 3,
//       name: 'Server Maintenance',
//       assignedTo: 'Alex Chen',
//       assignedBy: 'Robert Taylor',
//       client: 'Data Systems',
//       type: 'Operations',
//       status: 'Completed',
//       priority: 'Low',
//       createdAt: '2023-05-05'
//     },
//     {
//       id: 4,
//       name: 'Mobile App Bug',
//       assignedTo: 'Emily Davis',
//       assignedBy: 'David Wilson',
//       client: 'Mobile First',
//       type: 'Bug Fix',
//       status: 'Open',
//       priority: 'High',
//       createdAt: '2023-05-18'
//     },
//   ]);

//   const [filter, setFilter] = useState('all');
//   const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

//   const handleFilter = (status) => {
//     setFilter(status);
//   };

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedTickets = [...tickets].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const filteredTickets = filter === 'all' 
//     ? sortedTickets 
//     : sortedTickets.filter(ticket => ticket.status === filter);

//   const getPriorityClass = (priority) => {
//     switch(priority.toLowerCase()) {
//       case 'high': return 'danger';
//       case 'medium': return 'warning';
//       case 'low': return 'success';
//       default: return 'secondary';
//     }
//   };

//   const getStatusClass = (status) => {
//     switch(status.toLowerCase()) {
//       case 'open': return 'primary';
//       case 'in progress': return 'info';
//       case 'completed': return 'success';
//       default: return 'secondary';
//     }
//   };

//   return (
//     <div className="container-fluid mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="mb-0">Ticket Dashboard</h1>
//         <div>
//           <button className="btn btn-primary mr-2">
//             <i className="fas fa-plus mr-2"></i>Create New Ticket
//           </button>
//           <button className="btn btn-secondary mr-2">
//             <i className="fas fa-file-export mr-2"></i>Export Tickets
//           </button>
//           <button className="btn btn-light">
//             <i className="fas fa-sync-alt mr-2"></i>Refresh
//           </button>
//         </div>
//       </div>

//       <div className="btn-group mb-4" role="group">
//         <button 
//           className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
//           onClick={() => handleFilter('all')}
//         >
//           All Tickets
//         </button>
//         <button 
//           className={`btn ${filter === 'Open' ? 'btn-primary' : 'btn-outline-primary'}`}
//           onClick={() => handleFilter('Open')}
//         >
//           Open
//         </button>
//         <button 
//           className={`btn ${filter === 'In Progress' ? 'btn-primary' : 'btn-outline-primary'}`}
//           onClick={() => handleFilter('In Progress')}
//         >
//           In Progress
//         </button>
//         <button 
//           className={`btn ${filter === 'Completed' ? 'btn-primary' : 'btn-outline-primary'}`}
//           onClick={() => handleFilter('Completed')}
//         >
//           Completed
//         </button>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-hover table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th scope="col" onClick={() => requestSort('id')}>
//                 ID {sortConfig.key === 'id' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('name')}>
//                 Ticket Name {sortConfig.key === 'name' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('assignedTo')}>
//                 Assigned To {sortConfig.key === 'assignedTo' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('assignedBy')}>
//                 Assigned By {sortConfig.key === 'assignedBy' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('client')}>
//                 Client {sortConfig.key === 'client' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('type')}>
//                 Type {sortConfig.key === 'type' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('status')}>
//                 Status {sortConfig.key === 'status' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('priority')}>
//                 Priority {sortConfig.key === 'priority' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col" onClick={() => requestSort('createdAt')}>
//                 Created At {sortConfig.key === 'createdAt' && (
//                   <i className={`fas fa-sort-${sortConfig.direction === 'ascending' ? 'up' : 'down'} ml-1`}></i>
//                 )}
//               </th>
//               <th scope="col">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTickets.map(ticket => (
//               <tr key={ticket.id}>
//                 <th scope="row">{ticket.id}</th>
//                 <td>{ticket.name}</td>
//                 <td>{ticket.assignedTo}</td>
//                 <td>{ticket.assignedBy}</td>
//                 <td>{ticket.client}</td>
//                 <td>{ticket.type}</td>
//                 <td>
//                   <span className={`badge badge-${getStatusClass(ticket.status)}`}>
//                     {ticket.status}
//                   </span>
//                 </td>
//                 <td>
//                   <span className={`badge badge-${getPriorityClass(ticket.priority)}`}>
//                     {ticket.priority}
//                   </span>
//                 </td>
//                 <td>{ticket.createdAt}</td>
//                 <td>
//                   <button className="btn btn-sm btn-info mr-2">
//                     <i className="fas fa-eye"></i>
//                   </button>
//                   <button className="btn btn-sm btn-warning">
//                     <i className="fas fa-edit"></i>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

     
//     </div>
//   );
// }

// export default Ticket;


import React from 'react'

function Ticket() {
  return (
    <div>Ticket</div>
  )
}

export default Ticket