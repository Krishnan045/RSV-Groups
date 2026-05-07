import React, { useState } from 'react';
import { X } from 'lucide-react';

const SellPage = ({ category = '' }) => {
  const [formData, setFormData] = useState({
    propertyName: '',
    propertyCategory: '',
    location: '',
    propertyType: '',
    price: '',
    additionalInfo: '',
    ownerName: '',
    propertyAddress: '',
    ownerAddress: '',
    phone: '',
    mobile: '',
    email: '',
    memberType: 'new',
    image: null
  });

  const [amenities, setAmenities] = useState({
    balconies: false, lift: false, parking: false, security: false, clubHouse: false, swimmingPool: false, garden: false, gym: false, playGround: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileObjects, setFileObjects] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setAmenities({ ...amenities, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure accurate Land resolution prioritizing navbar category or plotted dropdown
    let resolvedType = 'land';
    if (category) resolvedType = category;
    else if (formData.propertyType === 'plot') resolvedType = 'land';
    else if (formData.propertyCategory) resolvedType = formData.propertyCategory;

    const processSubmission = (base64Img) => {
      const newProperty = {
        title: formData.propertyName || 'Elite Listing',
        location: formData.location || 'Chennai',
        price: formData.price || 'Contact for Price',
        type: resolvedType,
        category: 'buy',
        img: base64Img || 'https://images.unsplash.com/photo-1629851605336-f3ccb0eceb9e?q=80&w=2074&auto=format&fit=crop',
        ownerName: formData.ownerName || 'Verified Owner',
        phone: formData.phone || formData.mobile || '+91 9988776655',
        email: formData.email,
        propertyAddress: formData.propertyAddress,
        ownerAddress: formData.ownerAddress,
        additionalInfo: formData.additionalInfo,
        sqft: "As per Document",
        status: 'pending',
        id: Date.now()
      };

      const existingProps = JSON.parse(localStorage.getItem('user_properties') || '[]');
      localStorage.setItem('user_properties', JSON.stringify([newProperty, ...existingProps]));

      setShowSuccess(true);
    };

    if (fileObjects.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => processSubmission(reader.result);
      reader.readAsDataURL(fileObjects[0]);
    } else {
      processSubmission(null);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFileObjects(prev => [...prev, ...files]);
    setSelectedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  const removeFile = (index) => {
    setFileObjects(prev => prev.filter((_, i) => i !== index));
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };


  const labelStyle = { fontWeight: 'bold', fontSize: '0.85rem', color: '#333', paddingBottom: '4px' };
  const inputStyle = { width: '100%', padding: '8px', border: '1px solid #aaa', borderRadius: '3px', fontSize: '0.85rem', outline: 'none' };
  const sectionHeaderStyle = { fontSize: '1.2rem', color: '#444', borderBottom: '1px solid #eee', paddingBottom: '0.4rem', marginBottom: '1rem', marginTop: '2rem', fontWeight: 400 };
  const reqStyle = { color: 'red', fontWeight: 'bold' };

  const amenitiesList = [
    { key: 'balconies', label: 'Balconies', icon: '🏢' },
    { key: 'lift', label: 'Lift', icon: '🛗' },
    { key: 'parking', label: 'Parking', icon: '🚗' },
    { key: 'security', label: 'Security', icon: '💂' },
    { key: 'clubHouse', label: 'Club House', icon: '🏘️' },
    { key: 'swimmingPool', label: 'Swimming Pool', icon: '🏊' },
    { key: 'garden', label: 'Garden', icon: '🌲' },
    { key: 'gym', label: 'Gym', icon: '🏋️' },
    { key: 'playGround', label: 'Play ground', icon: '🎢' }
  ];

  const getListingTitle = () => {
    if (category === 'residential') return 'Residential Form';
    if (category === 'commercial') return 'Commercial Form';
    if (category === 'land') return 'Land Form';
    return 'Property Form';
  };

  return (
    <div className="page-container" style={{ background: '#f9f9f9', minHeight: '100vh', padding: '8rem 1rem 3rem 1rem', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Success Popup Modal */}
      {showSuccess && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ color: '#288849', marginBottom: '1rem' }}>Successfully Subimtted!</h2>
            <p style={{ color: '#555', marginBottom: '2rem' }}>Your land details have been submitted and are pending admin approval. They will appear on the Buy page once approved.</p>
            <button 
              onClick={() => {
                setShowSuccess(false);
                window.location.reload();
              }} 
              style={{ background: '#288849', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Form Title */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#288849', fontSize: '2.2rem', margin: 0, textTransform: 'capitalize' }}>{getListingTitle()}</h1>
        <p style={{ color: '#666', marginTop: '10px' }}>Please provide the detailed information below to submit your {getListingTitle().toLowerCase()}.</p>
      </div>

      {/* Added Details: Value Proposition Panel */}
      <div style={{ maxWidth: '900px', margin: '0 auto 1.5rem auto', background: '#e8f5e9', border: '1px solid #c8e6c9', padding: '1.2rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', fontSize: '0.9rem' }}>
         <span style={{ color: '#2e7d32', fontWeight: 600 }}>💎 Premium Buyer Network</span>
         <span style={{ color: '#2e7d32', fontWeight: 600 }}>📈 Maximized Property Value</span>
         <span style={{ color: '#2e7d32', fontWeight: 600 }}>⏱️ Fast & Secure Closing</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', border: '1px solid #e0e0e0', padding: '1.5rem', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
        
        <form onSubmit={handleSubmit}>
          {/* Property Details */}
          <h2 style={{ ...sectionHeaderStyle, marginTop: 0 }}>Property Details</h2>
          <div className="responsive-form-grid">
            
            <div style={labelStyle}>Land / Plot Name <span style={reqStyle}>*</span></div>
            <div><input type="text" name="propertyName" placeholder="e.g. Royal Estate Plot 42" value={formData.propertyName} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '250px' }} /></div>

            <div style={labelStyle}>Residential / Commercial <span style={reqStyle}>*</span></div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '6px', fontSize: '0.85rem' }}>
              <label><input type="radio" name="propertyCategory" value="residential" onChange={handleInputChange} /> Residential</label>
              <label><input type="radio" name="propertyCategory" value="commercial" onChange={handleInputChange} /> Commercial</label>
            </div>

            <div style={labelStyle}>Location <span style={reqStyle}>*</span></div>
            <div>
              <select name="location" value={formData.location} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} >
                <option value="">-- Choose Property Area --</option>
                <option value="omr">OMR</option>
                <option value="ecr">ECR</option>
                <option value="guindy">Guindy</option>
              </select>
            </div>

            <div style={labelStyle}>Property Type <span style={reqStyle}>*</span></div>
            <div>
              <select name="propertyType" value={formData.propertyType} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} >
                <option value="">-- Choose Property Type --</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot/Land</option>
              </select>
            </div>

            <div style={labelStyle}>Expected Price <span style={reqStyle}>*</span></div>
            <div><input type="text" name="price" placeholder="e.g. 50 Lacs, 1.5 Cr" value={formData.price} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} /></div>

            <div style={labelStyle}>Property Additional Information</div>
            <div><textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} rows="4" placeholder="About Property" style={{ ...inputStyle, maxWidth: '350px', resize: 'vertical' }}></textarea></div>

            <div style={labelStyle}>Property Image <span style={reqStyle}>*</span></div>
            <div>
              <div style={{ ...inputStyle, padding: '1.5rem', border: '2px dashed #ccc', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Click to upload property images'}
                </span>
              </div>
              {selectedFiles.length > 0 && (
                <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {selectedFiles.map((name, i) => (
                    <span key={i} style={{ background: '#f0f0f0', padding: '4px 10px', borderRadius: '3px', fontSize: '0.75rem', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {name}
                      <X size={12} style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => removeFile(i)} />
                    </span>
                  ))}
                </div>
              )}
              <div style={{ color: '#d32f2f', fontSize: '0.75rem', marginTop: '4px' }}>Image size should be lesser than 5 MB</div>
            </div>
          </div>

          {/* Amenities Details */}
          <h2 style={sectionHeaderStyle}>Amenities Details</h2>
          <div className="amenities-checkbox-grid">
            {amenitiesList.map((item) => (
              <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <div style={{ fontSize: '1.2rem', width: '24px', textAlign: 'center' }}>{item.icon}</div>
                <input type="checkbox" name={item.key} checked={amenities[item.key]} onChange={handleAmenityChange} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          {/* Private Contact Details */}
          <h2 style={sectionHeaderStyle}>Private Contact Details</h2>
          <div className="responsive-form-grid">
            <div style={labelStyle}>Property Owner Name <span style={reqStyle}>*</span></div>
            <div><input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} /></div>

            <div style={labelStyle}>Property Address <span style={reqStyle}>*</span></div>
            <div><textarea name="propertyAddress" placeholder="Property Address" value={formData.propertyAddress} onChange={handleInputChange} rows="3" style={{ ...inputStyle, maxWidth: '350px' }} ></textarea></div>

            <div style={labelStyle}>Owner Address <span style={reqStyle}>*</span></div>
            <div><textarea name="ownerAddress" placeholder="Owner Address" value={formData.ownerAddress} onChange={handleInputChange} rows="3" style={{ ...inputStyle, maxWidth: '350px' }} ></textarea></div>

            <div style={labelStyle}>Phone No</div>
            <div><input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} /></div>

            <div style={labelStyle}>Mobile No</div>
            <div><input type="tel" name="mobile" placeholder="Mobile No" value={formData.mobile} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} /></div>

            <div style={labelStyle}>Email <span style={reqStyle}>*</span></div>
            <div><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={{ ...inputStyle, maxWidth: '350px' }} /></div>
          </div>

          {/* Member Details */}
          <h2 style={sectionHeaderStyle}>Member Details</h2>
          <div className="responsive-form-grid">
            <div style={labelStyle}>Member Type</div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem' }}>
              <label><input type="radio" name="memberType" value="new" checked={formData.memberType === 'new'} onChange={handleInputChange} /> New</label>
              <label style={{ fontWeight: 'bold' }}><input type="radio" name="memberType" value="existing" checked={formData.memberType === 'existing'} onChange={handleInputChange} /> Existing</label>
            </div>

            <div></div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
              <button type="submit" style={{ background: '#288849', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Post Property</button>
              <button type="button" onClick={() => window.location.reload()} style={{ background: '#288849', color: 'white', border: 'none', padding: '6px 16px', borderRadius: '3px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>Cancel</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SellPage;
