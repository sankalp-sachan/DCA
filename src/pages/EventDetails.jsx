import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Calendar, Clock, MapPin, Users, Heart, Share2, ArrowLeft, ShieldCheck, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [timeLeft, setTimeLeft] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await api.get(`/events/${id}`);
                setEvent(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        if (!event) return;

        const timer = setInterval(() => {
            const difference = +new Date(event.date) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            setTimeLeft(timeLeft);
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setRegistering(true);
        try {
            await api.post('/registrations', { eventId: id });
            alert('Registration Successful! Check your dashboard for the QR code.');
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        } finally {
            setRegistering(false);
        }
    };

    if (loading) return (
        <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
            <div className="animate-spin" style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto' }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Loading event details...</p>
        </div>
    );

    if (!event) return <div className="container" style={{ padding: '4rem' }}>Event not found</div>;

    const isPast = new Date(event.date) < new Date();

    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', paddingBottom: '6rem' }}>
            {/* Header / Banner Area */}
            <div style={{ backgroundColor: 'var(--academic-blue)', padding: '4rem 0 8rem', color: 'white', position: 'relative' }}>
                <div className="container">
                    <button onClick={() => navigate(-1)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '4px', marginBottom: '2rem', cursor: 'pointer' }}>
                        <ArrowLeft size={18} /> Back to Events
                    </button>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.3rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {event.category}
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'white', marginTop: '1rem', marginBottom: '2rem', lineHeight: '1.2' }}>{event.title}</h1>

                        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Calendar size={22} /> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Clock size={22} /> {event.time}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <MapPin size={22} /> {event.venue}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '3rem' }}>

                    {/* Left Column: Content */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-lg)' }}>
                            <img
                                src={event.image ? `http://localhost:5000${event.image}` : 'https://images.unsplash.com/photo-1540575861501-7ad060e39fe5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                                alt={event.title}
                                style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: 'var(--radius)', marginBottom: '2.5rem' }}
                            />

                            <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--academic-blue)' }}>
                                <ShieldCheck className="text-primary" /> Event Overview
                            </h2>
                            <p style={{ fontSize: '1.125rem', color: '#334155', lineHeight: 1.8, marginBottom: '2rem' }}>
                                {event.description}
                            </p>
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Detailed Agenda</h3>
                                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                                    {event.longDescription || "This technical session is designed to provide participants with deep insights into the subject matter. The curriculum includes hands-on laboratories, expert talks, and interactive Q&A sessions. Participants will receive official certification upon successful completion and verified attendance."}
                                </p>
                            </div>
                        </div>

                        {/* Organizer Section */}
                        <div className="card" style={{ padding: '2rem' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Organized By</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--academic-gray)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                    <UserIcon size={30} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{event.organizer}</h4>
                                    <p style={{ color: 'var(--text-muted)', margin: 0 }}>Department of Computer Applications (DCA)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div>
                        <div className="card" style={{ padding: '2.5rem', position: 'sticky', top: '100px', boxShadow: 'var(--shadow-lg)' }}>
                            {!isPast && timeLeft.days !== undefined && (
                                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Registration Closes In</div>
                                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                                        {Object.entries(timeLeft).map(([unit, value]) => (
                                            <div key={unit}>
                                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{value.toString().padStart(2, '0')}</div>
                                                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: '700' }}>{unit}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ marginBottom: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Status</span>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: event.availableSeats > 0 ? 'var(--success)' : 'var(--danger)' }}>
                                        {event.availableSeats > 20 ? 'AVAILABLE' : event.availableSeats > 0 ? 'FILLING FAST' : 'SOLD OUT'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Occupancy</span>
                                    <span style={{ fontWeight: '700' }}>{event.availableSeats} / {event.seats} Seats</span>
                                </div>
                                <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(event.availableSeats / event.seats) * 100}%`,
                                        height: '100%',
                                        backgroundColor: event.availableSeats > 20 ? 'var(--primary)' : 'var(--danger)',
                                        transition: 'width 1s ease-in-out'
                                    }}></div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: '8px', boxShadow: '0 4px 14px 0 rgba(30, 64, 175, 0.3)' }}
                                onClick={handleRegister}
                                disabled={registering || event.availableSeats <= 0 || isPast}
                            >
                                {isPast ? 'Event Completed' : registering ? 'Processing...' : event.availableSeats > 0 ? 'Register Now' : 'Join Waitlist'}
                            </button>

                            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.75rem' }}><Heart size={18} /> Save</button>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.75rem' }}><Share2 size={18} /> Share</button>
                            </div>

                            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--academic-gray)', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <p style={{ margin: 0 }}>* For any queries, contact the department office or the student volunteer team.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
