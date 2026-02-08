const About = () => {
  return (
    <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <h2>About Akruti</h2>
      <p style={{ color: '#aab2bd', marginTop: '20px' }}>
        Akruti is a premier 3D printing studio dedicated to transforming digital concepts into physical reality. 
        We specialize in rapid prototyping, custom art pieces, and functional mechanical parts.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
        <div style={{ background: '#16213e', padding: '20px', borderRadius: '8px', flex: 1 }}>
          <h3>Precision</h3>
          <p>0.1mm layer height suitable for detailed models.</p>
        </div>
        <div style={{ background: '#16213e', padding: '20px', borderRadius: '8px', flex: 1 }}>
          <h3>Speed</h3>
          <p>Fast turnaround times for all custom orders.</p>
        </div>
      </div>
    </div>
  );
};

export default About;