import { GraduationCap, Target, Eye, Users } from 'lucide-react';

const About = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <h1 className="section-title">About Department of Computer Applications</h1>
                <p style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
                    DCA is at the forefront of digital transformation, nurturing the next generation of tech leaders through academic excellence and practical experience.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#dbeafe', color: 'var(--primary)', padding: '1.5rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem' }}>
                        <Target size={32} />
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Our Mission</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        To provide high-quality education in computer applications and prepare students for the global IT industry through research, innovation, and practical training.
                    </p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '1.5rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem' }}>
                        <Eye size={32} />
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Our Vision</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        To be a center of excellence recognized for producing technologically competent professionals who contribute to the advancement of society.
                    </p>
                </div>
                <div className="card" style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '1.5rem', borderRadius: '50%', width: 'fit-content', margin: '0 auto 1.5rem' }}>
                        <Users size={32} />
                    </div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Our Values</h3>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Excellence, Integrity, Innovation, and Collaboration are the pillars that guide our department and students towards success.
                    </p>
                </div>
            </div>

            <section style={{ backgroundColor: '#f8fafc', padding: '4rem', borderRadius: 'var(--radius)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem' }}>Faculty Coordinators</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#e2e8f0', margin: '0 auto 1.5rem', overflow: 'hidden' }}>
                                <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Faculty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Dr. John Doe</h4>
                            <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.875rem' }}>Head of Department</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
