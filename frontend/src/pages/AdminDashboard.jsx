import React, { useState, useEffect } from 'react';
import '../Admin.css';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Layers, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUpRight,
  Search,
  Bell,
  LogOut,
  CheckCircle,
  Check,
  Eye,
  TrendingUp,
  Mail,
  Calendar,
  AlertCircle,
  ChevronDown,
  History as HistoryIcon,
  Filter,
  FileSearch,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Building,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/LOGO.png';

// --- Sub-Components for Cleanliness ---

const SparkLine = ({ color, data }) => (
  <svg width="60" height="25" viewBox="0 0 60 25" style={{ overflow: 'visible' }}>
    <path 
      d={data} 
      fill="none" 
      stroke={color} 
      strokeWidth="2.5" 
      strokeLinecap="round" 
    />
  </svg>
);

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data State
  const [properties, setProperties] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);

  // Initialization & Data Loading (Preserving existing logic)
  useEffect(() => {
    const initData = () => {
      let savedProps = JSON.parse(localStorage.getItem('user_properties') || '[]');
      if (savedProps.length === 0) {
        const seedProps = [
          { id: 'b1', title: "Premium Plot A1", location: "The Royal Estate", size: "1200 Sq.ft", price: "₹45L", type: "land", category: 'buy', img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef", status: 'available', surveyNumber: '124/2A', extent: '1.5 Acres', customerName: '' },
          { id: 'b2', title: "Emerald Plot B4", location: "Emerald Valley", size: "2400 Sq.ft", price: "₹85L", type: "land", category: 'buy', img: "https://images.unsplash.com/photo-1629851605336-f3ccb0eceb9e", status: 'booked', surveyNumber: '88/1B', extent: '2.0 Acres', customerName: 'Rajesh Khanna' },
          { id: 'b3', title: "Heritage Plot C9", location: "Heritage West", size: "1000 Sq.ft", price: "₹32L", type: "land", category: 'buy', img: "https://images.unsplash.com/photo-1448375240586-882707db888b", status: 'available', surveyNumber: '402/1', extent: '0.8 Acres', customerName: '' },
          { id: 'b4', title: "Grand Plot D2", location: "Greenfield Prime", size: "1500 Sq.ft", price: "₹56L", type: "land", category: 'buy', img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f", status: 'sold', surveyNumber: '215/C', extent: '1.2 Acres', customerName: 'Amit Shah' }
        ];
        localStorage.setItem('user_properties', JSON.stringify(seedProps));
        savedProps = seedProps;
      }
      setProperties(savedProps);

      let savedProjects = JSON.parse(localStorage.getItem('rsv_projects') || '[]');
      if (savedProjects.length === 0) {
        const seedProjects = [
           { id: 1, name: "The Royal Estate", location: "OMR, Chennai", units: "45/60", status: "Active" },
           { id: 2, name: "Emerald Valley", location: "ECR, Chennai", units: "12/24", status: "Limited" }
        ];
        localStorage.setItem('rsv_projects', JSON.stringify(seedProjects));
        savedProjects = seedProjects;
      }
      setProjects(savedProjects);

      let savedLeads = JSON.parse(localStorage.getItem('rsv_leads') || '[]');
      if (savedLeads.length === 0) {
        const seedLeads = [
          { id: 1, name: "Ramesh Kumar", phone: "+91 98765 21098", email: "ramesh@email.com", interest: "OMR Plots", status: "New", date: "2 min ago" },
          { id: 2, name: "Neha Patel", phone: "+91 87654 32109", email: "neha@email.com", interest: "ECR Luxury", status: "Contacted", date: "1 hour ago" },
          { id: 3, name: "Arun Vivek", phone: "+91 76543 21098", email: "arun@email.com", interest: "Heritage West", status: "New", date: "3 hours ago" }
        ];
        localStorage.setItem('rsv_leads', JSON.stringify(seedLeads));
        savedLeads = seedLeads;
      }
      setLeads(savedLeads);
    };
    initData();
  }, []);

  const saveToLB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  // Property Handlers (Preserving functionality)
  const handleAddProperty = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProp = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      title: formData.get('title'),
      location: formData.get('location'),
      price: formData.get('price'),
      size: formData.get('size'),
      type: formData.get('type') || 'land',
      status: formData.get('status') || 'available',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      img: formData.get('img') || "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      surveyNumber: formData.get('surveyNumber'),
      extent: formData.get('extent'),
      customerName: formData.get('customerName')
    };

    let updated = editingItem ? properties.map(p => p.id === editingItem.id ? newProp : p) : [newProp, ...properties];
    setProperties(updated);
    saveToLB('user_properties', updated);
    setShowAddModal(false);
    setEditingItem(null);
  };

  const deleteProperty = (id) => {
    const updated = properties.filter(p => p.id !== id);
    setProperties(updated);
    saveToLB('user_properties', updated);
  };

  // --- UI Sections ---

  const Sidebar = () => (
    <aside className="admin-sidebar shadow-premium">
      <div className="admin-logo">
        <img src={logo} alt="G" />
        <div className="admin-logo-text">
          <h2 className="serif">RSV GROUPS</h2>
          <span>PRIVATE COLLECTION</span>
        </div>
      </div>
      
      <nav className="admin-nav">
        {[
          { id: 'Dashboard', icon: <LayoutDashboard size={20}/> },
          { id: 'Plots', icon: <MapPin size={20}/> },
          { id: 'Projects', icon: <Layers size={20}/> },
          { id: 'Leads', icon: <Users size={20}/> },
          { id: 'Approvals', icon: <CheckCircle size={20}/> },
          { id: 'History', icon: <HistoryIcon size={20}/> },
          { id: 'Settings', icon: <Settings size={20}/> },
        ].map(item => (
          <div 
            key={item.id} 
            className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon} {item.id}
          </div>
        ))}
      </nav>

      <div className="sidebar-help-card">
        <h4>Need Help?</h4>
        <p>Explore the docs or contact support for assistance.</p>
        <a href="#" className="help-link">View Documentation <ArrowUpRight size={14}/></a>
      </div>

      <div className="admin-user-mini">
         <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" className="user-avatar-small" alt="Profile" />
         <div className="user-info-mini">
            <h5>Admin User</h5>
            <span>admin@rsvgroups.com</span>
         </div>
         <LogOut size={16} onClick={onLogout} style={{ marginLeft: 'auto', cursor: 'pointer', opacity: 0.5 }} />
      </div>
    </aside>
  );

  const DashboardContent = () => (
    <div className="dashboard-v2-container">
      {/* 4 Stat Cards */}
      <div className="metrics-grid">
        {[
          { label: "Total Plots", val: "124", color: "#e8f7ee", icon: <MapPin size={20} color="#2ed573"/>, trend: "+ 12.5%", trendColor: "#2ed573", spark: "M5,15 L15,12 L25,18 L35,10 L45,15 L55,5" },
          { label: "Active Leads", val: "48", color: "#fff4e5", icon: <Users size={20} color="#ffa502"/>, trend: "+ 5.3%", trendColor: "#ffa502", spark: "M5,18 L15,15 L25,20 L35,15 L45,18 L55,14" },
          { label: "Total Projects", val: "12", color: "#e8f3f7", icon: <Layers size={20} color="#34ace0"/>, trend: "+ 8.1%", trendColor: "#34ace0", spark: "M5,15 L15,18 L25,12 L35,10 L45,14 L55,12" },
          { label: "Bookings", val: "24", color: "#f3e8f7", icon: <Calendar size={20} color="#a55eea"/>, trend: "+ 18.2%", trendColor: "#a55eea", spark: "M5,12 L15,18 L25,15 L35,18 L45,12 L55,15" }
        ].map((card, i) => (
          <div key={i} className="metric-card-v2">
            <div className="metric-head">
              <div className="metric-icon-wrap" style={{ background: card.color }}>{card.icon}</div>
              <SparkLine color={card.trendColor} data={card.spark} />
            </div>
            <div className="metric-content">
              <h4>{card.label}</h4>
              <p className="value">{card.val}</p>
              <span className="metric-trend" style={{ color: card.trendColor }}>
                <TrendingUp size={14} /> {card.trend} <span style={{ color: 'var(--admin-text-muted)', fontWeight: 400, marginLeft: '5px' }}>vs last week</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-middle-grid">
         {/* Leads Overview Mock Chart */}
         <div className="grid-card" style={{ gridColumn: 'span 1' }}>
            <div className="chart-header">
               <h3 className="serif">Leads Overview</h3>
               <select className="ghost-select"><option>This Month</option></select>
            </div>
            <div style={{ padding: '2rem 0', height: '150px', display: 'flex', alignItems: 'flex-end', gap: '5%' }}>
               {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                 <div key={i} style={{ flex: 1, background: i === 3 ? 'var(--accent-gold)' : '#f0f0f0', height: `${h}%`, borderRadius: '4px' }}></div>
               ))}
            </div>
         </div>

         {/* Pie Chart Mock */}
         <div className="grid-card">
            <h3 className="serif" style={{ marginBottom: '1.5rem' }}>Bookings by Location</h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <div style={{ width: '100px', height: '100px', border: '15px solid #f0f0f0', borderTopColor: 'var(--accent-gold)', borderRadius: '50%', transform: 'rotate(45deg)' }}></div>
               <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>
                  <p><span style={{ color: 'var(--accent-gold)' }}>●</span> OMR (43%)</p>
                  <p><span style={{ color: '#aaa' }}>●</span> ECR (33%)</p>
                  <p><span style={{ color: '#eee' }}>●</span> GST (24%)</p>
               </div>
            </div>
         </div>

         {/* Top Performer Card */}
         <div className="grid-card">
            <h3 className="serif" style={{ marginBottom: '1rem' }}>Top Performer</h3>
            <div style={{ display: 'flex', gap: '15px' }}>
               <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150" style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} alt="Project" />
               <div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Greenfield Elite</h4>
                  <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>OMR, Chennai</p>
                  <span className="badge-premium" style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.65rem', padding: '4px 8px' }}>12 Bookings</span>
               </div>
            </div>
         </div>
      </div>

      {/* Main Plots Table Section */}
      <div className="data-table-section">
         <div className="table-controls">
            <h3 className="serif">Recent Plots</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
               <input className="table-search" placeholder="Search plots..." style={{ padding: '8px 15px', borderRadius: '8px', border: '1px solid #eee' }} />
               <button className="book-btn" onClick={() => { setEditingItem(null); setShowAddModal(true); }}>
                  <Plus size={16} /> Add New Plot
               </button>
            </div>
         </div>
         <table className="hifi-table">
            <thead>
               <tr>
                  <th>PLOT NAME</th>
                  <th>PROJECT</th>
                  <th>LOCATION</th>
                  <th>SIZE</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
               </tr>
            </thead>
            <tbody>
               {properties.map((prop, i) => (
                  <tr key={i}>
                     <td>
                        <div className="asset-thumb-wrap">
                           <img src={prop.img} className="asset-thumb" alt={prop.title} />
                           <span style={{ fontWeight: 600 }}>{prop.title}</span>
                        </div>
                     </td>
                     <td>The Royal Estate</td>
                     <td>{prop.location.split(',')[0]}</td>
                     <td>{prop.size || '1200 Sq.ft'}</td>
                     <td style={{ fontWeight: 700 }}>{prop.price}</td>
                     <td><span className={`hifi-badge badge-${prop.status}`}>{prop.status}</span></td>
                     <td>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                           <button 
                             className="action-icon-btn" 
                             title="Mark Sold/Leased"
                             onClick={() => {
                               const updated = properties.map(p => p.id === prop.id ? { 
                                 ...p, 
                                 status: p.status === 'available' ? 'sold' : 'available' 
                               } : p);
                               setProperties(updated);
                               localStorage.setItem('user_properties', JSON.stringify(updated));
                             }}
                           >
                             <CheckCircle size={14} color={prop.status === 'sold' ? 'var(--accent-emerald)' : '#999'} />
                           </button>
                           <button className="action-icon-btn"><Eye size={14}/></button>
                           <button className="action-icon-btn" onClick={() => { setEditingItem(prop); setShowAddModal(true); }}><Edit3 size={14}/></button>
                           <button className="action-icon-btn" onClick={() => deleteProperty(prop.id)}><Trash2 size={14} color="#eb4d4b"/></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Footer Modules Grid */}
      <div className="dashboard-footer-grid">
         <div className="footer-widget">
            <div className="chart-header">
               <h4 className="serif">Recent Leads</h4>
               <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700 }}>View All</span>
            </div>
            {leads.slice(0, 3).map((lead, i) => (
              <div key={i} className="widget-item">
                 <img src={`https://i.pravatar.cc/100?u=${lead.id}`} style={{ width: '35px', height: '35px', borderRadius: '50%' }} alt="lead" />
                 <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '0.85rem', margin: 0 }}>{lead.name}</h5>
                    <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', margin: 0 }}>Chennai</p>
                 </div>
                 <span className={`hifi-badge ${lead.status === 'New' ? 'badge-available' : 'badge-booked'}`} style={{ fontSize: '0.6rem' }}>{lead.status}</span>
              </div>
            ))}
         </div>

         <div className="footer-widget">
            <div className="chart-header">
               <h4 className="serif">Upcoming Site Visits</h4>
               <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: 700 }}>View All</span>
            </div>
            {[
              { name: "Vikram Singh", time: "10:00 AM", date: "Jun 8, 2024", status: "Pending" },
              { name: "Neha Patel", time: "11:30 AM", date: "Jun 9, 2024", status: "Confirm" }
            ].map((visit, i) => (
              <div key={i} className="widget-item">
                 <div style={{ background: '#f5f5f5', padding: '8px', borderRadius: '8px' }}><Calendar size={16} /></div>
                 <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: '0.85rem', margin: 0 }}>{visit.name}</h5>
                    <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', margin: 0 }}>{visit.date} • {visit.time}</p>
                 </div>
                 <span className={`hifi-badge ${visit.status === 'Confirm' ? 'badge-available' : 'badge-booked'}`} style={{ fontSize: '0.6rem' }}>{visit.status}</span>
              </div>
            ))}
         </div>

         <div className="footer-widget">
             <h4 className="serif" style={{ marginBottom: '1.5rem' }}>Insights</h4>
             <div className="insight-item">
                <div style={{ color: 'var(--accent-gold)' }}><TrendingUp size={20}/></div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>OMR Plots are trending this week! High demand from IT professionals.</p>
             </div>
             <div className="insight-item">
                <div style={{ color: 'var(--accent-emerald)' }}><CheckCircle size={20}/></div>
                <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>Bookings increased by 18% compared to last month.</p>
             </div>
         </div>
      </div>
    </div>
  );

  // --- High-Fidelity Sub-Page Components ---

  const PlotsView = () => (
    <div className="hifi-tab-content">
      <div className="tab-header">
         <h2 className="serif">Asset Inventory</h2>
         <div className="tab-actions">
            <div className="search-box-inline">
               <Search size={16} />
               <input placeholder="Search properties..." />
            </div>
            <button className="book-btn" onClick={() => { setEditingItem(null); setShowAddModal(true); }}>
               <Plus size={16} /> Add New Plot
            </button>
         </div>
      </div>

      <div className="data-table-section" style={{ marginTop: '2rem' }}>
         <table className="hifi-table">
            <thead>
               <tr>
                  <th>PROPERTY</th>
                  <th>PROJECT</th>
                  <th>VALUE</th>
                  <th>SQ.FT</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
               </tr>
            </thead>
            <tbody>
               {properties.filter(p => !p.isSoldLeased).map((prop, i) => (
                  <tr key={i}>
                     <td>
                        <div className="asset-thumb-wrap">
                           <img src={prop.img} className="asset-thumb" alt={prop.title} />
                           <div>
                              <div style={{ fontWeight: 600 }}>{prop.title}</div>
                              <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>ID: {prop.id}</div>
                           </div>
                        </div>
                     </td>
                     <td>{prop.location.split(',')[0]}</td>
                     <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{prop.price}</td>
                     <td>{prop.size || '1200 Sq.ft'}</td>
                     <td><span className={`hifi-badge badge-${prop.status}`}>{prop.status}</span></td>
                     <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                           <button className="action-icon-btn" onClick={() => {
                              const updated = properties.map(p => p.id === prop.id ? { ...p, status: p.status === 'available' ? 'sold' : 'available' } : p);
                              setProperties(updated);
                              localStorage.setItem('user_properties', JSON.stringify(updated));
                           }}><CheckCircle size={14}/></button>
                           <button className="action-icon-btn" onClick={() => { setEditingItem(prop); setShowAddModal(true); }}><Edit3 size={14}/></button>
                           <button className="action-icon-btn" onClick={() => deleteProperty(prop.id)}><Trash2 size={14} color="#eb4d4b"/></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );

  const ProjectsView = () => (
    <div className="hifi-tab-content">
      <div className="tab-header">
         <h2 className="serif">Major Developments</h2>
         <button className="book-btn"><Plus size={16} /> New Project</button>
      </div>
      <div className="dashboard-footer-grid" style={{ marginTop: '2rem' }}>
         {projects.map((proj, i) => (
           <div key={i} className="grid-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                 <Building size={24} color="var(--accent-gold)" />
                 <span className={`hifi-badge ${proj.status === 'Active' ? 'badge-available' : 'badge-booked'}`}>{proj.status}</span>
              </div>
              <h3 className="serif" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{proj.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}><MapPin size={12}/> {proj.location}</p>
              
              <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '1rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                    <span>Units Sold</span>
                    <span style={{ fontWeight: 700 }}>{proj.units}</span>
                 </div>
                 <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '75%', height: '100%', background: 'var(--accent-gold)' }}></div>
                 </div>
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  const LeadsView = () => (
    <div className="hifi-tab-content">
      <div className="tab-header">
         <h2 className="serif">Customer Inquiries</h2>
      </div>
      <div className="data-table-section" style={{ marginTop: '2rem' }}>
         <table className="hifi-table">
            <thead>
               <tr>
                  <th>CUSTOMER</th>
                  <th>INTEREST</th>
                  <th>CONTACT</th>
                  <th>RECEIVED</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
               </tr>
            </thead>
            <tbody>
               {leads.map((lead, i) => (
                  <tr key={i}>
                     <td>
                        <div className="asset-thumb-wrap">
                           <img src={`https://i.pravatar.cc/100?u=${lead.id}`} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="avatar" />
                           <div style={{ fontWeight: 600 }}>{lead.name}</div>
                        </div>
                     </td>
                     <td>{lead.interest}</td>
                     <td>
                        <div style={{ fontSize: '0.85rem' }}>{lead.phone}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{lead.email}</div>
                     </td>
                     <td>{lead.date}</td>
                     <td><span className={`hifi-badge ${lead.status === 'New' ? 'badge-available' : 'badge-booked'}`}>{lead.status}</span></td>
                     <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                           <button className="action-icon-btn"><MessageSquare size={14}/></button>
                           <button className="action-icon-btn"><Mail size={14}/></button>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );

  const ApprovalsView = () => {
    const pending = properties.filter(p => p.status === 'pending');
    return (
      <div className="hifi-tab-content">
        <div className="tab-header">
           <h2 className="serif">User Submissions</h2>
           <span className="hifi-badge badge-booked">{pending.length} Pending Review</span>
        </div>
        <div className="data-table-section" style={{ marginTop: '2rem' }}>
           <table className="hifi-table">
              <thead>
                 <tr>
                    <th>PROPERTY</th>
                    <th>SUBMITTED BY</th>
                    <th>CATEGORY</th>
                    <th>ACTIONS</th>
                 </tr>
              </thead>
              <tbody>
                 {pending.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center', padding: '5rem', color: 'var(--admin-text-muted)' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                          <FileSearch size={40} opacity={0.2} />
                          <p>All submissions have been processed.</p>
                       </div>
                    </td></tr>
                 ) : pending.map((p, i) => (
                    <tr key={i}>
                       <td>
                          <div className="asset-thumb-wrap">
                             <img src={p.img} className="asset-thumb" alt={p.title} />
                             <span style={{ fontWeight: 600 }}>{p.title}</span>
                          </div>
                       </td>
                       <td>{p.ownerName}</td>
                       <td>{p.category.toUpperCase()}</td>
                       <td>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                             <button className="action-btn-pill approve" onClick={() => {
                                const updated = properties.map(item => item.id === p.id ? { ...item, status: 'available' } : item);
                                setProperties(updated);
                                localStorage.setItem('user_properties', JSON.stringify(updated));
                             }}><ThumbsUp size={14}/> Approve</button>
                             <button className="action-btn-pill reject" onClick={() => deleteProperty(p.id)}><ThumbsDown size={14}/> Reject</button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    );
  };

  const HistoryView = () => {
    const completed = properties.filter(p => p.status === 'sold' || p.status === 'leased');
    return (
      <div className="hifi-tab-content">
        <div className="tab-header">
           <h2 className="serif">Transaction History</h2>
        </div>
        <div className="data-table-section" style={{ marginTop: '2rem' }}>
           <table className="hifi-table">
              <thead>
                 <tr>
                    <th>COMPLETED ASSET</th>
                    <th>CATEGORY</th>
                    <th>FINAL VALUE</th>
                    <th>COMPLETION DATE</th>
                    <th>STATUS</th>
                 </tr>
              </thead>
              <tbody>
                 {completed.map((p, i) => (
                    <tr key={i}>
                       <td>
                          <div className="asset-thumb-wrap">
                             <img src={p.img} className="asset-thumb" alt={p.title} />
                             <span style={{ fontWeight: 600 }}>{p.title}</span>
                          </div>
                       </td>
                       <td>{p.customerName || 'Private Client'}</td>
                       <td style={{ fontSize: '0.8rem' }}>{p.surveyNumber || 'N/A'}</td>
                       <td style={{ fontSize: '0.8rem' }}>{p.extent || p.size || 'N/A'}</td>
                       <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{p.price}</td>
                       <td>{p.completionDate || 'Jun 2024'}</td>
                       <td><span className="hifi-badge badge-sold">{p.status}</span></td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Dashboard': return <DashboardContent />;
      case 'Plots': return <PlotsView />;
      case 'Projects': return <ProjectsView />;
      case 'Leads': return <LeadsView />;
      case 'Approvals': return <ApprovalsView />;
      case 'History': return <HistoryView />;
      default: return <DashboardContent />;
    }
  };

  // Property Modal (Matching reference style)
  const PropertyModal = () => (
    <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '600px', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
           <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>{editingItem ? 'Edit' : 'Add New'} <span className="highlight">Plot</span></h2>
           <X onClick={() => { setShowAddModal(false); setEditingItem(null); }} style={{ cursor: 'pointer', color: '#000' }} />
        </div>
        <form onSubmit={handleAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="admin-input-group">
            <label style={{ color: '#555' }}>Property Name</label>
            <input name="title" defaultValue={editingItem?.title} required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
          </div>
          <div className="admin-input-group">
            <label style={{ color: '#555' }}>Project / Location</label>
            <input name="location" defaultValue={editingItem?.location} required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="admin-input-group">
              <label style={{ color: '#555' }}>Price</label>
              <input name="price" defaultValue={editingItem?.price} required placeholder="₹45L" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
            </div>
            <div className="admin-input-group">
              <label style={{ color: '#555' }}>Size (Sq.ft)</label>
              <input name="size" defaultValue={editingItem?.size} required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
            </div>
          </div>
          <div className="admin-input-group" style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#555' }}>Customer/Buyer Name</label>
            <input name="customerName" defaultValue={editingItem?.customerName} placeholder="Client Name" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="admin-input-group">
              <label style={{ color: '#555' }}>Survey Number</label>
              <input name="surveyNumber" defaultValue={editingItem?.surveyNumber} placeholder="e.g. 124/2A" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
            </div>
            <div className="admin-input-group">
              <label style={{ color: '#555' }}>Extent (Acres/Guntas)</label>
              <input name="extent" defaultValue={editingItem?.extent} placeholder="e.g. 1.5 Acres" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
            </div>
          </div>
          <div className="admin-input-group" style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#555' }}>Image URL</label>
            <input name="img" defaultValue={editingItem?.img} style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <button type="submit" className="book-btn" style={{ flex: 1, padding: '1rem' }}>{editingItem ? 'Save Changes' : 'Post Plot'}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <main className="admin-main">
        <header className="admin-header-v2">
           <div className="header-title">
             <h1>{activeTab}</h1>
             <p>Welcome back, Admin! Here's what's happening today.</p>
           </div>
           
           <div className="header-actions-v2">
             <div className="search-box-v2">
                <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                <input 
                  type="text" 
                  placeholder="Search plots, projects, leads..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>

             <div style={{ position: 'relative' }}>
                <Bell size={22} style={{ opacity: 0.5, cursor: 'pointer' }} />
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#eb4d4b', color: 'white', fontSize: '10px', padding: '2px 5px', borderRadius: '50%', border: '2px solid #fdfaf3' }}>5</span>
             </div>

             <div className="book-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.7rem 1.2rem', fontSize: '0.8rem' }}>
                <Plus size={16} /> Quick Add <ChevronDown size={14} />
             </div>

             <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100" 
                style={{ width: '40px', height: '40px', borderRadius: '10px' }} 
                alt="user" 
             />
           </div>
        </header>

        {renderTabContent()}
      </main>

      <AnimatePresence>
        {showAddModal && <PropertyModal />}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
