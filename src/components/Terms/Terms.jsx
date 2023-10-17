const TermsAndConditions = () => {
  return (
    <div style={containerStyle}>
      <h1 style={tac}>Lucid Range Print on Demand Terms and Conditions</h1>
      <p>
        Welcome to Lucid Range Print on Demand ("Lucid Range," "we," "our," or
        "us"). These terms and conditions ("Terms") outline the rules and
        regulations for the use of our website and services.
      </p>
      <p>
        By accessing and using our website or services, you accept these Terms
        in full. If you disagree with any part of these Terms, please do not use
        our website or services.
      </p>

      <div style={sectionStyle}>
        <h2>1. Introduction</h2>
        <p>
          1.1. Lucid Range Print on Demand is an online platform that allows
          users to create, customize, and showcase personalized designs.
        </p>
        <p>
          1.2. These Terms govern the use of our website and services, including
          ordering, payment, shipping, and any related activities.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>2. Design Showcase</h2>
        <p>
          2.1. Lucid Range is a platform designed for showcasing personalized
          designs. The designs presented on this website are owned by Lucid
          Range and intended for display and demonstration purposes only. They
          are not available for sale or reproduction through our platform.
        </p>
        <p>
          2.2. Users are allowed to create and customize designs for
          demonstration and preview purposes. However, ownership and copyright
          of the designs showcased on Lucid Range remain with Lucid Range.
        </p>
        <p>
          2.3. Users may not use, reproduce, distribute, or modify the showcased
          designs without the prior written consent of Lucid Range. Any
          unauthorized use of these designs may result in legal action.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>3. Intellectual Property</h2>
        <p>
          3.1. All intellectual property rights related to our website and
          services, including but not limited to logos, designs, and content,
          are owned or licensed by Lucid Range.
        </p>
        <p>
          3.2. Users may not use, modify, distribute, or reproduce any part of
          our website or services without our prior written consent.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>4. Privacy</h2>
        <p>
          4.1. We take privacy seriously. Our Privacy Policy governs the
          collection, use, and disclosure of personal information provided by
          users.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>5. Changes to Terms and Conditions</h2>
        <p>
          5.1. Lucid Range reserves the right to modify these Terms at any time
          without prior notice. Updated Terms will be posted on our website.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>6. Contact Information</h2>
        <p>
          6.1. For inquiries, questions, or concerns regarding these Terms or
          our services, please contact us at [contact email].
        </p>
      </div>

      <p>
        By using our website or services, you agree to comply with and be bound
        by these Terms and any future modifications. Thank you for choosing
        Lucid Range Print on Demand.
      </p>
    </div>
  );
};

const tac = {
  textAlign: "center",
};

const containerStyle = {
  maxWidth: "800px",
  margin: "5rem auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const sectionStyle = {
  marginBottom: "20px",
};

export default TermsAndConditions;
