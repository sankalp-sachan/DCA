import { Target, Eye, Users, Award, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    const stats = [
        { label: 'Founded', value: '1998', icon: <BookOpen size={20} /> },
        { label: 'Faculty', value: '25+', icon: <Users size={20} /> },
        { label: 'Students', value: '1200+', icon: <Users size={20} /> },
        { label: 'Placements', value: '95%', icon: <Award size={20} /> },
    ];

    const coordinators = [
        { name: 'Mr. Ravikant Mishra', role: 'Assistant Professor', special: '', image: 'rkm.png' },
    ];

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{ backgroundColor: 'var(--academic-blue)', color: 'white', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Excellence in Computing</h1>
                        <p style={{ fontSize: '1.25rem', maxWidth: '700px', opacity: 0.9, lineHeight: '1.6' }}>
                            The Department of Computer Applications (DCA) has been a pioneer in technical education for over two decades, fostering innovation and professional leadership.
                        </p>
                    </motion.div>
                </div>
                <div style={{ position: 'absolute', right: '-10%', top: '-10%', opacity: 0.1 }}>
                    <BookOpen size={400} />
                </div>
            </div>

            {/* Stats Row */}
            <div className="container" style={{ marginTop: '-4rem', position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--academic-blue)' }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container" style={{ padding: '6rem 0' }}>
                {/* Vision & Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '8rem' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
                                <Eye size={24} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Our Vision</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            To be a globally recognized center of excellence in computer applications education and research, producing technically proficient and socially responsible professionals.
                        </p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
                                <Target size={24} />
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Our Mission</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                            Providing cutting-edge curriculum, industry-aligned training, and a research-driven environment that empowers students to solve complex real-world technological challenges.
                        </p>
                    </motion.div>
                </div>

                {/* Governance/Faculty Section */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--academic-blue)', marginBottom: '1rem' }}>Leadership & Faculty</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Guided by distinguished educators and industry veterans.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
                    {coordinators.map((faculty, i) => (
                        <motion.div
                            key={i}
                            className="card"
                            style={{ padding: '0', overflow: 'hidden' }}
                            whileHover={{ y: -10 }}
                        >
                            <img src={faculty.image} alt={faculty.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                            <div style={{ padding: '2rem', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{faculty.name}</h3>
                                <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{faculty.role}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Spec: {faculty.special}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Accreditation Section */}
                <div className="card" style={{ marginTop: '8rem', padding: '4rem', display: 'flex', alignItems: 'center', gap: '4rem', backgroundColor: 'var(--surface)' }}>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <ShieldCheck size={32} className="text-success" />
                            <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Quality & Accreditation</h2>
                        </div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                            Our programs are rigorously evaluated and accredited by leading national bodies. We maintain a strict adherence to international standards in technical pedagogy and infrastructure.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['NAAC Grade A+ Certification', 'UGC Recognized Department', 'AICTE Approved Curriculum'].map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '600' }}>
                                    <ArrowRight size={18} className="text-primary" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ flex: 1, display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <img src="/NAAC.png" alt="NAAC" style={{ height: '120px', width: 'auto' }} />
                        <img src="/UGC.png" alt="UGC" style={{ height: '100px', width: 'auto' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
