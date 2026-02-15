import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
    const isPast = new Date(event.date) < new Date();
    const availabilityPercent = (event.availableSeats / event.seats) * 100;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="card"
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                border: '1px solid var(--border)',
                transition: 'box-shadow 0.3s ease',
                boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
        >
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden', borderRadius: 'var(--radius) var(--radius) 0 0' }}>
                <img
                    src={event.image ? `http://localhost:5000${event.image}` : 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase' }}>
                        {event.category}
                    </span>
                    {isPast && <span style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700' }}>PAST</span>}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--academic-blue)', lineHeight: '1.3' }}>
                    {event.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
                        <Calendar size={16} className="text-primary" />
                        {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} | {event.time}
                    </div>
                    <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '500' }}>
                        <MapPin size={16} className="text-primary" /> {event.venue}
                    </div>
                </div>

                {/* Seat Indicator */}
                <div style={{ marginTop: 'auto', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
                        <span>Registration Status</span>
                        <span style={{ color: availabilityPercent < 20 ? 'var(--danger)' : 'var(--success)' }}>
                            {event.availableSeats} / {event.seats} left
                        </span>
                    </div>
                    <div style={{ height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${100 - availabilityPercent}%`,
                            height: '100%',
                            backgroundColor: availabilityPercent < 20 ? 'var(--danger)' : 'var(--primary)',
                            borderRadius: '10px'
                        }}></div>
                    </div>
                </div>

                <Link to={`/events/${event._id}`} className="btn btn-primary" style={{ width: '100%', borderRadius: '6px', fontSize: '0.9rem', padding: '0.8rem' }}>
                    {isPast ? 'View Details' : 'Register Now'} <ArrowRight size={16} />
                </Link>
            </div>
        </motion.div>
    );
};

export default EventCard;
