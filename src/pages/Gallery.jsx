import { motion } from 'framer-motion';
import { ImageIcon, Users, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const navigate = useNavigate();

    const photos = [
        { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800', title: 'Web Workshop 2025', date: 'Oct 2025' },
        { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', title: 'Data Science Bootcamp', date: 'Nov 2025' },
        { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', title: 'Annual Tech Fest', date: 'Dec 2025' },
        { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', title: 'Cyber Security Meet', date: 'Jan 2026' },
        { url: 'https://images.unsplash.com/photo-1591115765373-520b7a42b93d?w=800', title: 'Alumni Interaction', date: 'Feb 2026' },
        { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', title: 'Design Thinking Session', date: 'Feb 2026' },
    ];

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '4rem 0' }}>
            <div className="container">
                <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
                    <ArrowLeft size={18} /> Back
                </button>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--academic-blue)' }}>Event Gallery</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Visual highlights of our department's active engagement.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="card"
                            style={{ padding: '0', overflow: 'hidden', cursor: 'zoom-in' }}
                        >
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img
                                    src={photo.url}
                                    alt={photo.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                    className="hover-scale"
                                />
                            </div>
                            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)' }}>
                                <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{photo.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Calendar size={14} /> {photo.date}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600' }}>View Collection</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
