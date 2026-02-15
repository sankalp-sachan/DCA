import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users } from 'lucide-react';

const Hero = () => {
    return (
        <section style={{ padding: '6rem 0', background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)', position: 'relative', overflow: 'hidden' }}>
            {/* Abstract Decorative Circles */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', backgroundColor: '#e0f2fe', borderRadius: '50%', zIndex: 0, opacity: 0.5 }}></div>
            <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', backgroundColor: '#f1f5f9', borderRadius: '50%', zIndex: 0, opacity: 0.5 }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span style={{ backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1.5rem', display: 'inline-block' }}>
                        Welcome to DCA
                    </span>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', color: '#0f172a' }}>
                        DCA Event & Workshop <span style={{ color: 'var(--primary)' }}>Portal</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        Empowering students with industry-relevant workshops, hackathons, and seminars. Join us to build the future of technology.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/events" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                            Explore Events <ArrowRight size={20} />
                        </Link>
                        <Link to="/about" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                            Learn More
                        </Link>
                    </div>

                    <div style={{ marginTop: '4rem', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem' }}>10+</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Monthly Events</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem' }}>500+</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Students Joined</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem' }}>100%</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Quality Learning</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
