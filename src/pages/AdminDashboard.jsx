import { useState, useEffect } from 'react';
import api from '../utils/api';
import {
    Users, Calendar, BarChart3, Plus, Trash2, Edit, FileText,
    PieChart as PieChartIcon, TrendingUp, CheckCircle, Clock,
    Bell, LayoutGrid, List, MessageSquare, Award
} from 'lucide-react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
    PointElement, LineElement, ArcElement
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';

ChartJS.register(
    CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement,
    Title, Tooltip, Legend
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [events, setEvents] = useState([]);
    const [notices, setNotices] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [showEventModal, setShowEventModal] = useState(false);
    const [showNoticeModal, setShowNoticeModal] = useState(false);

    // Form States
    const [newEvent, setNewEvent] = useState({
        title: '', description: '', date: '', time: '', venue: '', seats: 50, category: 'Workshop', organizer: 'DCA Department'
    });
    const [newNotice, setNewNotice] = useState({
        title: '', content: '', category: 'General', isImportant: false
    });

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [statsRes, eventsRes, noticesRes] = await Promise.all([
                    api.get('/admin/dashboard'),
                    api.get('/events'),
                    api.get('/notices')
                ]);
                setStats(statsRes.data);
                setEvents(eventsRes.data);
                setNotices(noticesRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAdminData();
    }, []);

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await api.post('/events', newEvent);
            setShowEventModal(false);
            const res = await api.get('/events');
            setEvents(res.data);
            alert('Event created successfully');
        } catch (err) {
            alert('Error creating event');
        }
    };

    const handleCreateNotice = async (e) => {
        e.preventDefault();
        try {
            await api.post('/notices', newNotice);
            setShowNoticeModal(false);
            const res = await api.get('/notices');
            setNotices(res.data);
            alert('Notice published successfully');
        } catch (err) {
            alert('Error publishing notice');
        }
    };

    const handleDeleteNotice = async (id) => {
        if (window.confirm('Delete this notice?')) {
            try {
                await api.delete(`/notices/${id}`);
                setNotices(notices.filter(n => n._id !== id));
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    const barData = {
        labels: stats?.categories?.map(c => c._id) || [],
        datasets: [{
            label: 'Events by Category',
            data: stats?.categories?.map(c => c.count) || [],
            backgroundColor: 'rgba(30, 64, 175, 0.7)',
            borderRadius: 6
        }]
    };

    const pieData = {
        labels: ['Upcoming', 'Completed'],
        datasets: [{
            data: [stats?.stats?.upcomingEvents || 0, stats?.stats?.completedEvents || 0],
            backgroundColor: ['#1e40af', '#64748b'],
            borderWidth: 0
        }]
    };

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Administrative Hub</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Departmental oversight and operational analytics.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" onClick={() => setShowNoticeModal(true)}>
                            <Bell size={18} /> Publish Notice
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowEventModal(true)}>
                            <Plus size={18} /> Create Event
                        </button>
                    </div>
                </div>

                {/* Performance Highlights */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { label: 'Enrolled Students', value: stats?.stats?.totalStudents || 0, icon: <Users />, theme: '#1e40af' },
                        { label: 'Active Events', value: stats?.stats?.totalEvents || 0, icon: <Calendar />, theme: '#f59e0b' },
                        { label: 'Total Registrations', value: stats?.stats?.totalRegistrations || 0, icon: <TrendingUp />, theme: '#16a34a' },
                        { label: 'Certificates Sync', value: '100%', icon: <Award />, theme: '#0c4a6e' }
                    ].map((item, i) => (
                        <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
                            <div style={{ backgroundColor: `${item.theme}15`, color: item.theme, padding: '0.8rem', borderRadius: '12px' }}>
                                {item.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1' }}>{item.value}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginTop: '0.25rem' }}>{item.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabbed Interface */}
                <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border)', marginBottom: '2.5rem' }}>
                    {['Overview', 'Events', 'Notices'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            style={{
                                padding: '1rem 0',
                                border: 'none',
                                background: 'none',
                                borderBottom: activeTab === tab.toLowerCase() ? '3px solid var(--primary)' : '3px solid transparent',
                                fontWeight: '700',
                                color: activeTab === tab.toLowerCase() ? 'var(--primary)' : 'var(--text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BarChart3 size={20} className="text-primary" /> Enrollment by Category
                                </h3>
                                <div style={{ height: '350px' }}>
                                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <PieChartIcon size={20} className="text-primary" /> Operational Status
                                </h3>
                                <div style={{ height: '350px' }}>
                                    <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'events' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: 'var(--academic-gray)', borderBottom: '1px solid var(--border)' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Event Title</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Type</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Date</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Occupancy</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Status</th>
                                        <th style={{ textAlign: 'right', padding: '1.25rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(event => (
                                        <tr key={event._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1.25rem', fontWeight: '600' }}>{event.title}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <span style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                                                    {event.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{new Date(event.date).toLocaleDateString()}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <span style={{ fontSize: '0.85rem' }}>{event.availableSeats}/{event.seats}</span>
                                                    <div style={{ width: '60px', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px' }}>
                                                        <div style={{ width: `${(event.availableSeats / event.seats) * 100}%`, height: '100%', backgroundColor: 'var(--primary)', borderRadius: '10px' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem' }}>
                                                {new Date(event.date) < new Date() ? <span className="text-muted">Completed</span> : <span style={{ color: 'var(--success)', fontWeight: '600' }}>Live</span>}
                                            </td>
                                            <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                                    <button className="btn btn-secondary" style={{ padding: '0.3rem' }}><Edit size={16} /></button>
                                                    <button className="btn btn-secondary" style={{ padding: '0.3rem', color: 'var(--danger)' }}><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {activeTab === 'notices' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: 'var(--academic-gray)', borderBottom: '1px solid var(--border)' }}>
                                    <tr>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Notice Title</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Category</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Date Published</th>
                                        <th style={{ textAlign: 'left', padding: '1.25rem' }}>Priority</th>
                                        <th style={{ textAlign: 'right', padding: '1.25rem' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notices.map(notice => (
                                        <tr key={notice._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '1.25rem', fontWeight: '600' }}>{notice.title}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                <span style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--secondary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                                                    {notice.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1.25rem', fontSize: '0.9rem' }}>{new Date(notice.date).toLocaleDateString()}</td>
                                            <td style={{ padding: '1.25rem' }}>
                                                {notice.isImportant ? <span style={{ color: 'var(--danger)', fontWeight: '700', fontSize: '0.75rem' }}>URGENT</span> : <span className="text-muted">Normal</span>}
                                            </td>
                                            <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                                                <button onClick={() => handleDeleteNotice(notice._id)} className="btn btn-secondary" style={{ padding: '0.3rem', color: 'var(--danger)' }}>
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Event Creation Modal */}
                {showEventModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--academic-blue)' }}>Configure New Event</h2>
                                <button onClick={() => setShowEventModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                            </div>
                            <form onSubmit={handleCreateEvent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>TITLE</label>
                                    <input required value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g. Modern Web Architecture" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CATEGORY</label>
                                        <select value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Hackathon">Hackathon</option>
                                            <option value="Seminar">Seminar</option>
                                            <option value="Bootcamp">Bootcamp</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>VENUE</label>
                                        <input required value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })} placeholder="e.g. Lab 1" />
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>DATE</label>
                                        <input type="date" required value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>TIME</label>
                                        <input type="time" required value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>DESCRIPTION</label>
                                    <textarea required rows={4} value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }}>Submit and Advertise</button>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Notice Modal */}
                {showNoticeModal && (
                    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--academic-blue)' }}>Draft Official Notice</h2>
                                <button onClick={() => setShowNoticeModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                            </div>
                            <form onSubmit={handleCreateNotice} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>SUBJECT</label>
                                    <input required value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} placeholder="e.g. Revised Exam Schedule" />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <label style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>PRIORITY:</label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={newNotice.isImportant} onChange={e => setNewNotice({ ...newNotice, isImportant: e.target.checked })} />
                                        Mark as Important
                                    </label>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CONTENT</label>
                                    <textarea required rows={5} value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })} placeholder="Detailed informational content..." />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }}>Publish Immediately</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
