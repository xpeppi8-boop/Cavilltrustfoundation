import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import cavill9 from '../../assets/cavill9.jpg';
import SlidingBanner from '../Animations/SlidingBanner';

const FanContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  max-width: 100%;
  margin: 0;
  padding: 0;
  color: #e5e7eb;
  
  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
`;

const HeroImage = styled.div`
  width: 100vw;
  height: auto;
  max-height: 70vh;
  margin-left: 50%;
  transform: translateX(-50%);
  background-image: url(${cavill9});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: white;
  font-size: 3rem;
  z-index: 2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const PricingCard = styled.div`
  background: linear-gradient(145deg, rgba(31, 41, 55, 0.9), rgba(17, 24, 39, 0.9));
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f59e0b, #f97316);
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    border-color: rgba(245, 158, 11, 0.3);
  }
  
  ${props => props.isPremium && `
    border: 2px solid #f59e0b;
    box-shadow: 0 0 25px rgba(245, 158, 11, 0.3);
    
    &::before {
      height: 6px;
      background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
      background-size: 200% auto;
      animation: shine 2s linear infinite;
    }
    
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
  `}
`;

const Price = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #f59e0b, #fbbf24);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 1.5rem 0;
  position: relative;
  display: inline-block;
  
  &::before {
    content: '$';
    font-size: 1.5rem;
    position: absolute;
    left: -1.2rem;
    top: 0.5rem;
    background: linear-gradient(45deg, #f59e0b, #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
    border-radius: 3px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #f3f4f6;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  text-align: left;
  
  li {
    margin: 0.8rem 0;
    display: flex;
    align-items: center;
    
    &::before {
      content: '✓';
      color: #10b981;
      margin-right: 0.8rem;
      font-weight: bold;
    }
  }
`;

const JoinButton = styled.button`
  background: linear-gradient(45deg, #f59e0b, #f97316);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 1.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(45deg, #f97316, #f59e0b);
    transition: all 0.4s ease;
    z-index: -1;
    opacity: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(245, 158, 11, 0.5);
    
    &::before {
      width: 100%;
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.5);
  }
  
  &:disabled {
    background: #4b5563;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    color: #9ca3af;
    
    &::before {
      display: none;
    }
  }
  
  ${props => props.isPremium && `
    background: linear-gradient(45deg, #f59e0b, #fbbf24);
    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
    
    &::after {
      content: '⭐';
      margin-left: 8px;
      display: inline-block;
      animation: bounce 2s infinite;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #1f2937, #111827);
  padding: 2.5rem;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f59e0b, #f97316);
    border-radius: 4px 4px 0 0;
  }
  
  form {
    display: ${props => props.showPayment ? 'none' : 'block'};
    animation: fadeIn 0.4s ease-out;
  }
  
  .payment-methods {
    display: ${props => props.showPayment ? 'block' : 'none'};
    animation: fadeIn 0.4s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  h2 {
    color: #f3f4f6;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;
    padding-bottom: 1rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #f97316);
      border-radius: 3px;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.5rem;
  cursor: pointer;
  
  &:hover {
    color: #f3f4f6;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.8rem;
  position: relative;
  
  label {
    display: block;
    margin-bottom: 0.6rem;
    color: #e5e7eb;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s ease;
  }
  
  input, select {
    width: 100%;
    padding: 1rem 1.2rem;
    border-radius: 8px;
    border: 1px solid #4b5563;
    background: rgba(31, 41, 55, 0.7);
    color: #f3f4f6;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    appearance: none;
    
    &::placeholder {
      color: #9ca3af;
      opacity: 0.7;
    }
    
    &:focus {
      outline: none;
      border-color: #f59e0b;
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
      background: rgba(31, 41, 55, 0.9);
    }
    
    &:disabled {
      background: rgba(31, 41, 55, 0.4);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
  
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%239ca3af' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 12px;
    padding-right: 2.5rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(45deg, #059669, #10b981);
    transition: all 0.4s ease;
    z-index: -1;
    opacity: 0;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
    
    &::before {
      width: 100%;
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  }
  
  &:disabled {
    background: #4b5563;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    color: #9ca3af;
    
    &::before {
      display: none;
    }
  }
`;

const CopyBtn = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #e5e7eb;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Fan = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [donorEmail, setDonorEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    continent: '',
  });
  const navigate = useNavigate();

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      alert('Copied to clipboard');
    } catch (e) {
      alert('Unable to copy');
    }
  };

  const plans = [
    {
      id: 'fan',
      title: 'Fan Membership',
      price: 200,
      benefits: [
        'Exclusive fan badge',
        'Access to members-only content',
        'Monthly newsletter',
        'Early access to merchandise',
        'Exclusive wallpapers',
      ],
      availableWorldwide: true,
    },
    {
      id: 'super-fan',
      title: 'Super Fan',
      price: 500,
      benefits: [
        'All Fan benefits',
        'Signed photo',
        'Behind-the-scenes content',
        'Exclusive Q&A sessions',
        'Digital autograph',
      ],
      availableWorldwide: true,
    },
    {
      id: 'vip',
      title: 'VIP Experience',
      price: 1000,
      benefits: [
        'All Super Fan benefits',
        'Meet & Greet opportunity',
        'Personalized video message',
        'Exclusive merchandise package',
        'Priority event access',
      ],
      availableWorldwide: true, // Changed to true to enable modal for all plans
    },
  ];

  const handleJoinClick = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDonorEmail(formData.email);
    setShowPaymentMethods(true);
  };

  const handlePaymentComplete = () => {
    setDonationComplete(true);
    setShowPaymentMethods(false);
    
    // Reset form after a delay to show the success message
    setTimeout(() => {
      setShowModal(false);
      setFormData({
        name: '',
        email: '',
        location: '',
        continent: '',
      });
      setDonationComplete(false);
      setShowPaymentMethods(false);
    }, 3000);
  };

  const continents = [
    'North America',
    'South America',
    'Asia',
    'Europe'
  ];

  return (
    <FanContainer>
      <SlidingBanner />
      <HeroImage>
        <HeroTitle>Join the Fan Club</HeroTitle>
      </HeroImage>
      
      <div className="content-wrapper">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '800' }}>Choose Your Membership</h2>
        
        <PricingGrid>
          {plans.map((plan) => (
            <PricingCard key={plan.id} isPremium={plan.price === 1000}>
              <CardTitle>{plan.title}</CardTitle>
              <Price>{plan.price}</Price>
              <BenefitsList>
                {plan.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '20px',
                        height: '20px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '50%',
                        marginRight: '10px',
                        color: '#10b981',
                        fontSize: '12px',
                        flexShrink: 0
                      }}>
                        ✓
                      </span>
                      {benefit}
                    </span>
                  </li>
                ))}
              </BenefitsList>
              <JoinButton 
                onClick={() => handleJoinClick(plan)}
                disabled={!plan.availableWorldwide}
                isPremium={plan.price === 1000}
              >
                {plan.availableWorldwide ? 'Join Now' : 'Contact for Availability'}
              </JoinButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </div>

      {showModal && selectedPlan && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent 
            onClick={e => e.stopPropagation()}
            showPayment={showPaymentMethods}
          >
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <h2 style={{ marginBottom: '1.5rem', color: '#f3f4f6' }}>
              {donationComplete ? 'Thank You!' : showPaymentMethods ? 'Complete Payment' : `Join ${selectedPlan.title}`}
            </h2>
            {donationComplete && (
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#10b981' }}>✓</div>
                <p style={{ color: '#e5e7eb', marginBottom: '1.5rem' }}>
                  Thank you for your payment! A confirmation email will be sent to {donorEmail || 'your email'}.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={showPaymentMethods}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={showPaymentMethods}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="location">Location (City, Country)</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={showPaymentMethods}
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="continent">Continent</label>
                <select
                  id="continent"
                  name="continent"
                  value={formData.continent}
                  onChange={handleInputChange}
                  required
                  disabled={showPaymentMethods}
                >
                  <option value="">Select your continent</option>
                  {continents.map(continent => (
                    <option key={continent} value={continent}>
                      {continent}
                    </option>
                  ))}
                </select>
              </FormGroup>
              
              <SubmitButton type={showPaymentMethods ? "button" : "submit"} onClick={showPaymentMethods ? handlePaymentComplete : null}>
                {showPaymentMethods ? 'I Have Paid' : 'Submit Application'}
              </SubmitButton>
            </form>
            
            <div className="payment-methods">
              <p style={{ color: '#e5e7eb', marginBottom: '1.5rem' }}>Please complete your payment using one of the methods below:</p>
              
              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="iconBox" aria-hidden="true"><i className="fas fa-gift"></i></div>
                  <span className="label" style={{ fontWeight: 500 }}>Pay with Gift Card</span>
                </div>
                <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all', display: 'block', marginBottom: '8px' }}>cavilltrustfoundation@gmail.com</code>
                <CopyBtn onClick={() => copyToClipboard('cavilltrustfoundation@gmail.com')}>Copy</CopyBtn>
              </div>

              <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="iconBox" aria-hidden="true"><i className="fas fa-coins"></i></div>
                  <span className="label" style={{ fontWeight: 500 }}>Pay with Cryptocurrency</span>
                </div>
                <small style={{ color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>USDT (TRC20)</small>
                <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all', display: 'block', marginBottom: '8px' }}>TA4qRNXqqb31erxZZVHf574iA1Qm4JNMyV</code>
                <CopyBtn onClick={() => copyToClipboard('TA4qRNXqqb31erxZZVHf574iA1Qm4JNMyV')}>Copy</CopyBtn>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="iconBox" aria-hidden="true"><i className="fab fa-bitcoin"></i></div>
                  <span className="label" style={{ fontWeight: 500 }}>Pay with Cryptocurrency</span>
                </div>
                <small style={{ color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Bitcoin (BTC)</small>
                <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all', display: 'block', marginBottom: '8px' }}>bc1qxp4x04tvglmcjx6ct8q7tjgjk5497eacvlxg68</code>
                <CopyBtn onClick={() => copyToClipboard('bc1qxp4x04tvglmcjx6ct8q7tjgjk5497eacvlxg68')}>Copy</CopyBtn>
              </div>

              {/* Email input for receipt */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="receipt-email" style={{ display: 'block', marginBottom: '0.5rem', color: '#e5e7eb' }}>Email for receipt (optional)</label>
                <input 
                  type="email" 
                  id="receipt-email" 
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(0,0,0,0.2)',
                    color: '#e5e7eb',
                    fontSize: '1rem'
                  }}
                  placeholder="enter your email"
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                <button 
                  type="button" 
                  onClick={() => setShowPaymentMethods(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.1)',
                    color: '#e5e7eb',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    flex: 1
                  }}
                >
                  Back to Form
                </button>
                <button 
                  type="button" 
                  onClick={handlePaymentComplete}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    flex: 1
                  }}
                >
                  I Have Paid
                </button>
              </div>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </FanContainer>
  );
};

export default Fan;