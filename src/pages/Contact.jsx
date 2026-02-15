import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', padding: '6rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ backgroundColor: 'var(--academic-gray)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                    >
                        Connected Campus
                    </motion.span>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginTop: '1.5rem', color: 'var(--academic-blue)' }}>Get in Touch</h1>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0.5rem auto 0', fontSize: '1.1rem' }}>
                        Have questions about events, admissions, or collaborations? Our department office is here to help.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '5rem' }}>
                    {/* Contact Form */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card" style={{ padding: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                            <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '12px' }}>
                                <MessageSquare size={24} />
                            </div>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Send a Message</h2>
                        </div>

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>FULL NAME</label>
                                    <input placeholder="John Doe" style={{ width: '100%' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>EMAIL ADDRESS</label>
                                    <input type="email" placeholder="john@university.edu" style={{ width: '100%' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>PURPOSE OF INQUIRY</label>
                                <select style={{ width: '100%' }}>
                                    <option>General Information</option>
                                    <option>Event Registration Support</option>
                                    <option>Academic Inquiry</option>
                                    <option>Technical Issue</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-muted)' }}>YOUR MESSAGE</label>
                                <textarea rows={5} placeholder="How can we assist you today?" style={{ width: '100%', resize: 'none' }}></textarea>
                            </div>
                            <button className="btn btn-primary" style={{ padding: '1rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '1rem' }}>
                                <Send size={18} /> Submit Inquiry
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div className="card" style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Office Location</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                                        <div style={{ color: 'var(--primary)', marginTop: '0.25rem' }}><MapPin size={24} /></div>
                                        <div>
                                            <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Department of Computer Applications</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                                Ground Floor, Academic Block A,<br />University Main Campus, Sector 14,<br />New Delhi, 110001
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                                        <div style={{ color: 'var(--primary)' }}><Clock size={24} /></div>
                                        <div>
                                            <p style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Office Hours</p>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '2.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem' }}>Direct Contacts</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    <a href="tel:+1234567890" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'inherit', textDecoration: 'none' }}>
                                        <div style={{ color: 'var(--primary)' }}><Phone size={22} /></div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>PHONE</p>
                                            <p style={{ fontWeight: '600' }}>+91 123 456 7890</p>
                                        </div>
                                    </a>
                                    <a href="mailto:office.dca@university.edu" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', color: 'inherit', textDecoration: 'none' }}>
                                        <div style={{ color: 'var(--primary)' }}><Mail size={22} /></div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>EMAIL</p>
                                            <p style={{ fontWeight: '600' }}>office.dca@university.edu</p>
                                        </div>
                                    </a>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                        <div style={{ color: 'var(--primary)' }}><Globe size={22} /></div>
                                        <div>
                                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.1rem' }}>WEBSITE</p>
                                            <p style={{ fontWeight: '600' }}>www.university.edu/dca</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
