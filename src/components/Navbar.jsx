import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Menu, X, GraduationCap, Bell, User as UserIcon, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} style={{
            height: '80px',
            transition: 'all 0.3s ease',
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
        }}>
            <div className="container nav-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/logo.png" alt="DCA Logo" style={{ height: '50px', width: 'auto', borderRadius: '4px' }} />
                        <img src="/UGC.png" alt="DCA Logo" style={{ height: '50px', width: 'auto', borderRadius: '4px' }} />
                        <img src="/NAAC.png" alt="DCA Logo" style={{ height: '50px', width: 'auto', borderRadius: '4px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1', color: 'var(--academic-blue)' }}>DCA PORTAL</span>
                            <span style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>DEPT. OF COMPUTER APPLICATIONS</span>
                        </div>
                    </Link>
                </div>

                <div className="nav-links">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="nav-link"
                            style={{
                                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                                fontWeight: location.pathname === link.path ? '700' : '500'
                            }}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <motion.div layoutId="underline" style={{ height: '2px', backgroundColor: 'var(--primary)', marginTop: '2px' }} />
                            )}
                        </Link>
                    ))}

                    <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 0.5rem' }}></div>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.9rem' }}>
                                    Admin Panel
                                </Link>
                            )}
                            <button onClick={handleLogout} className="btn" style={{ color: 'var(--danger)', background: 'none', padding: '0.5rem' }} title="Logout">
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <Link to="/login" className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', borderRadius: '6px' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '6px' }}>Sign Up</Link>
                        </div>
                    )}
                </div>

                <div className="mobile-toggle">
                    <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'var(--academic-blue)' }}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: '80px',
                            left: 0,
                            right: 0,
                            backgroundColor: 'white',
                            padding: '1.5rem',
                            boxShadow: 'var(--shadow-lg)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} style={{ fontSize: '1.125rem', fontWeight: '600', padding: '0.5rem 0' }}>
                                {link.name}
                            </Link>
                        ))}
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
                        {user ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} style={{ fontWeight: '600' }}>Dashboard</Link>
                                <button onClick={handleLogout} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--danger)', fontWeight: '600', padding: '0.5rem 0' }}>Logout</button>
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-secondary">Login</Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="btn btn-primary">Sign Up</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
