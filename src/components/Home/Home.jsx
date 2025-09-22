import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import SlidingBanner from '../Animations/SlidingBanner';
import ImageCarousel from '../Carousel/ImageCarousel';
import durrellLogo from '../../assets/durell.png';
import royalLogo from '../../assets/royal.png';
import dcLogo from '../../assets/dc.png';
import cavill1 from '../../assets/cavill1.jpg';
import cavill2 from '../../assets/cavill2.jpg';
import cavill3 from '../../assets/cavill3.jpg';
import cavill5 from '../../assets/cavill5.jpg';
import fan1 from '../../assets/fan4.jpg';
import fan2 from '../../assets/fan5.jpg';

// Load font-awesome for icons
const loadFontAwesome = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  return null;
};

const HomeContainer = styled.div`
  font-family: 'Poppins', sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

// Inline donation helpers
const CopyBtn = styled.button`
  background: rgba(255,255,255,0.08);
  color: #e5e7eb;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.1s ease, filter 0.15s ease, background 0.15s ease;
  align-self: flex-end;

  &:hover { filter: brightness(1.05); background: rgba(255,255,255,0.12); }
  &:active { transform: scale(0.98); }
`;

// Confirm button will be defined after DonateButton to avoid TDZ issues

// Support section styles
const SupportSection = styled.section`
  position: relative;
  background-image: url(${cavill5});
  background-size: cover;
  background-position: center;
  border: 1px solid #f1e9d6;
  border-radius: 16px;
  padding: 24px;
  margin: 10px 0 50px;
  box-shadow: 0 10px 22px rgba(184, 134, 11, 0.08);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25));
    z-index: 0;
    border-radius: 16px;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  .lead {
    color: #f3f4f6;
    font-size: 1.02rem;
    line-height: 1.7;
    margin-bottom: 18px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.35);
  }
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 12px;

  .stat {
    position: relative;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 14px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 6px 18px rgba(0, 0, 0, 0.18);
    color: #f3f4f6;

    @supports (backdrop-filter: blur(6px)) {
      backdrop-filter: blur(6px);
    }
  }

  .left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .iconBox {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fffbeb;
    background: linear-gradient(135deg, rgba(212,175,55,0.35), rgba(184,134,11,0.25));
    box-shadow: inset 0 1px 2px rgba(255,255,255,0.2);
  }

  .label {
    color: #e5e7eb;
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .value {
    color: #fde68a; /* soft gold */
    font-weight: 900;
    font-size: 1.05rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    .stat {
      padding: 12px;
    }
  }
`;

const Progress = styled.div`
  margin: 8px 0 16px;

  .track {
    width: 100%;
    height: 12px;
    background: #f3f4f6;
    border-radius: 9999px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }
  .fill {
    height: 100%;
    width: ${props => props.percent || 0}%;
    background: linear-gradient(90deg, #a97123, #b8860b, #d4af37);
    border-radius: 9999px;
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.35) inset;
    transition: width 0.6s ease;
  }
  .caption {
    margin-top: 6px;
    font-size: 0.92rem;
    color: #6b7280;
  }
`;

const DonateButton = styled.button`
  margin: 10px 0 0 auto;
  background: linear-gradient(135deg, #7b5a3a, #b8860b 60%, #d4af37);
  color: #fff;
  border: none;
  border-radius: 9999px;
  padding: 12px 22px;
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  box-shadow: 0 8px 18px rgba(184, 134, 11, 0.25);
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(184, 134, 11, 0.28);
    filter: brightness(1.03);
  }
  &:active {
    transform: translateY(0);
  }
`;

// Define confirm button after DonateButton to avoid TDZ issues
const ConfirmBtn = styled(DonateButton)`
  margin: 6px 0 0 auto;
  padding: 10px 18px;
  background: linear-gradient(135deg, #7b5a3a, #b8860b 60%, #d4af37);
  box-shadow: 0 8px 18px rgba(184, 134, 11, 0.25);
`;

// Email input styled to harmonize with .stat cards
const EmailInput = styled.input`
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  color: #e5e7eb;
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  font-size: 0.95rem;

  &::placeholder { color: #ffffff; opacity: 0.9; }
`;

const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 28px 0 48px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ReasonCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px 16px;
  box-shadow: 0 6px 14px rgba(30, 58, 138, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(30, 58, 138, 0.12);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1e3a8a;
    background: #eef2ff; /* fallback; overridden inline per item */
  }

  .title {
    color: #1e3a8a;
    font-weight: 700;
    font-size: 1.06rem;
  }

  .desc {
    color: #4b5563;
    font-size: 0.98rem;
    line-height: 1.6;
  }
`;

const reasons = [
  {
    title: 'Founded on Integrity',
    desc:
      "The Henry Cavill Foundation is built on values of honesty, responsibility, and compassion — the same principles Henry has demonstrated throughout his career and personal life.",
    icon: 'fa-shield-alt',
    color: '#1e3a8a',
  },
  {
    title: 'Personal Commitment',
    desc:
      "Henry’s philanthropy is not just financial — he actively participates in fundraising events, fitness challenges, and awareness campaigns. Your support goes hand-in-hand with his personal dedication.",
    icon: 'fa-hand-holding-heart',
    color: '#0ea5e9',
  },
  {
    title: 'Supporting Heroes and Wildlife',
    desc:
      "From aiding military veterans and their families through the Royal Marines Charity, to protecting endangered species with the Durrell Wildlife Conservation Trust, every contribution makes a lasting impact on both people and the planet.",
    icon: 'fa-paw',
    color: '#16a34a',
  },
  {
    title: 'Global Awareness, Local Impact',
    desc:
      "With a global fanbase and trusted partnerships, the Foundation raises awareness on an international stage while funding projects that deliver real, measurable change in communities.",
    icon: 'fa-globe',
    color: '#f59e0b',
  },
  {
    title: 'Transparency You Can Trust',
    desc:
      "Every donation is handled with care and accountability. We believe in showing you where your support goes and how it transforms lives.",
    icon: 'fa-scale-balanced',
    color: '#8b5cf6',
  },
  {
    title: 'Inspired by Passion, Driven by Action',
    desc:
      "This is more than a name on a charity — it’s a movement inspired by Henry’s passion for service, conservation, and community. Together, we can build a brighter future.",
    icon: 'fa-fire',
    color: '#ef4444',
  },
];

const SectionHeading = styled.h2`
  text-align: center;
  color: #1e3a8a;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 30px 0 15px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  flex: 1;
`;

// Footer styles
const Footer = styled.footer`
  background: #0f1724;
  color: #e5e7eb;
  margin-top: 40px;
  border-top: 1px solid rgba(255,255,255,0.08);
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 20px 16px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h4 {
    font-size: 1.05rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 10px;
  }
  p, a, li {
    color: #cbd5e1;
    font-size: 0.95rem;
    line-height: 1.6;
  }
  ul { list-style: none; padding: 0; }
  a { text-decoration: none; }
  a:hover { color: #f3f4f6; }
`;

const SponsorsSection = styled.div`
  padding: 30px 0;
  margin: 10px 0;
  text-align: center;
  
  h3 {
    color: #ffffff;
    font-size: 1.4rem;
    margin-bottom: 25px;
    font-weight: 600;
  }
  
  .sponsors-grid {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
      gap: 30px;
    }
    
    @media (max-width: 480px) {
      gap: 20px;
    }
    
    img {
      height: 50px;
      max-width: 120px;
      width: auto;
      object-fit: contain;
      opacity: 0.8;
      transition: opacity 0.3s ease, transform 0.3s ease;
      
      &:hover {
        opacity: 1;
        transform: translateY(-2px);
      }
      
      @media (max-width: 768px) {
        height: 40px;
        max-width: 100px;
      }
      
      @media (max-width: 480px) {
        height: 35px;
        max-width: 80px;
      }
    }
  }
`;

const FooterBottom = styled.div`
  margin-top: 18px;
  padding: 12px 0 16px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.92rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
`;

const WelcomeSection = styled.section`
  text-align: center;
  margin: 40px 0;
  padding: 100px 20px;
  background-image: url(${cavill1});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    z-index: 1;
  }
  
  > * {
    position: relative;
    z-index: 2;
  }
  
  h1 {
    color: #ffffff;
    font-size: 2.8rem;
    margin-bottom: 20px;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
    }
  }
  
  p {
    color: #ffffff;
    font-size: 1.25rem;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 30px;
    font-weight: 400;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
      padding: 0 15px;
    }
  }
`;

const FanClubCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
  
  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
    margin: 0 0 10px 0;
  }
  
  .card-text {
    color: #4b5563;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
  }
  
  .card-button {
    display: inline-block;
    background: #1e3a8a;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-align: center;
    font-weight: 600;
    text-decoration: none;
    transition: background-color 0.2s ease;
    
    &:hover {
      background: #1e40af;
      color: white;
    }
  }
`;

const FanClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 30px 0 60px;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Home = () => {
  // Load Font Awesome
  loadFontAwesome();
  const navigate = useNavigate();
  const [showDonateDetails, setShowDonateDetails] = useState(false);
  const [donorEmail, setDonorEmail] = useState('');
  const [donationComplete, setDonationComplete] = useState(false);
  
  const handleJoinNow = () => {
    navigate('/fan');
  };

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
  
  return (
    <HomeContainer>
      <SlidingBanner />
      
      <ContentWrapper>
        <WelcomeSection>
          <h1>Welcome to Henry Cavill Foundation</h1>
          <p>
            Join us in supporting Henry Cavill's creative vision and be part of an exclusive community 
            of fans who appreciate fine storytelling and artistic excellence.
          </p>
        </WelcomeSection>
        <SectionHeading>Why support the Cavill Trust Foundation?</SectionHeading>
        
        <ImageCarousel />

        <ReasonsGrid>
          {reasons.map((item) => (
            <ReasonCard key={item.title}>
              <div className="header">
                <div
                  className="icon"
                  style={{
                    background: `${item.color}1a`, /* ~10% opacity background */
                    color: item.color,
                  }}
                  aria-hidden="true"
                >
                  <i className={`fas ${item.icon}`} aria-hidden="true"></i>
                </div>
                <div className="title">{item.title}</div>
              </div>
              <div className="desc">{item.desc}</div>
            </ReasonCard>
          ))}
        </ReasonsGrid>

        <SectionHeading>Support the Foundation</SectionHeading>
        {(() => {
          const goal = 30000;
          const raised = 14760;
          const percent = Math.min(100, Math.round((raised / goal) * 100));
          return (
            <><SupportSection aria-label="Support the Foundation section">
              {!showDonateDetails ? (
                <>
                  <p className="lead">
                    Together we are building a community that turns compassion into impact. Your donation helps fund veteran support, wildlife conservation, and grassroots initiatives that change lives. Every contribution moves us closer to our goal.
                  </p>

                  <StatsRow>
                    <div className="stat" aria-label="Annual target amount">
                      <div className="left">
                        <div className="iconBox" aria-hidden="true">
                          <i className="fas fa-bullseye"></i>
                        </div>
                        <span className="label">Annual target</span>
                      </div>
                      <span className="value">$30,000</span>
                    </div>
                    <div className="stat" aria-label="Raised amount">
                      <div className="left">
                        <div className="iconBox" aria-hidden="true">
                          <i className="fas fa-hand-holding-dollar"></i>
                        </div>
                        <span className="label">Raised so far</span>
                      </div>
                      <span className="value">$14,760</span>
                    </div>
                  </StatsRow>

                  <Progress percent={percent}>
                    <div className="track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent} aria-label={`Campaign progress ${percent}%`}>
                      <div className="fill" />
                    </div>
                  </Progress>

                  <p className="lead" style={{ fontStyle: 'italic' }}>
                    “When we come together, small acts become powerful change. If Henry’s work has inspired you, this is your chance to inspire others.”
                  </p>

                  <DonateButton type="button" aria-label="Donate to the foundation" onClick={() => setShowDonateDetails(true)}>
                    Donate Now
                  </DonateButton>
                </>
              ) : (
                <>
                  {!donationComplete ? (
                    <>
                      <StatsRow>
                        <div className="stat" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                          <div className="left" style={{ alignItems: 'center', gap: 10 }}>
                            <div className="iconBox" aria-hidden="true"><i className="fas fa-gift"></i></div>
                            <span className="label">Pay with Gift Card</span>
                          </div>
                          <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all' }}>cavilltrustfoundation@gmail.com</code>
                          <CopyBtn onClick={() => copyToClipboard('cavilltrustfoundation@gmail.com')}>Copy</CopyBtn>
                        </div>

                        <div className="stat" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                          <div className="left" style={{ alignItems: 'center', gap: 10 }}>
                            <div className="iconBox" aria-hidden="true"><i className="fas fa-coins"></i></div>
                            <span className="label">Pay with Cryptocurrency</span>
                          </div>
                          <small style={{ color: '#cbd5e1' }}>USDT (TRC20)</small>
                          <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all' }}>TA4qRNXqqb31erxZZVHf574iA1Qm4JNMyV</code>
                          <CopyBtn onClick={() => copyToClipboard('TA4qRNXqqb31erxZZVHf574iA1Qm4JNMyV')}>Copy</CopyBtn>
                        </div>

                        <div className="stat" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                          <div className="left" style={{ alignItems: 'center', gap: 10 }}>
                            <div className="iconBox" aria-hidden="true"><i className="fab fa-bitcoin"></i></div>
                            <span className="label">Pay with Cryptocurrency</span>
                          </div>
                          <small style={{ color: '#cbd5e1' }}>Bitcoin (BTC)</small>
                          <code style={{ color: '#e5e7eb', fontSize: '0.9rem', wordBreak: 'break-all' }}>bc1qxp4x04tvglmcjx6ct8q7tjgjk5497eacvlxg68</code>
                          <CopyBtn onClick={() => copyToClipboard('bc1qxp4x04tvglmcjx6ct8q7tjgjk5497eacvlxg68')}>Copy</CopyBtn>
                        </div>
                      </StatsRow>

                      {/* Email input moved below cards */}
                      <div className="stat" style={{ marginTop: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="left" style={{ gap: 10 }}>
                          <span className="label">Email for receipt (optional)</span>
                        </div>
                        <EmailInput type="email" placeholder="enter your email" aria-label="donor email" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} />
                      </div>

                      <div style={{ display: 'flex', marginTop: 12, gap: 10, justifyContent: 'flex-end' }}>
                        <ConfirmBtn type="button" onClick={() => setShowDonateDetails(false)}>
                          Back
                        </ConfirmBtn>
                        <ConfirmBtn type="button" onClick={() => setDonationComplete(true)}>
                          I Have Donated
                        </ConfirmBtn>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="stat" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
                        <div className="left" style={{ alignItems: 'center', gap: 10 }}>
                          <div className="iconBox" aria-hidden="true"><i className="fas fa-check-circle"></i></div>
                          <span className="label">Thank you for your donation!</span>
                        </div>
                        <p style={{ color: '#e5e7eb' }}>
                          A confirmation email will be sent {donorEmail ? `to ${donorEmail}` : 'to your email'}.
                        </p>
                      </div>

                      <div style={{ display: 'flex', marginTop: 12, gap: 10, justifyContent: 'flex-end' }}>
                        <ConfirmBtn type="button" onClick={() => { setDonationComplete(false); setShowDonateDetails(false); } }>
                          Done
                        </ConfirmBtn>
                      </div>
                    </>
                  )}
                </>
              )}
            </SupportSection><SectionHeading style={{ marginTop: '60px' }}>Join the Fan Club</SectionHeading><FanClubGrid>
                <FanClubCard>
                  <img src={cavill1} alt="Henry Cavill" className="card-image" />
                  <div className="card-content">
                    <h3 className="card-title">Exclusive Content</h3>
                    <p className="card-text">Get access to behind-the-scenes photos, videos, and personal updates from Henry that you won't find anywhere else.</p>
                    <button onClick={handleJoinNow} className="card-button">Join Now</button>
                  </div>
                </FanClubCard>

                <FanClubCard>
                  <img src={fan2} alt="Henry Cavill at Fan Event" className="card-image" />
                  <div className="card-content">
                    <h3 className="card-title">Member Events</h3>
                    <p className="card-text">Be the first to know about exclusive fan events, Q&A sessions, and special appearances by Henry.</p>
                    <button onClick={handleJoinNow} className="card-button">Join Now</button>
                  </div>
                </FanClubCard>

                <FanClubCard>
                  <img src={fan1} alt="Henry Cavill with Fans" className="card-image" />
                  <div className="card-content">
                    <h3 className="card-title">Merchandise</h3>
                    <p className="card-text">Access to limited edition merchandise and early releases available only to fan club members.</p>
                    <button onClick={handleJoinNow} className="card-button">Join Now</button>
                  </div>
                </FanClubCard>
              </FanClubGrid></>
          );
        })()}
      </ContentWrapper>
      <Footer>
        <FooterInner>
          <FooterGrid>
            <FooterSection>
              <h4>About Us</h4>
              <p>
                The Cavill Trust Foundation supports initiatives in veteran welfare, wildlife conservation,
                and community development. We believe small acts can create powerful change.
              </p>
            </FooterSection>

            <FooterSection>
              <h4>Contact</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <i className="fas fa-envelope" style={{ marginRight: '10px', color: '#f59e0b', width: '20px', textAlign: 'center' }}></i>
                  <a href="mailto:cavilltrustfoundation@gmail.com" style={{ color: '#e5e7eb', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver="this.style.color='#f59e0b'" onMouseOut="this.style.color='#e5e7eb'">
                    cavilltrustfoundation@gmail.com
                  </a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center' }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '10px', color: '#f59e0b', width: '20px', textAlign: 'center' }}></i>
                  <span>London, United Kingdom</span>
                </li>
              </ul>
            </FooterSection>

            <FooterSection>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#donate">Donate</a></li>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#impact">Impact</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </FooterSection>
          </FooterGrid>

          <SponsorsSection>
            <h3>Our Sponsors</h3>
            <div className="sponsors-grid">
              <img src={durrellLogo} alt="" />
              <img src={royalLogo} alt="" />
              <img src={dcLogo} alt="" />
            </div>
          </SponsorsSection>

          <FooterBottom>
            <div>
              © 2025 Cavill Trust Foundation
            </div>
            <div style={{ opacity: 0.85 }}>
              Registered charity. All rights reserved.
            </div>
          </FooterBottom>
        </FooterInner>
      </Footer>

      
    </HomeContainer>
  );
};

export default Home;
