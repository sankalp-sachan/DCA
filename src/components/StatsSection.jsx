import { Users, Calendar, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsSection = () => {
    const stats = [
        { label: 'Events Organized', value: '50+', icon: <Calendar size={28} />, color: '#3b82f6' },
        { label: 'Students Impacted', value: '2500+', icon: <Users size={28} />, color: '#10b981' },
        { label: 'Expert Speakers', value: '30+', icon: <Award size={28} />, color: '#f59e0b' },
        { label: 'Certifications Issued', value: '1200+', icon: <BookOpen size={28} />, color: '#ef4444' },
    ];

    return (
        <section style={{ padding: '5rem 0', backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{
                                width: '70px',
                                height: '70px',
                                backgroundColor: 'var(--academic-gray)',
                                color: stat.color,
                                borderRadius: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {stat.icon}
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
