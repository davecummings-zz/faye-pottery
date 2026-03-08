import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    console.log('Sending email via Resend with API key:', process.env.RESEND_API_KEY ? 'SET' : 'NOT SET')

    // Send email via Resend
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev', // Resend's default test sender (works during development)
      to: 'luna.theaiassistant@gmail.com', // Test recipient during development
      replyTo: email, // User can reply to sender's email
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Once domain is verified in Resend, emails will go to faye.n.cummings@gmail.com</em></p>
      `,
    })

    console.log('Resend response:', result)

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json(
        { error: `Failed to send email: ${result.error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      emailId: result.data?.id
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
