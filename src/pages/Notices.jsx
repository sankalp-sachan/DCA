import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Bell, Info, Calendar, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Notices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await api.get('/notices');
                setNotices(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
                    <ArrowLeft size={18} /> Back
                </button>

                <div style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--academic-blue)', marginBottom: '1rem' }}>Official Circulars</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Stay informed with the latest announcements from the Department of Computer Applications.</p>
                </div>

                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        style={{ paddingLeft: '3rem', backgroundColor: 'white' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>
                ) : filteredNotices.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>No notices found matching your criteria.</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {filteredNotices.map((notice, index) => (
                            <motion.div
                                key={notice._id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="card"
                                style={{ padding: '2rem', borderLeft: notice.isImportant ? '6px solid var(--danger)' : '6px solid var(--primary)' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '8px' }}>
                                            <Bell size={20} />
                                        </div>
                                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{notice.title}</h2>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Calendar size={14} /> {new Date(notice.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                    </span>
                                </div>
                                <p style={{ color: '#334155', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>{notice.content}</p>
                                {notice.link && (
                                    <a href={notice.link} style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--primary)', fontWeight: '700' }}>
                                        Download Attachment &rarr;
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notices;
