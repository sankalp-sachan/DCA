import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import {
    Calendar, Download, XCircle, CheckCircle, Clock,
    User as UserIcon, Settings, Award, History, Mail, MapPin,
    BookOpen, ExternalLink, QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('events');

    useEffect(() => {
        const fetchMyRegistrations = async () => {
            try {
                const res = await api.get('/registrations/me');
                setRegistrations(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMyRegistrations();
    }, []);

    const handleCancel = async (id) => {
        if (window.confirm('Are you sure you want to cancel this registration?')) {
            try {
                await api.put(`/registrations/${id}/cancel`);
                setRegistrations(registrations.map(r => r._id === id ? { ...r, status: 'Cancelled' } : r));
            } catch (err) {
                alert('Could not cancel registration');
            }
        }
    };

    const upcomingEvents = registrations.filter(r => r.status === 'Registered' && new Date(r.eventId?.date) >= new Date());
    const pastEvents = registrations.filter(r => r.status === 'Attended' || (r.status === 'Registered' && new Date(r.eventId?.date) < new Date()));

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Left Panel: Profile */}
                    <aside>
                        <div className="card" style={{ padding: '0', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                            <div style={{ height: '100px', backgroundColor: 'var(--primary)' }}></div>
                            <div style={{ marginTop: '-50px', padding: '0 2rem 2rem 2rem', textAlign: 'center' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    backgroundColor: 'white',
                                    border: '4px solid white',
                                    borderRadius: '50%',
                                    margin: '0 auto 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'var(--shadow)',
                                    overflow: 'hidden'
                                }}>
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} alt="Avatar" />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{user?.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{user?.email}</p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <Mail size={16} className="text-primary" />
                                        <span style={{ fontSize: '0.875rem' }}>{user?.email}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <BookOpen size={16} className="text-primary" />
                                        <span style={{ fontSize: '0.875rem' }}>BCA / MCA Program</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                        <MapPin size={16} className="text-primary" />
                                        <span style={{ fontSize: '0.875rem' }}>DCA block, Campus</span>
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', borderRadius: '6px' }}>
                                    <Settings size={18} /> Update Profile
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{registrations.length}</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Registered</div>
                            </div>
                            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>{registrations.filter(r => r.status === 'Attended').length}</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Attended</div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Panel: Content */}
                    <main>
                        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
                            <button
                                onClick={() => setActiveTab('events')}
                                style={{
                                    padding: '1rem 0',
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === 'events' ? '3px solid var(--primary)' : '3px solid transparent',
                                    color: activeTab === 'events' ? 'var(--primary)' : 'var(--text-muted)',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <Calendar size={20} /> My Events
                            </button>
                            <button
                                onClick={() => setActiveTab('certs')}
                                style={{
                                    padding: '1rem 0',
                                    border: 'none',
                                    background: 'none',
                                    borderBottom: activeTab === 'certs' ? '3px solid var(--primary)' : '3px solid transparent',
                                    color: activeTab === 'certs' ? 'var(--primary)' : 'var(--text-muted)',
                                    fontWeight: '700',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <Award size={20} /> Certificates
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'events' ? (
                                <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        Scheduled Events
                                        {upcomingEvents.length > 0 && <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--primary)', color: 'white', padding: '0.2rem 0.6rem', borderRadius: '10px' }}>{upcomingEvents.length} Upcoming</span>}
                                    </h3>

                                    {loading ? (
                                        <div style={{ padding: '3rem', textAlign: 'center' }}>Loading events...</div>
                                    ) : registrations.length === 0 ? (
                                        <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
                                            <Calendar size={48} className="text-muted" style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                                            <h4>No registrations yet</h4>
                                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You haven't registered for any workshops or events.</p>
                                            <a href="/events" className="btn btn-primary">Browse Upcoming Events</a>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                            {registrations.map(reg => (
                                                <div key={reg._id} className="card" style={{
                                                    padding: '1.5rem',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    borderLeft: `5px solid ${reg.status === 'Registered' ? 'var(--primary)' : reg.status === 'Cancelled' ? 'var(--danger)' : 'var(--success)'}`
                                                }}>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                            <h4 style={{ margin: 0, fontSize: '1.15rem' }}>{reg.eventId?.title}</h4>
                                                            <span style={{
                                                                fontSize: '0.65rem',
                                                                fontWeight: '800',
                                                                padding: '0.2rem 0.5rem',
                                                                borderRadius: '4px',
                                                                backgroundColor: reg.status === 'Registered' ? '#dbeafe' : reg.status === 'Cancelled' ? '#fee2e2' : '#dcfce7',
                                                                color: reg.status === 'Registered' ? '#1e40af' : reg.status === 'Cancelled' ? '#b91c1c' : '#15803d'
                                                            }}>
                                                                {reg.status.toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                <Calendar size={14} /> {new Date(reg.eventId?.date).toLocaleDateString()}
                                                            </span>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                <Clock size={14} /> {reg.eventId?.time}
                                                            </span>
                                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                                <MapPin size={14} /> {reg.eventId?.venue}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {reg.status === 'Registered' && (
                                                            <>
                                                                <button
                                                                    onClick={() => {
                                                                        const win = window.open("");
                                                                        win.document.write(`<div style="display:flex;justify-content:center;align-items:center;height:100vh;flex-direction:column;font-family:sans-serif"><h2>Attendance QR for ${reg.eventId?.title}</h2><img src="${reg.qrCode}" style="width:300px"/><p>Scan this at the venue</p></div>`);
                                                                    }}
                                                                    className="btn btn-secondary"
                                                                    title="Show Attendance QR"
                                                                >
                                                                    <QrCode size={18} /> QR Code
                                                                </button>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    style={{ color: 'var(--danger)' }}
                                                                    onClick={() => handleCancel(reg._id)}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </>
                                                        )}
                                                        <a href={`/events/${reg.eventId?._id}`} className="btn btn-secondary" title="View event details">
                                                            <ExternalLink size={18} />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div key="certs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '1.5rem' }}>My Certification Accomplishments</h3>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                        {registrations.filter(r => r.status === 'Attended' || r.status === 'Registered').map(reg => (
                                            <div key={reg._id} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                                <div style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '1rem', borderRadius: '12px', width: 'fit-content', margin: '0 auto 1rem' }}>
                                                    <Award size={32} />
                                                </div>
                                                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{reg.eventId?.title}</h4>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Issued: {new Date().toLocaleDateString()}</p>
                                                <button
                                                    onClick={async () => {
                                                        try {
                                                            const res = await api.post(`/admin/generate-certificate/${reg._id}`);
                                                            window.open(`${api.defaults.baseURL.replace('/api', '')}${res.data.url}`, '_blank');
                                                        } catch (err) {
                                                            alert('Certificate generation fee/system error. Contact admin.');
                                                        }
                                                    }}
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', fontSize: '0.85rem' }}
                                                >
                                                    <Download size={16} /> Download PDF
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
