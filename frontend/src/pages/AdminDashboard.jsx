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
   Phone,
   User,
   X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/LOGO.png';

// --- Sub-Components for Cleanliness ---
const API_BASE = import.meta.env.VITE_API_URL || 
                (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://rsv-groups.onrender.com');

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
   const [showAddProjectModal, setShowAddProjectModal] = useState(false);
   const [showMarkSoldModal, setShowMarkSoldModal] = useState(false);
   const [selectedPropForSold, setSelectedPropForSold] = useState(null);
   const [showAddModal, setShowAddModal] = useState(false);
   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
   const [editingItem, setEditingItem] = useState(null);
   const [viewingSubmission, setViewingSubmission] = useState(null);
   const [viewingProject, setViewingProject] = useState(null);
   const [isEditingProject, setIsEditingProject] = useState(false);
   const [showNotifications, setShowNotifications] = useState(false);
   const [viewingLead, setViewingLead] = useState(null);
   const [viewingVisit, setViewingVisit] = useState(null);
   const [viewingHistoryItem, setViewingHistoryItem] = useState(null);
   const [viewingProperty, setViewingProperty] = useState(null);
   const [viewingSoldItem, setViewingSoldItem] = useState(null);
   const [showAddSoldModal, setShowAddSoldModal] = useState(false);
   const [searchTerm, setSearchTerm] = useState('');
   const [topPerformerIndex, setTopPerformerIndex] = useState(0);

   const topPerformers = [
      { title: "Greenfield Elite", location: "OMR, Chennai", bookings: "12 Bookings", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=150" },
      { title: "The Royal Estate", location: "OMR, Chennai", bookings: "8 Bookings", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=150" },
      { title: "Emerald Valley", location: "ECR, Chennai", bookings: "6 Bookings", img: "https://images.unsplash.com/photo-1629851605336-f3ccb0eceb9e?q=80&w=150" }
   ];

   // Profile State
   const [adminProfile, setAdminProfile] = useState({
      name: "RSV Administration",
      email: "admin@rsvgroups.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
   });

   const [properties, setProperties] = useState([]);
   const [projects, setProjects] = useState([]);
   const [leads, setLeads] = useState([]);
   const [visits, setVisits] = useState([]);
   const [soldProperties, setSoldProperties] = useState([]);

   // Initialization & Data Loading (Preserving existing logic)
   useEffect(() => {
      const initData = async () => {
         try {
            // Fetch Plots from Server
            const plotsRes = await fetch(`${API_BASE}/api/plots`);
            const plotsData = await plotsRes.json();
            if (plotsData.length > 0) {
               const mappedPlots = plotsData.map(p => ({
                  id: p.id,
                  title: p.name || 'Untitled Plot',
                  location: p.location || 'Unknown Location',
                  size: p.size || 'N/A',
                  price: p.price || 'Market Rate',
                  type: 'land',
                  status: (p.status || 'available').toLowerCase(),
                  img: p.image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
                  surveyNumber: p.survey_number || 'N/A',
                  extent: p.extent || 'N/A',
                  customerName: p.customer_name || ''
               }));
               setProperties(mappedPlots);
            } else {
               // Fallback to local if empty or error
               let savedProps = JSON.parse(localStorage.getItem('user_properties') || '[]');
               setProperties(savedProps);
            }

            // Fetch Sold Properties from Server
            const soldRes = await fetch(`${API_BASE}/api/sold/all`);
            const soldData = await soldRes.json();
            if (soldData.length > 0) {
               const mappedSold = soldData.map(p => ({
                  ...p,
                  customerName: p.customer_name
               }));
               setSoldProperties(mappedSold);
            } else {
               let savedSold = JSON.parse(localStorage.getItem('rsv_sold_properties') || '[]');
               setSoldProperties(savedSold);
            }
         } catch (err) {
            console.error("Error loading server data:", err);
            // Fallback to localStorage
            setProperties(JSON.parse(localStorage.getItem('user_properties') || '[]'));
            setSoldProperties(JSON.parse(localStorage.getItem('rsv_sold_properties') || '[]'));
         }

         // Keep these on localStorage for now
         setProjects(JSON.parse(localStorage.getItem('rsv_projects') || '[]'));
         setLeads(JSON.parse(localStorage.getItem('rsv_leads') || '[]'));
         setVisits(JSON.parse(localStorage.getItem('rsv_visits') || '[]'));
      };
      initData();
   }, []);

   useEffect(() => {
      if (activeTab === 'Dashboard') {
         const interval = setInterval(() => {
            setTopPerformerIndex((prev) => (prev + 1) % topPerformers.length);
         }, 5000);
         return () => clearInterval(interval);
      }
   }, [activeTab]);

   const saveToLB = (key, data) => localStorage.setItem(key, JSON.stringify(data));

   // Property Handlers (Preserving functionality)
   const handleAddProperty = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProp = {
         name: formData.get('title'),
         location: formData.get('location'),
         price: formData.get('price'),
         size: formData.get('size'),
         type: formData.get('type') || 'land',
         status: formData.get('status') || 'available',
         image_url: formData.get('img') || "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
         survey_number: formData.get('surveyNumber'),
         extent: formData.get('extent'),
         customer_name: formData.get('customerName'),
         project_id: 1 // Default or from project selection
      };

      try {
         const method = editingItem ? 'PUT' : 'POST';
         const url = editingItem ? `${API_BASE}/api/plots/${editingItem.id}` : `${API_BASE}/api/plots`;
         
         const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProp)
         });

         if (res.ok) {
            // Refresh local state
            const plotsRes = await fetch(`${API_BASE}/api/plots`);
            const plotsData = await plotsRes.json();
            setProperties(plotsData.map(p => ({
               id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
               status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
            })));
            setShowAddModal(false);
            setEditingItem(null);
         }
      } catch (err) {
         console.error("Error saving property:", err);
      }
   };

   const handleAddSold = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newSold = {
         title: formData.get('title'),
         location: formData.get('location'),
         price: formData.get('price'),
         sqft: formData.get('sqft'),
         type: formData.get('type') || 'land',
         represented: formData.get('represented'),
         customer_name: formData.get('customerName'),
         status: editingItem ? editingItem.status : 'approved'
      };

      try {
         if (editingItem && editingItem.isFromInventory) {
            // Update in primary properties inventory
            await fetch(`${API_BASE}/api/plots/${editingItem.id}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                  name: newSold.title,
                  location: newSold.location,
                  price: newSold.price,
                  size: newSold.sqft,
                  status: 'sold',
                  customer_name: newSold.customer_name
               })
            });
         } else {
            // Update or add to standalone sold records
            const method = editingItem ? 'PUT' : 'POST';
            const url = editingItem ? `${API_BASE}/api/sold/${editingItem.id}` : `${API_BASE}/api/sold`;
            await fetch(url, {
               method,
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(newSold)
            });
         }

         // Refresh data
         const soldRes = await fetch(`${API_BASE}/api/sold/all`);
         const soldData = await soldRes.json();
         setSoldProperties(soldData.map(p => ({ ...p, customerName: p.customer_name })));
         
         const plotsRes = await fetch(`${API_BASE}/api/plots`);
         const plotsData = await plotsRes.json();
         setProperties(plotsData.map(p => ({
            id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
            status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
         })));

         setShowAddSoldModal(false);
         setEditingItem(null);
      } catch (err) {
         console.error("Error saving sold record:", err);
      }
   };

   const deleteLead = (id) => {
      if (window.confirm("Are you sure you want to remove this inquiry?")) {
         const updated = leads.filter(l => l.id !== id);
         setLeads(updated);
         saveToLB('rsv_leads', updated);
      }
   };

   const handleMarkAsSold = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const buyerName = formData.get('buyerName');

      try {
         await fetch(`${API_BASE}/api/plots/${selectedPropForSold.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               ...selectedPropForSold,
               name: selectedPropForSold.title, // map back to DB field
               status: 'sold',
               customer_name: buyerName
            })
         });

         // Refresh
         const plotsRes = await fetch(`${API_BASE}/api/plots`);
         const plotsData = await plotsRes.json();
         setProperties(plotsData.map(p => ({
            id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
            status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
         })));

         setShowMarkSoldModal(false);
         setSelectedPropForSold(null);
      } catch (err) {
         console.error("Error marking as sold:", err);
      }
   };

   const handleUpdateProject = (updatedProj) => {
      const updated = projects.map(p => p.id === updatedProj.id ? updatedProj : p);
      setProjects(updated);
      saveToLB('rsv_projects', updated);
      setViewingProject(updatedProj);
      setIsEditingProject(false);
   };

   const handleAddProject = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newProj = {
         id: Date.now(),
         name: formData.get('name'),
         location: formData.get('location'),
         units: formData.get('units'),
         status: formData.get('status') || 'Active'
      };
      const updated = [...projects, newProj];
      setProjects(updated);
      saveToLB('rsv_projects', updated);
      setShowAddProjectModal(false);
   };

   const deleteProperty = async (id) => {
      if (window.confirm("Are you sure you want to delete this property?")) {
         try {
            await fetch(`${API_BASE}/api/plots/${id}`, { method: 'DELETE' });
            setProperties(properties.filter(p => p.id !== id));
         } catch (err) {
            console.error("Error deleting property:", err);
         }
      }
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
               { id: 'Dashboard', icon: <LayoutDashboard size={20} /> },
               { id: 'Plots', icon: <MapPin size={20} /> },
               { id: 'Projects', icon: <Layers size={20} /> },
               { id: 'Leads', icon: <Users size={20} /> },
               { id: 'Bookings', icon: <Calendar size={20} /> },
               { id: 'Sold', icon: <CheckCircle size={20} /> },
               { id: 'Approvals', icon: <CheckCircle size={20} /> },
               { id: 'History', icon: <HistoryIcon size={20} /> },
               { id: 'Settings', icon: <Settings size={20} /> },
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
            <a href="#" className="help-link">View Documentation <ArrowUpRight size={14} /></a>
         </div>

         <div className="admin-user-mini">
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gold)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem', marginRight: '12px', flexShrink: 0 }}>
               {adminProfile.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info-mini" style={{ flex: 1, minWidth: 0 }}>
               <h5 style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminProfile.name}</h5>
               <span style={{ fontSize: '0.7rem', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{adminProfile.email}</span>
            </div>
            <LogOut size={16} onClick={onLogout} style={{ marginLeft: '10px', cursor: 'pointer', opacity: 0.5, flexShrink: 0 }} />
         </div>
      </aside>
   );

   const DashboardContent = () => (
      <div className="dashboard-v2-container">
         {/* 4 Stat Cards */}
         <div className="metrics-grid">
            {[
               { label: "Total Plots", val: properties.filter(p => p.type === 'land').length.toString(), color: "#e8f7ee", icon: <MapPin size={20} color="#2ed573" />, trend: "+ 12.5%", trendColor: "#2ed573", spark: "M5,15 L15,12 L25,18 L35,10 L45,15 L55,5" },
               { label: "Active Leads", val: leads.length.toString(), color: "#fff4e5", icon: <Users size={20} color="#ffa502" />, trend: "+ 5.3%", trendColor: "#ffa502", spark: "M5,18 L15,15 L25,20 L35,15 L45,18 L55,14" },
               { label: "Total Projects", val: projects.length.toString(), color: "#e8f3f7", icon: <Layers size={20} color="#34ace0" />, trend: "+ 8.1%", trendColor: "#34ace0", spark: "M5,15 L15,18 L25,12 L35,10 L45,14 L55,12" },
               { label: "Bookings", val: (visits.length + properties.filter(p => p.status === 'booked').length).toString(), color: "#f3e8f7", icon: <Calendar size={20} color="#a55eea" />, trend: "+ 18.2%", trendColor: "#a55eea", spark: "M5,12 L15,18 L25,15 L35,18 L45,12 L55,15" }
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

            {/* Top Performer Card with Animation */}
            <div className="grid-card" style={{ overflow: 'hidden', position: 'relative' }}>
               <h3 className="serif" style={{ marginBottom: '1rem' }}>Top Performer</h3>
               <div style={{ position: 'relative', height: '110px' }}>
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={topPerformerIndex}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        style={{ display: 'flex', gap: '15px', position: 'absolute', width: '100%', alignItems: 'flex-start', top: '15px' }}
                     >
                        <img src={topPerformers[topPerformerIndex].img} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} alt="Project" />
                        <div>
                           <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{topPerformers[topPerformerIndex].title}</h4>
                           <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>{topPerformers[topPerformerIndex].location}</p>
                           <span className="badge-premium" style={{ display: 'inline-block', marginTop: '10px', fontSize: '0.65rem', padding: '4px 8px', background: '#f9f7f0', color: 'var(--accent-gold)', borderRadius: '100px', fontWeight: 700 }}>{topPerformers[topPerformerIndex].bookings}</span>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
               {/* Nav Dots */}
               <div style={{ display: 'flex', gap: '5px', marginTop: '1.5rem', justifyContent: 'center' }}>
                  {topPerformers.map((_, i) => (
                     <div
                        key={i}
                        onClick={() => setTopPerformerIndex(i)}
                        style={{
                           width: '6px',
                           height: '6px',
                           borderRadius: '50%',
                           background: i === topPerformerIndex ? 'var(--accent-gold)' : '#eee',
                           cursor: 'pointer',
                           transition: '0.3s'
                        }}
                     />
                  ))}
               </div>
            </div>
         </div>

         {/* Main Plots Table Section */}
         <div className="data-table-section">
            <div className="table-controls">
               <h3 className="serif">Asset Inventory</h3>
               <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="book-btn" onClick={() => { setEditingItem(null); setShowAddModal(true); }}>
                     <Plus size={16} /> Add New Plot
                  </button>
               </div>
            </div>
            <table className="hifi-table">
               <thead>
                  <tr>
                     <th>PROPERTY</th>
                     <th>PROJECT</th>

                     <th>SQ.FT</th>
                     <th>VALUE</th>
                     <th>STATUS</th>
                     <th>ACTIONS</th>
                  </tr>
               </thead>
               <tbody>
                  {properties
                     .filter(p => !searchTerm || ((p.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) || (p.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())))
                     .slice(0, 5)
                     .map((prop, i) => (
                        <tr key={i}>
                           <td>
                              <div className="asset-thumb-wrap">
                                 <img src={prop.img} className="asset-thumb" alt={prop.title} />
                                 <span style={{ fontWeight: 600 }}>{prop.title}</span>
                              </div>
                           </td>
                           <td>The Royal Estate</td>
                           <td>{prop.location ? prop.location.split(',')[0] : 'N/A'}</td>
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
                                 <button className="action-icon-btn"><Eye size={14} /></button>
                                 <button className="action-icon-btn" onClick={() => { setEditingItem(prop); setShowAddModal(true); }}><Edit3 size={14} /></button>
                                 <button className="action-icon-btn" onClick={() => deleteProperty(prop.id)}><Trash2 size={14} color="#eb4d4b" /></button>
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
               {visits.slice(0, 3).map((visit, i) => (
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
                  <div style={{ color: 'var(--accent-gold)' }}><TrendingUp size={20} /></div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>OMR Plots are trending this week! High demand from IT professionals.</p>
               </div>
               <div className="insight-item">
                  <div style={{ color: 'var(--accent-emerald)' }}><CheckCircle size={20} /></div>
                  <p style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>Bookings increased by 18% compared to last month.</p>
               </div>
            </div>
         </div>
      </div>
   );

   // --- High-Fidelity Sub-Page Components ---

   const PlotsView = () => {
      const filteredProperties = properties.filter(p =>
         !p.isSoldLeased &&
         ((p.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
            (p.location || '').toLowerCase().includes((searchTerm || '').toLowerCase()))
      );

      return (
         <div className="hifi-tab-content">
            <div className="tab-header">
               <h2 className="serif">Asset Inventory</h2>
               <div className="tab-actions">
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
                     {filteredProperties.map((prop, i) => (
                        <tr key={i}>
                           <td>
                              <div className="asset-thumb-wrap" onClick={() => setViewingProperty(prop)} style={{ cursor: 'pointer' }}>
                                 <img src={prop.img} className="asset-thumb" alt={prop.title} />
                                 <div>
                                    <div style={{ fontWeight: 600 }}>{prop.title}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)' }}>ID: {prop.id}</div>
                                 </div>
                              </div>
                           </td>
                           <td>{prop.location ? prop.location.split(',')[0] : 'The Royal Estate'}</td>
                           <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{prop.price}</td>
                           <td>{prop.size || '1200 Sq.ft'}</td>
                           <td><span className={`hifi-badge badge-${prop.status}`}>{prop.status.toUpperCase()}</span></td>
                           <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                 <button className="action-icon-btn" title="View Property Details" onClick={() => setViewingProperty(prop)}><Eye size={14} /></button>
                                 <button className="action-icon-btn" title="Edit/Update" onClick={() => { setEditingItem(prop); setShowAddModal(true); }}><Edit3 size={14} /></button>
                                 {prop.status === 'available' ? (
                                    <button className="action-icon-btn" title="Mark as Sold" onClick={() => {
                                       setSelectedPropForSold(prop);
                                       setShowMarkSoldModal(true);
                                    }}><CheckCircle size={14} color="var(--accent-emerald)" /></button>
                                 ) : (
                                    <button className="action-icon-btn" title="Make Available" onClick={() => {
                                       const updated = properties.map(p => p.id === prop.id ? { ...p, status: 'available' } : p);
                                       setProperties(updated);
                                       localStorage.setItem('user_properties', JSON.stringify(updated));
                                    }}><HistoryIcon size={14} /></button>
                                 )}
                                 <button className="action-icon-btn" title="Delete Property" onClick={() => deleteProperty(prop.id)}><Trash2 size={14} color="#eb4d4b" /></button>
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

   const ProjectsView = () => {
      const filteredProjects = projects.filter(p =>
         (p.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
         (p.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())
      );

      return (
         <div className="hifi-tab-content">
            <div className="tab-header">
               <h2 className="serif">Major Developments</h2>
               <button className="book-btn" onClick={() => setShowAddProjectModal(true)}><Plus size={16} /> New Project</button>
            </div>
            <div className="grid-card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
               {filteredProjects.map((proj, i) => (
                  <div key={i} className="grid-card project-card-clickable" onClick={() => setViewingProject(proj)} style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <Building size={24} color="var(--accent-gold)" />
                        <span className={`hifi-badge ${proj.status === 'Active' ? 'badge-available' : 'badge-booked'}`}>{proj.status}</span>
                     </div>
                     <h3 className="serif" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{proj.name}</h3>
                     <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}><MapPin size={12} /> {proj.location}</p>

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
   };

   const LeadsView = () => {
      const filteredLeads = leads.filter(l =>
         (l.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
         (l.interest || '').toLowerCase().includes((searchTerm || '').toLowerCase())
      );

      return (
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
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredLeads.map((lead, i) => (
                        <tr key={i}>
                           <td>
                              <div className="asset-thumb-wrap" onClick={() => setViewingLead(lead)} style={{ cursor: 'pointer' }}>
                                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), var(--primary-dark))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
                                    {lead.name.charAt(0).toUpperCase()}
                                 </div>
                                 <div style={{ fontWeight: 600 }}>{lead.name}</div>
                              </div>
                           </td>
                           <td>{lead.interest}</td>
                           <td>
                              <div style={{ fontSize: '0.85rem' }}>{lead.phone}</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{lead.email}</div>
                           </td>
                           <td>{lead.date}</td>
                           <td><span className={`hifi-badge ${lead.status === 'New' ? 'badge-available' : lead.status === 'Sold' ? 'badge-sold' : 'badge-booked'}`}>{lead.status}</span></td>
                           <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                 <button className="action-icon-btn" title="View Inquiry Details" onClick={() => setViewingLead(lead)}><Eye size={14} /></button>
                                 <button className="action-icon-btn" title="Send WhatsApp Message"><MessageSquare size={14} /></button>
                                 <button className="action-icon-btn" title="Send Email"><Mail size={14} /></button>
                                 <button className="action-icon-btn" title="Remove Inquiry" onClick={() => deleteLead(lead.id)}><Trash2 size={14} color="#eb4d4b" /></button>
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

   const BookingsView = () => {
      const filteredVisits = visits.filter(v =>
         (v.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
         (v.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())
      );

      return (
         <div className="hifi-tab-content">
            <div className="tab-header">
               <h2 className="serif">Site Visit Appointments</h2>
               <span className="hifi-badge badge-booked">{visits.filter(v => v.status === 'Pending').length} Pending Confirmation</span>
            </div>
            <div className="data-table-section" style={{ marginTop: '2rem' }}>
               <table className="hifi-table">
                  <thead>
                     <tr>
                        <th>CUSTOMER</th>
                        <th>APPOINTMENT</th>
                        <th>LOCATION</th>
                        <th>CONTACT</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredVisits.length === 0 ? (
                        <tr><td colSpan="6" style={{ textAlign: 'center', padding: '5rem', color: 'var(--admin-text-muted)' }}>
                           <FileSearch size={40} opacity={0.2} style={{ marginBottom: '1rem' }} />
                           <p>No site visit requests found.</p>
                        </td></tr>
                     ) : filteredVisits.map((visit, i) => (
                        <tr key={i}>
                           <td>
                              <div className="asset-thumb-wrap" onClick={() => setViewingVisit(visit)} style={{ cursor: 'pointer' }}>
                                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #eee, #ccc)', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem' }}>
                                    {visit.name.charAt(0).toUpperCase()}
                                 </div>
                                 <div style={{ fontWeight: 600 }}>{visit.name}</div>
                              </div>
                           </td>
                           <td>
                              <div style={{ fontWeight: 600 }}>{visit.date}</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{visit.time || 'TBD'}</div>
                           </td>
                           <td>{visit.location}</td>
                           <td>{visit.phone}</td>
                           <td><span className={`hifi-badge ${visit.status === 'Confirm' ? 'badge-available' : 'badge-booked'}`}>{visit.status}</span></td>
                           <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                 <button
                                    className="action-icon-btn"
                                    onClick={() => {
                                       const updated = visits.map(v => v.id === visit.id ? { ...v, status: v.status === 'Confirm' ? 'Pending' : 'Confirm' } : v);
                                       setVisits(updated);
                                       localStorage.setItem('rsv_visits', JSON.stringify(updated));
                                    }}
                                    title="Confirm Visit"
                                 >
                                    <CheckCircle size={14} color={visit.status === 'Confirm' ? 'var(--accent-emerald)' : '#999'} />
                                 </button>
                                 <button className="action-icon-btn"><MessageSquare size={14} /></button>
                                 <button
                                    className="action-icon-btn"
                                    onClick={() => {
                                       const updated = visits.filter(v => v.id !== visit.id);
                                       setVisits(updated);
                                       localStorage.setItem('rsv_visits', JSON.stringify(updated));
                                    }}
                                 >
                                    <Trash2 size={14} color="#eb4d4b" />
                                 </button>
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

   const SoldView = () => {
      const plotsSold = properties.filter(p => p.status === 'sold').map(p => ({
         ...p,
         sqft: p.size,
         represented: 'Both Buyer & Sellers',
         status: 'approved',
         isFromInventory: true
      }));

      const allSold = [...plotsSold, ...soldProperties];

      const filteredSold = allSold.filter(p =>
         (p.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
         (p.location || '').toLowerCase().includes((searchTerm || '').toLowerCase())
      );

      return (
         <div className="hifi-tab-content">
            <div className="tab-header">
               <h2 className="serif">Sold/Leased Inventory</h2>
               <div className="tab-actions">
                  <button className="book-btn" onClick={() => { setEditingItem(null); setShowAddSoldModal(true); }}>
                     <Plus size={16} /> Add Sold Detail
                  </button>
               </div>
            </div>

            <div className="data-table-section" style={{ marginTop: '2rem' }}>
               <table className="hifi-table">
                  <thead>
                     <tr>
                        <th>PROPERTY DETAIL</th>
                        <th>LOCATION</th>
                        <th>VALUE</th>
                        <th>REPRESENTED</th>
                        <th>STATUS</th>
                        <th>ACTIONS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredSold.map((prop, i) => (
                        <tr key={i}>
                           <td>
                              <div style={{ fontWeight: 600 }}>{prop.title}</div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{prop.sqft}</div>
                           </td>
                           <td>{prop.location}</td>
                           <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{prop.price}</td>
                           <td style={{ fontSize: '0.85rem' }}>{prop.represented}</td>
                           <td>
                              <span className={`hifi-badge ${prop.status === 'approved' ? 'badge-available' :
                                    prop.status === 'pending' ? 'badge-booked' : 'badge-sold'
                                 }`}>
                                 {prop.status.toUpperCase()}
                              </span>
                           </td>
                           <td>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                 <button className="action-icon-btn" title="View Details" onClick={() => setViewingSoldItem(prop)}><Eye size={14} /></button>
                                 <button className="action-icon-btn" title="Edit" onClick={() => { setEditingItem(prop); setShowAddSoldModal(true); }}><Edit3 size={14} /></button>
                                 <button className="action-icon-btn" title="Approve" onClick={async () => {
                                    try {
                                       if (prop.isFromInventory) {
                                          await fetch(`http://localhost:5000/api/plots/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, name: prop.title, status: 'sold' })
                                          });
                                       } else {
                                          await fetch(`http://localhost:5000/api/sold/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, status: 'approved' })
                                          });
                                       }
                                       // Refresh
                                       const soldRes = await fetch('http://localhost:5000/api/sold/all');
                                       const soldData = await soldRes.json();
                                       setSoldProperties(soldData.map(p => ({ ...p, customerName: p.customer_name })));
                                       const plotsRes = await fetch('http://localhost:5000/api/plots');
                                       const plotsData = await plotsRes.json();
                                       setProperties(plotsData.map(p => ({
                                          id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
                                          status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
                                       })));
                                    } catch (err) { console.error(err); }
                                 }}><CheckCircle size={14} color="#2ed573" /></button>
                                 <button className="action-icon-btn" title="Pending" onClick={async () => {
                                    try {
                                       if (prop.isFromInventory) {
                                          await fetch(`http://localhost:5000/api/plots/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, name: prop.title, status: 'booked' })
                                          });
                                       } else {
                                          await fetch(`http://localhost:5000/api/sold/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, status: 'pending' })
                                          });
                                       }
                                       // Refresh
                                       const soldRes = await fetch('http://localhost:5000/api/sold/all');
                                       const soldData = await soldRes.json();
                                       setSoldProperties(soldData.map(p => ({ ...p, customerName: p.customer_name })));
                                       const plotsRes = await fetch('http://localhost:5000/api/plots');
                                       const plotsData = await plotsRes.json();
                                       setProperties(plotsData.map(p => ({
                                          id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
                                          status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
                                       })));
                                    } catch (err) { console.error(err); }
                                 }}><Clock size={14} color="#ffa502" /></button>
                                 <button className="action-icon-btn" title="Reject" onClick={async () => {
                                    try {
                                       if (prop.isFromInventory) {
                                          await fetch(`http://localhost:5000/api/plots/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, name: prop.title, status: 'available' })
                                          });
                                       } else {
                                          await fetch(`http://localhost:5000/api/sold/${prop.id}`, {
                                             method: 'PUT',
                                             headers: { 'Content-Type': 'application/json' },
                                             body: JSON.stringify({ ...prop, status: 'rejected' })
                                          });
                                       }
                                       // Refresh
                                       const soldRes = await fetch('http://localhost:5000/api/sold/all');
                                       const soldData = await soldRes.json();
                                       setSoldProperties(soldData.map(p => ({ ...p, customerName: p.customer_name })));
                                       const plotsRes = await fetch('http://localhost:5000/api/plots');
                                       const plotsData = await plotsRes.json();
                                       setProperties(plotsData.map(p => ({
                                          id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
                                          status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
                                       })));
                                    } catch (err) { console.error(err); }
                                 }}><ThumbsDown size={14} color="#eb4d4b" /></button>
                                 <button className="action-icon-btn" title="Delete" onClick={async () => {
                                    if (window.confirm("Are you sure you want to remove this record?")) {
                                       try {
                                          if (prop.isFromInventory) {
                                             await fetch(`http://localhost:5000/api/plots/${prop.id}`, {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ ...prop, name: prop.title, status: 'available' })
                                             });
                                          } else {
                                             await fetch(`http://localhost:5000/api/sold/${prop.id}`, { method: 'DELETE' });
                                          }
                                          // Refresh
                                          const soldRes = await fetch('http://localhost:5000/api/sold/all');
                                          const soldData = await soldRes.json();
                                          setSoldProperties(soldData.map(p => ({ ...p, customerName: p.customer_name })));
                                          const plotsRes = await fetch('http://localhost:5000/api/plots');
                                          const plotsData = await plotsRes.json();
                                          setProperties(plotsData.map(p => ({
                                             id: p.id, title: p.name, location: p.location, size: p.size, price: p.price,
                                             status: p.status.toLowerCase(), img: p.image_url, customerName: p.customer_name
                                          })));
                                       } catch (err) { console.error(err); }
                                    }
                                 }}><Trash2 size={14} color="#eb4d4b" /></button>
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

   const SoldDetailModal = () => {
      if (!viewingSoldItem) return null;
      const s = viewingSoldItem;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '500px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Sold <span className="highlight">Record</span></h2>
                  <X onClick={() => setViewingSoldItem(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="admin-input-group">
                     <label style={{ fontSize: '0.7rem', opacity: 0.6 }}>Deal Title</label>
                     <p style={{ fontWeight: 600 }}>{s.title}</p>
                  </div>
                  <div className="admin-input-group">
                     <label style={{ fontSize: '0.7rem', opacity: 0.6 }}>Location</label>
                     <p style={{ fontWeight: 600 }}>{s.location}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                     <div className="admin-input-group">
                        <label style={{ fontSize: '0.7rem', opacity: 0.6 }}>Price</label>
                        <p style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{s.price}</p>
                     </div>
                     <div className="admin-input-group">
                        <label style={{ fontSize: '0.7rem', opacity: 0.6 }}>Size</label>
                        <p style={{ fontWeight: 600 }}>{s.sqft}</p>
                     </div>
                  </div>
                  <div className="admin-input-group">
                     <label style={{ fontSize: '0.7rem', opacity: 0.6 }}>Customer/Notes</label>
                     <p style={{ fontWeight: 600 }}>{s.customerName || 'N/A'}</p>
                  </div>
               </div>
               <button className="book-btn" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }} onClick={() => setViewingSoldItem(null)}>Close</button>
            </motion.div>
         </motion.div>
      );
   };

   const ApprovalsView = () => {
      const pending = properties.filter(p =>
         p.status === 'pending' &&
         ((p.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
            (p.ownerName || p.customerName || '').toLowerCase().includes((searchTerm || '').toLowerCase()))
      );
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
                                 <button className="action-icon-btn" onClick={() => setViewingSubmission(p)} title="View Details">
                                    <Eye size={16} />
                                 </button>
                                 <button className="action-btn-pill approve" onClick={async () => {
                                    try {
                                       await fetch(`http://localhost:5000/api/plots/${p.id}`, {
                                          method: 'PUT',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({ ...p, name: p.title, status: 'available' })
                                       });
                                       const plotsRes = await fetch('http://localhost:5000/api/plots');
                                       const plotsData = await plotsRes.json();
                                       setProperties(plotsData.map(item => ({
                                          id: item.id, title: item.name, location: item.location, size: item.size, price: item.price,
                                          status: item.status.toLowerCase(), img: item.image_url, customerName: item.customer_name
                                       })));
                                    } catch (err) { console.error(err); }
                                 }}><ThumbsUp size={14} /> Approve</button>
                                 <button className="action-btn-pill reject" onClick={async () => {
                                    if (window.confirm("Reject this submission?")) {
                                       try {
                                          await fetch(`http://localhost:5000/api/plots/${p.id}`, { method: 'DELETE' });
                                          setProperties(properties.filter(item => item.id !== p.id));
                                       } catch (err) { console.error(err); }
                                    }
                                 }}><ThumbsDown size={14} /> Reject</button>
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
      const inventoryCompleted = properties.filter(p => 
         (p.status === 'sold' || p.status === 'leased')
      ).map(p => ({
         ...p,
         completionDate: p.completionDate || 'Jun 2024',
         isFromInventory: true
      }));

      const manualCompleted = soldProperties.filter(p => 
         p.status === 'approved'
      ).map(p => ({
         ...p,
         size: p.sqft,
         completionDate: 'Jun 2024',
         img: p.img || "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
         isFromInventory: false
      }));

      const allCompleted = [...inventoryCompleted, ...manualCompleted].filter(p =>
         (p.title || '').toLowerCase().includes((searchTerm || '').toLowerCase())
      );

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
                        <th>CUSTOMER</th>
                        <th>SURVEY NO</th>
                        <th>EXTENT</th>
                        <th>FINAL VALUE</th>
                        <th>COMPLETION</th>
                        <th>STATUS</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allCompleted.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '5rem', color: 'var(--admin-text-muted)' }}>
                           <FileSearch size={40} opacity={0.2} style={{ marginBottom: '1rem' }} />
                           <p>No completed transactions found.</p>
                        </td></tr>
                     ) : allCompleted.map((p, i) => (
                        <tr key={i}>
                           <td>
                              <div className="asset-thumb-wrap" onClick={() => setViewingHistoryItem(p)} style={{ cursor: 'pointer' }}>
                                 <img src={p.img} className="asset-thumb" alt={p.title} />
                                 <span style={{ fontWeight: 600 }}>{p.title}</span>
                              </div>
                           </td>
                           <td>{p.customerName || 'Private Client'}</td>
                           <td style={{ fontSize: '0.8rem' }}>{p.surveyNumber || 'N/A'}</td>
                           <td style={{ fontSize: '0.8rem' }}>{p.extent || p.size || 'N/A'}</td>
                           <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{p.price}</td>
                           <td style={{ fontSize: '0.85rem' }}>{p.completionDate}</td>
                           <td><span className={`hifi-badge ${p.status === 'sold' || p.status === 'approved' ? 'badge-sold' : 'badge-booked'}`}>{p.status.toUpperCase()}</span></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      );
   };

   const SettingsView = () => {
      return (
         <div className="hifi-tab-content" style={{ maxWidth: '900px' }}>
            <div className="settings-grid" style={{ display: 'grid', gap: '2.5rem', marginTop: '1rem' }}>

               {/* Account Section */}
               <div className="grid-card">
                  <h3 className="serif" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Account Profile</h3>
                  <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                     <div style={{ position: 'relative' }}>
                        <img
                           src={adminProfile.avatar}
                           style={{ width: '100px', height: '100px', borderRadius: '24px', objectFit: 'cover' }}
                           alt="Admin Avatar"
                        />
                        <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--accent-gold)', padding: '8px', borderRadius: '12px', cursor: 'pointer' }}>
                           <Plus size={14} color="white" />
                        </div>
                     </div>
                     <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="admin-input-group">
                           <label>Full Name</label>
                           <input
                              value={adminProfile.name}
                              onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                           />
                        </div>
                        <div className="admin-input-group">
                           <label>Email Address</label>
                           <input
                              value={adminProfile.email}
                              onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                           />
                        </div>
                     </div>
                  </div>
               </div>


               {/* Security & Preferences */}
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="grid-card">
                     <h3 className="serif" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Security</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div>
                              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Two-Factor Auth</div>
                              <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Secured by Authenticator</div>
                           </div>
                           <span className="hifi-badge badge-available">ON</span>
                        </div>
                        <button className="book-btn" onClick={() => setShowChangePasswordModal(true)} style={{ padding: '0.8rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid #ddd', color: 'var(--admin-text-main)' }}>Reset Password</button>
                     </div>
                  </div>

                  <div className="grid-card">
                     <h3 className="serif" style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Preferences</h3>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Language</span>
                           <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>English (UK)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Default Currency</span>
                           <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>INR (₹)</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>System Theme</span>
                           <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Synchronized with System</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="book-btn" style={{ padding: '1rem 3rem' }}>Save All Changes</button>
               </div>
            </div>
         </div>
      );
   };

   const renderTabContent = () => {
      switch (activeTab) {
         case 'Dashboard': return <DashboardContent />;
         case 'Plots': return <PlotsView />;
         case 'Projects': return <ProjectsView />;
         case 'Leads': return <LeadsView />;
         case 'Bookings': return <BookingsView />;
         case 'Sold': return <SoldView />;
         case 'Approvals': return <ApprovalsView />;
         case 'History': return <HistoryView />;
         case 'Settings': return <SettingsView />;
         default: return <DashboardContent />;
      }
   };


   const ChangePasswordModal = () => (
      <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '450px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Reset <span className="highlight">Password</span></h2>
               <X onClick={() => setShowChangePasswordModal(false)} style={{ cursor: 'pointer', color: '#000' }} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Password successfully updated!'); setShowChangePasswordModal(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Current Password</label>
                  <input type="password" required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>New Password</label>
                  <input type="password" required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Confirm New Password</label>
                  <input type="password" required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, padding: '1rem' }}>Update Password</button>
               </div>
            </form>
         </motion.div>
      </motion.div>
   );

   const NotificationsDropdown = () => {
      const pendingItems = properties.filter(p => p.status === 'pending').slice(0, 5);

      return (
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
               position: 'absolute',
               top: '45px',
               right: '0',
               width: '320px',
               background: 'white',
               borderRadius: '16px',
               boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
               padding: '1.5rem',
               zIndex: 1000,
               border: '1px solid #f0f0f0'
            }}
         >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f9f9f9', paddingBottom: '0.8rem' }}>
               <h4 className="serif" style={{ margin: 0, fontSize: '1rem' }}>Notifications</h4>
               <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setActiveTab('Approvals'); setShowNotifications(false); }}>View All</span>
            </div>

            {pendingItems.length === 0 ? (
               <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.5, padding: '1rem' }}>No new notifications</p>
            ) : (
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {pendingItems.map((item, i) => (
                     <div
                        key={i}
                        className="widget-item"
                        style={{ cursor: 'pointer', hover: { opacity: 0.8 } }}
                        onClick={() => { setViewingSubmission(item); setShowNotifications(false); }}
                     >
                        <img src={item.img} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} alt="Asset" />
                        <div style={{ flex: 1 }}>
                           <h5 style={{ fontSize: '0.8rem', margin: 0 }}>New {item.category} submission</h5>
                           <p style={{ fontSize: '0.7rem', color: 'var(--admin-text-muted)', margin: 0 }}>{item.title}</p>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </motion.div>
      );
   };

   const ProjectDetailModal = () => {
      if (!viewingProject) return null;
      const [editData, setEditData] = useState(viewingProject);
      const p = viewingProject;

      const linkedPlots = properties.filter(prop =>
         (prop.location || '').toLowerCase().includes(p.name.toLowerCase()) ||
         (p.location || '').toLowerCase().includes((prop.location || '').toLowerCase())
      );

      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '850px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>
                     {isEditingProject ? 'Edit' : 'Project'} <span className="highlight">{isEditingProject ? 'Properties' : 'Analysis'}</span>
                  </h2>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                     {!isEditingProject && (
                        <button
                           className="action-icon-btn"
                           onClick={() => { setEditData(p); setIsEditingProject(true); }}
                           title="Edit Project"
                        >
                           <Edit3 size={18} />
                        </button>
                     )}
                     <X onClick={() => { setViewingProject(null); setIsEditingProject(false); }} style={{ cursor: 'pointer', color: '#000' }} />
                  </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
                  {/* Left Column: Project Overview */}
                  <div>
                     <div style={{ background: '#f9f7f0', padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
                        {isEditingProject ? (
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                              <div className="admin-input-group">
                                 <label>Project Name</label>
                                 <input
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    style={{ background: 'white', border: '1px solid #ddd' }}
                                 />
                              </div>
                              <div className="admin-input-group">
                                 <label>Location</label>
                                 <input
                                    value={editData.location}
                                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                    style={{ background: 'white', border: '1px solid #ddd' }}
                                 />
                              </div>
                              <div className="admin-input-group">
                                 <label>Units Commercialized (Sold/Total)</label>
                                 <input
                                    value={editData.units}
                                    onChange={(e) => setEditData({ ...editData, units: e.target.value })}
                                    style={{ background: 'white', border: '1px solid #ddd' }}
                                 />
                              </div>
                              <div className="admin-input-group">
                                 <label>Project Status</label>
                                 <select
                                    value={editData.status}
                                    onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                                    style={{ background: 'white', border: '1px solid #ddd' }}
                                 >
                                    <option value="Active">Active</option>
                                    <option value="Limited">Limited</option>
                                    <option value="Sold Out">Sold Out</option>
                                 </select>
                              </div>
                              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                                 <button className="book-btn" style={{ flex: 1 }} onClick={() => handleUpdateProject(editData)}>Save</button>
                                 <button className="book-btn" style={{ flex: 1, background: 'transparent', border: '1px solid #ddd', color: 'black' }} onClick={() => setIsEditingProject(false)}>Cancel</button>
                              </div>
                           </div>
                        ) : (
                           <>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                 <div style={{ background: 'var(--accent-gold)', color: 'white', padding: '12px', borderRadius: '12px' }}>
                                    <Building size={24} />
                                 </div>
                                 <div>
                                    <h3 className="serif" style={{ margin: 0, fontSize: '1.4rem' }}>{p.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}><MapPin size={12} /> {p.location}</p>
                                 </div>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Development Status</span>
                                    <span className={`hifi-badge ${p.status === 'Active' ? 'badge-available' : p.status === 'Sold Out' ? 'badge-sold' : 'badge-booked'}`}>{p.status}</span>
                                 </div>

                                 <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.2rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '10px' }}>
                                       <span>Units Commercialized</span>
                                       <span style={{ fontWeight: 700 }}>{p.units}</span>
                                    </div>
                                    <div style={{ height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                                       <div style={{
                                          width: p.status === 'Sold Out' ? '100%' : '75%',
                                          height: '100%',
                                          background: p.status === 'Sold Out' ? 'var(--accent-ruby)' : 'var(--accent-gold)',
                                          transition: 'width 1s ease-out'
                                       }}></div>
                                    </div>
                                 </div>
                              </div>
                           </>
                        )}
                     </div>

                     {!isEditingProject && (
                        <div className="grid-card" style={{ padding: '1.5rem' }}>
                           <h4 className="serif" style={{ fontSize: '1rem', marginBottom: '1rem' }}>Quick Stats</h4>
                           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                              <div style={{ padding: '15px', background: '#f5f7f6', borderRadius: '12px', textAlign: 'center' }}>
                                 <div style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '1.2rem' }}>14</div>
                                 <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Active Leads</div>
                              </div>
                              <div style={{ padding: '15px', background: '#f5f7f6', borderRadius: '12px', textAlign: 'center' }}>
                                 <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '1.2rem' }}>92%</div>
                                 <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5 }}>Satisfaction</div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Right Column: Linked Assets / Plots */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                     <div className="tab-header" style={{ marginBottom: '0.5rem' }}>
                        <h4 className="serif" style={{ margin: 0 }}>Linked Inventory</h4>
                        <button className="action-icon-btn"><Filter size={14} /></button>
                     </div>

                     <div className="data-table-section" style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #f0f0f0' }}>
                        <table className="hifi-table">
                           <thead>
                              <tr>
                                 <th style={{ padding: '1rem' }}>PLOT NAME</th>
                                 <th style={{ padding: '1rem' }}>SIZE</th>
                                 <th style={{ padding: '1rem' }}>VALUE</th>
                                 <th style={{ padding: '1rem' }}>STATUS</th>
                              </tr>
                           </thead>
                           <tbody>
                              {linkedPlots.length === 0 ? (
                                 <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', opacity: 0.4 }}>
                                       <FileSearch size={30} style={{ marginBottom: '10px' }} />
                                       <p style={{ fontSize: '0.8rem' }}>No inventory linked yet</p>
                                    </td>
                                 </tr>
                              ) : linkedPlots.map((item, i) => (
                                 <tr key={i} onClick={() => setViewingProperty(item)} style={{ cursor: 'pointer' }} title="Click to view full details">
                                    <td style={{ padding: '1rem' }}>
                                       <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                          <img src={item.img} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} alt="" />
                                          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.title}</span>
                                       </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontSize: '0.8rem' }}>{item.size}</td>
                                    <td style={{ padding: '1rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-gold)' }}>{item.price}</td>
                                    <td style={{ padding: '1rem' }}>
                                       <span className={`hifi-badge badge-${item.status}`} style={{ fontSize: '0.6rem', padding: '3px 8px' }}>{item.status}</span>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     {!isEditingProject && (
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                           <button className="book-btn" style={{ flex: 1, padding: '1rem' }}>Generate Project Report</button>
                           <button className="book-btn" style={{ background: 'transparent', border: '1px solid #ddd', color: 'var(--admin-text-main)', padding: '1rem' }} onClick={() => setViewingProject(null)}>Close View</button>
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const PropertyDetailModal = () => {
      if (!viewingProperty) return null;
      const p = viewingProperty;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '750px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Property <span className="highlight">Analysis</span></h2>
                  <X onClick={() => setViewingProperty(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  {/* Left side: Visuals & Core Specs */}
                  <div>
                     <img src={p.img} style={{ width: '100%', height: '250px', borderRadius: '32px', objectFit: 'cover', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} alt="" />

                     <div style={{ display: 'flex', gap: '15px', marginBottom: '2rem' }}>
                        <div style={{ flex: 1, padding: '1.5rem', background: '#fcfaf5', borderRadius: '20px', textAlign: 'center' }}>
                           <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '8px' }}>Asset Value</div>
                           <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-gold)' }}>{p.price}</div>
                        </div>
                        <div style={{ flex: 1, padding: '1.5rem', background: '#f5f7f9', borderRadius: '20px', textAlign: 'center' }}>
                           <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.5, marginBottom: '8px' }}>Total Size</div>
                           <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{p.size || '1200'} <span style={{ fontSize: '0.8rem' }}>Sq.ft</span></div>
                        </div>
                     </div>

                     <div style={{ padding: '1.5rem', background: '#fdfdfd', border: '1px solid #f0f0f0', borderRadius: '20px' }}>
                        <h4 className="serif" style={{ marginBottom: '1rem' }}>Location Overview</h4>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--admin-text-main)', marginBottom: '0.5rem' }}>
                           <MapPin size={16} color="var(--accent-ruby)" /> {p.location || 'OMR, Chennai'}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)', lineHeight: 1.5 }}>
                           Prime residential area with excellent connectivity to IT parks and major highways. High appreciation potential.
                        </p>
                     </div>
                  </div>

                  {/* Right side: Detailed Specs & Management */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <section>
                        <h4 className="serif" style={{ fontSize: '1.1rem', borderBottom: '1px solid #eee', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>Technical Specifications</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.7rem' }}>Survey Number</label>
                              <p style={{ fontWeight: 600 }}>{p.surveyNumber || '124/2A'}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.7rem' }}>Extent / Area</label>
                              <p style={{ fontWeight: 600 }}>{p.extent || '1.5 Acres'}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.7rem' }}>Asset Status</label>
                              <span className={`hifi-badge badge-${p.status}`} style={{ display: 'inline-block', marginTop: '5px' }}>{p.status.toUpperCase()}</span>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.7rem' }}>Linked Project</label>
                              <p style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>The Royal Estate</p>
                           </div>
                        </div>
                     </section>

                     <section>
                        <h4 className="serif" style={{ fontSize: '1.1rem', borderBottom: '1px solid #eee', paddingBottom: '0.8rem', marginBottom: '1.2rem' }}>Seller Information</h4>
                        <div className="admin-input-group">
                           <label style={{ fontSize: '0.7rem' }}>Name</label>
                           <p style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{p.ownerName || 'RSV Group Holdings'}</p>
                        </div>
                        <div className="admin-input-group" style={{ marginTop: '1rem' }}>
                           <label style={{ fontSize: '0.7rem' }}>Contact Number</label>
                           <p style={{ fontWeight: 600 }}>{p.phone || '+91 XXXXX XXXXX'}</p>
                        </div>
                        <div className="admin-input-group" style={{ marginTop: '1rem' }}>
                           <label style={{ fontSize: '0.7rem' }}>Buyer (if sold)</label>
                           <p style={{ fontWeight: 600 }}>{p.customerName || 'N/A'}</p>
                        </div>
                     </section>

                     <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                        <button className="book-btn" style={{ flex: 1, padding: '1.2rem' }} onClick={() => { setEditingItem(p); setShowAddModal(true); setViewingProperty(null); }}>Edit Asset</button>
                        <button className="book-btn" style={{ flex: 1, padding: '1.2rem', background: 'transparent', border: '1px solid #ddd', color: 'black' }} onClick={() => setViewingProperty(null)}>Close Analysis</button>
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const HistoryDetailModal = () => {
      if (!viewingHistoryItem) return null;
      const h = viewingHistoryItem;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '650px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Transaction <span className="highlight">Record</span></h2>
                  <X onClick={() => setViewingHistoryItem(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                  {/* Left side: Asset Review */}
                  <div>
                     <img src={h.img} style={{ width: '100%', height: '220px', borderRadius: '24px', objectFit: 'cover', marginBottom: '1.5rem', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }} alt="" />
                     <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{h.title}</h3>
                     <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--admin-text-muted)', marginBottom: '1.5rem' }}>
                        <MapPin size={16} /> {h.location}
                     </p>
                     <div style={{ background: '#fcfcfc', padding: '1.2rem', borderRadius: '15px', border: '1px solid #eee' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                           <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Final Sale Value</span>
                           <span style={{ fontWeight: 800, color: 'var(--accent-gold)' }}>{h.price}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                           <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Completion Date</span>
                           <span style={{ fontWeight: 600 }}>{h.completionDate || 'Jun 22, 2024'}</span>
                        </div>
                     </div>
                  </div>

                  {/* Right side: Property & Client details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Property Specs</h4>
                        <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Survey Number</label>
                              <p style={{ fontWeight: 600 }}>{h.surveyNumber || 'N/A'}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Physical Extent</label>
                              <p style={{ fontWeight: 600 }}>{h.extent || h.size || 'N/A'}</p>
                           </div>
                        </div>
                     </section>

                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Ownership Details</h4>
                        <div className="admin-input-group">
                           <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Transferred To</label>
                           <p style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>{h.customerName || 'Private Client'}</p>
                        </div>
                        <div className="admin-input-group" style={{ marginTop: '1rem' }}>
                           <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Transaction Status</label>
                           <span className={`hifi-badge ${h.status === 'available' ? 'badge-available' : 'badge-sold'}`} style={{ display: 'inline-block', marginTop: '5px' }}>{h.status.toUpperCase()}</span>
                        </div>
                     </section>

                     <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="book-btn" style={{ padding: '1rem' }}>Download Receipt</button>
                        <button className="book-btn" style={{ padding: '1rem', background: 'transparent', border: '1px solid #ddd', color: 'black' }} onClick={() => setViewingHistoryItem(null)}>Close Record</button>
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const VisitDetailModal = () => {
      if (!viewingVisit) return null;
      const v = viewingVisit;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '600px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Appointment <span className="highlight">Analysis</span></h2>
                  <X onClick={() => setViewingVisit(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f5f7f9', padding: '1.5rem', borderRadius: '20px' }}>
                     <div style={{ background: 'white', padding: '15px', borderRadius: '50%', color: 'var(--accent-gold)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                        <Calendar size={32} />
                     </div>
                     <div>
                        <h3 className="serif" style={{ margin: 0, fontSize: '1.5rem' }}>{v.name}</h3>
                        <span className={`hifi-badge ${v.status === 'Confirm' ? 'badge-available' : 'badge-booked'}`} style={{ marginTop: '8px', display: 'inline-block' }}>{v.status}</span>
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Schedule Details</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Date of Visit</label>
                              <p style={{ fontWeight: 700, margin: 0 }}>{v.date}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Preferred Time</label>
                              <p style={{ fontWeight: 700, margin: 0 }}>{v.time}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Location</label>
                              <p style={{ fontWeight: 600, margin: 0 }}><MapPin size={12} /> {v.location}</p>
                           </div>
                        </div>
                     </section>

                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Client Overview</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Full Name</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{v.name}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Contact Number</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{v.phone || '+91 98765 XXXXX'}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Inquiry Id</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>#VISIT-{v.id}</p>
                           </div>
                        </div>
                     </section>

                     <section style={{ gridColumn: 'span 2' }}>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Logistics Notes</h4>
                        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '12px', border: '1px solid #eee' }}>
                           <p style={{ fontSize: '0.85rem', margin: 0, fontStyle: 'italic', color: '#666' }}>
                              Pickup requested from nearest metro station. Interested in seeing corner plots specifically.
                           </p>
                        </div>
                     </section>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="book-btn" style={{ flex: 1, padding: '1rem' }} onClick={() => {
                        const updated = visits.map(visit => visit.id === v.id ? { ...visit, status: 'Confirm' } : visit);
                        setVisits(updated);
                        saveToLB('rsv_visits', updated);
                        setViewingVisit(null);
                     }}>Confirm Visit</button>
                     <button className="book-btn" style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #ddd', color: 'black' }} onClick={() => setViewingVisit(null)}>Close View</button>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const LeadDetailModal = () => {
      if (!viewingLead) return null;
      const l = viewingLead;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '600px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Lead <span className="highlight">Details</span></h2>
                  <X onClick={() => setViewingLead(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#fcfaf5', padding: '1.5rem', borderRadius: '20px' }}>
                     <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-gold)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '4px solid white' }}>
                        {l.name.charAt(0).toUpperCase()}
                     </div>
                     <div>
                        <h3 className="serif" style={{ margin: 0, fontSize: '1.5rem' }}>{l.name}</h3>
                        <span className={`hifi-badge ${l.status === 'New' ? 'badge-available' : l.status === 'Sold' ? 'badge-sold' : 'badge-booked'}`} style={{ marginTop: '8px', display: 'inline-block' }}>{l.status} Status</span>
                     </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Contact Info</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Phone Number</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{l.phone}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Email Address</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{l.email}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Residential Address</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{l.address || 'Chennai, Tamil Nadu'}</p>
                           </div>
                        </div>
                     </section>

                     <section>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Inquiry Details</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Interested Project</label>
                              <p style={{ fontWeight: 700, margin: 0, color: 'var(--accent-gold)' }}>{l.interest}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Registration Date</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{l.date}</p>
                           </div>
                           <div className="admin-input-group">
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Acquisition Source</label>
                              <p style={{ fontWeight: 600, margin: 0 }}>{l.source || 'Direct Website'}</p>
                           </div>
                        </div>
                     </section>

                     <section style={{ gridColumn: 'span 2' }}>
                        <h4 className="serif" style={{ fontSize: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Internal Notes</h4>
                        <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '12px', border: '1px solid #eee' }}>
                           <p style={{ fontSize: '0.85rem', margin: 0, fontStyle: 'italic', color: '#666' }}>{l.notes || 'No internal notes added yet.'}</p>
                        </div>
                     </section>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="book-btn" style={{ flex: 1, padding: '1rem' }} onClick={() => alert('Opening Message Thread...')}>Send Message</button>
                     <button className="book-btn" style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #ddd', color: 'black' }} onClick={() => setViewingLead(null)}>Close</button>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const SubmissionDetailModal = () => {
      if (!viewingSubmission) return null;
      const s = viewingSubmission;
      return (
         <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '800px', background: 'white' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                  <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Submission <span className="highlight">Details</span></h2>
                  <X onClick={() => setViewingSubmission(null)} style={{ cursor: 'pointer', color: '#000' }} />
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem' }}>
                  {/* Left: Image & Quick Stats */}
                  <div>
                     <img src={s.img} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1.5rem' }} alt="Land" />
                     <div style={{ background: '#f9f7f0', padding: '1.5rem', borderRadius: '16px' }}>
                        <div style={{ marginBottom: '1rem' }}>
                           <label style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>Submission Type</label>
                           <div style={{ fontWeight: 600 }}>{s.category.toUpperCase()} Plot Listing</div>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                           <label style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>Asking Price</label>
                           <div style={{ fontWeight: 600, color: 'var(--accent-gold)', fontSize: '1.2rem' }}>{s.price || s.landPrice}</div>
                        </div>
                        <div>
                           <label style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.5, textTransform: 'uppercase' }}>Submitted On</label>
                           <div style={{ fontWeight: 600 }}>{new Date(s.id).toLocaleDateString()}</div>
                        </div>
                     </div>
                  </div>

                  {/* Right: Detailed Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                     <section>
                        <h4 className="serif" style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Land Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                           <div>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Land Name</label>
                              <p style={{ fontWeight: 500 }}>{s.title}</p>
                           </div>
                           <div>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Location / City</label>
                              <p style={{ fontWeight: 500 }}>{s.location} / {s.city || 'TBD'}</p>
                           </div>
                           <div style={{ gridColumn: 'span 2' }}>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Property Address</label>
                              <p style={{ fontWeight: 500 }}>{s.propertyAddress || s.address || 'Not Provided'}</p>
                           </div>
                           <div style={{ gridColumn: 'span 2' }}>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Additional Details</label>
                              <p style={{ fontSize: '0.85rem' }}>{s.additionalInfo || s.message || 'No additional notes.'}</p>
                           </div>
                        </div>
                     </section>

                     <section>
                        <h4 className="serif" style={{ marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Owner Information</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                           <div>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Full Name</label>
                              <p style={{ fontWeight: 500 }}>{s.ownerName}</p>
                           </div>
                           <div>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Phone / Mobile</label>
                              <p style={{ fontWeight: 500 }}>{s.phone}</p>
                           </div>
                           <div style={{ gridColumn: 'span 2' }}>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Email Address</label>
                              <p style={{ fontWeight: 500 }}>{s.email}</p>
                           </div>
                           <div style={{ gridColumn: 'span 2' }}>
                              <label style={{ fontSize: '0.65rem', opacity: 0.5 }}>Owner Residents Address</label>
                              <p style={{ fontWeight: 500 }}>{s.ownerAddress || 'Not Provided'}</p>
                           </div>
                        </div>
                     </section>

                     <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button
                           className="book-btn"
                           style={{ flex: 1, padding: '1rem' }}
                           onClick={() => {
                              const updated = properties.map(item => item.id === s.id ? { ...item, status: 'available' } : item);
                              setProperties(updated);
                              localStorage.setItem('user_properties', JSON.stringify(updated));
                              setViewingSubmission(null);
                           }}
                        >Approve Listing</button>
                        <button
                           className="book-btn"
                           style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #eee', color: '#000' }}
                           onClick={() => setViewingSubmission(null)}
                        >Close Details</button>
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      );
   };

   const PropertyModal = () => (
      <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '600px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>{editingItem ? 'Edit' : 'Add New'} <span className="highlight">Plot</span></h2>
               <X onClick={() => { setShowAddModal(false); setEditingItem(null); }} style={{ cursor: 'pointer', color: '#000' }} />
            </div>
            <form onSubmit={handleAddProperty} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Land / Plot Name</label>
                  <input name="title" defaultValue={editingItem?.title} required placeholder="e.g. Royal Estate Plot 42" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Project / Location</label>
                  <select name="location" defaultValue={editingItem?.location} required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc', padding: '12px', borderRadius: '10px' }}>
                     <option value="">Select Location</option>
                     <option value="OMR, Chennai">OMR, Chennai</option>
                     <option value="ECR, Chennai">ECR, Chennai</option>
                     <option value="Tambaram, Chennai">Tambaram, Chennai</option>
                  </select>
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
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <div className="admin-input-group">
                     <label style={{ color: '#555' }}>Seller Name</label>
                     <input name="ownerName" defaultValue={editingItem?.ownerName} placeholder="Full Name" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
                  </div>
                  <div className="admin-input-group">
                     <label style={{ color: '#555' }}>Seller Phone</label>
                     <input name="phone" defaultValue={editingItem?.phone} placeholder="+91 98765 43210" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
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

   const SoldModal = () => (
      <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '600px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>{editingItem ? 'Edit' : 'Add New'} <span className="highlight">Sold Detail</span></h2>
               <X onClick={() => { setShowAddSoldModal(false); setEditingItem(null); }} style={{ cursor: 'pointer', color: '#000' }} />
            </div>
            <form onSubmit={handleAddSold} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Property / Deal Title</label>
                  <input name="title" defaultValue={editingItem?.title} required placeholder="e.g. Land in Kundrathur" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Specific Location</label>
                  <input name="location" defaultValue={editingItem?.location} required placeholder="e.g. Astalakshmi Nagar, Chennai" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="admin-input-group">
                     <label style={{ color: '#555' }}>Price / Value</label>
                     <input name="price" defaultValue={editingItem?.price} required placeholder="e.g. 75L or Market Rate" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
                  </div>
                  <div className="admin-input-group">
                     <label style={{ color: '#555' }}>Size (Sq.ft / Ground)</label>
                     <input name="sqft" defaultValue={editingItem?.sqft} required placeholder="e.g. 2400 sqft" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
                  </div>
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Property Type</label>
                  <select name="type" defaultValue={editingItem?.type || 'land'} style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc', padding: '12px', borderRadius: '10px' }}>
                     <option value="land">Land</option>
                     <option value="house">House</option>
                     <option value="flat">Flat</option>
                     <option value="commercial">Commercial</option>
                  </select>
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Represented</label>
                  <input name="represented" defaultValue={editingItem?.represented || 'Both Buyer & Sellers'} required style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Customer Name / Note</label>
                  <input name="customerName" defaultValue={editingItem?.customerName} placeholder="e.g. Jagadeesan M or Private Client" style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, padding: '1rem' }}>{editingItem ? 'Save Changes' : 'Add Sold Entry'}</button>
               </div>
            </form>
         </motion.div>
      </motion.div>
   );

   const MarkSoldModal = () => (
      <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '400px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>Confirm <span className="highlight">Sale</span></h2>
               <X onClick={() => { setShowMarkSoldModal(false); setSelectedPropForSold(null); }} style={{ cursor: 'pointer', color: '#000' }} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1.5rem' }}>
               Enter the buyer's details to mark <strong>{selectedPropForSold?.title}</strong> as sold.
            </p>
            <form onSubmit={handleMarkAsSold} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="admin-input-group">
                  <label style={{ color: '#555' }}>Buyer Name</label>
                  <input name="buyerName" required placeholder="e.g. Rajesh Kumar" autoFocus style={{ border: '1px solid #ddd', color: '#333', background: '#fcfcfc' }} />
               </div>
               <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="book-btn" style={{ flex: 1, padding: '1rem' }}>Mark as Sold</button>
               </div>
            </form>
         </motion.div>
      </motion.div>
   );

   const AddProjectModal = () => (
      <motion.div className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
         <motion.div className="admin-modal" initial={{ y: 20 }} animate={{ y: 0 }} style={{ maxWidth: '500px', background: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
               <h2 className="serif" style={{ color: 'var(--admin-text-main)' }}>New <span className="highlight">Project</span></h2>
               <X onClick={() => setShowAddProjectModal(false)} style={{ cursor: 'pointer', color: '#000' }} />
            </div>
            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="admin-input-group">
                  <label>Project Name</label>
                  <input name="name" required placeholder="e.g. Royal Estate" style={{ border: '1px solid #ddd', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label>Location</label>
                  <input name="location" required placeholder="e.g. OMR, Chennai" style={{ border: '1px solid #ddd', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label>Units Commercialized (Sold/Total)</label>
                  <input name="units" required placeholder="e.g. 0/60" style={{ border: '1px solid #ddd', background: '#fcfcfc' }} />
               </div>
               <div className="admin-input-group">
                  <label>Status</label>
                  <select name="status" style={{ border: '1px solid #ddd', background: '#fcfcfc' }}>
                     <option value="Active">Active</option>
                     <option value="Limited">Limited</option>
                     <option value="Sold Out">Sold Out</option>
                  </select>
               </div>
               <button type="submit" className="book-btn" style={{ padding: '1rem' }}>Create Project</button>
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
                  {['Plots', 'Projects', 'Leads', 'History'].includes(activeTab) && (
                     <div className="search-box-v2">
                        <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                        <input
                           type="text"
                           placeholder="Search plots, projects, leads..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                     </div>
                  )}

                  <div
                     style={{ position: 'relative' }}
                  >
                     <div
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.8)', border: '1px solid #eee' }}
                     >
                        <Bell size={20} style={{ opacity: 0.7 }} />
                        {properties.filter(p => p.status === 'pending').length > 0 && (
                           <span style={{ position: 'absolute', top: '5px', right: '5px', background: '#e74c3c', color: 'white', fontSize: '9px', fontWeight: 700, padding: '2px 4px', minWidth: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid white' }}>
                              {properties.filter(p => p.status === 'pending').length}
                           </span>
                        )}
                     </div>
                     {showNotifications && <NotificationsDropdown />}
                  </div>

                  <div style={{ padding: '8px 12px', background: 'white', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid #eee' }}>
                     ADMIN
                  </div>
               </div>
            </header>

            {renderTabContent()}
         </main>

         <AnimatePresence>
            {showAddModal && <PropertyModal />}
            {showAddSoldModal && <SoldModal />}
            {showMarkSoldModal && <MarkSoldModal />}
            {showAddProjectModal && <AddProjectModal />}
            {showChangePasswordModal && <ChangePasswordModal />}
            {viewingSubmission && <SubmissionDetailModal />}
            {viewingProject && <ProjectDetailModal />}
            {viewingLead && <LeadDetailModal />}
            {viewingVisit && <VisitDetailModal />}
            {viewingHistoryItem && <HistoryDetailModal />}
            {viewingProperty && <PropertyDetailModal />}
            {viewingSoldItem && <SoldDetailModal />}
         </AnimatePresence>
      </div>
   );
};

export default AdminDashboard;
