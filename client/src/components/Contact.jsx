const Contact = () => {
  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Contact Us</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input type="text" placeholder="Your Name" style={{ padding: '10px', background: '#0f172a', border: '1px solid #333', color: 'white' }} />
        <input type="email" placeholder="Your Email" style={{ padding: '10px', background: '#0f172a', border: '1px solid #333', color: 'white' }} />
        <textarea rows="5" placeholder="Message" style={{ padding: '10px', background: '#0f172a', border: '1px solid #333', color: 'white' }}></textarea>
        <button className="btn-primary" style={{ border: 'none', cursor: 'pointer' }}>Send Message</button>
      </form>
    </div>
  );
};

export default Contact;