import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="section-title">Get in Touch</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Have questions? We're here to help.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem' }}>Contact Information</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: 'var(--pastel-blue)', color: 'var(--primary)', padding: '1rem', borderRadius: '1rem' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Email</div>
                                <div style={{ color: 'var(--text-muted)' }}>dca.support@university.edu</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '1rem', borderRadius: '1rem' }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Phone</div>
                                <div style={{ color: 'var(--text-muted)' }}>+91 98765 43210</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '1rem' }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <div style={{ fontWeight: '700' }}>Location</div>
                                <div style={{ color: 'var(--text-muted)' }}>Academic Block A, Ground Floor, Room 102</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Social Media</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {/* Social Icons would go here */}
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <MessageSquare size={24} color="var(--primary)" /> Send a Message
                    </h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
                                <input placeholder="John Doe" />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email</label>
                                <input type="email" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Subject</label>
                            <input placeholder="Registration Issue" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message</label>
                            <textarea placeholder="Your message here..." rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} />
                        </div>
                        <button type="button" className="btn btn-primary" style={{ padding: '1rem' }}>
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
