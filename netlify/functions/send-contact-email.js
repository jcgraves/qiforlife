const { Resend } = require('resend');

exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse form data
    const params = new URLSearchParams(event.body);
    const formData = {
      firstName: params.get('firstName'),
      lastName: params.get('lastName'),
      email: params.get('email'),
      phone: params.get('phone'),
      visitType: params.get('visitType'),
      concern: params.get('concern'),
      preferredContact: params.get('preferredContact'),
    };

    // Check for honeypot (spam protection)
    if (params.get('bot-field')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Spam detected' }),
      };
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Initialize Resend with API key from environment variable
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email recipient addresses
    const recipients = [
      'gravesconner@gmail.com'
    ];

    // Format email content
    const visitTypeText = formData.visitType
      ? formData.visitType.charAt(0).toUpperCase() + formData.visitType.slice(1).replace('-', ' ')
      : 'Not specified';

    const emailHtml = `
      <h2>New Appointment Request from Qi For Life Website</h2>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Type of Visit:</strong> ${visitTypeText}</p>
      <p><strong>Preferred Contact Method:</strong> ${formData.preferredContact || 'Phone'}</p>
      ${formData.concern ? `<p><strong>Primary Health Concern:</strong><br>${formData.concern.replace(/\n/g, '<br>')}</p>` : ''}
      <hr>
      <p><small>This form was submitted from the Qi For Life contact page.</small></p>
    `;

    const emailText = `
New Appointment Request from Qi For Life Website

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Type of Visit: ${visitTypeText}
Preferred Contact Method: ${formData.preferredContact || 'Phone'}
${formData.concern ? `\nPrimary Health Concern:\n${formData.concern}` : ''}

---
This form was submitted from the Qi For Life contact page.
    `;

    // Send email to both recipients
    // Using Resend's onboarding domain (no DNS verification needed)
    // Later, update 'from' to use your verified domain: 'Qi For Life <noreply@qiforlife.com>'
    const data = await resend.emails.send({
      from: 'Qi For Life Website <onboarding@resend.dev>',
      to: recipients,
      replyTo: formData.email,
      subject: `New Appointment Request from ${formData.firstName} ${formData.lastName}`,
      html: emailHtml,
      text: emailText,
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Form submitted successfully',
        id: data.id,
      }),
    };

  } catch (error) {
    console.error('Error processing form:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process form submission',
        details: error.message,
      }),
    };
  }
};
