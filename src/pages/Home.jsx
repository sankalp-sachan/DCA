import { useState, useEffect } from 'react';
import api from '../utils/api';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import NoticeBoard from '../components/NoticeBoard';
import StatsSection from '../components/StatsSection';
import { motion } from 'framer-motion';
import { LayoutGrid, ArrowRight, Image as ImageIcon, MessageSquare } from 'lucide-react';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await api.get('/events');
                const upcoming = res.data.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
                setEvents(upcoming);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--background)' }}>
            <Hero />

            <StatsSection />

            <section style={{ padding: '6rem 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3.5rem' }}>

                        {/* Featured Events */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2.25rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <LayoutGrid className="text-primary" /> Upcoming Events
                                    </h2>
                                    <p style={{ color: 'var(--text-muted)' }}>Empowering your future with quality training.</p>
                                </div>
                                <a href="/events" className="nav-link" style={{ fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    All Events <ArrowRight size={18} />
                                </a>
                            </div>

                            {loading ? (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[1, 2].map(i => <div key={i} className="card" style={{ height: '300px', backgroundColor: 'var(--academic-gray)', border: 'none' }}></div>)}
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                    {events.map(event => (
                                        <motion.div key={event._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                            <EventCard event={event} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Side Section: Notices */}
                        <div>
                            <NoticeBoard />

                            <div className="card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', color: 'white' }}>
                                <h3 style={{ color: 'white', marginBottom: '1rem' }}>Have Feedback?</h3>
                                <p style={{ fontSize: '0.875rem', marginBottom: '1.5rem', opacity: 0.9 }}>Your feedback helps us improve our workshops and seminars.</p>
                                <a href="/contact" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', width: '100%', borderRadius: '8px' }}>
                                    <MessageSquare size={18} /> Give Feedback
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section style={{ padding: '6rem 0', backgroundColor: 'var(--surface)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '1rem' }}>Gallery of Past Events</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>A glimpse into the successful workshops and tech fests organized by our department.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', height: '500px' }}>
                        <div style={{ gridRow: 'span 2', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover-scale" />
                        </div>
                        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ gridRow: 'span 2', overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <a href="/gallery" className="btn btn-secondary">
                            <ImageIcon size={20} /> View Full Gallery
                        </a>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: '6rem 0', backgroundColor: '#0c4a6e', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', color: 'white' }}>Stay Updated with DCA Portal</h2>
                        <p style={{ marginBottom: '2.5rem', opacity: 0.9, fontSize: '1.125rem' }}>Signup for our official monthly newsletter to receive updates on upcoming hackathons and career guidance sessions.</p>
                        <form style={{ display: 'flex', gap: '0.75rem', maxWidth: '600px', margin: '0 auto' }}>
                            <input
                                type="email"
                                placeholder="Enter your institutional email"
                                style={{ flex: 1, border: 'none', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', padding: '1rem 1.5rem' }}
                            />
                            <button className="btn" style={{ backgroundColor: 'white', color: '#0c4a6e', padding: '0 2rem' }}>Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
