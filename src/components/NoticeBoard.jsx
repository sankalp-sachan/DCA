import { useState, useEffect } from 'react';
import api from '../utils/api';
import { Bell, ChevronRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await api.get('/notices');
                setNotices(res.data.slice(0, 5));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Bell size={20} className="animate-pulse" />
                <h3 style={{ color: 'white', margin: 0, fontSize: '1.25rem' }}>Notice Board</h3>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {loading ? (
                    <div style={{ padding: '2rem', textAlign: 'center' }}>Loading notices...</div>
                ) : notices.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No new announcements</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {notices.map((notice, index) => (
                            <motion.div
                                key={notice._id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    padding: '1.25rem 1.5rem',
                                    borderBottom: index === notices.length - 1 ? 'none' : '1px solid var(--border)',
                                    display: 'flex',
                                    gap: '1rem',
                                    transition: 'background-color 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--academic-gray)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <div style={{
                                    minWidth: '60px',
                                    textAlign: 'center',
                                    backgroundColor: notice.isImportant ? '#fee2e2' : 'var(--academic-gray)',
                                    color: notice.isImportant ? 'var(--danger)' : 'var(--primary)',
                                    borderRadius: '8px',
                                    padding: '0.5rem',
                                    height: 'fit-content'
                                }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                        {new Date(notice.date).toLocaleString('default', { month: 'short' })}
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                                        {new Date(notice.date).getDate()}
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        {notice.isImportant && <span style={{ backgroundColor: 'var(--danger)', color: 'white', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', fontWeight: '700' }}>NEW</span>}
                                        <h4 style={{ fontSize: '1rem', margin: 0, color: 'var(--text-main)' }}>{notice.title}</h4>
                                    </div>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {notice.content}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <a href="/notices" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                    View All Circulars <ChevronRight size={16} />
                </a>
            </div>
        </div>
    );
};

export default NoticeBoard;
