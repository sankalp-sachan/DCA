import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--surface)', borderTop: '4px solid var(--primary)', padding: '5rem 0 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: '4rem', marginBottom: '4rem' }}>

                    {/* Brand & Mission */}
                    <div>
                        <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src="/logo.png" alt="University Logo" style={{ height: '40px', width: 'auto' }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>DCA Portal</span>
                        </Link>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                            The Department of Computer Applications is committed to excellence in technical education, research, and innovation. Our portal bridges the gap between academics and industry opportunities.
                        </p>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '2rem' }}>
                            <img src="/NAAC.png" alt="NAAC Accredited" style={{ height: '45px', width: 'auto', filter: 'grayscale(100%) opacity(0.7)' }} />
                            <img src="/UGC.png" alt="UGC Recognized" style={{ height: '40px', width: 'auto', filter: 'grayscale(100%) opacity(0.7)' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--academic-gray)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    transition: 'all 0.3s'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--academic-gray)'; e.currentTarget.style.color = 'var(--primary)'; }}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--academic-blue)' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Home', 'Events', 'About DCA', 'Contact Us', 'Privacy Policy'].map(link => (
                                <li key={link}>
                                    <Link to={`/${link.toLowerCase().split(' ')[0]}`} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--academic-blue)' }}>Student Resources</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Academic Calendar', 'Study Material', 'Placement Cell', 'Alumni Network', 'FAQ'].map(link => (
                                <li key={link}>
                                    <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        {link} <ExternalLink size={12} style={{ opacity: 0.5 }} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--academic-blue)' }}>Campus Office</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <MapPin size={20} className="text-primary" />
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    UIET - IV CSJMU, KANPUR
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <Phone size={20} className="text-primary" />
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>+91 123 456 7890</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <Mail size={20} className="text-primary" />
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>office.dca@university.edu</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        &copy; {new Date().getFullYear()} Department of Computer Applications (DCA). All Rights Reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <a href="#">Security</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
