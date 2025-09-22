import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import cavill9 from '../../assets/cavill9.jpeg';

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
  background: rgba(31, 41, 55, 0.8);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #f59e0b;
  margin: 1rem 0;
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
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
  }
  
  &:disabled {
    background: #6b7280;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
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
  background: #1f2937;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  
  form {
    display: ${props => props.showPayment ? 'none' : 'block'};
  }
  
  .payment-methods {
    display: ${props => props.showPayment ? 'block' : 'none'};
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
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #e5e7eb;
  }
  
  input, select {
    width: 100%;
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid #4b5563;
    background: #374151;
    color: #f3f4f6;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #f59e0b;
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
    }
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
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
      availableWorldwide: false,
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
    'Africa',
    'Antarctica',
    'Asia',
    'Europe',
    'North America',
    'Oceania',
    'South America'
  ];

  return (
    <FanContainer>
      <HeroImage>
        <HeroTitle>Join the Fan Club</HeroTitle>
      </HeroImage>
      
      <div className="content-wrapper">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem', fontWeight: '800' }}>Choose Your Membership</h2>
        
        <PricingGrid>
          {plans.map((plan) => (
            <PricingCard key={plan.id}>
              <CardTitle>{plan.title}</CardTitle>
              <Price>${plan.price}</Price>
              <BenefitsList>
                {plan.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </BenefitsList>
              <JoinButton 
                onClick={() => handleJoinClick(plan)}
                disabled={!plan.availableWorldwide}
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